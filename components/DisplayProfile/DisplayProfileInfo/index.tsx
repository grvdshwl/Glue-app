import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from "react-native";
import { AppContext } from "../../../context";
import useFollow from "../../../hooks/useFollow";
import { userProfileLink } from "../../../utils/link";
import BubblesAnimation from "../../../Animation/AnimatedBubbles";

interface User {
  fullName: string;
  posts: any[];
  followers: any[];
  following: any[];
  profilePicUrl: string;
  uid: string;
}

interface Props {
  user: User;
}

const DisplayProfileInfo: React.FC<Props> = ({ user }) => {
  const { user: currentUser } = useContext(AppContext);
  const { width: screenWidth } = useWindowDimensions();

  const isCurrentUser = currentUser.uid === user.uid;
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const userProfileImage = user.profilePicUrl || userProfileLink;
  const { follow, isLoading } = useFollow(currentUser, user, isFollowing);

  useEffect(() => {
    if (currentUser && user) {
      const isFollowing = currentUser.following.includes(user.uid);
      setIsFollowing(isFollowing);
    }
  }, [currentUser, user]);

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: userProfileImage }}
          alt={user.fullName}
          style={styles.image}
        />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <View
          style={[
            styles.infoContainer,
            { paddingHorizontal: screenWidth > 420 ? 72 : 0 },
          ]}
        >
          <InfoBox count={user.posts.length} label="Posts" />
          <InfoBox count={user.followers.length} label="Followers" />
          <InfoBox count={user.following.length} label="Following" />
        </View>
        {!isCurrentUser && (
          <Animated.View
            style={[
              styles.followButton,
              { transform: [{ scale: scaleValue }] },
            ]}
          >
            <BubblesAnimation
              isFollowing={isFollowing}
              isLoading={isLoading}
              follow={follow}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const InfoBox: React.FC<{ count: number; label: string }> = ({
  count,
  label,
}) => {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoText}>{count}</Text>
      <Text style={styles.infoText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  infoBox: {
    alignItems: "center",
  },
  infoText: {
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    fontSize: 16,
  },
  followButton: {
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DisplayProfileInfo;

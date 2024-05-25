import React, { useContext, useEffect, useState } from "react";
import { Box, Text } from "@gluestack-ui/themed";
import { AppContext } from "../../context";
import ProfileGrid from "../ProfileGrid";
import DisplayProfileInfo from "./DisplayProfileInfo";
import DisplayProfileEdit from "./DisplayProfileEdit";
import useFetchPostsByIds from "../../hooks/useFetchPostsbyId";
import AnimatedSpinner from "../../Animation/AnimatedSpinner";

interface Props {
  user: any;
}

const DisplayProfile: React.FC<Props> = ({ user }) => {
  const { user: currentUser, userPosts: currentUserPosts } =
    useContext(AppContext);
  const [userPosts, setUserPosts] = useState([]);
  const { fetchPostsByIds, loading: isLoading } = useFetchPostsByIds();

  useEffect(() => {
    if (currentUser.uid === user.uid) {
      setUserPosts(currentUserPosts);
    } else {
      let postIds = user.posts;
      fetchPostsByIds(postIds).then((postData) => {
        setUserPosts(postData);
      });
    }
  }, [currentUser, user, currentUserPosts]);

  return (
    <Box>
      <Text
        sx={{
          textAlign: "center",
          fontWeight: "600",
          color: "#000",
          marginVertical: 8,
          fontSize: 20,
        }}
      >
        {user.fullName}
      </Text>

      <DisplayProfileInfo user={user} />

      <Box sx={{ marginVertical: 12 }}>
        <Text sx={{ fontSize: 16, fontWeight: "600", color: "#262626" }}>
          {user.bio}
        </Text>
      </Box>

      {user.uid === currentUser.uid && <DisplayProfileEdit />}

      {!!isLoading && userPosts.length === 0 && (
        <AnimatedSpinner size="lg" style={{ marginTop: 60 }} />
      )}
      {userPosts && (
        <ProfileGrid postImages={userPosts} isLoading={isLoading} />
      )}
    </Box>
  );
};

export default DisplayProfile;

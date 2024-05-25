import React, { memo } from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, Pressable, Text } from "@gluestack-ui/themed";
import { BackButton } from "../../../Icons/BackButton";

interface Comment {
  id: string;
  comment: string;
  user: {
    id: string;
    uid: string;
    profilePicUrl: string;
    fullName: string;
  };
}

const renderItem = ({ item }: { item: Comment }) => (
  <Box key={item.id} style={styles.comment}>
    <Pressable>
      <Image
        source={{ uri: item.user.profilePicUrl }}
        style={styles.profilePic}
      />
    </Pressable>
    <Box style={styles.commentContent}>
      <Text style={styles.fullName}>{item.user.fullName}</Text>
      <Text>{item.comment}</Text>
    </Box>
  </Box>
);

const CommentsScreen: React.FC = () => {
  const { params } = useRoute();
  const { commentsData } = params as { commentsData: Comment[] | [] };
  const navigation = useNavigation();

  return (
    <Box style={styles.container}>
      <Pressable
        sx={{ padding: 8 }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <BackButton />
      </Pressable>
      <FlatList
        data={commentsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <Box />}
        ListHeaderComponent={<ListHeader />}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Box>
  );
};

const ListHeader: React.FC = memo(() => (
  <Box sx={{ marginBottom: 24 }}>
    <Text
      sx={{
        fontWeight: "$bold",
        fontSize: 20,
        color: "#262626",
        textAlign: "center",
      }}
    >
      Comments
    </Text>
  </Box>
));

const ItemSeparator: React.FC = memo(() => <Box sx={{ height: 8 }} />);

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingBottom: 36,
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
    color: "#a2a2a2",
  },
  fullName: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#262626",
  },
});

export default React.memo(CommentsScreen);

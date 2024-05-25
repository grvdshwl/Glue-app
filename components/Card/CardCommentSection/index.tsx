import React, { useState, useEffect } from "react";
import { Box, Pressable, Text } from "@gluestack-ui/themed";
import { Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useCommentListener from "../../../hooks/useCommentsListener";

interface Props {
  data: any;
}

const CardCommentSection: React.FC<Props> = ({ data }) => {
  const navigation = useNavigation();
  let initialComments = data.comments || [];
  const { comments: commentsData } = useCommentListener(
    data.id,
    initialComments
  );

  const handleSeeMore = () => {
    navigation.navigate("Comments", {
      commentsData: commentsData,
    });
  };

  if (!commentsData?.length) {
    return null;
  }

  return (
    <Box style={styles.container}>
      {commentsData.slice(0, 2).map((comment) => (
        <Box key={comment.id} style={styles.comment}>
          <Image
            source={{ uri: comment.user.profilePicUrl }}
            style={styles.profilePic}
          />
          <Box style={styles.commentContent}>
            <Text style={styles.fullName}>{comment.user.fullName}</Text>
            <Text>{comment.comment}</Text>
          </Box>
        </Box>
      ))}
      {commentsData.length > 2 && (
        <Pressable onPress={handleSeeMore}>
          <Text style={styles.showMore}>Show More...</Text>
        </Pressable>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flex: 1,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 24,
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
  showMore: {
    color: "#339af0",
    marginLeft: 12,
  },
});

export default CardCommentSection;

import React, { useContext, useMemo } from "react";
import { FlatList, RefreshControl } from "react-native";
import Card from "../Card";
import { Box, Text } from "@gluestack-ui/themed";
import Stories from "../Stories";
import { userStories } from "../../mocks";
import AnimatedSpinner from "../../Animation/AnimatedSpinner";
import { AppContext } from "../../context";

interface FeedItem {
  id: string;
  user: {
    name: string;
    posted_on: string;
    userImage: string;
  };
  image: string;
  caption: string;
  location: string;
}

interface PostFeedProps {
  posts: FeedItem[];
  loading: boolean;
}

const PostFeed: React.FC<PostFeedProps> = ({ posts, loading }) => {
  const { refetchFollowersPosts } = useContext(AppContext);
  const renderNoItemsComponent = useMemo(
    () =>
      loading ? null : (
        <Box
          sx={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 24,
            display: !loading ? "flex" : "none",
          }}
        >
          <Text sx={{ fontSize: 24, fontWeight: "600", color: "#262626" }}>
            No Feeds available
          </Text>
        </Box>
      ),
    []
  );

  const onRefresh = () => {
    refetchFollowersPosts();
  };

  const renderLoadingIndicator = useMemo(
    () => (
      <Box
        sx={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: 300,
        }}
      >
        <AnimatedSpinner size="xl" color="#339af0" />
      </Box>
    ),
    []
  );
  return (
    <FlatList
      style={{ marginTop: 12 }}
      data={posts}
      renderItem={({ item }) => <Card data={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Box sx={{ height: 20 }} />}
      ListHeaderComponent={() => <Stories stories={userStories} />}
      ListEmptyComponent={renderNoItemsComponent}
      ListFooterComponent={!!loading ? renderLoadingIndicator : null}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
    />
  );
};

export default PostFeed;

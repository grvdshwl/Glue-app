import React, { useContext, useMemo } from "react";
import { Box, FlatList, Text } from "@gluestack-ui/themed";
import PostInfo from "../../components/PostInfo";
import usePostInfo from "../../hooks/usePostInfo";
import { AppContext } from "../../context";
import AnimatedSpinner from "../../Animation/AnimatedSpinner";

interface LikesInfo {
  id: string;
  user: {
    name: string;
    userImage: string;
  };
  post: {
    user: string;
    image: string;
  };
}

const Likes: React.FC = () => {
  const { user } = useContext(AppContext);
  const { postInfos, loading } = usePostInfo(user.uid);
  const renderNoItemsComponent = useMemo(
    () => (
      <Box
        sx={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          display: "flex",
        }}
      >
        <Text sx={{ fontSize: 20, fontWeight: "500", color: "#262626" }}>
          No Info available
        </Text>
      </Box>
    ),
    []
  );

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
    <Box sx={{ padding: 12, flex: 1 }}>
      <Text
        sx={{
          textAlign: "center",
          fontWeight: "600",
          color: "#000",
          marginBottom: 16,
          fontSize: 20,
        }}
      >
        Following
      </Text>
      <FlatList
        style={{ flex: 1 }}
        data={postInfos}
        renderItem={({ item }) => <RenderItem info={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Box sx={{ height: 12 }} />}
        ListEmptyComponent={!loading ? renderNoItemsComponent : null}
        ListFooterComponent={!!loading ? renderLoadingIndicator : null}
      />
    </Box>
  );
};

interface RenderItemProps {
  info: LikesInfo;
}

const RenderItem: React.FC<RenderItemProps> = ({ info }) => {
  return <PostInfo info={info} />;
};

export default Likes;

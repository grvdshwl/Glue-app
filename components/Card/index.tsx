import { Box } from "@gluestack-ui/themed";
import React, { useContext } from "react";
import CardCaption from "./CardCaption";
import CardUserInfo from "./CardUserInfo";
import CardAction from "./CardAction";
import CardList from "./CardList";
import usePosts from "../../hooks/usePosts";
import { AppContext } from "../../context";
import CardCommentSection from "./CardCommentSection";

interface CardProps {
  data: any;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const { user } = useContext(AppContext);

  const { toggleLikes, isLiked, likesCount } = usePosts(data.id, user);

  return (
    <Box sx={{ gap: 8, flex: 1, marginBottom: 12 }}>
      <CardUserInfo data={data} />
      <CardList images={data.images} />
      <CardAction toggleLikes={toggleLikes} isLiked={isLiked} data={data} />
      <CardCaption caption={data.caption} likesCount={likesCount} />
      <CardCommentSection data={data} />
    </Box>
  );
};

export default Card;

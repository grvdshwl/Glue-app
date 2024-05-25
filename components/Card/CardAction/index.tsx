import { Box } from "@gluestack-ui/themed";
import React, { useState, useRef } from "react";
import { Animated, Pressable } from "react-native";
import CommentIcon from "../../../Icons/CommentIcon";
import SendIcon from "../../../Icons/SendIcon";
import BookmarkIcon, {
  BookmarkIconOutlineIcon,
} from "../../../Icons/BookmarkIcon";
import HeartFilledIcon from "../../../Icons/HeartFilledIcon";
import HeartOutLineIcon from "../../../Icons/HeartOutlineIcon";
import CommentPopUp from "../../CommentBoxPopUp";
import AnimatedHeart from "../../../Animation/AnimatedHeart";

interface CardActionProps {
  isLiked: boolean;
  toggleLikes: () => void;
  data: any;
}
const CardAction: React.FC<CardActionProps> = ({
  isLiked,
  toggleLikes,
  data,
}) => {
  const [isBookMarked, setIsBookmarked] = useState(false);
  const [commentModal, setShowCommentModal] = useState(false);
  const scaleValueHeart = useRef(new Animated.Value(1)).current;
  const scaleValueBookmark = useRef(new Animated.Value(1)).current;
  const [likeClicked, setLikeClicked] = useState(false);
  const toggleBookmark = () => {
    setIsBookmarked((prevState) => !prevState);
    if (!isBookMarked) {
      animateBookmarkScale();
    }
  };

  const handleComment = () => {
    setShowCommentModal(true);
  };

  const handleLikes = () => {
    toggleLikes();
    if (!isLiked) {
      setLikeClicked(true);
      animateHeartScale();
    }
  };

  const animateHeartScale = () => {
    Animated.sequence([
      Animated.timing(scaleValueHeart, {
        toValue: 1.6,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValueHeart, {
        toValue: 1,
        friction: 2,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateBookmarkScale = () => {
    Animated.sequence([
      Animated.timing(scaleValueBookmark, {
        toValue: 1.6,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValueBookmark, {
        toValue: 1,
        friction: 2,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatedHeartStyle = {
    transform: [{ scale: scaleValueHeart }],
  };

  const animatedBookmarkStyle = {
    transform: [{ scale: scaleValueBookmark }],
  };

  return (
    <Box
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 12,
      }}
    >
      <Box sx={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        <Pressable onPress={handleLikes}>
          <Animated.View style={[{ padding: 10 }, animatedHeartStyle]}>
            {!isLiked ? <HeartOutLineIcon /> : <HeartFilledIcon />}
          </Animated.View>
          {isLiked &&
            likeClicked &&
            [1, 2, 3, 4, 5, 6, 7].map((a, i) => (
              <AnimatedHeart key={i} index={i} />
            ))}
        </Pressable>

        <Pressable onPress={handleComment}>
          <CommentIcon />
        </Pressable>
        <SendIcon />
      </Box>
      <Box sx={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable onPress={toggleBookmark}>
          <Animated.View style={[{ padding: 10 }, animatedBookmarkStyle]}>
            {!isBookMarked ? <BookmarkIconOutlineIcon /> : <BookmarkIcon />}
          </Animated.View>
        </Pressable>
      </Box>
      <CommentPopUp
        isVisible={commentModal}
        setIsVisible={setShowCommentModal}
        data={data}
      />
    </Box>
  );
};

export default CardAction;

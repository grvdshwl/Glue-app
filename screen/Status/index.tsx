import React from "react";
import StatusStory from "../../components/StatusStory";
import { useRoute } from "@react-navigation/native";
import AnimatedStories from "../../Animation/AnimatedStories";
import { getStoriesFromId } from "../../utils/helper";

const Status: React.FC = ({}) => {
  const {
    params: { story },
  } = useRoute() as { params: any };

  const stories = getStoriesFromId(story.id);
  return <AnimatedStories stories={stories} />;
};

export default Status;

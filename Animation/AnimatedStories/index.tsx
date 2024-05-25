import * as React from "react";
import {
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  View,
  TouchableOpacity,
} from "react-native";

import StatusStory from "../../components/StatusStory";
import { useNavigation } from "@react-navigation/native";
import { CrossIcon } from "../../Icons/CrossIcon";

const { width } = Dimensions.get("window");
const perspective = width;
const angle = Math.atan(perspective / (width / 2));
const ratio = Platform.OS === "ios" ? 2 : 1.2;

type StoriesProps = {
  stories: any[];
};

const Stories = ({ stories }: StoriesProps) => {
  const x = React.useRef(new Animated.Value(0)).current;
  const scrollRef = React.useRef(null);
  const [displayIndex, setDisplayIndex] = React.useState(0);
  const navigation = useNavigation();

  const scrollToNext = () => {
    if (displayIndex === stories.length - 1) {
      navigation.navigate("Feed" as never);
      return;
    }
    if (scrollRef.current) {
      const newIndex = Math.floor(x.__getValue() / width) + 1;
      const newOffset = newIndex * width;
      scrollRef.current.scrollTo({ x: newOffset, animated: true });
      Animated.timing(x, {
        toValue: newOffset,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setDisplayIndex((prevIndex) => prevIndex + 1);
    }
  };

  const getStyle = (index: number) => {
    const offset = index * width;

    const inputRange = [offset - width, offset + width];

    const translateX = x.interpolate({
      inputRange,
      outputRange: [width / ratio, -width / ratio],
      extrapolate: "clamp",
    });
    const rotateY = x.interpolate({
      inputRange,
      outputRange: [`${angle}rad`, `-${angle}rad`],
      extrapolate: "clamp",
    });

    const translateX1 = x.interpolate({
      inputRange,
      outputRange: [width / 2, -width / 2],
      extrapolate: "clamp",
    });

    const extra = width / ratio / Math.cos(angle / 2) - width / ratio;
    const translateX2 = x.interpolate({
      inputRange,
      outputRange: [-extra, extra],
      extrapolate: "clamp",
    });

    return {
      ...StyleSheet.absoluteFillObject,
      transform: [
        { perspective },
        { translateX },
        { rotateY },
        { translateX: translateX1 },
        { translateX: translateX2 },
      ],
    };
  };

  const getMaskStyle = (index: number) => {
    const offset = index * width;
    const inputRange = [offset - width, offset, offset + width];
    const opacity = x.interpolate({
      inputRange,
      outputRange: [0.75, 0, 0.75],
      extrapolate: "clamp",
    });
    return {
      backgroundColor: "black",
      ...StyleSheet.absoluteFillObject,
      opacity,
    };
  };

  return (
    <View style={styles.container}>
      {stories.map((story, i) => (
        <Animated.View style={getStyle(i)} key={story.id}>
          <StatusStory
            userStory={story}
            scrollToNext={scrollToNext}
            isCurrentIndex={displayIndex === i}
          />
        </Animated.View>
      ))}
      <Animated.ScrollView
        ref={scrollRef}
        style={StyleSheet.absoluteFillObject}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={width}
        contentContainerStyle={{ width: width * (stories.length + 1) }}
        decelerationRate={0.99}
        horizontal
      />
      <TouchableOpacity
        onPress={() => {
          navigation?.navigate("Feed" as never);
        }}
        style={{ position: "absolute", right: 16, top: 40 }}
      >
        <CrossIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2e2e2e",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Stories;

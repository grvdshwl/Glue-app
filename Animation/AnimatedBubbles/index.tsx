import React, { useState } from "react";
import { Animated, View, StyleSheet, Easing } from "react-native";
import FollowButton from "../../Buttons/FollowButton";

interface BubbleProps {
  size: Animated.Value;
  opacity: Animated.Value;
  left: Animated.Value;
  top: Animated.Value;
}

interface Props {
  isFollowing: boolean;
  isLoading: boolean;
  follow: () => void;
}

const Bubble: React.FC<BubbleProps> = ({ size, opacity, left, top }) => {
  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          width: size,
          height: size,
          borderRadius: size,
          left: left,
          top: top,
          opacity: opacity,
        },
      ]}
    />
  );
};

const BubblesAnimation: React.FC<Props> = ({
  isFollowing,
  isLoading,
  follow,
}) => {
  const [bubbles, setBubbles] = useState<BubbleProps[]>([]);

  const createBubbles = () => {
    const numBubbles = 40;
    const newBubbles: BubbleProps[] = [];

    for (let i = 0; i < numBubbles; i++) {
      const newBubble: BubbleProps = {
        size: new Animated.Value(0),
        opacity: new Animated.Value(1),
        left: new Animated.Value(Math.random() * 120),
        top: new Animated.Value(Math.random() * 100),
      };

      newBubbles.push(newBubble);
      Animated.parallel([
        Animated.timing(newBubble.size, {
          toValue: 20,
          duration: 1500,
          delay: 100,
          useNativeDriver: false,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(newBubble.opacity, {
          toValue: 0,
          duration: 1500,
          delay: 100,
          useNativeDriver: false,
          easing: Easing.out(Easing.ease),
        }),
      ]).start();
    }

    setBubbles(newBubbles);
  };

  const handlePress = () => {
    if (!isFollowing) {
      createBubbles();
    }
    follow();
  };

  return (
    <View style={styles.container}>
      <FollowButton
        isFollowing={isFollowing}
        isLoading={isLoading}
        onPress={handlePress}
      >
        <View
          style={{
            position: "absolute",
            transform: [{ translateX: -80 }, { translateY: -50 }],
          }}
        >
          {bubbles.map((bubble, index) => (
            <Bubble
              key={index}
              size={bubble.size}
              opacity={bubble.opacity}
              left={bubble.left}
              top={bubble.top}
            />
          ))}
        </View>
      </FollowButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  bubble: {
    position: "absolute",
    backgroundColor: "#339af0",
  },
});

export default BubblesAnimation;

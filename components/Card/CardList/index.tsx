import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CardImage from "../CardImage";
import { Box } from "@gluestack-ui/themed";

interface Props {
  images: ImageItem[];
}

interface ImageItem {
  alt: string;
  url: string;
}

const CardList: React.FC<Props> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem = ({ item }: { item: ImageItem }) => (
    <CardImage image={item.url} alt={item.alt} />
  );

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: any[];
  }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  };

  return (
    <Box style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={images}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 10 }}
        keyExtractor={(_, index) => index.toString()}
      />
      {images?.length > 1 && (
        <Box style={styles.pagination}>
          {images.map((_, index) => (
            <Box
              key={index}
              style={[
                styles.paginationDot,
                { opacity: currentIndex === index ? 1 : 0.4 },
              ]}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
    marginHorizontal: 5,
  },
});

export default CardList;

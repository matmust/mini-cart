import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import { Image } from '../../common';
import { styles } from './ProductGallery.styles';

const { width: screenWidth } = Dimensions.get('window');

interface ProductGalleryProps {
  images: string[];
  testID?: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, testID }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const galleryWidth = screenWidth * 0.9;

  const handleScroll = useCallback(
    (event: any) => {
      const contentOffset = event.nativeEvent.contentOffset;
      const imageIndex = Math.round(contentOffset.x / galleryWidth);

      if (
        imageIndex !== currentIndex &&
        imageIndex >= 0 &&
        imageIndex < images.length
      ) {
        setCurrentIndex(imageIndex);
      }
    },
    [currentIndex, galleryWidth, images.length],
  );

  const handleIndicatorPress = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      scrollViewRef.current?.scrollTo({
        x: index * galleryWidth,
        animated: true,
      });
    },
    [galleryWidth],
  );

  const renderMainImage = (imageUri: string, index: number) => (
    <View key={index} style={styles.imageContainer}>
      <Image
        source={{ uri: imageUri }}
        style={styles.mainImage}
        resizeMode='cover'
        testID={`gallery-image-${index}`}
      />
    </View>
  );

  const renderIndicators = () => {
    if (images.length <= 1) return null;

    return (
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.indicator,
              index === currentIndex && styles.activeIndicator,
            ]}
            onPress={() => handleIndicatorPress(index)}
            testID={`indicator-${index}`}
          />
        ))}
      </View>
    );
  };

  if (!images || images.length === 0) {
    return (
      <View style={styles.emptyGallery} testID='empty-gallery'>
        <Text style={styles.placeholderText}>No images available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.galleryContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
        >
          {images.map(renderMainImage)}
        </ScrollView>

        {renderIndicators()}
      </View>
    </View>
  );
};

export default ProductGallery;

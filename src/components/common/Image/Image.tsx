import React, { useState } from 'react';
import { Image as RNImage, View, ActivityIndicator } from 'react-native';
import { styles } from './Image.styles';
import Icon from '../Icon';
import { colors } from '../../../constants';
import { ImageProps } from '../../../types';

const Image: React.FC<ImageProps> = ({
  source,
  width,
  height,
  resizeMode = 'cover',
  style,
  testID,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const imageStyle = [
    styles.image,
    width ? { width } : undefined,
    height ? { height } : undefined,
    style,
  ];

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <View
      style={[
        styles.container,
        width ? { width } : undefined,
        height ? { height } : undefined,
      ]}
    >
      <RNImage
        source={source}
        style={imageStyle}
        resizeMode={resizeMode}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        testID={testID}
      />

      {loading && (
        <View style={styles.loadingOverlay} testID='loading-indicator'>
          <ActivityIndicator size='small' color={colors.primary} />
        </View>
      )}

      {error && (
        <View style={styles.errorOverlay} testID='error-indicator'>
          <Icon name='camera' color={colors.primary} />
        </View>
      )}
    </View>
  );
};

export default Image;

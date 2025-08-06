import React, { useState, useCallback } from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import { styles } from './ProductListScreen.styles';
import { useProducts } from '../../hooks';
import { LoadingSpinner, ErrorMessage, ProductCard } from '../../components';
import { colors } from '../../constants';
import { Product, ProductListScreenProps } from '../../types';

const ProductListScreen: React.FC<ProductListScreenProps> = ({
  navigation,
}) => {
  const { products, loading, error, refetch } = useProducts(30, 0);
  const [refreshing, setRefreshing] = useState(false);

  const handleProductPress = useCallback(
    (product: Product) => {
      navigation.navigate('ProductDetail', { productId: product.id });
    },
    [navigation],
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard product={item} onPress={() => handleProductPress(item)} />
    ),
    [handleProductPress],
  );

  const renderEmptyList = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products available</Text>
      </View>
    ),
    [],
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <LoadingSpinner testID='products-loading' />
      </View>
    );
  }

  if (error && !refreshing) {
    return (
      <View style={styles.container}>
        <ErrorMessage
          message={error}
          onRetry={refetch}
          testID='products-error'
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={renderEmptyList}
        testID='products-list'
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
        getItemLayout={(_data, index) => ({
          length: 280,
          offset: 280 * Math.floor(index / 2),
          index,
        })}
      />
    </View>
  );
};

export default ProductListScreen;

import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: {
    productId: number;
  };
  Cart: undefined;
};

export type ProductListScreenProps = StackScreenProps<
  RootStackParamList,
  'ProductList'
>;

export type ProductDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;
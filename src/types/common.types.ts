import { StyleProp } from 'react-native';

export interface BaseComponentProps {
  testID?: string;
  style?: StyleProp<any>;
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';

export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends BaseComponentProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
}

export interface ErrorMessageProps extends BaseComponentProps {
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export interface LoadingSpinnerProps extends BaseComponentProps {
  size?: 'small' | 'large';
  color?: string;
}

export interface ImageProps extends BaseComponentProps {
  source: { uri: string } | number;
  width?: number;
  height?: number;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
}

export interface CardProps extends BaseComponentProps {
  children: React.ReactNode;
  onPress?: () => void;
  elevated?: boolean;
}

export interface BadgeProps extends BaseComponentProps {
  count: number;
  maxCount?: number;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  formatText?: (count: number, maxCount: number) => string;
}

export interface IconProps extends BaseComponentProps {
  name: string;
  size?: number;
  color?: string;
}

export interface QuantitySelectorProps extends BaseComponentProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  variant?: 'small' | 'large';
}
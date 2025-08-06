# MiniCart - React Native E-commerce Prototype

A sample e-commerce application built with React Native and TypeScript, providing a mobile shopping experience with core functionality for product Browse, detailed product views, and cart management.

## 📁 Project Structure

```
src/                         # Source code
├── components/              # Reusable UI components
│   ├── cart/                # Cart-related components
│   ├── common/              # Common UI components (button, card, etc.)
│   └── product/             # Product-related components
├── constants/               # App constants (colors, fonts, spacing)
├── context/                 # React Context providers and reducers
├── hooks/                   # Custom React hooks
├── navigation/              # Navigation configuration
├── screens/                 # Screen components
│   ├── CartScreen/          # Shopping cart screen
│   ├── ProductDetailScreen/ # Product detail screen
│   └── ProductListScreen/   # Product list screen
├── services/                # API services and utilities
├── types/                   # TypeScript type definitions
└── utils/                   # Utility functions
```

## 🛠 Technology Stack

- **React Native**: 0.80.2
- **TypeScript**: 5.0.4
- **React Navigation**: 7.x (Stack Navigator)
- **Context API**: For state management
- **DummyJSON API**: Product data source
- **Jest**: Testing framework
- **React Native Testing Library**: Component testing
- **ESLint + Prettier**: Code formatting and linting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: >= 18.0.0
- **npm** or **yarn**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development on macOS)
- **Ruby**: >= 2.6.10 (for iOS CocoaPods)

# Getting Started

### 1. Install Dependencies

First, install the project dependencies:

```bash
# Install Node.js dependencies
npm install

# OR using Yarn
yarn install
```

### 2. Android Setup

For Android development, ensure you have:

1. **Android Studio** installed with Android SDK
2. **Android SDK Build-Tools** and **Android SDK Platform-Tools**
3. **Android Virtual Device (AVD)** configured or a physical device connected
4. **ANDROID_HOME** environment variable set
5. **Enable USB debugging** on your Android device (if using physical device)

### 3. iOS Setup (macOS only)

For iOS development, install CocoaPods dependencies:

```bash
# Install Ruby gems (only needed once)
bundle install

# Install iOS dependencies
cd ios && bundle exec pod install && cd ..
```

### 4. Start Metro Server

Start the Metro bundler:

```bash
npm start
# OR
yarn start
```

### 5. Run the Application

In a new terminal window, run the app on your preferred platform:

#### Android
```bash
npm run android
# OR
yarn android
```

#### iOS (macOS only)
```bash
npm run ios
# OR
yarn ios
```

## 🧪 Additional Scripts

```bash
# Run tests with coverage
npm test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run type-check

# Lint code
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check
```

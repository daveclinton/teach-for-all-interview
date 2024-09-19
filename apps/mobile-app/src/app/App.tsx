import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Animated,
  ViewStyle,
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { HomeScreen } from '@teach-for-all/screens';

import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E3B5A4',
  },
};

const AnimatedShape: React.FC<{
  style: ViewStyle;
  children: React.ReactNode;
}> = ({ style, children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(moveAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, moveAnim]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: moveAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

const SplashScreen: React.FC = () => {
  return (
    <View style={splashStyles.container}>
      <AnimatedShape style={splashStyles.topLeftShape}>
        <View style={[splashStyles.shape, splashStyles.ribbon]} />
      </AnimatedShape>
      <AnimatedShape style={splashStyles.topRightShape}>
        <View style={[splashStyles.shape, splashStyles.square]} />
      </AnimatedShape>
      <AnimatedShape style={splashStyles.centerRightShape}>
        <View style={[splashStyles.shape, splashStyles.star]} />
      </AnimatedShape>
      <Text style={splashStyles.text}>Mobile SplashScreen</Text>
      <AnimatedShape style={splashStyles.bottomLeftShape}>
        <View style={[splashStyles.shape, splashStyles.diamond]} />
      </AnimatedShape>
      <AnimatedShape style={splashStyles.bottomRightShape}>
        <View style={[splashStyles.shape, splashStyles.star]} />
      </AnimatedShape>
    </View>
  );
};

export const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <HomeScreen />
      </SafeAreaView>
    </PaperProvider>
  );
};

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3B5A4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  shape: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
  },
  ribbon: {
    width: 30,
    height: 20,
    borderRadius: 5,
  },
  square: {
    transform: [{ rotate: '45deg' }],
  },
  star: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'yellow',
  },
  diamond: {
    transform: [{ rotate: '45deg' }],
    backgroundColor: 'blue',
  },
  topLeftShape: { position: 'absolute', top: 40, left: 40 },
  topRightShape: { position: 'absolute', top: 40, right: 40 },
  centerRightShape: { position: 'absolute', top: '40%', right: 40 },
  bottomLeftShape: { position: 'absolute', bottom: 40, left: 40 },
  bottomRightShape: { position: 'absolute', bottom: 40, right: 40 },
});

export default App;

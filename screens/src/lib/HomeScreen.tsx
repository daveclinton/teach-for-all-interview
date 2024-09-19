import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.textLg}>Hello there,</Text>
      <Text
        style={[styles.textXL, styles.appTitleText]}
        testID="heading"
        role="heading"
      >
        Welcome MobileApp
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  textLg: {
    fontSize: 24,
  },
  textXL: {
    fontSize: 48,
  },
  appTitleText: {
    paddingTop: 12,
    fontWeight: '500',
  },
  section: {
    marginVertical: 12,
    marginHorizontal: 12,
  },
});

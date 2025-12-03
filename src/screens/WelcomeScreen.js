import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BORDER_COLOR = '#e6f2ff';
const ACCENT = '#4CAF50';

export default function WelcomeScreen({ navigation }) {
  const handleGetStarted = () => {
    if (navigation?.navigate) {
      navigation.navigate('ParentProfileSetup');
    }
  };

  const handleSignIn = () => {
    if (navigation?.navigate) {
      navigation.navigate('SignIn');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={[styles.sideBorder, styles.leftBorder]} />
        <View style={[styles.sideBorder, styles.rightBorder]} />

        <View style={styles.content}>
          <View style={styles.illustrationWrapper}>
            <LinearGradient
              colors={['#b8f3c8', '#7fe4ad']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.illustrationBg}
            >
              <View style={styles.starsLayer}>
                {['★', '★', '★', '★'].map((star, idx) => (
                  <Text key={idx} style={styles.star}>
                    {star}
                  </Text>
                ))}
              </View>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
                }}
                style={styles.illustration}
                resizeMode="cover"
              />
            </LinearGradient>
          </View>

          <Text style={styles.title}>Welcome to StarKids</Text>
          <Text style={styles.subtitle}>
            Track routines, reward good behavior, and motivate your family every day.
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.9}
            onPress={handleGetStarted}
          >
            <Text style={styles.primaryText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignIn} activeOpacity={0.8}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideBorder: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 18,
    backgroundColor: BORDER_COLOR,
  },
  leftBorder: {
    left: 0,
  },
  rightBorder: {
    right: 0,
  },
  content: {
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 40,
  },
  illustrationWrapper: {
    marginBottom: 28,
    alignItems: 'center',
  },
  illustrationBg: {
    width: 260,
    height: 260,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  starsLayer: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  star: {
    color: '#ffdd55',
    fontSize: 18,
    opacity: 0.9,
  },
  illustration: {
    width: 240,
    height: 240,
    borderRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#000000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 32,
    paddingBottom: 32,
    alignItems: 'center',
    gap: 12,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: ACCENT,
    borderRadius: 28,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  signInText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
});

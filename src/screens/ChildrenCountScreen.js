import React, { useMemo, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ACCENT = '#23c16b';
const DARK = '#0f1b12';
const MUTED = '#5b6a60';
const MIN_CHILDREN = 1;

export default function ChildrenCountScreen({ navigation }) {
  const [count, setCount] = useState(MIN_CHILDREN);

  const progressWidth = useMemo(() => `${(2 / 6) * 100}%`, []);

  const adjustCount = (delta) => {
    setCount((prev) => Math.max(MIN_CHILDREN, prev + delta));
  };

  const handleNext = () => {
    if (navigation?.navigate) {
      navigation.navigate('Step3', { childCount: count });
    } else {
      Alert.alert('Next', `Proceeding with ${count} child(ren). Navigation not configured yet.`);
    }
  };

  return (
    <LinearGradient colors={['#dff8e9', '#d8f0ff']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Step 2 of 6</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: progressWidth }]} />
            </View>
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>How many children are you adding?</Text>
            <Text style={styles.subtitle}>You can always add more later.</Text>
          </View>

          <View style={styles.counterRow}>
            <TouchableOpacity
              style={[styles.counterButton, styles.shadow]}
              activeOpacity={0.8}
              onPress={() => adjustCount(-1)}
            >
              <Text style={styles.counterSymbol}>-</Text>
            </TouchableOpacity>

            <View style={styles.counterValueContainer}>
              <Text style={styles.counterValue}>{count}</Text>
            </View>

            <TouchableOpacity
              style={[styles.counterButton, styles.shadow]}
              activeOpacity={0.8}
              onPress={() => adjustCount(1)}
            >
              <Text style={styles.counterSymbol}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.primaryButton, styles.shadow]}
              activeOpacity={0.9}
              onPress={handleNext}
            >
              <Text style={styles.primaryText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressContainer: {
    width: '100%',
    gap: 8,
  },
  progressTrack: {
    height: 8,
    borderRadius: 10,
    backgroundColor: '#e4eee7',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: ACCENT,
  },
  progressText: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '700',
  },
  header: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: DARK,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: MUTED,
    textAlign: 'center',
  },
  counterRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  counterButton: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d6e4d9',
  },
  counterSymbol: {
    fontSize: 30,
    fontWeight: '800',
    color: DARK,
  },
  counterValueContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d6e4d9',
  },
  counterValue: {
    fontSize: 56,
    fontWeight: '900',
    color: ACCENT,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
});

import React, { useMemo, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ACCENT = '#23c16b';
const TEXT = '#0f1b12';
const BORDER = '#d6e4d9';
const MUTED = '#5a6b5c';

const taskOptions = [
  { key: 'morning', label: 'Morning routine', icon: '☀️', defaultSelected: true },
  { key: 'bedtime', label: 'Bedtime', icon: '🌙', defaultSelected: false },
  { key: 'chores', label: 'Chores', icon: '🧹', defaultSelected: true },
  { key: 'school', label: 'Schoolwork', icon: '📚', defaultSelected: false },
  { key: 'kindness', label: 'Kindness', icon: '💚', defaultSelected: false },
  { key: 'hygiene', label: 'Hygiene', icon: '🧴', defaultSelected: true },
  { key: 'custom', label: 'Custom', icon: '✨', defaultSelected: false },
];

export default function TaskPreferencesScreen({ navigation }) {
  const initialSelected = useMemo(
    () =>
      taskOptions.reduce((acc, opt) => {
        if (opt.defaultSelected) acc.add(opt.key);
        return acc;
      }, new Set()),
    []
  );

  const [selected, setSelected] = useState(initialSelected);
  const [autoGenerate, setAutoGenerate] = useState(true);

  const dots = Array.from({ length: 6 }, (_, i) => i <= 3);

  const toggleTask = (key) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleNext = () => {
    const payload = {
      selectedTasks: Array.from(selected),
      autoGenerate,
    };

    if (navigation?.navigate) {
      navigation.navigate('Step5', payload);
    } else {
      Alert.alert('Saved', 'Navigation not configured yet.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Step 4 of 6</Text>
          <View style={styles.dotRow}>
            {dots.map((active, idx) => (
              <View key={idx} style={[styles.dot, active ? styles.dotActive : styles.dotInactive]} />
            ))}
          </View>
        </View>

        <Text style={styles.title}>Help us tailor tasks for your family.</Text>

        <View style={styles.grid}>
          {taskOptions.map((opt) => {
            const active = selected.has(opt.key);
            return (
              <TouchableOpacity
                key={opt.key}
                style={[styles.card, active && styles.cardActive]}
                activeOpacity={0.85}
                onPress={() => toggleTask(opt.key)}
              >
                <Text style={styles.icon}>{opt.icon}</Text>
                <Text style={[styles.cardLabel, active && styles.cardLabelActive]}>{opt.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Generate recommended task list</Text>
          <Switch
            value={autoGenerate}
            onValueChange={setAutoGenerate}
            trackColor={{ false: '#cbd8cf', true: '#c9f0d9' }}
            thumbColor={autoGenerate ? ACCENT : '#f4f4f4'}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.9} onPress={handleNext}>
          <Text style={styles.primaryText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 20,
    gap: 18,
  },
  progressContainer: {
    alignItems: 'center',
    gap: 8,
  },
  progressText: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '700',
  },
  dotRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotActive: {
    backgroundColor: ACCENT,
  },
  dotInactive: {
    backgroundColor: '#d6e4d9',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: TEXT,
    lineHeight: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '48%',
    minHeight: 90,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: '#ffffff',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  cardActive: {
    borderColor: ACCENT,
    backgroundColor: '#e8f9f0',
  },
  icon: {
    fontSize: 22,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT,
    textAlign: 'center',
  },
  cardLabelActive: {
    color: '#138f4f',
  },
  toggleRow: {
    marginTop: 8,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  toggleLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT,
    flex: 1,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
  },
  primaryButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: ACCENT,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  primaryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
});

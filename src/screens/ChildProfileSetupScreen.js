import React, { useMemo, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';

const ACCENT = '#23c16b';
const DARK = '#0f1b12';
const BORDER = '#d6e4d9';
const MUTED = '#5a6b5c';

const avatarOptions = [
  'Stars',
  'Space Explorers',
  'Animals',
  'Super Heroes',
];

const goalOptions = [
  'Routine building',
  'School focus',
  'Chores',
  'Emotional skills',
  'Healthy habits',
];

export default function ChildProfileSetupScreen({ navigation, route }) {
  const childIndex = route?.params?.childIndex ?? 1;
  const totalChildren = route?.params?.totalChildren ?? 2;
  const existingChildren = route?.params?.childrenData ?? [];

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [avatarTheme, setAvatarTheme] = useState('Stars');
  const [goals, setGoals] = useState(new Set(['Routine building', 'Emotional skills']));

  const progressWidth = useMemo(() => `${(3 / 6) * 100}%`, []);
  const ages = useMemo(() => Array.from({ length: 18 }, (_, i) => `${i + 1}`), []);

  const toggleGoal = (goal) => {
    setGoals((prev) => {
      const next = new Set(prev);
      if (next.has(goal)) {
        next.delete(goal);
      } else {
        next.add(goal);
      }
      return next;
    });
  };

  const handleAddChild = () => {
    if (!name.trim()) {
      Alert.alert('Missing name', "Please add the child's name to continue.");
      return;
    }

    const childData = { name: name.trim(), age, avatarTheme, goals: [...goals] };
    const updatedChildren = [...existingChildren, childData];

    if (childIndex < totalChildren) {
      navigation?.navigate
        ? navigation.navigate('Step3', {
            ...route?.params,
            childIndex: childIndex + 1,
            childrenData: updatedChildren,
          })
        : Alert.alert('Next child', 'Navigation not configured yet.');
    } else if (navigation?.navigate) {
      navigation.navigate('Step4', {
        ...route?.params,
        childrenData: updatedChildren,
      });
    } else {
      Alert.alert('Saved', 'Navigation not configured yet.');
    }
  };

  const handleSkip = () => {
    if (childIndex < totalChildren && navigation?.navigate) {
      navigation.navigate('Step3', {
        ...route?.params,
        childIndex: childIndex + 1,
        childrenData: existingChildren,
      });
    } else if (navigation?.navigate) {
      navigation.navigate('Step4', {
        ...route?.params,
        childrenData: existingChildren,
      });
    } else {
      Alert.alert('Skipped', 'Navigation not configured yet.');
    }
  };

  return (
    <LinearGradient colors={['#e9f9f0', '#d2f2e0']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: progressWidth }]} />
            </View>
            <Text style={styles.progressText}>Step 3 of 6</Text>
            <Text style={styles.childCount}>Child {childIndex} of {totalChildren}</Text>
          </View>

          <Text style={styles.title}>Child {childIndex} of {totalChildren}</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Child's Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g., Alex"
              style={styles.input}
              placeholderTextColor="#6a7c6f"
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Age</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={age}
                onValueChange={(val) => setAge(val)}
                style={styles.picker}
                dropdownIconColor={DARK}
              >
                <Picker.Item label="Select age" value="" />
                {ages.map((a) => (
                  <Picker.Item key={a} label={a} value={a} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Choose an Avatar Theme</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.avatarRow}
            >
              {avatarOptions.map((option) => {
                const selected = avatarTheme === option;
                return (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.avatarCard,
                      selected && styles.avatarCardSelected,
                    ]}
                    activeOpacity={0.85}
                    onPress={() => setAvatarTheme(option)}
                  >
                    <Text style={[styles.avatarText, selected && styles.avatarTextSelected]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>What are their main goals?</Text>
            <View style={styles.chipGrid}>
              {goalOptions.map((goal) => {
                const selected = goals.has(goal);
                return (
                  <TouchableOpacity
                    key={goal}
                    style={[styles.chip, selected && styles.chipSelected]}
                    activeOpacity={0.85}
                    onPress={() => toggleGoal(goal)}
                  >
                    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                      {goal}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, styles.shadow]}
            activeOpacity={0.9}
            onPress={handleAddChild}
          >
            <Text style={styles.primaryText}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipLink} onPress={handleSkip} activeOpacity={0.8}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </ScrollView>
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
  content: {
    padding: 20,
    gap: 16,
  },
  progressContainer: {
    gap: 6,
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
    color: '#5a6b5c',
    fontSize: 13,
    fontWeight: '600',
  },
  childCount: {
    color: '#4a5b4d',
    fontWeight: '700',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: DARK,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    gap: 12,
  },
  label: {
    color: '#4a5b4d',
    fontWeight: '700',
    fontSize: 14,
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 12,
    fontSize: 15,
    color: DARK,
    backgroundColor: '#fdfdfd',
  },
  pickerWrapper: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
    backgroundColor: '#fdfdfd',
  },
  picker: {
    height: 48,
    color: DARK,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: DARK,
  },
  avatarRow: {
    gap: 12,
    paddingVertical: 4,
  },
  avatarCard: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: '#ffffff',
  },
  avatarCardSelected: {
    borderColor: ACCENT,
    backgroundColor: '#e8f9f0',
  },
  avatarText: {
    color: DARK,
    fontWeight: '700',
  },
  avatarTextSelected: {
    color: '#138f4f',
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: '#ffffff',
  },
  chipSelected: {
    borderColor: ACCENT,
    backgroundColor: '#e8f9f0',
  },
  chipText: {
    color: DARK,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#138f4f',
  },
  primaryButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  skipLink: {
    alignItems: 'center',
    marginBottom: 8,
  },
  skipText: {
    color: '#3f5244',
    fontWeight: '700',
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
});

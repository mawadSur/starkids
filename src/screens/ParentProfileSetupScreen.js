import React, { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ACCENT = '#23c16b';
const LIGHT_BG = '#f7faf7';
const BORDER = '#dce7de';
const TEXT = '#1d2a20';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ParentProfileSetupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    daily: true,
    rewards: true,
    summary: false,
    badges: true,
  });
  const [prefOpen, setPrefOpen] = useState(true);

  const isFormValid = useMemo(() => {
    const hasName = name.trim().length > 0;
    const validEmail = emailRegex.test(email.trim());
    return hasName && validEmail;
  }, [name, email]);

  const togglePref = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCreateAccount = () => {
    if (!isFormValid) {
      Alert.alert(
        'Missing info',
        'Please add your name and a valid email to continue.'
      );
      return;
    }

    if (navigation?.navigate) {
      navigation.navigate('Step2');
    } else {
      Alert.alert('Progress saved', 'Navigation not configured yet.');
    }
  };

  const dots = Array.from({ length: 6 }, (_, idx) => idx === 0);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Step 1 of 6</Text>
            <View style={styles.dotRow}>
              {dots.map((active, idx) => (
                <View
                  key={idx}
                  style={[styles.dot, active ? styles.dotActive : styles.dotInactive]}
                />
              ))}
            </View>
          </View>

          <Text style={styles.title}>Your Profile</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Parent Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g. Jane Doe"
              style={styles.input}
              placeholderTextColor="#6a7c6f"
            />

            <Text style={styles.label}>Email for Weekly Summaries</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="e.g. jane.doe@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor="#6a7c6f"
            />
          </View>

          <View style={styles.card}>
            <TouchableOpacity
              style={styles.prefHeader}
              activeOpacity={0.8}
              onPress={() => setPrefOpen((prev) => !prev)}
            >
              <Text style={styles.sectionTitle}>Notification Preferences</Text>
              <Text style={styles.toggleIcon}>{prefOpen ? '−' : '+'}</Text>
            </TouchableOpacity>
            {prefOpen && (
              <View style={styles.prefList}>
                <CheckboxRow
                  label="Daily reminders"
                  value={preferences.daily}
                  onToggle={() => togglePref('daily')}
                />
                <CheckboxRow
                  label="Reward alerts"
                  value={preferences.rewards}
                  onToggle={() => togglePref('rewards')}
                />
                <CheckboxRow
                  label="Summary reports"
                  value={preferences.summary}
                  onToggle={() => togglePref('summary')}
                />
                <CheckboxRow
                  label="Badge announcements"
                  value={preferences.badges}
                  onToggle={() => togglePref('badges')}
                />
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.primaryButton, !isFormValid && styles.primaryButtonDisabled]}
            activeOpacity={0.9}
            onPress={handleCreateAccount}
            disabled={!isFormValid}
          >
            <Text style={styles.primaryText}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function CheckboxRow({ label, value, onToggle }) {
  return (
    <TouchableOpacity style={styles.prefRow} activeOpacity={0.8} onPress={onToggle}>
      <View style={[styles.checkbox, value && styles.checkboxChecked]}>
        {value && <View style={styles.checkboxDot} />}
      </View>
      <Text style={styles.prefLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: LIGHT_BG,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 16,
  },
  progressContainer: {
    gap: 8,
    alignItems: 'center',
  },
  progressText: {
    color: '#5a6b5c',
    fontSize: 13,
    fontWeight: '600',
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
    fontSize: 26,
    fontWeight: '800',
    color: TEXT,
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
    color: TEXT,
    backgroundColor: '#fdfdfd',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: TEXT,
    marginBottom: 4,
  },
  prefHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleIcon: {
    fontSize: 18,
    fontWeight: '800',
    color: TEXT,
  },
  prefList: {
    marginTop: 6,
    gap: 10,
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#c6d6c8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    borderColor: ACCENT,
    backgroundColor: '#e8f8ee',
  },
  checkboxDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ACCENT,
  },
  prefLabel: {
    fontSize: 15,
    color: TEXT,
    fontWeight: '600',
    flex: 1,
  },
  primaryButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: ACCENT,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  primaryButtonDisabled: {
    opacity: 0.6,
  },
  primaryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
  },
});

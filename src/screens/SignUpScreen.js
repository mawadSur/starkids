import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ACCENT = '#4CAF50';
const TEXT = '#1a1a1a';
const MUTED = '#6a6a6a';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreate = () => {
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
        <View style={styles.header}>
          <Text style={styles.title}>Create Your Account</Text>
          <Text style={styles.subtitle}>
            Securely save your family's progress and sync across devices.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="email@domain.com"
              placeholderTextColor="#9b9b9b"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Your Password"
              placeholderTextColor="#9b9b9b"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your Password"
              placeholderTextColor="#9b9b9b"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.9} onPress={handleCreate}>
            <Text style={styles.primaryText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={styles.or}>or</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity onPress={handleSignIn} activeOpacity={0.8} style={styles.footerLink}>
          <Text style={styles.signIn}>Already have an account? Sign In</Text>
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
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: TEXT,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: MUTED,
    lineHeight: 22,
  },
  form: {
    gap: 14,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    color: TEXT,
    fontWeight: '700',
  },
  input: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    paddingHorizontal: 14,
    fontSize: 15,
    color: TEXT,
    backgroundColor: '#fff',
  },
  primaryButton: {
    marginTop: 6,
    height: 54,
    borderRadius: 14,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: ACCENT,
    shadowOpacity: 0.16,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  primaryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e5e5',
  },
  or: {
    color: MUTED,
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  footerLink: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: 20,
  },
  signIn: {
    color: ACCENT,
    fontSize: 14,
    fontWeight: '700',
  },
});

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import WelcomeScreen from './src/screens/WelcomeScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ParentProfileSetupScreen from './src/screens/ParentProfileSetupScreen';
import ChildrenCountScreen from './src/screens/ChildrenCountScreen';
import ChildProfileSetupScreen from './src/screens/ChildProfileSetupScreen';
import TaskPreferencesScreen from './src/screens/TaskPreferencesScreen';
import RewardsCatalogScreen from './src/screens/RewardsCatalogScreen';
import ParentDashboardScreen from './src/screens/ParentDashboardScreen';
import ChildrenScreen from './src/screens/ChildrenScreen';
import ChildDashboardScreen from './src/screens/ChildDashboardScreen';
import ChildTasksScreen from './src/screens/ChildTasksScreen';
import EditTaskScreen from './src/screens/EditTaskScreen';

const Stack = createStackNavigator();

function SignInScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.placeholder}>
      <Text style={styles.placeholderTitle}>Sign In</Text>
      <TouchableOpacity
        style={styles.placeholderButton}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('ParentProfileSetup')}
      >
        <Text style={styles.placeholderButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="ParentProfileSetup" component={ParentProfileSetupScreen} />
        <Stack.Screen name="Step2" component={ChildrenCountScreen} />
        <Stack.Screen name="Step3" component={ChildProfileSetupScreen} />
        <Stack.Screen name="Step4" component={TaskPreferencesScreen} />
        <Stack.Screen name="Step5" component={RewardsCatalogScreen} />
        <Stack.Screen name="Step6" component={ParentDashboardScreen} />
        <Stack.Screen name="Children" component={ChildrenScreen} />
        <Stack.Screen name="ChildDashboard" component={ChildDashboardScreen} />
        <Stack.Screen name="ChildTasks" component={ChildTasksScreen} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
  },
  placeholderTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 16,
  },
  placeholderButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
  },
  placeholderButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});

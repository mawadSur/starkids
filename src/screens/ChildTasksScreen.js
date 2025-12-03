import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ACCENT = '#23c16b';
const DARK = '#0f1b12';
const MUTED = '#6a6a6a';
const CARD = '#ffffff';
const BG = '#f4f7f4';

const pendingTasks = [
  { id: '1', name: 'Make bed', points: 4, icon: '🛏️', done: false },
  { id: '2', name: 'Brush teeth', points: 3, icon: '🪥', done: false },
  { id: '3', name: 'Math homework', points: 6, icon: '📚', done: false },
];

const completedTasks = [
  { id: '4', name: 'Feed the pet', points: 5, icon: '🐾', time: '8:10 AM' },
  { id: '5', name: 'Water plants', points: 2, icon: '🌱', time: '7:45 AM' },
];

export default function ChildTasksScreen() {
  const [activeTab, setActiveTab] = useState('pending');

  const renderTask = (task, completed = false) => (
    <View key={task.id} style={[styles.taskCard, completed && styles.taskCardCompleted]}>
      <View style={styles.taskLeft}>
        <Text style={styles.taskIcon}>{task.icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={[styles.taskName, completed && styles.taskNameCompleted]}>{task.name}</Text>
          <Text style={[styles.taskPoints, completed && styles.taskPointsCompleted]}>
            {task.points} pts
          </Text>
          {completed && <Text style={styles.taskTime}>{task.time}</Text>}
        </View>
      </View>
      <View style={[styles.checkbox, completed ? styles.checkboxChecked : null]}>
        {completed && <Text style={styles.checkMark}>✔</Text>}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>Z</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Zahra</Text>
          <Text style={styles.progressText}>14 / 20 points</Text>
        </View>
        <View style={styles.streak}>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakText}>5 days</Text>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'pending' && styles.tabActive]}
          activeOpacity={0.8}
          onPress={() => setActiveTab('pending')}
        >
          <Text style={[styles.tabText, activeTab === 'pending' && styles.tabTextActive]}>
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.tabActive]}
          activeOpacity={0.8}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'pending'
          ? pendingTasks.map((t) => renderTask(t, false))
          : completedTasks.map((t) => renderTask(t, true))}

        {activeTab === 'pending' && (
          <View style={styles.completedSection}>
            <Text style={styles.completedTitle}>Completed tasks</Text>
            {completedTasks.map((t) => renderTask(t, true))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: CARD,
    borderBottomWidth: 1,
    borderBottomColor: '#e5ebe5',
    gap: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#dff4e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontWeight: '800',
    color: DARK,
    fontSize: 18,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: DARK,
  },
  progressText: {
    color: MUTED,
    fontWeight: '700',
    marginTop: 4,
  },
  streak: {
    alignItems: 'flex-end',
  },
  streakIcon: {
    fontSize: 18,
  },
  streakText: {
    color: DARK,
    fontWeight: '700',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: BG,
    gap: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#e8efe8',
  },
  tabActive: {
    backgroundColor: ACCENT,
  },
  tabText: {
    color: MUTED,
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 12,
  },
  taskCard: {
    backgroundColor: CARD,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e9e2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  taskCardCompleted: {
    borderColor: '#dcdcdc',
    backgroundColor: '#f7f7f7',
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  taskIcon: {
    fontSize: 20,
  },
  taskName: {
    fontWeight: '800',
    color: DARK,
  },
  taskPoints: {
    color: MUTED,
    fontWeight: '700',
  },
  taskNameCompleted: {
    color: MUTED,
  },
  taskPointsCompleted: {
    color: '#9a9a9a',
  },
  taskTime: {
    color: '#9a9a9a',
    fontSize: 12,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d9d1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    borderColor: ACCENT,
    backgroundColor: '#e8f9f0',
  },
  checkMark: {
    color: ACCENT,
    fontWeight: '900',
    fontSize: 16,
  },
  completedSection: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e2e9e2',
    gap: 10,
  },
  completedTitle: {
    fontWeight: '800',
    color: DARK,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  fabText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '800',
    marginTop: -2,
  },
});

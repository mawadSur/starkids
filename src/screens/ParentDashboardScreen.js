import React from 'react';
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

const children = [
  { name: 'Liam', points: 120, completed: 5, total: 7 },
  { name: 'Ava', points: 98, completed: 4, total: 6 },
];

const leaderboard = [
  { name: 'Liam', points: 120, medal: '🥇' },
  { name: 'Ava', points: 98, medal: '🥈' },
  { name: 'Noah', points: 76, medal: '🥉' },
];

export default function ParentDashboardScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
            <Text style={styles.iconText}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.date}>Monday, Oct 23</Text>

        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.tabActive]} activeOpacity={0.8}>
            <Text style={[styles.tabText, styles.tabTextActive]}>Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} activeOpacity={0.8}>
            <Text style={styles.tabText}>Weekly</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          {children.map((child) => {
            const progress = Math.min(1, child.completed / child.total);
            const progressText = `${child.completed}/${child.total} tasks`;
            return (
              <View key={child.name} style={styles.childCard}>
                <View style={styles.childRow}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{child.name[0]}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.childName}>{child.name}</Text>
                    <Text style={styles.points}>{child.points} pts</Text>
                  </View>
                  <View style={styles.ring}>
                    <View style={[styles.ringInner, { borderColor: ACCENT }]}>
                      <Text style={styles.ringText}>{Math.round(progress * 100)}%</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.taskRow}>
                  <Text style={styles.taskText}>{progressText}</Text>
                  <Text style={styles.taskSub}>Progress today</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Leaderboard</Text>
          <View style={styles.leaderboardCard}>
            {leaderboard.map((item, idx) => (
              <View key={item.name} style={styles.leaderRow}>
                <Text style={styles.rank}>{idx + 1}</Text>
                <Text style={styles.medal}>{item.medal}</Text>
                <Text style={styles.leaderName}>{item.name}</Text>
                <Text style={styles.leaderPoints}>{item.points} pts</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        {['Dashboard', 'Children', 'Tasks', 'Rewards', 'Menu'].map((tab, idx) => {
          const active = idx === 0;
          return (
            <TouchableOpacity key={tab} style={styles.bottomItem} activeOpacity={0.8}>
              <Text style={[styles.bottomText, active && styles.bottomTextActive]}>{tab}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: DARK,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: CARD,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconText: {
    fontSize: 18,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 16,
  },
  date: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '700',
  },
  tabs: {
    flexDirection: 'row',
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
  section: {
    gap: 10,
  },
  childCard: {
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e9e2',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  childRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#dff4e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontWeight: '800',
    color: DARK,
    fontSize: 16,
  },
  childName: {
    fontSize: 16,
    fontWeight: '800',
    color: DARK,
  },
  points: {
    color: MUTED,
    fontWeight: '700',
    marginTop: 2,
  },
  ring: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#e6efe8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringText: {
    fontWeight: '800',
    color: DARK,
  },
  taskRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    fontWeight: '700',
    color: DARK,
  },
  taskSub: {
    color: MUTED,
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: DARK,
  },
  leaderboardCard: {
    backgroundColor: CARD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e9e2',
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 10,
  },
  rank: {
    width: 20,
    textAlign: 'center',
    color: DARK,
    fontWeight: '700',
  },
  medal: {
    width: 28,
    textAlign: 'center',
    fontSize: 18,
  },
  leaderName: {
    flex: 1,
    fontWeight: '700',
    color: DARK,
  },
  leaderPoints: {
    fontWeight: '700',
    color: ACCENT,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: CARD,
    borderTopWidth: 1,
    borderTopColor: '#e1e8e1',
  },
  bottomItem: {
    alignItems: 'center',
  },
  bottomText: {
    color: MUTED,
    fontWeight: '700',
  },
  bottomTextActive: {
    color: ACCENT,
  },
});

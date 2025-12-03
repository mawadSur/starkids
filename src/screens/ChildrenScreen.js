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
const BLUE = '#7fc4ff';
const DARK = '#0f1b12';
const MUTED = '#6a6a6a';
const CARD = '#ffffff';
const BG = '#f4f7f4';

const children = [
  { name: 'Liam', age: 8, todays: 65, todaysTotal: 100, week: 240, weekTotal: 400 },
  { name: 'Ava', age: 6, todays: 40, todaysTotal: 100, week: 180, weekTotal: 400 },
];

export default function ChildrenScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Children</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
              <Text style={styles.iconText}>＋</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
              <Text style={styles.iconText}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.subtitle}>Manage profiles, tasks, and points</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {children.map((child) => {
          const todayPct = Math.min(1, child.todays / child.todaysTotal);
          const weekPct = Math.min(1, child.week / child.weekTotal);
          return (
            <View key={child.name} style={styles.card}>
              <View style={styles.row}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{child.name[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.childName}>{child.name}</Text>
                  <Text style={styles.childMeta}>Age {child.age}</Text>
                </View>
                <View style={styles.iconStack}>
                  <Text style={styles.check}>✔</Text>
                  <Text style={styles.star}>★</Text>
                </View>
              </View>

              <View style={styles.progressBlock}>
                <Text style={styles.progressLabel}>Today's Points</Text>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFillGreen, { width: `${todayPct * 100}%` }]} />
                </View>
                <Text style={styles.progressValue}>{child.todays} pts</Text>
              </View>

              <View style={styles.progressBlock}>
                <Text style={styles.progressLabel}>This Week's Points</Text>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFillBlue, { width: `${weekPct * 100}%` }]} />
                </View>
                <Text style={styles.progressValue}>{child.week} pts</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.bottomBar}>
        {['Dashboard', 'Children', 'Tasks', 'Rewards', 'Menu'].map((tab, idx) => {
          const active = idx === 1;
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
    paddingVertical: 16,
    backgroundColor: BG,
    gap: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: DARK,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
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
  subtitle: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 12,
  },
  card: {
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
    gap: 12,
  },
  row: {
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
  childMeta: {
    color: MUTED,
    fontWeight: '700',
  },
  iconStack: {
    alignItems: 'flex-end',
    gap: 6,
  },
  check: {
    color: ACCENT,
    fontSize: 16,
    fontWeight: '900',
  },
  star: {
    color: '#f4b400',
    fontSize: 16,
    fontWeight: '900',
  },
  progressBlock: {
    gap: 6,
  },
  progressLabel: {
    fontWeight: '700',
    color: DARK,
  },
  progressTrack: {
    height: 10,
    borderRadius: 6,
    backgroundColor: '#e8efe8',
    overflow: 'hidden',
  },
  progressFillGreen: {
    height: '100%',
    backgroundColor: ACCENT,
  },
  progressFillBlue: {
    height: '100%',
    backgroundColor: BLUE,
  },
  progressValue: {
    color: MUTED,
    fontWeight: '700',
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

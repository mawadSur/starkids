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

const leaderboard = [
  { name: 'Liam', points: 525, medal: '🥇' },
  { name: 'Ava', points: 480, medal: '🥈' },
  { name: 'Noah', points: 430, medal: '🥉' },
];

export default function ChildDashboardScreen() {
  const points = { current: 525, total: 600 };
  const daily = { earned: 25, target: 50, tasks: { done: 3, total: 4 } };

  const dots = Array.from({ length: 2 }, (_, i) => i === 0); // Daily active

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>Liam</Text>
            <Text style={styles.points}>{points.current} Pts</Text>
          </View>
          <View style={styles.ring}>
            <View style={[styles.ringInner, { borderColor: ACCENT }]}>
              <Text style={styles.ringMain}>
                {daily.earned}/{daily.target} Pts
              </Text>
              <Text style={styles.ringSub}>
                {daily.tasks.done}/{daily.tasks.total} tasks
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.tabActive]} activeOpacity={0.8}>
            <Text style={[styles.tabText, styles.tabTextActive]}>Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} activeOpacity={0.8}>
            <Text style={styles.tabText}>Weekly</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Family Ranking</Text>
          <View style={styles.leaderboard}>
            {leaderboard.map((item, idx) => (
              <View key={item.name} style={styles.row}>
                <Text style={styles.rank}>{idx + 1}</Text>
                <Text style={styles.medal}>{item.medal}</Text>
                <Text style={styles.leaderName}>{item.name}</Text>
                <Text style={styles.leaderPoints}>{item.points} pts</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  header: {
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e9e2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: DARK,
  },
  points: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '800',
    color: ACCENT,
  },
  ring: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: '#e6efe8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  ringMain: {
    textAlign: 'center',
    fontWeight: '800',
    color: DARK,
    fontSize: 14,
  },
  ringSub: {
    textAlign: 'center',
    color: MUTED,
    fontSize: 12,
    marginTop: 4,
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
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: DARK,
  },
  leaderboard: {
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
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
    fontWeight: '800',
    color: ACCENT,
  },
});

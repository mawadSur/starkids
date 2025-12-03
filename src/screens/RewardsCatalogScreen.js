import React, { useState } from 'react';
import {
  Image,
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

const filters = ['Experiences', 'Privileges', 'Items', 'Electronics'];

const rewards = [
  {
    title: 'Ice Cream Treat',
    points: 10,
    category: 'Experiences',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=60',
  },
  {
    title: 'Extra Screen Time',
    points: 15,
    category: 'Privileges',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=60',
  },
  {
    title: 'Trip to the Park',
    points: 20,
    category: 'Experiences',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=60',
  },
  {
    title: 'Choose Movie',
    points: 12,
    category: 'Privileges',
    image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=600&q=60',
  },
];

export default function RewardsCatalogScreen() {
  const [activeFilter, setActiveFilter] = useState('Experiences');
  const [sortDir] = useState('asc'); // placeholder for dropdown; static label

  const filteredRewards = rewards
    .filter((r) => r.category === activeFilter)
    .sort((a, b) => (sortDir === 'asc' ? a.points - b.points : b.points - a.points));

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.filterRow}>
        {filters.map((f) => {
          const active = f === activeFilter;
          return (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, active && styles.filterChipActive]}
              activeOpacity={0.85}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, active && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Sort:</Text>
        <View style={styles.sortDropdown}>
          <Text style={styles.sortValue}>Points (Low to High)</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {filteredRewards.map((reward) => (
          <View key={reward.title} style={styles.card}>
            <Image source={{ uri: reward.image }} style={styles.image} />
            <View style={styles.cardBody}>
              <Text style={styles.title}>{reward.title}</Text>
              <View style={styles.tagRow}>
                <Text style={styles.tag}>{reward.category}</Text>
                <Text style={styles.points}>{reward.points} pts</Text>
              </View>
            </View>
          </View>
        ))}
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
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: BG,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#e8efe8',
  },
  filterChipActive: {
    backgroundColor: ACCENT,
  },
  filterText: {
    fontWeight: '700',
    color: MUTED,
  },
  filterTextActive: {
    color: '#ffffff',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 10,
  },
  sortLabel: {
    fontWeight: '700',
    color: DARK,
  },
  sortDropdown: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dfe6df',
    backgroundColor: CARD,
    flex: 1,
  },
  sortValue: {
    color: MUTED,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    width: '48%',
    backgroundColor: CARD,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e9e2',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 110,
  },
  cardBody: {
    padding: 10,
    gap: 6,
  },
  title: {
    fontWeight: '800',
    color: DARK,
  },
  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: '#e8efe8',
    color: MUTED,
    fontWeight: '700',
    fontSize: 12,
  },
  points: {
    fontWeight: '800',
    color: ACCENT,
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

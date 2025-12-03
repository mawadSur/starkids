import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ACCENT = '#23c16b';
const DARK = '#0f1b12';
const MUTED = '#6a6a6a';
const BORDER = '#dfe6df';
const CARD = '#ffffff';

const categories = ['Morning', 'Bedtime', 'Chores', 'School', 'Custom'];
const children = [
  { id: '1', name: 'Liam' },
  { id: '2', name: 'Ava' },
  { id: '3', name: 'Noah' },
];
const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function EditTaskScreen({ navigation }) {
  const [name, setName] = useState('Brush teeth');
  const [category, setCategory] = useState('Morning');
  const [points, setPoints] = useState(3);
  const [assignees, setAssignees] = useState(new Set(['1']));
  const [frequency, setFrequency] = useState('daily'); // daily | specific
  const [days, setDays] = useState(new Set(['M', 'T', 'W', 'T2', 'F']));

  const toggleAssignee = (id) => {
    setAssignees((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleDay = (day, key) => {
    setDays((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleSave = () => {
    if (navigation?.goBack) navigation.goBack();
  };

  const incPoints = (delta) => {
    setPoints((p) => Math.max(0, p + delta));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.label}>Task Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Task name"
            placeholderTextColor="#9b9b9b"
            style={styles.input}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.pillRow}>
            {categories.map((cat) => {
              const active = cat === category;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.pill, active && styles.pillActive]}
                  activeOpacity={0.85}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={[styles.pillText, active && styles.pillTextActive]}>{cat}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Points</Text>
          <View style={styles.counterRow}>
            <TouchableOpacity style={styles.counterBtn} activeOpacity={0.85} onPress={() => incPoints(-1)}>
              <Text style={styles.counterText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.pointsValue}>{points}</Text>
            <TouchableOpacity style={styles.counterBtn} activeOpacity={0.85} onPress={() => incPoints(1)}>
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Assign to</Text>
          <View style={styles.assigneeRow}>
            {children.map((child) => {
              const active = assignees.has(child.id);
              return (
                <TouchableOpacity
                  key={child.id}
                  style={[styles.assignee, active && styles.assigneeActive]}
                  activeOpacity={0.85}
                  onPress={() => toggleAssignee(child.id)}
                >
                  <View style={styles.assigneeAvatar}>
                    <Text style={styles.assigneeAvatarText}>{child.name[0]}</Text>
                  </View>
                  <Text style={styles.assigneeName}>{child.name}</Text>
                  <View style={[styles.checkbox, active && styles.checkboxChecked]}>
                    {active && <Text style={styles.checkMark}>✔</Text>}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Frequency</Text>
          <View style={styles.pillRow}>
            {['daily', 'specific'].map((key) => {
              const active = key === frequency;
              const label = key === 'daily' ? 'Daily' : 'Specific Days';
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.pill, active && styles.pillActive]}
                  activeOpacity={0.85}
                  onPress={() => setFrequency(key)}
                >
                  <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {frequency === 'specific' && (
            <View style={styles.daysRow}>
              {dayLabels.map((d, idx) => {
                const key = idx === 4 ? 'T2' : d; // distinguish the two Ts
                const active = days.has(key);
                return (
                  <TouchableOpacity
                    key={key}
                    style={[styles.dayPill, active && styles.dayPillActive]}
                    activeOpacity={0.85}
                    onPress={() => toggleDay(d, key)}
                  >
                    <Text style={[styles.dayText, active && styles.dayTextActive]}>{d}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} activeOpacity={0.9} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f4f7f4',
  },
  content: {
    padding: 16,
    paddingBottom: 120,
    gap: 12,
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: BORDER,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    gap: 10,
  },
  label: {
    fontWeight: '800',
    color: DARK,
    fontSize: 14,
  },
  input: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 12,
    color: DARK,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#e8efe8',
  },
  pillActive: {
    backgroundColor: ACCENT,
  },
  pillText: {
    fontWeight: '700',
    color: MUTED,
  },
  pillTextActive: {
    color: '#ffffff',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  counterBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  counterText: {
    fontSize: 22,
    fontWeight: '800',
    color: DARK,
  },
  pointsValue: {
    fontSize: 18,
    fontWeight: '800',
    color: DARK,
    minWidth: 32,
    textAlign: 'center',
  },
  assigneeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  assignee: {
    width: '48%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  assigneeActive: {
    borderColor: ACCENT,
    backgroundColor: '#e8f9f0',
  },
  assigneeAvatar: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#dff4e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  assigneeAvatarText: {
    fontWeight: '800',
    color: DARK,
  },
  assigneeName: {
    flex: 1,
    fontWeight: '700',
    color: DARK,
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
    backgroundColor: '#e8f9f0',
  },
  checkMark: {
    color: ACCENT,
    fontWeight: '900',
  },
  daysRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
    flexWrap: 'wrap',
  },
  dayPill: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8efe8',
  },
  dayPillActive: {
    backgroundColor: ACCENT,
  },
  dayText: {
    fontWeight: '800',
    color: MUTED,
  },
  dayTextActive: {
    color: '#ffffff',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: CARD,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  saveButton: {
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
  saveText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
});

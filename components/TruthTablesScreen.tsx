import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type TruthTablesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TruthTables'>;

interface TruthTablesScreenProps {
  navigation: TruthTablesNavigationProp;
}

type TableRow = {
  cells: string[];
};

type TruthTableCard = {
  key: string;
  title: string;
  description: string;
  accent: string;
  headerColor: string;
  columns: string[];
  rows: TableRow[];
  gateIcon?: string;
};

const cards: TruthTableCard[] = [
  {
    key: 'and',
    title: 'AND Truth Table',
    description: 'Output 1 hanya jika A dan B bernilai 1.',
    accent: '#4176ff',
    headerColor: 'rgba(65, 118, 255, 0.12)',
    gateIcon: 'gate-and',
    columns: ['A', 'B', 'Out'],
    rows: [
      { cells: ['0', '0', '0'] },
      { cells: ['0', '1', '0'] },
      { cells: ['1', '0', '0'] },
      { cells: ['1', '1', '1'] },
    ],
  },
  {
    key: 'or',
    title: 'OR Truth Table',
    description: 'Output 1 jika salah satu input bernilai 1.',
    accent: '#22b07d',
    headerColor: 'rgba(34, 176, 125, 0.15)',
    gateIcon: 'gate-or',
    columns: ['A', 'B', 'Out'],
    rows: [
      { cells: ['0', '0', '0'] },
      { cells: ['0', '1', '1'] },
      { cells: ['1', '0', '1'] },
      { cells: ['1', '1', '1'] },
    ],
  },
  {
    key: 'not',
    title: 'NOT Truth Table',
    description: 'Output selalu kebalikan dari input.',
    accent: '#f4b000',
    headerColor: 'rgba(244, 176, 0, 0.18)',
    gateIcon: 'gate-not',
    columns: ['A', 'Out'],
    rows: [
      { cells: ['0', '1'] },
      { cells: ['1', '0'] },
    ],
  },
  {
    key: 'xor',
    title: 'XOR Truth Table',
    description: 'Output 1 jika jumlah input 1 bernilai ganjil.',
    accent: '#1ab8c1',
    headerColor: 'rgba(26, 184, 193, 0.18)',
    gateIcon: 'gate-xor',
    columns: ['A', 'B', 'Out'],
    rows: [
      { cells: ['0', '0', '0'] },
      { cells: ['0', '1', '1'] },
      { cells: ['1', '0', '1'] },
      { cells: ['1', '1', '0'] },
    ],
  },
  {
    key: 'nand',
    title: 'NAND Truth Table',
    description: 'Output 0 hanya jika semua input 1 (kebalikan AND).',
    accent: '#9169ff',
    headerColor: 'rgba(145, 105, 255, 0.18)',
    gateIcon: 'gate-nand',
    columns: ['A', 'B', 'Out'],
    rows: [
      { cells: ['0', '0', '1'] },
      { cells: ['0', '1', '1'] },
      { cells: ['1', '0', '1'] },
      { cells: ['1', '1', '0'] },
    ],
  },
  {
    key: 'nor',
    title: 'NOR Truth Table',
    description: 'Output 1 hanya jika semua input 0 (kebalikan OR).',
    accent: '#ff8a3c',
    headerColor: 'rgba(255, 138, 60, 0.18)',
    gateIcon: 'gate-nor',
    columns: ['A', 'B', 'Out'],
    rows: [
      { cells: ['0', '0', '1'] },
      { cells: ['0', '1', '0'] },
      { cells: ['1', '0', '0'] },
      { cells: ['1', '1', '0'] },
    ],
  },
];

const TruthTablesScreen: React.FC<TruthTablesScreenProps> = ({ navigation }) => {
  return (
    <View className="flex-1 bg-[#f4f8ff]">
      <SafeAreaView className="flex-1">
        <View className="absolute left-5 top-12 z-50">
          <TouchableOpacity
            className="h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg"
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}>
            <Text className="text-2xl text-black pb-2 font-bold">←</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 32,
            paddingTop: 84,
          }}>
          <View className="mb-8 items-center rounded-3xl bg-white p-6" style={styles.cardShadow}>
            <View className="mb-4 rounded-2xl bg-green-100 p-5">
              <Feather name="grid" size={36} color="#1a9b75" />
            </View>
            <Text className="text-3xl font-bold text-gray-900">Truth Tables</Text>
            <Text className="mt-3 text-center text-base leading-6 text-gray-600">
              Tabel kebenaran untuk tiap gerbang logika.
            </Text>
          </View>

          <View className="gap-6">
            {cards.map(card => (
              <View key={card.key} className="rounded-3xl bg-white p-5" style={styles.cardShadow}>
                <View className="mb-4 flex-row items-start">
                  <View className="rounded-2xl p-4" style={{ backgroundColor: card.headerColor }}>
                    {card.gateIcon ? (
                      <MaterialCommunityIcons name={card.gateIcon} size={32} color={card.accent} />
                    ) : (
                      <Feather name="table" size={24} color={card.accent} />
                    )}
                  </View>
                  <View className="ml-4 flex-1">
                    <Text className="text-lg font-semibold text-gray-900">{card.title}</Text>
                    <Text className="mt-2 text-base leading-6 text-gray-600">{card.description}</Text>
                  </View>
                </View>

                <View className="rounded-2xl bg-[#fdf8ee] p-4">
                  <View className="flex-row">
                    {card.columns.map(column => (
                      <View key={column} className="flex-1">
                        <Text className="rounded-xl bg-white px-3 py-2 text-center text-sm font-semibold text-gray-800">
                          {column}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View className="mt-3 gap-2">
                    {card.rows.map((row, index) => (
                      <View
                        key={`${card.key}-${index}`}
                        className="flex-row rounded-xl bg-white px-3 py-2"
                        style={{
                          backgroundColor: index % 2 === 0 ? 'white' : '#fbf3e4',
                        }}>
                        {row.cells.map((cell, cellIndex) => (
                          <View key={`${card.key}-${index}-${cellIndex}`} className="flex-1">
                            <Text className="text-center text-base font-semibold text-gray-800">{cell}</Text>
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#d9ccb7',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 9,
  },
});

export default TruthTablesScreen;



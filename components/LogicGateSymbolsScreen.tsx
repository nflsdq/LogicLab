import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type LogicGateSymbolsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LogicGateSymbols'>;

interface LogicGateSymbolsScreenProps {
  navigation: LogicGateSymbolsNavigationProp;
}

const symbols = [
  {
    key: 'and',
    title: 'AND Symbol',
    description: 'Simbol resmi untuk gerbang AND.',
    color: '#4f82ff',
    bgColor: 'rgba(79, 130, 255, 0.12)',
    icon: 'gate-and',
  },
  {
    key: 'or',
    title: 'OR Symbol',
    description: 'Simbol standar untuk gerbang OR.',
    color: '#2fb36c',
    bgColor: 'rgba(47, 179, 108, 0.12)',
    icon: 'gate-or',
  },
  {
    key: 'not',
    title: 'NOT Symbol',
    description: 'Simbol inverter untuk operasi NOT.',
    color: '#f5b100',
    bgColor: 'rgba(245, 177, 0, 0.15)',
    icon: 'gate-not',
  },
  {
    key: 'xor',
    title: 'XOR Symbol',
    description: 'Simbol eksklusif OR (⊕).',
    color: '#1ab8c1',
    bgColor: 'rgba(26, 184, 193, 0.15)',
    icon: 'gate-xor',
  },
  {
    key: 'nand',
    title: 'NAND Symbol',
    description: 'Simbol gerbang AND dengan gelembung inversi.',
    color: '#9169ff',
    bgColor: 'rgba(145, 105, 255, 0.15)',
    icon: 'gate-nand',
  },
  {
    key: 'nor',
    title: 'NOR Symbol',
    description: 'Simbol gerbang OR dengan gelembung inversi.',
    color: '#ff8a3c',
    bgColor: 'rgba(255, 138, 60, 0.15)',
    icon: 'gate-nor',
  },
];

const LogicGateSymbolsScreen: React.FC<LogicGateSymbolsScreenProps> = ({ navigation }) => {
  return (
    <View className="flex-1 bg-[#f4f8ff]">
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 32,
            paddingTop: 12,
          }}>
          <TouchableOpacity
            className="mb-6 h-12 w-12 items-center justify-center rounded-full bg-white"
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}>
            <Text className="text-2xl text-black">←</Text>
          </TouchableOpacity>

          <View className="mb-8 rounded-3xl items-center bg-white p-6" style={styles.heroCard}>
            <View className="mb-4 w-16 items-center justify-center rounded-2xl bg-amber-100 p-5">
              <MaterialCommunityIcons name="gate-and" size={36} color="#f5b100" />
            </View>
            <Text className="text-3xl text-center font-bold text-gray-900">Logic Gate Symbols</Text>
            <Text className="mt-3 text-base text-center leading-6 text-gray-600">
              Simbol standar gerbang logika (IEEE/ANSI).
            </Text>
          </View>

          <View className="gap-6">
            {symbols.map(symbol => (
              <View key={symbol.key} className="rounded-3xl bg-white p-5" style={styles.cardShadow}>
                <View className="flex-row items-center">
                  <View className="rounded-2xl p-4" style={[styles.iconWrapper, { backgroundColor: symbol.bgColor }]}>
                    <MaterialCommunityIcons name={symbol.icon} size={40} color={symbol.color} />
                  </View>
                  <View className="ml-4 flex-1">
                    <Text className="text-lg font-semibold text-gray-900">{symbol.title}</Text>
                    <Text className="mt-2 text-base leading-6 text-gray-600">{symbol.description}</Text>
                  </View>
                  <View className="ml-3 rounded-full bg-gray-100 p-2">
                    <MaterialCommunityIcons name="chevron-right" size={20} color="#a0a0a0" />
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
  heroCard: {
    shadowColor: '#d9ccb7',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 7,
  },
  cardShadow: {
    shadowColor: '#d9ccb7',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 9,
  },
  iconWrapper: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
});

export default LogicGateSymbolsScreen;



import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type BasicLogicGatesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BasicLogicGates'>;

interface BasicLogicGatesScreenProps {
  navigation: BasicLogicGatesNavigationProp;
}

type GateCard = {
  key: string;
  title: string;
  color: string;
  bgColor: string;
  icon: string;
  definition: string;
  rule: string;
  intuition: string;
  inputs: string[];
  output: string;
};

const gates: GateCard[] = [
  {
    key: 'and',
    title: 'AND Gate',
    color: '#4f82ff',
    bgColor: 'rgba(79, 130, 255, 0.12)',
    icon: 'gate-and',
    definition: 'Gerbang yang hanya bernilai 1 jika seluruh masukan bernilai 1.',
    rule: 'Output 1 hanya jika semua input 1.',
    intuition: 'Bayangkan dua tombol yang harus ditekan bersamaan untuk menyalakan lampu.',
    inputs: ['A', 'B'],
    output: 'A · B',
  },
  {
    key: 'or',
    title: 'OR Gate',
    color: '#2fb36c',
    bgColor: 'rgba(47, 179, 108, 0.12)',
    icon: 'gate-or',
    definition: 'Menghasilkan 1 apabila salah satu input bernilai 1.',
    rule: 'Output 1 jika minimal ada satu input 1.',
    intuition: 'Seperti dua sakelar paralel: cukup satu yang menyala untuk menyalakan lampu.',
    inputs: ['A', 'B'],
    output: 'A + B',
  },
  {
    key: 'not',
    title: 'NOT Gate',
    color: '#f5b100',
    bgColor: 'rgba(245, 177, 0, 0.15)',
    icon: 'gate-not',
    definition: 'Gerbang pembalik yang mengubah 0 menjadi 1 dan sebaliknya.',
    rule: 'Output adalah kebalikan dari input.',
    intuition: 'Bayangkan tombol lampu yang kalau tidak ditekan lampunya menyala.',
    inputs: ['A'],
    output: '¬A',
  },
  {
    key: 'nand',
    title: 'NAND Gate',
    color: '#8c6bff',
    bgColor: 'rgba(140, 107, 255, 0.14)',
    icon: 'gate-nand',
    definition: 'Kebalikan gerbang AND: hanya 0 bila semua input 1.',
    rule: 'Output 0 jika semua input 1, selebihnya 1.',
    intuition: 'Seperti alarm yang mati ketika semua sensor aktif sekaligus.',
    inputs: ['A', 'B'],
    output: '¬(A · B)',
  },
  {
    key: 'nor',
    title: 'NOR Gate',
    color: '#ff8a3c',
    bgColor: 'rgba(255, 138, 60, 0.15)',
    icon: 'gate-nor',
    definition: 'Kebalikan gerbang OR: hanya 1 bila semua input 0.',
    rule: 'Output 1 jika semua input 0.',
    intuition: 'Serupa sirine yang berbunyi hanya saat semua tombol dimatikan.',
    inputs: ['A', 'B'],
    output: '¬(A + B)',
  },
  {
    key: 'xor',
    title: 'XOR Gate',
    color: '#17b6c5',
    bgColor: 'rgba(23, 182, 197, 0.15)',
    icon: 'gate-xor',
    definition: 'Menghasilkan 1 jika jumlah input 1 bernilai ganjil.',
    rule: 'Output 1 ketika hanya satu input bernilai 1.',
    intuition: 'Mirip sakelar hotel: lampu menyala bila hanya satu sakelar berbeda.',
    inputs: ['A', 'B'],
    output: 'A ⊕ B',
  },
  // {
  //   key: 'xnor',
  //   title: 'XNOR Gate',
  //   color: '#f054a5',
  //   bgColor: 'rgba(240, 84, 165, 0.15)',
  //   icon: 'gate-xnor',
  //   definition: 'Kebalikan XOR: 1 jika kedua input sama.',
  //   rule: 'Output 1 bila input identik.',
  //   intuition: 'Seperti sensor yang menyala hanya bila dua tombol dalam posisi sama.',
  //   inputs: ['A', 'B'],
  //   output: '¬(A ⊕ B)',
  // },
];

const BasicLogicGatesScreen: React.FC<BasicLogicGatesScreenProps> = ({ navigation }) => {
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
          <View className="mb-8 rounded-3xl items-center bg-white p-6" style={styles.cardShadow}>
            <View className="mb-4 w-16 rounded-2xl bg-blue-100 p-5">
              <MaterialCommunityIcons name="gate-and" size={40} color="#2563eb" />
            </View>
            <Text className="text-3xl text-center font-bold text-gray-900">Basic Logic Gates</Text>
            <Text className="mt-3 text-center text-base leading-6 text-gray-600">
              Pengertian, aturan kerja, dan intuisi cara memahami setiap gerbang.
            </Text>
          </View>

          <View className="gap-5">
            {gates.map(gate => (
              <View key={gate.key} className="rounded-3xl bg-white p-5" style={styles.cardShadow}>
                <View className="flex-row items-start">
                  <View className="rounded-2xl p-4" style={[styles.iconWrapper, { backgroundColor: gate.bgColor }]}>
                    <MaterialCommunityIcons name={gate.icon} size={36} color={gate.color} />
                  </View>
                  <View className="ml-4 flex-1">
                    <Text className="text-lg font-semibold text-gray-900">{gate.title}</Text>
                    <View className="mt-4 rounded-2xl p-4" style={[styles.infoCard, { backgroundColor: gate.bgColor }]}>
                      <Text className="text-sm font-semibold uppercase tracking-[0.2em] text-black-500">
                        Pengertian
                      </Text>
                      <Text className="mt-2 text-base leading-6 text-gray-700">{gate.definition}</Text>
                    </View>
                    <View className="mt-3 rounded-2xl p-4" style={[styles.infoCard, { backgroundColor: gate.bgColor }]}>
                      <Text className="text-sm font-semibold uppercase tracking-[0.2em] text-black-500">
                        Aturan Kerja
                      </Text>
                      <Text className="mt-2 text-base leading-6 text-gray-700">{gate.rule}</Text>
                    </View>
                    <View className="mt-3 rounded-2xl p-4" style={[styles.infoCard, { backgroundColor: gate.bgColor }]}>
                      <Text className="text-sm font-semibold uppercase tracking-[0.2em] text-black-500">
                        Intuisi Cara Memahami
                      </Text>
                      <Text className="mt-2 text-base leading-6 text-black-700">{gate.intuition}</Text>
                    </View>
                    <View className="mt-3 flex-row items-center justify-between rounded-2xl bg-[#f4f8ff] px-4 py-3">
                      <View className="flex-row items-center gap-3">
                        {gate.inputs.map(input => (
                          <View key={`${gate.key}-${input}`} style={[styles.signalDot, { borderColor: gate.color }]}>
                            <Text className="text-xs font-semibold text-gray-800">{input}</Text>
                          </View>
                        ))}
                      </View>
                      <MaterialCommunityIcons name="arrow-right" size={20} color="#a0a0a0" />
                      <View style={[styles.signalDot, { borderColor: gate.color, backgroundColor: gate.color }]}>
                        <Text className="text-xs font-semibold text-white">{gate.output}</Text>
                      </View>
                    </View>
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
  iconWrapper: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  infoCard: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  signalDot: {
    borderWidth: 2,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
});

export default BasicLogicGatesScreen;



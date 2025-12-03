import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

const learningTopics = [
  {
    key: 'basic-gates',
    title: 'Basic Logic Gates',
    description: 'Kenalan dengan gerbang logika dasar.',
    icon: 'cpu',
    color: '#4f82ff',
    accentBg: 'rgba(79, 130, 255, 0.12)',
    details: [
      'Visualisasi gerbang AND, OR, XOR, dan NOT dalam bentuk animasi langkah demi langkah.',
      'Lihat bagaimana kombinasi input memengaruhi output secara real time.',
    ],
  },
  {
    key: 'truth-tables',
    title: 'Truth Tables',
    description: 'Penjelasan tabel kebenaran untuk tiap gerbang dengan contoh kasus sederhana.',
    icon: 'grid',
    color: '#2fb36c',
    accentBg: 'rgba(47, 179, 108, 0.12)',
    details: [
      'Setiap gerbang dilengkapi tabel kebenaran lengkap dengan highlight hasil.',
      'Contoh kasus: sistem keamanan sederhana dan penalaran boolean dasar.',
    ],
  },
  
  {
    key: 'quizzes',
    title: 'Short Quizzes',
    description: 'Kuis singkat untuk menguji pemahaman.',
    icon: 'check-circle',
    color: '#2bbbbb',
    accentBg: 'rgba(43, 187, 187, 0.15)',
    details: [
      'Kumpulan soal pilihan ganda dengan penjelasan jawaban otomatis.',
      'Progress tracker untuk melihat peningkatan pemahamanmu.',
    ],
  },
];

type LearnScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Learn'>;

interface LearnScreenProps {
  navigation: LearnScreenNavigationProp;
}

const LearnScreen: React.FC<LearnScreenProps> = ({ navigation }) => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const handleTopicPress = (topicKey: string) => {
    if (topicKey === 'basic-gates') {
      navigation.navigate('BasicLogicGates');
      return;
    }
    if (topicKey === 'truth-tables') {
      navigation.navigate('TruthTables');
      return;
    }
    setActiveTopic(prev => (prev === topicKey ? null : topicKey));
  };

  return (
    <View className="flex-1 bg-[#f4f8ff]">
      <SafeAreaView className="flex-1">
        <View className="px-6 pt-4">
          <TouchableOpacity
            className="mb-4 h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg"
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
            paddingTop: 12,
          }}>
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-900">Learn Digital Logic Gates</Text>
            <Text className="mt-4 text-base leading-6 text-gray-600">
              Pelajari konsep dasar gerbang logika secara visual, interaktif, dan mudah dipahami.
            </Text>
          </View>

          <View className="gap-5">
            {learningTopics.map(topic => (
              <TouchableOpacity
                key={topic.key}
                className="rounded-3xl bg-white p-5"
                style={styles.cardShadow}
                activeOpacity={0.9}
                onPress={() => handleTopicPress(topic.key)}>
                <View className="flex-row items-start">
                  <View
                    className="rounded-2xl p-4"
                    style={[styles.iconWrapper, { backgroundColor: topic.accentBg }]}>
                    <Feather name={topic.icon} size={24} color={topic.color} />
                  </View>
                  <View className="ml-4 flex-1">
                    <Text className="text-lg font-semibold text-gray-900">{topic.title}</Text>
                    <Text className="mt-2 text-base leading-6 text-gray-600">{topic.description}</Text>
                  </View>
                  <View className="ml-3 mt-1 rounded-full bg-gray-100 p-2">
                    <Feather
                      name="chevron-right"
                      size={20}
                      color="#a0a0a0"
                      // style={{ transform: [{ rotate: activeTopic === topic.key ? '90deg' : '0deg' }] }}
                    />
                  </View>
                </View>
                {/* {activeTopic === topic.key ? (
                  <View className="mt-4 rounded-2xl bg-[#f7f0e3] p-4">
                    {topic.details.map(point => (
                      <View key={point} className="mb-3 flex-row items-start">
                        <Feather name="minus" size={16} color="#b68c4f" />
                        <Text className="ml-3 flex-1 text-base leading-6 text-gray-700">{point}</Text>
                      </View>
                    ))}
                  </View>
                ) : null} */}
              </TouchableOpacity>
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
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 8,
  },
  iconWrapper: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
  },
});

export default LearnScreen;




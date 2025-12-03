import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <ScrollView className="flex-1 bg-[#f4f8ff]" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 justify-center px-6">
        <View>
          <Text className="text-center text-4xl font-bold text-black">LogicLab Vision</Text>
          <Text className="mt-3 text-center text-lg text-gray-700">
            Learn Digital Logic Gates with{'\n'}Camera Recognition
          </Text>
        </View>

        <View className="">
          <Image source={require('../assets/images/home/home-logo.png')} className="w-full" resizeMode="contain" />
        </View>

        <View className="gap-4">
          <TouchableOpacity
            className="rounded-full border border-gray-300 bg-white px-6 py-4 active:bg-gray-50"
            onPress={() => navigation.navigate('Scan')}>
            <Text className="text-center text-lg font-semibold text-black">Start Camera Scan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-full border border-gray-300 bg-white px-6 py-4 active:bg-gray-50"
            onPress={() => navigation.navigate('ManualInput')}>
            <Text className="text-center text-lg font-semibold text-black">Manual Inputs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-full border border-gray-300 bg-white px-6 py-4 active:bg-gray-50"
            onPress={() => navigation.navigate('Learn')}>
            <Text className="text-center text-lg font-semibold text-black">Learn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;


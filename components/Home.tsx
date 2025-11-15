import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const HomeScreen: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 justify-center px-6">
        <View className="mb-12">
          <Text className="text-center text-5xl font-bold text-black">LogicLab Vision</Text>
          <Text className="mt-3 text-center text-lg text-gray-700">
            Learn Digital Logic Gates with{'\n'}Camera Recognition
          </Text>
        </View>

        <View className="gap-4">
          <TouchableOpacity
            className="rounded-full border border-gray-300 bg-white px-6 py-4 active:bg-gray-50"
            onPress={() => console.log('Start Camera Scan')}>
            <Text className="text-center text-lg font-semibold text-black">Start Camera Scan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-full border border-gray-300 bg-white px-6 py-4 active:bg-gray-50"
            onPress={() => console.log('Manual Inputs')}>
            <Text className="text-center text-lg font-semibold text-black">Manual Inputs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-full border border-gray-300 bg-white px-6 py-4 active:bg-gray-50"
            onPress={() => console.log('Learn')}>
            <Text className="text-center text-lg font-semibold text-black">Learn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;


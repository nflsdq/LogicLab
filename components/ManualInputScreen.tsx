import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { LogicGateType, getGateIconName, getAllLogicGates } from '../utils/logicGates';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type ManualInputScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ManualInput'>;

interface ManualInputScreenProps {
  navigation: ManualInputScreenNavigationProp;
}

const ManualInputScreen: React.FC<ManualInputScreenProps> = ({ navigation }) => {
  const [step, setStep] = useState<'input' | 'gate'>('input');
  const [inputA, setInputA] = useState<'0' | '1'>('0');
  const [inputB, setInputB] = useState<'0' | '1'>('0');
  const [selectedGate, setSelectedGate] = useState<LogicGateType | ''>('');

  const handleSelectGate = () => {
    setStep('gate');
  };

  const handleGateSelection = (gate: LogicGateType) => {
    setSelectedGate(gate);
  };

  const handleViewResult = () => {
    if (!selectedGate) {
      Alert.alert('Perhatian', 'Silakan pilih Logic Gate terlebih dahulu');
      return;
    }
    navigation.navigate('Result', {
      inputA,
      inputB,
      logicGate: selectedGate,
      source: 'manual',
    });
  };

  const handleBackToInput = () => {
    setStep('input');
  };

  const renderInputStep = () => (
    <View className="mx-auto w-full max-w-md rounded-3xl bg-white p-6">
      <View className="mb-6">
        <Text className="text-2xl font-bold text-black">LogicLab Vision</Text>
        <Text className="mt-2 text-right text-sm text-gray-600">Step 1 of 2</Text>
      </View>

      <View className="mb-6 h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <View className="h-full bg-black transition-all" style={{ width: '50%' }} />
      </View>

      <View className="mb-6">
        <Text className="text-xl font-bold text-black">Select Inputs</Text>
      </View>

      <View className="mb-6 rounded-2xl bg-blue-50 p-4">
        <Text className="mb-3 text-sm text-gray-700">Select Input A Value</Text>
        <View className="flex-row gap-3">
          <TouchableOpacity
            className={`flex-1 items-center justify-center rounded-xl border-2 py-6 ${
              inputA === '0' ? 'bg-black border-black' : 'bg-white border-gray-300'
            }`}
            onPress={() => setInputA('0')}
            activeOpacity={0.7}>
            <Text className={`text-3xl font-bold ${inputA === '0' ? 'text-white' : 'text-black'}`}>
              0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 items-center justify-center rounded-xl border-2 py-6 ${
              inputA === '1' ? 'bg-black border-black' : 'bg-white border-gray-300'
            }`}
            onPress={() => setInputA('1')}
            activeOpacity={0.7}>
            <Text className={`text-3xl font-bold ${inputA === '1' ? 'text-white' : 'text-black'}`}>
              1
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mb-6 rounded-2xl bg-blue-50 p-4">
        <Text className="mb-3 text-sm text-gray-700">Select Input B Value</Text>
        <View className="flex-row gap-3">
          <TouchableOpacity
            className={`flex-1 items-center justify-center rounded-xl border-2 py-6 ${
              inputB === '0' ? 'bg-black border-black' : 'bg-white border-gray-300'
            }`}
            onPress={() => setInputB('0')}
            activeOpacity={0.7}>
            <Text className={`text-3xl font-bold ${inputB === '0' ? 'text-white' : 'text-black'}`}>
              0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 items-center justify-center rounded-xl border-2 py-6 ${
              inputB === '1' ? 'bg-black border-black' : 'bg-white border-gray-300'
            }`}
            onPress={() => setInputB('1')}
            activeOpacity={0.7}>
            <Text className={`text-3xl font-bold ${inputB === '1' ? 'text-white' : 'text-black'}`}>
              1
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        className="rounded-full bg-gray-300 px-6 py-4 active:bg-gray-400"
        onPress={handleSelectGate}>
        <Text className="text-center text-lg font-semibold text-black">Select Gate</Text>
      </TouchableOpacity>
    </View>
  );

  const renderGateStep = () => (
    <View className="mx-auto w-full max-w-md rounded-3xl bg-white p-6">
      <View className="mb-6">
        <Text className="text-2xl font-bold text-black">LogicLab Vision</Text>
        <Text className="mt-2 text-right text-sm text-gray-600">Step 2 of 2</Text>
      </View>

      <View className="mb-6 h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <View className="h-full bg-black transition-all" style={{ width: '100%' }} />
      </View>

      <View className="mb-6">
        <Text className="text-xl font-bold text-black">Select Logic Gate</Text>
      </View>

      <View className="mb-6 rounded-2xl bg-blue-50 p-4">
        <View className="flex-row flex-wrap justify-between">
          {getAllLogicGates().map((gate) => (
            <TouchableOpacity
              key={gate}
              className={`mb-3 w-[48%] items-center rounded-xl border-2 p-4 ${
                selectedGate === gate 
                  ? 'bg-black border-black' 
                  : 'bg-white border-gray-300'
              }`}
              onPress={() => handleGateSelection(gate)}
              activeOpacity={0.7}>
              <MaterialCommunityIcons 
                name={getGateIconName(gate)} 
                size={48} 
                color={selectedGate === gate ? '#FFFFFF' : '#000000'} 
                style={{ marginBottom: 8 }} 
              />
              <Text className={`text-lg font-bold ${
                selectedGate === gate ? 'text-white' : 'text-black'
              }`}>
                {gate}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="gap-3">
        <TouchableOpacity
          className="rounded-full bg-gray-300 px-6 py-4 active:bg-gray-400"
          onPress={handleViewResult}>
          <Text className="text-center text-lg font-semibold text-black">View Result</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className="rounded-full border-2 border-gray-300 bg-white px-6 py-4 active:bg-gray-50"
          onPress={handleBackToInput}>
          <Text className="text-center text-lg font-semibold text-black">Kembali ke Input</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 px-6 pt-12">
        <TouchableOpacity
          className="mb-4 h-12 w-12 items-center justify-center"
          onPress={() => navigation.goBack()}>
          <Text className="text-2xl text-black">←</Text>
        </TouchableOpacity>

        {step === 'input' && renderInputStep()}
        {step === 'gate' && renderGateStep()}
      </View>
    </ScrollView>
  );
};

export default ManualInputScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { LogicGateType, calculateLogicGate, getGateIconName, generateTruthTable } from '../utils/logicGates';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type ResultScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Result'>;
type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

interface ResultScreenProps {
  navigation: ResultScreenNavigationProp;
  route: ResultScreenRouteProp;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ navigation, route }) => {
  const { inputA, inputB, logicGate, source } = route.params;
  const [showSteps, setShowSteps] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(0));
  const [flowAnim] = useState(new Animated.Value(0));

  const output = calculateLogicGate(inputA, inputB, logicGate);
  const truthTable = generateTruthTable(logicGate);

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.4, 1, 0.4],
  });

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.05, 1],
  });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();

    if (showSteps) {
      Animated.loop(
        Animated.timing(flowAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [showSteps]);

  const getOutputLabel = () => {
    return output === '1' ? 'TRUE' : 'FALSE';
  };

  const handleScanAgain = () => {
    if (source === 'scan') {
      navigation.navigate('Scan', { fromResult: true });
    } else {
      navigation.navigate('ManualInput', { fromResult: true });
    }
  };

  const getLogicExplanation = () => {
    const a = inputA;
    const b = inputB;
    const out = output;

    switch (logicGate) {
      case 'AND':
        return `Dalam logika AND, output hanya akan TRUE (1) jika kedua input A dan B adalah 1. Dalam kasus ini: Input A = ${a}, Input B = ${b}, maka hasilnya adalah ${out}.`;
      case 'OR':
        return `Dalam logika OR, output akan TRUE (1) jika salah satu atau kedua input adalah 1. Dalam kasus ini: Input A = ${a}, Input B = ${b}, maka hasilnya adalah ${out}.`;
      case 'NOT':
        return `Dalam logika NOT, output adalah kebalikan dari input A. Input B diabaikan. Dalam kasus ini: Input A = ${a}, maka hasilnya adalah ${out}.`;
      case 'NAND':
        return `Dalam logika NAND (NOT AND), output adalah kebalikan dari AND. Output FALSE (0) hanya jika kedua input adalah 1. Dalam kasus ini: Input A = ${a}, Input B = ${b}, maka hasilnya adalah ${out}.`;
      case 'NOR':
        return `Dalam logika NOR (NOT OR), output adalah kebalikan dari OR. Output TRUE (1) hanya jika kedua input adalah 0. Dalam kasus ini: Input A = ${a}, Input B = ${b}, maka hasilnya adalah ${out}.`;
      case 'XOR':
        return `Dalam logika XOR, output TRUE (1) hanya jika input berbeda. Dalam kasus ini: Input A = ${a}, Input B = ${b}, maka hasilnya adalah ${out}.`;
      default:
        return '';
    }
  };

  const SignalFlowVisualizer = () => {
    return (
      <View className="mb-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 ">
        <Text className="mb-6 text-center text-base font-bold text-white">
          Circuit Diagram
        </Text>
        
        <View className="relative items-center justify-center" style={{ minHeight: 280 }}>
          <View className="absolute left-0 top-0">
            <Animated.View 
              className={`h-16 w-16 items-center justify-center rounded-xl border-2 shadow-lg ${
                inputA === '1' 
                  ? 'border-green-400 bg-green-500 shadow-green-500/50' 
                  : 'border-gray-500 bg-gray-600 shadow-gray-600/30'
              }`}
              style={{ 
                opacity: inputA === '1' ? pulseOpacity : 0.7,
                transform: [{ scale: inputA === '1' ? pulseScale : 1 }],
              }}>
              <Text className="text-[10px] font-bold text-white">INPUT A</Text>
              <Text className="text-2xl font-bold text-white">{inputA}</Text>
            </Animated.View>
          </View>

          <View className="absolute left-16 top-8" style={{ width: 120, height: 80 }}>
            <View className="absolute left-0 top-0 flex-row">
              <View className={`h-1 w-24 rounded ${
                inputA === '1' ? 'bg-green-400' : 'bg-gray-500'
              }`} />
              <Animated.View 
                className={`absolute h-1 w-4 rounded ${
                  inputA === '1' ? 'bg-green-300 shadow-lg shadow-green-300/50' : 'bg-gray-400'
                }`}
                style={{
                  transform: [{
                    translateX: flowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 80],
                    })
                  }]
                }}
              />
            </View>
            
            <View className="absolute left-24 top-[-3px]">
              <View className={`h-2 w-2 rounded-full ${
                inputA === '1' ? 'bg-green-400' : 'bg-gray-500'
              }`} />
            </View>
            
            <View className="absolute left-24 top-0">
              <View className={`h-20 w-1 rounded ${
                inputA === '1' ? 'bg-green-400' : 'bg-gray-500'
              }`} />
              <Animated.View 
                className={`absolute h-4 w-1 rounded ${
                  inputA === '1' ? 'bg-green-300 shadow-lg shadow-green-300/50' : 'bg-gray-400'
                }`}
                style={{
                  transform: [{
                    translateY: flowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 64],
                    })
                  }]
                }}
              />
            </View>
            
            <View className="absolute left-24 top-20 flex-row">
              <View className={`h-1 w-12 rounded ${
                inputA === '1' ? 'bg-green-400' : 'bg-gray-500'
              }`} />
              <Animated.View 
                className={`absolute h-1 w-3 rounded ${
                  inputA === '1' ? 'bg-green-300 shadow-lg shadow-green-300/50' : 'bg-gray-400'
                }`}
                style={{
                  transform: [{
                    translateX: flowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 36],
                    })
                  }]
                }}
              />
            </View>
          </View>

          <View className="absolute bottom-0 left-0">
            <Animated.View 
              className={`h-16 w-16 items-center justify-center rounded-xl border-2 shadow-lg ${
                inputB === '1' 
                  ? 'border-green-400 bg-green-500 shadow-green-500/50' 
                  : 'border-gray-500 bg-gray-600 shadow-gray-600/30'
              }`}
              style={{ 
                opacity: inputB === '1' ? pulseOpacity : 0.7,
                transform: [{ scale: inputB === '1' ? pulseScale : 1 }],
              }}>
              <Text className="text-[10px] font-bold text-white">INPUT B</Text>
              <Text className="text-2xl font-bold text-white">{inputB}</Text>
            </Animated.View>
          </View>

          <View className="absolute bottom-8 left-16" style={{ width: 120, height: 80 }}>
            <View className="absolute bottom-0 left-0 flex-row">
              <View className={`h-1 w-24 rounded ${
                inputB === '1' ? 'bg-green-400' : 'bg-gray-500'
              }`} />
              <Animated.View 
                className={`absolute h-1 w-4 rounded ${
                  inputB === '1' ? 'bg-green-300 shadow-lg shadow-green-300/50' : 'bg-gray-400'
                }`}
                style={{
                  transform: [{
                    translateX: flowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 80],
                    })
                  }]
                }}
              />
            </View>
            
            <View className="absolute bottom-[-3px] left-24">
              <View className={`h-2 w-2 rounded-full ${
                inputB === '1' ? 'bg-green-400' : 'bg-gray-500'
              }`} />
            </View>
            
            <View className="absolute bottom-0 left-24">
              <View className={`h-20 w-1 rounded ${
                inputB === '1' ? 'bg-green-400' : 'bg-gray-500'
              }`} />
              <Animated.View 
                className={`absolute bottom-0 h-4 w-1 rounded ${
                  inputB === '1' ? 'bg-green-300 shadow-lg shadow-green-300/50' : 'bg-gray-400'
                }`}
                style={{
                  transform: [{
                    translateY: flowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -64],
                    })
                  }]
                }}
              />
            </View>
            
            <View className="absolute bottom-20 left-24 flex-row">
              <View className={`h-1 w-12 rounded ${
                inputB === '1' ? 'bg-green-400' : 'bg-gray-500'
              }`} />
              <Animated.View 
                className={`absolute h-1 w-3 rounded ${
                  inputB === '1' ? 'bg-green-300 shadow-lg shadow-green-300/50' : 'bg-gray-400'
                }`}
                style={{
                  transform: [{
                    translateX: flowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 36],
                    })
                  }]
                }}
              />
            </View>
          </View>

          <View className="absolute" style={{ left: '50%', top: '50%', marginLeft: -40, marginTop: -40 }}>
            <Animated.View 
              className="items-center justify-center rounded-2xl border-4 border-cyan-400 bg-slate-700 px-4 py-3 shadow-xl shadow-cyan-400/30"
              style={{
                transform: [{ scale: pulseScale }],
              }}>
              <MaterialCommunityIcons 
                name={getGateIconName(logicGate)} 
                size={48} 
                color="#22d3ee" 
              />
              <Text className="mt-1 text-xs font-bold text-cyan-400">{logicGate}</Text>
            </Animated.View>
          </View>

          <View className="absolute right-16" style={{ width: 80, top: '50%', marginTop: -0.5 }}>
            <View className="flex-row">
              <View className={`h-1 w-full rounded ${
                output === '1' ? 'bg-green-400' : 'bg-red-400'
              }`} />
              <Animated.View 
                className={`absolute h-1 w-4 rounded ${
                  output === '1' ? 'bg-green-300 shadow-lg shadow-green-300/50' : 'bg-red-300 shadow-lg shadow-red-300/50'
                }`}
                style={{
                  transform: [{
                    translateX: flowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 64],
                    })
                  }]
                }}
              />
            </View>
          </View>

          <View className="absolute right-0" style={{ top: '50%', marginTop: -32 }}>
            <Animated.View 
              className={`h-20 w-20 items-center justify-center rounded-xl border-2 shadow-lg ${
                output === '1' 
                  ? 'border-green-400 bg-green-500 shadow-green-500/50' 
                  : 'border-red-400 bg-red-500 shadow-red-500/50'
              }`}
              style={{ 
                opacity: pulseOpacity,
                transform: [{ scale: pulseScale }],
              }}>
              <Text className="text-[10px] font-bold text-white">OUTPUT</Text>
              <Text className="text-3xl font-bold text-white">{output}</Text>
              <Text className="text-[10px] font-bold text-white">{getOutputLabel()}</Text>
            </Animated.View>
          </View>
        </View>
        
        <View className="mt-6 flex-row justify-around border-t border-slate-700 pt-4">
          <View className="items-center">
            <View className={`mb-1 h-3 w-3 rounded-full ${inputA === '1' ? 'bg-green-400' : 'bg-gray-500'}`} />
            <Text className="text-xs font-medium text-gray-300">A: {inputA}</Text>
          </View>
          <View className="items-center">
            <View className={`mb-1 h-3 w-3 rounded-full ${inputB === '1' ? 'bg-green-400' : 'bg-gray-500'}`} />
            <Text className="text-xs font-medium text-gray-300">B: {inputB}</Text>
          </View>
          <View className="items-center">
            <View className={`mb-1 h-3 w-3 rounded-full ${output === '1' ? 'bg-green-400' : 'bg-red-400'}`} />
            <Text className="text-xs font-medium text-gray-300">Out: {output}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#f4f8ff]">
      <View className="absolute left-6 top-12 z-50">
        <TouchableOpacity
          className="h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg"
          onPress={() => navigation.goBack()}>
          <Text className="pb-2 text-2xl text-black font-bold">←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 pt-24">

        {/* Main Container */}
        <View className="mx-auto w-full max-w-md">
          {/* Header */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-black">LogicLab Vision</Text>
          </View>

          {/* Output Display with Light Bulb */}
          <View className={`mb-6 rounded-2xl p-8 ${
            output === '1' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <Text className={`mb-4 text-center text-base font-semibold ${
              output === '1' ? 'text-gray-700' : 'text-red-700'
            }`}>
              Output
            </Text>
            <View className="items-center">
              {/* Light Bulb Component */}
              <View className="mb-6 items-center">
                {/* Light Bulb Glass */}
                <Animated.View 
                  className={`h-28 w-28 items-center justify-center rounded-full border-4 ${
                    output === '1' 
                      ? 'border-yellow-400 bg-yellow-400 shadow-2xl shadow-yellow-400/80' 
                      : 'border-gray-500 bg-gray-700 shadow-lg shadow-gray-700/50'
                  }`}
                  style={{
                    opacity: output === '1' ? pulseOpacity : 0.6,
                    transform: [{ scale: output === '1' ? pulseScale : 1 }],
                  }}>
                  {/* Filament */}
                  <View className={`h-16 w-16 items-center justify-center rounded-full ${
                    output === '1' ? 'bg-yellow-300' : 'bg-gray-600'
                  }`}>
                    {output === '1' ? (
                      <>
                        {/* Glowing Filament */}
                        <View className="h-10 w-10 items-center justify-center rounded-full bg-yellow-200">
                          <View className="h-6 w-6 items-center justify-center rounded-full bg-white">
                            <MaterialCommunityIcons name="lightning-bolt" size={20} color="#fbbf24" />
                          </View>
                        </View>
                      </>
                    ) : (
                      <>
                        {/* Off Filament */}
                        <View className="h-8 w-1 rounded bg-gray-500" />
                        <View className="absolute h-1 w-6 rounded bg-gray-500" style={{ transform: [{ rotate: '45deg' }] }} />
                        <View className="absolute h-1 w-6 rounded bg-gray-500" style={{ transform: [{ rotate: '-45deg' }] }} />
                      </>
                    )}
                  </View>
                  
                  {/* Light Rays when ON */}
                  {output === '1' && (
                    <View className="absolute inset-0">
                      <View className="absolute -left-8 -top-8 h-2 w-2 rounded-full bg-yellow-300" />
                      <View className="absolute -right-8 -top-8 h-2 w-2 rounded-full bg-yellow-300" />
                      <View className="absolute -left-10 top-12 h-2 w-2 rounded-full bg-yellow-300" />
                      <View className="absolute -right-10 top-12 h-2 w-2 rounded-full bg-yellow-300" />
                      <View className="absolute left-12 -top-10 h-2 w-2 rounded-full bg-yellow-300" />
                      <View className="absolute right-12 -top-10 h-2 w-2 rounded-full bg-yellow-300" />
                    </View>
                  )}
                </Animated.View>
                
                {/* Bulb Connector/Neck */}
                <View className="h-3 w-10 rounded-b border-x-2 border-b-2 border-gray-400 bg-gray-300" />
                
                {/* Bulb Base/Socket */}
                <View className="h-8 w-12 rounded-b-lg border-2 border-gray-400 bg-gray-600">
                  <View className="mx-auto mt-1 h-1 w-10 rounded bg-gray-500" />
                  <View className="mx-auto mt-1 h-1 w-10 rounded bg-gray-500" />
                  <View className="mx-auto mt-1 h-1 w-10 rounded bg-gray-500" />
                </View>
              </View>
              
              {/* Status Display */}
              <View className={`rounded-full px-6 py-2 ${
                output === '1' ? 'bg-green-500' : 'bg-red-500'
              }`}>
                <Text className="text-2xl font-bold text-white">{output}</Text>
              </View>
              <Text className={`mt-2 text-xl font-bold ${
                output === '1' ? 'text-green-700' : 'text-red-700'
              }`}>
                {getOutputLabel()}
              </Text>
            </View>
          </View>

          {!showSteps && (
            <TouchableOpacity
              className="mb-6 rounded-full bg-black px-6 py-4 active:bg-gray-400"
              onPress={() => setShowSteps(true)}>
              <Text className="text-center text-lg font-semibold text-white">Analyze</Text>
            </TouchableOpacity>
          )}

          {showSteps && (
            <View className="mb-6">
              <Text className="mb-4 text-xl font-bold text-black">Analysis Result</Text>
              <Text className="mb-2 text-center text-sm text-gray-600">Gate: {logicGate}</Text>

              <View className="mb-4 flex-row gap-3">
                <View className="flex-1 rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
                  <Text className="mb-1 text-center text-xs text-gray-600">Input A</Text>
                  <Text className="text-center text-3xl font-bold text-black">{inputA}</Text>
                </View>
                <View className="flex-1 rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
                  <Text className="mb-1 text-center text-xs text-gray-600">Input B</Text>
                  <Text className="text-center text-3xl font-bold text-black">{inputB}</Text>
                </View>
              </View>

              <SignalFlowVisualizer />

              <View className="mb-6 rounded-xl bg-green-50 p-4">
                <Text className="mb-3 text-base font-bold text-black">Diagnostics</Text>
                <View className="mb-2 flex-row items-center">
                  <Text className="mr-2 text-green-600">✓</Text>
                  <Text className="text-sm text-gray-700">Data Identified</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="mr-2 text-green-600">✓</Text>
                  <Text className="text-sm text-gray-700">All Inputs Valid</Text>
                </View>
              </View>

              <View className="mb-6 rounded-xl bg-blue-50 p-4">
                <Text className="mb-3 text-base font-bold text-black">Logic Trace</Text>
                <View className="gap-2">
                  <View className="flex-row items-center">
                    <View className="mr-3 h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                      <Text className="text-xs font-bold text-white">1</Text>
                    </View>
                    <Text className="flex-1 text-sm text-gray-700">Input A = {inputA}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="mr-3 h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                      <Text className="text-xs font-bold text-white">2</Text>
                    </View>
                    <Text className="flex-1 text-sm text-gray-700">Input B = {inputB}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="mr-3 h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                      <Text className="text-xs font-bold text-white">3</Text>
                    </View>
                    <Text className="flex-1 text-sm text-gray-700">Gate = {logicGate}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="mr-3 h-6 w-6 items-center justify-center rounded-full bg-green-500">
                      <Text className="text-xs font-bold text-white">4</Text>
                    </View>
                    <Text className="flex-1 text-sm font-semibold text-gray-700">Output = {output}</Text>
                  </View>
                </View>
              </View>

              <View className="mb-6 rounded-xl bg-yellow-50 p-4">
                <View className="mb-2 flex-row items-center">
                  <Text className="mr-2 text-lg">💡</Text>
                  <Text className="text-base font-bold text-black">Penjelasan</Text>
                </View>
                <Text className="text-sm leading-5 text-gray-700">
                  {getLogicExplanation()}
                </Text>
              </View>

              <View className="mb-6 rounded-xl bg-gray-50 p-4">
                <Text className="mb-3 text-center text-base font-bold text-black">Truth Table</Text>
                <View className="overflow-hidden rounded-lg bg-white">
                  <View className="flex-row border-b-2 border-gray-800 bg-gray-800">
                    <View className="flex-1 border-r border-gray-600 p-3">
                      <Text className="text-center font-bold text-white">A</Text>
                    </View>
                    <View className="flex-1 border-r border-gray-600 p-3">
                      <Text className="text-center font-bold text-white">B</Text>
                    </View>
                    <View className="flex-1 p-3">
                      <Text className="text-center font-bold text-white">OUTPUT</Text>
                    </View>
                  </View>

                  {truthTable.map((row, idx) => {
                    const isCurrentInput = row.inputA === inputA && row.inputB === inputB;
                    return (
                      <View
                        key={idx}
                        className={`flex-row border-b border-gray-200 ${
                          isCurrentInput ? 'bg-green-100' : idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}>
                        <View className="flex-1 border-r border-gray-200 p-3">
                          <Text className="text-center text-black">{row.inputA}</Text>
                        </View>
                        <View className="flex-1 border-r border-gray-200 p-3">
                          <Text className="text-center text-black">{row.inputB}</Text>
                        </View>
                        <View className="flex-1 p-3">
                          <Text
                            className={`text-center font-bold ${
                              isCurrentInput ? 'text-green-700' : 'text-black'
                            }`}>
                            {row.output}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>

              <TouchableOpacity
                className="rounded-full border-2 border-gray-300 bg-white px-6 py-4 active:bg-gray-50 shadow-lg"
                onPress={() => setShowSteps(false)}>
                <Text className="text-center text-lg font-semibold text-black">Hide Step</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            className="mb-16 rounded-full bg-white px-6 py-4 active:bg-gray-50 border-2 border-gray-300 shadow-lg"
            onPress={handleScanAgain}>
            <Text className="text-center text-lg font-semibold text-black ">
              {source === 'scan' ? 'Scan Again' : 'Try Again'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </View>
  );
};

export default ResultScreen;


import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type ScanScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Scan'>;

interface ScanScreenProps {
  navigation: ScanScreenNavigationProp;
}

const ScanScreen: React.FC<ScanScreenProps> = ({ navigation }) => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scanStep, setScanStep] = useState<'input-a' | 'input-b' | 'logic-gate'>('input-a');
  const [scannedData, setScannedData] = useState<{
    inputA?: string;
    inputB?: string;
    logicGate?: string;
  }>({});
  const cameraRef = useRef<CameraView>(null);

  // Jika permission belum diminta
  if (!permission) {
    return <View />;
  }

  // Jika permission belum diberikan
  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center bg-white px-6">
        <View className="items-center">
          <Text className="mb-4 text-center text-lg text-gray-700">
            Aplikasi memerlukan izin kamera untuk melakukan scan
          </Text>
          <TouchableOpacity
            className="rounded-full bg-blue-500 px-8 py-4"
            onPress={requestPermission}>
            <Text className="text-center text-lg font-semibold text-white">
              Berikan Izin Kamera
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handleStartCamera = () => {
    setIsCameraActive(true);
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        
        // Simulasi scan (nanti akan diintegrasikan dengan AI/ML model di sini)
        const mockScannedValue = Math.random() > 0.5 ? '1' : '0';
        
        if (scanStep === 'input-a') {
          setScannedData({ ...scannedData, inputA: mockScannedValue });
          Alert.alert('Scan Berhasil', `Input A: ${mockScannedValue}`, [
            {
              text: 'Lanjut ke Input B',
              onPress: () => {
                setScanStep('input-b');
                setIsCameraActive(false);
              },
            },
          ]);
        } else if (scanStep === 'input-b') {
          setScannedData({ ...scannedData, inputB: mockScannedValue });
          Alert.alert('Scan Berhasil', `Input B: ${mockScannedValue}`, [
            {
              text: 'Lanjut ke Logic Gate',
              onPress: () => {
                setScanStep('logic-gate');
                setIsCameraActive(false);
              },
            },
          ]);
        } else if (scanStep === 'logic-gate') {
          const gates = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'];
          const mockGate = gates[Math.floor(Math.random() * gates.length)];
          const updatedData = { ...scannedData, logicGate: mockGate };
          setScannedData(updatedData);
          setIsCameraActive(false);
          
          // Navigasi ke halaman Result
          setTimeout(() => {
            navigation.navigate('Result', {
              inputA: updatedData.inputA || '0',
              inputB: updatedData.inputB || '0',
              logicGate: mockGate as any,
              source: 'scan',
            });
          }, 500);
        }
      } catch (error) {
        Alert.alert('Error', 'Gagal mengambil foto');
        console.error(error);
      }
    }
  };

  const handleCloseCamera = () => {
    setIsCameraActive(false);
  };

  const getStepTitle = () => {
    switch (scanStep) {
      case 'input-a':
        return 'Scan Input A';
      case 'input-b':
        return 'Scan Input B';
      case 'logic-gate':
        return 'Scan Logic Gate';
      default:
        return '';
    }
  };

  const getStepDescription = () => {
    switch (scanStep) {
      case 'input-a':
        return 'Point camera at the first input signal';
      case 'input-b':
        return 'Point camera at the second input signal';
      case 'logic-gate':
        return 'Point camera at the logic gate';
      default:
        return '';
    }
  };

  const getCurrentStep = () => {
    switch (scanStep) {
      case 'input-a':
        return '1';
      case 'input-b':
        return '2';
      case 'logic-gate':
        return '3';
      default:
        return '1';
    }
  };

  if (isCameraActive) {
    return (
      <View className="flex-1 bg-black">
        <CameraView 
          ref={cameraRef}
          style={StyleSheet.absoluteFillObject} 
          facing={facing}
        >
          <View className="flex-1 justify-between bg-transparent p-6">
            {/* Header */}
            <View className="items-center pt-12">
              <Text className="text-2xl font-bold text-white">{getStepTitle()}</Text>
              <Text className="mt-2 text-base text-white/90">{getStepDescription()}</Text>
            </View>

            {/* Scan Frame */}
            <View className="items-center justify-center">
              <View className="h-64 w-64 rounded-xl border-4 border-white/70" />
              {scannedData.inputA && scanStep !== 'input-a' && (
                <View className="absolute -top-16 rounded-lg bg-blue-500 px-4 py-2">
                  <Text className="text-sm text-white">Previous Input (A): {scannedData.inputA}</Text>
                </View>
              )}
              {scannedData.inputB && scanStep === 'logic-gate' && (
                <View className="absolute -top-24 rounded-lg bg-blue-500 px-4 py-2">
                  <Text className="text-sm text-white">Previous Input (B): {scannedData.inputB}</Text>
                </View>
              )}
            </View>

            {/* Controls */}
            <View className="items-center gap-4 pb-8">
              <TouchableOpacity
                className="h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-white/30"
                onPress={handleCapture}>
                <View className="h-16 w-16 rounded-full bg-white" />
              </TouchableOpacity>
              
              <TouchableOpacity
                className="rounded-full bg-gray-800/80 px-6 py-3"
                onPress={handleCloseCamera}>
                <Text className="text-base font-semibold text-white">Tutup Kamera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      {/* Back Button */}
      <TouchableOpacity
        className="mb-4 w-12 h-12 items-center justify-center"
        onPress={() => navigation.goBack()}>
        <Text className="text-2xl text-black">←</Text>
      </TouchableOpacity>

      {/* Card Container */}
      <View className="mx-auto w-full max-w-md rounded-3xl bg-white p-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-black">LogicLab Vision</Text>
          <Text className="mt-2 text-right text-sm text-gray-600">
            Step {getCurrentStep()} of 3
          </Text>
        </View>

        {/* Progress Bar */}
        <View className="mb-6 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <View 
            className="h-full bg-black transition-all"
            style={{ 
              width: scanStep === 'input-a' ? '33%' : scanStep === 'input-b' ? '66%' : '100%' 
            }}
          />
        </View>

        {/* Step Title */}
        <View className="mb-4">
          <Text className="text-xl font-bold text-black">{getStepTitle()}</Text>
          <Text className="mt-1 text-sm text-gray-600">{getStepDescription()}</Text>
        </View>

        {/* Scanned Data Display */}
        {scannedData.inputA && (
          <View className="mb-4 rounded-lg bg-blue-100 p-3">
            <Text className="text-sm font-medium text-blue-800">
              Previous Input (A): {scannedData.inputA}
            </Text>
          </View>
        )}

        {scannedData.inputB && scanStep === 'logic-gate' && (
          <View className="mb-4 rounded-lg bg-blue-100 p-3">
            <Text className="text-sm font-medium text-blue-800">
              Previous Input (B): {scannedData.inputB}
            </Text>
          </View>
        )}

        {/* Scan Card Area */}
        <View className="mb-6 h-64 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
          <Text className="text-center text-base text-gray-500">
            {scanStep === 'logic-gate' ? 'Scan Logic Gate Card' : 'Scan Input Card'}
          </Text>
        </View>

        {/* Start Camera Button */}
        <TouchableOpacity
          className="rounded-full bg-gray-300 px-6 py-4 active:bg-gray-400"
          onPress={handleStartCamera}>
          <Text className="text-center text-lg font-semibold text-black">Start Camera</Text>
        </TouchableOpacity>

        {/* Result Display */}
        {scannedData.logicGate && (
          <View className="mt-6 rounded-xl bg-green-100 p-4">
            <Text className="mb-2 text-center text-lg font-bold text-green-800">
              Scan Selesai! 🎉
            </Text>
            <Text className="text-center text-sm text-green-700">
              Input A: {scannedData.inputA} | Input B: {scannedData.inputB}
            </Text>
            <Text className="text-center text-sm text-green-700">
              Logic Gate: {scannedData.logicGate}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ScanScreen;


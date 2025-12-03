import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import * as ImageManipulator from 'expo-image-manipulator';
import { useTensorflowModel } from 'react-native-tflite';

type ScanScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Scan'>;
type ScanScreenRouteProp = RouteProp<RootStackParamList, 'Scan'>;

interface ScanScreenProps {
  navigation: ScanScreenNavigationProp;
  route: ScanScreenRouteProp;
}

// Label mapping sesuai dengan labels.txt
const LABELS = ['NOT', 'AND', 'OR'];

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
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  // Load TFLite model
  const model = useTensorflowModel(require('../assets/models/model_unquant.tflite'));

  useEffect(() => {
    if (model.state === 'error') {
      console.error('Failed to load model:', model.error);
      Alert.alert('Error', 'Gagal memuat model AI. Pastikan file model tersedia.');
    }
  }, [model.state]);

  if (!permission) {
    return <View />;
  }

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

  // Fungsi untuk klasifikasi gambar menggunakan TFLite
  const classifyImage = async (imageUri: string): Promise<{ label: string; confidence: number } | null> => {
    if (model.state !== 'loaded' || !model.model) {
      Alert.alert('Error', 'Model AI belum siap. Tunggu sebentar...');
      return null;
    }

    try {
      // Resize image sesuai input model (224x224 untuk model Teachable Machine)
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 224, height: 224 } }],
        { format: ImageManipulator.SaveFormat.JPEG }
      );

      // Jalankan inferensi menggunakan model TFLite
      const result = await model.model.run([manipulatedImage.uri]);

      // result biasanya berupa array probabilitas untuk setiap kelas
      if (result && result.length > 0) {
        const predictions = result[0] as number[];
        const maxIndex = predictions.indexOf(Math.max(...predictions));
        const confidence = predictions[maxIndex];

        console.log('Predictions:', predictions);
        console.log('Detected:', LABELS[maxIndex], 'Confidence:', (confidence * 100).toFixed(2) + '%');

        return {
          label: LABELS[maxIndex],
          confidence: confidence,
        };
      }

      return null;
    } catch (error) {
      console.error('Classification error:', error);
      return null;
    }
  };

  const handleCapture = async () => {
    if (!cameraRef.current) return;

    try {
      setIsProcessing(true);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (!photo?.uri) {
        throw new Error('Gagal mengambil foto');
      }

      if (scanStep === 'input-a') {
        // Untuk input A, masih menggunakan mock karena model hanya untuk logic gate
        const mockScannedValue = Math.random() > 0.5 ? '1' : '0';
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
        // Untuk input B, masih menggunakan mock karena model hanya untuk logic gate
        const mockScannedValue = Math.random() > 0.5 ? '1' : '0';
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
        // Klasifikasi gambar untuk mendeteksi logic gate menggunakan TFLite
        const detection = await classifyImage(photo.uri);

        if (detection) {
          const { label, confidence } = detection;
          const updatedData = { ...scannedData, logicGate: label };
          setScannedData(updatedData);
          setIsCameraActive(false);

          Alert.alert(
            'Logic Gate Terdeteksi! 🎉',
            `Gate: ${label}\nConfidence: ${(confidence * 100).toFixed(1)}%`,
            [
              {
                text: 'Lihat Hasil',
                onPress: () => {
                  navigation.navigate('Result', {
                    inputA: updatedData.inputA || '0',
                    inputB: updatedData.inputB || '0',
                    logicGate: label as any,
                    source: 'scan',
                  });
                },
              },
            ]
          );
        } else {
          Alert.alert(
            'Gagal Mendeteksi',
            'Tidak dapat mendeteksi logic gate. Pastikan gambar jelas dan coba lagi.',
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal mengambil foto');
      console.error(error);
    } finally {
      setIsProcessing(false);
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
        return 'Arahkan kamera ke sinyal input pertama';
      case 'input-b':
        return 'Arahkan kamera ke sinyal input kedua';
      case 'logic-gate':
        return 'Arahkan kamera ke kartu logic gate (NOT, AND, OR)';
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

  const getModelStatusText = () => {
    switch (model.state) {
      case 'loading':
        return 'Memuat model AI...';
      case 'loaded':
        return 'Model AI siap';
      case 'error':
        return 'Model AI gagal dimuat';
      default:
        return '';
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
            <View className="items-center pt-12">
              <Text className="text-2xl font-bold text-white">{getStepTitle()}</Text>
              <Text className="mt-2 text-base text-white/90">{getStepDescription()}</Text>
              
              {/* Model status indicator */}
              <View className={`mt-3 rounded-full px-4 py-1 ${
                model.state === 'loaded' ? 'bg-green-500' : 
                model.state === 'loading' ? 'bg-yellow-500' : 'bg-red-500'
              }`}>
                <Text className="text-xs text-white">{getModelStatusText()}</Text>
              </View>
            </View>

            <View className="items-center justify-center">
              <View className="h-64 w-64 rounded-xl border-4 border-white/70" />
              {scannedData.inputA && scanStep !== 'input-a' && (
                <View className="absolute -top-16 rounded-lg bg-blue-500 px-4 py-2">
                  <Text className="text-sm text-white">Input A: {scannedData.inputA}</Text>
                </View>
              )}
              {scannedData.inputB && scanStep === 'logic-gate' && (
                <View className="absolute -top-24 rounded-lg bg-blue-500 px-4 py-2">
                  <Text className="text-sm text-white">Input B: {scannedData.inputB}</Text>
                </View>
              )}
            </View>

            <View className="items-center gap-4 pb-8">
              {/* Loading indicator saat processing */}
              {isProcessing && (
                <View className="mb-2 flex-row items-center rounded-lg bg-yellow-500 px-4 py-2">
                  <ActivityIndicator size="small" color="#fff" />
                  <Text className="ml-2 text-sm text-white">Memproses gambar...</Text>
                </View>
              )}

              <TouchableOpacity
                className={`h-20 w-20 items-center justify-center rounded-full border-4 border-white ${
                  isProcessing || model.state !== 'loaded' ? 'bg-gray-500/30' : 'bg-white/30'
                }`}
                onPress={handleCapture}
                disabled={isProcessing || model.state !== 'loaded'}>
                <View className={`h-16 w-16 rounded-full ${
                  isProcessing || model.state !== 'loaded' ? 'bg-gray-400' : 'bg-white'
                }`} />
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
    <View className="flex-1 bg-[#f4f8ff] px-6 pt-12">
      <TouchableOpacity
        className="mb-4 w-12 h-12 bg-white rounded-full items-center justify-center"
        onPress={handleBackPress}>
        <Text className="text-2xl text-black pb-2 font-bold">←</Text>
      </TouchableOpacity>

      <View className="mx-auto w-full max-w-md rounded-3xl bg-white p-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-black">LogicLab Vision</Text>
          <Text className="mt-2 text-right text-sm text-gray-600">
            Step {getCurrentStep()} of 3
          </Text>
        </View>

        {/* Model Status */}
        <View className={`mb-4 rounded-lg p-3 ${
          model.state === 'loaded' ? 'bg-green-100' : 
          model.state === 'loading' ? 'bg-yellow-100' : 'bg-red-100'
        }`}>
          <View className="flex-row items-center">
            {model.state === 'loading' && (
              <ActivityIndicator size="small" color="#F59E0B" />
            )}
            <Text className={`ml-2 text-sm font-medium ${
              model.state === 'loaded' ? 'text-green-800' : 
              model.state === 'loading' ? 'text-yellow-800' : 'text-red-800'
            }`}>
              {getModelStatusText()}
            </Text>
          </View>
        </View>

        <View className="mb-6 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <View
            className="h-full bg-black transition-all"
            style={{
              width: scanStep === 'input-a' ? '33%' : scanStep === 'input-b' ? '66%' : '100%'
            }}
          />
        </View>

        <View className="mb-4">
          <Text className="text-xl font-bold text-black">{getStepTitle()}</Text>
          <Text className="mt-1 text-sm text-gray-600">{getStepDescription()}</Text>
        </View>

        {scannedData.inputA && (
          <View className="mb-4 rounded-lg bg-blue-100 p-3">
            <Text className="text-sm font-medium text-blue-800">
              Input A: {scannedData.inputA}
            </Text>
          </View>
        )}

        {scannedData.inputB && scanStep === 'logic-gate' && (
          <View className="mb-4 rounded-lg bg-blue-100 p-3">
            <Text className="text-sm font-medium text-blue-800">
              Input B: {scannedData.inputB}
            </Text>
          </View>
        )}

        <View className="mb-6 h-64 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
          <Text className="text-center text-base text-gray-500">
            {scanStep === 'logic-gate' ? 'Scan Logic Gate Card\n(NOT, AND, OR)' : 'Scan Input Card'}
          </Text>
        </View>

        <TouchableOpacity
          className={`rounded-full px-6 py-4 ${
            model.state === 'loaded' ? 'bg-gray-300 active:bg-gray-400' : 'bg-gray-200'
          }`}
          onPress={handleStartCamera}
          disabled={model.state !== 'loaded'}>
          <Text className={`text-center text-lg font-semibold ${
            model.state === 'loaded' ? 'text-black' : 'text-gray-400'
          }`}>
            {model.state === 'loading' ? 'Memuat Model...' : 'Start Camera'}
          </Text>
        </TouchableOpacity>

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

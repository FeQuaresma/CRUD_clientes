import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";

export default function ModCamera({ navigation, route }: any) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null); // Para armazenar a referência da câmera

  if (!permission) {
    // As permissões da câmera ainda estão carregando.
    return <View />;
  }

  if (!permission.granted) {
    // As permissões da câmera não foram concedidas ainda.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Precisamos da sua permissão para mostrar a câmera
        </Text>
        <Button onPress={requestPermission} title="Conceder permissão" />
      </View>
    );
  }

  // Função para alternar entre a câmera frontal e traseira
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  // Função para tirar uma foto
  async function takePicture() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        Alert.alert("Foto tirada!", `Foto salva no caminho: ${photo.uri}`);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível tirar a foto");
      }
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Alternar Câmera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Tirar Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.text}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

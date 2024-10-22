import { sumClass } from "@/src/functions/sumClass";
import { useEffect, useState } from "react";
import { Image as ImageRN, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import generateRandomAlphanumeric from "@/src/functions/generateRandomAlphanumeric";

export default function Image({ field, classes, setCrypto }: any) {
  const [imageUri, setImageUri] = useState(null);
  const fileUri: any = `${FileSystem.documentDirectory}${field.crypt}.jpg`;

  useEffect(() => {
    if (!field.crypt) {
      setCrypto(generateRandomAlphanumeric(20));
      setTimeout(()=>{
        console.log("gerou a primeira vez",field.crypt)
      },10000)
    } else {
      console.log("guardou",field.crypt)
    }
    // checkIfFileExists();
  }, []);

  const downloadImage = async () => {
    try {
      const { uri }: any = await FileSystem.downloadAsync(
        field.source,
        fileUri
      );
      setImageUri(uri);
      console.log("Image downloaded to:", uri);
    } catch (error) {
      console.log("Error downloading image:", error);
    }
  };

  const checkIfFileExists = async () => {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      setImageUri(fileUri); // Se o arquivo já existe, use-o
      console.log("Image already exists locally:", fileUri);
    } else {
      console.log("File does not exist, downloading...");
      downloadImage();
    }
  };

  return (
    <View>
      {imageUri ? (
        <ImageRN
          // source={{ uri: field.source }}
          source={{ uri: imageUri }}
          style={{ ...sumClass(field.class, classes), ...field.style }}
        />
      ) : (
        <Text>Nenhuma imagem baixada.</Text>
      )}
    </View>
  );
}

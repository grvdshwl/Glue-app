import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { Box } from "@gluestack-ui/themed"; // Assuming Box is a custom component
import { CameraReverseIcon } from "../../Icons/CameraIcon";
import { useNavigation } from "@react-navigation/native";

const CameraModule = () => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);
  const windowDimensions = useWindowDimensions();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === "granted");
    })();
  }, []);

  const toggleCameraType = () => {
    setType((currentType) =>
      currentType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(uri);
    }
  };

  if (cameraPermission === null) {
    return null; // Return null while permissions are loading
  }

  if (!cameraPermission) {
    return (
      <Box style={styles.container}>
        <Text style={styles.text}>
          We need your permission to show the camera
        </Text>
      </Box>
    );
  }

  return (
    <Box style={styles.container}>
      {capturedPhoto ? (
        <View
          style={[
            styles.previewContainer,
            { width: windowDimensions.width, height: windowDimensions.height },
          ]}
        >
          <Image
            source={{ uri: capturedPhoto }}
            style={[
              styles.previewImage,
              {
                width: windowDimensions.width,
                height: windowDimensions.height,
              },
            ]}
          />
          <Box style={styles.previewButtonContainer}>
            <Box sx={{ width: 20, height: 20 }} />

            <TouchableOpacity
              style={styles.previewButton}
              onPress={() => {
                navigation.navigate("AddPost", {
                  params: { uriList: [capturedPhoto] },
                  screen: "NewPost",
                });
              }}
            >
              <Text style={{ color: "#fff" }}>Post</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.previewButton}
              onPress={() => setCapturedPhoto(null)}
            >
              <Text style={{ color: "#fff" }}>Back</Text>
            </TouchableOpacity>
          </Box>
        </View>
      ) : (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                paddingHorizontal: 12,
                paddingVertical: 8,
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={{ color: "#000" }}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            ></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <CameraReverseIcon color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
    position: "relative",
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    alignItems: "center",
  },
  captureButton: {
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: "white",
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    flex: 1,
  },
  previewButtonContainer: {
    padding: 12,
    width: "100%",
    position: "absolute",
    bottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  previewButton: {
    backgroundColor: "black",
    padding: 16,
    textAlign: "center",
  },
});

export default CameraModule;

import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onClose,
  onLogout,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Are you sure you want to Logout?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface Styles {
  container: ViewStyle;
  modalContent: ViewStyle;
  title: TextStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    backgroundColor: "#339af0",
    padding: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LogoutModal;

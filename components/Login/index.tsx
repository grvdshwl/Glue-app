import {
  Box,
  Button,
  EyeIcon,
  EyeOffIcon,
  Pressable,
  ScrollView,
  Text,
} from "@gluestack-ui/themed";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  StyleSheet,
  TextInput,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { AppContext } from "../../context";
import { useNavigation } from "@react-navigation/native";
import { isValidEmail } from "../../utils/validation";
import useToast from "../../hooks/useToast";
import LottieView from "lottie-react-native";
import useLogin from "../../hooks/useLogin";
import ErrorMessageBox from "../ErrorMessageBox";
import AnimatedSpinner from "../../Animation/AnimatedSpinner";

interface State {
  email: string;
  password: string;
}

type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "RESET" };

const initialState: State = {
  email: "",
  password: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "RESET":
      return { email: "", password: "" };
    default:
      return state;
  }
};

const Login: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { handleUser } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const showToast = useToast();
  const { handleUserLogin, loading: isLoading, error } = useLogin();

  useEffect(() => {
    return () => {
      dispatch({ type: "RESET" });
    };
  }, []);

  const handleEmailChange = (text: string) => {
    dispatch({ type: "SET_EMAIL", payload: text });
  };

  const handlePasswordChange = (text: string) => {
    dispatch({ type: "SET_PASSWORD", payload: text });
  };

  const handleLogin = async () => {
    if (!state.email || !state.password) {
      showToast("error", "Please provide all the details to proceed.");
      return;
    }

    if (!isValidEmail(state.email)) {
      showToast("error", "Please enter a valid email address.");
      return;
    }

    const user = await handleUserLogin(state);
    if (user) {
      handleUser(user);
      dispatch({ type: "RESET" });
    }
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Box
        style={{
          width: "100%",
          height: 250,
          backgroundColor: "#fff",
          paddingLeft: 100,
          justifyContent: "center",
        }}
      >
        <LottieView
          style={{ flex: 1 }}
          source={require("../../assets/login-animation.json")}
          autoPlay
          loop
        />
      </Box>
      <Box style={styles.container}>
        <Box style={styles.box}>
          <Text style={styles.title}>Connect </Text>

          <Box style={styles.inputBox}>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={state.email}
              onChangeText={handleEmailChange}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Box>
          <Box style={styles.inputBox}>
            <TextInput
              placeholder="Password"
              style={styles.input}
              value={state.password}
              onChangeText={handlePasswordChange}
              secureTextEntry={!showPassword}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </Pressable>
          </Box>
          <Button style={styles.button} onPress={handleLogin}>
            {!isLoading ? (
              <Text style={styles.buttonText}>Login</Text>
            ) : (
              <AnimatedSpinner color="white" />
            )}
          </Button>
          <ErrorMessageBox error={error} />
        </Box>
        <Box style={styles.box2}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp" as never);
            }}
          >
            <Text style={styles.text2}>Sign Up</Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#fff",
    padding: 28,
    width: "90%",
    borderRadius: 10,
    gap: 24,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowColor: "#000",
    shadowRadius: 5,
  },
  box2: {
    borderTopWidth: 1,
    borderColor: "#e2e2e2",
    paddingTop: 16,
    padding: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  title: {
    fontSize: 24,
    paddingTop: 24,
    textAlign: "center",
    fontFamily: "Pacifico-Regular",
    color: "#262626",
  } as TextStyle,
  inputBox: { gap: 5, position: "relative" } as ViewStyle,
  input: {
    gap: 5,
    borderColor: "#f2f2f2",
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
  } as ViewStyle,
  button: {
    backgroundColor: "#339af0",
    borderRadius: 5,
  } as ViewStyle,
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  } as TextStyle,
  text2: {
    color: "#339af0",
    fontWeight: "600",
    justifyContent: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "30%",
  } as ViewStyle,
});

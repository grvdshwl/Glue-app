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
import { Image } from "@gluestack-ui/themed";
import { googleIconLink } from "../../utils/link";
import useToast from "../../hooks/useToast";
import { useSignUpWithEmailAndPassword } from "../../hooks/useSignUpWithEmailAndPassword";
import LottieView from "lottie-react-native";
import AnimatedSpinner from "../../Animation/AnimatedSpinner";

interface State {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_CONFIRM_PASSWORD"; payload: string }
  | { type: "SET_FULL_NAME"; payload: string }
  | { type: "RESET" };

const initialState: State = {
  email: "",
  password: "",
  confirmPassword: "",
  fullName: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "SET_FULL_NAME":
      return { ...state, fullName: action.payload };

    case "RESET":
      return {
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
      };
    default:
      return state;
  }
};

const SignUp: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { signUp, loading: isLoading, error } = useSignUpWithEmailAndPassword();

  const showToast = useToast();
  const { handleUser } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    return () => {
      dispatch({ type: "RESET" });
    };
  }, []);

  const handleEmailChange = (text: string) => {
    dispatch({ type: "SET_EMAIL", payload: text });
  };

  const handleFullnameChange = (text: string) => {
    dispatch({ type: "SET_FULL_NAME", payload: text });
  };

  const handlePasswordChange = (text: string) => {
    dispatch({ type: "SET_PASSWORD", payload: text });
  };

  const handleConfirmPasswordChange = (text: string) => {
    dispatch({ type: "SET_CONFIRM_PASSWORD", payload: text });
  };

  const handleRegister = async () => {
    if (
      !state.email ||
      !state.password ||
      !state.confirmPassword ||
      !state.fullName
    ) {
      showToast("error", "Please provide all the details to proceed.");
      return;
    }

    if (!isValidEmail(state.email)) {
      showToast("error", "Please enter a valid email address.");
      return;
    }

    if (state.password !== state.confirmPassword) {
      showToast("error", "Password must be the same as confirm password.");
      return;
    }
    const user = await signUp(state);
    if (!!user) {
      handleUser(user);
      dispatch({ type: "RESET" });
    }
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Box
        style={{
          width: "100%",
          height: 200,
          backgroundColor: "#fff",
          justifyContent: "center",
        }}
      >
        <LottieView
          style={{ flex: 1 }}
          source={require("../../assets/register-animation.json")}
          autoPlay
          loop
        />
      </Box>
      <Box style={styles.container}>
        <Box style={styles.box}>
          <Text style={styles.title}>Connect</Text>
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
              placeholder="Full Name"
              style={styles.input}
              value={state.fullName}
              onChangeText={handleFullnameChange}
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
          <Box style={styles.inputBox}>
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              value={state.confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              secureTextEntry={!showConfirmPassword}
            />
            <Pressable
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
            </Pressable>
          </Box>
          {error && (
            <Box sx={{ borderWidth: 1, borderColor: "$red500", padding: 4 }}>
              <Text
                sx={{
                  textAlign: "center",
                  color: "$red500",
                  fontWeight: "600",
                  fontSize: 12,
                }}
              >
                {error.message}
              </Text>
            </Box>
          )}
          <Button style={styles.button} onPress={handleRegister}>
            {!isLoading ? (
              <Text style={styles.buttonText}>Sign Up</Text>
            ) : (
              <AnimatedSpinner color="#fff" />
            )}
          </Button>
        </Box>
        <Box style={styles.box2}>
          <Text>I already have a account ? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login" as never);
            }}
          >
            <Text style={styles.text2}>Login</Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  box: {
    backgroundColor: "#fff",
    padding: 24,
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
    paddingTop: 12,
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
    padding: 10,
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

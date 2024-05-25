import Toast from "react-native-toast-message";

const useToast = () => {
  const showToast = (type = "error", text1 = "", text2 = "") => {
    Toast.show({
      type,
      text1,
      text2,
    });
  };

  return showToast;
};

export default useToast;

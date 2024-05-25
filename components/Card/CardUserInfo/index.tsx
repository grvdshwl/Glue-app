import { Box, Image, Pressable, Text } from "@gluestack-ui/themed";
import React, { useContext, useState } from "react";
import MoreIcon from "../../../Icons/MoreIcon";
import PopupMenu from "../../PopUpMenu";
import { AppContext } from "../../../context";
import { useNavigation } from "@react-navigation/native";
import EditModalPopUp from "../../EditModalPopUp";

interface CardUserInfoProps {
  data: {
    user: {
      fullName: string;
      profilePicUrl: string;
      id: string;
      uid: string;
    };
    location: string;
  };
}

const CardUserInfo: React.FC<CardUserInfoProps> = ({ data }) => {
  const { user: currentUser } = useContext(AppContext);
  const navigation = useNavigation();
  const [showEdit, toggleShowEdit] = useState(false);

  const { user, location } = data;
  const { fullName, profilePicUrl } = user;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const showMore = currentUser.uid === user.uid;

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };
  return (
    <Box>
      <Pressable
        onPress={() => {
          if (user.uid !== currentUser.uid) {
            navigation.navigate("UserProfile", { userData: user });
          }
        }}
        sx={{
          paddingHorizontal: 12,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flexDirection: "row", gap: 12 }}>
          <Box>
            <Image
              source={{ uri: profilePicUrl }}
              alt={fullName}
              sx={{
                width: 48,
                height: 48,
                objectFit: "cover",
                borderRadius: 24,
              }}
            />
          </Box>
          <Box>
            <Text sx={{ fontSize: 16, color: "#000", fontWeight: "600" }}>
              {fullName}
            </Text>
            <Text sx={{ fontSize: 16, color: "#000" }}>{location}</Text>
          </Box>
        </Box>
        {showMore && (
          <Pressable onPress={toggleMenu}>
            <MoreIcon />
          </Pressable>
        )}
      </Pressable>
      <PopupMenu
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        data={data}
        setShowEdit={() => {
          toggleShowEdit(true);
        }}
      />
      <EditModalPopUp
        isVisible={showEdit}
        setIsVisible={toggleShowEdit}
        data={data}
      />
    </Box>
  );
};

export default CardUserInfo;

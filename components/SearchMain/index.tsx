import React, { useContext, useState } from "react";
import { Box, FlatList, Text } from "@gluestack-ui/themed";
import { TextInput } from "react-native";
import { useSearch } from "../../hooks/useSearch";
import { AppContext } from "../../context";
import SearchCard from "../SeachCard";

const SearchMain: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]); // Adjust this type as per your user data structure
  const { user } = useContext(AppContext);
  const { searchUsers } = useSearch(user.uid);

  const handleSearchChange = (text: string) => {
    setSearchValue(text);
    const data = searchUsers(text);
    setUsers(data);
  };

  return (
    <Box sx={{ padding: 12 }}>
      <Text
        sx={{
          textAlign: "center",
          fontWeight: "600",
          fontSize: 20,
          color: "#000",
          marginBottom: 12,
        }}
      >
        Search
      </Text>
      <TextInput
        style={{
          borderColor: "#262626",
          borderWidth: 1,
          padding: 8,
          opacity: 0.6,
        }}
        placeholder="Search"
        value={searchValue}
        onChangeText={handleSearchChange}
      />
      <Box sx={{ marginTop: 16, height: "100%" }}>
        <FlatList
          data={users}
          renderItem={({ item }) => <SearchCard data={item} />}
          keyExtractor={(item, index) => item.uid.toString()}
          ItemSeparatorComponent={() => <Box sx={{ height: 20 }} />}
        />
      </Box>
    </Box>
  );
};

export default SearchMain;

import React from "react";
import { Box, Text } from "@gluestack-ui/themed";

interface ErrorMessageBoxProps {
  error: any | null;
}

const ErrorMessageBox: React.FC<ErrorMessageBoxProps> = ({ error }) => {
  return (
    <>
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
            {error?.message}
          </Text>
        </Box>
      )}
    </>
  );
};

export default ErrorMessageBox;

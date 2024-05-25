import React from "react";
import { render } from "@testing-library/react-native";
import ErrorMessageBox from "./index"; 

describe("ErrorMessageBox component", () => {
  test("renders error message when error prop is provided", () => {
    const errorMessage = "Test error message";
    const { getByText } = render(<ErrorMessageBox error={{ message: errorMessage }} />);
    
    const errorTextElement = getByText(errorMessage);
    
    expect(errorTextElement).toBeTruthy();
  });

  test("does not render anything when error prop is null", () => {
    const { container } = render(<ErrorMessageBox error={null} />);
    
    expect(container.children.length).toBe(0);
  });
});

import React from "react";
import { render } from "@testing-library/react-native";

const mockInfo = {
  user: {
    name: "John Doe",
    userImage: "https://example.com/userImage.jpg",
  },
  post: {
    user: "Jane Smith",
    image: "https://example.com/postImage.jpg",
  },
};

describe("PostInfo", () => {
  it("renders correctly", () => {
    const { getByAltText, getByText } = render(<PostInfo info={mockInfo} />);

    const userImage = getByAltText(mockInfo.user.name);
    expect(userImage).toBeTruthy();
    expect(userImage.props.source.uri).toEqual(mockInfo.user.userImage);

    const userName = getByText(mockInfo.user.name);
    expect(userName).toBeTruthy();

    const postImage = getByAltText(mockInfo.user.name);
    expect(postImage).toBeTruthy();
    expect(postImage.props.source.uri).toEqual(mockInfo.post.image);

    const postMessage = getByText(`${mockInfo.user.name} liked your Post.`);
    expect(postMessage).toBeTruthy();
  });
});

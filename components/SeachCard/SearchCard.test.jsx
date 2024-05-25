import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import SearchCard from './SearchCard';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

const mockData = {
  fullName: 'John Doe',
  profilePicUrl: 'https://example.com/profilePic.jpg',
  bio: 'Lorem ipsum dolor sit amet',
};

describe('SearchCard', () => {
  it('navigates to UserProfile screen on press', () => {
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    const { getByA11yLabel } = render(
      <NavigationContainer>
        <SearchCard data={mockData} />
      </NavigationContainer>
    );

    const pressable = getByA11yLabel(mockData.fullName);
    fireEvent.press(pressable);

    expect(mockNavigate).toHaveBeenCalledWith('UserProfile', { userData: mockData });
  });
});

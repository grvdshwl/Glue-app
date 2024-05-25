import React, {
  createContext,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { UserData } from "../types";
import useFetchPostsByIds from "../hooks/useFetchPostsbyId";
import useFetchFollowersPosts from "../hooks/useFetchFollowersPosts";

interface AppContextType {
  isAuthenticated: boolean;
  user: any;
  handleUser: (userData: any) => void;
  userPosts: any;
  userFeeds: any;
  logoutUser: any;
  resetContext: any;
  feedLoading: boolean;
  refetchUserPosts: any;
  refetchFollowersPosts: any;
}

const defaultContextValue: AppContextType = {
  isAuthenticated: false,
  user: null,
  handleUser: () => {},
  userPosts: [],
  userFeeds: null,
  logoutUser: () => {},
  resetContext: () => {},
  refetchUserPosts: () => {},
  feedLoading: true,
  refetchFollowersPosts: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState<UserData | null>(null);
  const [userFeeds, setUserFeeds] = useState([]);
  const { fetchPostsByIds } = useFetchPostsByIds();
  const { fetchFollowersPosts, loading: feedLoading } =
    useFetchFollowersPosts();

  useLayoutEffect(() => {
    if (user) {
      if (user.posts.length) {
        fetchPostsByIds(user.posts).then((posts) => {
          setUserPosts(posts);
        });
      }
      if (user?.following.length) {
        fetchFollowersPosts(user.following).then((feeds: any) => {
          setUserFeeds(feeds);
        });
      }
    }
  }, [user]);

  const handleUser = (userData: UserData): void => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const resetContext = () => {
    setUser(null);
    setUserFeeds([]);
    setUserPosts([]);
  };

  const logoutUser = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const refetchUserPosts = () => {
    fetchPostsByIds(user?.posts).then((posts) => {
      setUserPosts(posts);
    });
  };

  const refetchFollowersPosts = () => {
    if (user?.following.length) {
      setUserFeeds([]);
      fetchFollowersPosts(user.following).then((feeds: any) => {
        setUserFeeds(feeds);
      });
    }
  };

  const contextValue: AppContextType = {
    isAuthenticated,
    user,
    handleUser,
    userPosts,
    userFeeds,
    logoutUser,
    resetContext,
    feedLoading,
    refetchUserPosts,
    refetchFollowersPosts,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

import React, { useContext } from "react";
import PostFeed from "../../components/PostFeed";
import Header from "../../components/Header";
import { AppContext } from "../../context";

const Feed = () => {
  const { userFeeds, feedLoading } = useContext(AppContext);
  return (
    <>
      <Header />
      <PostFeed posts={userFeeds} loading={feedLoading} />
    </>
  );
};

export default Feed;

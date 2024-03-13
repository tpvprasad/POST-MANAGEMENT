import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import axios from "axios";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  async function getData() {
    const response = await axios.get(
      `http://192.168.50.129:4010/post/getAll/${userData?._id}`
    );
    const allPosts = response.data.content;
    setPosts(allPosts);
  }

  useEffect(() => {
    if (userData) {
      getData();
    }
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            <h1>Login to read posts</h1>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post._id}>
              <PostCard
                $id={post._id}
                title={post.title}
                featuredImage={post.image}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;

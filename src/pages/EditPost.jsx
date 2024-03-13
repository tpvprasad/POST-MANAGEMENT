import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
// import appwriteService from "../appwrite/config"
import { useEffect } from "react";
import Container from "../components/container/Container";
import PostForm from "../components/PostForm";
import axios from "axios";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  console.log(slug);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `http://192.168.50.129:4010/post/${slug}`
      );
      console.log(response.data);
      const post = response.data.content;
      setPost(post);
    }
    getData();
  }, [slug]);

  return (
    <div className="py-6">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;

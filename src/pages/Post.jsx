import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// import appwriteService from "../appwrite/config"
import Button from "../components/Button";
import Container from "../components/container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import axios from "axios";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData._id : false;

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `http://192.168.50.129:4010/post/${slug}`
      );
      console.log(response.data);
      const reqPost = response.data.content;
      setPost(reqPost);
    }
    getData();
  }, [slug]);

  const deletePost = async (id) => {
    const response = await axios.delete(
      `http://192.168.50.129:4010/post/delete/${id}`
    );
    const deletedPost = response.data.content;
    console.log(deletedPost);
    navigate("/all-posts");
  };
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img src={post.image} alt={post.title} className="rounded-xl" />
          {isAuthor && (
            <div className="absolute-right-6 top-6">
              <Link to={`/edit-post/${post._id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={() => deletePost(post._id)}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="browser-css">{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;

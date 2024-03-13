import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PostForm({ post }) {
  console.log(post)
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      console.log(data);
      const formData = new FormData();
      formData.append("title", data.title); 
      formData.append("slug", data.slug);
      formData.append("content", data.content); 
      formData.append("status", data.status);
      formData.append("image", data.image[0]);
      formData.append("userId", userData?._id);
     if(post) {
      const response = await axios.patch(`http://192.168.50.129:4010/post/edit-post/${post._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the Content-Type header
        },
      });
      const post1 = response.data.content;
      navigate(`/post/${post1._id}`)

     }
     else {
       const response = await axios.post("http://192.168.50.129:4010/post/add-post", formData, {
         headers: {
           "Content-Type": "multipart/form-data", // Set the Content-Type header
         },
       });
       const post2 = response.data.content;
       navigate(`/post/${post2._id}`)
     }
    } catch (error) {
      console.log(error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
  }, []);

  React.useEffect(() => {
    watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
  }, [watch, slugTransform, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <Input
          label="Content"
          placeholder="Content"
          className="mb-4"
          {...register("content", { required: true })}
        />
      </div>
      <div className="1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img src={post.image} alt={post.title} className="rounded-lg" />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;

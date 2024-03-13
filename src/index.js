// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.js";
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import ProtectedLayout from "./ProtectedLayout.jsx";
import Signup from "./pages/Signup.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children : [
      {
        path: "/",
        element:  (
          <ProtectedLayout authentication>
            <Home/>
          </ProtectedLayout>
        )
      },
      {
        path: "/login",
        element: (
          <ProtectedLayout authentication={false}>
            <Login/>
          </ProtectedLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <ProtectedLayout authentication={false}>
            <Signup/>
          </ProtectedLayout>
        )
      },
      {
        path: "/all-posts",
        element: (
          <ProtectedLayout authentication>
            <AllPosts />
          </ProtectedLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <ProtectedLayout authentication>
            <AddPost />
          </ProtectedLayout>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <ProtectedLayout authentication>
            <EditPost />
          </ProtectedLayout>
        )
      },
      {
        path: "/post/:slug",
        element: (
          <ProtectedLayout authentication>
            <Post />
          </ProtectedLayout>
        )
      }
    ]
  },
]);

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)

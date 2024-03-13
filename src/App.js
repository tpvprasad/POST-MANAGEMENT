import React from "react";
// import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
    <div className="w-full block">
        <Header />
        <main>
            <Outlet />
        </main>
    </div>
    <div className="w-full block">
        <Footer />
    </div>
</div>
  );
}

export default App;

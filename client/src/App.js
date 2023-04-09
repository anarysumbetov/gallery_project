import React from "react";
import { Container } from "@material-ui/core";
import { Routes, Route, Navigate } from "react-router-dom";

import PostDetails from "./components/PostDetails/PostDetails.jsx";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/auth" element={!user ? <Auth /> : <Navigate replace to="/posts" />} />
      </Routes>
    </Container>
  );
}

export default App;

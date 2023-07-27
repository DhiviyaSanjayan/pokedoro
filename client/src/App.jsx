import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  TimerPage,
  CollectionPage,
  NotFound,
  About,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/timer/:id" element={<TimerPage />} />
      <Route path="/collection/" element={<CollectionPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

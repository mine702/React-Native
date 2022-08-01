import React from "react";
import { NativeRouter, Routes, Route } from "react-router-native";
import { StatusBar, Platform  } from "react-native";
import Constants from 'expo-constants'; // Constants로 불러온다.
// Pages
import LoginPage from './component/page/LoginPage';
import MainPage from './component/page/MainPage';
import RegisterPage from "./component/page/RegisterPage";
import TestPage from './component/page/testpage'
// ...any other imports needed      
// example

export default function App() {
  return (
    <NativeRouter>
        <StatusBar />
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="post-LoginPage" component={LoginPage} element={<LoginPage />} />
          <Route path="post-RegisterPage" component={RegisterPage} element={<RegisterPage />} />
          <Route path="post-MainPage" component={MainPage} element={<MainPage />} />
        </Routes>
    </NativeRouter>
  );
}

StatusBar.setBackgroundColor("transparent");
StatusBar.setTranslucent(false);
StatusBar.setBarStyle("dark-content");

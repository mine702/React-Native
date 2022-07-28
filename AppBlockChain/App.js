import React from "react";
import { NativeRouter, Routes, Route } from "react-router-native";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import Constants from 'expo-constants'; // Constants로 불러온다.
// Pages
import LoginPage from './component/page/LoginPage';
import MainPage from './component/page/MainPage';
import TestPage from './component/page/testpage'
// ...any other imports needed      
// example

export default function App() {
  return (
    <NativeRouter>
        <StatusBar />
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="post-MainPage" component={MainPage} element={<MainPage />} />
        </Routes>
    </NativeRouter>
  );
}

StatusBar.setBackgroundColor("transparent");
StatusBar.setTranslucent(false);
StatusBar.setBarStyle("dark-content");

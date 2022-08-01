import React from "react";
import { NativeRouter, Routes, Route } from "react-router-native";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import Constants from 'expo-constants'; // Constants로 불러온다.
import { MoralisProvider } from "react-moralis";
// Pages
import LoginPage from './component/page/LoginPage';
import MainPage from './component/page/MainPage';
import TestPage from './component/page/testpage'
// ...any other imports needed      
// example



export default function App() {

  const moralisAppId = "MtP1e1mZi9AaoY2rWPxJkiNV4crVAYaRDxW8TOqZ"
  const moralisServerURL = "https://ca9d6oq1otzh.usemoralis.com:2053/server"

  return (
    <React.StrictMode>
    <MoralisProvider appId={moralisAppId} serverUrl={moralisServerURL}>
    <NativeRouter>
        <StatusBar />
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="post-MainPage" component={MainPage} element={<MainPage />} />
        </Routes>
      </NativeRouter>
      </MoralisProvider>
      </React.StrictMode>
  );
}

StatusBar.setBackgroundColor("transparent");
StatusBar.setTranslucent(false);
StatusBar.setBarStyle("dark-content");

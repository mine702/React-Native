import React from "react";
import { NativeRouter, Routes, Route } from "react-router-native";
import { StyleSheet, SafeAreaView } from "react-native";
import Constants from 'expo-constants'; // Constants로 불러온다.
// Pages
import LoginPage from './component/page/LoginPage';
import MainPage from './component/page/MainPage';
// ...any other imports needed      
// example

export default function App() {
  return (
    <NativeRouter>
      <SafeAreaView style={styles.screen}>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="post-MainPage" component={MainPage} element={<MainPage />} />
        </Routes>
      </SafeAreaView>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight
  }
});

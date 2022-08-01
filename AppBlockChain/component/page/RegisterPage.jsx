import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { useNavigate } from "react-router-native";
import { io } from "socket.io-client";

let socket;

export default function RegisterPage() {

  const ENDPOINT = "http://10.101.196.169:8080";

  const navigate = useNavigate();

  //#region useState
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [MetaMaskAcc, setMetaMaskAcc] = useState("");

  const [idcheck, setIdCheck] = useState(false);
  //#endregion

  //#region useEffectr
  useEffect(() => {
    socket = io(ENDPOINT)
  }, []);
  //#endregion

  //#region 회원가입 버튼(이벤트)
  function Sign_up() {
    
    if (name === "" || id === "" || pw === "" || phoneNum === "" || MetaMaskAcc === "") {
      alert("입력하지 않은 정보가 있습니다");
    }
    else if (idcheck === false) {
      alert("ID 중복 체크 하세요!");
    }
    else {
      socket.emit("sign_up", { name, id, pw, phoneNum, MetaMaskAcc });
      socket.on("MemberCheck", (CheckMsg) => {
        alert(CheckMsg);
      })
      navigate('/');
    }
  }
  //#endregion

  //#region 체크박스 확인
  function CheckBoxBool() {
    if (infocheck === false) {
      setInfocheck(true);
    }
    else if (infocheck === true) {
      setInfocheck(false);
    }
  }

  //#region ID중복 확인
  function IdCheck() {
    if (id !== "") {
      socket.emit("idCheck", { id });

      socket.on("idCheck_rusult", (result) => {
        if (result.result === true) {
          alert("중복된 ID 입니다.")
          setIdCheck(false);
        }
        else if (result.result === false) {
          setIdCheck(true);
          alert("사용가능한 ID 입니다.")
        }
      });
    }
    else {
      alert("ID를 입력하세요");
    }
  }
  //#endregion

  //#endregion
  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Logo />
        <Header>회원가입</Header>
        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName(text)}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          label="ID"
          returnKeyType="next"
          value={id.value}
          onChangeText={(text) => setId(text)}
          autoCapitalize="none"
        />
        <Button
          mode="contained"
          onPress={() => {
            IdCheck();
          }}
        >
          id 중복체크
        </Button>
        <TextInput
          label="Password"
          returnKeyType="done"
          value={pw.value}
          onChangeText={(text) => setPw(text)}
          secureTextEntry
        />
        <TextInput
          label="전화번호"
          returnKeyType="done"
          value={phoneNum.value}
          onChangeText={(text) => setPhoneNum(text)}
        />
        <TextInput
          label="MetaMaskAcc"
          returnKeyType="done"
          value={MetaMaskAcc.value}
          onChangeText={(text) => setMetaMaskAcc(text)}
          secureTextEntry
        />
        <Button
          mode="contained"
          onPress={Sign_up}
          style={{ marginTop: 24 }}
        >
          회원 가입
        </Button>
        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigate("/post-LoginPage")}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

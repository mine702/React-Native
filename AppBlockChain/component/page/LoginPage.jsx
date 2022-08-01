import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-native";
import { io } from "socket.io-client";
import { Text } from 'react-native-paper'
import { Alert, TouchableOpacity, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { useMoralis } from "react-moralis";
//#region mui
//#endregion

import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'

let socket;

export default function LoginPage() {
    const {
        authenticate,
        isWeb3Enabled,
        isAuthenticated,
        user,
        enableWeb3,
        Moralis,
    } = useMoralis();

    async function authWalletConnect() {
        const user = authenticate({
            provider: "walletconnect",
            chainId: 56,
            // mobileLinks: [
            //   "metamask",
            //   "trust",
            //   "rainbow",
            //   "argent",
            //   "imtoken",
            //   "pillar",
            // ],
            signingMessage: "Welcome!",
        });
        console.log(user);
    }
    const ENDPOINT = "http://10.101.196.169:8080";

    const navigate = useNavigate();

    //#region useState 변수
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    //#endregion

    //#region useEffect
    useEffect(() => {
        socket = io(ENDPOINT)
    }, []);
    //#endregion

    async function Login() {
        socket.emit("Login", { id, pw });
        await socket.on("Login_result", (result) => {
            // eslint-disable-next-line eqeqeq
            if (result == "" || undefined) {
                Alert.alert("아이디와 비밀번호를 확인하세요");
                setId("");
            }
            else {
                console.log("로그인성공")
                navigate("/post-MainPage", { state: result });
            }
        })
    }

    //#region 렌더링
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Logo />
            <Header>Login</Header>
            <TextInput
                label="ID"
                returnKeyType="next"
                onChangeText={(text) => setId(text)}
                autoCapitalize="none"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                onChangeText={(text) => setPw(text)}
                secureTextEntry
            />
            <Button mode="contained" onPress={Login}>
                Login
            </Button>
            <Button mode="contained" onPress={() => authWalletConnect()}>
                지갑 연결
            </Button>
            <View style={styles.row}>
                <Text>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigate("/post-RegisterPage")}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
    //#endregion
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: '#560CCE',
    },
})
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigate } from "react-router-native";
import { Box } from "@react-native-material/core";
import { io } from "socket.io-client";
import { Alert } from "react-native";
//#region mui
import { Stack, useTheme, Text, TextInput, Button, ActivityIndicator } from "@react-native-material/core";
import { AntDesign } from '@expo/vector-icons';
//#endregion

let socket;

export default function Login() {
    const ENDPOINT = "http://10.101.196.136:8080";

    const theme = useTheme()

    const navigate = useNavigate();

    //#region useState 변수
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    //#endregion

    //#region useEffectr
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
                navigate("/post-MainPage");
            }
        })
    }
    //#region 렌더링
    return (
        <Stack m={50} spacing={2}>
            <Stack center m={50}>
                <Box>
                    <AntDesign name="lock" size={50} color="black" />
                </Box>
                <Box>
                    <Text variant="h5">
                        Login
                    </Text>
                </Box>
            </Stack>
            <Stack m={20}>
                <TextInput
                    label="ID"
                    variant="outlined"
                    onChangeText={(e) => setId(e)}
                />
                <TextInput
                    label="Password"
                    variant="outlined"
                    secureTextEntry={true}
                    onChangeText={(e) => setPw(e)}
                />
            </Stack>
            <Stack m={30}>
                <Button
                    type="submit"
                    title="Login"
                    variant="contained"
                    onPress={Login}
                />
            </Stack>
            <Stack m={30}>
                <Button
                    type="submit"
                    title="NewMember"
                    variant="contained"
                />
            </Stack>
        </Stack>
    );
    //#endregion
}


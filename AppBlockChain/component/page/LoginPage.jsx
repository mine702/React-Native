import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-native";
import { Box } from "@react-native-material/core";
import { io } from "socket.io-client";
import { Alert } from "react-native";
import { useMoralis} from "react-moralis";
//#region mui
import { Stack, useTheme, Text, TextInput, Button, ActivityIndicator } from "@react-native-material/core";
import { AntDesign } from '@expo/vector-icons';
//#endregion

let socket;
let connector;

export default function Login() {

    const ENDPOINT = "http://10.101.192.219:8080";

    const navigate = useNavigate();
    
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
    
      useEffect(() => {
        if (!isWeb3Enabled && isAuthenticated) {
          enableWeb3({ provider: "walletconnect", chainId: 56 });
          console.log("web3 activated");
        }
      }, [isWeb3Enabled, isAuthenticated, enableWeb3]);
    
    //   document.addEventListener("visibilitychange", () => {
    //     if (document.visibilityState === "hidden") {
    //       window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    //     }
    //   });
  
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
                navigate("/post-MainPage", { state: result });
            }
        })
    }
       
    //#region 렌더링
    if (!isAuthenticated && !user) {
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
            <Stack>
            <Button
            colorScheme="green"
            size="lg"
            onClick={() => authWalletConnect()}
            title="Wallet Connect">
          </Button>
            </Stack>
        </Stack>
    );
    //#endregion
}

return (
    <Box display={"block"} p={35} className="App">
      <LogoutButton />
      <Center>
        <img width={500} height={500} src={logo} alt="logo" />
      </Center>

      <Center>
        <Heading as="h2" size="3xl" p={10}>
          Wallet Logged in
        </Heading>
      </Center>
    </Box>
  );

}


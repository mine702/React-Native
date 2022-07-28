import React from "react";
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigate, useLocation } from "react-router-native";

//#region 라이브러리
import Web3 from 'web3';
//#endregion

//#region 전역변수
let socket;
let web3;
let instance;
let temp1;
let temp2;
let temp3;
//#endregion

export default function MainPage() {

    return (
        <AppBar
            leading={props => (
                <HStack>
                    <IconButton
                        icon={props => <Icon name="menu" {...props} />
                        }{...props}
                        onPress={() => {
                            console.log("맞아요")
                        }}
                    />
                    <IconButton
                        icon={props => <Icon name="email-outline" {...props} />
                        } {...props} />
                </HStack>
            )}
            trailing={props => (
                <HStack>
                    <IconButton
                        icon={props => <Icon name="dots-vertical" {...props} />}
                        {...props}
                    />
                </HStack>
            )}
        />
    )
}

import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import { Backdrop, BackdropSubheader, AppBar, HStack, Stack, IconButton, Text, ListItem, ListItemText } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigate } from "react-router-native";
import { View, Picker } from "react-native";
//#region 라이브러리

//#endregion

//#region 전역변수
let socket;
let web3;
let instance;
//#endregion

export default function MainPage() {

    const ENDPOINT = "http://10.101.196.169:8080";

    const navigate = useNavigate();
    // const location = useLocation();

    //#region useState 변수
    const [cards, setCardsLow] = useState([]);
    const [area, setArea] = useState("");
    const [username, setUsername] = useState("");
    const [buycards, setBuyCards] = useState([]);
    const [state, setState] = React.useState({
        left: false
    });

    const [revealed, setRevealed] = useState(false);

    const [ALL_BuyLogText, setBuyLogText] = useState([]);
    //#endregion

    //#region useEffect
    useEffect(() => {
        socket = io(ENDPOINT);
        // setUsername(location.state[0].name);
    }, [socket])

    useEffect(() => {
        if (area !== "") {
            socket.emit("Area_Data", { area });
            socket.on("Area_Data_Result", (Result) => {
                setCardsLow(Result);
                socket.off();
            })
        }
    }, [area])
    //#endregion 

    return (
        <Backdrop
            revealed={revealed}
            header={
                <AppBar
                    leading={props => (
                        <HStack>
                            <IconButton
                                icon={props => <Icon name="menu" {...props} />
                                }{...props}
                                onPress={() => setRevealed(prevState => !prevState)}
                            />
                            <IconButton
                                icon={props => <Icon name="email-outline" {...props} />
                                } {...props} />
                        </HStack>
                    )}
                    trailing={props => (
                        <HStack>
                            <Text color='white'>접속중인 사람 : {username}</Text>
                        </HStack>
                    )}
                />
            }
            backLayer={
                <View style={{ height: 110 }}>
                    <ListItem
                        title="UserMyPage"
                        onPress={() => { console.log("맞아요") }}
                        trailing={props => <Icon name="chevron-right" {...props} />}
                    />
                    <ListItem
                        title="LogOut"
                        trailing={props => <Icon name="chevron-right" {...props} />}
                    />
                </View>
            }
        >
            <Text variant="h4"> 부동산</Text>
            
        </Backdrop>
    )

}


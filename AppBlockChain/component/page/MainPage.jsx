import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import { useNavigate, useLocation } from "react-router-native";
import { BottomNavigation, Appbar, Text, Provider } from 'react-native-paper';
import { View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons';

//#region 라이브러리
import MessagePage from "./MessagePage"
import MyPage from "./MyPage"
import RegistrationPage from "./RegistrationPage"
//#endregion

//#region 전역변수
let socket;
let web3;
let instance;
//#endregion

export default function MainPage() {

    const ENDPOINT = "http://10.101.196.169:8080";

    const navigate = useNavigate();
    const location = useLocation();

    let name;

    //#region useState 변수
    const [cards, setCardsLow] = useState([]);
    const [area, setArea] = useState("");
    const [username, setUsername] = useState("");
    const [buycards, setBuyCards] = useState([]);
    const [state, setState] = React.useState({
        left: false
    });
    

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'mypage', title: 'MyPage', icon: 'account' },
        { key: 'message', title: 'Message', icon: 'message', color: '#607D8B' },
        { key: 'sell', title: 'Sell', icon: 'shopping-outline', color: '#3F51B5' },
        { key: 'buy', title: 'Buy', icon: 'shopping', color: '#795548' },
    ]);

    const [revealed, setRevealed] = useState(false);

    const [ALL_BuyLogText, setBuyLogText] = useState([]);
    //#endregion

    //#region useEffect
    useEffect(() => {
        socket = io(ENDPOINT);
        setUsername(location.state[0].name);
        name = location.state[0].name
        // async function load() {
        //     web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
        //     const networkId = await web3.eth.net.getId();
        //     const deployedNetwork = RealEstate.networks[networkId];
        //     instance = new web3.eth.Contract(RealEstate.abi, deployedNetwork.address);           
        //     instance.events.BuyLogText({}, { fromBlock: 0, toBlock: 'latest' }, (err, res) => {  //처음부터 끝까지 검색
        //         Arr_BuyLogText.push(`${res.returnValues.buyerName}님이 ${res.returnValues.sellerName}님의 ${res.returnValues.houseAddress}를 ${res.returnValues.housePrice}eth로 매입하셨습니다.`);
        //         setBuyLogText(Arr_BuyLogText);
        //     });
        //     setBuyCards(await instance.methods.readRealEstate().call());
        // }
        // load();
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
    const MyPageRoute = () => <MyPage location={location.state} />;
    const messageRoute = () => <MessagePage username={username} />;
    const SellRoute = () => <RegistrationPage/>;
    const BuyRoute = () => <Text>Buy</Text>

    const renderScene = BottomNavigation.SceneMap({
        mypage: MyPageRoute,
        message: messageRoute,
        sell: SellRoute,
        buy: BuyRoute
    });

    function AppbarColor() {
        if (index === 1) {
            return (
                <Appbar style={{ backgroundColor: '#607D8B' }}>
                    <Appbar.Content title={`CONNECT : ${username}`} />
                </Appbar>
            )
        }
        else if (index === 2) {
            return (
                <Appbar style={{ backgroundColor: '#3F51B5' }}>
                    <Appbar.Content title={`CONNECT : ${username}`} />
                </Appbar>
            )
        }
        else if (index === 3) {
            return (
                <Appbar style={{ backgroundColor: '#795548' }}>
                    <Appbar.Content title={`CONNECT : ${username}`} />
                </Appbar>
            )
        }
        else {
            return (
                <Appbar>
                    <Appbar.Content title={`CONNECT : ${username}`} />
                </Appbar>
            )
        }
    }
    return (
        <Provider>
            <AppbarColor />
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </Provider>
    )
}

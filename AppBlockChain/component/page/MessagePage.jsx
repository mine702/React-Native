//#region react
import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
//#endregion

import { Card, Surface, Avatar, TextInput, Button, Provider, List, Dialog } from 'react-native-paper';
import { useNavigate, useLocation } from "react-router-native";

import io from "socket.io-client";

import Chatting from "../ui/Chatting"

let socket;

const LeftContent = props => <Avatar.Icon {...props} icon="message" />

export default function MessagePage(props) {

    const { username } = props;

    const ENDPOINT = "http://10.101.196.169:8080";

    useEffect(() => {
        socket = io(ENDPOINT);
    }, [ENDPOINT]);

    const [roomnumbers, setRoomN] = useState([]);

    //#region 새로고침
    //#endregion

    useEffect(()=>{
        let name = username
        socket.emit("RoomNumber", { name });
        socket.on("RoomNuber_Result", (res) => {
            setRoomN(res.result);
        });
    },[username])    

    //#region 채팅방 검색
    async function RoomSearach(Roomnumber) {
        let value = Roomnumber
        socket.emit("Search_Room", { value });  // 채팅방 검색
        await socket.on('Search_Room_Result', (result) => {  //채팅방 검색결과
            if (result.result[0].Buyername === username) {
                socket.emit("GetOutRoom_Buyername", { value, username });
                socket.on('GetOutRoom_Buyername_Result', () => {
                    socket.emit("Search_Room", { value });
                    socket.on('Search_Room_Result', (result) => {
                        if (result.result[0].Sellername === null) {
                            socket.emit("GetOutRoom", { value });
                            socket.on('GetOutRoom_Result', (result) => {
                                Alert.alert(result);
                            });
                        }
                        else {
                            Alert.alert("삭제완료");
                        }
                    })
                })
            }
            else if (result.result[0].Sellername === username) {
                socket.emit("GetOutRoom_Sellername", { value, username });
                socket.on('GetOutRoom_Sellername_Result', () => {
                    socket.emit("Search_Room", { value });
                    socket.on('Search_Room_Result', (result) => {
                        if (result.result[0].Buyername === null) {
                            socket.emit("GetOutRoom", { value });
                            socket.on('GetOutRoom_Result', (result) => {
                                Alert.alert(result);
                            });
                        }
                        else {
                            Alert.alert("삭제완료");
                        }
                    })
                })
            }
        })
    }
    //#endregion

    return (
        <Provider>
            <ScrollView>
                <Card>
                    <Card.Title title="Message" left={LeftContent} />
                    <Card.Content>
                        {roomnumbers.map((Roomnumber) => (
                            <List.Item key={Roomnumber}
                                title={`${Roomnumber}`}
                                description="메세지 내용"
                                right={props =>
                                    <Surface >
                                        <Chatting value={Roomnumber} buyername={username}></Chatting>
                                        <Button
                                            onPress={() => {
                                                RoomSearach(Roomnumber)
                                            }}>OUT
                                        </Button>
                                    </Surface>
                                }
                            />
                        ))}
                    </Card.Content>
                </Card>
            </ScrollView>
        </Provider>
    );
};
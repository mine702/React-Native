import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import io from "socket.io-client";
import { Button, TextInput, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

import LogText from "./LogText"

let socket;

function Chatting(props) {

    const ENDPOINT = "http://10.101.196.169:8080";

    const { value, buyername } = props
    const [modalIsOpen, setIsOpen] = useState(false);
    const [chatlog, setChatlog] = useState([{}]);
    const [sendmsg, setSendMsg] = useState("");
    const [RoomNumber] = useState(value);

    let roomnumber = 0;

    // 함수가 실행될때 modal의 상태를 true로 바꿔준다.
    function openModal() {
        roomnumber = RoomNumber;
        socket.emit("Chatting_Join", { roomnumber });
        socket.on('Join_return', ({ roomnumber }) => {
            console.log("성공");
        })
        socket.emit("Load_Msg_Chat", { RoomNumber });
        socket.on('Return_Load_Msg_Chat', ({ result }) => {
            setChatlog(result);
            //setChatlog([...chatlog, { name: Oname, msg: sendmsg }]);
        })
        setIsOpen(true);
    }

    // 함수가 실행될때 modal의 상태를 false로 바꿔준다.
    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        socket = io(ENDPOINT);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ENDPOINT]);

    useEffect(() => {
        socket.on("Msg_return", ({ buyername, sendmsg }) => {
            console.log("신호");
            setChatlog([...chatlog, { name: buyername, msg: sendmsg }]);
        })
        if (chatlog.length !== 0 && chatlog.length !== 1) {
            socket.emit("Save_Msg", ({ chatlog, RoomNumber }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatlog]);

    function SendMessage() {
        socket.emit("Message_Send", { buyername, sendmsg, RoomNumber });
    }

    return (
        <View>
            <Button onPress={openModal}>CHAT</Button>
            <Portal>
                <Dialog visible={modalIsOpen} onDismiss={closeModal}>
                    <LogText log={chatlog}></LogText>
                    <Dialog.Content>
                        <TextInput
                            value={sendmsg}
                            onChangeText={text => setSendMsg(text)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={closeModal}>CLOSE</Button>
                        <Button onPress={SendMessage}>SEND</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default Chatting;
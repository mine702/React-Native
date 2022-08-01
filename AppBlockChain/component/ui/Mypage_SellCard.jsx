//#region react
import React, { useState, useEffect } from 'react';
import { Avatar, Button, Card, Title, Paragraph,Text, Provider } from 'react-native-paper';
import { useNavigate } from "react-router-native";
import io from "socket.io-client";
//#endregion

let socket;

function Mypage_SellCard(props) {

    const ENDPOINT = "http://localhost:8080";

    const navigate = useNavigate();

    const { cards, user } = props;

    //#region useEffect
    useEffect(() => {
        socket = io(ENDPOINT);
    }, [])
    //#endregion

    //#region 렌더링
    return (
        <Provider>
            {cards.map((card) => (
                <Card key={card._id}>
                    <Card.Cover source={{ uri: card.files }} style={{ margin: 10, height:150 }}  />
                    <Card.Content>
                        <Text>Location : {card.location}</Text>
                        <Text>Price : {card.price}</Text>
                        <Text>NFTID : {card.tokenId}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button>등록 취소</Button>
                    </Card.Actions>
                </Card>
            ))}
        </Provider>)
    //#endregion
}

export default Mypage_SellCard;

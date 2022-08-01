import React, { useEffect, useState } from "react";
import { Surface, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { FullWindowOverlay } from "react-native-screens";
import { StyleSheet } from 'react-native'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function RegistrationPage() {

    return (
        <Card style={{ height: '100%' }}>
            <Card.Title title="판매 등록" subtitle="Sales registration" />
            <Button mode="contained" style={{ margin: 30 }}>신규 판매 등록</Button>

            <Button mode="contained" style={{ margin: 30 }}>기존 판매 등록</Button>

            <Button mode="contained" style={{ margin: 30 }}>매물 정보 수정</Button>
        </Card>
    )
}


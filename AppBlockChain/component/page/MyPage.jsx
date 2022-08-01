import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native'
import Swiper from 'react-native-swiper'
import { useNavigate } from "react-router-native";

//#region component
import Mypage_SellCard from '../ui/Mypage_SellCard';
// import Mypage_BuyCard from '../ui/Mypage_BuyCard';
// import Mypage_TransactionCard from '../ui/Mypage_TransactionCard'
//#endregion

const LeftContent = props => <Avatar.Icon {...props} icon="account" />
let socket;

export default function MyPage(props) {

    const ENDPOINT = "http://10.101.196.169:8080";

    const location = props;

    let number = 0;
    let name = 0;

    const navigate = useNavigate();
    //#region useState 변수
    const [cards, setCardsLow] = useState([]);
    const [approvalCards, setApprovalCards] = useState([]);
    const [username] = useState(location.location[0].name);
    const [buycard] = useState();
    const [usernumber] = useState(location.location[0].number)
    const [state, setState] = React.useState({
        left: false
    });
    //#endregion

    //#region useEffect
    useEffect(() => {
        async function load() {
            socket = io(ENDPOINT);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            number = location.location[0].number;
            // eslint-disable-next-line react-hooks/exhaustive-deps
            name = location.location[0].name;
        }
        load();
    }, [location]);
    useEffect(() => {
        let isMounted = true;
        socket.emit("MyPageSell", { name, number });
        socket.on("MyPageSell_Result", (Result) => {
            if (isMounted) {
                setCardsLow(Result);
            }
        })
        socket.emit("MyPageApproval", { name });
        socket.on("MyPageApproval_Result", (Result) => {
            if (isMounted) {
                setApprovalCards(Result);
            }
        })        
        return () => {
            isMounted = false;
        };
    }, [name]);
    //#endregion

    return (
        <ScrollView>
            <Card>
                <Card.Title title="MyPage" left={LeftContent} />
                <Card.Content>
                    <Title>판매내역</Title>
                </Card.Content>
                <Swiper
                    showsButtons={true}
                    loop={false}
                    height={280}
                    showsPagination={false}
                >
                    <Mypage_SellCard cards={cards} user={location.location[0]}></Mypage_SellCard>
                </Swiper>

            </Card>
            <Card >
                <Card.Content>
                    <Title>구매내역</Title>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{ margin: 10 }} />
            </Card>
            <Card>
                <Card.Content>
                    <Title>거래 승인 요청</Title>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{ margin: 10 }} />
                <Card.Actions>
                    <Button>승인</Button>
                </Card.Actions>
            </Card>
        </ScrollView >
    )
}

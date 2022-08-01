//#region 상위 컴포넌트
import React from 'react';
//#endregion
import { ScrollView } from 'react-native'
import { Dialog, Text, Card, Provider } from 'react-native-paper';

//#region 채팅 로그 기록 함수
function LogText(props) {

    const { log } = props;
    return (
        <Dialog.Content>
            <ScrollView style={{ maxHeight: 200 }} >
                <Card style={{ flex: 1 }}>
                    {log.map((log, index) => (
                        <Text key={index}>{log.name} : {log.msg}</Text>
                    ))}
                </Card>
            </ScrollView>
        </Dialog.Content>
    )
}
//#endregion

export default LogText;
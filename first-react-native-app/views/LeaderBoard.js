import React from 'react'
import { State, LongPressGestureHandler } from 'react-native-gesture-handler';
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native'
import { useDispatch, useSelector} from 'react-redux'

export default function LeaderBoard() {
    const dispatch = useDispatch()
    const leaderBoard = useSelector(state => state.sudokuReducer.leaderBoard)
    const sortLeaderBoard = leaderBoard.sort((a, b) => {return parseFloat(b.time) - parseFloat(a.time);});
    const handleStateChange = ({nativeEvent}) => {
        if(nativeEvent.state === State.BEGAN) {
           console.log('masuk began')
        } else if (nativeEvent.state === State.ACTIVE) {
            console.log('masuk active')
        } else if (nativeEvent.state === State.END) {
            console.log('masuk end')
        }
    }
    return (
        <>
            <View style={styles.container}>
            <Text style={styles.title}>LeaderBoard</Text>
                {leaderBoard && leaderBoard.map((player, i) => <View  key={i} style={{flexDirection: 'row'}}>
                    <TextInput editable={false} style={styles.number}>{i + 1}.</TextInput>
                    <TextInput editable={false} style={styles.name}>{player.name} </TextInput>
                    <TextInput editable={false} style={styles.score}>{player.time}</TextInput>
                </View> )}
                <LongPressGestureHandler onHandlerStateChange={(event) => handleStateChange(event)}>
                    <Text style={{marginBottom: 30}}>Longpress me</Text>
                </LongPressGestureHandler>
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#F4E4CD'
    },
    title: {
        fontSize: 35,
        marginBottom: 30,
        fontFamily: 'BalooThambi2',
    },
    number: {
        // borderWidth: 1,
        height:40,
        width: 40,
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'BalooThambi2', 
    },
    name: {
        // borderWidth: 1,
        height:40,
        width: 130,
        fontSize: 20,
        textAlign: "left",
        fontFamily: 'BalooThambi2',
    },
    score: {
        // borderWidth: 1,
        height:40,
        width: 80,
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'BalooThambi2',    
    },
})
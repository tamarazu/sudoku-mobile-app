import React from 'react'
import { StyleSheet ,View, Text, TextInput, TouchableHighlight} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { setFinish } from '../store/actions/sudokuAction'
import { color } from 'react-native-reanimated'
// import { TouchableHighlight } from 'react-native-gesture-handler'

export default function Finish() {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const leaderBoard = useSelector(state => state.sudokuReducer.leaderBoard)
    // const sort = playersRecord.sort
    const backHome = (value) => {
        console.log('HOME')
        navigation.navigate("Home")
        dispatch(setFinish(false))
    }

    const seeLeaderBoard = (value) => {
        navigation.navigate("LeaderBoard")
        dispatch(setFinish(false))
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>AWESOME !</Text>
            <Text style={styles.subtitle}>Wow you can solve it perfectly? Cool!</Text>
            <Text style={styles.subtitle}>But wait, are you the masterpiece?</Text>
            <TouchableHighlight
            style={styles.buttonLeaderBoard}
            onPress={() => seeLeaderBoard()}
            >
                <Text style={styles.textButtonLeaderBoard}>Let me know!</Text>
            </TouchableHighlight>

            <Text style={styles.subtitle}> Or try to the next level?</Text>
            <TouchableHighlight
             style={styles.button}
             onPress={() => backHome()}
            >
                <Text style={styles.textButton}>Let's go!</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4C37F'
    },
    title: {
        fontSize: 51,
        marginTop: 30,
        marginBottom: 30,
        fontFamily: 'Handlee'
    },
    boxNumber: {
        width: 50,
        height: 50,
        borderWidth: 1,
    },
    name: {
        width: 100,
        height: 50,
        borderWidth: 1,
    },
    button: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 13,
        paddingBottom: 13,
        margin: 9,
        backgroundColor: '#626B62',
        borderRadius: 10,
    },
    buttonLeaderBoard: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 13,
        paddingBottom: 13,
        margin: 9,
        marginBottom: 60,
        backgroundColor: '#F4E4CD',
        borderRadius: 10,
    },
    textButton: {
        fontSize: 17,
        fontFamily: 'BalooThambi2',
        color: 'white'
    },
    textButtonLeaderBoard: {
        fontSize: 17,
        fontFamily: 'BalooThambi2',
        color: 'black'
    },
    subtitle:{
        fontSize: 20,
        marginBottom: 6,
        fontFamily: 'BalooThambi2'
    }
})
    
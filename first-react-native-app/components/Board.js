import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import CountDown from 'react-native-countdown-component'
import { View, TextInput, StyleSheet, ActivityIndicator, Text } from 'react-native'
import { fetchNewBoard, changeSudokuBoard, setTime } from '../store/actions/sudokuAction'

export default function Board(props) {
    const dispatch = useDispatch()
    const sudokuBoardStart = useSelector(state => state.sudokuReducer.sudokuStart)
    const finish = useSelector(state => state.sudokuReducer.finish)
    const loading = useSelector(state => state.sudokuReducer.loading)
    const error = useSelector(state => state.sudokuReducer.error)
    const level = props.level
    const time = useSelector(state => state.sudokuReducer.time)

    useEffect(() => {
        dispatch(fetchNewBoard(level))
    }, [])

    const watchSudokuBoard = (value, row, col) =>{
        value = Number(value)
        dispatch(changeSudokuBoard({value, row, col}))
    }

    if(loading) return <ActivityIndicator size="large" color="#0000ff" />

    return (
        <View>
            <CountDown
                until={60 * 30}
                size={20}
                digitStyle={{backgroundColor: '#FFF'}}
                digitTxtStyle={{color: '#1CC625'}}
                timeToShow={['M', 'S']}
                timeLabels={{m: 'MM', s: 'SS'}}
                // onFinish={() => {
                //     alert('Finished')
                // }}
                onChange={(event) => {
                    dispatch(setTime(event))
                }}
                style={styles.countdown}
            />
            {sudokuBoardStart.map((row, i) => 
            <View key={i} style={styles.row}>
                {row.map((col, j) => ( (col !== 0) ?
                    <TextInput editable={false} key={j} style={styles.box} value={`${col}`}/> : 
                    <TextInput keyboardType="numeric" onChangeText={(event) => watchSudokuBoard(event, i, j)} style={styles.box} key={j}/>
                )
                )}
            </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    box: {
        borderWidth: 1,
        width: 43,
        height: 37,
        borderColor: 'black',
        textAlign:"center",
        fontSize: 23,
        borderColor: '#626B62',
        fontFamily: 'Handlee'
    },
    countdown: {
        marginBottom: 40
    }
})
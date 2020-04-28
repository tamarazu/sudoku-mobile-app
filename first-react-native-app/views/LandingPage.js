import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, Button, Modal, TouchableHighlight, TouchableOpacity} from 'react-native'
import { useDispatch, useSelector} from 'react-redux'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { setPlayerName, setFinish } from '../store/actions/sudokuAction'
import { useNavigation } from '@react-navigation/native'
import LeaderBoard from './LeaderBoard'

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

function LandingPage() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const name = useSelector(state => state.sudokuReducer.player)
    const [modalVisible, setModalVisible] = useState(false);

    const playerName = (value) => {
        dispatch(setPlayerName(value))
    }

    const pickLevel = (value) => {
        if(name.length > 0 ) {
            navigation.navigate("GameBoard", { level: value})
        } else {
            setModalVisible(true)
        }
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Please input your name first</Text>

                    <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                    >
                    <Text style={styles.textStyle}>Ok</Text>
                    </TouchableHighlight>
                </View>
                </View>
            </Modal>

            <Text style={styles.title}>SUDOKU</Text>
            <Text style={styles.inputName}> Write your name </Text>
            <TextInput 
             placeholder="Input Your Name"
             style={styles.box}
             onChangeText={(event) => playerName(event)}
            />
            <Text style={styles.textLevel}> Choose your level! </Text>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => pickLevel('easy')} style={styles.levelButton}>
                    <Text style={styles.option}>Easy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pickLevel('medium')} style={styles.levelButton}>
                    <Text style={styles.option}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pickLevel('hard')} style={styles.levelButton}>
                    <Text style={styles.option}>Hard</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

// export default function SideBar(){
//     const error = useSelector(state => state.sudokuReducer.error)

//     if(error) return <Text>{error}</Text>
//     return(
//         <>
//             <Drawer.Navigator>
//                 <Drawer.Screen name="StartPage" component={LandingPage} />
//                 <Drawer.Screen name="LeaderBoard" component={LeaderBoard} />
//             </Drawer.Navigator>
//         </>
//     )
// }


export default function BottomBar(){
    const error = useSelector(state => state.sudokuReducer.error)

    if(error) return <Text>{error}</Text>
    return(
        <>
            <Tab.Navigator>
                <Tab.Screen name="StartPage" component={LandingPage} />
                <Tab.Screen name="LeaderBoard" component={LeaderBoard} />
            </Tab.Navigator>
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ECEBE4',
        // fontSize: 30
    },
    title: {
      fontSize: 70,
      marginTop: 180,
      marginBottom: 80,
      fontFamily: 'Indie-Flower'
    },
    inputName: {
        fontSize: 25,
        // marginTop: 200,
        marginBottom: 10,
        fontFamily: 'BalooThambi2',
        color: 'grey'
    },
    textLevel: {
        fontSize: 22,
        // marginTop: 200,
        marginBottom: 10,
        fontFamily: 'BalooThambi2',
        color: 'grey'
    },
    levelButton: {
        backgroundColor: '#ADA9AA',
        margin: 8,
        padding: 20,
        borderRadius: 10
    },
    option: {
        fontSize: 20,
        fontFamily: 'BalooThambi2Bold',
        opacity: 0.6
    },
    box: {
        borderWidth: 2,
        width: 200,
        marginBottom: 110,
        borderRadius: 6,
        textAlign: "center",
        fontFamily: 'BalooThambi2',
        fontSize: 16,
        borderColor: '#626B62'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
})
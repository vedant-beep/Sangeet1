import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, Alert } from 'react-native'
import React,{ useEffect } from 'react'
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from './store/store';
import {USERNAME} from './actions/UserActions';
// import SyncStorage from 'sync-storage';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
    useResponsiveWidth
} from "react-native-responsive-dimensions";


export default function Login({ navigation }: { navigation: any }): JSX.Element {
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    const [accessToken, setAccessToken] = React.useState('');
    
    const updateUserName = () => {
        store.dispatch({type: USERNAME, payload:userEmail});
      };
    

    const callApi = ()=>{
        let myBody = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: 'db424373ccc24f799d01c37db6f0bbc5',
            client_secret: 'a3298213809443f0b8b7ee7a9b4fde63'
        }).toString()
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: myBody
          };
      console.log(options);
      
          fetch('https://accounts.spotify.com/api/token', options)
            .then(response => response.json())
            // .then(response => console.log(response))
            // .then(response=>{navigation.navigate("Home",{name:userEmail}),storeUser(response.access_token)})
            
            // .then(response=> store.dispatch({type: USERNAME, payload:response} ))
            .then(response=>{navigation.navigate("Home",{accessToken:response.access_token,username:userEmail})})
            .catch(err => console.error(err));
            
    }

    useEffect(()=>{
       if(userEmail!=""){navigation.navigate("Home")}
      },[])
    return (

        <SafeAreaView style={styles.screen}>
            <View style={styles.main}>
                <Image style={styles.logo1} source={require("../img/sangeet-logo-2.png")} />
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(UserEmail) =>
                            setUserEmail(UserEmail)
                        }
                        placeholder='Enter User Name'
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(userPassword) =>
                            setUserPassword(userPassword)
                        }
                        placeholder='Enter Password'
                    /></View>
                <View>
                    <Button
                        buttonStyle={styles.btn}
                        title="Sign in"
                        onPress={() => {
                            if (userEmail == "aryan" && userPassword == "a") {
                                updateUserName();
                                callApi();
                                
                            }
                            else {
                                Alert.alert('Enter correct username and password')
                            }
                        }

                        }
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

    screen: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'black'
    },
    main: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },

    logo1: {
        alignSelf: 'center',
        // marginVertical: responsiveHeight(2),
        height: responsiveWidth(40),
        width: responsiveWidth(40)
    },

    input: {
        backgroundColor: 'white',
        // color: 'black',
        height: 40,
        width: '80%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        alignSelf: 'center',
        borderRadius: 30
    },
    btn: {
        marginVertical: responsiveHeight(2),
        width: '80%',
        alignSelf: 'center',
        backgroundColor: '#11C0D3',
        height: responsiveHeight(5),
        borderRadius: 30
    }

})
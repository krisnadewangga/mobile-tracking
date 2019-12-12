import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Image, BackHandler } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import API from '../src/API'

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentWillMount() {
    this.homeBackPressHandler = BackHandler.addEventListener('homeBackPress', () => {
      if (Actions.currentScene === 'SignIn') {
        BackHandler.exitApp();
        return true
      }
      return false
    })
  }

  componentWillUnmount() {
    this.homeBackPressHandler.remove()
  }
  
  goToMenu = () => {
    axios.post( API + '/auth/login', 
      {username: this.state.username, 
      password: this.state.password})
    .then(res => {
      // console.log(res, "GET")
      this.doSync(res)
      Actions.Menu()
    })
    .catch(res => {
      // console.log(res, "CATCH")
      Alert.alert("Alert !", "Invalid username or password")
    })
  }

  doSync = async (res) => {
    try {
      await AsyncStorage.setItem('token', res.data.access_token);
    } catch (error) {
      Alert.alert("Alert !", "Check")
    }
  }

  render() {
    return (
        <View style={styles.container}>

          <View style={styles.headerContainer}>
            {/* <Text style={styles.header}>YukTernak!</Text> */}
            <Image source={require('../logo/sign.png')} style={styles.gambar}/>
          </View>

          <View style={styles.bodyContainer}>
            <View style={styles.formSignIn}>

              <Text style={{color: '#000000', fontSize: 16}}>Silahkan masukkan</Text>
              <Text style={{color: '#000000', fontSize: 16}}><Text style={{fontWeight:'bold'}}>User</Text> dan <Text style={{fontWeight:'bold'}}>Password</Text> kamu</Text>

              <Input
                placeholder='Masukkan User'
                onChangeText={username => this.setState({ username })}
                errorMessage=''
                underlineColorAndroid='rgba(10,0,0,0)'
                onSubmitEditing={() => this.passwordInput.focus()}
                blurOnSubmit={false}
              />

              <Input
                ref={(input) => this.passwordInput = input}
                placeholder='Masukkan Password'
                onChangeText={password => this.setState({ password })}
                secureTextEntry={true}
                errorMessage=''
                returnKeyType='go'
                onSubmitEditing={this.goToMenu}
                blurOnSubmit={false}
                underlineColorAndroid='rgba(10,0,0,0.0)'
              />
            
            <Text style={styles.last}>Lupa User ID atau Password, hubungi Admin</Text>
            </View>
            
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={this.goToMenu} style={styles.navButton}>
                <Text style={styles.button}>Lanjut</Text>  
                <Icon name="angle-right" type="font-awesome" color={'#ffffff'} containerStyle={styles.myIcon} size={40}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  }
}

export default SignIn;

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width:'100%',
  },
  headerContainer: {
    flex: 3,
    backgroundColor: '#42A5F5',
  },
  gambar: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
    // resizeMode: 'cover'
  },
  header: {
    color: '#ffffff',
    fontSize: 30,
    paddingVertical: '40%',
    textAlign: 'center'
  },
  bodyContainer: {
    flex: 4,
  },
  formSignIn: {
    paddingVertical: '10%',
    paddingHorizontal: '5%',
    height: '80%'
  },
  buttonView: {
    position:'absolute',
    bottom:0,
    alignSelf:'flex-end', 
    width:'100%',
    height: 61,
    backgroundColor: '#048573',
  },
  button: {
    fontSize: 20,
    color: '#ffffff',
  },
  last: {
    position:'absolute',
    bottom:0,
    paddingLeft: 20,
    color: '#000000'
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20
  }
});

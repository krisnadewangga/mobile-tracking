import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { Input, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    // axios.post('http://10.10.18.18:9090/api/app/user').then(res => {
    //   this.setState({users: res.data})
    //   console.log(res)
    // })
  }

  goToMenu = () => {
    axios.post('http://101.255.125.227:83/api/auth/login', 
      {username: this.state.username, 
      password: this.state.password})
    .then(res => {
      console.log(res, "GET")
      this.doSync(res)
      Actions.MenuDrawer()
    })
    .catch(res => {
      console.log(res, "CATCH")
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

              <Text>Silahkan masukkan</Text>
              <Text><Text style={{fontWeight:'bold'}}>User</Text> dan <Text style={{fontWeight:'bold'}}>Password</Text> kamu</Text>

              <Input
                placeholder='Masukkan Username'
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
              <TouchableOpacity onPress={this.goToMenu}>
                <Text style={styles.button}>Lanjut</Text>
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
  },
  buttonView: {
    position:'absolute',
    bottom:0,
    alignSelf:'flex-end', 
    width:'100%',
    height: 61,
    backgroundColor: '#048573',
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 20,
    color: '#ffffff',
    paddingTop: 15,
    paddingLeft: 20,
  },
  last: {
    position:'absolute',
    bottom:0,
    paddingLeft: 20,
  },
});

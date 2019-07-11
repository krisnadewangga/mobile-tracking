import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
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
            <Text style={styles.header}>YukTernak!</Text>
          </View>

          <View style={styles.bodyContainer}>
            <View style={styles.formSignIn}>

              <TextInput
                style={styles.textInput}
                placeholder='Username'
                onChangeText={username => this.setState({ username })}
                errorMessage=''
                underlineColorAndroid='rgba(10,0,0,0)'
              />

              <TextInput
                style={styles.textInput}
                placeholder='Password'
                onChangeText={password => this.setState({ password })}
                secureTextEntry={true}
                errorMessage=''
                returnKeyType='go'
                // onSubmitEditing={this.getUserData}
                underlineColorAndroid='rgba(10,0,0,0.0)'
              />

              <Button 
                title="Continue"
                navigation={this.props.navigation}
                onPress={this.goToMenu}
                buttonStyle={{marginTop: 80}}
              />
            
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
    flex: 2,
    backgroundColor: '#42A5F5',
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
    paddingVertical: 85,
    paddingHorizontal: 48,
  },
  textInput: {
    color: '#42A5F5',
    borderRadius: 25,
    paddingLeft: 20,
    marginVertical: 10,
    borderColor: '#42A5F5',
    borderWidth: 1,
  }
});

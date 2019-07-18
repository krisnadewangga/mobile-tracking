import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { Input, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowAltCircleDown, faArrowAltCircleUp, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

class MenuDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  goToMasuk = () => {
    Actions.Scan({where: 'Masuk'})
  }
  goToKeluar = () => {
    Actions.Scan({where: 'Keluar'})
  }
  goToAksidental = () => {
    Actions.Scan({where: 'Aksidental'})
  }
  doLogout = () => {
    Actions.SignIn()
    AsyncStorage.removeItem('token')
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.user}>
            <View style={styles.bodyAvatar}>
              <Text style={styles.nameAvatar}>Hai <Text style={{fontWeight:'bold'}}>Fulan</Text>,</Text>
              <Text style={styles.nameAvatar}>Apa yang mau kamu lakukan?</Text>
            </View>
          </View>
          <View style={styles.menu}>
              <Button buttonStyle={styles.buttonText} title="Scan Hewan Masuk" titleStyle={{marginLeft: '10%'}} onPress={this.goToMasuk}/>
              <FontAwesomeIcon icon={ faArrowAltCircleDown } color={'#048573'} size={27} style={styles.icon1}  onPress={this.goToMasuk}/>
              <Button buttonStyle={styles.buttonText} title="Scan Hewan Keluar" titleStyle={{marginLeft: '10%'}} onPress={this.goToKeluar} />
              <FontAwesomeIcon icon={ faArrowAltCircleUp } color={'#048573'} size={27} style={styles.icon2} onPress={this.goToKeluar} />
              <Button buttonStyle={styles.buttonText} title="Scan Aksidental" onPress={this.goToAksidental} />
              <FontAwesomeIcon icon={ faExclamationCircle } color={'#048573'} size={27} style={styles.icon3} onPress={this.goToAksidental} />
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={this.doLogout}>
              <Text style={styles.button}>Keluar</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

export default MenuDrawer;

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF0F5',
    width:'100%',
  },
  user: {
    flex: 2,
    backgroundColor: '#EEF0F5',
    width:'100%',
  },
  menu: {
    flex: 5,
    backgroundColor: '#EEF0F5',
    width:'100%',
  },
  // avatar: {
  //   width: 70,
  //   height: 70,
  //   borderRadius: 63,
  //   borderColor: "white",
  //   marginBottom: 10,
  //   marginLeft: 40,
  //   position: 'absolute',
  //   marginTop:50
  // },
  bodyAvatar: {
    marginTop: 20,
    flex: 1,
    padding:30,
  },
  nameAvatar:{
    fontSize:20,
    color: "#000000",
    fontWeight: "400"
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
  buttonText: {
    borderRadius: 165,
    height: 59,
    width: 236,
    margin: 9,
    backgroundColor: '#EEF0F5',
  },
  icon1: {
    position: "absolute",
    marginTop: '6.5%',
    marginLeft: '6.5%'
  },
  icon2: {
    position: "absolute",
    marginTop: '26%',
    marginLeft: '6.5%'
  },
  icon3: {
    position: "absolute",
    marginTop: '45%',
    marginLeft: '6.5%'
  }
});

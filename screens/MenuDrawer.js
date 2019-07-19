import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { Input, Button, Icon} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

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
              
          <TouchableOpacity style={styles.iconButton} onPress={this.goToMasuk}>
                <Icon name="arrow-circle-down" type="font-awesome" color={'#048573'} containerStyle={styles.myIcon} size={62}/>
                <Text style={styles.titleButton}>Scan Hewan Masuk</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={this.goToKeluar}>
                <Icon name="arrow-circle-up" type="font-awesome" color={'#048573'} containerStyle={styles.myIcon} size={62}/>
                <Text style={styles.titleButton}>Scan Hewan Keluar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={this.goToAksidental}>
                <Icon name="exclamation-circle" type="font-awesome" color={'#048573'} containerStyle={styles.myIcon} size={62}/>
                <Text style={styles.titleButton}>Scan Aksidental</Text>
              </TouchableOpacity>

          </View>
          <View style={styles.buttonView}>
              <TouchableOpacity onPress={this.doLogout} style={styles.navButton}>
                <Text style={styles.button}>Keluar</Text>  
                <Icon name="sign-out" type="font-awesome" color={'#ffffff'} containerStyle={styles.myIcon} size={30}/>
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
    marginHorizontal: 20
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
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 165,
    borderWidth: 1,
    borderColor: '#048573',
    marginVertical: 6
  },
  myIcon: {
    marginHorizontal: 6,
    marginRight: 10,
  },
  titleButton: {
    fontSize: 17,
    fontWeight: '400',
    color: '#000000'
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingHorizontal: 20
  }
});

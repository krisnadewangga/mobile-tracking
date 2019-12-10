import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Image, Alert, TouchableOpacity, BackHandler  } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

class Menu extends Component {

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

  render() {
    return (
        <View style={styles.container}>

          <View style={styles.headerContainer}>
            <Image source={require('../logo/menu.png')} style={styles.gambar}/>
          </View>

          <View style={styles.bodyContainer}>
            <View style={styles.componentContainer}>
              <Text style={styles.componentText}>Apa yang kamu mau lakukan ?</Text>

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
          </View>
        </View>
    );
  }
}

export default Menu;

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width:'100%',
  },
  headerContainer: {
    flex: 3,
    backgroundColor: '#90CAF9',
  },
  gambar: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },
  bodyContainer: {
    flex: 4,
  },
  componentContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: '10%',
    paddingHorizontal: '5%',
  },
  componentText: {
    color: '#048573',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
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
    fontSize: 20,
    fontWeight: '400',
    color: '#000000'
  }
});

import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Image, Alert } from 'react-native';
import { Input, Button} from 'react-native-elements';
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

  componentDidMount() {
    console.log("HIYAAAA", this)
    this.doSimpan()
  }

  doSimpan = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      console.log(token)
    } catch (error) {
      console.log("Error")
    }
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
            <Text>GAMBAR</Text>
            <Image source={require('../logo/picture.png')} style={styles.gambar}/>
          </View>

          <View style={styles.bodyContainer}>
            <View style={styles.componentContainer1}>
              <Text>MASUK</Text>
              <View style={styles.bodyText}>
                <Text style={styles.nameText} onPress={this.goToMasuk}>MASUK</Text>
              </View>
            </View>
            <View style={styles.componentContainer2}>
              <Text>KELUAR</Text>
              <View style={styles.bodyText}>
                <Text style={styles.nameText} onPress={this.goToKeluar}>KELUAR</Text>
              </View>
            </View>
            <View style={styles.componentContainer3}>
              <Text>AKSIDENTAL</Text>
              <View style={styles.bodyText}>
                <Text style={styles.nameText} onPress={this.goToAksidental}>AKSIDENTAL</Text>
              </View>
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
    flex: 2,
    backgroundColor: '#90CAF9',
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
  componentContainer1: {
    flex: 2,
    backgroundColor: '#ffffff'
  },
  componentContainer2: {
    flex: 2,
    backgroundColor: '#E3F2FD'
  },
  componentContainer3: {
    flex: 2,
    backgroundColor: '#BBDEFB'
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
  },
  bodyText: {
    position: 'absolute',
    marginTop: 50,
    marginLeft: 150,
  },
  nameText: {
    fontSize: 25,
    color: "#42A5F5",
    fontWeight: "600"
  },
  gambar: {
    width: 200,
    height: 150,
    alignSelf: 'center',
  }
});

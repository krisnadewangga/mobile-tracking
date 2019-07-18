import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Image, Alert } from 'react-native';
import { Input, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowAltCircleDown, faArrowAltCircleUp, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

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

              <Button buttonStyle={styles.buttonText} title="Scan Hewan Masuk" titleStyle={{marginLeft: '10%'}} onPress={this.goToMasuk}/>
              <FontAwesomeIcon icon={ faArrowAltCircleDown } color={'#048573'} size={17} style={styles.icon1}  onPress={this.goToMasuk}/>
              <Button buttonStyle={styles.buttonText} title="Scan Hewan Keluar" titleStyle={{marginLeft: '10%'}} onPress={this.goToKeluar} />
              <FontAwesomeIcon icon={ faArrowAltCircleUp } color={'#048573'} size={17} style={styles.icon2} onPress={this.goToKeluar} />
              <Button buttonStyle={styles.buttonText} title="Scan Aksidental" onPress={this.goToAksidental} />
              <FontAwesomeIcon icon={ faExclamationCircle } color={'#048573'} size={17} style={styles.icon3} onPress={this.goToAksidental} />

            {/* <View style={styles.componentContainer1}>
              <Text>MASUK</Text>
              <View style={styles.bodyText}>
                <Text style={styles.nameText} onPress={this.goToMasuk}>MASUK</Text>
              </View>
              <Text>KELUAR</Text>
              <View style={styles.bodyText}>
                <Text style={styles.nameText} onPress={this.goToKeluar}>KELUAR</Text>
              </View>
              <Text>AKSIDENTAL</Text>
              <View style={styles.bodyText}>
                <Text style={styles.nameText} onPress={this.goToAksidental}>AKSIDENTAL</Text>
              </View>
            </View> */}
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
  buttonText: {
    borderRadius: 165,
    height: 59,
    width: 236,
    margin: 9,
  },
  icon1: {
    position: 'absolute',
    marginTop: '20%',
    marginLeft: '11%'
  },
  icon2: {
    position: "absolute",
    marginTop: '37%',
    marginLeft: '11%'
  },
  icon3: {
    position: "absolute",
    marginTop: '54%',
    marginLeft: '11%'
  }
});

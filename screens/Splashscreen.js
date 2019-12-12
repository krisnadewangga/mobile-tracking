import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Splashscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
      setTimeout(() => {
          Actions.SignIn()
      }, 2500)
  }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.top}>
                    <Image source={require('../logo/splash.png')} style={styles.gambar}/>
                </View>

                <View style={styles.bottom}>
                  <Text style={styles.header}>Monitoring App</Text>
                  <Text style={styles.body}>by Agro Digital Nusantara  <Image source={require('../logo/logo.png')} style={styles.logo}/></Text>
                </View>
            </View>
        )
    }
}

export default Splashscreen;

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  top: {
    flex: 5,
    backgroundColor: '#aaaaaa',
    width:'100%',
  },
  gambar: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
    // resizeMode: 'cover'
  },
  bottom: {
    flex: 4,
    backgroundColor: '#ffffff',
    width:'100%',
  },
  header: {
    fontSize: 30,
    paddingTop: '10%',
    textAlign: 'center'
  },
  body: {
    fontSize: 12,
    // paddingTop: '2%',
    textAlign: 'center'
  },
  logo: {
    width: 22,
    height: 25,
    // resizeMode: 'cover'
  },
});
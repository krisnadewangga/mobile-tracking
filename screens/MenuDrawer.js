import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Image } from 'react-native';
import { Input, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class MenuDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    console.log("HIYAAAA", this.props)
  }

  goToMasuk = () => {
    Actions.Scan({where: 'Masuk'})
  }
  goToKeluar = () => {
    Actions.Scan({where: 'Keluar'})
  }
  goToAksidental = () => {
    Actions.Aksidental()
  }
  doLogout = () => {
    Actions.popTo('SignIn')
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.user}>
            <Image source={{uri: 'http://101.255.125.227:82/uploads/profile/putra-petir1557904122.jpg'}} style={styles.avatar}/>
            <Text>USER</Text>
            <View style={styles.bodyAvatar}>
              <Text style={styles.nameAvatar}>John Doe</Text>
            </View>
          </View>
          <View style={styles.menu}>
            <Text>MENU</Text>
            <View style={styles.bodyMenu}>
              <Text style={styles.nameMenu} onPress={this.goToMasuk}>MASUK</Text>
            </View>
            <View style={styles.bodyMenu}>
              <Text style={styles.nameMenu} onPress={this.goToKeluar}>KELUAR</Text>
            </View>
            <View style={styles.bodyMenu}>
              <Text style={styles.nameMenu} onPress={this.goToAksidental}>AKSIDENTAL</Text>
            </View>
          </View>
          <View style={styles.logout}>
            <Text>LOGOUT</Text>
            <View style={styles.bodyLogout}>
              <Text style={styles.nameLogout} onPress={this.doLogout}>Log Out</Text>
            </View>
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
    backgroundColor: '#ffffff',
    width:'100%',
  },
  user: {
    flex: 2,
    backgroundColor: '#BBDEFB',
    width:'100%',
  },
  menu: {
    flex: 5,
    backgroundColor: '#42A5F5',
    width:'100%',
  },
  logout: {
    flex: 1,
    backgroundColor: '#ffffff',
    width:'100%',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 63,
    borderColor: "white",
    marginBottom: 10,
    marginLeft: 40,
    position: 'absolute',
    marginTop:50
  },
  bodyAvatar: {
    marginTop: 20,
    marginLeft: 50,
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  nameAvatar:{
    fontSize:20,
    color: "#ffffff",
    fontWeight: "600"
  },
  bodyMenu: {
    marginTop: 10,
    marginLeft: 20,
    padding: 10,
  },
  nameMenu:{
    fontSize:15,
    color: "#ffffff",
    fontWeight: "400"
  },
  bodyLogout: {
    marginLeft: 20,
    padding: 10,
  },
  nameLogout:{
    fontSize:15,
    color: "#42A5F5",
    fontWeight: "600"
  },
});

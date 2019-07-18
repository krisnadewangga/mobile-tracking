import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import { Input, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import RadioForm from 'react-native-simple-radio-button';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera, faCircle } from '@fortawesome/free-solid-svg-icons'

class Masuk extends Component {
    constructor(props) {
        super(props);
        this.state = {
          radio_props: [
            {label: 'Sakit', value: 'Sakit'},
            {label: 'Mati', value: 'Mati'},
            {label: 'Hilang', value: 'Hilang'},
            {label: 'Lain-lain', value: 'Lain-lain'},
          ],
          kondisi: 'Sakit',
          deskripsi: 'Ini deskripsi',
          sakit: true,
          mati: false,
          hilang: false,
          lain: false
        }
    }

    goToKamera = () => {
      Actions.Kamera()
    }

    doSimpan = async () => {
      try {
        let token = await AsyncStorage.getItem('token');
        const uri = this.props.image
        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        const formData = new FormData();
          formData.append('photo', {
            uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
          });
          formData.append('kode_kambing', this.props.data.data)
          formData.append('keterangan', this.state.kondisi)
          formData.append('deskripsi', this.state.deskripsi)
          // formData.append('user_id', 1)
          axios({ 
            method: 'POST', 
            url: 'http://101.255.125.227:83/api/AddAksidental', 
            headers: {Authorization: "Bearer " + token}, 
            data: formData
          })
          .then(res => {
            console.log(res, this.props, "GET")
            console.log(formData)
            Alert.alert("Success", "Data saved succesfully", [{text: 'OK', onPress: () => Actions.popTo('_Menu')}])
          })
          .catch(res => {
            console.log(res.response, this.props, formData, "CATCH")
            console.log(JSON.stringify(this.props.image))
            Alert.alert("Alert !", "Invalid data")
          })
      } 
      catch (error) {
        console.log("Error", error)
      }
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerText}>
                      {/* <TextInput style={styles.dateText} >{this.props.data.data}</TextInput> */}
                      <Text style={styles.dateText} >ID hewan kejadian <Text style={{fontWeight: 'bold'}}>aksidental :</Text></Text>
                      <Text style={styles.dateText}><Text style={{fontWeight: 'bold'}}>{this.props.data.data}</Text></Text>
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                  <View style={styles.bodyContent}>
                  <Text style={styles.bodyText} >Apa yang terjadi pada hewan ternak ini?</Text>
                    <View style={styles.contentWrap}>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={this.state.sakit ? styles.buttonPress : styles.button}
                        onPress={() => this.setState({sakit: true, mati: false, hilang: false, lain: false, kondisi: 'Sakit'})}>
                      <Text style={this.state.sakit ? styles.welcomePress : styles.welcome}>Sakit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={this.state.mati ? styles.buttonPress : styles.button}
                        onPress={() => this.setState({sakit: false, mati: true, hilang: false, lain: false, kondisi: 'Mati'})}>
                      <Text style={this.state.mati ? styles.welcomePress : styles.welcome}>Mati</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={this.state.hilang ? styles.buttonPress : styles.button}
                        onPress={() => this.setState({sakit: false, mati: false, hilang: true, lain: false, kondisi: 'Hilang'})}>
                      <Text style={this.state.hilang ? styles.welcomePress : styles.welcome}>Hilang</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={1}
                        style={this.state.lain ? styles.buttonPress : styles.button}
                        onPress={() => this.setState({sakit: false, mati: false, hilang: false, lain: true, kondisi: 'Lain-lain'})}>
                      <Text style={this.state.lain ? styles.welcomePress : styles.welcome}>Lain-lain</Text>
                      </TouchableOpacity>
                      </View>
                  </View>
                    
                  <View style={styles.commentContent}>
                    <Text style={{fontSize: 20, fontWeight: '400', color: '#000000'}}>Catatan</Text>
                    <Input style={styles.commentText} placeholder="Masukkan catatan kamu" onChangeText={deskripsi => this.setState({ deskripsi })} />
                  </View>
                  <View style={styles.picContent}>
                    <TouchableOpacity onPress={this.goToKamera}>
                      <FontAwesomeIcon icon={ faCircle } color={'#D8D8D8'} size={100} style={styles.imageHolder1} />
                      <FontAwesomeIcon icon={ faCamera } color={'#767676'} size={60} style={styles.imageHolder2} />
                      <Image source={{uri: this.props.image}} style={styles.gambar}/>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonView}>
                      <TouchableOpacity onPress={this.doSimpan}>
                        <Text style={styles.buttonSimpan}>Simpan</Text>
                      </TouchableOpacity>
                    </View>
              </View>
            </View>
        )
    }
}

export default Masuk;

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width:'100%',
  },
  headerContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerText: {
    marginHorizontal: 25,
    marginVertical: '7%',
  },
  dateText: {
    fontSize: 20,
    color: '#000000'
  },
  commentText: {
    fontSize: 12,
    // height: '100%',
  },
  bodyContainer: {
    flex: 5,
  },
  bodyContent: {
    backgroundColor: '#ffffff',
    marginHorizontal: 25,
  },
  commentContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginHorizontal: 25,
  },
  picContent: {
    flex: 2,
    borderColor: '#eeeeee',
    borderWidth: 5,
    borderRadius:20,
    marginHorizontal: 25,
    marginBottom: 100,
  },
  gambar: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  buttonContent: {
    flex: 1,
  },
  bodyText: {
    fontSize: 24,
    color: "#000000",
    paddingVertical: 12,
    
  },

  

  contentWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },  
  welcome: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
    color: "#000000"
  },
  welcomePress: {
      fontSize: 16,
      textAlign: "center",
      margin: 10,
      color: "#ffffff"
  },
  button: {
    borderColor: "#048573",
    borderWidth: 1,
    borderRadius: 20,
    width: 85,
  },
  buttonPress: {
    borderColor: "#048573",
    backgroundColor: "#048573",
    borderWidth: 1,
    borderRadius: 20,
    width: 85,
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
  buttonSimpan: {
    fontSize: 20,
    color: '#ffffff',
    paddingTop: 15,
    paddingLeft: 20,
  },
  imageHolder1: {
    position: 'absolute', 
    width: '100%',
    height: '100%',
    marginVertical: '7%',
    alignSelf: 'center',
  },
  imageHolder2: {
    position: 'absolute', 
    width: '100%',
    height: '100%',
    marginVertical: '9%',
    alignSelf: 'center',
  },
});
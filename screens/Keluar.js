import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import { Input, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera, faCircle } from '@fortawesome/free-solid-svg-icons'


class Masuk extends Component {
    constructor(props) {
        super(props);
        this.state = {
          berat: '52 kg'
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
          formData.append('berat', this.state.berat)
          // formData.append('user_id', 1)
          axios({ 
            method: 'POST', 
            url: 'http://101.255.125.227:83/api/AddKambingKeluar', 
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
                      <Text style={styles.dateText} >ID hewan <Text style={{fontWeight: 'bold'}}>keluar :</Text></Text>
                      <Text style={styles.dateText}><Text style={{fontWeight: 'bold'}}>{this.props.data.data}</Text></Text>

                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.bodyContent}>
                      <Text style={styles.bodyText} >Berapa berat hewan ternak yang akan keluar ini?</Text>
                      <View style={styles.radioWrap}>
                        <Text style={styles.bodyText} >Berat</Text>
                        <Text style={styles.bodyText} >{this.state.berat}</Text>
                      </View>
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
  bodyContainer: {
    flex: 5,
  },
  bodyContent: {
    backgroundColor: '#ffffff',
    marginHorizontal: 25,
  },
  picContent: {
    flex: 2,
    borderColor: '#eeeeee',
    borderWidth: 5,
    borderRadius:20,
    marginHorizontal: 25,
    marginBottom: 200,
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
    fontSize: 20,
    color: "#000000",
    paddingVertical: 12,
  },
  radioWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
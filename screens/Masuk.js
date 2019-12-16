import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { Input, Icon} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera, faCircle } from '@fortawesome/free-solid-svg-icons'

import API from '../src/API'

class Masuk extends Component {
    constructor(props) {
        super(props);
        this.state = {
          berat: 0,
          cukur: false,
          suntik: false,
          obat: false,
          statusCukur: 'No',
          statusSuntik: 'No',
          statusObat: 'No',
          showLoader:false
        }
    }

    componentWillUnmount(){
      this.props.scanner.reactivate()
    }
    
    showLoader = () => { 
      this.setState({ showLoader:true }); 
    }

    goToKamera = () => {
      Actions.Kamera()
    }

    checkBeratInput = () => {
      if(this.state.berat === 0 || this.state.berat === ""){
        Alert.alert("Alert !", "Berat tidak boleh kosong!", [{text: 'OK'}])
      }else{
        this.doSimpan();
      }
    }

    doSimpan = async () => {
      this.showLoader();
      try {
        let token = await AsyncStorage.getItem('token');
        const uri = this.props.image || ""
        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        const formData = new FormData();
        if(uri !== ""){
          formData.append('photo', {
            uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
          });
        } else {
          formData.append('photo', "")
        }
          formData.append('kode_kambing', this.props.data.data)
          formData.append('cukur', this.state.statusCukur)
          formData.append('suntik_vaksin', this.state.statusSuntik)
          formData.append('obat_cacing', this.state.statusObat)
          formData.append('berat', this.state.berat)
          formData.append('user_id', 1)
          axios({ 
            method: 'POST', 
            url: API + '/AddKambingMasuk', 
            headers: {Authorization: "Bearer " + token}, 
            data: formData
          })
          .then(res => {
            // console.log(res, this.props, "GET")
            // console.log(formData)
            if(res.data.status === 'success'){
              Alert.alert("Success", res.data.message, [{text: 'OK', onPress: () => {Actions.popTo('_Menu'); Actions.Scan({where: 'Masuk'})}}])
            } 
            else if (res.data.status === 'failed') {
              Alert.alert("Alert !", res.data.message, [{text: 'OK', onPress: () => {Actions.popTo('_Menu'); Actions.Scan({where: 'Masuk'})}}])
            }
          })
          .catch(res => {
            // console.log(res.response, formData, "CATCH")
            Alert.alert("Alert !", "Invalid data")
          })
      } 
      catch (error) {
        // console.log("Error", error)
        Alert.alert("Alert !", "Invalid data")
      }
    }

    onChangedBerat = (berat) =>{
    const filteredText = berat.replace(/\D/gm, '');

    if(filteredText !== berat) {
      // set state text to the current TextInput value, to trigger
      // TextInput update.
      this.setState({ berat: berat });

      // buys us some time until the above setState finish execution
      setTimeout(() => {

        this.setState((previousState) => {
          return {
            ...previousState,
            berat: previousState.berat.replace(/\D/gm, '')
          };
        });

      }, 0);
    } else {
      this.setState({ berat: filteredText });
    }
  }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerText}>
                      <Text style={styles.dateText} >ID hewan <Text style={{fontWeight: 'bold'}}>masuk :</Text></Text>
                      <Text style={styles.dateText} ><Text style={{fontWeight: 'bold'}}>{this.props.data.data}</Text></Text>
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    <View style={styles.bodyContent}>

                      <View style={styles.contentWrap}>
                        <Text style={styles.bodyText} >Cukur</Text>
                        <View style={styles.radioWrap}>
                        <TouchableOpacity
                          activeOpacity={1}
                          style={!this.state.cukur ? styles.buttonPress : styles.button}
                          onPress={() => this.setState({cukur: false, statusCukur: 'No'})}>
                        <Text style={this.state.cukur ? styles.welcomePress : styles.welcome}>Tidak</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={1}
                          style={this.state.cukur ? styles.buttonPress : styles.button}
                          onPress={() => this.setState({cukur: true, statusCukur: 'Yes'})}>
                          <Text style={!this.state.cukur ? styles.yesPress : styles.yes}>Ya</Text>
                        </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.contentWrap}>
                        <Text style={styles.bodyText} >Suntik / Vaksin</Text>
                        <View style={styles.radioWrap}>
                        <TouchableOpacity
                          activeOpacity={1}
                          style={!this.state.suntik ? styles.buttonPress : styles.button}
                          onPress={() => this.setState({suntik: false, statusSuntik: 'No'})}>
                        <Text style={this.state.suntik ? styles.welcomePress : styles.welcome}>Tidak</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={1}
                          style={this.state.suntik ? styles.buttonPress : styles.button}
                          onPress={() => this.setState({suntik: true, statusSuntik: 'Yes'})}>
                          <Text style={!this.state.suntik ? styles.yesPress : styles.yes}>Ya</Text>
                        </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.contentWrap}>
                        <Text style={styles.bodyText} >Obat Cacing</Text>
                        <View style={styles.radioWrap}>
                        <TouchableOpacity
                          activeOpacity={1}
                          style={!this.state.obat ? styles.buttonPress : styles.button}
                          onPress={() => this.setState({obat: false, statusObat: 'No'})}>
                        <Text style={this.state.obat ? styles.welcomePress : styles.welcome}>Tidak</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={1}
                          style={this.state.obat ? styles.buttonPress : styles.button}
                          onPress={() => this.setState({obat: true, statusObat: 'Yes'})}>
                          <Text style={!this.state.obat ? styles.yesPress : styles.yes}>Ya</Text>
                        </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.contentWrap}>
                        <Text style={styles.bodyText} >Berat (kg)</Text>
                        <Input keyboardType="numeric" containerStyle={styles.inputContainer} inputStyle={styles.inputText} inputContainerStyle={styles.bodyInputContainer} placeholder="0 kg" onChangeText={(berat)=> this.onChangedBerat(berat)} value={this.state.berat} />
                      </View>
                    </View>
                     
                    <View style={styles.picContent}>
                      <TouchableOpacity onPress={this.goToKamera}>
                        <FontAwesomeIcon icon={ faCircle } color={'#D8D8D8'} size={100} style={styles.imageHolder1} />
                        <FontAwesomeIcon icon={ faCamera } color={'#767676'} size={60} style={styles.imageHolder2} />
                        <Text style={styles.imageHolder3}>Foto Hewan Masuk</Text>
                        <Image source={{uri: this.props.image}} style={styles.gambar}/> 
                      </TouchableOpacity>
                    </View>
                    <View style={styles.buttonView}>
                      <TouchableOpacity onPress={this.checkBeratInput} style={styles.navButton}>
                        <Text style={styles.buttonSimpan}>Simpan</Text>
                        <Icon name="angle-right" type="font-awesome" color={'#ffffff'} containerStyle={styles.myIcon} size={40}/>
                      </TouchableOpacity>
                    </View>
                </View>
                {
                  this.state.showLoader && 
                  <View style={{ position: 'absolute', top:"50%",right: 0, left: 0 }}>
                      <ActivityIndicator size="large" color="#048573" />
                  </View>
                }
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
    marginTop: '15%',
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
    flex: 4,
    backgroundColor: '#ffffff',
    marginHorizontal: 25,
  },
  picContent: {
    flex: 3,
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
    borderRadius: 15,
    // aspectRatio: 1
  },
  buttonContent: {
    flex: 1
  },
  bodyText: {
    fontSize: 17,
    color: "#000000",
    paddingTop: 12,
  },
  inputText: {
    fontSize: 17,
    color: "#000000",
    paddingTop: 12,
    textAlign: "right",
  },
  inputContainer: {
    width: '80%',
  },
  bodyInputContainer: {
    borderBottomWidth: 0,
  },
  contentWrap: {
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioWrap: {
    flexDirection: 'row',
  },
  
  welcome: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
    color: "#ffffff"
  },
  welcomePress: {
      fontSize: 16,
      textAlign: "center",
      margin: 10,
      color: "#000000"
  },
  yes: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
    marginHorizontal: 23,
    color: "#ffffff"
  },
  yesPress: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
    marginHorizontal: 23,
    color: "#000000"
  },
  button: {
    borderColor: "#048573",
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 10
  },
  buttonPress: {
    borderColor: "#048573",
    backgroundColor: "#048573",
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 10
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
  },
  imageHolder1: {
    position: 'absolute', 
    marginVertical: '3%',
    alignSelf: 'center',
  },
  imageHolder2: {
    position: 'absolute', 
    marginVertical: '6%',
    alignSelf: 'center',
  },
  imageHolder3: {
    position: 'absolute', 
    marginVertical: '36%',
    alignSelf: 'center',
    fontSize: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20
  }
});
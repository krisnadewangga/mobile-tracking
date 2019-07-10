import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { Input, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import RadioForm from 'react-native-simple-radio-button';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

class Masuk extends Component {
    constructor(props) {
        super(props);
        this.state = {
          radio_props: [
            {label: 'Tidak', value: "No" },
            {label: 'Ya', value: "Yes" }
          ],
          cukur: 'Yes',
          suntik: 'Yes',
          obat: 'Yes',
          berat: '52 kg'
        }
    }

    goToKamera = () => {
      Actions.Kamera()
    }

    componentDidMount(){
      console.log(this.props)
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
          formData.append('cukur', this.state.cukur)
          formData.append('suntik_vaksin', this.state.suntik)
          formData.append('obat_cacing', this.state.obat)
          formData.append('berat', this.state.berat)
          formData.append('user_id', 1)
          axios({ 
            method: 'POST', 
            url: 'http://101.255.125.227:83/api/AddKambingMasuk', 
            headers: {Authorization: "Bearer " + token}, 
            data: 
              formData
            // kode_kambing: this.props.data.data, 
            // cukur: this.state.cukur,
            // suntik_vaksin: this.state.suntik,
            // obat_cacing: this.state.obat,
            // berat: this.state.berat,
            // photo: this.props.image.replace(/"([^"]+(?="))"/g, '$1'),
            // user_id: 1
            
          })
          .then(res => {
            console.log(res, this.props, "GET")
            console.log(formData)
            Alert.alert("Success", "Data saved succesfully", [{text: 'OK', onPress: () => Actions.popTo('Menu')}])
          })
          .catch(res => {
            console.log(res.response, this.props, formData, "CATCH")
            console.log(JSON.stringify(this.props.image))
            Alert.alert("Alert !", "Invalid data")
          })
      } 
      catch (error) {
        console.log("Error")
      }
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={{position: 'absolute'}}>Tanggal</Text>
                    <View style={styles.headerText}>
                      <TextInput style={styles.dateText} >{this.props.data.data}</TextInput>
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    <Text style={{position: 'absolute'}}>Body</Text>
                    <View style={styles.bodyContent}>

                      <View style={styles.radioWrap}>
                        <Text style={styles.bodyText} >Cukur</Text>
                        <RadioForm
                          labelStyle={{marginRight: 10,}}
                          labelColor={'#2196f3'}
                          selectedLabelColor={'#2196f3'}
                          formHorizontal={true}
                          buttonColor={'#2196f3'}
                          animation={true}
                          radio_props={this.state.radio_props}
                          initial={1}
                          onPress={(value) => {this.setState({cukur:value})}}
                        />
                      </View>

                      <View style={styles.radioWrap}>
                      <Text style={styles.bodyText} >Suntik</Text>
                      <RadioForm
                        labelStyle={{marginRight: 10,}}
                        labelColor={'#2196f3'}
                        selectedLabelColor={'#2196f3'}
                        formHorizontal={true}
                        buttonColor={'#2196f3'}
                        animation={true}
                        radio_props={this.state.radio_props}
                        initial={1}
                        onPress={(value) => {this.setState({suntik:value})}}
                      />
                      </View>

                      <View style={styles.radioWrap}>
                      <Text style={styles.bodyText} >Pemberian Obat</Text>
                      <RadioForm
                        labelStyle={{marginRight: 10,}}
                        labelColor={'#2196f3'}
                        selectedLabelColor={'#2196f3'}
                        formHorizontal={true}
                        buttonColor={'#2196f3'}
                        animation={true}
                        radio_props={this.state.radio_props}
                        initial={1}
                        onPress={(value) => {this.setState({obat:value})}}
                      />
                      </View>

                      <View style={styles.radioWrap}>
                        <Text style={styles.bodyText} >Berat</Text>
                        <Text style={styles.bodyText} >{this.state.berat}</Text>
                      </View>
                    </View>
                     
                    <View style={styles.picContent}>
                      <TouchableOpacity onPress={this.goToKamera}>
                        <Image source={{uri: this.props.image}} style={styles.gambar}/>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContent}>
                    <Button 
                      title="Simpan"
                      buttonStyle={{marginHorizontal: 25, borderRadius: 0}}
                      onPress={this.doSimpan}
                    />
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
    backgroundColor: '#90CAF9',
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
    color: '#42A5F5',
    borderColor: '#42A5F5',
    borderWidth: 0.5,
    textAlign: 'center',
    fontSize: 20
  },
  bodyContainer: {
    flex: 5,
  },
  bodyContent: {
    flex: 3,
    backgroundColor: '#BBDEFB',
    margin: 25,
  },
  picContent: {
    flex: 2,
    backgroundColor: '#ffffff',
    marginHorizontal: 25,
    marginBottom: 10,
  },
  gambar: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  buttonContent: {
    flex: 1
  },
  bodyText: {
    fontSize: 17,
    color: "#42A5F5",
    fontWeight: "600",
    marginRight: 10,
  },
  radioWrap: {
    margin: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
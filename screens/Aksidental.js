import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import { Input, Button} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';



class Masuk extends Component {
    constructor(props) {
        super(props);
        this.state = {
          radio_props: [
            {label: 'Sakit'},
            {label: 'Mati'},
            {label: 'Hilang'},
            {label: 'Lain-lain'},
          ],
          kondisi: 'Sakit',
        }
    }

    goToKamera = () => {
      Actions.Kamera()
    }

    doSimpan = () => {
      console.log(this.state)
      Alert.alert("Hiya", "Ayok kembali", [{text: 'OK', onPress: () => Actions.popTo('MenuDrawer')}])
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={{position: 'absolute'}}>Tanggal</Text>
                    <View style={styles.headerText}>
                      <TextInput style={styles.dateText} >2019.01.01.001</TextInput>
                    </View>
                </View>
                <View style={styles.bodyContainer}>
                    <Text style={{position: 'absolute'}}>Body</Text>

                    <View style={styles.bodyContent}>
                        <RadioForm
                          labelStyle={{marginRight: 10,}}
                          formHorizontal={true}
                          // buttonColor={'#2196f3'}
                          animation={true}
                          radio_props={this.state.radio_props}
                          initial={3}
                          onPress={(label) => {this.setState({kondisi:label})}}
                        />
                    </View>
                     
                    <View style={styles.commentContent}>
                      <TextInput style={styles.commentText} placeholder="Catatan" multiline={true} />
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
  commentText: {
    color: '#42A5F5',
    paddingLeft: 10,
    fontSize: 12,
    // height: '100%',
  },
  bodyContainer: {
    flex: 5,
  },
  bodyContent: {
    marginTop: '15%',
    margin: 25,
  },
  commentContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginHorizontal: 25,
    marginBottom: '5%',
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
    flex: 1,
  },
  bodyText: {
    fontSize: 17,
    color: "#42A5F5",
    fontWeight: "600",
    marginRight: 10,
    
  },
  radioWrap: {
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
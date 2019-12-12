import React, { Component } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import { View, Dimensions, Alert } from "react-native";
import { Actions } from 'react-native-router-flux';
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import API from '../src/API'

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

console.disableYellowBox = true;

class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    // componentWillMount(){
    //   this.scanner.reactivate()
    // }

    componentDidMount(){
      this.scanner.reactivate()
    }

    componentWillUnmount(){
      this.scanner.reactivate()
    }
    // onScanned = (e) => {
    //   console.log(e)
    //     Linking
    //         .openURL(e)
    //         .catch(err => console.error('An error occured', err));
    //     }
    onScanned = async (e) => {
      let token = await AsyncStorage.getItem('token');
      if(this.props.where === 'Masuk'){
        axios({ 
          method: 'GET', 
          url: API + '/CekScanMasuk', 
          headers: {Authorization: "Bearer " + token}, 
          params: {
            kode_kambing: e.data
          }
        })
        .then(res => {
          console.log(res, e)
          if(res.data.status === 'undefined'){
            Alert.alert("Alert !", res.data.message, [{text: 'OK', onPress: () => this.scanner.reactivate()}])
          } 
          else if (res.data.status === 'scanned') {
            Alert.alert("Alert !", res.data.message, [{text: 'OK', onPress: () => this.scanner.reactivate()}])
          }
          else if (res.data.status === 'unscan') {
            axios({ 
              method: 'GET', 
              url: API + '/GetKambing', 
              headers: {Authorization: "Bearer " + token}, 
              params: {
                kode_kambing: e.data
              }
            })
            .then(res => {
              Actions.Masuk({data: e, dataKambing: res.data[0], scanner: this.scanner})
            })
          }
          else{
            Alert.alert("Alert !", "Hubungi Admin", [{text: 'OK', onPress: () => this.scanner.reactivate()}])
          }
        })
        .catch(res => {
          Alert.alert("Alert !", "Invalid data")
        })
      } else if (this.props.where === 'Keluar'){
        axios({ 
          method: 'GET', 
          url: API + '/CekScanKeluar', 
          headers: {Authorization: "Bearer " + token}, 
          params: {
            kode_kambing: e.data
          }
        })
        .then(res => {
          if(res.data.status === 'undefined'){
            Alert.alert("Alert !", res.data.message, [{text: 'OK', onPress: () => this.scanner.reactivate()}])
          } 
          else if (res.data.status === 'belum_masuk') {
            Alert.alert("Alert !", res.data.message, [{text: 'OK', onPress: () => this.scanner.reactivate()}])
          }
          else if (res.data.status === 'scanned') {
            Alert.alert("Alert !", res.data.message, [{text: 'OK', onPress: () => this.scanner.reactivate()}])
          }
          else if (res.data.status === 'unscan') {
            axios({ 
              method: 'GET', 
              url: API + '/GetKambing', 
              headers: {Authorization: "Bearer " + token}, 
              params: {
                kode_kambing: e.data
              }
            })
            .then(res => {
              Actions.Keluar({data: e, dataKambing: res.data[0], scanner: this.scanner})
            })
          }
          else{
            Alert.alert("Alert !", "Hubungi Admin", [{text: 'OK', onPress: () => this.scanner.reactivate()}])
          }
        })
        .catch(res => {
          Alert.alert("Alert !", "Invalid data")
        })
      } else if (this.props.where === 'Aksidental'){
        axios({ 
          method: 'GET', 
          url: API + '/CekScanAksidental', 
          headers: {Authorization: "Bearer " + token}, 
          params: {
            kode_kambing: e.data
          }
        })
        .then(res => {
          if(res.data.status === 'undefined'){
            Alert.alert("Alert !", res.data.message, [{text: 'OK', onPress: () => this.scanner.reactivate()}])
          } 
          else if (res.data.status === 'belum_masuk') {
            Alert.alert("Alert !", res.data.message, [{text: 'OK', onPress: () => this.scanner.reactivate()}])
          }
          else if (res.data.status === 'scanned') {
            Alert.alert("Alert !", res.data.message, [{text: 'OK', onPress: () => this.scanner.reactivate()}])
          }
          else if (res.data.status === 'unscan') {
            axios({ 
              method: 'GET', 
              url: API + '/GetKambing', 
              headers: {Authorization: "Bearer " + token}, 
              params: {
                kode_kambing: e.data
              }
            })
            .then(res => {
              Actions.Aksidental({data: e, dataKambing: res.data[0], scanner: this.scanner})
            })
          }
          else{
            Alert.alert("Alert !", "Hubungi Admin", [{text: 'OK', onPress: () => this.scanner.reactivate()}])
          }
        })
        .catch(res => {
          Alert.alert("Alert !", "Invalid data")
        })
      }
    }

    makeSlideOutTranslation(translationType, fromValue) {
      return {
        from: {
          [translationType]: SCREEN_WIDTH * -0.125
        },
        to: {
          [translationType]: fromValue
        }
      };
    }

    render() {
     return(
        <View style={{backgroundColor: 'black'}}>
            <QRCodeScanner
              ref={(node) => { this.scanner = node }}
              onRead={this.onScanned}
              showMarker
              cameraStyle={{ height: SCREEN_HEIGHT }}
              customMarker={
                <View style={styles.rectangleContainer}>
                  <View style={styles.topOverlay}>
                  </View>
    
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.leftAndRightOverlay} />
    
                    <View style={styles.rectangle}>
                      <Icon
                        name="ios-qr-scanner"
                        size={SCREEN_WIDTH * 1}
                        color={iconScanColor}
                      />
                      <Animatable.View
                        style={styles.scanBar}
                        direction="alternate-reverse"
                        iterationCount="infinite"
                        duration={1700}
                        easing="linear"
                        animation={this.makeSlideOutTranslation(
                          "translateY",
                          SCREEN_WIDTH * -0.875
                        )}
                      />
                    </View>
    
                    <View style={styles.leftAndRightOverlay} />
                  </View>
    
                  <View style={styles.bottomOverlay} />
                  </View>
              }
            />
        </View>
     )
    }
}
export default Scan;

const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency
const rectDimensions = SCREEN_WIDTH * 0.75; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.0025; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "#20bdb6";
const scanBarWidth = SCREEN_WIDTH * 0.75; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#ffde00";
const iconScanColor = "transparent";

const styles = {
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.5
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.75,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  }
};
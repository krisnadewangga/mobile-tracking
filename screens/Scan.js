import React, { Component } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import { Text, View, Dimensions, Linking, StyleSheet, TouchableOpacity } from "react-native";
import { Actions } from 'react-native-router-flux';
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
// import FilesystemStorage from 'redux-persist-filesystem-storage'

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
    onScanned = (e) => {
      // console.log(e)
      if(this.props.where === 'Masuk'){
        Actions.Masuk({data: e, scanner: this.scanner})
      } else if (this.props.where === 'Keluar'){
        Actions.Keluar({data: e, scanner: this.scanner})
      } else if (this.props.where === 'Aksidental'){
        Actions.Aksidental({data: e, scanner: this.scanner})
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
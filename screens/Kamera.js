import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

class Kamera extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isCameraVisiable: false,
        showLoader:false
      }
    }

    showLoader = () => { 
      this.setState({ showLoader:true }); 
    }
  
    showCameraView = () => {
      this.setState({ isCameraVisible: true });
    }
    render() {
      return (
        <View style={styles.container}>
          <RNCamera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            captureAudio={false}
            >
            <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
          </RNCamera>
          {
            this.state.showLoader && 
            <View style={{ position: 'absolute', top:"50%",right: 0, left: 0 }}>
                <ActivityIndicator size="large" color="#048573" />
            </View>
          }
        </View>
      );
    }
  
    takePicture = async() => {
      this.showLoader();
      if (this.camera) {
        const options = { quality: 0.1, base64: true, forceUpOrientation: true, fixOrientation: true };
        const data = await this.camera.takePictureAsync(options);
        Actions.pop({ refresh: { image: data.uri } })
      }
    };
  }

export default Kamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
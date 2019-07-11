import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

class Kamera extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isCameraVisiable: false
      }
    }
  
    showCameraView = () => {
      this.setState({ isCameraVisible: true });
    }
    render() {
      // const { isCameraVisible } = this.state;
      return (
        <View style={styles.container}>
          <RNCamera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            captureAudio={false}
            // aspect={RNCamera.constants.Aspect.fill}
            >
            <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
          </RNCamera>
        </View>
      );
    }
  
    takePicture = async() => {
      if (this.camera) {
        const options = { quality: 0.1, base64: true };
        const data = await this.camera.takePictureAsync(options);
        console.log(data.uri);
        Actions.pop({ refresh: { image: data.uri, imageDetail: data } })
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
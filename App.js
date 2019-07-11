import React, { Component } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { ThemeProvider, Icon } from 'react-native-elements';

import Routes from './src/Routes.js'

const theme = {
  colors: {
    primary: 'black',
    secondary: 'black'
  },
  Button: {
    raised: false,
    titleStyle: {
      color: '#ffffff',
      fontSize: 14,
      textShadowColor: 'rgba(204, 128, 41, 1)',
      textShadowOffset: {width: 0.5, height: 1},
      textShadowRadius: 1
    },
    buttonStyle: {
      height: 50, 
      borderRadius:25, 
      margin: 8,
      backgroundColor: '#42A5F5',
      paddingHorizontal: 20,
    },
  },
  Input: {
    placeholderTextColor: '#42A5F5',
    labelStyle: { color: '#ffffff' },
    inputStyle: { color: '#42A5F5' },
    inputContainerStyle: { borderColor: '#42A5F5', marginTop: 24 },
    errorStyle: { color: '#ffde00', margin: 0 },
    errorMessage: ''
  }
};

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StatusBar hidden />
        <Routes />
      </ThemeProvider>
    )
  }
}
export default App;


// ======
// STYLE
// ======
const styles = StyleSheet.create({
  
});

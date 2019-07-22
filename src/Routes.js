import React from 'react'
import { Router, Scene, Drawer } from 'react-native-router-flux'
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import SignIn from '../screens/SignIn.js'
import Menu from '../screens/Menu.js'
import Scan from '../screens/Scan.js'
import Masuk from '../screens/Masuk.js'
import Keluar from '../screens/Keluar.js'
import Aksidental from '../screens/Aksidental.js'
import Kamera from '../screens/Kamera.js'
import MenuDrawer from '../screens/MenuDrawer.js'
import Splashscreen from '../screens/Splashscreen.js';

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key="Splashscreen" component={Splashscreen} hideNavBar={true} initial />
         <Scene key="SignIn" component={SignIn} hideNavBar={true} type="replace" />
         <Drawer key="MenuDrawer" contentComponent={MenuDrawer} hideNavBar={true} type="replace" drawerImage={require('../logo/drawer.png')} >
            <Scene key="Menu" component={Menu} navTransparent={true} />
         </Drawer>
         <Scene key="Scan" component={Scan} hideNavBar={true}/>
         <Scene key="Masuk" component={Masuk} navTransparent={true}  />
         <Scene key="Keluar" component={Keluar} navTransparent={true} />
         <Scene key="Aksidental" component={Aksidental} navTransparent={true}  />
         <Scene key="Kamera" component={Kamera} hideNavBar={true}/>
      </Scene>
   </Router>
)
export default Routes

const styles = StyleSheet.create({
    navigationBarTitleStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
      borderBottomWidth: 0,
      elevation: 0,
 }
});
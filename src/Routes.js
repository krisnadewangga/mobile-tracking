import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { StyleSheet } from 'react-native';

import SignIn from '../screens/SignIn.js'
import Menu from '../screens/Menu.js'
import Scan from '../screens/Scan.js'
import Masuk from '../screens/Masuk.js'
import Keluar from '../screens/Keluar.js'
import Aksidental from '../screens/Aksidental.js'
import Kamera from '../screens/Kamera.js'
import MenuDrawer from '../screens/MenuDrawer.js'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key="SignIn" component={SignIn} hideNavBar={true} initial={true} type="replace" />
         <Scene key="MenuDrawer" drawer={true} contentComponent={MenuDrawer} hideNavBar={true} type="replace" >
            <Scene key="Menu" component={Menu} title="Monitoring" navigationBarStyle={styles.navigationBarTitleStyle} navBarButtonColor='white' initial={true} />
         </Scene>
         <Scene key="Scan" component={Scan} hideNavBar={true}/>
         <Scene key="Masuk" component={Masuk} hideNavBar={false} title="Masuk" navigationBarStyle={styles.navigationBarTitleStyle} navBarButtonColor='white' />
         <Scene key="Keluar" component={Keluar} hideNavBar={false} title="Keluar" navigationBarStyle={styles.navigationBarTitleStyle} navBarButtonColor='white' />
         <Scene key="Aksidental" component={Aksidental} hideNavBar={false} title="Aksidental" navigationBarStyle={styles.navigationBarTitleStyle} navBarButtonColor='white' />
         <Scene key="Kamera" component={Kamera} hideNavBar={true}/>
      </Scene>
   </Router>
)
export default Routes

const styles = StyleSheet.create({
    navigationBarTitleStyle: {
     backgroundColor: '#42A5F5'
 }
});
import * as React from 'react';
import { StyleSheet, Dimensions,View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import SignIn from '../Screens/SignIn'
import SignUp from '../Screens/SignUp'

const deviceWidth = Dimensions.get('window').width;
export const SignInRoute = () => (
    <SignIn/>
)

export const SignUpRoute = () => (
    
    <SignUp/>
    
)
class MainTabView extends React.Component {
  static navigationOptions = {
    header : null
}
  state = {
    index: 0,
    routes: [
      { key: 'signin', title: 'SignIn' },
      { key: 'signup', title: 'SignUp' },
    ],
  };

  render(){
    return (
        <View style={{flex:1}}>
          <TabView
          renderTabBar={props =>
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: '#326E93',height:5}}
                labelStyle={{color:'#2D2D2D'}}
                style={{ backgroundColor: 'white' }}
              />}
          navigationState={this.state}
          renderScene={SceneMap({
              signin: SignInRoute,
              signup: SignUpRoute,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          />
        </View>
    )
}
}

export default MainTabView

const styles = StyleSheet.create({
scene: {
  flex: 1,
},
HeaderTextWelcome:{
  
}
})
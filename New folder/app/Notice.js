import React from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  Dimensions,
  View,
  TextInput,
  Picker,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button, Divider,   ThemeProvider} from 'react-native-elements';
import Navbar from './components/navbar';
import Header from './components/Header';
import Logo from './components/logo';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import {connect} from 'react-redux';
import Axios from 'axios';
import {colors, globalStyles, settings} from './configs/index';
import {apis} from './configs/index';
import {ActionCreators} from './redux/ActionCreators';
import {ActionCart} from './redux/ActionCart';
import Icon from 'react-native-vector-icons/Ionicons'

const mapStateToProps = state => ({
  user_login: state.user_login,
  cart: state.cart,
});
class Notice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		  user_info: this.props.user_login,
		  items: [],
		  
    };

    
  }
  
  
  render() {
   
    return (
      
		<View style={styles.wrapper}>
          

          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7', height: height - 70}}>
			<Header navigation={this.props.navigation} />
			<View style={{paddingTop: 10, paddingBottom: 10}}>
			
				<Text style={{width: width, textAlign:'center', fontWeight:'bold'}}>
				﻿공지사항
				</Text>
			</View>
			<View>
			  <TouchableOpacity style={[{width: width,backgroundColor:'#fff', borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#ddd', paddingTop:10, paddingBottom: 5}]} onPress={() => {this.setState({notice_1: !this.state.notice_1})}}>
					
					  <Text style={{color: '#000',marginTop: 5,width: width - 15, paddingBottom: 10, paddingLeft: 10}}>
						  [Notice] Service will be stop {'\n'}July 01, 2020 
						  
                    </Text>
					<Icon style={{top:23, position: 'absolute', right: 15}} name={'md-arrow-dropdown'} size={20} color='#000'/>
				 </TouchableOpacity>
				 <View style={{width:width, height: this.state.notice_1 ? null : 0, overflow: 'hidden', }}>
					   <Text style={{color: '#000', marginLeft: 13, marginTop: 5, paddingTop:10, paddingBottom: 15}}>
						  For PM job, the service will be stop during the below time. Sorry to make you inconvenience.{'\n'}{'\n'}Date: 2020-07-01{'\n'}Time: 00:00 ~ 09:00 AM{'\n'}{'\n'}Thank you.
                                        
                    </Text>
                    </View>
			 </View>
			 <View>
			  <TouchableOpacity style={[{width: width,backgroundColor:'#fff', borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#ddd', paddingTop:10, paddingBottom: 5}]} onPress={() => {this.setState({notice_2: !this.state.notice_2})}}>
					
					  <Text style={{color: '#000',marginTop: 5,width: width - 15, paddingBottom: 10, paddingLeft: 10}}>
						  [Notice] Service will be stop {'\n'}July 01, 2020 
						  
                    </Text>
					<Icon style={{top:23, position: 'absolute', right: 15}} name={'md-arrow-dropdown'} size={20} color='#000'/>
				 </TouchableOpacity>
				 <View style={{width:width, height: this.state.notice_2 ? null : 0, overflow: 'hidden', }}>
					   <Text style={{color: '#000', marginLeft: 13, marginTop: 5, paddingTop:10, paddingBottom: 15}}>
						  For PM job, the service will be stop during the below time. Sorry to make you inconvenience.{'\n'}{'\n'}Date: 2020-07-01{'\n'}Time: 00:00 ~ 09:00 AM{'\n'}{'\n'}Thank you.
                                        
                    </Text>
                    </View>
			 </View>
			</ScrollView>
			</View>
        <Navbar navigation={this.props.navigation} flashSaleItem={this.state.flashSaleItem} end={this.state.end}/>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
	itemcenter: {
		
	},
	wrapper:{
		width: width,
		flex: 1
	},
	
});
export default connect(mapStateToProps)(Notice);

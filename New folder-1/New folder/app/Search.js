import React from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  Dimensions,
  View,
  TextInput,
  Share,
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
class Anser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		  user_info: this.props.user_login,
		  items: [],
		  search: 'Dootastyle',
		  
    };
	
    
  }
  
  _shareFacebook() {
	  Share.share(
      {
        title: "a title",
        message: "some message",
        // or
        url: 'https://www.facebook.com/login.php?skip_api_login=1&api_key=266607404648865&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Ffeed%3Fapp_id%3D266607404648865%26channel_url%3Dhttps%253A%252F%252Fstaticxx.facebook.com%252Fx%252Fconnect%252Fxd_arbiter%252F%253Fversion%253D46%2523cb%253Df2735fcb8a3711c%2526domain%253Dm.damda.com%2526origin%253Dhttps%25253A%25252F%25252Fm.damda.com%25252Ff171c8af1c0b7fc%2526relation%253Dopener%26e2e%3D%257B%257D%26fallback_redirect_uri%3Dhttps%253A%252F%252Fm.damda.com%252Fshop%252Fsearch%26link%3Dhttps%253A%252F%252Fm.damda.com%252Fshop%252Fseller_1%26locale%3Den_US%26next%3Dhttps%253A%252F%252Fstaticxx.facebook.com%252Fx%252Fconnect%252Fxd_arbiter%252F%253Fversion%253D46%2523cb%253Df13121eda52bf64%2526domain%253Dm.damda.com%2526origin%253Dhttps%25253A%25252F%25252Fm.damda.com%25252Ff171c8af1c0b7fc%2526relation%253Dopener%2526frame%253Df2876475a015294%2526result%253D%252522xxRESULTTOKENxx%252522%26sdk%3Djoey%26version%3Dv7.0&cancel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df13121eda52bf64%26domain%3Dm.damda.com%26origin%3Dhttps%253A%252F%252Fm.damda.com%252Ff171c8af1c0b7fc%26relation%3Dopener%26frame%3Df2876475a015294%26result%3D%257B%2522error_code%2522%253A4201%252C%2522error_message%2522%253A%2522User%2Bcanceled%2Bthe%2BDialog%2Bflow%2522%257D%26error_code%3D4201%26error_message%3DUser%2Bcanceled%2Bthe%2BDialog%2Bflow%26e2e%3D%257B%257D&display=popup&locale=en_GB'
      },
      
    );
  }
  _showTab(id) {
		let data = this.state.items;
		data[id][2] = !data[id][2]
		this.setState({ items: data})

	}
  render() {
   const { search } = this.state
    return (
      
		<View style={styles.wrapper}>
          

          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7',  height: height - 70}}>
		
			<View style={{paddingTop: 10, paddingBottom: 10}}>
			<TouchableOpacity style={[styles.header_left, { marginTop: 25, zIndex: 10,position: 'absolute', top: -2}]} onPress={() => this.props.navigation.pop()}>
		                      <Image
		                          source={require('./images/back_arrow.png')}
		                      />
		                  </TouchableOpacity>
				<Text style={{width: width, textAlign:'center', fontWeight:'bold'}}>
				﻿
				</Text>
			</View>
			<View>
			<View style={styles.search}>
                              
							  <TextInput style = {[styles.sinput, {borderColor: '#ddd', borderWidth: 1, width: width - 35, marginTop: -30, marginLeft: 25}]}
                     placeholder = "피플 닉네임 입력"
                     placeholderTextColor = "#8D8D8D"
					 onChangeText={(search) => this.setState({ search })}
					 value={this.state.search}
                     autoCapitalize = "none"
                  />
							  
                        </View>	
					<TouchableOpacity style={[styles.search_icon, {width:30,height:30, zIndex: 1000,top: -38, right: -(width - 35)}]}  onPress={() => {
							this.setState({
										items: [],
										
								
									})	
									
								 apis.getSearch(this.state.search).then(res => {
									
									
									this.setState({
										items: res.data.data.items,
										
									}) 
									
									
								})
							 
						  }}>
                    <Image  
                style={{}}
                        source={require('./images/ic_search.png')}
                      />
                  </TouchableOpacity>	
			</View>
			{
					this.state.items.map((val, index_) => {
						let name
										let img
										let des
										let json = JSON.parse(val.account_info).id;
										for(let i = 0; i < val.vendor_config.length; i++){
											if(val.vendor_config[i].path == 'general/store_information/name'){name = val.vendor_config[i].value; }
											if(val.vendor_config[i].path == 'general/store_information/logo'){img = val.vendor_config[i].value; }
									
										}
						return (
						<View style={{}}>
			  <View style={[{width: width, height: 48}]}>
					<View style={[styles.cimage, width: width]}>
												 <Image 
												  style={[styles.cimage, {marginLeft:10,borderRadius: 24, marginTop:-1, width: 48}]}
									 source={{uri: img,width: 48, height: 48}}/>
									 <Text style={{color: '#000',fontWeight: 'bold', width: width - 15, height: 38, position: 'absolute', top: 10, left: 65}}>
						 {name}
						  
                    </Text>
												 </View>
					 <TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 20, top: 8}]}>
					 <Image
                                            style={styles.simage}
                                            source={require('./imgs/ic_follow_off.png')}
                                        />
					 
					</TouchableOpacity>
					<TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 55, top: 8}]} onPress={() => {
						 let items = this.state.items
						 items[index_].status_ = !items[index_].status_
						 this.setState({items: items})
						 
						 }}>
					 <Image
                                            style={styles.simage}
                                            source={require('./imgs/ic_share.png')}
                                        />
					 
					</TouchableOpacity>
					{ (val.status_) ?
					
					<TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 88, top: 10}]}onPress={this._shareFacebook}>
					 <Image
                                            style={[styles.simage, {width: 28,height:28}]}
                                            source={require('./imgs/kakao_talk.png')}
                                        />
					 
					</TouchableOpacity> : null
					}
					{ (val.status_) ?
					
					<TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 123, top: 10}]}onPress={this._shareFacebook}>
					 <Image
                                            style={[styles.simage, {width: 28,height:28}]}
                                            source={require('./imgs/icon-facebook.png')}
                                        />
					 
					</TouchableOpacity> : null
					}
					{ (val.status_) ?
					
					<TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 157, top: 10}]}onPress={this._shareFacebook}>
					 <Image
                                            style={[styles.simage, {width: 28,height:28}]}
                                            source={require('./imgs/icon-kakao-story-small.png')}
                                        />
					 
					</TouchableOpacity> : null
					}
					{ (val.status_) ?
					
					<TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 190, top: 10}]}onPress={this._shareFacebook}>
					 <Image
                                            style={[styles.simage, {width: 28,height:28}]}
                                            source={require('./imgs/link_share.png')}
                                        />
					 
					</TouchableOpacity> : null
					}
				 </View>
				 
			 </View>
			  )
					})
				}
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
export default connect(mapStateToProps)(Anser);

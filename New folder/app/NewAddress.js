import React from 'react';
import { StyleSheet, Text, View, Button,LayoutAnimation, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { Actions, ActionConst } from 'react-native-router-flux';
import Postcode from 'react-native-daum-postcode';
import { connect } from 'react-redux'
import { ActionCreators } from './redux/ActionCreators'
import Navbar from './components/navbar';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { LoginManager } from 'react-native-fbsdk'
import Header from './components/Header';
import WebView from 'react-native-webview';
import { Input, CheckBox } from 'react-native-elements';
const mapStateToProps = (state) => ({
	user_login: state.user_login
})

class NewAddress extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
        textNavbar:[
            {text:'Home'},
            {text:'Kiểm tra'},
            {text:'Khóa học'},
            {text:'Tài khoản'}
        ],
		
		webViewHeight: 0,
		address: (this.props.user_login) ? this.props.user_login.user.addresses : [],
		addressInfo: {},
		
		action: (this.props.user_login) ? 'User' : 'Login', 
		firstname: (this.props.user_login) ? this.props.user_login.firstname : '',
		lastname: (this.props.user_login) ? this.props.user_login.lastname : '',
		year: (this.props.user_login) ? this.props.user_login.user.dob.split('-')[0] : '',
		month: (this.props.user_login) ? this.props.user_login.user.dob.split('-')[1] : '',
		date: (this.props.user_login) ? this.props.user_login.user.dob.split('-')[2] : '',
		
		
		data: {},
		name: '',
		expanded: false,
		default_shipping: false,
		default_billing: false,
		phone_: '',
		vn_: '',
		postcode: '',
		street: '',
		
		
		user_login: (this.props.user_login) ? this.props.user_login : null,
    };
	
	
  }
  componentDidMount() {
	  this.setState({
		vn_: '',
		phone_: '',
		name: '',
		postcode: '',
		street: '',
		default_billing: false,
		default_shipping: false,
	})
	  
  
  }
  _RestPassword = () => {
	  this.props.navigation.navigate('RestPassword')
  }
  _login = () => {
        const { username, password, firstname, lastname, phone_, vn_, postcode, street } = this.state
		let addressInfo = this.state.addressInfo
		let leng_th = parseInt(this.state.name.split(' ').length) - 1
		addressInfo.lastname = this.state.name.split(' ')[leng_th]
		let name = '';
		for(let i = 0;  i < leng_th; i++){
			if(i ==0){
				name = this.state.name.split(' ')[i]
			}else{
				name = name + ' ' + this.state.name.split(' ')[i]
			}
		}
		addressInfo.country_id = this.state.data.userLanguageType+this.state.data.userSelectedType
		addressInfo.region_id = 0
		addressInfo.region = {}
		addressInfo.region.region = this.state.data.roadname
		addressInfo.region.region_code = this.state.data.roadname
		addressInfo.region.region_id = 0
		
		addressInfo.city = this.state.data.roadname
		
		addressInfo.customer_id = this.state.user_login.user.id
		addressInfo.firstname = name
		addressInfo.postcode = this.state.postcode
		addressInfo.default_billing = this.state.default_billing
		addressInfo.default_shipping = this.state.default_shipping
		addressInfo.telephone = this.state.vn_ + '-' + this.state.phone_
		addressInfo.street = []
		addressInfo.street.push(this.state.street)
		let customer = this.state.user_login.user
		
		customer.addresses.push(addressInfo)
		console.log(customer)
        this.setState({ process: true }, () => {
            apis.customer(customer, this.state.user_login.user.id)
                .then(res => {
					 
					alert(111);
                    if (typeof res.data.id != 'undefined') {
                      
                        
                      
						let user = {
							
							"group_id": res.data.group_id,
							"default_billing": res.data.default_billing,
							"default_shipping": res.data.default_shipping,
			
							"email": res.data.email,
							"id": res.data.id,
							"firstname": res.data.firstname,
							"lastname": res.data.lastname,
							"gender": res.data.gender,
							"store_id": res.data.store_id,
							"website_id": res.data.website_id,
							"user": res.data, 
						}
				
				  
				Alert.alert("Thông báo", 'Success');
				 
                this.props.dispatch(ActionCreators.set_user_login(user))
				 
                this.props.navigation.navigate('Manage')
						
                    } else {
                        this.setState({ process: false })
                        Alert.alert("Thông báo", 'Có lỗi xảy ra');
                    }
                })
                .catch(err => {
                    this.setState({ process: false })
                    console.log(err.response)
                    //return Alert.alert("Thông báo", 'Có lỗi trong quá trình đăng nhập');
                })
        })     
    }
	changeLayoutOne = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({ expanded: !this.state.expanded }); 
	}
handleFacebookLogin () {
    LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          console.log('Login success with permissions: ' + result.grantedPermissions.toString())
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      }
    )
  }
  
 
handleFacebookLogin () {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          console.log('Login success with permissions: ' + result.grantedPermissions.toString())
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      }
    )
  }
  onWebViewMessage = (event: WebViewMessageEvent) => {
		
		this.setState({webViewHeight: Number(event.nativeEvent.data), progess:false})
	  }
  render() {
    const {goBack} = this.props.navigation;
	 const { username, password, firstname, lastname, phone_, vn_, postcode, street, name, default_billing, default_shipping } = this.state
    return (
      <View style={styles.wrapper}>
          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7', height: height - 75}}>
         
		   <Header navigation={this.props.navigation} user={this.state.user}/>
		  
      		<View style={{paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
			
				<Text style={{width: width, textAlign:'center', fontWeight:'bold'}}>
				﻿수정 업데이트
				</Text>
			</View>
			<View style={styles.section1}>
          				
                		<View style={styles.margintop}></View>
						<Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 27, marginTop: 20, fontSize: 12}}>
				﻿*받으실 분
				</Text>
                		<View style={styles.section2}>
						<TouchableOpacity style={[styles.header_left, { marginTop: 10, zIndex: 10,position: 'absolute', top: -3, left: 5}]}>
		                      
		                  </TouchableOpacity>
		                	<TextInput
		                        style={styles.input}
		                        placeholder="﻿이메일 로그인"
		                       autoCorrect={false}
								  returnKeyType="done"
								   placeholderTextColor="#000"
								  onChangeText={name => this.setState({name})}
								  value={name}
		                      />
                		</View>
                		</View>
        <View style={{width: width,flexDirection: 'row',flexWrap: 'wrap'}}>
			   <Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 15, marginTop: 20, fontSize: 12}}>
				* 주소
				</Text>
			   
						<View style={[{width: width*0.6 -10, marginLeft: 10,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[styles.section2, {width:width*0.6 -10}]}>
						<TextInput
		                        style={[styles.input]}
		                        placeholder=""
		                        placeholderTextColor="#000"
								returnKeyType="done"
								editable={false}
								selectTextOnFocus={false}
									onChangeText={postcode => this.setState({postcode})}
									value={this.state.postcode}
		                      />
						
						</View>
						
						</View>
						<View style={[{width: width*0.4 -10, marginLeft: 10,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[styles.section2, {width:width*0.4 -20, backgroundColor: '#ddd'}]}>
						
						<TouchableOpacity style={[styles.input, { zIndex: 10,height: 36,  marginLeft: 0, width:width*0.4 -20 }]} onPress={this.changeLayoutOne}>
		                      <Text style={{textAlign:'center', fontWeight:'bold', marginTop: 10, fontSize: 12, width:width*0.4 -20}}>
				우편번호 검색
				</Text>
		                  </TouchableOpacity>
						</View>
						
						</View>
						
						</View>
          	<View style={styles.section1}>
          				
                		<View style={styles.margintop}></View>
						
                		<View style={styles.section2}>
						<TouchableOpacity style={[styles.header_left, { marginTop: 10, zIndex: 10,position: 'absolute', top: -3, left: 5}]}>
		                      
		                  </TouchableOpacity>
		                	<TextInput
		                        style={styles.input}
		                        placeholder="﻿이메일 로그인"
		                       autoCorrect={false}
							   editable={false}
								selectTextOnFocus={false}
								  returnKeyType="done"
								   placeholderTextColor="#000"
								  onChangeText={street => this.setState({street})}
								  value={street}
		                      />
                		</View>
                		</View>
						
						<View style={[styles.section1, {marginTop: 13, height: this.state.expanded ? 420 : 0}]}>
						<Postcode
        style={{ width: width, minHeight: 420 }}
        jsOptions={{ animated: true }}
        onSelected={(data) => {
			this.setState({
				postcode: data.zonecode,
				street: data.address, 
				data: data, 
				expanded: false 
			})
		}}
    />
						</View>
                  <View style={styles.section1}>
          				
                		<View style={styles.margintop}></View>
						
                		<View style={styles.section2}>
						<TouchableOpacity style={[styles.header_left, { marginTop: 10, zIndex: 10,position: 'absolute', top: -3, left: 5}]}>
		                      
		                  </TouchableOpacity>
		                	<TextInput
		                        style={styles.input}
		                    
		                       autoCorrect={false}
								  returnKeyType="done"
								   placeholderTextColor="#000"
								  
								  value={''}
		                      />
                		</View>
                		</View>
               <View style={{width: width,flexDirection: 'row',flexWrap: 'wrap'}}>
			   <Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 15, marginTop: 20, fontSize: 12}}>
				*전화번호
				</Text>
			   
						<View style={[{width: width*0.4 -10, marginLeft: 10,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[styles.section2, {width:width*0.4 -10}]}>
						<TextInput
		                        style={[styles.input]}
		                        placeholder=""
		                        placeholderTextColor="#000"
								returnKeyType="done"
								  onChangeText={vn_ => this.setState({vn_})}
								  value={vn_}
		                      />
						
						</View>
						
						</View>
						<View style={[{width: width*0.6 -10, marginLeft: 10,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[styles.section2, {width:width*0.6 -20}]}>
						<TextInput
		                        style={[styles.input]}
		                        placeholder=""
		                        placeholderTextColor="#000"
								returnKeyType="done"
								  onChangeText={phone_ => this.setState({phone_})}
								  value={phone_}
		                      />
						
						</View>
						
						</View>
						</View>
          	<View style={{width: width,flexDirection: 'row',flexWrap: 'wrap'}}>
					<View style={[styles.checkboxContainer, {width: width*.5,  flexDirection: "row",}]}>
					<CheckBox
                      checkedIcon={<Image source={require('./images/checked.png')} />}
                      uncheckedIcon={<Image source={require('./images/unchecked.png')} />}
                      checked={(default_shipping) ? true : false}
                      onPress={() => {this.setState({default_shipping: !this.state.default_shipping })}}
                    />
						
						<Text style={[styles.label, {marginTop: 20}]}>기본 주소</Text>
					  </View>
					  <View style={[styles.checkboxContainer, {width: width*.5,  flexDirection: "row",}]}>
					  <CheckBox
                      checkedIcon={<Image source={require('./images/checked.png')} />}
                      uncheckedIcon={<Image source={require('./images/unchecked.png')} />}
                      checked={(default_billing) ? true : false}
                      onPress={() => {this.setState({default_billing: !this.state.default_billing })}}
                    />
						
						<Text style={[styles.label, {marginTop: 20}]}>기본 청구지 주소</Text>
					  </View>
					</View>
					<TouchableOpacity style={[styles.logout, {backgroundColor: '#fc6833', color: '#000'}]}   onPress={this._login}>
                  				<Text style={[styles.logout_text, { color: '#fff'} ]}>주소 저장</Text>
                		</TouchableOpacity>
            </ScrollView>
			</View>
            <Navbar navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	wrapper:{
		flex:1,
		backgroundColor: '#fff',
	},
	image:{
		width:width,
		height:height,
	},
	form:{
		width:width,
		height:height,
	},
	section1:{
		alignItems:'center',
		marginTop: -30,
	},
	input:{
		width:width-40,
		height:36,
		marginLeft: 10,
		marginTop:3
	},
	section2:{
		borderWidth:1,
		borderColor:'#ccc',
		marginTop: 15
	},
	logout:{
	    marginLeft:15,
	    marginRight:15,
	    alignItems:'center',
	    backgroundColor:'#ed7ca8',
	    borderRadius:10,
	    marginTop:25,
	    width:width-30,
  	},
    lg_fb:{
      marginLeft:15,
      marginRight:15,
      alignItems:'center',
      backgroundColor:'#ed7ca8',
      borderRadius:10,
      marginTop:25,
      width:(width-30)*0.5,
    },
    lg_gg:{
      position:'absolute',
      right:15,
      alignItems:'center',
      backgroundColor:'#ed7ca8',
      borderRadius:10,
      marginTop:25,
      width:(width-50)*0.5,
    },
    lg_ggfb_text:{
      paddingBottom:5,
      paddingTop:5,
      color:'#fff',
      fontSize:15,
    },
  	logout_text:{
	    paddingBottom:10,
	    paddingTop:10,
	    color:'#000',
	    fontSize:18,
	    textTransform:'uppercase',
  	},
  	margintop:{
  		marginTop:30,
  	},
  	forgot:{
  		alignItems:'flex-end',
  	},
  	forgot_text:{
  		color:'#ed7ca8',
  		marginTop:5,
  		marginRight:15,
  	},
  	or:{
  		flexDirection:'row',
      	flexWrap: 'wrap',
      	marginTop:35,
      	marginBottom:30,
  	},
  	left:{
  		height:1,
  		backgroundColor:'#c6ced4',
  		width:(width-50)*0.42,
  		marginTop:9,
  		marginRight:10,
  		marginLeft:15,
  	},
  	center:{
  		width:(width-50)*0.16,
  		alignItems:'center',
  	},
  	right:{
  		height:1,
  		backgroundColor:'#c6ced4',
  		width:(width-50)*0.42,
  		marginTop:9,
  		marginRight:15,
  		marginLeft:10,
  	},
  	other:{
	    marginLeft:15,
	    marginRight:15,
	    alignItems:'center',
	    backgroundColor:'transparent',
	    borderRadius:10,
	    borderWidth:1,
	    borderColor:'#ed7ca8',
	    marginTop:25,
	    width:width-30,
  	},
  	other_text:{
	    paddingBottom:10,
	    paddingTop:10,
	    color:'#ed7ca8',
	    fontSize:18,
	    textTransform:'uppercase',
  	},
  	register:{
  		flexDirection:'row',
  		flexWrap:'wrap',
  		position:'absolute',
  		bottom:120,
  	},
  	register_now:{
  		color:'#ed7ca8',
  	},
  	register_qoute:{
  		marginLeft:50,
  		marginRight:10,
  	}
});
 export default connect(mapStateToProps)(NewAddress)
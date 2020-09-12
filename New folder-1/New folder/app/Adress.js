import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { ActionCreators } from './redux/ActionCreators'
import Navbar from './components/navbar';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { LoginManager } from 'react-native-fbsdk'
import Header from './components/Header';
import Icon from 'react-native-vector-icons/Ionicons'
const mapStateToProps = (state) => ({
	user_login: state.user_login
})
import { Input, CheckBox } from 'react-native-elements';
class Adress extends React.Component {
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
		action: (this.props.user_login) ? 'User' : 'Login', 
		firstname: (this.props.user_login) ? this.props.user_login.firstname : '',
		lastname: (this.props.user_login) ? this.props.user_login.lastname : '',
		year: (this.props.user_login) ? this.props.user_login.user.dob.split('-')[0] : '',
		month: (this.props.user_login) ? this.props.user_login.user.dob.split('-')[1] : '',
		date: (this.props.user_login) ? this.props.user_login.user.dob.split('-')[2] : '',
		add: (this.props.user_login) ? this.props.user_login.user.dob.split('-')[2] : '',
		address: (this.props.user_login) ? this.props.user_login.user.addresses : [],
		phone_: '',
		vn_: '',
		
		user_login: (this.props.user_login) ? this.props.user_login : null,
    };
	
	
  }
  componentDidMount() {
  for(let  i = 0; i < this.state.user_login.user.custom_attributes.length; i++){
		let item = this.props.user_login.user.custom_attributes[i]
		if(item.attribute_code == 'phone_number'){
			
			this.setState({
				phone_: item.value.split('-')[1],
				vn_: item.value.split('-')[0],
			})
			
		}
	}
  }
  _RestPassword = () => {
	  this.props.navigation.navigate('RestPassword')
  }
  _default_billing(id) {
	  const { username, password, firstname, lastname } = this.state
		let customer = {}
		let address = this.state.address
		address[id].default_billing = !address[id].default_billing
		this.setState({address: address})
		customer.id = this.state.user_login.user.id
		customer.firstname = this.state.firstname
		customer.addresses = address
		customer.lastname = this.state.lastname
		customer.store_id = this.state.user_login.user.store_id
		customer.website_id = this.state.user_login.user.website_id
		customer.dob = this.state.year+'-'+this.state.month+'-'+this.state.date
		customer.email = this.state.user_login.email
		let item = {}
		item.attribute_code = "phone_number"
		item.value = this.state.vn_+'-'+this.state.phone_
		customer.custom_attributes = []
		customer.custom_attributes.push(item)
		console.log(customer)
        this.setState({ process: true }, () => {
            apis.customer(customer, this.state.user_login.user.id)
                .then(res => {
					 
					
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
				
				  
				
				 
                this.props.dispatch(ActionCreators.set_user_login(user))
				 
               
						
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
  _default_shipping(id) {
	  const { username, password, firstname, lastname } = this.state
		let customer = {}
		let address = this.state.address
		address[id].default_shipping = !address[id].default_shipping
		this.setState({address: address})
		customer.id = this.state.user_login.user.id
		customer.firstname = this.state.firstname
		customer.addresses = address
		customer.lastname = this.state.lastname
		customer.store_id = this.state.user_login.user.store_id
		customer.website_id = this.state.user_login.user.website_id
		customer.dob = this.state.year+'-'+this.state.month+'-'+this.state.date
		customer.email = this.state.user_login.email
		let item = {}
		item.attribute_code = "phone_number"
		item.value = this.state.vn_+'-'+this.state.phone_
		customer.custom_attributes = []
		customer.custom_attributes.push(item)
		console.log(customer)
        this.setState({ process: true }, () => {
            apis.customer(customer, this.state.user_login.user.id)
                .then(res => {
					 
					
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
				
				  
				
				 
                this.props.dispatch(ActionCreators.set_user_login(user))
				 
               
						
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
  _login = () => {
        const { username, password, firstname, lastname } = this.state
		let customer = {}
		customer.id = this.state.user_login.user.id
		customer.firstname = this.state.firstname
		customer.lastname = this.state.lastname
		customer.store_id = this.state.user_login.user.store_id
		customer.website_id = this.state.user_login.user.website_id
		customer.dob = this.state.year+'-'+this.state.month+'-'+this.state.date
		customer.email = this.state.user_login.email
		let item = {}
		item.attribute_code = "phone_number"
		item.value = this.state.vn_+'-'+this.state.phone_
		customer.custom_attributes = []
		customer.custom_attributes.push(item)
		console.log(customer)
        this.setState({ process: true }, () => {
            apis.customer(customer, this.state.user_login.user.id)
                .then(res => {
					 
					
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
	const { username, password, firstname, lastname, year, month, date, phone, vn, isSelected, setSelection} = this.state
    return (
      <View style={styles.wrapper}>
          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7', height: height - 75}}>
         
		   <Header navigation={this.props.navigation} user={this.state.user}/>
		  
      		<View style={{paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
			
				<Text style={{width: width, textAlign:'center', fontWeight:'bold'}}>
				﻿주소추가
				</Text>
			</View>
			<TouchableOpacity style={[styles.logout, {backgroundColor: '#fc6833', color: '#000', marginBottom: 20}]}     onPress={() => this.props.navigation.navigate('NewAddress')}>
                  				<Text style={[styles.logout_text, { color: '#fff'} ]}>주소추가</Text>
                		</TouchableOpacity>
          	
                		{
					this.state.address.map((val, index_) => {
						return (
						<View>
			  <View style={[{width: width,backgroundColor:'#fff', borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#ddd', paddingTop:10, paddingBottom: 5}]}>
					
					  <Text style={{color: '#000',marginTop: 2,fontWeight: 'bold',  width: width - 15, paddingBottom: 10, paddingLeft: 10}}>
						  {val.firstname}{val.lastname}
                    </Text>
					<Text style={{color: '#000',marginTop: 2,  width: width - 15, paddingBottom: 10, paddingLeft: 10}}>
						  {val.street[0]}
                    </Text>
					<Text style={{color: '#000',marginTop: 2,  width: width - 15, paddingBottom: 10, paddingLeft: 10}}>
						  {val.telephone}
                    </Text>
					<View style={{width: width,flexDirection: 'row',flexWrap: 'wrap'}}>
					<View style={[styles.checkboxContainer, {width: width*.5,  flexDirection: "row",}]}>
					<CheckBox
                      checkedIcon={<Image source={require('./images/checked.png')} />}
                      uncheckedIcon={<Image source={require('./images/unchecked.png')} />}
                      checked={(val.default_shipping) ? true : false}
                      onPress={this._default_shipping.bind(this, index_)}
                    />
						
						<Text style={[styles.label, {marginTop: 20}]}>기본 주소</Text>
					  </View>
					  <View style={[styles.checkboxContainer, {width: width*.5,  flexDirection: "row",}]}>
					  <CheckBox
                      checkedIcon={<Image source={require('./images/checked.png')} />}
                      uncheckedIcon={<Image source={require('./images/unchecked.png')} />}
                      checked={(val.default_billing) ? true : false}
                      onPress={this._default_billing.bind(this, index_)}
                    />
						
						<Text style={[styles.label, {marginTop: 20}]}>기본 청구지 주소</Text>
					  </View>
					</View>
					<View style={{width: width,flexDirection: 'row',flexWrap: 'wrap'}}> 
					<TouchableOpacity style={[styles.logout, {backgroundColor: '#fc6833', color: '#000', marginBottom: 20, width: 70}]}  onPress={() => this.props.navigation.navigate('EditAddress', {id_: index_} )}>
                  				<Text style={[styles.logout_text, { color: '#fff', fontSize: 12} ]}>수정</Text>
                		</TouchableOpacity>
					<TouchableOpacity style={[styles.logout, {backgroundColor: '#000', color: '#000', marginBottom: 20, width: 70, marginLeft: -5}]}   onPress={this._login}>
                  				<Text style={[styles.logout_text, { color: '#fff', fontSize: 12} ]}>삭제</Text>
                		</TouchableOpacity>
						</View>
				 </View>
				 
			 </View>
			  )
					})
				}

          		
          		
                  
               
          	
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
 export default connect(mapStateToProps)(Adress)
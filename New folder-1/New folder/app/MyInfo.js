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
const mapStateToProps = (state) => ({
	user_login: state.user_login
})

class MyInfo extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
        textNavbar:[
            {text:'Home'},
            {text:'Kiểm tra'},
            {text:'Khóa học'},
            {text:'Tài khoản'}
        ],
		action: (this.props.user_login) ? 'User' : 'Login', 
		firstname: (this.props.user_login) ? this.props.user_login.firstname : '',
		lastname: (this.props.user_login) ? this.props.user_login.lastname : '',
		year: (this.props.user_login) ? this.props.user_login.user.dob.split('-')[0] : '',
		month: (this.props.user_login) ? this.props.user_login.user.dob.split('-')[1] : '',
		date: (this.props.user_login) ? this.props.user_login.user.dob.split('-')[2] : '',
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
  render() {
    const {goBack} = this.props.navigation;
	const { username, password, firstname, lastname, year, month, date, phone, vn} = this.state
    return (
      <View style={styles.wrapper}>
          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7', height: height - 75}}>
         
		   <Header navigation={this.props.navigation} user={this.state.user}/>
		  
      		<View style={{paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
			
				<Text style={{width: width, textAlign:'center', fontWeight:'bold'}}>
				﻿내 정보
				</Text>
			</View>
			
          	<Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 15, marginTop: 20}}>
				﻿기본정보
				</Text>
			<Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 15, marginTop: 20, fontSize: 12}}>
				﻿성
				</Text>
          
          		<View style={styles.section1}>
          				
                		<View style={styles.margintop}></View>
                		<View style={styles.section2}>
						<TouchableOpacity style={[styles.header_left, { marginTop: 10, zIndex: 10,position: 'absolute', top: -3, left: 5}]}>
		                      
		                  </TouchableOpacity>
		                	<TextInput
		                        style={styles.input}
		                        placeholder="﻿이메일 로그인"
		                       autoCorrect={false}
								  returnKeyType="done"
								   placeholderTextColor="#000"
								  onChangeText={firstname => this.setState({firstname})}
								  value={firstname}
		                      />
                		</View>
						<Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 27, marginTop: 20, fontSize: 12}}>
				﻿이름
				</Text>
                		<View style={styles.section2}>
						
						<TouchableOpacity style={[styles.header_left, { marginTop: 10, zIndex: 10,position: 'absolute', top: -5, left: 7}]}>
		                     
		                  </TouchableOpacity>
							
		                	<TextInput
		                        style={styles.input}
		                        placeholder="비밀번호 입력"
		                        placeholderTextColor="#000"
								returnKeyType="done"
								  onChangeText={lastname => this.setState({lastname})}
								  value={lastname}
		                      />
                		</View>
						<View style={{width: width}}>
						<Text style={{width: width, textAlign:'left', marginLeft: 15, marginTop: 20, fontSize: 12}}>
							﻿ID/Email
						</Text>
						<Text style={{textAlign:'left', fontWeight:'bold', position: 'absolute', right: 15, marginLeft: 15, marginTop: 20, fontSize: 14}}>
							﻿{this.state.user_login.email}
						</Text>
						
						</View>
						<Text style={{width: width, textAlign:'left', marginLeft: 25, marginTop: 20, fontSize: 12}}>
							﻿생년월일
						</Text>
						<View style={{width: width,flexDirection: 'row',flexWrap: 'wrap'}}>
						<View style={[{width: width*0.3333333 - 20, marginLeft: 10,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[styles.section2, {width: width*0.3333333 - 60}]}>
						<TextInput
		                        style={[styles.input]}
		                        placeholder="비밀번호 입력"
		                        placeholderTextColor="#000"
								returnKeyType="done"
								  onChangeText={year => this.setState({year})}
								  value={year}
		                      />
						
						</View>
						<Text style={{textAlign:'left', marginLeft: 15, marginTop: 20, fontSize: 12, marginTop: 25}}>
							년
						</Text>
						</View>
						
						<View style={[{width: width*0.3333333 - 20, marginLeft: 10,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[styles.section2, {width: width*0.3333333 - 60}]}>
						<TextInput
		                        style={[styles.input]}
		                        placeholder="비밀번호 입력"
		                        placeholderTextColor="#000"
								returnKeyType="done"
								  onChangeText={month => this.setState({month})}
								  value={month}
		                      />
						
						</View>
						<Text style={{textAlign:'left', marginLeft: 15, marginTop: 20, fontSize: 12, marginTop: 25}}>
							월
						</Text>
						</View>
						
						
						<View style={[{width: width*0.3333333 - 20, marginLeft: 10,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[styles.section2, {width: width*0.3333333 - 60}]}>
						<TextInput
		                        style={[styles.input]}
		                        placeholder="비밀번호 입력"
		                        placeholderTextColor="#000"
								returnKeyType="done"
								  onChangeText={date => this.setState({date})}
								  value={date}
		                      />
						
						</View>
						<Text style={{textAlign:'left', marginLeft: 15, marginTop: 20, fontSize: 12, marginTop: 25}}>
							일
						</Text>
						</View>
						
						
						</View>
						<View style={{width: width,flexDirection: 'row',flexWrap: 'wrap'}}>
						<View style={[{width: width*0.4 -10, marginLeft: 10,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[styles.section2, {width:width*0.4 -10}]}>
						<TextInput
		                        style={[styles.input]}
		                        placeholder=""
		                        placeholderTextColor="#000"
								returnKeyType="done"
								  onChangeText={vn_ => this.setState({vn_})}
								  value={this.state.vn_}
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
								  value={this.state.phone_}
		                      />
						
						</View>
						
						</View>
						</View>
                		<TouchableOpacity style={[styles.logout, {backgroundColor: '#fc6833', color: '#000'}]}   onPress={this._login}>
                  				<Text style={[styles.logout_text, { color: '#fff'} ]}>수정완료</Text>
                		</TouchableOpacity>

          		</View>
          		
                  
               
          	
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
		marginTop:3,
		color:'#000',
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
 export default connect(mapStateToProps)(MyInfo)
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

const mapStateToProps = (state) => ({
	user_login: state.user_login
})

class Login extends React.Component {
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
		username: 'Seller_1@damda.com',
		password: '@damda123' 
    };
	if(this.props.user_login){this.props.navigation.navigate('User')}
  }
  
  _RestPassword = () => {
	  this.props.navigation.navigate('RestPassword')
  }
  _login = () => {
        const { username, password } = this.state
		
        if (username == '')Alert.alert("Thông báo", 'Bạn Chưa Nhập Email');
        if (password == '') Alert.alert("Thông báo", 'Bạn Chưa Nhập Mật Khẩu');
        this.setState({ process: true }, () => {
            apis.login(username, password)
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
				
				  
				Alert.alert("Thông báo", 'Bạn đã đăng nhập thành công');
				 
                this.props.dispatch(ActionCreators.set_user_login(user))
				 
                this.props.navigation.navigate('Home', {loadpage: true})
						
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
	const { username, password} = this.state
    return (
      <View style={styles.wrapper}>
          <ScrollView >
      		<View style={{paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
			<TouchableOpacity style={[styles.header_left, { marginTop: 10, zIndex: 10,position: 'absolute', top: -5}]} onPress={() => this.props.navigation.pop()}>
		                      <Image
		                          source={require('./images/back_arrow.png')}
		                      />
		                  </TouchableOpacity>
				<Text style={{width: width, textAlign:'center', fontWeight:'bold'}}>
				로그인 / 회원가입 
				</Text>
			</View>
          	
          	<View style={styles.form}>
          		<View style={styles.section1}>
          				
                		<View style={styles.margintop}></View>
                		<View style={styles.section2}>
						<TouchableOpacity style={[styles.header_left, { marginTop: 10, zIndex: 10,position: 'absolute', top: -3, left: 5}]}>
		                      <Image
		                          source={require('./imgs/ic-forgot-br-name-email.png')}
		                      />
		                  </TouchableOpacity>
		                	<TextInput
		                        style={styles.input}
		                        placeholder="﻿이메일 로그인"
		                       autoCorrect={false}
								  returnKeyType="done"
								   placeholderTextColor="#000"
								  onChangeText={username => this.setState({username})}
								  value={username}
		                      />
                		</View>
                		<View style={styles.section2}>
						<TouchableOpacity style={[styles.header_left, { marginTop: 10, zIndex: 10,position: 'absolute', top: -5, left: 7}]}>
		                      <Image
							  style={{width: 27, height: 27}}
		                          source={require('./imgs/ic-password-edittext.png')}
		                      />
		                  </TouchableOpacity>
							
		                	<TextInput
		                        style={styles.input}
		                        placeholder="비밀번호 입력"
		                        placeholderTextColor="#000"
								returnKeyType="done"
								  onChangeText={password => this.setState({password})}
								  value={password}
		                      />
                		</View>
                		<TouchableOpacity style={[styles.logout, {backgroundColor: '#fc6833', color: '#000'}]}   onPress={this._login}>
                  				<Text style={[styles.logout_text, { color: '#fff'} ]}>로그인하기</Text>
                		</TouchableOpacity>
						<TouchableOpacity style={[{color: '#000'}]} onPress={this._RestPassword}>
                  				<Text style={[{ color: '#000', width: width, marginLeft: 30, marginTop: 10}]}>잊어버리셨습니까?</Text>
                		</TouchableOpacity>
						
						<TouchableOpacity style={[styles.logout, {backgroundColor: '#fff34f', color: '#000'}]}   onPress={this._login}>
								<Image
								
							  style={{width: 35, height: 35, position: 'absolute', top: 5, left: 15}}
		                          source={require('./imgs/kakaotalk.png')}
		                      />
                  				<Text style={[styles.logout_text, { color: '#000'} ]}>카카오 계정으로 로그인하기</Text>
								
                		</TouchableOpacity>
						
						<TouchableOpacity style={[styles.logout, {backgroundColor: '#3b5998', color: '#000'}]}     onPress={this.handleFacebookLogin}>
								<Image
								
							  style={{width: 15, height: 30, position: 'absolute', top: 5, left: 25}}
		                          source={require('./imgs/ic-facebook.png')}
		                      />
                  				<Text style={[styles.logout_text, { color: '#fff'} ]}>카카오 계정으로 로그인하기</Text>
								
                		</TouchableOpacity>
						
						<TouchableOpacity style={[styles.logout, {backgroundColor: null, borderColor: '#fc6833', borderWidth: 1}]} onPress={() =>this.props.navigation.navigate('Register')}>
                  		<Text style={[styles.logout_text, {color: '#fc6833'}]}>가입하기</Text>
                	</TouchableOpacity>
					<Text style={[{ color: '#000', width: width - 30, marginLeft: 5, marginTop: 10, textAlign: 'center'}]}>소셜미디어 로그인 기능은 당분간 신규 회원에 한해서만 제공 됩니다.</Text>
          		</View>
          		
                  
               
          	</View>
            </ScrollView>
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
		marginTop:90,
	},
	input:{
		width:width-70,
		height:36,
		marginLeft: 40,
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
 export default connect(mapStateToProps)(Login)
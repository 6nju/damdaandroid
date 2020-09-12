import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput,Linking, ScrollView, Alert } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { connect } from 'react-redux'
import Axios from 'axios';
import { ActionCreators } from './redux/ActionCreators'
import { ActionCart } from './redux/ActionCart'
import { Input, CheckBox } from 'react-native-elements';
import Navbar from './components/navbar';
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
class Register extends React.Component {
	constructor(props) {
    super(props)
    this.state = { 
		address: '',
		phone: '',
		name: '',
		username: '',
		password: '',
		phone_: '',
		vn_: '',
		terms_and_conditions: false,
		privacy_policy: false,
		customer_payment_policy: false,
		repass: '',
		email:'',
		firstname:'',
		email:'Seller_1@damda.com',
		lastname:'',
		send_sms:'',
		send_email:'',
	}
	
	}
	_terms_and_conditions = () => {
		
		Linking.openURL('https://m.seoulmall.kr/terms_and_conditions')
	}
	_checkMail = () => {
		const { email } = this.state
		
		apis.checkMail(email).then(res => {
			
			if(res == 'undefined'){
				
				Alert.alert("공고", "필수항목");
			}
			if(res == 'false'){
				Alert.alert("공고", "이미 사용중인 이메일 주소 입니다");
			}
			if(res == 'true'){
				Alert.alert("공고", "사용가능한 이메일 주소 입니다");
			}
		});
	}
	_save = () => {
		
		
		const { username, password, email, address , rePassword, phone } = this.state
		
		if(password == '' || password == null){
		  Alert.alert("Thông báo", "Bạn chưa nhập mật khẩu");
		  return
		  }
		  if(username == '' || username == null){
			  Alert.alert("Thông báo", "Bạn chưa nhập tài khoản");
			  return
		  }
		  if(phone == '' || phone == null){
			  Alert.alert("Thông báo", "Bạn chưa nhap số điện thoại");
			  return
		  }
		  
		if(password != rePassword){
			  Alert.alert("Thông báo", "Xác nhận mật khẩu không đúng");
			  return
		  }
		apis.register(username, phone, password, email, address).then(res => {
			
			if(res.data.user){

				let user = {
					"name": username,
					"phone": phone,
					"address": address,
					"password": password,
					"email": email,
					"customerId": res.data.user.id,
				}
				
				
				Alert.alert("Thông báo", 'Bạn đã tạo tài khoản thành công');
                this.props.dispatch(ActionCreators.set_user_login(user))
				
                this.props.navigation.navigate('Home')
				
			}else{
				
				Alert.alert("Thông báo", "Đã tồn tại tài khoản hoặc số điện thoại, email");
				
			}
		}).catch(err => {
			Alert.alert("Thông báo", "Đã tồn tại tài khoản hoặc số điện thoại, email");
                   
		})
}
  render() {
    const {goBack} = this.props.navigation;
	const { username, password, firstname,send_email,send_sms,repass,year,terms_and_conditions,date,customer_payment_policy,month,privacy_policy, lastname, email, vn_, phone_} = this.state
    return (
      <View style={styles.wrapper}>
          <ScrollView>
      		<View style={{paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
			<TouchableOpacity style={[styles.header_left, { marginTop: 10, zIndex: 10,position: 'absolute', top: -5}]} onPress={() => this.props.navigation.pop()}>
		                      <Image
		                          source={require('./images/back_arrow.png')}
		                      />
		                  </TouchableOpacity>
				<Text style={{width: width, textAlign:'center', fontWeight:'bold'}}>
				회원가입 
                 
				</Text>
			</View>
          	
          	<View style={styles.form}>
          		<View style={styles.section1}>
          				<Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 27, marginTop: 20, fontSize: 12}}>
				성
				</Text>
				<View style={styles.section2}>
						<TouchableOpacity style={[styles.header_left, { marginTop: 10, zIndex: 10,position: 'absolute', top: -3, left: 5}]}>
		                      
		                  </TouchableOpacity>
		                	<TextInput
		                        style={[styles.input2]}
		                        placeholder="﻿성"
		                       autoCorrect={false}
								  returnKeyType="done"
								   placeholderTextColor="#000"
								  onChangeText={firstname => this.setState({firstname})}
								  value={firstname}
		                      />
                		</View>
						
						<Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 27, marginTop: 20, fontSize: 12}}>
				이름
				</Text>
				<View style={styles.section2}>
						<TouchableOpacity style={[styles.header_left, { marginTop: 10, zIndex: 10,position: 'absolute', top: -3, left: 5}]}>
		                      
		                  </TouchableOpacity>
		                	<TextInput
		                        style={[styles.input2]}
		                        placeholder="﻿이름"
		                       autoCorrect={false}
								  returnKeyType="done"
								   placeholderTextColor="#000"
								  onChangeText={firstname => this.setState({lastname})}
								  value={lastname}
		                      />
                		</View>
          				
						
						
						
                		
                		
						
						
						<View style={{width: width,flexDirection: 'row',flexWrap: 'wrap'}}>
			   <Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 15, marginTop: 20, fontSize: 12}}>
				이메일 주소
				</Text>
			   
						<View style={[{width: width*0.65 -15, marginLeft: 15,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[styles.section2, {width:width*0.65 -15}]}>
						<TextInput
		                        style={[styles.input2]}
		                        placeholder="이메일 주소"
		                        placeholderTextColor="#000"
								returnKeyType="done"
								editable={false}
								selectTextOnFocus={false}
									onChangeText={email => this.setState({email})}
									value={email}
		                      />
						
						</View>
						
						</View>
						<View style={[{width: width*0.35 - 30, marginLeft: 10,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[styles.section2, {width:width*0.35 -25, backgroundColor: '#ddd'}]}>
						
						<TouchableOpacity style={[styles.input, { zIndex: 10,height: 36,  marginLeft: 0, width:width*0.35 -30 }]}  onPress={this._checkMail}>
		                      <Text style={{textAlign:'center', fontWeight:'bold', marginTop: 10, fontSize: 12, width:width*0.35 -20}}>
				중복체크
				</Text>
		                  </TouchableOpacity>
						</View>
						
						</View>
						
						</View>
						
						
						
						
						
						
						
						
						
						
					
          				<Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 27, marginTop: 20, fontSize: 12}}>
				비밀번호
				</Text>	
						
                		<View style={styles.section2}>
						<TouchableOpacity style={[styles.header_left, { marginTop: 10, zIndex: 10,position: 'absolute', top: -5, left: 7}]}>
		                      <Image
							  style={{width: 27, height: 27}}
		                          source={require('./imgs/ic-password-edittext.png')}
		                      />
		                  </TouchableOpacity>
							
		                	<TextInput
		                        style={styles.input}
		                        placeholder="비밀번호"
		                        placeholderTextColor="#000"
								returnKeyType="done"
								  onChangeText={password => this.setState({password})}
								  value={password}
		                      />
                		</View>
						
						<View style={styles.section2}>
						<TouchableOpacity style={[styles.header_left, { marginTop: 10, zIndex: 10,position: 'absolute', top: -3, left: 5}]}>
		                      
		                  </TouchableOpacity>
		                	<TextInput
		                        style={[styles.input2]}
		                        placeholder="﻿비밀번호 재확인"
		                       autoCorrect={false}
								  returnKeyType="done"
								   placeholderTextColor="#000"
								  onChangeText={repass => this.setState({repass})}
								  value={repass}
		                      />
                		</View>
						<Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 27, marginTop: 20, fontSize: 12}}>
				생년월일
				</Text>	
						<View style={{width: width,flexDirection: 'row',flexWrap: 'wrap'}}>
						<View style={[{width: width*0.3333333 - 13, marginLeft: 13,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[styles.section2, {width: width*0.3333333 - 18}]}>
						<TextInput
		                        style={[styles.input2]}
		                        placeholder="년"
		                        placeholderTextColor="#000"
								returnKeyType="done"
								  onChangeText={year => this.setState({year})}
								  value={year}
		                      />
						
						</View>
						
						</View>
						
						<View style={[{width: width*0.3333333-13, marginLeft: 6,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[styles.section2, {width: width*0.3333333 - 18}]}>
						<TextInput
		                        style={[styles.input2]}
		                        placeholder="월"
		                        placeholderTextColor="#000"
								returnKeyType="done"
								  onChangeText={month => this.setState({month})}
								  value={month}
		                      />
						
						</View>
						
						</View>
						
						
						<View style={[{width: width*0.3333333 - 13, marginLeft: 6,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[styles.section2, {width: width*0.3333333 - 13}]}>
						<TextInput
		                        style={[styles.input2]}
		                        placeholder="일"
		                        placeholderTextColor="#000"
								returnKeyType="done"
								  onChangeText={date => this.setState({date})}
								  value={date}
		                      />
						
						</View>
						
						</View>
						
						
						</View>
						<Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 27, marginTop: 20, fontSize: 12}}>
				전화번호
				</Text>	
						<View style={{width: width,flexDirection: 'row',flexWrap: 'wrap'}}>
						<View style={[{width: width*0.4 -10, marginLeft: 10,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[styles.section2, {width:width*0.4 -10}]}>
						<TextInput
		                        style={[styles.input2]}
		                        placeholder="국가 코드"
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
		                        style={[styles.input2]}
		                        placeholder="전화번호"
		                        placeholderTextColor="#000"
								returnKeyType="done"
								  onChangeText={phone_ => this.setState({phone_})}
								  value={this.state.phone_}
		                      />
						
						</View>
						
						</View>
						</View>
						<Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 27, marginTop: 20, fontSize: 12}}>
				필수 동의항목
				</Text>	
				
				<View style={[styles.checkboxContainer, {width: width,  flexDirection: "row",}]}>
					  <CheckBox
                      checkedIcon={<Image source={require('./images/checked.png')} />}
                      uncheckedIcon={<Image source={require('./images/unchecked.png')} />}
                      checked={(terms_and_conditions) ? true : false}
                      onPress={() => {this.setState({terms_and_conditions: !this.state.terms_and_conditions })}}
                    />
						
						<Text style={[styles.label, {marginTop: 20, width: 200}]}>  구매회원 약관​​
                                            </Text>
						<TouchableOpacity style={[{color: '#fc6833',marginTop: 20}]} onPress={this._terms_and_conditions}>
                  				<Text style={[styles.label, {color: '#fc6833'} ]}>약관 전체보기​</Text>
                		</TouchableOpacity>					
					  </View>
					  
					  <View style={[styles.checkboxContainer, {width: width,  flexDirection: "row",}]}>
					  <CheckBox
                      checkedIcon={<Image source={require('./images/checked.png')} />}
                      uncheckedIcon={<Image source={require('./images/unchecked.png')} />}
                      checked={(customer_payment_policy) ? true : false}
                      onPress={() => {this.setState({customer_payment_policy: !this.state.customer_payment_policy })}}
                    />
						
						<Text style={[styles.label, {marginTop: 20, width: 200}]}>  전자금융서비스 이용약관
                                            
                                            </Text>
						<TouchableOpacity style={[{color: '#fc6833',marginTop: 20, }]}  onPress={() => {Linking.openURL('https://m.seoulmall.kr/customer_payment_policy')}}>
                  				<Text style={[styles.label, {color: '#fc6833'} ]}>약관 전체보기​</Text>
                		</TouchableOpacity>					
					  </View>
					  <View style={[styles.checkboxContainer, {width: width,  flexDirection: "row",}]}>
					  <CheckBox
                      checkedIcon={<Image source={require('./images/checked.png')} />}
                      uncheckedIcon={<Image source={require('./images/unchecked.png')} />}
                      checked={(privacy_policy) ? true : false}
                      onPress={() => {this.setState({privacy_policy: !this.state.privacy_policy })}}
                    />
						
						<Text style={[styles.label, {marginTop: 20, width: 200}]}>  개인정보 수집 및 이용
                                            
                                            
                                            </Text>
											
											
						<TouchableOpacity style={[{color: '#fc6833',marginTop: 20, }]}  onPress={() => {Linking.openURL('https://m.seoulmall.kr/privacy_policy')}}>
                  				<Text style={[styles.label, {color: '#fc6833'} ]}>약관 전체보기​</Text>
                		</TouchableOpacity>					
					  </View>
					  <Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 27, marginTop: 20, fontSize: 12}}>
				선택 동의항목
				</Text>	
				
				<View style={[styles.checkboxContainer, {width: width,  flexDirection: "row",}]}>
					  <CheckBox
                      checkedIcon={<Image source={require('./images/checked.png')} />}
                      uncheckedIcon={<Image source={require('./images/unchecked.png')} />}
                      checked={(send_sms) ? true : false}
                      onPress={() => {this.setState({send_sms: !this.state.send_sms })}}
                    />
						
						<Text style={[styles.label, {marginTop: 20, width: 200}]}>  마케팅 정보 수신 (SMS)
                                            
                                            
                                            
                                            </Text>
											
											
										
					  </View>
					  <View style={[styles.checkboxContainer, {width: width,  flexDirection: "row",}]}>
					  <CheckBox
                      checkedIcon={<Image source={require('./images/checked.png')} />}
                      uncheckedIcon={<Image source={require('./images/unchecked.png')} />}
                      checked={(send_email) ? true : false}
                      onPress={() => {this.setState({send_email: !this.state.send_email })}}
                    />
						
						<Text style={[styles.label, {marginTop: 20, width: 200}]}>    마케팅 정보 수신 (Email)​
                                            
                                            
                                            
                                            </Text>
											
											
										
					  </View>
                		<TouchableOpacity style={[styles.logout, {backgroundColor: '#fc6833', color: '#000', marginBottom:100}]}   onPress={this._login}>
                  				<Text style={[styles.logout_text, { color: '#fff'} ]}>로그인하기</Text>
                		</TouchableOpacity>
						
						
						
						
					
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
		
	},
	section1:{
		alignItems:'center',
		
	},
	input:{
		width:width-70,
		height:36,
		marginLeft: 40,
		marginTop:3
	},
	input2:{
		width:width-34,
		height:36,
		marginLeft: 5,
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
export default connect(mapStateToProps)(Register)
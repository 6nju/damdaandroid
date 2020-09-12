import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShoppingCart, faBars, faMinus, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons'
const height = Dimensions.get('window').height
import Header from './components/Header';
import {apis, settings, images} from './configs';
import Navbar from './components/navbar';
import { connect } from 'react-redux'
import { ActionCart } from './redux/ActionCart'
import { Input, CheckBox } from 'react-native-elements';
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
class PayTow extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            products: (this.props.cart == null) ? [] : this.props.cart,
            all_:0,
			products: props.navigation.state.params.products,
			key: -1,
			benefits: '',
			default_shipping:props.navigation.state.params.default_shipping,
			default_billing: props.navigation.state.params.default_billing,
			reward: '',
			pointer: 1,
			kcp: false,
			kcpm: false,
			credit_: 1,
			credit: '',
			search: '',
			user: this.props.user_login,
        }
		apis.getReward(this.state.user.id)
						.then(res => {
							 this.setState({
								 reward: res.data.data
							 })
							  
							
						})
						.catch(err => {
							
							console.log(err.response)
							//return Alert.alert("Thông báo", 'Có lỗi trong quá trình đăng nhập');
						})
						apis.getCredit(this.state.user.id)
						.then(res => {
							 this.setState({
								 credit: res.data.data
							 }) 
							
							
						})
						.catch(err => {
							
							console.log(err.response)
							//return Alert.alert("Thông báo", 'Có lỗi trong quá trình đăng nhập');
						})
		if(typeof this.state.products == 'undefined'){
			this.setState({products: []})
		}
		
	}
	componentDidMount() {
	
	
	let ps = this.state.products
		let total = 0
		for(let i = 0; i < this.state.products.length; i++){
			let price = (ps[i].product.final_price == null) ? ps[i].product.price : ps[i].product.final_price
			total = total + ps[i].value*price
		}
		
		this.setState({
					
			all_:total
		})
    }
	_plus(id) {
		
		let value = this.state.products
		
			value[id].value = value[id].value + 1;
			this.setState({
				products:value
			})
			let ps = this.state.products
		let total = 0
		for(let i = 0; i < this.state.products.length; i++){
			let price = (ps[i].product.final_price == null) ? ps[i].product.price : ps[i].product.final_price
			total = total + ps[i].value*price
		}
		let all_ = total
		   this.setState({
					
					all_:total
		})
		
    }
	
  _minus(id) {
	  let value = this.state.products
		if(value[id].value > 1){
			value[id].value = value[id].value - 1;
			this.setState({
				products:value
			})
		}
		
	let ps = this.state.products
		let total = 0
		for(let i = 0; i < this.state.products.length; i++){
			let price = (ps[i].product.final_price == null) ? ps[i].product.price : ps[i].product.final_price
			total = total + ps[i].value*price
		}
		let all_ = total
		   this.setState({
					
					all_:total
		})
      
    }
	payShip(id) {
		 this.setState({
		  default_shipping: id
		})
	 }
	 defaultBilling(id) {
		 this.setState({
		  default_billing: id
		})
	 }
	_delete(id) {
	 let products = this.state.products
	 products.splice(id, 1);
	 this.setState({
				products:products
			})
			let ps = this.state.products
		let total = 0
		for(let i = 0; i < this.state.products.length; i++){
			let price = (ps[i].product.final_price == null) ? ps[i].product.price : ps[i].product.final_price
			total = total + ps[i].value*price
		}
		
		this.setState({
					
			all_:total
		})
	this.props.dispatch(ActionCart.set_cart(products))
 }
  render() {
    const {goBack} = this.props.navigation;
	const { benefits, pointer, credit_, kcp, kcpm } = this.state
    return (
      <View style={styles.wrapper}>
          

          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7', height: height - 75}}>
         
		   <Header navigation={this.props.navigation} user={this.state.user}/>
			<View style={{paddingTop: 10, paddingBottom: 10, borderBottomColor: '#ddd', borderBottomWidth: 1}}>
			
				<Text style={{width: width, textAlign:'center', fontWeight:'bold'}}>
				주소 
				</Text>
			</View>
			<View style={{width: width, borderBottomColor: '#ddd', borderBottomWidth: 1, height: 150}}>
				<View style={{width: width - 80, marginLeft: 40, height: 2, backgroundColor: '#ddd', marginTop: 80}}>
				
				
				</View>
				<Image  
                style={{width:80,height:80,position: 'absolute', top: 40, left: 20}}
                        source={require('./images/step-ship-1_2.png')}
                      />
					  
					  <Image  
                style={{width:80,height:80,position: 'absolute', top: 40, left: width*0.5 - 40}}
                        source={require('./images/step-ship-2-active_2.png')}
                      />
					   <Image  
                style={{width:80,height:80,position: 'absolute', top: 40, right: 20}}
                        source={require('./images/step-ship-3_2.png')}
                      />
					  
			</View>
		       <Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 15, marginTop: 20, fontSize: 15}}>
				회원혜택
				</Text>	   	
				<View style={{width: width,flexDirection: 'row',flexWrap: 'wrap'}}>
			   
			   
						<View style={[{width: width*0.7 -23, marginLeft: 15,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[styles.section2, {width:width*0.7 -10}]}>
						<TextInput
		                        style={[styles.input]}
		                        placeholder=""
		                        placeholderTextColor="#000"
								returnKeyType="done"
								editable={false}
								selectTextOnFocus={false}
									onChangeText={benefits => this.setState({benefits})}
									value={benefits}
		                      />
						
						</View>
						
						</View>
						<View style={[{width: width*0.3 -10, marginLeft: 10,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[{width:width*0.3 -20, backgroundColor: '#ec5a27', marginTop: 14, paddingTop: 3}]}>
						
						<TouchableOpacity style={[styles.input, { zIndex: 10,height: 36,  marginLeft: 0, width:width*0.3 -20 }]}>
		                      <Text style={{textAlign:'center', fontWeight:'bold', marginTop: 10, fontSize: 12, width:width*0.3 -20, color: '#fff'}}>
				적용
				</Text>
		                  </TouchableOpacity>
						</View>
						
						</View>
						
						</View>	

						<View style={[styles.item_section, {borderBottomColor:'#ddd', borderBottomWidth: 1, borderTopWidth: 0, paddingTop: 0, marginTop: 0, paddingTop: 20, paddingBottom: 20, backgroundColor: '#ddd', marginTop: 15}]}>
			
			  <View style={[{alignItems:'center', width: width/3 - 1, paddingTop:15, paddingBottom: 15}]} onPress={() => this.props.navigation.navigate('Pointer')}>
					<Image  
                style={{width:25, height:25}}
                        source={require('./imgs/point-awards.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5, marginTop: 5}}>
                        담다 포인트
                    </Text>
					  <Text style={{color: '#fb6834', marginLeft: 5, marginTop: 10, fontSize: 14, fontWeight: 'bold'}}>{this.state.reward.replace(/"/g, '')} P</Text>
			  <TouchableOpacity style={[styles.input, { zIndex: 10,height: 36,  marginLeft: 0, width:width*0.3 -40 , backgroundColor: '#ec5a27'}]} onPress={() => { this.setState({key : 0})}}>
		                      <Text style={{textAlign:'center', fontWeight:'bold', marginTop: 10, fontSize: 12, width:width*0.3 -40, color: '#fff'}}>
				적용
				</Text>
		                  </TouchableOpacity>
			  </View>
			  
			
		
				<View style={[{alignItems:'center', width: width/3 - 2, paddingTop:15, paddingBottom: 15}]} onPress={() => this.props.navigation.navigate('Credit')}>
					<Image  
                style={{width:22,height:25,}}
                        source={require('./imgs/point-credit-card.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5, marginTop: 5}}>
                        담다 캐시
                    </Text>
					  <Text style={{color: '#fb6834', marginLeft: 5, marginTop: 10, fontSize: 14, fontWeight: 'bold'}}>{this.state.credit.replace(/"/g, '')} 원</Text>
			  <TouchableOpacity style={[styles.input, { zIndex: 10,height: 36,  marginLeft: 0, width:width*0.3 -40 , backgroundColor: '#ec5a27'}]} onPress={() => { this.setState({key : 1})}}>
		                      <Text style={{textAlign:'center', fontWeight:'bold', marginTop: 10, fontSize: 12, width:width*0.3 -40, color: '#fff'}}>
				적용
				</Text>
		                  </TouchableOpacity>
			  </View>
			  
			  <View style={[{alignItems:'center', width: width/3 - 1,borderColor: '#ddd', paddingTop:15, paddingBottom: 15}]}  onPress={() => this.props.navigation.navigate('Coupon')} onPress={() => {this.setState({key : 1})}}>
					<Image  
                style={{width:40,height:25,}}
                        source={require('./imgs/discount-code.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5, marginTop: 5}}>
                        
                        쿠폰 코드
                    
                    </Text>
					  <Text style={{color: '#fb6834', marginLeft: 5, marginTop: 10, fontSize: 14, fontWeight: 'bold'}}>0 원</Text>
				<TouchableOpacity style={[styles.input, { zIndex: 10,height: 36,  marginLeft: 0, width:width*0.3 -40 , backgroundColor: '#ec5a27'}]}>
		                      <Text style={{textAlign:'center', fontWeight:'bold', marginTop: 10, fontSize: 12, width:width*0.3 -40, color: '#fff'}}>
				적용
				</Text>
		                  </TouchableOpacity>
			 </View>
			
        </View>
						
						{
							(this.state.key == 0) ?
							<View>
							
							<Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 15, marginTop: 20, fontSize: 15}}>
				담다 포인트를 선택해주세요
				</Text>	   	
				<Text style={{width: width, textAlign:'left',  marginLeft: 15, marginTop: 5, fontSize: 14, color: '#888'}}>
				최대 사용 가능 포인트 {this.state.reward.replace(/"/g, '')} Pointer
				</Text>	   	
				<View style={{width: width,flexDirection: 'row',flexWrap: 'wrap'}}>
			   
			   
						<View style={[{width: width*0.7 -23, marginLeft: 15,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[styles.section2, {width:width*0.7 -10}]}>
						<TextInput
		                        style={[styles.input]}
		                        placeholder=""
		                        placeholderTextColor="#000"
								returnKeyType="done"
								editable={false}
								selectTextOnFocus={false}
									onChangeText={pointer => this.setState({pointer})}
									value={this.state.pointer}
		                      />
						
						</View>
						
						</View>
						<View style={[{width: width*0.3 -10, marginLeft: 10,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[{width:width*0.3 -20, backgroundColor: '#ec5a27', marginTop: 14, paddingTop: 3}]}>
						
						<TouchableOpacity style={[styles.input, { zIndex: 10,height: 36,  marginLeft: 0, width:width*0.3 -20 }]}>
		                      <Text style={{textAlign:'center', fontWeight:'bold', marginTop: 10, fontSize: 12, width:width*0.3 -20, color: '#fff'}}>
				적용
				</Text>
		                  </TouchableOpacity>
						</View>
						
						</View>
						
						</View>	
							</View>
							
							: null
						}		
						{
							(this.state.key == 1) ?
							<View>
							
							<Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 15, marginTop: 20, fontSize: 15}}>
				담다캐시를 선택해주세요
				</Text>	   	
				<Text style={{width: width, textAlign:'left',  marginLeft: 15, marginTop: 5, fontSize: 14, color: '#888'}}>
				최대 사용 가능 포인트 {this.state.credit.replace(/"/g, '')} 
				</Text>	   	
				<View style={{width: width,flexDirection: 'row',flexWrap: 'wrap'}}>
			   
			   
						<View style={[{width: width*0.7 -23, marginLeft: 15,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[styles.section2, {width:width*0.7 -10}]}>
						<TextInput
		                        style={[styles.input]}
		                        placeholder=""
		                        placeholderTextColor="#000"
								returnKeyType="done"
								editable={false}
								selectTextOnFocus={false}
									onChangeText={credit_ => this.setState({credit_})}
									value={this.state.credit_}
		                      />
						
						</View>
						
						</View>
						<View style={[{width: width*0.3 -10, marginLeft: 10,flexDirection: 'row',flexWrap: 'wrap'}]}>
						<View style={[{width:width*0.3 -20, backgroundColor: '#ec5a27', marginTop: 14, paddingTop: 3}]}>
						
						<TouchableOpacity style={[styles.input, { zIndex: 10,height: 36,  marginLeft: 0, width:width*0.3 -20 }]}>
		                      <Text style={{textAlign:'center', fontWeight:'bold', marginTop: 10, fontSize: 12, width:width*0.3 -20, color: '#fff'}}>
				적용
				</Text>
		                  </TouchableOpacity>
						</View>
						
						</View>
						
						</View>	
							</View>
							
							: null
						}	
						
					<Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 15, marginTop: 20, fontSize: 15, color: '#ec5a27'}}>
				결제 방법
				</Text>	  
		<Text style={{width: width, textAlign:'left', fontWeight:'bold', paddingLeft: 15,paddingBottom: 10, marginTop: 10, fontSize: 13, color: '#888', borderBottomColor:'#ddd', borderBottomWidth: 1,}}>
				결제 방법을 선택해주세요
				</Text>	 
<View style={[styles.checkboxContainer, {width: width*.5,  flexDirection: "row",}]}>
					<CheckBox
                      checkedIcon={<Image source={require('./images/checked.png')} />}
                      uncheckedIcon={<Image source={require('./images/unchecked.png')} />}
                      checked={(kcp) ? true : false}
                      onPress={() => {this.setState({kcp: !this.state.kcp  })}}
                    />
						
						<Text style={[styles.label, {marginTop: 20}]}>KCP 결제</Text>
					  </View>	

						{ (this.state.kcp) ? 
						<View>
						<Text style={{width: width, textAlign:'left', fontWeight:'bold', paddingLeft: 15,paddingBottom: 10, marginTop: 10, fontSize: 13, color: '#888', borderBottomColor:'#ddd', borderBottomWidth: 1,}}>
				선택
				</Text>	
						<View style={[styles.checkboxContainer, {width: width*.5,  flexDirection: "row",}]}>
						
					<CheckBox
                      checkedIcon={<Image source={require('./images/checked.png')} />}
                      uncheckedIcon={<Image source={require('./images/unchecked.png')} />}
                      checked={(kcpm) ? true : false}
                      onPress={() => {this.setState({kcpm: !this.state.kcpm  })}}
                    />
						
						<Text style={[styles.label, {marginTop: 20}]}>신용카드</Text>
					  </View></View> : null
					  }
						
		            <TouchableOpacity style={styles.buy_now} onPress={() => this.props.navigation.navigate('PayThree', {products : this.state.products, default_billing: this.state.default_billing, default_shipping: this.state.default_shipping})}>
		            	<Text style={styles.buy_now_text}>신용카드
                        </Text>
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
		flex: 1,
		height: height
	},
	item_section:{
  		
  		flexDirection:'row',
  		flexWrap:'wrap',
  		
  	},
 	header_section:{
	    flexDirection:'row',
	    flexWrap:'wrap',
	    backgroundColor:'#fff',
	    paddingTop:5,
	    paddingBottom:5,
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
	scrollview_section: {
		height:height + 200
	},
	header_left:{
	    alignItems:'center',
	    width:width*0.1,
	},
  	header_right:{
	    alignItems:'flex-start',
	    width:width*0.1,
  	},
  	header_middle:{
    	width:width*0.7,
  	},
  	cart_box:{
  		flexDirection:'row',
  		flexWrap:'wrap',
  		marginLeft:15,
	    marginRight:15,
	    backgroundColor:'#fff',
	    shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,
		elevation: 2,
		marginBottom:10,
		marginTop:10,
  	},
  	item_title:{
      marginLeft:15,
      marginTop:15,
      textTransform: 'uppercase',
      color:'#0f1738',
    },
    item_price:{
      marginLeft:15,
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
    },
    item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
      marginLeft:15,
      marginTop:10,
    },
    cart_item_image:{
    	width:(width-30)*0.35,
    	alignItems:'center',
    	justifyContent:'center',
    },
    cart_item_title:{
    	width:(width-30)*0.35,
    },
    cart_item_quantity:{
      flexDirection:'row',
      flexWrap:'wrap',
      position: 'absolute',
      right:10,
      bottom:10,
      zIndex:1000,
  	},
	 quantity:{
	    alignItems:'center',
	    justifyContent:'center',
	    marginLeft:8,
	    marginRight:8,
	},
	exit:{
		position: 'absolute',
      	right:10,
      	top:10,
	},
	buy_now:{
		marginLeft:15,
		marginRight:15,
		alignItems:'center',
		backgroundColor:'#ec5a27',
		borderRadius:10,
		marginTop:25,
		marginBottom:90,
	},
	buy_now_text:{
		paddingBottom:10,
		paddingTop:10,
		color:'#fff',
		fontSize:18,
		textTransform:'uppercase',
		fontWeight:'bold',
	},
	bottom_bar:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderTopColor:'#e6e6e6',
    borderTopWidth:2,
    position:'absolute',
    bottom:0,
    backgroundColor:'#f8f8f8',
    paddingBottom:30,
  },
  width25:{
    width:width*0.25,
    alignItems:'center',
    marginTop:5,
  },
  bottom1:{
    color:'#8d8d8d',
    fontSize:12,
  },
  container:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  header:{
    backgroundColor:'#ed7ca8',
    paddingTop:30,
  },
  hsection1:{
    width:width*0.1,
    alignItems:'center',
    justifyContent: 'center',
  },
  hsection2:{
    width:width*0.8,
  },
  hsection3:{
    width:width*0.1,
    alignItems:'center',
    justifyContent: 'center',
  },
  cartitem:{
    backgroundColor:'#f7f7f7', 
    paddingBottom:15,
    marginTop:15,
	borderBottomWidth:1, 
	borderBottomColor: '#ddd'
  },
  cimage:{
    alignItems:'center',
    marginTop:15,
  },
  csection1:{
    width:width*0.4,
  },
  csection2:{
    width:width*0.6,
  },
  price:{
    color:'#ed7ca8',
    fontWeight:'bold',
  },
  cnumber:{
    alignItems:'center',
  },
  camouth:{
   paddingLeft:10,
   paddingRight:10,
   paddingTop:5,
   paddingBottom:5,
   borderWidth:1,
   borderColor:'#909090',
   textAlign:'center',
   marginLeft:15,
   marginRight:15,
  },
  mgleft:{
    marginLeft:50,
    marginTop:50,
  },
  ctext:{
    fontSize:18,
    color:'#363636',
  },
  cdelete:{
    alignItems:'flex-end',
    marginRight:10,
    marginTop:5,
  },
  totalsection:{
    marginTop:15,
    marginBottom:50,
  },
  totaltext:{
    width:width*0.5,
    color:'#363636',
    fontWeight:'bold',
    paddingLeft:15,
  },
  total:{
    width:width*0.5,
    color:'#ed7ca8',
    fontWeight:'bold',
    textAlign:'right',
    paddingRight:15,
  },
  buynow:{
    backgroundColor:'#5bc8ac',
    marginLeft:15,
    marginRight:15,
    justifyContent:'center',
    alignItems:'center',
    height:width*0.1,
    marginBottom:10,
  },
  bntext:{
    color:'#fff',
    textTransform: 'uppercase',
  }, 
});
export default connect(mapStateToProps)(PayTow)
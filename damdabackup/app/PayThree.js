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
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
class PayThree extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            products: (this.props.cart == null) ? [] : this.props.cart,
            all_:0,
			products: props.navigation.state.params.products,
			default_shipping:props.navigation.state.params.default_shipping,
			default_billing: 1,
			address: (this.props.user_login) ? this.props.user_login.user.addresses : [],
        }
		
		if(typeof this.state.products == 'undefined'){
			this.setState({products: []})
		}
		
	}
	componentDidMount() {
	let address = this.state.address
	for(let a = 0; a < address.length; a++){
		if(address[a].default_shipping){
			this.setState({default_shipping: a})
		}
		if(address[a].default_billing){
			
			this.setState({default_billing: a})
		}
	}
	
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
                        source={require('./images/step-ship-2_2.png')}
                      />
					   <Image  
                style={{width:80,height:80,position: 'absolute', top: 40, right: 20}}
                        source={require('./images/step-ship-3-active_2.png')}
                      />
					
			</View>
			<Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 10, marginTop: 20, fontSize: 15}}>
				주문금액
				</Text>
				
				<View style={styles.item_section}>
			   	
				 <View style={{width: width*.5 - 10,marginLeft:10, marginTop: 10, backgroundColor: '#f7f7f7'}}>
					
					<Text style={{color: '#000',width: width*.5 - 10,textAlign: 'left', fontWeight:'bold', marginTop:5}}>
						  합계
						  
                    </Text>
					</View>
					<View style={{width: width*.5 - 10, paddingRight:10,marginTop: 10,paddingBottom: 10, paddingTop: 10, backgroundColor: '#f7f7f7'}}>
					
					<Text style={{color: '#fb6834',width: width*.5 - 10,textAlign: 'right', fontWeight:'bold', fontSize: 16}}>
						  {this.state.all_}원
						  
                    </Text>
					</View>
				 </View>
				
				<View style={[styles.item_section, {marginTop: -12}]}>
			   	
				 <View style={{width: width*.5 - 10,marginLeft:10, marginTop: 10}}>
					
					<Text style={{color: '#000',width: width*.5 - 10,textAlign: 'left', fontWeight:'bold', marginTop:5}}>
						  배송비
						  
                    </Text>
					</View>
					<View style={{width: width*.5 - 10, paddingRight:10,paddingBottom: 10, paddingTop: 10, backgroundColor: '#f7f7f7'}}>
					
					<Text style={{color: '#fb6834',width: width*.5 - 10,textAlign: 'right', fontWeight:'bold', fontSize: 16}}>
						  {this.state.address[this.state.default_shipping].postcode}원
						  
                    </Text>
					</View>
				 </View>
				<View style={[styles.item_section, {marginTop: -12}]}>
			   	
				 <View style={{width: width*.5 - 10,marginLeft:10, marginTop: 10}}>
					
					<Text style={{color: '#000',width: width*.5 - 10,textAlign: 'left', fontWeight:'bold', marginTop:5}}>
						  할인
						  
                    </Text>
					</View>
					<View style={{width: width*.5 - 10, paddingRight:10,paddingBottom: 10, paddingTop: 10, backgroundColor: '#f7f7f7'}}>
					
					<Text style={{color: '#fb6834',width: width*.5 - 10,textAlign: 'right', fontWeight:'bold', fontSize: 16}}>
						  0원
						  
                    </Text>
					</View>
				 </View>
				<View style={[styles.item_section, {marginTop: -12}]}>
			   	
				 <View style={{width: width*.5 - 10,marginLeft:10, marginTop: 10}}>
					
					<Text style={{color: '#000',width: width*.5 - 10,textAlign: 'left', fontWeight:'bold', marginTop:5}}>
						  담다포인트
						  
                    </Text>
					</View>
					<View style={{width: width*.5 - 10, paddingRight:10,paddingBottom: 10, paddingTop: 10, backgroundColor: '#f7f7f7'}}>
					
					<Text style={{color: '#fb6834',width: width*.5 - 10,textAlign: 'right', fontWeight:'bold', fontSize: 16}}>
						  0P
						  
                    </Text>
					</View>
				 </View>
		       <View style={styles.item_section}>
			   	
				 <View style={{width: width*.5 - 10,marginLeft:10, marginTop: 10,paddingBottom: 10, paddingTop: 10, backgroundColor: '#f7f7f7'}}>
					
					<Text style={{color: '#000',width: width*.5 - 10,textAlign: 'left', fontWeight:'bold', marginTop:5}}>
						  결제 예정 금액
						  
                    </Text>
					</View>
					<View style={{width: width*.5 - 10, paddingRight:10,marginTop: 10,paddingBottom: 10, paddingTop: 10, backgroundColor: '#f7f7f7'}}>
					
					<Text style={{color: '#fb6834',width: width*.5 - 10,textAlign: 'right', fontWeight:'bold', fontSize: 20}}>
						  {this.state.all_}원
						  
                    </Text>
					</View>
				 </View>
				{
				this.state.products.map((val, index) => {
						let img_ = 'https://www.seoulmall.kr/pub/media/catalog/product'+val.product.media_gallery_entries[0].file
						let name = val.product.name
						

				return(
		              <View style={[styles.container,styles.cartitem]}>
                              <View style={styles.csection1}>
                                  <View style={styles.cimage}>
                                   
                                        <Image 
												 style={{marginLeft: width*0.01}}
									 source={{uri: img_,width: width*0.36, height: width*0.36}}/>
                                    
                                  </View>
                              </View>
                              <View style={styles.csection2}>
                                    <TouchableOpacity style={styles.cdelete}  onPress={this._delete.bind(this, index)}>
                                          <FontAwesomeIcon icon={ faTimes } size={15} color={'#909090'} />
                                    </TouchableOpacity>
                                    <Text style={styles.ctext}>{val.product.name}</Text>
                                      <View style={[styles.cnumber,styles.container]}>
									  
                                            
											 <Text style={[styles.ctext, {fontSize: 14,textDecorationLine: 'line-through', color:'#7f7f7f', paddingTop:15, width:70}]}>{val.product.price}원</Text>
												 <Text style={[styles.ctext, {fontSize: 16, color:'#fb6834', position: 'absolute', top: 10, left: 0}]}>{val.product.final_price}원</Text>
                                            <TouchableOpacity style={styles.mgleft}>
                                                  <FontAwesomeIcon icon={ faMinus } size={20} color={'#909090'}  key={index} onPress={this._minus.bind(this, index)}/>
                                            </TouchableOpacity>
                                            <View>
                                                  <Text style={styles.camouth}>{val.value}</Text>
                                            </View>
                                            <TouchableOpacity>
                                                  <FontAwesomeIcon icon={ faPlus } size={20} color={'#909090'}  key={index} onPress={this._plus.bind(this, index)}/>
                                            </TouchableOpacity>
                                      </View>
                              </View>
                        </View>
		            		       )
				})
						}		
				   	
						{
					this.state.address.map((val, index_) => {
						if(index_ == this.state.default_shipping){
						return (
						<View style={{marginTop: 10, borderBottomColor: '#ddd', borderBottomWidth: 1}}>
						<Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 15, marginTop: 20, fontSize: 15}}>
				배송지
				</Text>	
			  
					<Text style={[styles.title, {color: '#000', fontSize: 14, bottom: -2, left: 15, fontWeight: 'bold'}]}>
						{val.firstname}{val.lastname}
					</Text>
				  
				  
				
				  
					  
					<Text style={{color: '#000',marginTop: 10,  width: width - 25,  paddingLeft: 15}}>
						  {val.street[0]}
                    </Text>
					
					<Text style={{color: '#000',marginTop: 2,  width: width - 25, paddingBottom: 10, paddingLeft: 15}}>
						   {val.telephone}
                    </Text>
					
				
				 
			 </View>
			  )
			  
						}else if(index_ == this.state.default_billing){
							return (
						<View style={{marginTop: 10, borderBottomColor: '#ddd', borderBottomWidth: 1}}>
						<Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 15, marginTop: 20, fontSize: 15}}>
				청구지 주소
				</Text>	
			  
					<Text style={[styles.title, {color: '#000', fontSize: 14, bottom: -2, left: 15, fontWeight: 'bold'}]}>
						{val.firstname}{val.lastname}
					</Text>
				  
				  
				
				  
					  
					<Text style={{color: '#000',marginTop: 10,  width: width - 25,  paddingLeft: 15}}>
						  {val.street[0]}
                    </Text>
					
					<Text style={{color: '#000',marginTop: 2,  width: width - 25, paddingBottom: 10, paddingLeft: 15}}>
						   {val.telephone}
                    </Text>
					
				
				 
			 </View>
			  )
						}
					})
				}

		            <TouchableOpacity style={styles.buy_now} onPress={() => this.props.navigation.navigate('PayTow', {products : this.state.products, default_billing: this.state.default_billing, default_shipping: this.state.default_shipping})}>
		            	<Text style={styles.buy_now_text}>계속하기
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
export default connect(mapStateToProps)(PayThree)
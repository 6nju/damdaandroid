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
class Pay extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            products: (this.props.cart == null) ? [] : this.props.cart,
            all_:0,
			products: props.navigation.state.params.products,
			default_shipping: -1,
			default_billing: -1,
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
			<View style={{width: width, borderBottomColor: '#ddd', borderBottomWidth: 1}}>
				<View style={{width: width - 80, marginLeft: 40, height: 2, backgroundColor: '#ddd', marginTop: 80}}>
				
				
				</View>
				<Image  
                style={{width:80,height:80,position: 'absolute', top: 40, left: 20}}
                        source={require('./images/step-ship-1-active_2.png')}
                      />
					  
					  <Image  
                style={{width:80,height:80,position: 'absolute', top: 40, left: width*0.5 - 40}}
                        source={require('./images/step-ship-2_2.png')}
                      />
					   <Image  
                style={{width:80,height:80,position: 'absolute', top: 40, right: 20}}
                        source={require('./images/step-ship-3_2.png')}
                      />
					  <TouchableOpacity style={[styles.buy_now, {backgroundColor: '#000', marginTop: 60, marginBottom: 10}]}     onPress={() => this.props.navigation.navigate('NewAddress')}>
		            	<Text style={styles.buy_now_text}>배송지 추가</Text>
		            </TouchableOpacity>	
			</View>
		       <Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 15, marginTop: 20, fontSize: 12}}>
				배송지 주소 선택
				</Text>	   	
						{
					this.state.address.map((val, index_) => {
						return (
						<View>
						
			  <View style={[{width: width,backgroundColor:'#f7f7f7', borderBottomWidth: 1,  borderColor: '#ddd', paddingTop:10, paddingBottom: 5}]}>
					<View style={ [styles.formGroup, {height: 40, position: 'relative'}] }>
					<TouchableOpacity  style={ [styles.itemInput, {position: 'relative', marginTop: 10,height: 30, width: width}] }  onPress={this.payShip.bind(this, index_)}>
					<View style={{
					  height: 20,
					  width: 20,
					  borderRadius: 10,
					  borderWidth: 1,
					  borderColor: '#757F8C',
					  alignItems: 'center',
					  justifyContent: 'center',
					  position: 'absolute',
					  bottom: 7,
					  left: 10
					}}>
					  {
						index_ == this.state.default_shipping ?
						  <View style={{
							height: 14,
							width: 14,
							borderRadius: 7,
							backgroundColor: '#ec5a27',
						  }} />
						  : null
					  }
					</View>
					<Text style={[styles.title, {color: '#000', fontSize: 14, bottom: -2, left: 40, fontWeight: 'bold'}]}>
						{val.firstname}{val.lastname}
					</Text>
				  </TouchableOpacity>
				  
				
				  </View>
					  
					<Text style={{color: '#000',marginTop: 2,  width: width - 25, paddingBottom: 10, paddingLeft: 15}}>
						  {val.street[0]} {val.telephone}
                    </Text>
					
					
					
				 </View>
				 
			 </View>
			  )
					})
				}
				
				<Text style={{width: width, textAlign:'left', fontWeight:'bold', marginLeft: 15, marginTop: 20, fontSize: 12}}>
				청구지 주소 선택
				</Text>	   	
						{
					this.state.address.map((val, index_) => {
						return (
						<View>
						
			  <View style={[{width: width,backgroundColor:'#f7f7f7', borderBottomWidth: 1,  borderColor: '#ddd', paddingTop:10, paddingBottom: 5}]}>
					<View style={ [styles.formGroup, {height: 40, position: 'relative'}] }>
					<TouchableOpacity  style={ [styles.itemInput, {position: 'relative', marginTop: 10,height: 30, width: width}] } onPress={this.defaultBilling.bind(this, index_)}>
					<View style={{
					  height: 20,
					  width: 20,
					  borderRadius: 10,
					  borderWidth: 1,
					  borderColor: '#757F8C',
					  alignItems: 'center',
					  justifyContent: 'center',
					  position: 'absolute',
					  bottom: 7,
					  left: 10
					}}>
					  {
						index_ == this.state.default_billing ?
						  <View style={{
							height: 14,
							width: 14,
							borderRadius: 7,
							backgroundColor: '#ec5a27',
						  }} />
						  : null
					  }
					</View>
					<Text style={[styles.title, {color: '#000', fontSize: 14, bottom: -2, left: 40, fontWeight: 'bold'}]}>
						{val.firstname}{val.lastname}
					</Text>
				  </TouchableOpacity>
				  
				
				  </View>
					  
					<Text style={{color: '#000',marginTop: 2,  width: width - 25, paddingBottom: 10, paddingLeft: 15}}>
						  {val.street[0]} {val.telephone}
                    </Text>
					
					
					
				 </View>
				 
			 </View>
			  )
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
export default connect(mapStateToProps)(Pay)
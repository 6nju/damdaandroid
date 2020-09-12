import React from 'react';
import { StyleSheet, Text, Alert, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShoppingCart, faBars, faMinus, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons'
const height = Dimensions.get('window').height
import Header from './components/Header';
import {apis, settings, images} from './configs';
import Navbar from './components/navbar';
import { connect } from 'react-redux'
import { ActionYeuThich } from './redux/ActionYeuThich'
import { ActionCart } from './redux/ActionCart'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
	yeu_thich: state.yeu_thich,
})
class Love extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            products: (this.props.yeu_thich == null) ? [] : this.props.yeu_thich,
			cart: (this.props.cart) ? this.props.cart : [], 
        }
		if(typeof this.state.products == 'undefined'){
			this.setState({products: []})
		}
		
	}
	_plus(id) {
		
		let value = this.state.products
		
			value[id].value = value[id].value + 1;
			this.setState({
				products:value
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
	
      
    }
	_delete(id) {
	 let products = this.state.products
	 products.splice(id, 1);
	 this.setState({
				products:products
			})
	this.props.dispatch(ActionYeuThich.set_yeu_thich(products))
 }
 _add(id) {
		this.setState({changecart: true})
		
		let product = []
		let key = 0;
		if(typeof this.state.cart == 'undefined' || this.state.cart.length == 0){
			product = []
			product.push({product: this.state.products[id], value: 1})	
			
		}else{
			product = this.state.cart
			
			for(let i = 0; i < product.length; i++){
				if(product[i].product.id == this.state.products[id].id){
					key = 1;
				}
			}
			if(key == 0){
			product.push({product: this.state.products[id], value: 1})	
			}
		}
		Alert.alert("Thông báo", "Đã thêm sản phẩm vào giỏ hàng");
		this.props.dispatch(ActionCart.set_cart(product))
		this.setState({changecart: false})
		this.props.navigation.navigate('List')
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
				장바구니
				</Text>
			</View>
			
			
		          		{
				this.state.products.map((val, index) => {
						let img_ = 'https://www.seoulmall.kr/pub/media/catalog/product'+val.product.media_gallery_entries[0].file
						let name = val.product.name

				return(
		              <View style={[styles.container,styles.cartitem]}>
                              <TouchableOpacity style={styles.csection1} onPress={() => this.props.navigation.navigate('Detail', {product: val.product})}>
                                  <View style={styles.cimage}>
                                   
                                        <Image 
												 style={{marginLeft: width*0.01}}
									 source={{uri: img_,width: width*0.36, height: width*0.36}}/>
                                    
                                  </View>
                              </TouchableOpacity>
                              <View style={styles.csection2}>
                                    <TouchableOpacity style={styles.cdelete}  onPress={this._delete.bind(this, index)}>
                                          <FontAwesomeIcon icon={ faTimes } size={15} color={'#909090'} />
                                    </TouchableOpacity>
                                    <Text style={styles.ctext}>{val.product.name}</Text>
                                      <View style={[styles.cnumber,styles.container]}>
									  
                                            
											 <Text style={[styles.ctext, {fontSize: 14,textDecorationLine: 'line-through', color:'#7f7f7f', paddingTop:15, width:70}]}>{val.product.price}원</Text>
												 <Text style={[styles.ctext, {fontSize: 16, color:'#fb6834', position: 'absolute', top: 40, left: 0}]}>{val.product.final_price}원</Text>
                                            <TouchableOpacity style={[styles.mgleft, {zIndex: 1000,width:30,height:32,position: 'absolute', top: -30, right: 20}]}  onPress={this._add.bind(this, index)}>
                                                  <Image 
                style={{width:30,height:32,position: 'absolute'}}
                        source={require('./imgs/id-add-cart.png')}
                      />
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
		flex: 1
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
		backgroundColor:'#ed7ca8',
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
    backgroundColor:'#fff', 
    paddingBottom:15,
    marginTop:15,
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
export default connect(mapStateToProps)(Love)
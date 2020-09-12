import React from 'react';
import { StyleSheet, Text,Alert, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import {apis, settings, images} from './configs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShoppingCart, faBars, faMinus, faPlus, faAngleRight, faAngleLeft,faHeart } from '@fortawesome/free-solid-svg-icons'
import Header from './components/Header';
import Navbar from './components/navbar';
import WebView from 'react-native-webview';
import { connect } from 'react-redux'
import LoadingCircular from './components/Loading';
import { ActionCart } from './redux/ActionCart'
import { ActionYeuThich } from './redux/ActionYeuThich'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
	yeu_thich: state.yeu_thich,
})
class Detail extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      sonCategories: [],
      related: [],
      webViewHeight: 0,
      changecart: false,
      webViewHeight_: 0,
      comments: [],
      slider: [],
      product: this.props.navigation.state.params.product,
	  info: [],
      type:0,
      value:1,
      count_comment:0,
      color:[],
      progess:true,
      link:'',
      
      yeuthich: (this.props.yeu_thich) ? this.props.yeu_thich : [], 
      cart: (this.props.cart) ? this.props.cart : [], 
      navigation: this.props.navigation,
    };
	let id = (this.state.product.photo_id != null) ? this.state.product.photo_id : this.state.product.id 
	
	apis.getProduct(id).then(res => {
			
		this.setState({
			info: res.data.data[0],
			progess: false,
		}) 
			
			
	})
  }
  _minus = () => {
		let value = this.state.value
		if(this.state.value > 1){
			value = value - 1;
			this.setState({
				value:value
			})
		}
	}
	_plus = () => {
		
		let value = this.state.value
		
			value = value + 1;
			this.setState({
				value:value
			})
		
	}
	_yeuthich = () => {
		
		let product = []
		let key = 0;
		if(typeof this.state.yeuthich == 'undefined' || this.state.yeuthich.length == 0){
			product = []
			product.push({product: this.state.product})	
			
		}else{
			product = this.state.yeuthich
			
			for(let i = 0; i < product.length; i++){
				if(product[i].product.id == this.state.product.id){
					key = 1;
				}
			}
			if(key == 0){
				product.push({product: this.state.product})	
			}
		}
		Alert.alert("Thông báo", "Bạn Đã Thêm Sản Phẩm Này Vào Mục Ưa Thích.");
		this.props.dispatch(ActionYeuThich.set_yeu_thich(product))

	}
	_add = () => {
		this.setState({changecart: true})
		
		let product = []
		let key = 0;
		if(typeof this.state.cart == 'undefined' || this.state.cart.length == 0){
			product = []
			product.push({product: this.state.product, value: this.state.value})	
			
		}else{
			product = this.state.cart
			
			for(let i = 0; i < product.length; i++){
				if(product[i].product.id == this.state.product.id){
					key = 1;
				}
			}
			if(key == 0){
			product.push({product: this.state.product, value: this.state.value})	
			}
		}
		Alert.alert("Thông báo", "Đã thêm sản phẩm vào giỏ hàng");
		this.props.dispatch(ActionCart.set_cart(product))
		this.setState({changecart: false})
		this.props.navigation.navigate('List')
	}
	
	onWebViewMessage = (event: WebViewMessageEvent) => {
		
		this.setState({webViewHeight: Number(event.nativeEvent.data), progess:false})
	  }
	  onWebViewMessage_ = (event: WebViewMessageEvent) => {
		
		this.setState({webViewHeight_: Number(event.nativeEvent.data), progess:false})
	  }
  render() {
    const {goBack, progess} = this.props.navigation;
	
	if (this.state.progess) return <LoadingCircular />;
	else {
		let img
		let name
		for(let i = 0; i < this.state.info.vendor_config.length; i++){
											
											if(this.state.info.vendor_config[i].path == 'general/store_information/logo'){
												img = { uri: this.state.info.vendor_config[i].value }	
												
												}
												if(this.state.info.vendor_config[i].path == 'general/store_information/name'){
												name = this.state.info.vendor_config[i].value	
												
												}
												
												
											
										}
										let img_
									if(Array.isArray(this.state.info.source)){
										img_ = { uri: this.state.info.source[0].url }
									}else{
										img_ = { uri: this.state.info.source }	
										
									}
    return (
      
        <View style={styles.wrapper}>
          

          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7', height: height - 75}}>
         
		   <Header navigation={this.props.navigation} user={this.state.user}/>
			<View style={{marginBottom: 20}}>
		   <View style={[styles.csection1,{marginTop: 10, marginBottom: 0}]}>
                                                 <View style={styles.cimage}>
												 <Image 
												  style={[styles.cimage, {marginLeft:10,borderRadius: 35, marginTop:-1,width: 70, height: 70}]}
									 source={img}/>
												 </View>
												 
									<View style={{marginLeft: 10, position: 'absolute', left: 80, top: 10}}>
                                                 <Text style={[styles.ctext, {fontSize: 16,fontWeight: 'bold', color:'#000'}]}>{name}{'\n'}<Text style={{color: '#ddd'}}>12.00</Text></Text>
                                                
									</View>
                                            </View>
											 <TouchableOpacity style={[{width: 50,height:50, position: 'absolute',zIndex: 1000, right: 20, top: 20}]}>
					 <Image
                                            style={[styles.simage, {width: 50,height:50}]}
                                            source={require('./imgs/ic_follow_off.png')}
                                        />
					 
					</TouchableOpacity>
			</View>
              <Image style={{width: width, height: width, marginTop: 0}}
									 source={img_}/>
          <View style={{marginLeft: 10}}>
                                                 <Text style={[styles.ctext, {fontSize: 16,fontWeight: 'bold', color:'#000'}]}>좋아요 {this.state.info.likes}</Text>
												 <Text style={[styles.ctext, {fontSize: 13,color:'#000'}]}>{this.state.info.caption}</Text>
                                                
									</View>
									<View style={styles.search}>
                              
							  <TextInput style = {[styles.sinput, {borderColor: '#ddd', borderWidth: 1, width: width - 20, marginLeft: 10, borderRadius: 10, marginTop: 10}]}
                     placeholder = "댓글 달기"
                     placeholderTextColor = "#8D8D8D"
					 onChangeText={(search) => this.setState({ search })}
					 value={this.state.search}
                     autoCapitalize = "none"
                  />
							  <TouchableOpacity style={[styles.search_icon, {width:30,height:30, zIndex: 1000,top: -35, right: -(width - 45)}]}  onPress={() => {
							
							 
						  }}>
                    <Text style={{color: '#F39B68', fontWeight: 'bold'}}>게시</Text>
                  </TouchableOpacity>
                        </View>
						{
									this.state.info.customer_comments.map((val_, index_) => {
										
									
											
										
                                         
										return (
                <View style={{paddLeft: 10, paddingBottom: 15, paddingTop: 15,borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
                                                 <Text style={[styles.ctext, {fontSize: 16,fontWeight: 'bold', color:'#000', marginLeft: 10}]}>{val_.customer_name}</Text>
												 <Text style={[styles.ctext, {fontSize: 13,color:'#000', marginLeft: 10}]}>{val_.content}</Text>  
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
}

const styles = StyleSheet.create({
  scrollview_section:{
    backgroundColor:'#F7F7F7',
    marginBottom:100,
	height: height - 80,
  },
  header_section:{
    flexDirection:'row',
    flexWrap:'wrap',
    backgroundColor:'#fff',
    paddingTop:5,
    paddingBottom:5,
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
  wrapper: {
	  flex:1,
  },
  item_slide_wrapper:{
      height:height*0.68,
  },
  slide1:{
    width:width-15,
  },
  slide_wrapper:{
    paddingLeft:7,
    paddingRight:7,
    paddingTop:5,
  },
  item_info_section:{
    marginLeft:15,
  },  
  item_title:{
      
      textTransform: 'uppercase',
      color:'#0f1738',
      fontSize:18,
  },
  item_price:{
     
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
      fontSize:16,
  },
  item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
     
      marginTop:10,
  },
  item_quantity:{
      flexDirection:'row',
      flexWrap:'wrap',
      position: 'absolute',
      right:10,
      bottom:10,
  },
  quantity:{
    alignItems:'center',
    justifyContent:'center',
    marginLeft:8,
    marginRight:8,
  },
  item_code:{
    justifyContent:'center',
    backgroundColor:'#FFC400',
    height:45,
  },
  item_code_download:{
    position: 'absolute',
    right:10,
  },
  code:{
    marginLeft:20,
    fontSize:14,
    color:'#0F1738',
    fontWeight:'normal',
  },
  item_h1:{
    paddingLeft:15,
    fontSize:15,
    fontWeight:'700',
    backgroundColor:'#DDDDDD',
    color:'#0F1738',
    paddingTop:10,
    paddingBottom:10,
  },
  item_p1:{
    paddingLeft:20,
    paddingRight:20,
    color:'#707070',
    marginTop:25,
    marginBottom:25,
  },
  red:{
    color:'#DB0D0D'
  },
  green:{
    color:'#079D1E',
  },
  similar_item:{
    flexDirection:'row',
    flexWrap:'wrap',
    marginTop:10,
    paddingBottom:10,
    borderBottomWidth:1,
    borderBottomColor:'#dddddd'
  },
  si_left:{
    width:width*0.3,
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:15,
    paddingRight:15,
  },
  si_item_title:{
    fontSize:14,
  },
  si_center:{
    width:width*0.35,
  },
  si_right:{
    width:width*0.35,
    paddingRight:7,
    paddingLeft:7,
  },
  cart_button:{
    borderWidth:1,
    borderColor:'#3191cf',
    backgroundColor:'#d0ecff',
    borderRadius:20,
    paddingTop:5,
    paddingBottom:5,
    alignItems:'center',
    marginTop:5,
  },
  buynow_button:{
    borderWidth:1,
    borderColor:'#ffc400',
    backgroundColor:'#ffc400',
    borderRadius:20,
    paddingTop:7,
    paddingBottom:7,
    alignItems:'center',
    marginTop:5,
  },
  bn_text:{
    color:'#fff',
    fontSize:16,
  },
  item_technical:{
    paddingLeft:15,
    paddingRight:15,
    marginTop:10,
    marginBottom:10,
  },
  t_text:{
    color:'#8d8d8d'
  },
  language:{
    width:112,
    height:32,
    borderWidth:1,
    borderColor:'#3191cf',
    backgroundColor:'#d0ecff',
    borderRadius:20,
    paddingTop:5,
    paddingBottom:5,
    alignItems:'center',
    marginTop:10,
    marginBottom:10,
    marginLeft:15,
  },
  similar_image_mg:{
    marginTop:15,
    marginLeft:10,
    marginBottom:15,
  },
  similar_image:{
    marginLeft:10,
    width:width*0.35,
    alignItems:'center',
  },
  discuss:{
    alignItems:'center',
    paddingBottom:50,
  },
  discuss_rate:{
    flexDirection:'row',
    flexWrap:'wrap',
    marginTop:25,
  },
  mgl_15:{
    marginLeft:15,
  },
  rate_text:{
    color:'#ffc711',
    fontSize:17,
    marginTop:20,
  },
  textArea:{
    borderColor:'#e6e6e6',
    borderWidth:1,
    backgroundColor:'#fff',
  },
  textAreaContainer:{
    marginTop:15,
    width:width-30,
  },
  send_box:{
    alignItems:'center',
    backgroundColor:'#3191cf',
    width:50,
    borderRadius:25,
    paddingTop:5,
    paddingBottom:5,
    position:'absolute',
    right:15,
    marginTop:10,
    bottom:10,
  },
  send:{
    color:'#fff',
  },
  slide: {
	  marginRight: 20,
  },
  item_h2:{
    paddingLeft:15,
    fontSize:15,
    fontWeight:'700',
    backgroundColor:'#3191cf',
    color:'#fff',
    paddingTop:10,
    paddingBottom:10,
  },
  item_ymn:{
    width:width*0.35,
    borderColor:'#ececec',
    borderWidth:1,
    backgroundColor:'#fff',
    marginLeft:10,
    marginBottom:40,
  },
  ymn_image:{
    alignItems:'center',
  },
  ymn_fit:{
    width:(width-10)*0.35,
  },
  ymn_title:{
    marginLeft:15,
    textTransform: 'uppercase',
    color:'#0f1738',
  },
  ymn_price:{
    marginLeft:15,
    textTransform: 'uppercase',
    color:'#0c6dac',
    marginTop:8,
    marginBottom:10,
  },
  ymn_rate:{
    flexDirection:'row',
    flexWrap: 'wrap',
    marginLeft:15,
    marginTop:6,
  },
  bottom_bar:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderTopColor:'#e6e6e6',
    borderTopWidth:2,
    position:'absolute',
    bottom:0,
    backgroundColor:'#f8f8f8',
    height:90,
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
  bottom_button:{
    flexDirection:'row',
    flexWrap:'wrap',
    backgroundColor:'#3191cf',
    position:'absolute',
    bottom:50,
    width:width,
  },
  leftbutton:{
    width:(width-40)*0.5,
    alignItems:'center',
    backgroundColor:'#d0ecff',
    marginLeft:15,
    marginRight:5,
    marginRight:5,
    paddingTop:6,
    paddingBottom:6,
    marginTop:10,
    marginBottom:10,
    borderRadius:25,
  },
  lefttext:{
    color:'#0f1738',
    textTransform: 'uppercase',
  },
  righttext:{
    color:'#0f1738',
    textTransform: 'uppercase',
  },
  rightbutton:{
    width:(width-40)*0.5,
    alignItems:'center',
    backgroundColor:'#ffc400',
    marginLeft:5,
    paddingTop:6,
    paddingBottom:6, 
    right:15,
    position: 'absolute',
    marginTop:10,
    marginBottom:10,
    borderRadius:25,
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
  itemslide:{
    marginLeft:width*0.06,
    marginTop:25,
  },
  slide:{
    width:width*0.8,
    alignItems:'center',
    marginLeft:15,
    height:width*0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0 , height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  iliamge:{
    
  },
  itemtitle:{
    color:'#5bc8ac',
    fontWeight:'bold',
    fontSize:17,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'#fff',
    marginTop:15,
  },
  info:{
    backgroundColor:'#fff',
    borderTopWidth:2,
    borderTopColor:'#f5f5f5',
    paddingTop:5,
    paddingBottom:5,
  },
  ifsection1:{
    width:width*0.6,
    paddingLeft:15,
  },
  red:{
    borderRadius:30,
    backgroundColor:'#ff0000',
    width:35,
    height:35,
  },
  darkred:{
    borderRadius:30,
    backgroundColor:'#d30101',
    width:35,
    height:35,
    marginLeft:7,
  },
  orange:{
    borderRadius:30,
    backgroundColor:'#ff7f00',
    width:35,
    height:35,
    marginLeft:7,
  },
  purple:{
    borderRadius:30,
    backgroundColor:'#ff009d',
    width:35,
    height:35,
    marginLeft:7,
  },
  ifsection2:{
    alignItems:'center',
    justifyContent:'flex-end',
    width:width*0.4,
    paddingRight:15,
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
  price:{
    backgroundColor:'#fff',
    borderTopWidth:2,
    borderTopColor:'#f5f5f5',
    paddingTop:5,
    paddingBottom:5,
  },
  oldprice:{
    color:'#999999',
	marginLeft: 5,
  },
  dash:{
    backgroundColor:'#999999',
    height:1,
    marginTop:-9,
  },
  newprice:{
    color:'#ed7ca8',
    fontWeight:'bold',
    paddingLeft:15,
  },
  sale:{
    color:'#fff',
    backgroundColor:'#ed7ca8',
    marginLeft:10,
    borderRadius:5,
    paddingLeft:3,
    paddingRight:3,
  },
  mgleft10:{
    marginLeft:10,
  },
  promotion:{
    backgroundColor:'#fff',
    paddingTop:5,
    paddingBottom:5,
    borderTopWidth:2,
    borderTopColor:'#f5f5f5',
  },
  promotionsection:{
    width:width*0.5,
    paddingLeft:15,
  },
  arrowicon:{
    width:width*0.5,
    alignItems:'flex-end',
    paddingRight:15,
  },
  promotiontext:{
    fontWeight:'bold',
  },
  leftbutton:{
    width:width*0.4,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#ed7ca8',
    marginLeft:15,
    marginRight:10,
    paddingTop:5,
    paddingBottom:5,
    marginTop:10,
    marginBottom:10,
  },
  lefttext:{
    color:'#fff',
    textTransform: 'uppercase',
  },
  righttext:{
    color:'#fff',
    textTransform: 'uppercase',
  },
  yeuthich:{
	  right:15,
    position: 'absolute',
	top: 15
	},
  rightbutton:{
    width:width*0.4,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#5bc8ac',
    marginLeft:5,
    marginRight:15,
    paddingTop:5,
    paddingBottom:5,
    right:35,
    position: 'absolute',
    marginTop:10,
    marginBottom:10,
  },
  lefticon:{
    right:0,
    position: 'absolute',
    marginRight:15,
    marginTop:3,
  },
  detailtext:{
    fontWeight:'bold',
    marginTop:3,
    color:'#414141',
  },
  detailtext2:{
    color:'#363636',
  },
  detail:{
    backgroundColor:'#fff',
    marginTop:5,
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:7,
  },
  mgtop15:{
    marginTop:15,
  },
  user:{
    fontStyle:'italic',
  },
  asdash:{
    height:2,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#e1e1e1',
    marginTop:15,
  },
  support:{
    fontWeight:'bold',
    marginTop:3,
    color:'#ed7ca8',
  },
  answer:{
    backgroundColor:'#fff',
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:10,
  },
  services:{
    backgroundColor:'#fff',
    marginTop:7,
  },
  ssection1:{
    width:width*0.32,
    alignItems:'center',
    paddingTop:10,
  },
  sborder:{
    width:1,
    backgroundColor:'#c3c3c3', 
    marginTop:15,
    marginBottom:15,
  },
  stext:{
    fontSize:13,
    color:'#434343',
    marginTop:5,
    textAlign:'center',
  },
  item:{
    marginTop:15,
    marginLeft:15,
  },
  isection1:{
    width:width*0.38, 
    borderWidth: 1,
    borderColor: '#e5e5e5',
    
    paddingBottom:5,
    marginBottom:10,
  },
  iimage:{
    marginTop:5,
  },
  itext:{
    color:'#454545',
    fontSize:13,
    marginLeft:6,
  },
  ioldprice:{
    color:'#999999',
    marginLeft:6,
  },
  ipricedash:{
    backgroundColor:'#999999',
    height:1,
    marginLeft:6,
    width:70,
    marginTop:-9,
  },
  inewprice:{
    color:'#ed7ca8',
    fontWeight:'bold',
    marginLeft:6,
    marginTop:5,
  },
  othersale1:{
    width:width*0.8,
    paddingLeft:20,
  },
  othersale2:{
    width:width*0.2,
    alignItems:'flex-end',
    paddingRight:20,
    justifyContent: 'center',
  },
  flashsale:{
    marginTop:15,
  },
  fsaletext:{
    textTransform: 'uppercase',
    color:'#ed7ca8',
    fontSize:20,
    fontWeight:'bold',
  },
});
export default connect(mapStateToProps)(Detail)
import React from 'react';
import { StyleSheet, Text,Alert, Animated, Easing,View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height_ = Dimensions.get('window').height
import {apis, settings, images} from './configs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShoppingCart, faBars, faMinus, faPlus, faAngleRight, faAngleLeft,faHeart } from '@fortawesome/free-solid-svg-icons'
import Header from './components/Header';
import Navbar from './components/navbar';
import WebView from 'react-native-webview';
import { connect } from 'react-redux'
import LoadingCircular from './components/Loading';
import { ActionCart } from './redux/ActionCart'
import Icon from 'react-native-vector-icons/Ionicons'
import { ActionYeuThich } from './redux/ActionYeuThich'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
	yeu_thich: state.yeu_thich,
})
class DetailTow extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      sonCategories: [],
      related: [],
      webViewHeight: 0,
      changecart: false,
      tab: 0,
      notice_1: true,
      total_price: 0,
      webViewHeight_: 0,
      comments: [],
      slider: [],
      product: this.props.navigation.state.params.product,
	  info: [],
      type:0,
      value:1,
      count_comment:0,
      color:[],
      information:[],
      progess:true,
      link:'',
      clickTow: false,
      yeuthich: (this.props.yeu_thich) ? this.props.yeu_thich : [], 
      cart: (this.props.cart) ? this.props.cart : [], 
      navigation: this.props.navigation,
    };
	this.animatedValue = new Animated.Value(0)
	let id = (this.state.product.id != null) ? this.state.product.id : this.state.product.id 
	
	apis.getProductInformation(id).then(res => {
		this.setState({
			information: res.data,
			
		}) 
			
			
	})
	apis.getPolicy().then(res => {
		this.setState({
			policy: res.data.data,
			
		}) 
	})
	apis.getProductDetail(id).then(res => {
			
		this.setState({
			info: res.data.items[0],
			progess: false,
			total_price: parseFloat(res.data.items[0].final_price),
		}) 
			
			
	})
  }
  changeLayoutOneTow = () => {
  if(this.state.clickTow){
    this.animatedValue.setValue(1)
  Animated.timing(
    this.animatedValue,
    {
      toValue: 0,
    
      duration: 500,
      easing: Easing.linear,
    
    }
  ).start()
  }else{
      this.animatedValue.setValue(0)
  Animated.timing(
    this.animatedValue,
    {
      toValue: 1,
    
      duration: 500,
      easing: Easing.linear,
    
    }
  ).start()
  }
    
    this.setState({ clickTow: !this.state.clickTow }); 
  }
  _minus = () => {
		let value = this.state.value
		if(this.state.value > 1){
			value = value - 1;
			this.setState({
				value:value,
				total_price:value*parseFloat(this.state.info.final_price)
			})
		}
	}
	_plus = () => {
		
		let value = this.state.value
		
			value = value + 1;
			this.setState({
				value:value,
				total_price:value*parseFloat(this.state.info.final_price)
			})
		
	}
	_yeuthich = () => {
		
		let product = []
		let key = 0;
		if(typeof this.state.yeuthich == 'undefined' || this.state.yeuthich.length == 0){
			product = []
			product.push({product: this.state.info})	
			
		}else{
			product = this.state.yeuthich
			
			for(let i = 0; i < product.length; i++){
				if(product[i].product.id == this.state.info.id){
					key = 1;
				}
			}
			if(key == 0){
				product.push({product: this.state.info})	
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
			product.push({product: this.state.info, value: this.state.value})	
			
		}else{
			product = this.state.cart
			
			for(let i = 0; i < product.length; i++){
				if(product[i].product.id == this.state.info.id){
					key = 1;
				}
			}
			if(key == 0){
			product.push({product: this.state.info, value: this.state.value})	
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
	
  const height = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [70, 200]
  })
  
	if (this.state.progess) return <LoadingCircular />;
	else {
		let img_ = 'https://www.seoulmall.kr/pub/media/catalog/product'+this.state.info.media_gallery_entries[0].file
		let name = this.state.info.name
		let description
		for(let i = 0; i < this.state.info.custom_attributes.length; i++){
											
											if(this.state.info.custom_attributes[i].attribute_code == 'description'){
												description = 	this.state.info.custom_attributes[i].value
												
												}
												
												
												
											
										}
										
    return (
      
        <View style={styles.wrapper}>
          

          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7', height: height_ - 75}}>
         
		   <Header navigation={this.props.navigation} user={this.state.user}/>
			<View style={{marginBottom: 20}}>
		   <Image style={{width: width, height: width, marginTop: 0}}
									 source={{ uri: img_ }}/>
          <View style={{marginLeft: 10}}>
                                                 <Text style={[styles.ctext, {fontSize: 16,fontWeight: 'bold', color:'#000'}]}>{this.state.info.name}</Text>
												 <Text style={[styles.ctext, {fontSize: 14,textDecorationLine: 'line-through', color:'#7f7f7f', marginTop: 15}]}>{this.state.info.price}원</Text>
												 <Text style={[styles.ctext, {fontSize: 25, color:'#fb6834', position: 'absolute', top: 28, left: 65}]}>{this.state.info.final_price}원</Text>
                                                
									</View>
									<TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 20, top: width + 28}]}onPress={this._yeuthich}>
					 <Image
                                            style={styles.simage}
                                            source={require('./imgs/ic_follow_off.png')}
                                        />
					 
					</TouchableOpacity>
					<TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 55, top: width + 28}]} onPress={() => {
						 
						 this.setState({status_: !this.state.status_})
						 
						 }}>
					 <Image
                                            style={styles.simage}
                                            source={require('./imgs/ic_share.png')}
                                        />
					 
					</TouchableOpacity>
					{ (this.state.status_) ?
					
					<TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 88, top: width + 30}]}onPress={this._shareFacebook}>
					 <Image
                                            style={[styles.simage, {width: 28,height:28}]}
                                            source={require('./imgs/kakao_talk.png')}
                                        />
					 
					</TouchableOpacity> : null
					}
					{ (this.state.status_) ?
					
					<TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 123, top: width + 30}]}onPress={this._shareFacebook}>
					 <Image
                                            style={[styles.simage, {width: 28,height:28}]}
                                            source={require('./imgs/icon-facebook.png')}
                                        />
					 
					</TouchableOpacity> : null
					}
					{ (this.state.status_) ?
					
					<TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 157, top: width + 30}]}onPress={this._shareFacebook}>
					 <Image
                                            style={[styles.simage, {width: 28,height:28}]}
                                            source={require('./imgs/icon-kakao-story-small.png')}
                                        />
					 
					</TouchableOpacity> : null
					}
					{ (this.state.status_) ?
					
					<TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 190, top: width + 30}]}onPress={this._shareFacebook}>
					 <Image
                                            style={[styles.simage, {width: 28,height:28}]}
                                            source={require('./imgs/link_share.png')}
                                        />
					 
					</TouchableOpacity> : null
					}
					<View style={[styles.item_section,{width: width, marginTop: 20,borderColor: '#ddd', borderBottomWidth: 1, borderTopWidth: 1, paddingTop: 5}]}>
							
								
						<TouchableOpacity  onPress={() => this.setState({tab: 0})}>
						<Text style={[styles.ctext, {fontSize: 14, textAlign:'center', color:(!this.state.tab) ? '#FC8257' : '#000', marginBottom:5, fontWeight: 'bold', width: width*.3333}]}>상품정보</Text>
						</TouchableOpacity>
						
							
						<TouchableOpacity onPress={() => this.setState({tab: 1})}>
						<Text style={[styles.ctext, {fontSize: 14, textAlign:'center', color:(this.state.tab == 1) ? '#FC8257' : '#000',marginBottom:5, fontWeight: 'bold', width: width*.3333}]}>리뷰</Text>
						</TouchableOpacity>
						
						<TouchableOpacity onPress={() => this.setState({tab: 2})}>
						<Text style={[styles.ctext, {fontSize: 14, textAlign:'center', color:(this.state.tab == 2) ? '#FC8257' : '#000',marginBottom:5, fontWeight: 'bold', width: width*.3333}]}>Q&A</Text>
						</TouchableOpacity>
						</View>
					</View>
					
			{ (!this.state.tab) ?
					<View style={{marginTop: -20}}>
			  <TouchableOpacity style={[{width: width,borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#ddd', paddingTop:10, paddingBottom: 5}]} onPress={() => {this.setState({notice_1: !this.state.notice_1})}}>
					
					  <Text style={{color: '#000',marginTop: 5,width: width - 15, paddingBottom: 10, paddingLeft: 10}}>
						  상품 상세정보
						  
                    </Text>
					<Icon style={{top:15, position: 'absolute', right: 15}} name={'md-arrow-dropdown'} size={20} color='#000'/>
				 </TouchableOpacity>
				 <View style={{width:width, height: this.state.notice_1 ? null : 0, overflow: 'hidden', backgroundColor:'#fff', }}>
					   <WebView
		style={{ height: this.state.webViewHeight }}
		onMessage={this.onWebViewMessage}
          
          injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'

         source={{html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div style="width: 100%">'+description+'</div><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script><script>$(document).ready(function(){ $("img").attr("height", "auto");$("img").attr("width", "100%");});</script></body></html>'}} />
				
                    
                    </View>
					
					<TouchableOpacity style={[{width: width,borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#ddd', paddingTop:10, paddingBottom: 5}]} onPress={() => {this.setState({notice_2: !this.state.notice_2})}}>
					
					  <Text style={{color: '#000',marginTop: 5,width: width - 15, paddingBottom: 10, paddingLeft: 10}}>
						  필수표기정보
						  
                    </Text>
					<Icon style={{top:15, position: 'absolute', right: 15}} name={'md-arrow-dropdown'} size={20} color='#000'/>
				 </TouchableOpacity>
				 <View style={{width:width, height: this.state.notice_2 ? null : 0, borderBottomColor: '#ddd', borderBottomWidth:1, overflow: 'hidden', backgroundColor:'#fff', }}>
					 {
						 this.state.information.map((val_, index_) => {
							 return(
					<View style={[styles.item_section,{width: width, }]}>
						<Text style={{color: '#fff',paddingLeft: 10,paddingRight: 10,paddingTop: 10,width: width*.4 - 20, paddingBottom: 10, backgroundColor: '#FF8C00'}}>
							{val_.label}
						  
						</Text>
						<Text style={{color: '#000',paddingLeft: 10,paddingRight: 10,paddingTop: 10,width: width*.6 - 20, paddingBottom: 10}}>
						 {val_.value}
						  
						</Text>
                    </View>
					)
						 })
					 }
					 
                    </View>
					
					<TouchableOpacity style={[{width: width,borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#ddd', paddingTop:10, paddingBottom: 5}]} onPress={() => {this.setState({notice_3: !this.state.notice_3})}}>
					
					  <Text style={{color: '#000',marginTop: 5,width: width - 15, paddingBottom: 10, paddingLeft: 10}}>
						  공급자 정보
						  
                    </Text>
					<Icon style={{top:15, position: 'absolute', right: 15}} name={'md-arrow-dropdown'} size={20} color='#000'/>
				 </TouchableOpacity>
				 <View style={{width:width, height: this.state.notice_3 ? null : 0, overflow: 'hidden', backgroundColor:'#fff', }}>
					   
                    
                    </View>
					
					<TouchableOpacity style={[{width: width,borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#ddd', paddingTop:10, paddingBottom: 5}]} onPress={() => {this.setState({notice_4: !this.state.notice_4})}}>
					
					  <Text style={{color: '#000',marginTop: 5,width: width - 15, paddingBottom: 10, paddingLeft: 10}}>
						  반품 규정
						  
                    </Text>
					<Icon style={{top:15, position: 'absolute', right: 15}} name={'md-arrow-dropdown'} size={20} color='#000'/>
				 </TouchableOpacity>
				 <View style={{width:width, height: this.state.notice_4 ? null : 0, overflow: 'hidden', backgroundColor:'#fff', }}>
					   <WebView
		style={{ height: this.state.webViewHeight_ }}
		onMessage={this.onWebViewMessage_}
          
          injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'

         source={{html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div style="width: 100%">'+this.state.policy+'</div><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script><script>$(document).ready(function(){ $("img").attr("height", "auto");$("img").attr("width", "100%");});</script></body></html>'}} />
				
                    
                    </View>
			 </View>: null 
			}

				{ (this.state.tab == 1) ?
					<View style={{marginTop: -20}}>
					
					<Text style={{color: '#000',marginTop: 10,width: width, paddingBottom: 10, textAlign: 'center'}}>
						  첫번째 리뷰를 달아주세요
						  
                    </Text>
					<TouchableOpacity style={{width: width - 20, paddingBottom: 10, paddingTop: 10, marginLeft: 10, backgroundColor: '#eb5e2c'}} onPress={() => {Alert.alert(
      "Alert",
      "리뷰작성은 상품 구매후 할수 있습니다.",
      
    ); }}>
					<Text style={{color: '#fff',width: width - 20,textAlign: 'center'}}>
						  리뷰작성
						  
                    </Text>
					</TouchableOpacity>
					
					</View>: null
					
				}
				{ (this.state.tab == 2) ?
					<View style={{marginTop: -20}}>
					
					
					<TouchableOpacity style={{width: width - 20, paddingBottom: 10, paddingTop: 10, marginLeft: 10, backgroundColor: '#eb5e2c'}} onPress={() => {Alert.alert(
      "Alert",
      "리뷰작성은 상품 구매후 할수 있습니다.",
      
    ); }}>
					<Text style={{color: '#fff',width: width - 20,textAlign: 'center'}}>
						  Q&A 작성
						  
                    </Text>
					</TouchableOpacity>
					
					</View>: null
					
				}							 					
          </ScrollView>
                </View>
				<Animated.View
        style={{
			height,
			
          position: 'absolute',
          bottom: 0,
		  width: width,
		 
          zIndex: 10000,
			 backgroundColor: '#fff'
		
          }}>
		  <View>
		  <TouchableOpacity style={{width: 50,zIndex:100,alignItems:'center', backgroundColor: '#fff',position:'absolute',left: width*.5 - 25,top: -5}}  onPress={this.changeLayoutOneTow}>
				 <Image  
                style={{width:20,height:15,}}
                        source={require('./imgs/ic-arrow-down-red_new.png')}
                      />
			</TouchableOpacity>
		  <View style={{height: 10, backgroundColor: '#f7f7f7', width: width}}>
			
		  </View>
		  { ( !this.state.clickTow) ? 
		   <View style={{height: 60, backgroundColor: '#fff'}}>
			<TouchableOpacity style={{width: width - 20, marginTop: 10,paddingBottom: 10, paddingTop: 10, marginLeft: 10, backgroundColor: '#eb5e2c'}}  onPress={this.changeLayoutOneTow}>
					<Text style={{color: '#fff',width: width - 20,textAlign: 'center'}}>
						  리뷰작성
						  
                    </Text>
					</TouchableOpacity>
				 </View>
				 : <View style={styles.item_section}>
				 <Text style={[styles.ctext, {fontSize: 16,width: width - 20, marginLeft: 10,marginTop: 15, marginBottom: 15,fontWeight: 'bold', color:'#000'}]}>{this.state.info.name}</Text>
				 <TouchableOpacity style={styles.mgleft}>
				
	<FontAwesomeIcon icon={ faMinus } style={{marginTop: 8, marginLeft: 10}} size={20} color={'#909090'}  onPress={this._minus}/>
                                            </TouchableOpacity>
                                            <View>
                                                  <Text style={styles.camouth}>{this.state.value}</Text>
                                            </View>
                                            <TouchableOpacity>
                                                  <FontAwesomeIcon style={{marginTop: 8}} icon={ faPlus } size={20} color={'#909090'}  onPress={this._plus}/>
                                            </TouchableOpacity>
											<Text style={[styles.ctext, {fontSize: 12,position:'absolute', fontWeight: 'bold', color:'#292929 ', right: 20,top: 60}]}>{this.state.info.final_price}원</Text>
	<View style={{width: width, borderTopColor: '#ddd', borderTopWidth: 1, marginTop: 10}}>
				 <Text style={[styles.ctext, {marginLeft: 10,fontSize: 21,fontWeight: 'bold', color:'#eb5e2c', marginTop: 10,}]}>{this.state.total_price}원</Text>
				 </View>
				 <View style={styles.item_section}>
				 <TouchableOpacity style={{width: width*.5, marginTop: 10,paddingBottom: 10, paddingTop: 10, backgroundColor: '#ec758f'}}  onPress={this._add}>
					<Image 
                style={{width:30,height:32,position: 'absolute', top: 2, left: 20}}
                        source={require('./imgs/ic-add-to-cart.png')}
                      />
					<Text style={{color: '#fff',width: width*.5,textAlign: 'center'}}>
						  장바구니
						  
                    </Text>
					</TouchableOpacity>
					<TouchableOpacity style={{width: width*.5, marginTop: 10,paddingBottom: 10, paddingTop: 10, backgroundColor: '#eb5e2c'}} onPress={() => this.props.navigation.navigate('Pay', {products : [{product: this.state.info, value: this.state.value}]})}>
					<Image  
                style={{width:42,height:32,position: 'absolute', top: 4, left: 20}}
                        source={require('./imgs/ic-buy-now.png')}
                      />
					<Text style={{color: '#fff',width: width*.5,textAlign: 'center'}}>
						  바로구매
						  
                    </Text>
					</TouchableOpacity>
				 </View>
				 </View>
				 
			}
				 </View>
			</Animated.View>
      </View>
    );
	}
  }
}

const styles = StyleSheet.create({
  scrollview_section:{
    backgroundColor:'#F7F7F7',
    marginBottom:100,
	height: height_ - 80,
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
      height:height_*0.68,
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
  item_section:{
  		
  		flexDirection:'row',
  		flexWrap:'wrap',
  		
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
export default connect(mapStateToProps)(DetailTow)
import React from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  BackHandler,
  View,

  Image,
  Dimensions,
  StatusBar,
  TextInput,
  ScrollView,
   Animated, 
  Easing,
  TouchableOpacity,
} from 'react-native';
import Postcode from 'react-native-daum-postcode';
import {apis, settings, images} from './configs';
import {connect} from 'react-redux';
import Slideshow from './components/slideshow';
import Navbar from './components/navbar';
import Header from './components/Header';
import {Button, ThemeProvider} from 'react-native-elements';
import Logo from './components/logo';
import FlashSale from './components/FlashSale';
import Course from './components/CourseNew';
import Branch from './components/Branch';
import BranchTow from './components/BranchTow';
import News from './components/News';
import NewsTow from './components/NewsTow';
import LoadingCircular from './components/Loading';
import Intro from './components/Intro';
import CountDown from 'react-native-countdown-component';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShoppingCart, faBars, faTimes, faChevronRight, faHome, faHeart, faBell, faUser } from '@fortawesome/free-solid-svg-icons'
const mapStateToProps = state => ({
  user_login: state.user_login,
  cart: state.cart,
});
import { ActionCreators } from './redux/ActionCreators'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      search: '',
      users: [],
	  credit: '',
      user_info: [],
      first: true,

    };
	apis.getUsers().then(res => {
			
			this.setState({
				users: res.data.data.items,
				
			}) 
			
		});
		
	this.animatedValue = new Animated.Value(0)
  }
  componentDidMount() {
    //Here is the Trick
    const { navigation } = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener('didFocus', () => {
        this.animatedValue = new Animated.Value(0)
		
		 this.setState({
		  categories: [],
		  reward: '',
		  credit: '',
		  search: '',
		  
		  user: this.props.user_login,
		  user_info: [],
		 
		  clickTow: false,
		});
		this.animatedValue = new Animated.Value(0)
		if(this.state.user != null){
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
			}else{
				
			}
		
		apis.getUsers().then(res => {
			
			this.setState({
				users: res.data.data.items,
				
			}) 
			
		});
		
    });
	}
	
	  

 
	showHome = (showIntro) => {
    this.setState({
		showModal: false
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
  animate () {
  
}
_logout = () => {
    this.props.dispatch(ActionCreators.set_user_login(null));
    this.setState({user: null})
  };
  render() {
    const {search,progess,showModal } = this.state;
	const top = this.animatedValue.interpolate({
    inputRange: [0, 0.5,1],
    outputRange: [-50, 300, -50]
  })
  const left = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-330, 0]
  })
  const opacity = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  })
	if (this.state.progess) return <LoadingCircular />;
	else 
   
    return (
	
        <View style={styles.wrapper}>
          
		
          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7'}}>

              
  <View>
	
	<View style={[styles.wrapper, {borderColor: '#ddd', borderBottomWidth: 1}]}>
		
               <TouchableOpacity style={styles.toggleicon} onPress={this.changeLayoutOneTow}>
              <Image  
                style={{width:20,height:15,}}
                        source={require('./images/ic-menu.png')}
                      />  
            </TouchableOpacity> 
       
              <TouchableOpacity style={[{ width: width *.5, left: width *.25, zIndex: 10,alignItems:'center'}]} >
                     <Image
					 
                style={[styles.brand, {width:110,height:32,marginBottom: 5, marginTop: 5}]}
                        source={require('./images/img_logo.png')}
                      />
                </TouchableOpacity>
            
             <TouchableOpacity style={styles.carticon}  onPress={() =>this.props.navigation.navigate('Search')}>
              <Image  
                style={{width:20,height:20,}}
                        source={require('./images/ic_search.png')}
                      />  
            </TouchableOpacity>
                        </View>
						
                        </View>
			
             <Text style={{fontSize: 11,color: '#c5c5c5', width: width, textAlign: 'center', marginTop: 20}}>
			 DAMDA People
			 </Text>
			 <Text style={{fontSize: 21,color: '#000', width: width, textAlign: 'center', marginTop: 5, fontWeight: 'bold' }}>
			 담다 피플
			 </Text>
				 
				<Branch navigation={this.props.navigation}/>
				
				 <Text style={{fontSize: 11,color: '#c5c5c5', width: width, textAlign: 'center', marginTop: 20}}>
			 DAMDA Hot Brand
			 </Text>
			 <Text style={{fontSize: 21,color: '#000', width: width, textAlign: 'center', marginTop: 5, fontWeight: 'bold' }}>
			 지금 담다에서 가장 핫한 브랜드
			 </Text>
								
				<BranchTow navigation={this.props.navigation}/>		 
				{
									this.state.users.map((val, index_) => {
										let name
										let img
										let des
										let json = JSON.parse(val.account_info).id;
										
										let vendor = val.increment_id;
										for(let i = 0; i < val.vendor_config.length; i++){
											if(val.vendor_config[i].path == 'general/store_information/name'){name = val.vendor_config[i].value; }
											if(val.vendor_config[i].path == 'general/store_information/logo'){img = val.vendor_config[i].value; }
											if(val.vendor_config[i].path == 'general/store_information/short_description'){des = val.vendor_config[i].value; }
										}
										if(val.posts.length != 0)
										return (  
									<View>
                                            <TouchableOpacity style={[styles.csection1,{width: width, marginTop: 15, marginBottom: 15}]} onPress={() =>this.props.navigation.navigate('Category', {categoryId: json, vendor: vendor, img: img })}>
                                                 <View style={styles.cimage}>
												 <Image 
												  style={[styles.cimage, {marginLeft:10,borderRadius: 19, marginTop:-1, width: 38}]}
									 source={{uri: img,width: 38, height: 38}}/>
												 </View>
									<View style={{position: 'absolute', top: -5, left: 58}}>
                                                 <Text style={[styles.ctext, {fontSize: 16,fontWeight: 'bold', color:'#000'}]}>{name}</Text>
                                                 <Text style={[styles.ctext, {fontSize: 13, color:'#d6d6d6'}]}>{des}</Text>
												 </View>
                                            </TouchableOpacity>
                                            <View style={styles.item_section}>
                  <ScrollView 
                     horizontal={true}
                     showsHorizontalScrollIndicator={false}
                     style={styles.scrollview_item}
                  >
			{
									val.posts.map((val_, index_) => {
									let img = JSON.parse(val_.response).media_url; 
									if(img != null && val_.instagram_account_id == json && img != '' )
								
										
                                         
										return (
										<TouchableOpacity style={styles.lisection1} onPress={() => this.props.navigation.navigate('Detail', {product: val_})}>
                                         <View style={styles.item_image}>
                              <Image 
									 source={{uri: img,width: (width)*0.5 - 15, height: (width)*0.5 - 15}}/>
                          </View>
                                            
                                           
                                        
                                            
                                      </TouchableOpacity>
						
                          
									
					 
						)
									})
			}
                 </ScrollView>
              </View>
										 
                 </View>
                                        
										)
									})
										 }
											 
											
              </ScrollView>
			   
            </View>

          {/*  Navbar Bottom */}
		
          <Navbar navigation={this.props.navigation} flashSaleItem={this.state.flashSaleItem} end={this.state.end}/>
		  <Animated.View
        style={{
      left,
      opacity,
        position: 'absolute',
		width: 330, 
		height: height,
        zIndex: 10000,
			

    
          backgroundColor:'#e8e9ed',}}>
		  <View style={styles.sideMenuContainer}>
		{ (this.state.user == null) ? 
        <View style={styles.sideMenuProfile}>
			
			  <TouchableOpacity style={styles.button_header} onPress={() => this.props.navigation.navigate('Login')}>
					<Text style={{color: '#fff'}}>﻿로그인 / 회원가입</Text>
			  </TouchableOpacity>

				<TouchableOpacity style={{position: 'absolute', top: 10, right: 40}}>
					 <Image  
                style={{width:30,height:30,}}
                        source={require('./imgs/icon-flag-ko.png')}
                      />  
			  </TouchableOpacity>
			  <TouchableOpacity style={{position: 'absolute', top: 2, right: 0}}>
					  <Button
						  type="clear"
						  icon={<FontAwesomeIcon icon={faTimes} size={30} color={'#fff'} />}
						   onPress={this.changeLayoutOneTow}
					  />
			  </TouchableOpacity>
			  
			  
        </View> : <View style={styles.sideMenuProfile}>
			
			<TouchableOpacity style={[styles.button_header, {bordeWidth: 0}]} onPress={this._logout}>
					<Text style={{color: '#fff', fontWeight: 'bold'}}>﻿{this.state.user.firstname} {this.state.user.lastname}</Text>
			  </TouchableOpacity>

				<TouchableOpacity style={{position: 'absolute', top: 10, right: 40}}>
					 <Image  
                style={{width:30,height:30,}}
                        source={require('./imgs/icon-flag-ko.png')}
                      />  
			  </TouchableOpacity>
			  <TouchableOpacity style={{position: 'absolute', top: 2, right: 0}}>
					  <Button
						  type="clear"
						  icon={<FontAwesomeIcon icon={faTimes} size={30} color={'#fff'} />}
						   onPress={this.changeLayoutOneTow}
					  />
			  </TouchableOpacity>
			  
			  
        </View>
		}
        { (this.state.user == null) ? 
		
        <View style={styles.item_section}>
			
			  <TouchableOpacity style={[styles.item_header]} onPress={this._phone}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('./imgs/ic_leftmenu_callcenter.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿고객센터</Text>
			  </TouchableOpacity>
			  
			
		
				<TouchableOpacity style={styles.item_header} onPress={() => this.props.navigation.navigate('Anser')}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('./imgs/ic_leftmenu_FAQ.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿자주 찾는 질문</Text>
			  </TouchableOpacity>
			  
			  <TouchableOpacity style={[styles.item_header, {borderRightWidth: 0}]} onPress={() => this.props.navigation.navigate('Notice')}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('./imgs/ic_leftmenu_notice.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿공지사항</Text>
			  </TouchableOpacity>
			
        </View> : <View>
		<View style={[styles.item_section, {borderBottomColor:'#ddd', borderBottomWidth: 1, borderTopWidth: 0, paddingTop: 0, marginTop: -11}]}>
			
			  <TouchableOpacity style={[styles.item_header, {width: 330/2 - 1, borderRightWidth: 1, borderColor: '#ddd', paddingTop:15, paddingBottom: 15}]} onPress={() => {this.props.navigation.navigate('Manage')}}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('./imgs/ic_leftmenu_mypage.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿내 정보</Text>
			  </TouchableOpacity>
			  
			
		
				<TouchableOpacity style={[styles.item_header, {width: 330/2 - 1, borderLeftWidth: 1, borderColor: '#ddd', paddingTop:15, paddingBottom: 15, borderRightWidth: 0}]} onPress={() => this.props.navigation.navigate('Orders')}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('./imgs/ic_leftmenu_myorder.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿주문</Text>
			  </TouchableOpacity>
			  
			  
			
        </View>
		
		<View style={[styles.item_section, {borderBottomColor:'#ddd', borderBottomWidth: 1, borderTopWidth: 0, paddingTop: 0, marginTop: -11}]}>
			
			  <TouchableOpacity style={[styles.item_header, {width: 330/2 - 1, borderRightWidth: 1, borderColor: '#ddd', paddingTop:15, paddingBottom: 15}]}  onPress={() => this.props.navigation.navigate('Cart')}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('./imgs/ic_leftmenu_cart.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>장바구니</Text>
			  </TouchableOpacity>
			  
			
		
				<TouchableOpacity style={[styles.item_header, {width: 330/2 - 1, borderLeftWidth: 1, borderColor: '#ddd', paddingTop:15, paddingBottom: 15, borderRightWidth: 0}]} onPress={() => this.props.navigation.navigate('Love')}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('./imgs/ic_leftmenu_wishlist.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿위시리스트</Text>
			  </TouchableOpacity>
			  
			  
			
        </View>
		<View style={[styles.item_section, {borderBottomColor:'#ddd', borderBottomWidth: 1, borderTopWidth: 0, paddingTop: 0, marginTop: 0}]}>
			
			  <TouchableOpacity style={[{alignItems:'center', width: 330/3 - 1, borderRightWidth: 1, borderColor: '#ddd', paddingTop:15, paddingBottom: 15}]} onPress={() => this.props.navigation.navigate('Pointer')}>
					<Image  
                style={{width:25,height:25}}
                        source={require('./imgs/point-awards.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5, marginTop: 5}}>
                        담다 포인트
                    </Text>
					  <Text style={{color: '#fb6834', marginLeft: 5, marginTop: 10, fontSize: 14, fontWeight: 'bold'}}>{this.state.reward.replace(/"/g, '')} P</Text>
			  </TouchableOpacity>
			  
			
		
				<TouchableOpacity style={[{alignItems:'center', width: 330/3 - 2, borderRightWidth: 1,borderLeftWidth: 1, borderColor: '#ddd', paddingTop:15, paddingBottom: 15}]} onPress={() => this.props.navigation.navigate('Credit')}>
					<Image  
                style={{width:22,height:25,}}
                        source={require('./imgs/point-credit-card.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5, marginTop: 5}}>
                        담다 캐시
                    </Text>
					  <Text style={{color: '#fb6834', marginLeft: 5, marginTop: 10, fontSize: 14, fontWeight: 'bold'}}>{this.state.credit.replace(/"/g, '')} 원</Text>
			  </TouchableOpacity>
			  
			  <TouchableOpacity style={[{alignItems:'center', width: 330/3 - 1, borderLeftWidth: 1, borderColor: '#ddd', paddingTop:15, paddingBottom: 15}]}  onPress={() => this.props.navigation.navigate('Coupon')}>
					<Image  
                style={{width:40,height:25,}}
                        source={require('./imgs/discount-code.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5, marginTop: 5}}>
                        
                        쿠폰 코드
                    
                    </Text>
					  
			  </TouchableOpacity>
			
        </View>
		<Text style={{fontSize: 11,color: '#c5c5c5', width: width, textAlign: 'left', marginTop: 20, marginLeft: 15}}>
			 DAMDA People
			 </Text>
			 <Text style={{fontSize: 21,color: '#000', width: width, textAlign: 'left', marginTop: 5, fontWeight: 'bold', marginLeft: 15 }}>
			 담다 피플
			 </Text>
				
				<Branch navigation={this.props.navigation}/>
				<TouchableOpacity style={[{width: 170, paddingBottom: 10,paddingTop: 10,backgroundColor: '#eb6227',marginLeft: 80}]}>
			
			  
					<Text style={{color: '#fff',width: 170,textAlign: 'center'}}>﻿피플 가입하기</Text>
			  

				
			  
			  
        </TouchableOpacity>
				<View style={styles.item_section}>
			
			  <TouchableOpacity style={[styles.item_header]} onPress={this._phone}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('./imgs/ic_leftmenu_callcenter.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿고객센터</Text>
			  </TouchableOpacity>
			  
			
		
				<TouchableOpacity style={styles.item_header} onPress={() => this.props.navigation.navigate('Anser')}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('./imgs/ic_leftmenu_FAQ.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿자주 찾는 질문</Text>
			  </TouchableOpacity>
			  
			  <TouchableOpacity style={[styles.item_header, {borderRightWidth: 0}]} onPress={() => this.props.navigation.navigate('Notice')}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('./imgs/ic_leftmenu_notice.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿공지사항</Text>
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

const styles = StyleSheet.create({
	section_flashsale:{
      marginTop:-15,
    },
	container_:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
	wrapper:{
		flex: 1
	},
	services:{
    backgroundColor:'#fff',
  },
  ssection1:{
    width:width*0.32,
    alignItems:'center',
    paddingTop:10,
	marginLeft:width*0.01,
	
  },
  item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
      marginLeft:15,
      marginTop:10,
    },
    item_section:{
  		
  		flexDirection:'row',
  		flexWrap:'wrap',
  		
  	},
	itext:{
    color:'#454545',
    fontSize:13,
    marginLeft:6,
	height: 50,
  },
  oldprice:{
    color:'#999999',
    marginLeft:6,
  },
  pricedash:{
    backgroundColor:'#999999',
    height:1,
    marginLeft:6,
    width:70,
    marginTop:-9,
  },
  newprice:{
    color:'#ed7ca8', 
    fontWeight:'bold',
    marginLeft:6,
    marginTop:5,
  },
	item_price:{
      marginLeft:15,
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
    },
  	item:{
      width:(width-30)*0.5,
      borderColor:'#e3e3e3',
      borderWidth:1,
      backgroundColor:'#fff',
    },
    item_image:{
      alignItems:'center',
      justifyContent:'center',
    },
    image_fit:{
      width:(width-40)*0.5,
    },
    item_title:{
      marginLeft:15,
      marginTop:15,
      textTransform: 'uppercase',
      color:'#0f1738',
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
  title:{
    textTransform: 'uppercase',
    color:'#ed7ca8',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    paddingTop:7,
    paddingBottom:7,
  },
  setting:{
    paddingLeft:15,
    backgroundColor:'#ebebeb',
    borderTopColor:'#cccccc',
    borderTopWidth:1,
    borderBottomColor:'#cccccc',
    borderBottomWidth:1,
  },
  ssection1:{
    marginRight:10,
    paddingTop:7,
    paddingBottom:7,
  },
  simage:{
    borderRadius:6,
    borderColor:'#d1d1d1',
    borderWidth:1,
  },
  stext:{
    color:'#909090',
    paddingTop:2,
    paddingBottom:2,
    paddingLeft:2,
    paddingRight:2,
  },
  fsection1:{
    marginTop:5,
    marginBottom:5,
    marginLeft:15,
    flexDirection: 'row',
    width:width*0.45,
  },
  fsection2:{
    width:width*0.45,
    marginTop:5,
    marginBottom:5,
    marginLeft:15,
    justifyContent:'flex-end',
    flexDirection: 'row',
    paddingRight:15,
  },
  ftext:{
    textAlign:'left',
  }, 
  ficon:{
    justifyContent:'center',
    marginLeft:5,
  },
  listitem:{

  },
  lisection1:{
    width:width*0.5,


    
  },
  liimage:{
    alignItems:'center',
  },
  litext:{
    color:'#454545',
    fontSize:13,
	marginTop: 15,
    
  },
  oldprice:{
    color:'#999999',
    
  },
  pricedash:{
    backgroundColor:'#999999',
    height:1,
    marginLeft:6,
    width:70,
    marginTop:-9,
  },
  newprice:{
    color:'#ed7ca8',
    fontWeight:'bold',
    
    marginTop:5,
  },
  sale:{
    color:'#fff',
    backgroundColor:'#5bc8ac',
    marginTop:5,
    right:0,
    position: 'absolute',
  },
  popup:{
    position: 'absolute',
    zIndex: 1,
    width:width,
    backgroundColor:'#fff',
    borderRadius:10,
    marginTop:60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  popupsection1:{
    width:width*0.32,
    alignItems:'flex-start',
    paddingLeft:15,
  },
  popupsection2:{
    width:width*0.32,
    alignItems:'center',
    paddingLeft:15,
  },
  popupsection3:{
    width:width*0.32,
    alignItems:'flex-end',
    paddingRight:15,
  },
  cancel:{
    paddingTop:5,
    paddingBottom:5,
    color:'#3d3d3d',
  },
  popuptitle:{
    paddingTop:5,
    paddingBottom:5,
    color:'#3d3d3d',
  },
  accept:{
    paddingTop:5,
    paddingBottom:5,
    color:'#ed7ca8',
  },
  popupdash:{
    backgroundColor:'#e1e1e1',
    height:2,
  },
  popupcontent:{
    alignItems:'center',
    marginTop:10,
    marginBottom:10,
  },
  sborder:{
    width:1,
    backgroundColor:'#c3c3c3', 
    marginTop:15,
    marginBottom:15,
  },
  fssection1:{
    width:width*0.4,
    paddingLeft:20,
  },
  fssection2:{
    width:width*0.6,
    alignItems:'flex-end',
    paddingRight:20,
    justifyContent: 'center',
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
  stext:{
    fontSize:13,
    color:'#434343',
    marginTop:5,
    textAlign:'center',
  },
	hot_fuction:{
      flexDirection:'row',
      flexWrap: 'wrap',
      paddingTop:7,
      paddingBottom:7,
      backgroundColor:'#3191cf',
    },
    hot_left_fuction:{
      width:width*0.5,
      alignItems:'flex-start',
      paddingLeft:25,
    },
	hot_title:{
      textTransform:'uppercase',
      color:'#fff'
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
	height: 50,
  marginTop:10,
  },
  oldprice:{
    color:'#999999',
    marginLeft:6,
  },
  pricedash:{
    backgroundColor:'#999999',
    height:1,
    marginLeft:6,
    width:70,
    marginTop:-9,
  },
  newprice:{
    color:'#ed7ca8',
    fontWeight:'bold',
    marginLeft:6,
    marginTop:5,
  },
    hot_right_fuction:{
      width:width*0.5,
      alignItems:'flex-end',
      paddingRight:25,
    },
    hot_text:{
      fontSize:13,
    },
	bottom_bar:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderTopColor:'#e6e6e6',
    borderTopWidth:2,
    position:'absolute',
    bottom:0,
    backgroundColor:'#f8f8f8',
    paddingBottom:20,
  },
  width25:{
    width:width*0.25,
    alignItems:'center',
    marginTop:5,
  },
	 about_section:{
      alignItems:'center',
      paddingTop:20,
      paddingBottom:30,
      marginBottom:80,
    },
    contact_me:{
      flexDirection:'row',
      flexWrap: 'wrap',
    },
    mg_8x8:{
      marginLeft:8,
      marginRight:8,
    },
    mg_top25:{
      marginTop:25,
    },
    conpany:{
      textTransform:'uppercase',
      marginTop:10,
      fontSize:13,
      color:'#0f1738'
    },
    dash:{
      height:2,
      backgroundColor:'#e5e5e5',
      width:width-60,
      marginTop:5,
      marginBottom:8,
    },
    address:{
      fontSize:13,
      color:'#0f1738'
    },
  bottom_bar:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderTopColor:'#e6e6e6',
    borderTopWidth:2,
    position:'absolute',
    bottom:0,
    backgroundColor:'#f8f8f8',
    paddingBottom:20,
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
  popup:{
    width:width*0.85,
    position:'absolute',
    backgroundColor:'#fff',
    zIndex:100,
  },
  popup_box:{
    height:height,
  },
  popup_logo:{
    alignItems:'center',
    marginTop:50,
    marginBottom:20,
  },
  exit_button:{
    bottom:50,
    position:'absolute',
    right:20,
  },
  popup_naviga:{
    marginLeft:20,
  },
  popup_naviga_text:{
    paddingTop:5,
    paddingBottom:5,
    textTransform:'uppercase',
    marginTop:10,
  },
    flashsale_fuction:{
      flexDirection:'row',
      flexWrap: 'wrap',
      paddingTop:7,
      paddingBottom:7,
      backgroundColor:'#ededed',
    },
    flashsale_left_fuction:{
      width:width*0.33,
      alignItems:'flex-start',
      paddingLeft:25,
    },
    flashsale_center_fuction:{
      width:width*0.33,
      alignItems:'center',
    },
    flashsale_right_fuction:{
      width:width*0.33,
      alignItems:'flex-end',
      paddingRight:25,
    },
    fl_text:{
      fontSize:13,
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    marginTop: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  itemcenter: {
    position: 'relative',
    alignItems: 'center'
  },
  banner: {
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#fff',
  },

  textCategory: {
    position: 'absolute',

    textAlign: 'center',
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    color: '#fff',
    backgroundColor: '#ff5c00',
    top: ((width - 40) / 344) * 64 - 5,
    fontSize: 18,
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
  fssection1:{
    width:width*0.4,
    paddingLeft:20,
  },
  ctimg: {
    borderRadius: 10,
    width: width - 40,
    height: ((width - 40) / 344) * 128,
    marginTop: 25,
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
	position: 'relative',
	right: -35,
  },
  sinput:{
   
    borderBottomWidth: 0.5,
    borderColor: '#707070',
    backgroundColor:'#fff',
    width:width,
    paddingTop:10,
    paddingBottom:10,
  },
  search_icon:{
	   position: 'absolute',
	   zIndex: 1,
	   top: 5, 
	   right: 10
  },
  search:{
	  position: 'relative',
    alignItems:'center',
    
  },
  wrapper:{
		flex: 1
	},
  brand:{
    textAlign:'center',
    fontSize:25,
    fontWeight:'bold',
  },
  toggleicon:{
     position:'absolute',
     top:15,
     left:10,
     zIndex:110,
  },
  drawertext:{
    paddingTop:10,
    paddingBottom:10,
    fontSize:13,
    marginLeft:10,
    borderBottomWidth:1,
    borderBottomColor:'#dbd8d0',
  },
  carticon:{
     position:'absolute',
     top:13,
     right:10,
     zIndex:100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  slider: {
    width: 200,
    height: 40,
  },
  sliderTouch: {
    width: 50,
    height: 40,
  },
  text: {
    textAlign: 'center',
  },
  textInput: {
    width: 50,
    margin: 12,
    padding: 12,
    textAlign: 'center',
    borderWidth: 1,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  navbar: {
    
    backgroundColor: '#f8f8f8',
	flexDirection:'row',
    flexWrap:'wrap',
    backgroundColor:'#f8f8f8',
    position:'absolute',
    bottom:0,
    width:width,
	borderColor: '#e6e6e6',
  },
    navbarContent: {
        flex: 1,
        flexDirection: 'row',
    },
  navicon: {
    alignItems: 'center',
    width: '25%',
    paddingTop: 5,
    paddingBottom: 10,
    position: 'relative',
  },
  bottom_bar:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderTopColor:'#e6e6e6',
    borderTopWidth:2,
    position:'absolute',
    bottom:0,
    backgroundColor:'#f8f8f8',
    paddingBottom:20,
  },
  width25:{
    width:width*0.25,
    alignItems:'center',
    marginTop:5,
  },
  footersection1:{
    width:width*0.17,
	
    alignItems:'center',
    justifyContent:'center',
  },
  footersectionmiddle:{
    width:width*0.30,
    alignItems:'center',
    marginTop:-10,
  },
  footertext:{
    fontSize:12,
    color:'#909090',
  },
  footer:{
    
  },
  container:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item_section:{
  		
  		flexDirection:'row',
  		flexWrap:'wrap',
  		
  	},
	
	item_header: {
		
		flexDirection:'row',
  		flexWrap:'wrap',
		paddingLeft: 8, paddingRight: 8,
		marginTop: 10,
		borderBottomColor: '#ddd',
		borderRightWidth: 1,
	},
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f4f4f4',
    paddingBottom: 70,
    marginTop:40,
  },
   popup_logo:{
    alignItems:'center',
    marginTop:50,
    marginBottom:20,
  },
  exit_button:{
    bottom:50,
    position:'absolute',
    right:20,
  },
  button_header:{
	top: 8,
	left: 5,
	paddingTop:5,
    paddingBottom:5, 
    paddingLeft:5, 
    paddingRight:5, 
	borderColor: '#fff',
	borderWidth: 1,
	borderRadius: 2,
	position: 'absolute'
  },
  popup_naviga:{
    marginLeft:20,
  },
  popup_naviga_text:{
    paddingTop:5,
    paddingBottom:5,
    textTransform:'uppercase',
    marginTop:10,
  },
  sideMenuProfile: {
    paddingBottom: 10,
	paddingTop: 10,
    backgroundColor: '#eb6227',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
	height: 50,
  },
  sideMenuContent: {
    padding: 25,
    overflow: 'hidden',
  },
  sideMenuClose: {
    padding: 20,
    position: 'absolute',
    bottom: 0,
    right:0,
  },
});
export default connect(mapStateToProps)(Home);

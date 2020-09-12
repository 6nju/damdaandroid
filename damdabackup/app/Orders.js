import React from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  Dimensions,
  View,
  TextInput,
  Picker,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button, Divider,   ThemeProvider} from 'react-native-elements';
import Navbar from './components/navbar';
import Header from './components/Header';
import Logo from './components/logo';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import {connect} from 'react-redux';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'
import {colors, globalStyles, settings} from './configs/index';
import {apis} from './configs/index';
import {ActionCreators} from './redux/ActionCreators';
import {ActionCart} from './redux/ActionCart';


const mapStateToProps = state => ({
  user_login: state.user_login,
  cart: state.cart,
});
class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		  user: this.props.user_login,
		  items: [],
		  reward: '',
		  id: 0,
		  credit: '',
		  
    };
	if(this.state.user != null){
	
	apis.getOrder(this.state.user.id)
                .then(res => {
					
					 	
					 this.setState({
						 items: res.data.items  
					 })
					  
                    
                })
                .catch(err => {
                    this.setState({ process: false })
                    console.log(err.response)
                    //return Alert.alert("Thông báo", 'Có lỗi trong quá trình đăng nhập');
                })
				
	}else{
		this.setState({progress: false})
	}
    
  }
  _showTab(id) {
		let data = this.state.items;
		let product = data[id].items[0].product_id
		for(let i = 1; i < data[id].items.length; i++){
			product = product+','+data[id].items[i].product_id
		}
		
		if(typeof data[id].show == 'undefined'){
		apis.getListProductOrder(product)
                .then(res => {
					let data = this.state.items;
					 data[this.state.id].itemsP = res.data.items
					 
					 this.setState({
						 items: data
					 })
					  
                    
                })
                .catch(err => {
                    this.setState({ process: false })
                    console.log(err.response)
                    //return Alert.alert("Thông báo", 'Có lỗi trong quá trình đăng nhập');
                })
		}
		data[id].show = !data[id].show
		this.setState({ items: data, id: id})
		
	}
  
  render() {
   
    return (
      
		<View style={styles.wrapper}>
          

          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7', height: height - 70}}>
			<Header navigation={this.props.navigation} />
			<View style={{paddingTop: 10, paddingBottom: 10}}>
			
				<Text style={{width: width, textAlign:'center', fontWeight:'bold'}}>
				﻿﻿내 주문
				</Text>
			</View>
			
			<View style={[styles.item_section, {borderTopWidth: 0, paddingTop: 0, marginTop: 0}]}>
				{
					this.state.items.map((val, index_) => {
						if(typeof val.itemsP == 'undefined' || val.itemsP.length == 0){val.itemsP = val.items}
						let text = ''
						if(val.status == 'canceled' || val.status == 'payment_failed' || val.status == 'sm_order_processing_cancel'){
							text = '취소'
						}
						if(val.status == 'pending'){
							text = '보류중'
						}
						if(val.status == 'processing'){
							text = '진행중'
						}
						if(val.status == 'complete'){
							text = '완료'
						}
						return (
						<View>
			  <TouchableOpacity style={[{width: width,backgroundColor:'#fff', borderBottomWidth: 1, borderColor: '#ddd', paddingTop:10, paddingBottom: 10}]}  onPress={this._showTab.bind(this, index_)}>
					
					  <Text style={{color: '#000', marginLeft: 15, marginTop: 5, width: width}}>
                        ﻿주문 <Text style={{color: '#eb5a2b', marginLeft: 15, marginTop: 5}}>{val.increment_id}</Text>{'\n'}
                        ﻿<Text style={{color: '#868893', marginLeft: 15, marginTop: 5, fontSize: 11}}>{val.created_at}</Text>
                    </Text>
						<Text style={{color: '#000', marginLeft: 15, marginTop: 5, fontSize: 11, position:'absolute', right: 30, top: 21}}>{text}</Text>
					  <Icon style={{top:23, position: 'absolute', right: 15}} name={'md-arrow-dropdown'} size={20} color='#000'/>
			  </TouchableOpacity>
			  <View style={{width:width, height: val.show ? null : 0, overflow: 'hidden', }}>
					   <View style={[styles.item_section,{width: width, }]}>
						<Text style={{color: '#616161',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 10,width: width*.4 - 20, paddingBottom: 10}}>
							결제수단
						  
						</Text>
						<Text style={{color: '#000',paddingLeft: 10,paddingRight: 10,paddingTop: 10,fontSize:12,width: width*.6 - 20, paddingBottom: 10}}>
						 COD
						  
						</Text>
                    </View>
					<View style={[styles.item_section,{width: width, }]}>
						
						<Text style={{color: '#616161',fontWeight: 'bold', fontSize: 14,paddingLeft: 10,paddingRight: 10,paddingTop: 10,width: width*1, paddingBottom: 10}}>
						 배송지 정보
						  
						</Text>
                    </View>
					
					<View style={[styles.item_section,{width: width, }]}>
						<Text style={{color: '#616161',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 5,width: width*.4 - 20, paddingBottom: 5}}>
							받는분
						  
						</Text>
						<Text style={{color: '#000',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 5,width: width*.6 - 20, paddingBottom: 5}}>
							{val.billing_address.firstname}{val.billing_address.lastname}
						  
						</Text>
                    </View>
					<View style={[styles.item_section,{width: width, }]}>
						<Text style={{color: '#616161',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 5,width: width*.4 - 20, paddingBottom: 5}}>
							﻿연락처
						  
						</Text>
						<Text style={{color: '#000',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 5,width: width*.6 - 20, paddingBottom: 5}}>
							{val.billing_address.telephone}
						  
						</Text>
                    </View>
					<View style={[styles.item_section,{width: width, }]}>
						<Text style={{color: '#616161',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 5,width: width*.4 - 20, paddingBottom: 5}}>
							﻿﻿주소
						  
						</Text>
						<Text style={{color: '#000',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 5,width: width*.6 - 20, paddingBottom: 5}}>
							{val.billing_address.street[0]}
						  
						</Text>
                    </View>
					<View style={[styles.item_section,{width: width, }]}>
						
						<Text style={{color: '#616161',fontWeight: 'bold', fontSize: 14,paddingLeft: 10,paddingRight: 10,paddingTop: 10,width: width*1, paddingBottom: 10}}>
						 상품정보
						  
						</Text>
                    </View>
					{
					val.itemsP.map((val_, index) => {
						let img
									
										if(typeof val_.custom_attributes != 'undefined' ){
										for(let i = 0; i < val_.custom_attributes.length; i++){
											
											if(val_.custom_attributes[i].attribute_code == 'image'){
												img = { uri: 'https://www.seoulmall.kr/pub/media/catalog/product'+val_.custom_attributes[i].value }	
												
												}
												
												
											
										}
										}
						return(
							<View style={[styles.item_section,{width: width, }]}>
								<Image style={{width: (width)*0.3, height: (width)*0.3}}
									 source={img}/>
									 <View style={{width: width*.6}}>
								<Text style={{color: '#000',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 5,width: width*.6 - 20, paddingBottom: 5}}>
									{val_.name}
								  
								</Text>
								<Text style={{color: '#888',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 5,width: width*.6 - 20, paddingBottom: 5}}>
									주문수량: {val.items[index].qty_ordered}
								  
								</Text>
								<Text style={{color: '#ed5178',paddingLeft: 10,paddingRight: 10,fontSize:18,paddingTop: 5,width: width*.6 - 20, paddingBottom: 5}}>
									{val.items[index].base_price}원
								  
								</Text>
								</View>
							</View>
						)
					})
					}
					<View style={[styles.item_section,{width: width, }]}>
						
						<Text style={{color: '#616161',fontWeight: 'bold', fontSize: 14,paddingLeft: 10,paddingRight: 10,paddingTop: 10,width: width*1, paddingBottom: 10}}>
						 결제정보
						  
						</Text>
                    </View>
					<View style={[styles.item_section,{width: width, }]}>
						<Text style={{color: '#616161',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 5,width: width*.4 - 20, paddingBottom: 5}}>
							총 상품금액
						  
						</Text>
						<Text style={{color: '#000',paddingLeft: 10,textAlign: 'right',fontSize:12,paddingTop: 5,width: width*.6, paddingBottom: 5}}>
							{val.base_subtotal} 원
						  
						</Text>
                    </View>
					
					<View style={[styles.item_section,{width: width, }]}>
						<Text style={{color: '#616161',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 5,width: width*.4 - 20, paddingBottom: 5}}>
							총 할인금액
						  
						</Text>
						<Text style={{color: '#000',paddingLeft: 10,textAlign: 'right',fontSize:12,paddingTop: 5,width: width*.6, paddingBottom: 5}}>
							{val.base_discount_amount} 원
						  
						</Text>
                    </View>
					
					<View style={[styles.item_section,{width: width, }]}>
						<Text style={{color: '#616161',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 5,width: width*.4 - 20, paddingBottom: 5}}>
							담다 포인트
						  
						</Text>
						<Text style={{color: '#000',paddingLeft: 10,textAlign: 'right',fontSize:12,paddingTop: 5,width: width*.6, paddingBottom: 5}}>
							{val.payment_by_reward_points} P
						  
						</Text>
                    </View>
					
					<View style={[styles.item_section,{width: width, }]}>
						<Text style={{color: '#616161',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 5,width: width*.4 - 20, paddingBottom: 5}}>
							담다 캐시
						  
						</Text>
						<Text style={{color: '#000',paddingLeft: 10,textAlign: 'right',fontSize:12,paddingTop: 5,width: width*.6, paddingBottom: 5}}>
							{val.payment_by_store_credit} C
						  
						</Text>
                    </View>
					
					<View style={[styles.item_section,{width: width, }]}>
						<Text style={{color: '#616161',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 5,width: width*.4 - 20, paddingBottom: 5}}>
							배송료
						  
						</Text>
						<Text style={{color: '#000',paddingLeft: 10,textAlign: 'right',fontSize:12,paddingTop: 5,width: width*.6, paddingBottom: 5}}>
							{val.base_shipping_amount} 원
						  
						</Text>
                    </View>
					<View style={[styles.item_section,{width: width, borderTopWidth: 1, borderColor: '#ddd'}]}>
						<Text style={{color: '#eb5a2b',paddingLeft: 10,paddingRight: 10,fontSize:15,paddingTop: 5,width: width*.4 - 20, paddingBottom: 5}}>
							
                                            총 결제금액
                                        
						  
						</Text>
						<Text style={{color: '#eb5a2b',paddingLeft: 10,textAlign: 'right',fontSize:15,paddingTop: 5,width: width*.6, paddingBottom: 5}}>
							{val.base_grand_total} 원
						  
						</Text>
                    </View>
					<Text style={{color: '#000',paddingLeft: 10,textAlign: 'center',fontSize:15,paddingTop: 5,width: width, paddingBottom: 5}}>
							* 주문 취소는 이메일로 요청 부탁 드립니다
						  
						</Text>
                    </View>
			  </View>
			  )
					})
				}
			  
			
		
				
			
        </View>
			
			
			</ScrollView>
			</View>
        <Navbar navigation={this.props.navigation} flashSaleItem={this.state.flashSaleItem} end={this.state.end}/>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
	itemcenter: {
		
	},
	item_section:{
  		
  		flexDirection:'row',
  		flexWrap:'wrap',
  		
  	},
	wrapper:{
		width: width,
		flex: 1
	},
	
});
export default connect(mapStateToProps)(Orders);

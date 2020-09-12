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
class DetailOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		  user: this.props.user_login,
		  itemsP: [],
		  items: [],
		  reward: '',
		  id: 0,
		  credit: '',
		  
		  id_: this.props.navigation.state.params.id_, 
		  item: {}
    };
	apis.getOrderInfo(this.state.id_)
                .then(res => {
					
					 	
						
					 this.setState({
						 item: res.data  
					 })
					 
					  let product = res.data.items[0].product_id
					  
					for(let i = 1; i < res.data.items.length; i++){
						product = product+','+res.data.items[i].product_id
					}
					
                    apis.getListProductOrder(product)
                .then(res => {
					let itemsP = res.data.items
					 
					 
					 this.setState({
						 itemsP: itemsP
					 })
					  
                    
                })
                .catch(err => {
                    this.setState({ process: false })
                    console.log(err.response)
                    //return Alert.alert("Thông báo", 'Có lỗi trong quá trình đăng nhập');
                })
                })
                .catch(err => {
                    this.setState({ process: false })
                    console.log(err.response)
                    //return Alert.alert("Thông báo", 'Có lỗi trong quá trình đăng nhập');
                })
    
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
  componentDidMount() {
	  
  }
  render() {
   
    return (
      
		<View style={styles.wrapper}>
          

          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7', height: height - 70}}>
			<Header navigation={this.props.navigation} />
			<View style={{paddingTop: 10, paddingBottom: 10}}>
			
				<Text style={{width: width, textAlign:'center', fontWeight:'bold'}}>
				
                        ﻿교환/반품
                    
				</Text>
			</View>
			
			<View style={[styles.item_section, {borderTopWidth: 0, paddingTop: 0, marginTop: 0}]}>
				
						<View>
			  <TouchableOpacity style={[{width: width,backgroundColor:'#fff', borderBottomWidth: 1, borderColor: '#ddd', paddingTop:10, paddingBottom: 10}]}>
					
					  <Text style={{color: '#000', marginLeft: 15, marginTop: 5, width: width}}>
                        ﻿RTID:  <Text style={{color: '#eb5a2b', marginLeft: 15, marginTop: 5}}>{this.state.item.entity_id}</Text>{'\n'}
						﻿<Text style={{color: '#000', marginLeft: 15, marginTop: 5}}>﻿주문번호:</Text> <Text style={{color: '#eb5a2b', marginLeft: 15, marginTop: 5}}>{this.state.item.entity_id}</Text>{'\n'}
                        ﻿<Text style={{color: '#868893', marginLeft: 15, marginTop: 5, fontSize: 11}}>{this.state.item.created_at}</Text>
                    </Text>
						<Text style={{color: '#000', marginLeft: 15, marginTop: 5, fontSize: 11, position:'absolute', right: 30, top: 21}}>﻿상세보기</Text>
					  
			  </TouchableOpacity>
			  <View style={{width:width, height: !this.state.item.show ? null : 0, overflow: 'hidden', }}>
					   
					<View style={[styles.item_section,{width: width, }]}>
						
						<Text style={{color: '#616161',fontWeight: 'bold', fontSize: 14,paddingLeft: 10,paddingRight: 10,paddingTop: 10,width: width*1, paddingBottom: 10}}>
						 배송지 정보
						  
						</Text>
                    </View>
					
					<View style={[styles.item_section,{width: width, }]}>
						<Text style={{color: '#616161',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 5,width: width*.3 - 20, paddingBottom: 5}}>
							받는분
						  
						</Text>
						<Text style={{color: '#000',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 5,width: width*.7 - 20, paddingBottom: 5}}>
							{this.state.item.customer_firstname} {this.state.item.customer_lastname} 
						  
						</Text>
                    </View>
					
					<View style={[styles.item_section,{width: width, }]}>
						<Text style={{color: '#616161',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 5,width: width*.3 - 20, paddingBottom: 5}}>
							주소
						  
						</Text>
						<Text style={{color: '#000',paddingLeft: 10,paddingRight: 10,fontSize:12,paddingTop: 5,width: width*.7 - 20, paddingBottom: 5}}>
							{(typeof this.state.item.extension_attributes != 'undefined') ? this.state.item.extension_attributes.shipping_assignments[0].shipping.address.street[0] : ''} 
														{(typeof this.state.item.extension_attributes != 'undefined') ? ', '+this.state.item.extension_attributes.shipping_assignments[0].shipping.address.city : ''} 
														{(typeof this.state.item.extension_attributes != 'undefined') ? ', '+this.state.item.extension_attributes.shipping_assignments[0].shipping.address.country_id : ''} 
						</Text>
                    </View>
					{
					this.state.itemsP.map((val_, index) => {
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
									주문수량: {this.state.item.items[index].qty_ordered}
								  
								</Text>
								<Text style={{color: '#ed5178',paddingLeft: 10,paddingRight: 10,fontSize:18,paddingTop: 5,width: width*.6 - 20, paddingBottom: 5}}>
									{this.state.item.items[index].base_price}원
								  
								</Text>
								</View>
							</View>
						)
					})
					}
                    </View>
			  </View>
			  
			
		
				
			
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
export default connect(mapStateToProps)(DetailOrder);

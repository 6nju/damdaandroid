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
import {colors, globalStyles, settings} from './configs/index';
import {apis} from './configs/index';
import {ActionCreators} from './redux/ActionCreators';
import {ActionCart} from './redux/ActionCart';


const mapStateToProps = state => ({
  user_login: state.user_login,
  cart: state.cart,
});
class Manage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		  user: this.props.user_login,
		  items: [],
		  reward: '',
		  credit: '',
		  
    };
if(this.state.user != null){
	apis.getReward(this.state.user.id)
                .then(res => {
					 this.setState({
						 reward: res.data.data
					 })
					  
                    
                })
                .catch(err => {
                    this.setState({ process: false })
                    console.log(err.response)
                    //return Alert.alert("Thông báo", 'Có lỗi trong quá trình đăng nhập');
                })
				apis.getCredit(this.state.user.id)
                .then(res => {
					 this.setState({
						 credit: res.data.data
					 })
					this.setState({progress: false})
                    
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
  
  
  render() {
   
    return (
      
		<View style={styles.wrapper}>
          

          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7', height: height - 70}}>
			<Header navigation={this.props.navigation} />
			<View style={{paddingTop: 10, paddingBottom: 10}}>
			
				<Text style={{width: width, textAlign:'center', fontWeight:'bold'}}>
				﻿마이페이지
				</Text>
			</View>
			
			<View style={[styles.item_section, {borderTopWidth: 0, paddingTop: 0, marginTop: 0}]}>
			
			  <TouchableOpacity style={[{alignItems:'center', width: width/3 - 1,backgroundColor:'#e7e7e7', borderRightWidth: 1, borderColor: '#e7e7e7', paddingTop:15, paddingBottom: 15}]} onPress={this._phone}>
					<Image  
                style={{width:25,height:25}}
                        source={require('./imgs/point-awards.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5, marginTop: 5}}>
                        담다 포인트
                    </Text>
					  <Text style={{color: '#fb6834', marginLeft: 5, marginTop: 10, fontSize: 14, fontWeight: 'bold'}}>{this.state.reward.replace(/"/g, '')} P</Text>
			  </TouchableOpacity>
			  
			
		
				<TouchableOpacity style={[{alignItems:'center', width: width/3 - 2,backgroundColor:'#e7e7e7', borderRightWidth: 1,borderLeftWidth: 1, borderColor: '#e7e7e7', paddingTop:15, paddingBottom: 15}]} onPress={this._phone}>
					<Image  
                style={{width:22,height:25,}}
                        source={require('./imgs/point-credit-card.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5, marginTop: 5}}>
                        담다 캐시
                    </Text>
					  <Text style={{color: '#fb6834', marginLeft: 5, marginTop: 10, fontSize: 14, fontWeight: 'bold'}}>{this.state.credit.replace(/"/g, '')} 원</Text>
			  </TouchableOpacity>
			  
			  <TouchableOpacity style={[{alignItems:'center', width: width/3 - 1,backgroundColor:'#e7e7e7', borderLeftWidth: 1, borderColor: '#e7e7e7', paddingTop:15, paddingBottom: 15}]} onPress={this._phone}>
					<Image  
                style={{width:40,height:25,}}
                        source={require('./imgs/discount-code.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5, marginTop: 5}}>
                        
                        쿠폰 코드
                    
                    </Text>
					  
			  </TouchableOpacity>
			
        </View>
			
			<View style={[styles.item_section, { borderTopWidth: 0, paddingTop: 0, marginTop: 30}]}>
			
			  <TouchableOpacity style={[{alignItems:'center', width: width/3 - 21,height: width/3 - 21,marginLeft: 15,borderRadius:(width/3 - 21)/2, backgroundColor:'#efefef', borderRightWidth: 1, borderColor: '#efefef', paddingTop:15, paddingBottom: 15}]} onPress={() =>this.props.navigation.navigate('MyInfo')}>
					
					  <Text style={{color: '#000', marginLeft: 5, marginTop: (width/3 - 21)/2 - 25}}>
                        내 정보
                    </Text>
					  
			  </TouchableOpacity>
			  
			
		
				<TouchableOpacity style={[{alignItems:'center', width: width/3 - 22,height: width/3 - 22,borderRadius:(width/3 - 22)/2,marginLeft: 15,backgroundColor:'#efefef', borderRightWidth: 1,borderLeftWidth: 1, borderColor: '#efefef', paddingTop:15, paddingBottom: 15}]}  onPress={() =>this.props.navigation.navigate('Adress')}>
					
					  <Text style={{color: '#000', marginLeft: 5, marginTop: (width/3 - 21)/2 - 25}}>
                       배송지
                    </Text>
					  
			  </TouchableOpacity>
			  
			  <TouchableOpacity style={[{alignItems:'center', width: width/3 - 21,height: width/3 - 21,marginLeft: 15,borderRadius:(width/3 - 21)/2,backgroundColor:'#efefef', borderLeftWidth: 1, borderColor: '#efefef', paddingTop:15, paddingBottom: 15}]} onPress={() => this.props.navigation.navigate('Orders')}>
					 
					  <Text style={{color: '#000', marginLeft: 5, marginTop: (width/3 - 21)/2 - 25}}>
                        
                       주문
                    
                    </Text>
					  
			  </TouchableOpacity>
			
        </View>
			<View style={[styles.item_section, { borderTopWidth: 0, paddingTop: 0, marginTop: 15}]}>
			
			  <TouchableOpacity style={[{alignItems:'center', width: width/3 - 21,height: width/3 - 21,marginLeft: 15,borderRadius:(width/3 - 21)/2, backgroundColor:'#efefef', borderRightWidth: 1, borderColor: '#efefef', paddingTop:15, paddingBottom: 15}]} onPress={() => this.props.navigation.navigate('Cart')}>
				
					  <Text style={{color: '#000', marginLeft: 5, marginTop: (width/3 - 21)/2 - 25}}>
                     장바구니
                    </Text>
					 
			  </TouchableOpacity>
			  
			
		
				<TouchableOpacity style={[{alignItems:'center', width: width/3 - 22,height: width/3 - 22,borderRadius:(width/3 - 22)/2,marginLeft: 15,backgroundColor:'#efefef', borderRightWidth: 1,borderLeftWidth: 1, borderColor: '#efefef', paddingTop:15, paddingBottom: 15}]} onPress={() => this.props.navigation.navigate('Love')}>
					  
					  <Text style={{color: '#000', marginLeft: 5, marginTop: (width/3 - 21)/2 - 25}}>
                       위시리스트
                    </Text>
					  
			  </TouchableOpacity>
			  
			  <TouchableOpacity style={[{alignItems:'center', width: width/3 - 21,height: width/3 - 21,marginLeft: 15,borderRadius:(width/3 - 21)/2,backgroundColor:'#efefef', borderLeftWidth: 1, borderColor: '#efefef', paddingTop:15, paddingBottom: 15}]}  onPress={() => this.props.navigation.navigate('ReturnOrders')}>
					
					  <Text style={{color: '#000', marginLeft: 5, marginTop: (width/3 - 21)/2 - 25}}>
                        
                        교환/반품
                    
                    </Text>
					  
			  </TouchableOpacity>
			
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
export default connect(mapStateToProps)(Manage);

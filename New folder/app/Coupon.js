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
import Icon from 'react-native-vector-icons/Ionicons'

const mapStateToProps = state => ({
  user_login: state.user_login,
  cart: state.cart,
});
class Coupon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		  user_info: this.props.user_login,
		  items: [],
		  buy: 0,
		  have: 0,
		  
    };
	apis.getCreditSumary(this.state.user_info.id).then(res => {
		
		
		this.setState({
			
			have: res.data.data[0].recive,
			buy: res.data.data[0].spend,
			progess: true,
			
		}) 
		
    });
    apis.getCreditHistory(this.state.user_info.id).then(res => {
		
		
		this.setState({
			
			items: res.data,
			progess: true,
			
		}) 
		
    });
  }
  
  
  render() {
   const { username, password} = this.state
    return (
      
		<View style={styles.wrapper}>
          

          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7', height: height - 70}}>
			<Header navigation={this.props.navigation} />
			<View style={{paddingTop: 10, paddingBottom: 10}}>
			
				<Text style={{width: width, textAlign:'center', fontWeight:'bold'}}>
				﻿﻿﻿쿠폰
				</Text>
			</View>
			<TextInput
		                        style={styles.input}
		                        placeholder="﻿"
		                       autoCorrect={false}
								  returnKeyType="done"
								   placeholderTextColor="#000"
								  onChangeText={username => this.setState({username})}
								  value={username}
		                      />
			<TouchableOpacity style={{width: width - 20, paddingBottom: 10, paddingTop: 10, marginLeft: 10, backgroundColor: '#eb5e2c'}} onPress={() => {Alert.alert(
      "Alert",
      "리뷰작성은 상품 구매후 할수 있습니다.",
      
    ); }}>
					<Text style={{color: '#fff',width: width - 20,textAlign: 'center'}}>
						  쿠폰 등록하기
						  
                    </Text>
					</TouchableOpacity>
			 
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
	input:{
		width:width - 20,
		height:36,
		marginLeft: 10,
		marginTop:20,
		marginBottom:20,
		borderColor: '#ddd',
		
		borderWidth: 1,
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
export default connect(mapStateToProps)(Coupon);

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
class ReturnOrders extends React.Component {
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
	
	apis.getOrderReturn(this.state.user.id)
                .then(res => {
					
					 	
					 this.setState({
						 items: res.data.data  
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
		this.props.navigation.navigate('DetailOrder', {id_: this.state.items[id].entity_id})
		
	}
  
  render() {
   
    return (
      
		<View style={styles.wrapper}>
          

          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7', height: height - 70}}>
			<Header navigation={this.props.navigation} />
			<View style={{paddingTop: 10, paddingBottom: 10}}>
			
				<Text style={{width: width, textAlign:'center', fontWeight:'bold'}}>
				
                        교환/반품
                    
				</Text>
			</View>
			
			<View style={[styles.item_section, {borderTopWidth: 0, paddingTop: 0, marginTop: 0}]}>
				{
					this.state.items.map((val, index_) => {
						
						return (
						<View>
			  <TouchableOpacity style={[{width: width,backgroundColor:'#fff', borderBottomWidth: 1, borderColor: '#ddd', paddingTop:10, paddingBottom: 10}]}  onPress={this._showTab.bind(this, index_)}>
					
					  <Text style={{color: '#000', marginLeft: 15, marginTop: 5, width: width}}>
                        ﻿RTID:  <Text style={{color: '#eb5a2b', marginLeft: 15, marginTop: 5}}>{val.entity_id}</Text>{'\n'}
						﻿<Text style={{color: '#000', marginLeft: 15, marginTop: 5}}>﻿주문번호:</Text> <Text style={{color: '#eb5a2b', marginLeft: 15, marginTop: 5}}>{val.entity_id}</Text>{'\n'}
                        ﻿<Text style={{color: '#868893', marginLeft: 15, marginTop: 5, fontSize: 11}}>{val.created_at}</Text>
                    </Text>
						<Text style={{color: '#000', marginLeft: 15, marginTop: 5, fontSize: 11, position:'absolute', right: 30, top: 21}}>﻿상세보기</Text>
					  <Icon style={{top:23, position: 'absolute', right: 15}} name={'md-arrow-dropdown'} size={20} color='#000'/>
			  </TouchableOpacity>
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
export default connect(mapStateToProps)(ReturnOrders);

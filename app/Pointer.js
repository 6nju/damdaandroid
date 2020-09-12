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
class Pointer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		  user_info: this.props.user_login,
		  items: [],
		  buy: 0,
		  have: 0,
		  
    };
	apis.getPointer(this.state.user_info.id).then(res => {
		let buy = 0
		let have = 0
		for(let i = 0; i < res.data.length; i++){
			if(parseInt(res.data[i].amount) < 0){
				buy = buy + parseFloat(res.data[i].amount)
			}else{
				have = have + parseFloat(res.data[i].amount)
			}
		}
		this.setState({
			items: res.data,
			have: have,
			buy: buy,
			progess: true,
			
		}) 
		
    });
    
  }
  
  
  render() {
   
    return (
      
		<View style={styles.wrapper}>
          

          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7', height: height - 70}}>
			<Header navigation={this.props.navigation} />
			<View style={{paddingTop: 10, paddingBottom: 10}}>
			
				<Text style={{width: width, textAlign:'center', fontWeight:'bold'}}>
				﻿﻿담다 포인트
				</Text>
			</View>
			<View>
			
			<Text style={{color: '#000', backgroundColor: '#fff',marginTop: 5,width: width, paddingBottom: 10, paddingTop: 10, textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>
				사용가능 담다포인트
			</Text>
			<Text style={{color: '#eb602b', backgroundColor: '#fff',width: width, paddingBottom: 10, textAlign: 'center', fontSize: 25, fontWeight: 'bold'}}>
				{parseFloat(parseFloat(this.state.have) + parseFloat(this.state.buy)).toFixed(3)}P
			</Text>
			<View style={[styles.item_section,{width: width, borderBottomWidth: 1, borderTopWidth:1, borderColor: '#ddd', backgroundColor: '#fff'}]}>
						<Text style={{color: '#616161',fontSize: 10,textAlign: 'center',fontSize:12,borderRightWidth:1, borderColor: '#ddd',paddingTop: 5,width: width*.5 - 1, paddingBottom: 5, paddingBottom: 15, paddingTop: 15}}>
							담다포인트 총계 <Text style={{color: '#eb602b',fontSize: 15,}}>{parseFloat(this.state.have).toFixed(3)}P</Text>
						  
						</Text>
						<Text style={{color: '#000',fontSize: 10,textAlign: 'center',borderRightWidth:1, borderColor: '#ddd',fontSize:12,paddingTop: 5,width: width*.5 - 1, paddingBottom: 5, paddingBottom: 15, paddingTop: 15}}>
							사용한 담다포인트 <Text style={{color: '#eb602b',fontSize: 15,}}>{parseFloat(this.state.buy).toFixed(3)}P</Text>
						  
						</Text>
             </View>
			 {
					this.state.items.map((val, index_) => {
						return(
			  <TouchableOpacity style={[{width: width,backgroundColor:'#fff', borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#ddd', paddingTop:10, paddingBottom: 5}]}>
					
					  <Text style={{color: '#000', marginLeft: 15, marginTop: 5, width: width*.65, }}>
					   ﻿<Text style={{color: '#868893', marginLeft: 15, marginTop: 5, fontSize: 11}}>{val.created_at}</Text>{'\n'}
					   {val.comment}
                        ﻿</Text>
                       <Text style={{color: '#eb602b', marginLeft: 15, marginTop: 5, fontSize: 15,fontWeight: 'bold', position:'absolute', right: 10, top: 22}}>{val.amount} P</Text>
                    
					
				 </TouchableOpacity>
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
export default connect(mapStateToProps)(Pointer);

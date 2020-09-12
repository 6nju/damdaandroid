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
class Anser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		  user_info: this.props.user_login,
		  items: [],
		  
    };
	apis.getBlock().then(res => {
		
		let data1 = res.data.items[0].content.split("\r\n<p>/</p>\r\n");
		
        let data2 = [];
            for (let i = 0; i < data1.length ; i++){
                for(let j = 0; j < 2;j++){
                    data2[i] = data1[i].split("\r\n<p>-</p>\r\n");
					 data2[i][2] = false
                }
            }
		this.setState({
			items: data2,
			progess: true,
			
		}) 
		
    });
    
  }
  
  _showTab(id) {
		let data = this.state.items;
		data[id][2] = !data[id][2]
		this.setState({ items: data})

	}
  render() {
   
    return (
      
		<View style={styles.wrapper}>
          

          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7',  height: height - 70}}>
			<Header navigation={this.props.navigation} />
			<View style={{paddingTop: 10, paddingBottom: 10}}>
			
				<Text style={{width: width, textAlign:'center', fontWeight:'bold'}}>
				﻿자주 묻는 질문
				</Text>
			</View>
			<View>
				{
					this.state.items.map((val, index_) => {
						return (
						<View>
			  <TouchableOpacity style={[{width: width,backgroundColor:'#fff', borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#ddd', paddingTop:10, paddingBottom: 5}]}  onPress={this._showTab.bind(this, index_)}>
					
					  <Text style={{color: '#000',marginTop: 5, fontWeight: 'bold', width: width - 15, paddingBottom: 10, paddingLeft: 10}}>
						  {val[0].replace(/<p>/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/<\/u>/g, '').replace(/<u>/g, '').replace(/<\/a>/g, '').replace(/<\/p>/g, '').replace(/&nbsp;/g, ' ')}
						  
                    </Text>
					<Icon style={{top:13, position: 'absolute', right: 15}} name={'md-arrow-dropdown'} size={20} color='#000' />
				 </TouchableOpacity>
				 <View style={{width:width, height: val[2] ? null : 0, overflow: 'hidden', }}>
					   <Text style={{color: '#000', marginLeft: 13, marginTop: 5, paddingTop:10, paddingBottom: 15}}>
						  {val[1].replace(/<p>/g, '').replace(/<a href="mailto:cs@damda.com">/g, '').replace(/<strong>/g, '').replace(/<\/strong>/g, '').replace(/<\/u>/g, '').replace(/<u>/g, '').replace(/<\/a>/g, '').replace(/<\/p>/g, '').replace(/&nbsp;/g, ' ')}
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
	wrapper:{
		width: width,
		flex: 1
	},
	
});
export default connect(mapStateToProps)(Anser);

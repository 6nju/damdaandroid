import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Linking,
  Dimensions,
} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
import {globalStyles, images, settings} from '../../configs';
import Accordian from '../Accordion';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import Branch from '../../components/Branch';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { ActionCreators } from '../../redux/ActionCreators'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import LoadingCircular from '../Loading';
const mapStateToProps = (state) => ({
	user_login: state.user_login
})
class RightMenu extends Component {
  constructor(props) { 
      super(props)
      this.state = {
	  pages: [],
	  reward: '',
	  credit: '',
	  action: 'Login',
	  user: this.props.user,
      menu :[
        
      ]
    }
	
  }
	componentDidMount(){
		
    this._subscribe = this.props.navigation.addListener('didFocus', () => {

     this.setState({
      pages: [],
	  reward: '',
	  credit: '',
	  action: 'Login',
	  progress: true,
	  user: this.props.user,
      menu :[
        
      ]
    });
	
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
	
    });
	
	}
  renderAccordians=()=> {
    //const items = [];
    const {menu} = this.state;
    return menu.map((item, index) => {
      return <Accordian
          key = {index}
          title = {item.title}
          data = {item.data}
      />
    })

  }
  _logout = () => {
    this.props.dispatch(ActionCreators.set_user_login(null));
    this.setState({user: null})
  };
	_phone = () => {
		 Linking.openURL('tel:0222526767')
	 }
  render() {
	if (this.state.progess) return <LoadingCircular />;
	else
    return (
      <View style={styles.sideMenuContainer}>
		{ (this.state.user == null) ? 
        <View style={styles.sideMenuProfile}>
			
			  <TouchableOpacity style={styles.button_header} onPress={() => this.props.navigation.navigate('Login')}>
					<Text style={{color: '#fff'}}>﻿로그인 / 회원가입</Text>
			  </TouchableOpacity>

				<TouchableOpacity style={{position: 'absolute', top: 10, right: 40}}>
					 <Image  
                style={{width:30,height:30,}}
                        source={require('../../imgs/icon-flag-ko.png')}
                      />  
			  </TouchableOpacity>
			  <TouchableOpacity style={{position: 'absolute', top: 2, right: 0}}>
					  <Button
						  type="clear"
						  icon={<FontAwesomeIcon icon={faTimes} size={30} color={'#fff'} />}
						  onPress={() => this.props.navigation.goBack()}
					  />
			  </TouchableOpacity>
			  
			  
        </View> : <View style={styles.sideMenuProfile}>
			
			<TouchableOpacity style={[styles.button_header, {bordeWidth: 0}]} onPress={this._logout}>
					<Text style={{color: '#fff', fontWeight: 'bold'}}>﻿{this.state.user.firstname} {this.state.user.lastname}</Text>
			  </TouchableOpacity>

				<TouchableOpacity style={{position: 'absolute', top: 10, right: 40}}>
					 <Image  
                style={{width:30,height:30,}}
                        source={require('../../imgs/icon-flag-ko.png')}
                      />  
			  </TouchableOpacity>
			  <TouchableOpacity style={{position: 'absolute', top: 2, right: 0}}>
					  <Button
						  type="clear"
						  icon={<FontAwesomeIcon icon={faTimes} size={30} color={'#fff'} />}
						  onPress={() => this.props.navigation.goBack()}
					  />
			  </TouchableOpacity>
			  
			  
        </View>
		}
        { (this.state.user == null) ? 
		
        <View style={styles.item_section}>
			
			  <TouchableOpacity style={[styles.item_header]} onPress={this._phone}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('../../imgs/ic_leftmenu_callcenter.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿고객센터</Text>
			  </TouchableOpacity>
			  
			
		
				<TouchableOpacity style={styles.item_header} onPress={() => this.props.navigation.navigate('Anser')}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('../../imgs/ic_leftmenu_FAQ.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿자주 찾는 질문</Text>
			  </TouchableOpacity>
			  
			  <TouchableOpacity style={[styles.item_header, {borderRightWidth: 0}]} onPress={() => this.props.navigation.navigate('Notice')}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('../../imgs/ic_leftmenu_notice.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿공지사항</Text>
			  </TouchableOpacity>
			
        </View> : <View>
		<View style={[styles.item_section, {borderBottomColor:'#ddd', borderBottomWidth: 1, borderTopWidth: 0, paddingTop: 0, marginTop: -11}]}>
			
			  <TouchableOpacity style={[styles.item_header, {width: 330/2 - 1, borderRightWidth: 1, borderColor: '#ddd', paddingTop:15, paddingBottom: 15}]} onPress={() => {alert(111); this.props.navigation.navigate('Manage')}}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('../../imgs/ic_leftmenu_mypage.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿내 정보</Text>
			  </TouchableOpacity>
			  
			
		
				<TouchableOpacity style={[styles.item_header, {width: 330/2 - 1, borderLeftWidth: 1, borderColor: '#ddd', paddingTop:15, paddingBottom: 15, borderRightWidth: 0}]} onPress={() => this.props.navigation.navigate('Orders')}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('../../imgs/ic_leftmenu_myorder.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿주문</Text>
			  </TouchableOpacity>
			  
			  
			
        </View>
		
		<View style={[styles.item_section, {borderBottomColor:'#ddd', borderBottomWidth: 1, borderTopWidth: 0, paddingTop: 0, marginTop: -11}]}>
			
			  <TouchableOpacity style={[styles.item_header, {width: 330/2 - 1, borderRightWidth: 1, borderColor: '#ddd', paddingTop:15, paddingBottom: 15}]} onPress={this._phone}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('../../imgs/ic_leftmenu_cart.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>장바구니</Text>
			  </TouchableOpacity>
			  
			
		
				<TouchableOpacity style={[styles.item_header, {width: 330/2 - 1, borderLeftWidth: 1, borderColor: '#ddd', paddingTop:15, paddingBottom: 15, borderRightWidth: 0}]} onPress={() => this.props.navigation.navigate('Anser')}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('../../imgs/ic_leftmenu_wishlist.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿위시리스트</Text>
			  </TouchableOpacity>
			  
			  
			
        </View>
		<View style={[styles.item_section, {borderBottomColor:'#ddd', borderBottomWidth: 1, borderTopWidth: 0, paddingTop: 0, marginTop: 0}]}>
			
			  <TouchableOpacity style={[{alignItems:'center', width: 330/3 - 1, borderRightWidth: 1, borderColor: '#ddd', paddingTop:15, paddingBottom: 15}]} onPress={this._phone}>
					<Image  
                style={{width:25,height:25}}
                        source={require('../../imgs/point-awards.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5, marginTop: 5}}>
                        담다 포인트
                    </Text>
					  <Text style={{color: '#fb6834', marginLeft: 5, marginTop: 10, fontSize: 14, fontWeight: 'bold'}}>{this.state.reward.replace(/"/g, '')} P</Text>
			  </TouchableOpacity>
			  
			
		
				<TouchableOpacity style={[{alignItems:'center', width: 330/3 - 2, borderRightWidth: 1,borderLeftWidth: 1, borderColor: '#ddd', paddingTop:15, paddingBottom: 15}]} onPress={this._phone}>
					<Image  
                style={{width:22,height:25,}}
                        source={require('../../imgs/point-credit-card.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5, marginTop: 5}}>
                        담다 캐시
                    </Text>
					  <Text style={{color: '#fb6834', marginLeft: 5, marginTop: 10, fontSize: 14, fontWeight: 'bold'}}>{this.state.credit.replace(/"/g, '')} 원</Text>
			  </TouchableOpacity>
			  
			  <TouchableOpacity style={[{alignItems:'center', width: 330/3 - 1, borderLeftWidth: 1, borderColor: '#ddd', paddingTop:15, paddingBottom: 15}]} onPress={this._phone}>
					<Image  
                style={{width:40,height:25,}}
                        source={require('../../imgs/discount-code.png')}
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
                        source={require('../../imgs/ic_leftmenu_callcenter.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿고객센터</Text>
			  </TouchableOpacity>
			  
			
		
				<TouchableOpacity style={styles.item_header} onPress={() => this.props.navigation.navigate('Anser')}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('../../imgs/ic_leftmenu_FAQ.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿자주 찾는 질문</Text>
			  </TouchableOpacity>
			  
			  <TouchableOpacity style={[styles.item_header, {borderRightWidth: 0}]} onPress={() => this.props.navigation.navigate('Notice')}>
					<Image  
                style={{width:20,height:20,}}
                        source={require('../../imgs/ic_leftmenu_notice.png')}
                      />  
					  <Text style={{color: '#000', marginLeft: 5}}>﻿공지사항</Text>
			  </TouchableOpacity>
			
        </View>
		</View>
		}
        

      </View>
    );
  }
}
const styles = StyleSheet.create({
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
export default connect(mapStateToProps)(RightMenu)



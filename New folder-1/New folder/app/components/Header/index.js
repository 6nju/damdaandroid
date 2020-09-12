import React, {Component} from 'react';
import {
  StyleSheet,View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity, StatusBar, Image, Dimensions,
} from 'react-native';
import { Button,ThemeProvider } from 'react-native-elements';

import {colors,images} from '../../configs/index';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { connect } from 'react-redux'
import { ActionCart } from '../../redux/ActionCart'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
class Header extends Component {
  constructor(props) {
    super(props);
	this.state = {
            page:1,
            search: '',
			user: this.props.user,
            
    }
	
	
  }
  _search = () => {
	
	if(this.state.search == '')return Alert.alert("Thông báo", 'Bạn chưa nhập sản phẩm cần tìm');
	this.props.navigation.navigate('Search', {val: this.state.search})
	
  }
  render() {
    const { navigate, search } = this.props.navigation;
    return (
	<View>
	
	<View style={[styles.wrapper, {borderColor: '#ddd', borderBottomWidth: 1}]}>
		
                          
       <TouchableOpacity style={[styles.toggleicon]} onPress={() => this.props.navigation.pop()}>
		                      <Image
							  style={{width:20,height:15,}}
		                          source={require('../../images/back_arrow.png')}
		                      />
		                  </TouchableOpacity>
              <TouchableOpacity style={[{ width: width *.5, left: width *.25, zIndex: 10,alignItems:'center'}]} >
                     <Image
					 
                style={[styles.brand, {width:110,height:32,marginBottom: 5, marginTop: 5}]}
                        source={require('../../images/img_logo.png')}
                      />
                </TouchableOpacity>
            
             <TouchableOpacity style={styles.carticon}  onPress={() =>this.props.navigation.navigate('Search')}>
              <Image  
                style={{width:20,height:20,}}
                        source={require('../../images/ic_search.png')}
                      />  
            </TouchableOpacity>
                        </View>
						
                        </View>
                        
        
    );
  }
}

const styles = StyleSheet.create({
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
});
export default connect(mapStateToProps)(Header);
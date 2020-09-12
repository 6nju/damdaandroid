import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
  TouchableOpacity,
  Image,
  Animated, 
  Easing,
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { ActionCreators } from '../../redux/ActionCreators'
import {Topbar} from './components/Topbar';
const mapStateToProps = (state) => ({
	user_login: state.user_login
})
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShoppingCart, faBars, faChevronRight, faHome, faHeart, faBell, faUser } from '@fortawesome/free-solid-svg-icons'
import CircleList from 'react-native-circle-list';
import Swiper from 'react-native-swiper';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const RADIUS = (1.5 * width) / 2;
const generateMockData = elementCount => {
    const _calc = (data, count) => {
        const newCount = count + 1
        const newData = data.concat({
            id: count,
            value: count,
        })

        if (count < elementCount) {
            return _calc(newData, newCount)
        } else {
            return newData
        }
    }

    return _calc([], 0)
}

export const mockData = generateMockData(16)
class Navbarbottom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clickTow: false,
      click: false,
      users: [],
      flatness: 0,
    scrolling: false,
    text: '0',
             data: [
        {
    id: '0',
    value: '1',
    image: require('./images/list1.png'),
  },
  {
    id: '1',
    value: '2',
   image: require('./images/list2.png'),
  },
  {
    id: '2',
    value: '3',
   image: require('./images/list3.png'),
  },
  {
    id: '3',
    value: '4',
   image: require('./images/list4.png'),
  },
  {
    id: '4',
    value: '5',
   image: require('./images/list5.png'),
  },
  {
    id: '5',
    value: '6',
   image: require('./images/list6.png'),
  },
  {
    id: '6',
    value: '7',
  image: require('./images/list7.png'),
  },
  {
    id: '7',
    value: '8',
  image: require('./images/list8.png'),
  },
  {
    id: '8',
    value: '9',
  image: require('./images/list9.png'),
  },
  {
    id: '9',
    value: '10',
  image: require('./images/list10.png'),
  },
  {
    id: '10',
    value: '11',
  image: require('./images/list11.png'),
  },
  {
    id: '11',
    value: '12',
  image: require('./images/list12.png'),
  },
  {
    id: '12',
    value: '13',
  image: require('./images/list13.png'),
  },
  {
    id: '13',
    value: '14',
  image: require('./images/list1.png'),
  },
  {
    id: '14',
    value: '15',
  image: require('./images/list2.png'),
  },
  {
    id: '15',
    value: '16',
  image: require('./images/list13.png'),
  },
  
  
      ],  // Initial value for opacity: 0
    };
    this.animatedValue = new Animated.Value(0)
	apis.getUsers().then(res => {
		let page = []
		let items = []
		
		let page_ = -1;
		for(let i = 0; i <  res.data.data.items.length; i++){
			if((i % 3) == 0 && i != 0){
				
				page.push(items)
				items = [];
				
			}
			items.push(res.data.data.items[i])
		}
		
		page.push(items)
		console.log(page)
		this.setState({
			page: page,
			users: res.data.data.items,
			progess: false,
		}) 
		
    });
  }
  componentDidMount () {
  this.animate()
}
_keyExtractor = item => {
  
  item.id;
}
  _onChange = text => {
    const filteredText = text.replace(/[^0-9]/, '');

    if (parseInt(filteredText, 10) > data.length - 1) {
      return;
    }

    this.setState({text: filteredText});
  };

  _onPress = () => {
    const {text} = this.state;
    const scrollIndex = parseInt(text, 10);

    this.circleList.scrollToIndex(scrollIndex);
  };

  _onScrollBegin = () => this.setState({scrolling: true});

  _onScrollEnd = () => this.setState({scrolling: false});

  _onSliderChange = flatness => this.setState({flatness});

  _renderItem = ({item}) => (
    <Topbar label={`Branch ${item.value}`} value={item.value} image={item.image}/>
  );


   
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

changeLayoutOne = () => {
  if(this.state.click){
    this.animatedValue.setValue(0)
  Animated.timing(
    this.animatedValue,
    {
      toValue: 0,
    
      duration: 300,
      easing: Easing.linear,
    
    }
  ).start()
  }else{
      this.animatedValue.setValue(0)
  Animated.timing(
    this.animatedValue,
    {
      toValue: 1,
    
      duration: 300,
      easing: Easing.linear,
    
    }
  ).start()
  }
    
    this.setState({ click: !this.state.click }); 
  }
    
animate () {
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
  render() {
    const textNavbar = this.state.textNavbar;
    const {flatness, scrolling, text} = this.state;
    const { data } = this.state
  
  const top = this.animatedValue.interpolate({
    inputRange: [0, 0.5,1],
    outputRange: [-50, 300, -50]
  })
  const height = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 450]
  })
  const opacity = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  })
  const movingMargin = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 300, 100]
  })
  const textSize = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [18, 32, 18]
  })
  const rotateX = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '180deg', '50deg']
  })
  var menus = [];

  for(let i = 1; i < 11; i++){
    
    let name = require('./images/brand1.png')
    
    menus.push(
      <View key = {i}>
         <Image  
          style={{width:width *.5 - 20, marginLeft: 10, height:(width *.5 - 20) * 58 / 216}}
                        source={require('./images/brand1.png')}
                  />
      </View>
    )
  }
  return (
    
    <View style={styles.wrapper}>

      {(this.state.clickTow) ?
        <TouchableOpacity onPress={this.changeLayoutOneTow} style={[{ width: width, left: 0,top: 0,height:1000, zIndex:10, position:'absolute',}]} >
      <View>
      
      </View>
      </TouchableOpacity>
          : null
      }
      {(this.state.clickTow) ?
      
     
      <Animated.View
        style={{
      height,
      opacity,
          position: 'absolute',
          
      width: width, 
          
        zIndex: 10000,
    borderRadius: 50,
    bottom: -0,
    
          backgroundColor:'#e8e9ed',}}>
      
    <Text style={{marginLeft:40,marginTop:30,}}>DAMDA People</Text>
	<View style={{height:150}}>
            <Swiper style={[styles.wrapper,{height: 150, position: 'absolute', zIndex: 10000}]} 
                paginationStyle={{top:-20,right:30,alignItems:'flex-start',justifyContent:'flex-end'}}
                showsButtons={false}
              >
			 
				  {
									this.state.page.map((val_, index_) => {
										return (
                <View style={[styles.slide1,{height: 150, position: 'absolute', zIndex: 10000}]}>
                    <View style={{flexDirection:'row',flexWrap:'wrap', height: 150}}>
					{
									val_.map((val, index) => {
										let name
										let img
										let json = JSON.parse(val.account_info).id;
										for(let i = 0; i < val.vendor_config.length; i++){
											if(val.vendor_config[i].path == 'general/store_information/name'){name = val.vendor_config[i].value; }
											if(val.vendor_config[i].path == 'general/store_information/logo'){img = val.vendor_config[i].value; }
										}
										return (
                                            <TouchableOpacity style={styles.csection1} onPress={() =>this.props.navigation.navigate('Category', {categoryId: json})}>
                                                 <View style={styles.cimage}>
												 <Image 
												  style={[styles.cimage, {marginLeft:-1, marginTop:-1}]}
									 source={{uri: img,width: width*0.20, height: width*0.20}}/>
												 </View>
                                                 <Text style={styles.ctext}>{name}{val_.length}</Text>
                                            </TouchableOpacity>
                                            
                                        
										)
									})
										 }
                          
                          
                    </View>
                </View>
				)
									})
										 }
               
                
                
              </Swiper>
			  </View>
      
	  <View style={{marginBottom:40}}>
      <CircleList
      
          data={data}
          elementCount={16}
          flatness={0}
          keyExtractor={this._keyExtractor}
          radius={RADIUS}
          innerRef={component => {
            this.circleList = component;
          }}
          onScrollBegin={this._onScrollBegin}
          onScrollEnd={this._onScrollEnd}
          renderItem={this._renderItem}
        />
		</View>
        <TouchableOpacity style={styles.bottomnavstyle} onPress={this.changeLayoutOneTow}><Text style={styles.brandnav}>DAMDA</Text><Image
					 
                style={[styles.brand, {width:110,height:32,marginBottom: 5, marginTop: 5}]}
                        source={require('../../images/img_logo.png')}
                      /></TouchableOpacity>
     
     </Animated.View>   
     
       : null
      }
<View style={styles.navbar}>
                      
            
                                <View style={[styles.container,styles.footer]}>
                                    <TouchableOpacity style={styles.footersection1}  onPress = {()=> this.props.navigation.toggleLeftDrawer('Main', {param: 'login'})}>
                                        <Image
                                            style={styles.simage}
                                            source={require('../../imgs/Navigation_menu.png')}
                                        />
                                        <Text style={[styles.footertext, {marginTop: 5}]}>메뉴</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.footersection1} onPress={() =>this.props.navigation.navigate('Login')}>
                                        <Image
                                            style={styles.simage}
                                            source={require('../../imgs/Navigation_wishlist.png')}
                                        />
                                        <Text style={[styles.footertext, {marginTop: 5}]}>위시리스트</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.footersectionmiddle} onPress={this.changeLayoutOneTow}>
                                        <Image
                                            style={styles.simage}
                                            source={require('../../imgs/icon_normal.png')}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.footersection1} onPress={() =>this.props.navigation.navigate('Login')}>
                                        <Image
                                            style={styles.simage}
                                            source={require('../../imgs/Navigation_mypage.png')}
                                        />
                                       <Text style={[styles.footertext, {marginTop: 5}]}>내계정</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.footersection1} onPress={() =>this.props.navigation.navigate('ListUser')}>
                                        <Image
                                            style={styles.simage}
                                            source={require('../../imgs/Navigation_people.png')}
                                        />
                                        <Text style={[styles.footertext, {marginTop: 5}]}>피플</Text>
                                    </TouchableOpacity>
                                </View>
         </View>
        </View>
  );
  }
}



  

const styles = StyleSheet.create({
	category:{
    marginTop:16,
  },
  csection1:{
    width:width*0.23,
    marginLeft:width*.07,
    alignItems:'center', 
  },
  cimage:{
    borderRadius: 50,
    borderColor:'#767676',
    borderWidth:1,
    width:width*0.20,
    height:width*0.20,
    backgroundColor:'#fff',
  },
  ctext:{
	  height:50,
    fontSize:13,
    color:'#434343',
    marginTop:5,
    textAlign:'center',
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
  brand:{
    textAlign:'center',
    fontSize:25,
    fontWeight:'bold',
    
  },
  brandnav:{
    marginTop:10,
    textAlign:'center',
    fontSize:25,
    fontWeight:'bold',
  },
  bottomnavstyle:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
    
    borderColor:'#e1e1e4',
    
    borderRadius:(width+300)*0.5,
    height:width+300,
    width:width+300,
    position: 'absolute',
    left:-150,
    bottom:-width-200,
    backgroundColor:'#fff',
  },
  slide1:{
    marginRight:10,
    marginLeft:13,
    height:65,
  },
  wrapper:{
    marginTop:10,
  },
});
 export default connect(mapStateToProps)(Navbarbottom)
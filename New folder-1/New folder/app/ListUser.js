import React from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  BackHandler,
  View,
  Button,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {apis, settings, images} from './configs';
import {connect} from 'react-redux';
import Slideshow from './components/slideshow';
import Navbar from './components/navbar';
import Header from './components/Header';
import Logo from './components/logo';
import FlashSale from './components/FlashSale';
import Course from './components/CourseNew';
import Branch from './components/Branch';
import BranchTow from './components/BranchTow';
import News from './components/News';
import NewsTow from './components/NewsTow';
import LoadingCircular from './components/Loading';
import Intro from './components/Intro';
import CountDown from 'react-native-countdown-component';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShoppingCart, faBars, faChevronRight, faHome, faHeart, faBell, faUser } from '@fortawesome/free-solid-svg-icons'
const mapStateToProps = state => ({
  user_login: state.user_login,
  cart: state.cart,
});

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class ListUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      search: '',
      users: [],
      user_info: [],
      progess: [],
    };
	
		
	apis.getUsers().then(res => {
		
		this.setState({
			users: res.data.data.items,
			progess: false,
		}) 
		
    });
	
  }
componentWillMount(){
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
  
     //Put your Data loading function here instead of my this.LoadData()
    });}
	  componentDidMount() {
		
	  }

 
	showHome = (showIntro) => {
    this.setState({
		showModal: false
	})
  }
  render() {
    const {search,progess,showModal } = this.state;


   
    return (
	
        <View style={styles.wrapper}>
          

          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7'}}>

              {/* Home Header Logo */}
			  
			<Header navigation={this.props.navigation} />
             <Text style={{fontSize: 11,color: '#c5c5c5', width: width, textAlign: 'center', marginTop: 20}}>
			 DAMDA People
			 </Text>
			 <Text style={{fontSize: 21,color: '#000', width: width, textAlign: 'center', marginTop: 5, fontWeight: 'bold' }}>
			 담다 피플
			 </Text>
				
				<Branch navigation={this.props.navigation}/>
				
				 <View style={styles.item_section}>
								{
									this.state.users.map((val, index_) => {
										let name
										let img
										let des
										let json = JSON.parse(val.account_info).id;
										for(let i = 0; i < val.vendor_config.length; i++){
											if(val.vendor_config[i].path == 'general/store_information/name'){name = val.vendor_config[i].value; }
											if(val.vendor_config[i].path == 'general/store_information/logo'){img = val.vendor_config[i].value; }
											if(val.vendor_config[i].path == 'general/store_information/short_description'){des = val.vendor_config[i].value; }
										}
										if(val.status == 2)
										return (
									<View style={styles.lisection1}>
									<TouchableOpacity style={styles.lisection1} onPress={() => this.props.navigation.navigate('Detail', {product: val_})}>
                                         <View style={styles.item_image}>
                              <Image 
									 source={{uri: img,width: (width)*0.5 - 20, height: (width)*0.5 - 20}}/>
                          </View>
                                            
                                           
                                        
                                            
                                      </TouchableOpacity>
									<TouchableOpacity style={[styles.csection1,{width: width, marginTop: 15, marginBottom: 15}]} onPress={() =>this.props.navigation.navigate('Category', {categoryId: val})}>
                                                 <View style={styles.cimage}>
												 <Image 
												  style={[styles.cimage, {marginLeft:10,borderRadius: 19, marginTop:-1, width: 38}]}
									 source={{uri: img,width: 38, height: 38}}/>
												 </View>
									<View style={{position: 'absolute', top: -5, left: 58}}>
                                                 <Text style={[styles.ctext, {fontSize: 16,fontWeight: 'bold', color:'#000'}]}>{name}</Text>
                                                 <Text style={[styles.ctext, {fontSize: 13, color:'#d6d6d6'}]}>{des}</Text>
												 </View>
                                            </TouchableOpacity>
									</View>
									
					 
						)
									})
			}
					</View>
				
                
											 
											
              </ScrollView>
			   
            </View>

          {/*  Navbar Bottom */}
		
          <Navbar navigation={this.props.navigation} flashSaleItem={this.state.flashSaleItem} end={this.state.end}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
	section_flashsale:{
      marginTop:-15,
    },
	container_:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
	wrapper:{
		flex: 1
	},
	services:{
    backgroundColor:'#fff',
  },
  ssection1:{
    width:width*0.32,
    alignItems:'center',
    paddingTop:10,
	marginLeft:width*0.01,
	
  },
  item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
      marginLeft:15,
      marginTop:10,
    },
    item_section:{
  		
  		flexDirection:'row',
  		flexWrap:'wrap',
  		
  	},
	itext:{
    color:'#454545',
    fontSize:13,
    marginLeft:6,
	height: 50,
  },
  oldprice:{
    color:'#999999',
    marginLeft:6,
  },
  pricedash:{
    backgroundColor:'#999999',
    height:1,
    marginLeft:6,
    width:70,
    marginTop:-9,
  },
  newprice:{
    color:'#ed7ca8', 
    fontWeight:'bold',
    marginLeft:6,
    marginTop:5,
  },
	item_price:{
      marginLeft:15,
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
    },
  	item:{
      width:(width-30)*0.5,
      borderColor:'#e3e3e3',
      borderWidth:1,
      backgroundColor:'#fff',
    },
    item_image:{
      alignItems:'center',
      justifyContent:'center',
    },
    image_fit:{
      width:(width-40)*0.5,
    },
    item_title:{
      marginLeft:15,
      marginTop:15,
      textTransform: 'uppercase',
      color:'#0f1738',
    },
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
  },
  title:{
    textTransform: 'uppercase',
    color:'#ed7ca8',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    paddingTop:7,
    paddingBottom:7,
  },
  setting:{
    paddingLeft:15,
    backgroundColor:'#ebebeb',
    borderTopColor:'#cccccc',
    borderTopWidth:1,
    borderBottomColor:'#cccccc',
    borderBottomWidth:1,
  },
  ssection1:{
    marginRight:10,
    paddingTop:7,
    paddingBottom:7,
  },
  simage:{
    borderRadius:6,
    borderColor:'#d1d1d1',
    borderWidth:1,
  },
  stext:{
    color:'#909090',
    paddingTop:2,
    paddingBottom:2,
    paddingLeft:2,
    paddingRight:2,
  },
  fsection1:{
    marginTop:5,
    marginBottom:5,
    marginLeft:15,
    flexDirection: 'row',
    width:width*0.45,
  },
  fsection2:{
    width:width*0.45,
    marginTop:5,
    marginBottom:5,
    marginLeft:15,
    justifyContent:'flex-end',
    flexDirection: 'row',
    paddingRight:15,
  },
  ftext:{
    textAlign:'left',
  }, 
  ficon:{
    justifyContent:'center',
    marginLeft:5,
  },
  listitem:{

  },
  lisection1:{
    width:width*0.5,


    
  },
  liimage:{
    alignItems:'center',
  },
  litext:{
    color:'#454545',
    fontSize:13,
	marginTop: 15,
    
  },
  oldprice:{
    color:'#999999',
    
  },
  pricedash:{
    backgroundColor:'#999999',
    height:1,
    marginLeft:6,
    width:70,
    marginTop:-9,
  },
  newprice:{
    color:'#ed7ca8',
    fontWeight:'bold',
    
    marginTop:5,
  },
  sale:{
    color:'#fff',
    backgroundColor:'#5bc8ac',
    marginTop:5,
    right:0,
    position: 'absolute',
  },
  popup:{
    position: 'absolute',
    zIndex: 1,
    width:width,
    backgroundColor:'#fff',
    borderRadius:10,
    marginTop:60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  popupsection1:{
    width:width*0.32,
    alignItems:'flex-start',
    paddingLeft:15,
  },
  popupsection2:{
    width:width*0.32,
    alignItems:'center',
    paddingLeft:15,
  },
  popupsection3:{
    width:width*0.32,
    alignItems:'flex-end',
    paddingRight:15,
  },
  cancel:{
    paddingTop:5,
    paddingBottom:5,
    color:'#3d3d3d',
  },
  popuptitle:{
    paddingTop:5,
    paddingBottom:5,
    color:'#3d3d3d',
  },
  accept:{
    paddingTop:5,
    paddingBottom:5,
    color:'#ed7ca8',
  },
  popupdash:{
    backgroundColor:'#e1e1e1',
    height:2,
  },
  popupcontent:{
    alignItems:'center',
    marginTop:10,
    marginBottom:10,
  },
  sborder:{
    width:1,
    backgroundColor:'#c3c3c3', 
    marginTop:15,
    marginBottom:15,
  },
  fssection1:{
    width:width*0.4,
    paddingLeft:20,
  },
  fssection2:{
    width:width*0.6,
    alignItems:'flex-end',
    paddingRight:20,
    justifyContent: 'center',
  },
  othersale1:{
    width:width*0.8,
    paddingLeft:20,
  },
  othersale2:{
    width:width*0.2,
    alignItems:'flex-end',
    paddingRight:20,
    justifyContent: 'center',
  },
  stext:{
    fontSize:13,
    color:'#434343',
    marginTop:5,
    textAlign:'center',
  },
	hot_fuction:{
      flexDirection:'row',
      flexWrap: 'wrap',
      paddingTop:7,
      paddingBottom:7,
      backgroundColor:'#3191cf',
    },
    hot_left_fuction:{
      width:width*0.5,
      alignItems:'flex-start',
      paddingLeft:25,
    },
	hot_title:{
      textTransform:'uppercase',
      color:'#fff'
    },
	item:{
    marginTop:15,
    marginLeft:15,
  },
  isection1:{
    width:width*0.38, 
    borderWidth: 1,
    borderColor: '#e5e5e5',
    
    paddingBottom:5,
    marginBottom:10,
  },
  iimage:{
    marginTop:5,
  },
  itext:{
    color:'#454545',
    fontSize:13,
    marginLeft:6,
	height: 50,
  marginTop:10,
  },
  oldprice:{
    color:'#999999',
    marginLeft:6,
  },
  pricedash:{
    backgroundColor:'#999999',
    height:1,
    marginLeft:6,
    width:70,
    marginTop:-9,
  },
  newprice:{
    color:'#ed7ca8',
    fontWeight:'bold',
    marginLeft:6,
    marginTop:5,
  },
    hot_right_fuction:{
      width:width*0.5,
      alignItems:'flex-end',
      paddingRight:25,
    },
    hot_text:{
      fontSize:13,
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
	 about_section:{
      alignItems:'center',
      paddingTop:20,
      paddingBottom:30,
      marginBottom:80,
    },
    contact_me:{
      flexDirection:'row',
      flexWrap: 'wrap',
    },
    mg_8x8:{
      marginLeft:8,
      marginRight:8,
    },
    mg_top25:{
      marginTop:25,
    },
    conpany:{
      textTransform:'uppercase',
      marginTop:10,
      fontSize:13,
      color:'#0f1738'
    },
    dash:{
      height:2,
      backgroundColor:'#e5e5e5',
      width:width-60,
      marginTop:5,
      marginBottom:8,
    },
    address:{
      fontSize:13,
      color:'#0f1738'
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
  bottom1:{
    color:'#8d8d8d',
    fontSize:12,
  },
  popup:{
    width:width*0.85,
    position:'absolute',
    backgroundColor:'#fff',
    zIndex:100,
  },
  popup_box:{
    height:height,
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
  popup_naviga:{
    marginLeft:20,
  },
  popup_naviga_text:{
    paddingTop:5,
    paddingBottom:5,
    textTransform:'uppercase',
    marginTop:10,
  },
    flashsale_fuction:{
      flexDirection:'row',
      flexWrap: 'wrap',
      paddingTop:7,
      paddingBottom:7,
      backgroundColor:'#ededed',
    },
    flashsale_left_fuction:{
      width:width*0.33,
      alignItems:'flex-start',
      paddingLeft:25,
    },
    flashsale_center_fuction:{
      width:width*0.33,
      alignItems:'center',
    },
    flashsale_right_fuction:{
      width:width*0.33,
      alignItems:'flex-end',
      paddingRight:25,
    },
    fl_text:{
      fontSize:13,
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    marginTop: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  itemcenter: {
    position: 'relative',
    alignItems: 'center'
  },
  banner: {
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#fff',
  },

  textCategory: {
    position: 'absolute',

    textAlign: 'center',
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    color: '#fff',
    backgroundColor: '#ff5c00',
    top: ((width - 40) / 344) * 64 - 5,
    fontSize: 18,
  },
flashsale:{
    marginTop:15,
  },
  fsaletext:{
    textTransform: 'uppercase',
    color:'#ed7ca8',
    fontSize:20,
    fontWeight:'bold',
  },
  fssection1:{
    width:width*0.4,
    paddingLeft:20,
  },
  ctimg: {
    borderRadius: 10,
    width: width - 40,
    height: ((width - 40) / 344) * 128,
    marginTop: 25,
  },
});
export default connect(mapStateToProps)(ListUser);

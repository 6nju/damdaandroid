import React from 'react';
import { StyleSheet, Text, View, Share,  Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Header from './components/Header';
import Navbar from './components/navbar';
import ListOne from './components/ListOne';
import CasItem from './components/CasItem';
import ListTow from './components/ListTow';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShoppingCart, faBars, faChevronRight, faSlidersH, faSort } from '@fortawesome/free-solid-svg-icons'
import LoadingCircular from './components/Loading';
export default class Category extends React.Component { 
	constructor(props) {
    super(props);
    this.state = {
      sonCategories: [],
      array_page: [],
      categories: [],
      type:0,
      categoryId:(this.props.navigation.state.params.categoryId != 'undefined') ? this.props.navigation.state.params.categoryId : 0,
      vendor:(this.props.navigation.state.params.vendor != 'undefined') ? this.props.navigation.state.params.vendor : 0,
      cas:[],
      products:[],
      post:[],
      postTow:[],
      tab:0,
      total_post:0,
      page:1,
      categorySonId:0,
      biography:'',
      title_:'',
      vendor_id:0,
      profile_picture_url:(this.props.navigation.state.params.img != 'undefined') ? this.props.navigation.state.params.img : '',
      name:'',
      progess: false,
      
      navigation: this.props.navigation,
    };
	
  }
	componentDidMount() {
		
    this._promisAll();
  }

  _promisAll = () => {
    

    /*
     * API getCategoryCode
     * @param
     *       categoryCode : string
     * */
	 
	
	
    apis.getUsersInfo(this.state.categoryId).then(res => {
		
		
		this.setState({
			post: res.data.data.items,
			progess: false,
			total_post: res.data.data.total_count,
			name: res.data.data.items[0].account_info.name,
			biography: res.data.data.items[0].account_info.biography,
			
			
		}) 

		
		
    });
	
	apis.getUsersInf(this.state.vendor).then(res => {

		
								
		this.setState({
			postTow: res.data.items,
			
		}) 
		
		
    });
	
  };
  _showSubSon(id){
	   let sub = []
		  this.setState({
			  categorySonId: this.state.categories[id].id,
			  
			  progess: true,
		  }) 
		
		  apis.getCategorySon(this.state.categories[id].id).then(res_ => {

					this.setState({
						products: res.data.items,
						progess: false,
					})
				
				
				
			})
		
  }
  _shareFacebook  = () => {
	 Share.share(
      {
        title: "Title",
        message: "Some message",
        // or
        url: 'https://www.facebook.com/sharer/sharer.php?u=https://m.damda.com/shop/seller_1'
      },
      
    );
  }
  
  render() {
    const {goBack} = this.props.navigation;
	const {search,progess } = this.state;
	if (progess) return <LoadingCircular />;
	else 
    return (
      <View style={styles.wrapper}>
      		
          	
          	<ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollview_section}>
		          	<Header navigation={this.props.navigation} />
                <View style={[styles.csection1,{marginTop: 50, marginBottom: 15}]}>
                                                 <View style={styles.cimage}>
												 <Image 
												  style={[styles.cimage, {marginLeft:10,borderRadius: 35, marginTop:-1, width: 70}]}
									 source={{uri: this.state.profile_picture_url,width: 70, height: 70}}/>
												 </View>
												 
									<View style={{marginLeft: 10}}>
                                                 <Text style={[styles.ctext, {fontSize: 16,fontWeight: 'bold', color:'#000'}]}>{this.state.name}</Text>
                                                 <Text style={[styles.ctext, {fontSize: 13, color:'#a4a4a4'}]}>{this.state.biography}</Text>
												 </View>
                                            </View>  

						<View style={{position: 'absolute', right: 20, top: 45}}>
							<Text style={{width: 50,textAlign: 'center', fontWeight: 'bold'}}>
							4{'\n'}팔로워
							</Text>
						</View>
						<View style={{position: 'absolute', right: 70, top: 45}}>
							<Text style={{width: 50,textAlign: 'center', fontWeight: 'bold'}}>
							{this.state.postTow.length}{'\n'}아이템
							</Text>
						</View>
						<View style={{position: 'absolute', right: 120, top: 45}}>
							<Text style={{width: 50,textAlign: 'center', fontWeight: 'bold'}}>
								{this.state.total_post}{'\n'}컨텐츠
							</Text>
						</View>
						 <TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 20, top: 95}]}>
					 <Image
                                            style={styles.simage}
                                            source={require('./imgs/ic_follow_off.png')}
                                        />
					 
					</TouchableOpacity>
					<TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 55, top: 95}]} onPress={() => {
						 
						 this.setState({status_: !this.state.status_})
						 
						 }}>
					 <Image
                                            style={styles.simage}
                                            source={require('./imgs/ic_share.png')}
                                        />
					 
					</TouchableOpacity>
					{ (this.state.status_) ?
					
					<TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 88, top: 97}]}onPress={this._shareFacebook}>
					 <Image
                                            style={[styles.simage, {width: 28,height:28}]}
                                            source={require('./imgs/kakao_talk.png')}
                                        />
					 
					</TouchableOpacity> : null
					}
					{ (this.state.status_) ?
					
					<TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 123, top: 97}]}onPress={this._shareFacebook}>
					 <Image
                                            style={[styles.simage, {width: 28,height:28}]}
                                            source={require('./imgs/icon-facebook.png')}
                                        />
					 
					</TouchableOpacity> : null
					}
					{ (this.state.status_) ?
					
					<TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 157, top: 97}]}onPress={this._shareFacebook}>
					 <Image
                                            style={[styles.simage, {width: 28,height:28}]}
                                            source={require('./imgs/icon-kakao-story-small.png')}
                                        />
					 
					</TouchableOpacity> : null
					}
					{ (this.state.status_) ?
					
					<TouchableOpacity style={[{width: 20,height:20, position: 'absolute',zIndex: 1000, right: 190, top: 97}]}onPress={this._shareFacebook}>
					 <Image
                                            style={[styles.simage, {width: 28,height:28}]}
                                            source={require('./imgs/link_share.png')}
                                        />
					 
					</TouchableOpacity> : null
					}
						<View style={[styles.item_section,{width: width, borderColor: '#ddd', borderBottomWidth: 1, borderTopWidth: 1, paddingTop: 5}]}>
							{
								
						<TouchableOpacity  onPress={() => this.setState({tab: 0})}>
						<Text style={[styles.ctext, {fontSize: 14, color:(!this.state.tab) ? '#FC8257' : '#000', marginLeft:5, marginRight:5, marginBottom:5, fontWeight: 'bold'}]}>컨텐츠</Text>
						</TouchableOpacity>
						
							}
						<TouchableOpacity onPress={() => this.setState({tab: 1})}>
						<Text style={[styles.ctext, {fontSize: 14, color:(this.state.tab) ? '#FC8257' : '#000', marginLeft:5, marginRight: 5, marginBottom:5, fontWeight: 'bold'}]}>아이템</Text>
						</TouchableOpacity>
						</View>
						{
						(!this.state.tab) ?
						<View style={[styles.item_section]}>
						{
									this.state.post.map((val_, index_) => {
										let img
									if(Array.isArray(val_.source)){
										img = { uri: val_.source[0].url }
									}else{
										img = { uri: this.state.post[index_].source }	
										
									}
									
											
										
                                         
										return (
						<TouchableOpacity style={styles.lisection1} onPress={() => this.props.navigation.navigate('Detail', {product: val_})}>
                                         <View style={styles.item_image}>
											 { (val_.source != null && val_.source != '') ?
                              <Image style={{width: (width)*0.5, height: (width)*0.5}}
									 source={img}/> : null
											 }
											 
                          </View>
                                            
                                           
                                        
                                            
                                      </TouchableOpacity>
									  )
									})
			}
						</View> : <View style={[styles.item_section]}>
						{
									this.state.postTow.map((val_, index_) => {
									
								
										
										let img
										let view
										
										for(let i = 0; i < val_.custom_attributes.length; i++){
											
											if(val_.custom_attributes[i].attribute_code == 'image'){
												img = { uri: 'https://www.seoulmall.kr/pub/media/catalog/product'+val_.custom_attributes[i].value }	
												
												}
												
												
											
										}
                                         
										return (
						<TouchableOpacity style={styles.lisection1} onPress={() => this.props.navigation.navigate('DetailTow', {product: val_})}>
                                         
										 <View style={styles.item_image}>
                              <Image style={{width: (width)*0.5, height: (width)*0.5}}
									 source={img}/>
                          </View> 
                                            
                                           <Text style={{color: '#fb6834', fontSize: 13, fontWeight: 'bold'}}>
										   {val_.price} 원
										   </Text>
                                         <Text style={{color: '#292929', fontSize: 13, fontWeight: 'bold'}}>
										   {val_.name}
										   </Text>
                                           <View style={{width: '100%', flexDirection:'row',flexWrap:'wrap',}}>
										   <TouchableOpacity style={[{width: 20,height:20, zIndex: 1000}]}>
					 <Image
                                            style={[styles.simage, {marginTop: 5}]}
                                            
                                            source={require('./imgs/ic_addcount.png')}
                                        />
					 
					</TouchableOpacity>
									<Text style={{fontSize: 13, fontWeight: 'bold'}}>
										   10
										   </Text>
										   <TouchableOpacity style={[{width: 20,height:20, marginLeft: 5}]} onPress={() => {
						 
						 this.setState({status_tow: !this.state.status_tow})
						 
						 }}>
					 <Image
                                            style={[styles.simage, {width: 20,height:20}]}
                                            source={require('./imgs/ic_share.png')}
                                        />
					 
					</TouchableOpacity>
					{ (this.state.status_tow) ?
					
					<TouchableOpacity style={[{width: 20,height:20, marginLeft: 5}]} onPress={this._shareFacebook}>
					 <Image
                                            style={[styles.simage, {width: 20,height:20,}]}
                                            source={require('./imgs/kakao_talk.png')}
                                        />
					 
					</TouchableOpacity> : null
					}
					{ (this.state.status_tow) ?
					
					<TouchableOpacity style={[{width: 20,height:20, marginLeft: 5}]} onPress={this._shareFacebook}>
					 <Image
                                            style={[styles.simage, {width: 20,height:20,}]}
                                            source={require('./imgs/icon-facebook.png')}
                                        />
					 
					</TouchableOpacity> : null
					}
					{ (this.state.status_tow) ?
					
					<TouchableOpacity style={[{width: 20,height:20, marginLeft: 5}]} onPress={this._shareFacebook}>
					 <Image
                                            style={[styles.simage, {width: 20,height:20,}]}
                                            source={require('./imgs/icon-kakao-story-small.png')}
                                        />
					 
					</TouchableOpacity> : null
					}
					{ (this.state.status_tow) ?
					
					<TouchableOpacity style={[{width: 20,height:20, marginLeft: 5}]}onPress={this._shareFacebook}>
					 <Image
                                            style={[styles.simage, {width: 20,height:20,}]}
                                            source={require('./imgs/link_share.png')}
                                        />
					 
					</TouchableOpacity> : null
					}
										   </View>
											
										
                                      </TouchableOpacity>
									  )
									})
			}
						</View>
						}
          	</ScrollView>
          	<Navbar navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	wrapper:{
		flex: 1
	},
	lisection1:{
    width:width*0.5,


    
  },
	item_section:{
  		
  		flexDirection:'row',
  		flexWrap:'wrap',
  		
  	},
 	header_section:{
	    flexDirection:'row',
	    flexWrap:'wrap',
	    backgroundColor:'#fff',
	    paddingTop:5,
	    paddingBottom:5,
  	},
	header_left:{
	    alignItems:'center',
	    width:width*0.1,
	},
	page: {
    textAlign: 'center',

    marginTop: 10,
    marginBottom: 10,
    marginLeft:10,

    paddingBottom:5,
    paddingTop:5,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'#fff',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  	header_right:{
	    alignItems:'flex-start',
	    width:width*0.1,
  	},
  	header_middle:{
    	width:width*0.7,
  	},
  	scrollview_brand:{
  		backgroundColor:'#fff',
  	},
  	brand_title_box:{
  		marginLeft:30,
  		marginRight:15,
  		alignItems:'center',
  		marginTop:15,
  		paddingBottom:15,
  	},
  	brand_text:{
  		color:'#0f1738',
  		textTransform: 'uppercase',
  	},
  	scrollview_category:{
  		backgroundColor:'#ed7ca8',
  	},
  	category_title_box:{
  		
  		
  		paddingTop:15,
  		paddingBottom:15,
		width: width*.4,
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
    marginLeft:6,
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
});
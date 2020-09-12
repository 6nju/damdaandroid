import React, {Component} from 'react';
import {
  apis,
  colors,
  globalStyles,
  pmathText,
  settings,
  images,
} from '../../configs/index';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  BackHandler,
  ScrollView,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Image,
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Carousel from 'react-native-snap-carousel';
import Swiper from 'react-native-swiper'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import Course from '../Card';

import LoadingCircular from '../Loading';



const {width: viewportWidth} = Dimensions.get('window');

class BranchTow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoryId: '',
      categoryName: '',
      products: [],
      count: 0,
      array_page: [],
      progess: true,
      params: this.props.params,
      navigation: this.props.navigation,
    };
	
	
  }

 componentDidMount() {
    this._promisAll();
  }

  _promisAll = () => {
    const {params} = this.state;

    /*
     * API getCategoryCode
     * @param
     *       categoryCode : string
     * */
	
    apis.getBranch().then(res => {
		
		
		this.setState({
			categories: res.data,
			progess: false,
		}) 
		
    });
  };

  



  

  render() {
    const { params,categories, products, progess} = this.state;
	
   

    if (progess) return <LoadingCircular />;
	else
        return (
            <View style={styles.category}>
                                      <ScrollView 
                                         horizontal={true}
                                         showsHorizontalScrollIndicator={false}
                                         >
										 {
									this.state.categories.map((val, index_) => {
										if(val.is_featured == 1)
										return (
                                            <TouchableOpacity style={styles.csection1}>
                                                 <View style={styles.cimage}>
												 <Image 
												  style={[styles.cimage]}
									 source={{uri: val.image,width: width*0.31, height: width*0.31}}/>
												 </View>
                                                 <Text style={styles.ctext}>{val.value}</Text>
                                            </TouchableOpacity>
                                            
                                        
										)
									})
										 }
										 </ScrollView>
                                </View>
        );
    

  }
}

export default BranchTow;
const styles = StyleSheet.create({
    category:{
    marginTop:16,
  },
  csection1:{
    width:width*0.31,
    marginLeft:width*0.015,
    alignItems:'center', 
  },
  cimage:{
    
    borderColor:'#767676',
    borderWidth:1,
    width:width*.31,
    height:width*.31,
    backgroundColor:'#fff',
  },
  ctext:{
	  height:50,
    fontSize:13,
    color:'#434343',
    marginTop:5,
    textAlign:'center',
  },
});

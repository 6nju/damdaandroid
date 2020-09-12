import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View,Image,Dimensions,TouchableOpacity } from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Swiper from 'react-native-swiper'


export default class Introscreen extends Component {
  constructor(props) {
        super(props)
        this.state = {
      
      progess_:(typeof this.props.tess_ != 'undefined') ? false : true,

        }
      }
      componentDidMount() {
    
        if(this.state.progess_){
          setTimeout( () => {
             this.setState({progess_: false})
          },2000);
      }
      }

  render() {
    const { progess_ } = this.state
    if (this.state.progess_) return <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
                <Image 
          source={require('./imgs/Intro.png')}   
          style={{width:width,height:height}}
        />
            </View>
        else
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
              <Image
                                  style={{width:width,height:width*1340/750}}
                                  source={require('./imgs/introduction1.png')}
                                
              />
              <TouchableOpacity style={styles.skip} onPress={() =>this.props.navigation.navigate('Home')}><Text style={{color:'#fff'}}>Skip</Text></TouchableOpacity>
        </View>
        <View style={styles.slide2}>
          <Image
                                  style={{width:width,height:width*1340/750}}
                                  source={require('./imgs/introduction2.png')}
                                
              />
              <TouchableOpacity style={styles.skip} onPress={() =>this.props.navigation.navigate('Home')}><Text style={{color:'#fff'}}>Skip</Text></TouchableOpacity>
        </View>
        
      </Swiper>

    )
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  skip:{
    position: 'absolute',
    bottom:60,
    backgroundColor:'orange',
    paddingTop:7,
    paddingBottom:7,
    paddingLeft:20,
    paddingRight:20,
    borderRadius:50,
  }
})


AppRegistry.registerComponent('myproject', () => SwiperComponent)
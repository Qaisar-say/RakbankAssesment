import React,{Component} from 'react';
import { StyleSheet, View, Button,Image,ActivityIndicator } from 'react-native';


export default class App extends Component{

  state = {
    isLoading: false,
    title:'Activate',
    backgroundColor:'blue'
  };

  showLoader = () => {
    this.setState({ isLoading: true });
  };

async requestToPostData(){
  try{
    this.setState({title:'Waiting'})
    await fetch('https://virtserver.swaggerhub.com/rakmobility/assessment/1.0.0/activation',{
      method: 'post',
      mode: "no-cors",
      headers: {
        'activation':'Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZW1vdXNlcjEiLCJuYW1lIjoiUkFLQkFOSyBEZW1vIiwiaWF0IjoxNTE2MjM5MDIyfQ.hD2So1Jms00c7XB_bxNIrTgvSqMesmrlc0FkBAdY6rM',
        'Accept':'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'productId': '42jqp008d2l03',
        'emirate': 'Dubai'
      })
    }).then((response) => {
      if(response.status === 200){
        this.setState({isLoading: false})
        this.setState({title:'Activated'})
        this.setState({backgroundColor:'green'})
      }})
  }catch(e){
    console.log(e);
  }
}

 render(){
   return(
     <View style={styles.container}>
      <Image source={require('./assets/logo.png')}  style={{width:150, height:150,borderRadius:10}}/>
        <View style={[styles.button, {backgroundColor: this.state.backgroundColor}]}>
          <ActivityIndicator size="small" color="#fff"  animating={this.state.isLoading}/>
          <Button color="#fff"
                onPress={() => {
                  this.requestToPostData();
                  this.showLoader();
                }}
                title={this.state.title}
              />
        </View>
     </View>
   );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    marginTop:100,
    width:120,
    backgroundColor:'blue',
    color:'#fff',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

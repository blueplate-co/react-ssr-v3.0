import React from 'react';
import Link from 'next/link';

import Head from '../../components/head';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import CreateProfile from '../../components/createProfile';
import Notification from './../../components/notification';
import Layout from '../../components/layout';

import store from '../../stores/store';
import { Provider } from 'mobx-react';

import axios from 'axios';
import Router from 'next/router';

export default class CreateProfilePage extends React.Component {

  constructor(props) {
    super(props);
    
  }

  /**
   * Author: Tran Sy Bao
   * Created at: 21-02-2017
   */
  componentDidMount = () => {

    //- set axios default
    if(localStorage.getItem('userToken') !== null)
    {
      var token = localStorage.getItem('userToken');
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      
      //- check token
      this.checkToken(token);

    }else{
      alert('Permission denied!');
      Router.push('/');
    }   

  }

  checkToken = (token)=>{
    //- check token expired
    axios.post('http://13.250.107.234/api/check/token', {
      userToken: token
    })
    .then(function(res){
        console.log(res);
    })
    .catch(error=>{
      var data = error.response.data;
      if(data === 'expired')
      {
          console.log('token hết hạn');
          alert('Token is expired !');
          Router.push('/');
      }
      alert('Permission denied!');
      Router.push('/');
    });
  }
  //====================================

  render () {
    return (
      <Provider store={store}>
        <Notification>
          <Layout>
              <Head title="Create profile" />
              <Navigation title="blueplate"/>
              <CreateProfile/>
            <Footer/>
          </Layout>
        </Notification>
      </Provider>
    )
  }
}

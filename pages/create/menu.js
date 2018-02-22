import React from 'react';
import Link from 'next/link';

import Head from '../../components/head';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import CreateMenu from '../../components/createMenu';

import Layout from '../../components/layout';

import store from '../../stores/store';
import { Provider } from 'mobx-react';

export default class CreateMenuPage extends React.Component {

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
    }   

  }
  //====================================

  render () {
    return (
      <Provider store={store}>
        <Layout>
          <Head title="Create menu" />
          <Navigation title="blueplate"/>
          <CreateMenu/>
          <Footer/>
        </Layout>
      </Provider>
    )
  }
}

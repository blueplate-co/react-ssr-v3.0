import React from 'react';
import Link from 'next/link';

import Head from '../../components/head';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import CreateDish from '../../components/createDish';

import Layout from '../../components/layout';

import store from '../../stores/store';
import { Provider } from 'mobx-react';

import axios from 'axios';

export default class CreateDishPage extends React.Component {

  constructor(props) {
    super(props);
  }

  /**
   * Author: Tran Sy Bao
   * Created at: 22s-02-2017
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
          <Head title="Create dish" />
          <Navigation title="blueplate"/>
          <CreateDish/>
          <Footer/>
        </Layout>
      </Provider>
    )
  }
}

import React from 'react';
import Link from 'next/link';
import Router from 'next/router'

import Head from '../components/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

import Layout from '../components/layout';

import store from '../stores/store';
import { Provider } from 'mobx-react';

import BecomeComponent from '../components/become';

export default class Become extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    const that = this;
    return (
      <Provider store={store}>
        <Layout>
          <Head title="Blueplate" />
          <Navigation title="Blueplate"/>
          <BecomeComponent/>
          <Footer/>
        </Layout>
      </Provider>
    )
  }
}

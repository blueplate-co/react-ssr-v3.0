import React from 'react';
import Link from 'next/link';

import Head from '../components/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

import Layout from '../components/layout';

import store from '../stores/store';
import { Provider } from 'mobx-react';

export default class Index extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Provider store={store}>
        <Layout>
          <Head title="Blueplate" />
          <Navigation title="Blueplate"/>
          <Footer/>
        </Layout>
      </Provider>
    )
  }
}

import React from 'react';
import Link from 'next/link';

import Head from '../components/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

import Layout from '../components/layout';

import store from '../store';
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
          <Navigation name="navigation"/>
          <Footer/>
        </Layout>
      </Provider>
    )
  }
}

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

export default class CreateProfilePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Provider store={store}>
        <Layout>
            <Head title="Create profile" />
            <Navigation title="blueplate"/>
            <CreateProfile/>
          <Footer/>
        </Layout>
      </Provider>
    )
  }
}

import React from 'react';
import Link from 'next/link';

import Head from '../../components/head';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import CreateDish from '../../components/createDish';
import Notification from './../../components/notification';

import Layout from '../../components/layout';

import store from '../../stores/store';
import { Provider } from 'mobx-react';

export default class CreateDishPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Provider store={store}>
        <Layout>
          <Notification>
            <Head title="Create dish" />
            <Navigation title="blueplate"/>
            <CreateDish/>
            <Footer/>
          </Notification>
        </Layout>
      </Provider>
    )
  }
}

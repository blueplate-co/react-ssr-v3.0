import React from 'react';
import Link from 'next/link';

import Head from '../components/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import Notification from '../components/notification';
import RegisterForm from '../components/register';

import Layout from '../components/layout';

import store from '../stores/store';
import { Provider } from 'mobx-react';

export default class Register extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Provider store={store}>
        <Layout>
          <style jsx>{`
              /* Landscape phones and down */
              @media (max-width: 480px) {
                  .container {
                    .description {
                      text-align: justify;
                      font-size: 14px;
                    }
                    .bottom-confirmation {
                      position: fixed;
                      width: 70%;
                      bottom: 15px;
                      z-index: 5;
                      left: 15%;
                  }
                  }
              }
          `}</style>
          <Notification>
            <Head title="Blueplate" />
            <Navigation title="Blueplate"/>
            <RegisterForm />
            <Footer/>
          </Notification>
        </Layout>
      </Provider>
    )
  }
}

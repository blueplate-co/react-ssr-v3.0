import React from 'react';
import Link from 'next/link';
import Router from 'next/router'

import Head from '../components/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import LoginForm from '../components/login';
import Notification from '../components/notification';

import Layout from '../components/layout';

import store from '../stores/store';
import { Provider } from 'mobx-react';

import validator from 'validator';
import axios from 'axios';
import md5 from 'md5';

export default class Index extends React.Component {

  constructor(props) {
    super(props);
  }

  // clear SessionStorage before test again
  componentDidMount = () => {
    sessionStorage.setItem('welcomeStage', 0);
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
            <LoginForm />
            <Footer/>
          </Notification>
        </Layout>
      </Provider>
    )
  }
}

import React from 'react';
import Link from 'next/link';
import Router from 'next/router'

import Head from '../components/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

import Layout from '../components/layout';

import store from '../stores/store';
import { Provider } from 'mobx-react';

import validator from 'validator';

export default class Index extends React.Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      argree: false,
      stage: 'login'
    }
  }

  // action when user click register
  login = () => {
    let password = this.refs.password.value;
    let email = this.refs.email.value;

    if (validator.trim(password).length < 6) {
      alert('Must have password with length greater than 6 characters');
      return false;
    } else if (!validator.isEmail(validator.trim(email))) {
      alert('Invalid email address');
      return false;
    } else {
      // call axios api at here

      Router.push('/become');
    }
  }

  // handleChange when click term/condition
  forgotPassword = () => {
    this.setState({
      stage: 'forgotPassword'
    })
  }

  // when user click sign in when at email validation screen
  backSignIn = () => {
    this.setState({
      stage: 'login'
    })
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
          <Head title="Blueplate" />
          <Navigation title="Blueplate"/>
          {
              this.state.stage === 'login' ?
              (
                  <div className="container">
                    <h3>Sign In</h3>
                    <input type="text" required ref="email" placeholder="email address" autoComplete="off"/>
                    <input type="password" required ref="password" placeholder="password" autoComplete="off"/>
                    <p style={{ margin: `25px 0px`, display: `inline-block`, width: `100%` }}>
                        <a onClick={ this.forgotPassword } className="clickable">forgot password</a>
                    </p>
                    <div className="bottom-confirmation">
                        <button className="btn" onClick={ this.login }>Next</button>
                    </div>
                  </div>
              ) :
              (
                  <div className="container">
                    <h3>Forget password</h3>
                    <input type="text" required ref="email" placeholder="email"/>
                    <p style={{ margin: `25px 0px`, display: `inline-block`, width: `100%` }}>
                        Just member <a onClick={ this.backSignIn } className="clickable">sign in</a>
                    </p>
                  </div>
              )
          }
          <Footer/>
        </Layout>
      </Provider>
    )
  }
}

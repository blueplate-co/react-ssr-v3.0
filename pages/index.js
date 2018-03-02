import React from 'react';
import store from '../stores/store';
import { Provider } from 'mobx-react';
import Link from 'next/link'


import Head from '../components/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import cnf from '../config';

import Layout from '../components/layout';

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
              .bottom-confirmation {
                width: 100%;
                bottom: 15px;
                z-index: 5;
                left: 15%;
                .btn {
                    margin: 10px 0px;
                    border-radius: 0px;
                    color: ${cnf.color.primarycolor};
                    border: 1px solid ${cnf.color.primarycolor};
                    background-color: #fff;
                }
              }
              /* Landscape phones and down */
              @media (max-width: 480px) {
                .container {
                  .description {
                    text-align: justify;
                    font-size: 14px;
                  }
                }
              }
              /* Portrait tablet to landscape and desktop */
              @media (min-width: 1024px) {
                .container {
                  .description {
                    text-align: justify;
                    font-size: 14px;
                  }
                }
              }
          `}</style>
            <Head title="Blueplate" />
            <Navigation title="Blueplate"/>
            <div className="container">
                <h3>Landing page</h3>
                <div className="bottom-confirmation">
                    <Link href="/register">
                        <button className="btn inline" onClick={ this.saveAndContinue }>Join Us</button>
                    </Link>
                    <Link href="/login">
                        <button className="btn inline" onClick={ this.saveAndContinue }>Sign In</button>
                    </Link>
                </div>
            </div>
            <Footer/>
        </Layout>
      </Provider>
    )
  }
}

import React from 'react';
import Link from 'next/link';
import Unsplash from 'unsplash-js';

import Head from '../components/head';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import Notification from '../components/notification';
import Layout from '../components/layout';
import ProgressiveImages from '../components/progessiveImages';

import store from '../stores/store';
import { Provider } from 'mobx-react';


const unsplash = new Unsplash({
    applicationId: "a1491b5739fe22bcf8c7cfee2145727a5e57bb4d1f9b0f872a31d65a0fe3d025",
    secret: "01fa6a1434f376126ca3fa142f598e3ddae5ce520f05a9be999f8a16fc13d347",
    callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        small: '',
        large: ''
    }
  }

  componentDidMount = () => {
    unsplash.photos.getRandomPhoto({ query: 'food', collection: ['251966', '190727'] })
    .then(res => {
        res.json().then(data => {
            console.log(data);
            this.setState({
                small: data.urls.thumb,
                large: data.urls.full
            })
        })
    })
  }

  render () {
    return (
      <Provider store={store}>
        <Layout>
          <style jsx>{`
            .wrapper {
                width: 100%;
                height: 300px;
            }
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
            <Head title="Progressive Images" />
            <Navigation title="Blueplate"/>
            <div className="wrapper">
            {
                (this.state.large.length > 0) ?
                (
                    <ProgressiveImages
                        large={this.state.large}
                        small={this.state.small}
                    ></ProgressiveImages>
                ) : (
                    ""
                )
            }
            </div>
            <Footer/>
          </Notification>
        </Layout>
      </Provider>
    )
  }
}

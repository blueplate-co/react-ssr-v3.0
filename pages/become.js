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

export default class Become extends React.Component {

  constructor(props) {
    super(props);
    this.goStage = this.goStage.bind(this);
    this.state = {
      stage: [
        { name: 'Profile.', description: 'Who you are and how this started…' },
        { name: 'Create your 1st dishes.', description: 'Image, description, ingredient, price' },
        { name: 'Create your 1st menu', description: 'Your collection and sets' }
      ],
      currentStage: 0
    }
  }

  // click to go to create screen
  goStage = (index) => {
    switch (index) {
      case 0:
        Router.push('/create/profile');
        break;
      case 1:
        Router.push('/create/dish');
      case 2:
        Router.push('/create/menu')
      default:
        break;
    }
  }

  componentDidMount = () => {
    let stage = sessionStorage.getItem('welcomeStage');
    if (stage == null) {
      this.setState({
        currentStage: 0
      })
    } else {
      this.setState({
        currentStage: stage
      })
    }
  }

  render () {
    const that = this;
    return (
      <Provider store={store}>
        <Layout>
          <style jsx>{`
              /* Landscape phones and down */
              @media (max-width: 480px) {
                  .container {
                    .stage-list {
                      text-align: left;
                      margin: 20px 0px;
                      .title {
                        margin: 10px 0px;
                      }
                      .stage-name {
                        width: 100%;
                        display: block;
                        margin: 5px 0px;
                        font-size: 18px;
                      }
                      .stage-description {
                        font-size: 13px;
                        width: 100%;
                        display: block;
                      }
                      .btn {
                        width: 40%;
                        margin: 20px 0px;
                        padding: 10px;
                      }
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
              <div className="container">
                <h3>Become a homecook</h3>
                {
                    this.state.stage.map(function(item, index){
                        return (
                            <div key={index} className="stage-list">
                                <h4 className="title">Stage {index + 1}</h4>
                                <span className="stage-name">{item.name}</span>
                                <span className="stage-description">{item.description}</span>
                                {
                                  ( index == that.state.currentStage )
                                  ?
                                  <button className="btn" onClick={ () => that.goStage(index) }>Start</button>
                                  :
                                  <span></span>
                                }
                            </div>
                        )
                    })
                }
              </div>
          <Footer/>
        </Layout>
      </Provider>
    )
  }
}

import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';
import axios from 'axios';

import validator from 'validator';

@inject('store') @observer
export default class BecomeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.goStage = this.goStage.bind(this);
    this.state = {
      hasProfile: '',
      hasDish: '',
      loaded: false
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
        Router.push('/create/menu');
      default:
        break;
    }
  }

  componentDidMount = () => {
    // reset all global step and back function
    this.props.store.globalStep = 1;
    this.props.store.backFunction = null;

    // send request to check profile
    let roleForm = new FormData();
    roleForm.append('email', localStorage.getItem('userEmail'));
    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }
    try {
      var that = this;
      axios.post('http://13.250.107.234/api/user/check/role', roleForm, config)
      .then(function(response) {
          if (response.status === 200) {
            if (response.data.message !== 0) {
              that.setState({
                hasProfile: true
              }, () => {
                // send request to check dish list
                let dishForm = new FormData();
                dishForm.append('create_chef_id', localStorage.getItem('create_chef_id'));
                const roleConfig = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
                try {
                  axios.post('http://13.250.107.234/api/chef/view/dish', dishForm, config)
                  .then(function(response) {
                      if (response.status === 200) {
                        console.log(response);
                        if (response.data.data.length > 0) {
                          that.setState({
                            hasDish: true,
                            loaded: true
                          })
                        } else {
                          that.setState({
                            hasDish: false,
                            loaded: true
                          })
                        }
                      }
                  })
                } catch (error) {
                  console.log(error); 
                }
                // end check dish list

              })
            } else {
              that.setState({
                hasProfile: false,
                loaded: true
              });
            }
          } else {
            console.log(response);
          }
      })
    } catch (error) {
      console.log(error); 
    }

  }

  render () {
    const that = this;
    return (
        <div>
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
              @media (min-width: 1024px) {
                .container {
                  .stage-list {
                    text-align: left;
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
            <div className="container">
            <h3>Become a homecook</h3>

              {/* Stage 1 */}
              <div className="stage-list">
                  <h4 className="title">Stage 1</h4>
                  <span className="stage-name">Profile</span>
                  <span className="stage-description">Who you are and how this started…</span>
                  {
                      ( this.state.loaded == true && this.state.hasProfile == false )
                      ?
                      <Link href="/create/profile">
                        <button className="btn">Start</button>
                      </Link>
                      :
                      <span></span>
                  }
              </div>
              {/* Stage 2 */}
              <div className="stage-list">
                  <h4 className="title">Stage 2</h4>
                  <span className="stage-name">Create your 1st dishes.</span>
                  <span className="stage-description">Image, description, ingredient, price</span>
                  {
                      ( this.state.loaded == true && this.state.hasDish == false && this.state.hasProfile == true )
                      ?
                      <Link href="/create/dish">
                        <button className="btn">Start</button>
                      </Link>
                      :
                      <span></span>
                  }
              </div>
              {/* Stage 3 */}
              <div className="stage-list">
                  <h4 className="title">Stage 3</h4>
                  <span className="stage-name">Create your 1st menu</span>
                  <span className="stage-description">Your collection and sets</span>
                  {
                      ( this.state.loaded == true && this.state.hasDish == true )
                      ?
                      <Link href="/create/menu">
                        <button className="btn">Start</button>
                      </Link>
                      :
                      <span></span>
                  }
              </div>

            </div>
        </div>
    )
  }
}

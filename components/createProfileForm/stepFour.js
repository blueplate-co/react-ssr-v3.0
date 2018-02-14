import Link from 'next/link';
import React from 'react';

import validator from 'validator';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
export default class ProfileStepFour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cachefile: [],
            imgSrc: null
        }
        this.onChange = this.onChange.bind(this);
        this.clickUploadFile = this.clickUploadFile.bind(this);
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }

    clickUploadFile = (e) => {
        e.stopPropagation();
        this.refs.file.click();
    }

    onChange = () => {
        // Assuming only image
        var file = this.refs.file.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            this.setState({
                imgSrc: [reader.result],
                cachefile: file
            })
        }.bind(this); 
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        //flag variables to check error existed
        let errorStack = [];

        // Get values via this.refs
        let data = {
            profileImagesSrc: null,
            cachefile: null
        }

        if (!this.state.imgSrc || this.state.imgSrc.length < 0) {
            errorStack.push('Must set avatar');
        }

        // no error found
        if (errorStack.length == 0) {
            data = {
                profileImagesSrc: this.state.imgSrc,
                cacheFile: this.state.cachefile
            }
            
            this.props.saveValues(data);
            this.props.nextStep();
        } else {
            // have error
            var notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };

            // handle to avoid spam notification. If that notification is in notification array. Dont add into array
            if (this.props.store.notification.length > 0) {
                if (this.props.store.notification[0].content !== notification.content) {
                    this.props.store.addNotification(notification);
                }
            } else {
                this.props.store.addNotification(notification);
            }
        }
    }

    // handle action when user press Enter
    handleEnter = (e) => {
        if (e.keyCode == 13) { // only excute when press Enter key
            // trigger run saveAndContinue function
            this.saveAndContinue(e);
        }
    }

    componentDidMount = () => {
        // set function to back button
        this.props.store.setBackFunction(()=>{
            this.props.store.globalStep--;
        });

        document.getElementsByClassName('create_profile_step')[0].focus();

        this.props.setProgress(45);
    }

    render() {
        return (
            <div className="create_profile_step">
                <style jsx>{`
                    /* Landscape phones and down */
                    @media (max-width: 480px) {
                        .bottom-confirmation {
                            position: fixed;
                            width: 70%;
                            bottom: 15px;
                            z-index: 5;
                            left: 15%;
                        }
                        .circle-file-browse {
                            margin-top: 20px;
                            border: 1px solid #ccc;
                            border-radius: 50%;
                            width: 150px;
                            height: 150px;
                            margin: 0px auto;
                            text-align: center;
                            position: relative;
                            padding: 0;
                            overflow: hidden;
                            [type="file"] {
                                width: 1px;
                                height: 1px;
                                background-color: #000;
                                opacity: 0;
                            }
                            i.fas {
                                width: 100%;
                                margin: 25px 0px 5px 0px;
                                color: #ccc;
                            }
                            span {
                                color: #ccc;
                            }
                            img {
                                height: 160px;
                                width: auto;
                            }
                        }
                    }
                `}</style>

                <div className="container" onKeyDown={this.handleEnter}>
                    <h3>Profile images</h3>
                    <div className="circle-file-browse" onClick={this.clickUploadFile}>
                        <img src={this.state.imgSrc} />
                        <i className="fas fa-arrow-up"></i>
                        <span>upload image</span>
                        <form>
                            <input 
                                ref="file" 
                                type="file" 
                                name="user[image]" 
                                multiple="true"
                                onChange={this.onChange}
                            />
                        </form>
                    </div>
                </div>
                <div className="container bottom-confirmation">
                    <button className="btn" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}
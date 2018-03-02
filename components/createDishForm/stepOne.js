import Link from 'next/link';
import React from 'react';
import Router from 'next/router'

import validator from 'validator';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
export default class DishStepOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cachefile: [],
            imgSrc: null
        }
        this.onChange = this.onChange.bind(this);
        this.clickUploadFile = this.clickUploadFile.bind(this);
    }

    clickUploadFile = (e) => {
        e.stopPropagation();
        this.refs.file.click();
    }

    onChange = () => {
        // Assuming only image
        let file = this.refs.file.files[0];
        
        let fileExstension = file.name.split('.')[file.name.split('.').length -1];
        let fileSize = file.size;
        let allowExstension = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];
        let allowSize = 3000000;
        let errorStack = [];

        if (fileSize > allowSize) {
            errorStack.push('Image size must less than <b>3 MB</b>');
        }

        if (allowExstension.indexOf(fileExstension) == -1) {
            errorStack.push('Invalid image exstension');
        }

        if (errorStack.length > 0) {
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
            return true;
        } else {
            let reader = new FileReader();
            let url = reader.readAsDataURL(file);
            reader.onloadend = function (e) {
                this.setState({
                    imgSrc: [reader.result],
                    cachefile: file
                })
            }.bind(this);
        } 
    }

    // action when user clip skip
    skip = (e) => {
        e.preventDefault();

        let data = {
            dishImagesSrc: '',
            cacheFile: ''
        }

        this.props.saveValues(data);
        this.props.nextStep();
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        //flag variables to check error existed
        let errorStack = [];

        // Get values via this.refs
        let data = {
            dishImagesSrc: null,
            cachefile: null
        }

        if (!this.state.imgSrc || this.state.imgSrc.length < 0) {
            errorStack.push("Please choose one image for your dish!");
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
            return false;
        }

        // no error found
        if (errorStack.length == 0) {
            data = {
                dishImagesSrc: this.state.imgSrc,
                cacheFile: this.state.cachefile
            }
            
            this.props.saveValues(data);
            this.props.nextStep();
        }
    }

    componentDidMount = () => {
        this.props.store.setBackFunction(null);
        this.props.setProgress(10);

        // set defaultvalue of images
        if (this.props.fieldValues.dishImagesSrc.length > 0) {
            this.setState({
                imgSrc: this.props.fieldValues.dishImagesSrc[0]
            })
        }
    }

    render() {
        return (
            <div className="create_profile_step">
                <style jsx>{`
                    /* Landscape phones and down */
                    .bottom-confirmation {
                        display: grid;
                        grid-template-columns: 50% 50%;
                        position: fixed;
                        width: 90%;
                        bottom: 15px;
                        z-index: 5;
                        grid-column-gap: 2%;
                        left: 3%;
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
                    @media (min-width: 1024px) {
                        .bottom-confirmation {
                            display: contents;
                            position: relative;
                            width: 40%;
                            bottom: 15px;
                            z-index: 5;
                            grid-column-gap: 2%;
                            left: 0px;
                        }
                    }
                `}</style>

                <div className="container">
                    <h3>Dish photo</h3>
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
                    <button className="btn skip" onClick={ this.skip }>Skip</button>
                    <button className="btn" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}
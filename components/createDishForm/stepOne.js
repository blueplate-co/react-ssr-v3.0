import Link from 'next/link';
import React from 'react';

import validator from 'validator';


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

    // action when user clip skip
    skip = (e) => {
        e.preventDefault();

        let data = {
            dishImagesSrc: null,
            cacheFile: null
        }

        this.props.saveValues(data);
        this.props.nextStep();
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        //flag variables to check error existed
        let error = false;

        // Get values via this.refs
        let data = {
            dishImagesSrc: null,
            cachefile: null
        }

        if (!this.state.imgSrc || this.state.imgSrc.length < 0) {
            error = true;
            alert('Must set avatar');
        }

        // no error found
        if (!error) {
            data = {
                dishImagesSrc: this.state.imgSrc,
                cacheFile: this.state.cachefile
            }
            
            this.props.saveValues(data);
            this.props.nextStep();
        }
    }

    render() {
        return (
            <div className="create_profile_step">
                <style jsx>{`
                    /* Landscape phones and down */
                    @media (max-width: 480px) {
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
                    }
                `}</style>

                <div className="container">
                    <h3>Dish photo</h3>
                    <div className="circle-file-browse" onClick={this.clickUploadFile}>
                        <img src={this.state.imgSrc} style={{width: '100%', height:'100%'}}/>
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
                    <button className="btn" onClick={ this.saveAndContinue }>Skip</button>
                    <button className="btn" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}
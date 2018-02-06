import Link from 'next/link';
import React from 'react';

import validator from 'validator';


export default class ProfileStepPreview extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.toggleActive = this.toggleActive.bind(this);

        this.state = {
            imgSrc: null,
            firstName: null,
            lastName: null,
            email: null,
            location: null,
            phoneNo: '+xx xxx xxx xxxx',
            services: [],
            profileImages: null,
            cacheFile: null,
            dob: null,
            gender: null,
            exp: [],
            yourself: null,
            reason: null,
            inspiration: null,
            allergies: [],
            dietary: []
        }
    }

    // action when update avatar
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

    // trigger action update avatar
    clickUploadFile = (e) => {
        e.stopPropagation();
        this.refs.file.click();
    }

    // excute when user click on services option item
    toggleActive = (option) => {
        // if this option is already exist in services array
        if (_.indexOf(this.state.services, option) > -1) {
            let dummyService = this.state.services;
            let index = dummyService.indexOf(option); // get index of option item in array
            if (index > -1) {
                dummyService.splice(index, 1);
            }
            this.setState({
                services: dummyService
            })
        } else {
            // if this options is not already exist in services array, push it into service array
            let dummyService = this.state.services;
            dummyService.push(option);
            this.setState({
                services: dummyService
            })
        }
    }

    render() {
        return (
            <div className="create_profile_step">
                <style jsx>{`
                    /* Landscape phones and down */
                    @media (max-width: 480px) {
                        .container {
                            margin-top: 20px;
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
                                    margin: 45px 0px 5px 0px;
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
                            .user-name {
                                font-weight: bold;
                                font-size: 20px;
                                vertical-align: bottom;
                                display: inline-block;
                                margin: 3px 0px;
                                width: 100%;
                                img {
                                    width: 15px;
                                    vertical-align: unset;
                                }
                            }
                            .user-email {
                                font-size: 13px;
                                vertical-align: bottom;
                                display: inline-block;
                                width: 100%;
                                font-weight: 300;
                                margin: 3px 0px;
                                img {
                                    width: 15px;
                                    vertical-align: unset;
                                }
                            }
                            .user-location {
                                font-size: 15px;
                                vertical-align: bottom;
                                display: inline-block;
                                width: 100%;
                                font-weight: 300;
                                margin: 3px 0px;
                                img {
                                    width: 10px;
                                    vertical-align: unset;
                                }
                            }
                            .option-list {
                                width: 100%;
                                display: grid;
                                grid-template-columns: 33.33% 33.33% 33.33%;
                                padding-bottom: 20px;
                                padding-top: 20px;
                                .option-item {
                                    text-align: center;
                                    margin: 10px 0px;
                                    width: 65px;
                                    height: 65px;
                                    background-color: #fff;
                                    margin: 0px auto;
                                    border-radius: 50%;
                                    border: 1px solid #ccc;
                                    &.active {
                                        background-color: #EFAC1F;
                                        color: #fff;
                                    }
                                    .option-icon {
                                        color: #ccc;
                                        font-size: 13px;
                                        font-weight: 300;
                                        margin-top: 23px;
                                        &.active {
                                            color: #fff;
                                        }
                                    }
                                    .option-title {
                                        display: block;
                                        width: 100%;
                                        margin: 3px 0px;
                                        font-weight: bold;
                                        &.active {
                                            color: #EFAC1F;
                                        }
                                    }
                                    .option-description {
                                        display: block;
                                        width: 100%;
                                        margin: 5px 0px;
                                        font-size: 10px;
                                        color: #ccc;
                                        &.active {
                                            color: #EFAC1F;
                                        }
                                    }
                                }
                            }
                            .personal-information {
                                display: grid;
                                grid-template-columns: 50% 50%;
                                .user-gender {
                                    text-align: right;
                                }
                                .user-dob {
                                    text-align: left;
                                }
                                .user-dob, .user-gender {
                                    display: inline-block;
                                    margin: 0xp 3px;
                                    span {
                                        font-size: 14px;
                                        &:before {
                                            content: '';
                                            width: 15px;
                                            height: 15px;
                                            border-radius: 50%;
                                            background-color: #ccc;
                                            display: inline-flex;
                                            margin-top: 3px;
                                            margin-right: 5px;
                                            vertical-align: bottom;
                                        }
                                    }
                                }
                            }
                            .cooking-exp {
                                text-align: left;
                                h4 {
                                    margin: 20px 0px 10px 0px;
                                }
                                ul {
                                    padding-left: 30px;
                                    li {
                                        font-size: 14px;
                                    }
                                }
                            }
                            .why-cook {
                                text-align: justify;
                                margin: 10px 0px;
                                .title {
                                    font-weight: bold;
                                    font-size: 15px;
                                }
                                .content {
                                    font-weight: 300;
                                }
                            }

                            .inspiration {
                                text-align: justify;
                                margin: 10px 0px;
                                .title {
                                    font-weight: bold;
                                    font-size: 15px;
                                }
                                .content {
                                    font-weight: 300;
                                }
                            }
                            .allergies {
                                text-align: left;
                                .title {
                                    margin: 15px 0px;
                                    font-weight: bold;
                                    display: block;
                                }
                                .list {
                                    display: grid;
                                    grid-template-columns: 50% 50%;
                                    .list-item {
                                        margin: 5px;
                                        span {
                                            float: left;
                                        }
                                        img {
                                            float: right;
                                            width: 20px;
                                            height: 20px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                `}</style>

                <div className="container">
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
                    {/* general profile */}
                    <span className="user-name"><img src="./static/icons/avatar.svg" /> Thomas Lee</span>
                    <span className="user-email"><img src="./static/icons/email.svg" /> TLee@bnmsgh.com</span>
                    <span className="user-location"><img src="./static/icons/marker.svg" /> 12 Nathan Road, TST HK</span>

                    {/* serving options */}
                    <div className="option-list">
                        <div className={(this.state.services.indexOf('dine-in') > -1) ? 'option-item active' : 'option-item'} onClick={() => {this.toggleActive('dine-in')} }>
                            <div className={(this.state.services.indexOf('dine-in') > -1) ? 'option-icon active' : 'option-icon'}>Dine-in</div>
                        </div>
                        <div className={(this.state.services.indexOf('pick up') > -1) ? 'option-item active' : 'option-item'} onClick={() => {this.toggleActive('pick up')} }>
                            <div className={(this.state.services.indexOf('pick up') > -1) ? 'option-icon active' : 'option-icon'}>Pick up</div>
                        </div>
                        <div className={(this.state.services.indexOf('delivery') > -1) ? 'option-item active' : 'option-item'} onClick={() => {this.toggleActive('delivery')} }>
                            <div className={(this.state.services.indexOf('delivery') > -1) ? 'option-icon active' : 'option-icon'}>Delivery</div>
                        </div>
                    </div>

                    {/* DOB and gender here */}
                    <div className="personal-information">
                        <div className="user-dob">
                            <span>11 FEB 1980</span>
                        </div>
                        <div className="user-gender">
                            <span>male</span>
                        </div>
                    </div>

                    {/* Cooking exp */}
                    <div className="cooking-exp">
                        <h4>Cooking experience</h4>
                        <ul className="exp-list">
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</li>
                        </ul>
                    </div>

                    {/* Why cooking */}
                    <div className="why-cook">
                        <span className="title">Why cooking <span className="content">- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></span>
                    </div>

                    {/* Allergies */}
                    <div className="inspiration">
                        <span className="title">Inspiration <span className="content">- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></span>
                    </div>

                    {/* Allergies */}
                    <div className="allergies">
                        <span className="title">Major food allergies</span>
                        <div className="list">
                            <div className="list-item">
                                <span>Milk</span>
                                <img src="./static/icons/egg.svg"/>
                            </div>
                            <div className="list-item">
                                <span>Milk</span>
                                <img src="./static/icons/egg.svg"/>
                            </div>
                            <div className="list-item">
                                <span>Milk</span>
                                <img src="./static/icons/egg.svg"/>
                            </div>
                        </div>
                    </div>

                    {/* Dietary */}
                    <div className="allergies">
                        <span className="title">Dietary preference</span>
                        <div className="list">
                            <div className="list-item">
                                <span>Vegan</span>
                                <img src="./static/icons/highProtein.svg"/>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="container bottom-confirmation">
                    <button className="btn inline" onClick={ this.save }>Save</button>
                </div>

            </div>
        )
    }
}
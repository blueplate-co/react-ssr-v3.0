import Link from 'next/link';
import React from 'react';
import Router from 'next/router';

import validator from 'validator';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Loader from '../../components/loader';

import cnf from '../../config';

@inject('store') @observer
export default class ProfileStepPreview extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.save = this.save.bind(this);
        this.showMap = this.showMap.bind(this);

        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            location: null,
            lat: null,
            lng: null,
            phoneNo: null,
            services: [],
            profileImages: null,
            cacheFile: null,
            dob: '',
            gender: null,
            exp: [],
            yourself: null,
            reason: null,
            inspiration: null,
            allergies: [],
            dietary: [],
            imgSrc: null,
            selectedDate: null,
            sentRequest: false
        }
        console.log(this.props.fieldValues);
    }

    // action when update avatar
    onChange = () => {
        // Assuming only image
        var file = this.refs.file.files[0];

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
            var reader = new FileReader();
            var url = reader.readAsDataURL(file);
            reader.onloadend = function (e) {
                this.setState({
                    imgSrc: [reader.result],
                    cachefile: file
                })
            }.bind(this); 
        }
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

    //handle change date time in datepicker
    handleChangeDateTime = (date) => {
        this.setState({
            dob: date
        })
    }

    // handle change gender
    changeGender = () => {
        if (this.state.gender == 'male') {
            this.setState({
                gender: 'female'
            })
        } else {
            this.setState({
                gender: 'male'
            })
        }
    }

    // send profile to create profile
    save = () => {

        // change state into sentRequest to change submit button
        this.setState({
            sentRequest: true
        })

        var self = this;
        // create new form data
        let data = new FormData();
        let errorStack = [];

        // split firtname and lastname
        let fullname = validator.trim(this.refs.fullname.innerText);
        let firstname = null;
        let lastname = null;

        firstname = validator.trim(fullname.split(" ")[0]);
        lastname = validator.trim(fullname.substr(fullname.indexOf(" "), fullname.length));

        // get email content of fields
        let email = validator.trim(this.refs.email.innerText);

        // get location content of fields
        let location = validator.trim(this.refs.location.innerText);

        // get services
        let services = this.state.services;

        // get dob
        let dob = this.state.dob.replace(/-/g, '/');

        // get gender
        let gender = this.state.gender;

        
        data.append('firstName', firstname);
        data.append('lastName', lastname);
        // data.append('uid', '5a6e8312e35b20787806756a');
        data.append('uid', localStorage.getItem('userID'));
        data.append('address', this.props.fieldValues.location);
        data.append('phoneNumber', this.props.fieldValues.phoneNo);
        data.append('serviceOption', this.props.fieldValues.services);
        data.append('dateOfBirth', dob);
        data.append('gender', this.props.fieldValues.gender);
        data.append('certification', this.props.fieldValues.exp[0]);
        data.append('school', this.props.fieldValues.exp[1]);
        data.append('about', this.props.fieldValues.yourself);
        data.append('inspiration', this.props.fieldValues.inspiration);

        //- allergy and dietary
        data.append('foodallergies', this.props.fieldValues.allergies.map(a=>a.name));
        data.append('dietaries', this.props.fieldValues.dietary.map(a=>a.name));
        data.append('experiences', this.props.fieldValues.exp);
        
        //-images
        data.append('chefImageName', this.props.fieldValues.cacheFile['name']);
        data.append('chefImage', this.props.fieldValues.cacheFile);

        if ((validator.trim(firstname).length == 0) && (validator.trim(lastname).length == 0)) {
            errorStack.push('Please complete your full name');
        }

        if (this.state.services.length == 0) {
            errorStack.push('Please choose at least one service option');
        }

        if (errorStack.length > 0) {
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
            this.setState({
                sentRequest: false
            });
            return true;
        }
  
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        //- http://13.250.107.234/api/chef/create
        axios.post('http://13.250.107.234/api/chef/create', data, config)
        .then(function (response) {
            if(response.status === 200)
            {
                console.log(response);
                errorStack.push('Create profile of chef successfully...');
                let notification = { type: 'success', heading: 'Successful!', content: errorStack, createdAt: Date.now() };
                self.props.store.addNotification(notification);
                
                //- save to localStorage
                var create_chef_id = response.data.data.create_chef_id;
                localStorage.setItem('create_chef_id', create_chef_id);

                //- redirect
                sessionStorage.setItem("welcomeStage", 1);
                setTimeout(() => {
                    Router.push('/become');
                    this.setState({
                        sentRequest: false
                    });
                }, 1500);
            }else{
                errorStack.push('Cannot create chef profile.');
                let notification = { type: 'error', heading: 'Critical error!', content: errorStack, createdAt: Date.now() };
                this.props.store.addNotification(notification);
                this.setState({
                    sentRequest: false
                });
            }
            
        })
        .catch(error => {
            if(error.response)
            {
                var statusCode = error.response.status;
                var message = error.response.data.message;
                //- debug
                console.log(error.response);
                errorStack.push('Error when create profile. Please try again');
                let notification = { type: 'error', heading: 'Critical error!', content: errorStack, createdAt: Date.now() };
                this.props.store.addNotification(notification);

                //- token expired or something else
                if(statusCode === 403 && message === "Please login to continue")
                {
                    //- token expired
                    console.log('Token expired. Please login again !');
                    Router.push('/');
                } 

                this.setState({
                    sentRequest: false
                });
            }
            
        });
    }

    // toggle show google maps
    showMap = () => {
        this.props.store.showMap = true;
        let element = document.getElementsByClassName("create_profile_step");
        element[0].classList.add("hidden");
    }

    componentDidMount = () => {
        // set function to back button
        this.props.store.setBackFunction(()=>{
            this.props.store.globalStep--;
        });

        // focus into first field
        document.querySelectorAll('[contenteditable="true"]')[0].focus();

        this.props.setProgress(100);

        // get intial state for default field value
        this.setState({
            firstName: this.props.fieldValues.firstName,
            lastName: this.props.fieldValues.lastName,
            email: this.props.fieldValues.email,
            location: validator.unescape(this.props.fieldValues.location),
            lat: this.props.fieldValues.lat,
            lng: this.props.fieldValues.lng,
            phoneNo: this.props.fieldValues.phoneNo,
            services: this.props.fieldValues.services,
            profileImages: this.props.fieldValues.profileImages,
            cacheFile: this.props.fieldValues.cacheFile,
            dob: this.props.fieldValues.dob,
            gender: this.props.fieldValues.gender,
            exp: this.props.fieldValues.exp,
            yourself: this.props.fieldValues.firstName,
            reason: this.props.fieldValues.reason,
            inspiration: this.props.fieldValues.inspiration,
            allergies: this.props.fieldValues.allergies,
            dietary: this.props.fieldValues.dietary
        })
    }

    render() {
        return (
            <div className="create_profile_step">
                <style jsx>{`
                    .dob-changer {
                        padding-top: 1px!important;
                        width: 100px!important;
                    }
                    /* Landscape phones and down */
                    @media (max-width: 480px) {
                        .container {
                            margin-top: 75px;
                            &.bottom-confirmation {
                                width: 70%;
                                margin-bottom: 15px;
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
                                    vertical-align: middle;
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
                                    vertical-align: middle;
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
                                    vertical-align: baseline;
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
                                        background-color: ${cnf.color.primarycolor};
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
                                    margin: 0px 3px;
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
                                            vertical-align: sub;
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
                        {
                            this.state.imgSrc ?
                            (
                                <img src={this.state.imgSrc} />
                            ) :
                            (
                                <img src={this.props.fieldValues.profileImages} />
                            )
                        }
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
                    <span className="user-name" ><img src="/static/icons/avatar.svg" /><span ref="fullname" suppressContentEditableWarning="true" contentEditable="true"> {this.state.firstName} {this.state.lastName}</span></span>
                    <span className="user-email"><img src="/static/icons/email.svg" /><span ref="email"> {this.state.email}</span></span>
                    <span className="user-location" onClick={ this.showMap } ><img src="/static/icons/marker.svg" /><span ref="location"> {this.props.store.address}</span></span>

                    {/* serving options */}   
                    {this.props.fieldValues.services ? (
                        <div className="option-list">
                            <div className={(this.state.services.indexOf('dine-in') > -1) ? 'option-item active' : 'option-item'} onClick={() => {this.toggleActive('dine-in')} }>
                                <div className={(this.state.services.indexOf('dine-in') > -1) ? 'option-icon active' : 'option-icon'}>Dine-in</div>
                            </div>
                            <div className={(this.state.services.indexOf('pick up') > -1) ? 'option-item active' : 'option-item'} onClick={() => {this.toggleActive('pick up')} }>
                                <div className={(this.state.services.indexOf('pick up') > -1) ? 'option-icon active' : 'option-icon'}>Pick up</div>
                            </div>
                            <div className={(this.props.fieldValues.services.indexOf('delivery') > -1) ? 'option-item active' : 'option-item'} onClick={() => {this.toggleActive('delivery')} }>
                                <div className={(this.state.services.indexOf('delivery') > -1) ? 'option-icon active' : 'option-icon'}>Delivery</div>
                            </div>
                        </div>
                    ) : (
                        <div className="option-list"></div>
                    )}

                    {/* DOB and gender here */}
                    <div className="personal-information">
                        <div className="user-dob">
                            <span style={{ 'display': 'inline-flex'}} >
                                <input type="date" value={this.state.dob} onChange={(e) => this.handleChangeDateTime }/>
                            </span>
                        </div>
                        <div className="user-gender">
                            <span onClick={ this.changeGender } >
                            {(() => {
                                switch (this.state.gender) {
                                    case 'male':
                                        return <img title="male" style={{ verticalAlign: 'middle', height: '20px' }} src="/static/icons/male.svg" />
                                        break;
                                    case 'female':
                                        return <img title="female" style={{ verticalAlign: 'middle', height: '20px' }} src="/static/icons/female.svg" />
                                        break;
                                    default:
                                        break;
                                }
                            })()}
                            </span>
                        </div>
                    </div>

                    {/* Cooking exp */}
                    <div className="cooking-exp">
                        <h4>Cooking experience</h4>
                        <ul className="exp-list" suppressContentEditableWarning="true" contentEditable="true">
                            {
                                this.props.fieldValues.exp.map(function(item, index){
                                    return <li key={index}>{item}</li>
                                })
                            }
                        </ul>
                    </div>

                    {/* Why cooking */}
                    <div className="why-cook">
                        {(() => {
                            if (this.props.fieldValues.reason) {
                                if (this.props.fieldValues.reason.length > 0) {
                                    return (
                                        <span className="title">Why cooking - <span className="content" suppressContentEditableWarning="true" contentEditable="true">{ this.props.fieldValues.reason }</span></span>
                                    )
                                }
                            }
                        })()}
                    </div>

                    {/* Allergies */}
                    <div className="inspiration">
                        {(() => {
                            if (this.props.fieldValues.inspiration) {
                                if (this.props.fieldValues.inspiration.length > 0) {
                                    return (
                                        <span className="title">Inspiration - <span className="content" suppressContentEditableWarning="true" contentEditable="true">{ this.props.fieldValues.inspiration }</span></span>
                                    )
                                }
                            }
                        })()}
                    </div>

                    {/* Allergies */}
                    <div className="allergies" onClick={ () => this.props.goToStep(10) } >
                        <span className="title">Major food allergies</span>
                        <div className="list">
                            {
                                this.props.fieldValues.allergies.map(function(item, index){
                                    return (
                                        <div key={index} className="list-item">
                                            <span>{item.name}</span>
                                            <img src={'/static/icons/allergies/' + item.icon}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* Dietary */}
                    <div className="allergies" onClick={ () => this.props.goToStep(11) }>
                        <span className="title">Dietary preference</span>
                        <div className="list">
                            {
                                this.props.fieldValues.dietary.map(function(item, index){
                                    return (
                                        <div key={index} className="list-item">
                                            <span>{item.name}</span>
                                            <img src={'/static/icons/dietary/' + item.icon}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>


                </div>
                <div className="container bottom-confirmation">
                    <button disabled={ (this.state.sentRequest) ? 'disabled' : '' } className="btn inline" onClick={ this.save }>
                    {
                        (this.state.sentRequest) ?
                        <Loader/>
                        :
                        'Save'
                    }
                    </button>
                </div>

            </div>
        )
    }
}
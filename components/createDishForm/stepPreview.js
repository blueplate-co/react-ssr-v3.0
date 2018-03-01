import Link from 'next/link';
import React from 'react';
import Router from 'next/router';

import validator from 'validator';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import Loader from '../../components/loader';

@inject('store') @observer
export default class DishStepPreview extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);

        this.state = {
            imgSrc: null,
            dishImages: null,
            sentRequest: false
        }
        console.log(this.props.fieldValues);
        this.insertMultipleIngredients(this);
    }

    // action when update avatar
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

    // trigger action update avatar
    clickUploadFile = (e) => {
        e.stopPropagation();
        this.refs.file.click();
    }


    /**
     * Author: baots
     * Created at: 12:21PM, 12-02-2018
     */
    insertMultipleIngredients = (self) => {

        var ingredients = self.props.fieldValues.ingredient;
        //- insert multiple ingredients
        const formData = new FormData();
        formData.append('data', ingredients);

        //- create ingredient
        //- set header
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }

        axios
        .post('http://13.250.107.234/api/ingredient/create/multiple', {
            data: ingredients,
        })
        .then(function(res){
            if(res.status === 200)
            {
                
                var iid = res.data.data.map(a => a.id);
                self.props.fieldValues.iid = iid;
                console.log('iid: ', iid);
                // return iid;

            }
        })
        .catch(function(err){
            console.log(err);
            return false;
        });
    }

    addIngredient = (create_dish_id) => {
        
        //- form data
        var data = new FormData();
        data.create_dish_id = create_dish_id;
        data.ingredientsID = this.props.fieldValues.iid;
        return axios.post('http://13.250.107.234/api/dish/create/ingredients', {
            create_dish_id: create_dish_id,
            ingredientsID: this.props.fieldValues.iid
        });
    }
      
    addAllergy = (create_dish_id) => {
        return axios.post('http://13.250.107.234/api/dish/create/allergies', {
            create_dish_id: create_dish_id,
            allergies: (this.props.fieldValues.allergies2 == null)?[]:this.props.fieldValues.allergies2
        });
    }

    addDietary = (create_dish_id) => {
        return axios.post('http://13.250.107.234/api/dish/create/dietaries', {
            create_dish_id: create_dish_id,
            dietaries: (this.props.fieldValues.dietaries == null)?[]:this.props.fieldValues.dietaries
        });
    }

    sendRequest = (self) => {
        this.setState({
            sentRequest: true
        });
        //- create form data
        let data = new FormData();
        console.log('here');
        //- update first then create ingredients, food allergy, dietary
        let propValues = this.props.fieldValues;
        let dishImageSrc = this.props.fieldValues.dishImagesSrc;
        let dishName = document.getElementsByClassName('dish-name')[0].innerText;
        let dishDescription = document.getElementsByClassName('dish-description')[0].innerText
        let cacheFile = this.props.fieldValues.cacheFile;
        let fileName = propValues.cacheFile['name'];

        //- cost
        let cost = document.getElementsByClassName('cost')[0].innerText;
        let customPrice = document.getElementsByClassName('customPrice')[0].innerText;
        let suggestedPrice = document.getElementsByClassName('suggestedPrice')[0].innerText;

        //- preparation time
        let days = document.querySelector('.days span').innerText;
        let hours = document.querySelector('.hours span').innerText;
        let mins = document.querySelector('.mins span').innerText;
        let prepareTime = self.props.fieldValues.prepareTime; //- in minutes

        //- tags
        let tags = self.props.fieldValues.tags; //- array

        //- minimum order
        let minimumOrder = document.getElementsByClassName('min-order')[0].innerText;

        //////
        //////  CHECK THE EDITABLE DATA BEFORE GOES ON
        //////
        let errorStack = [];
        if (validator.trim(dishName).length == 0) {
            errorStack.push('Dish name must not empty');
        }
        if (validator.trim(dishDescription).length == 0) {
            errorStack.push('Dish description must not empty');
        }
        if (isNaN(parseInt(cost))) {
            errorStack.push('Invalid dish cost format');
        }
        if (isNaN(parseInt(customPrice))) {
            errorStack.push('Invalid dish custom price format');
        }
        if (isNaN(parseInt(suggestedPrice))) {
            errorStack.push('Invalid dish suggested price format');
        }
        if (isNaN(parseInt(days))) {
            errorStack.push('Invalid days format');
        }
        if (isNaN(parseInt(hours))) {
            errorStack.push('Invalid hours format');
        }
        if (isNaN(parseInt(mins))) {
            errorStack.push('Invalid mins format');
        }
        if (isNaN(parseInt(minimumOrder))) {
            errorStack.push('Invalid minium orders number format');
        }
         
        if (errorStack.length > 0) {
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
            this.setState({
                sentRequest: false
            });
            return true;
        } else {
            //- create data using for api
            //- local chef id: 5a7431f357076fd017913c9f
            //- server chef id: 5a79a1524be30c971138175e
            data.append('chefID', localStorage.getItem('create_chef_id'));
            // data.append('chefID', '5a7431f357076fd017913c9f');
            data.append('name', dishName);
            data.append('describe', dishDescription);

            //- cost
            data.append('cost', parseInt(cost));
            data.append('suggestedPrice', parseInt(suggestedPrice));
            data.append('customPrice', parseInt(customPrice));
            console.log(typeof(cost));
            console.log(typeof(suggestedPrice));
            console.log(typeof(customPrice));
            //- preparation time
            data.append('prepareTime', prepareTime);
            //- tags
            data.append('tags', tags);
            //- minimum order
            data.append('minOrder', minimumOrder);

            //- dish image
            data.append('dishImageName', fileName);
            data.append('dishImage', cacheFile);

            console.log(data);
            console.log(typeof(cacheFile));
            
            //- set header
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            }

            //- using axios
            axios
            .post('http://13.250.107.234/api/dish/create', data)
            .then(function(res){
                console.log('add new dish: ',res);
                if(res.status === 200)
                {
                    //- prop ids
                    let dish_id = {};
                    dish_id.create_dish_id = res.data.data.create_dish_id;
                    dish_id.update_dish_id = res.data.data.update_dish_id;
                    console.log(dish_id);
                    //- using axios all
                    self.addMore(dish_id);
                    this.setState({
                        sentRequest: false
                    });
                }
            })
            // .catch(function(err){
            //     console.log(err);
            // });
            .catch(error => {
                console.log(error.response);
                if(error.response)
                {
                    let statusCode = error.response.status;
                    let message = error.response.data.message;
                    //- debug
                    console.log(error.response);
                    let errorStack = [];
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
                }
                
            });
        }

    }

    //- insert allergy, dietary and ingredients
    addMore = (dish_id)=> {
        console.log(this.props.fieldValues);
        let that = this;
        axios.all([
            this.addAllergy(dish_id.create_dish_id), 
            this.addDietary(dish_id.create_dish_id), 
            this.addIngredient(dish_id.create_dish_id)
        ])
        .then(function(arr){
            console.log(arr[0].data);
            console.log(arr[1].data);
            console.log(arr[2].data);

            //- go back to /become with stage 2
            let errorStack = [];
            errorStack.push('Create Dish Successful');
            let notification = { type: 'success', heading: 'Successful!', content: errorStack, createdAt: Date.now() };
            that.props.store.addNotification(notification);
            sessionStorage.setItem("welcomeStage", 2);
            setTimeout(() => {
                Router.push('/become');
            }, 1500);
        })
        // .catch(function(err){
        //     console.log(err);
        // });
        .catch(error => {
            console.log(error.response);
        });
    }
    //------------------------------------
    

    // send profile to create profile
    save = () => {
        this.sendRequest(this);
    }

    componentDidMount = () => {
        // set function to back button
        this.props.store.setBackFunction(()=>{
            this.props.store.globalStep--;
        });

        this.props.setProgress(100);

        // focus into first field
        document.querySelectorAll('[contenteditable="true"]')[0].focus();
    }

    render() {
        return (
            <div className="create_profile_step">
                <style jsx>{`
                    /* Landscape phones and down */
                    @media (max-width: 480px) {
                        .container {
                            margin-top: 20px;
                            margin-bottom: 20px;
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
                                    width: 160px;
                                    position: absolute;
                                }
                            }
                            .dish-name {
                                font-weight: bold;
                                font-size: 25px;
                                vertical-align: bottom;
                                display: inline-block;
                                margin: 3px 0px;
                                width: 100%;
                            }
                            .dish-description {
                                width: 100%;
                                display: block;
                                text-align: justify;
                                font-size: 14px;
                                margin: 5px 0px 0px 0px;
                            }
                            .ingredient-wrapper {
                                h4 {
                                    text-align: left;
                                }
                                .ingredient-item {
                                    display: grid;
                                    grid-template-columns: 75% 25%;
                                    text-align: left;
                                    font-size: 14px;
                                    grid-gap: 5%;
                                    margin: 15px 0px;
                                }
                            }
                            .pricing-wrapper {
                                h4 {
                                    text-align: left;
                                }
                                .pricing-title {
                                    display: grid;
                                    grid-template-columns: 33.3% 33.3% 33.3%;
                                    font-size: 10px;
                                    span {
                                        &:first-child {
                                            text-align: center;
                                        }
                                        &:nth-child(2) {
                                            text-align: center;
                                        }
                                        &:last-child {
                                            text-align: right;
                                        }
                                    }
                                }
                                .pricing-row {
                                    display: grid;
                                    grid-template-columns: 33.3% 33.3% 33.3%;
                                    text-align: center;
                                    font-size: 14px;
                                }
                            }
                            .preparation-wrapper {
                                h4 {
                                    text-align: left;
                                }
                                .preparation-row {
                                    display: grid;
                                    grid-template-columns: 33.3% 33.3% 33.3%;
                                }
                            }
                            .allergies {
                                h4 {
                                    text-align: left;
                                }
                                .list {
                                    display: grid;
                                    grid-template-columns: 50% 50%;
                                    .list-item {
                                        display: grid;
                                        grid-template-columns: 80% 20%;
                                        font-size: 14px;
                                        text-align: left;
                                        margin: 5px 0px;
                                        img {
                                            width: 17px;
                                            height: 17px;
                                        }
                                    }
                                }
                            }
                            .dietary {
                                h4 {
                                    text-align: left;
                                }
                                .list {
                                    display: grid;
                                    grid-template-columns: 50% 50%;
                                    .list-item {
                                        display: grid;
                                        grid-template-columns: 80% 20%;
                                        font-size: 14px;
                                        text-align: left;
                                        margin: 5px 0px;
                                        img {
                                            width: 17px;
                                            height: 17px;
                                        }
                                    }
                                }
                            }
                            .tags {
                                h4 {
                                    text-align: left;
                                }
                                ul {
                                    list-style: none;
                                    margin: 0px;
                                    padding: 0px;
                                    margin-bottom: 15px;
                                    display: inline-block;
                                    width: 100%;
                                }    
                            }
                            .minimum-order {
                                .list {
                                    display: grid;
                                    grid-template-columns: 70% 30%;
                                    span {
                                        &:first-child {
                                            float: left;
                                            text-align: left;
                                        }
                                        &:last-child {
                                            float: right;
                                            text-align: right;
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
                                <img src={this.props.fieldValues.dishImagesSrc[0]} />
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
                    {/* general information */}
                    <span className="dish-name" ref="dishName" suppressContentEditableWarning="true" contentEditable="true">{this.props.fieldValues.dishName}</span>
                    <span className="dish-description" ref="dishName" suppressContentEditableWarning="true" contentEditable="true">{this.props.fieldValues.dishDescription}</span>

                    {/* Ingredients */}
                    <div className="ingredient-wrapper" onClick={ () => { this.props.store.globalStep = 3; } }  >
                        <h4>Ingredients</h4>
                        {
                            this.props.fieldValues.ingredient.map(function(item, index){
                                return (
                                    <div key={index} className="ingredient-item">
                                        <span>{item.iName}</span>
                                        <span>{item.iQuantity} {item.iUnit}</span>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* Pricing */}
                    <div className="pricing-wrapper">
                        <h4>Pricing</h4>
                        <div className="pricing-title">
                            <span>Cost</span>
                            <span>Suggested pricing</span>
                            <span>Custom pricing</span>
                        </div>
                        <div className="pricing-row">
                            <span className="cost" ref="dishName" suppressContentEditableWarning="true" contentEditable="true">{this.props.fieldValues.cost}</span>
                            <span className="suggestedPrice" ref="dishName" suppressContentEditableWarning="true" contentEditable="true">{this.props.fieldValues.suggestedPrice}</span>
                            <span className="customPrice" ref="dishName" suppressContentEditableWarning="true" contentEditable="true">{this.props.fieldValues.customPrice}</span>
                        </div>
                    </div>

                    {/* Prepearation time */}
                    <div className="preparation-wrapper">
                        <h4>Preparation time</h4>
                        <div className="preparation-row">
                            <span className="days" ref="dishName"><span suppressContentEditableWarning="true" contentEditable="true">{this.props.fieldValues.days}</span> days</span>
                            <span className="hours" ref="dishName"><span suppressContentEditableWarning="true" contentEditable="true">{this.props.fieldValues.hours}</span> hours</span>
                            <span className="mins" ref="dishName"><span suppressContentEditableWarning="true" contentEditable="true">{this.props.fieldValues.mins}</span> mins</span>
                        </div>
                    </div>

                    {/* Allergies */}
                    <div className="allergies" onClick={() => { this.props.store.globalStep = 6 }}>
                        <h4>Major food allergies</h4>
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
                    <div className="dietary" onClick={() => { this.props.store.globalStep = 7 }}>
                        <h4>Dietary preference</h4>
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
                    
                    {/* Tags */}
                    <div className="tags">
                        <h4>Tags</h4>
                        <ul>
                            {
                                this.props.fieldValues.tags.map(function(item, index){
                                    return (
                                        <li key={index} style={{
                                            padding: '4px 30px 5px 10px',
                                            border: '1px solid #ccc',
                                            margin: '0px 5px 5px 0px',
                                            borderRadius: '15px',
                                            display: 'inline-flex',
                                            float: 'left',
                                            position: 'relative'
                                        }}>
                                            {item}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    {/* Minimum order */}
                    <div className="minimum-order">
                        <div className="list">
                            <span>Minimum order</span>
                            <span className="mins min-order" suppressContentEditableWarning="true" contentEditable="true">{this.props.fieldValues.minimumOrder}</span>
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
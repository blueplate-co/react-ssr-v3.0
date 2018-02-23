import Link from 'next/link';
import React from 'react';
import Router from 'next/router';

import validator from 'validator';
import axios from 'axios';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
export default class DishStepPreview extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);

        this.state = {
            imgSrc: null,
            dishImages: null
        }
        console.log(this.props.fieldValues);
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


    /**
     * Author: baots
     * Created at: 12:21PM, 12-02-2018
     */
    addIngredient = (create_dish_id) => {
        //- form data
        console.log(this.props.fieldValues.iid);
        var data = new FormData();
        data.create_dish_id = create_dish_id;
        data.ingredientsID = this.props.fieldValues.iid;
        return axios.post('http://13.250.107.234/api/dish/create/ingredients', {
            create_dish_id: create_dish_id,
            ingredientsID: this.props.fieldValues.iid
        });
    }
      
    addAllergy = (create_dish_id) => {
        var data = new FormData();
        data.create_dish_id = create_dish_id;
        data.allergies = this.props.fieldValues.allergiesString;
        return axios.post('http://13.250.107.234/api/dish/create/allergies', {
            create_dish_id: create_dish_id,
            allergies: this.props.fieldValues.allergies2
        });
    }

    addDietary = (create_dish_id) => {
        var data = new FormData();
        data.create_dish_id = create_dish_id;
        data.dietaries = this.props.fieldValues.dietaryString;
        return axios.post('http://13.250.107.234/api/dish/create/dietaries', {
            create_dish_id: create_dish_id,
            dietaries: this.props.fieldValues.dietaries
        });
    }

    sendRequest = (self) => {
        //- create form data
        const data = new FormData();

        //- update first then create ingredients, food allergy, dietary
        var propValues = this.props.fieldValues;
        var dishImageSrc = this.props.fieldValues.dishImagesSrc;
        var dishName = this.props.fieldValues.dishName;
        var dishDescription = this.props.fieldValues.dishDescription;
        var cacheFile = this.props.fieldValues.cacheFile;
        var fileName = propValues.cacheFile['name'];
        console.log(propValues);

        //- cost
        var cost = self.props.fieldValues.cost;
        var customPrice = self.props.fieldValues.customPrice;
        var suggestedPrice = self.props.fieldValues.suggestedPrice;

        //- preparation time
        var prepareTime = self.props.fieldValues.prepareTime; //- in minutes

        //- tags
        var tags = self.props.fieldValues.tags; //- array

        //- minimum order
        var minimumOrder = self.props.fieldValues.minimumOrder;

        //- create data using for api
        //- local chef id: 5a7431f357076fd017913c9f
        //- server chef id: 5a79a1524be30c971138175e
        data.append('chefID', '5a79a1524be30c971138175e');
        data.append('name', dishName);
        data.append('describe', dishDescription);

        //- cost
        console.log(typeof(cost));
        data.append('cost', cost);
        data.append('suggestedPrice', suggestedPrice);
        data.append('customPrice', customPrice);
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
            console.log(res);
            if(res.status === 200)
            {
                //- prop ids
                var dish_id = {};
                dish_id.create_dish_id = res.data.data.create_dish_id;
                dish_id.update_dish_id = res.data.data.update_dish_id;
                console.log(dish_id);
                //- using axios all
                self.addMore(dish_id);
            }
        })
        // .catch(function(err){
        //     console.log(err);
        // });
        .catch(error => {
            var statusCode = error.response.status;
            var message = error.response.data.message;
            //- debug
            console.log(error.response);
            alert('Error when create profile. Please try again');

            //- token expired or something else
            if(statusCode === 403 && message === "Please login to continue")
            {
                //- token expired
                console.log('Token expired. Please login again !');
                Router.push('/');
            }
            
            
        });

    }

    //- insert allergy, dietary and ingredients
    addMore = (dish_id)=> {
        console.log(this.props.fieldValues);
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
            alert('Create Dish Successful');
            sessionStorage.setItem("welcomeStage", 2);
            Router.push('/become');
        })
        .catch(function(err){
            console.log(err);
        });
    }
    //------------------------------------
    

    // send profile to create profile
    save = () => {
        // create new form data
        const data = new FormData();

        //- alert('Create Dish Successful');
        //- sessionStorage.setItem("welcomeStage", 2);
        //- Router.push('/become');

        // split firtname and lastname
        // let fullname = validator.trim(this.refs.fullname.innerText);
        // let firstname = null;
        // let lastname = null;

        // firstname = validator.trim(fullname.split(" ")[0]);
        // lastname = validator.trim(fullname.substr(fullname.indexOf(" "), fullname.length));
        
        // data.append('firstName', firstname);
        // data.append('lastName', lastname);
        // data.append('uid', '5a6e8312e35b20787806756a');
        // data.append('address', this.props.fieldValues.location);
        // data.append('phoneNumber', this.props.fieldValues.phoneNo);
        // data.append('serviceOption', this.props.fieldValues.services);
        // data.append('dateOfBirth', this.props.fieldValues.dob);
        // data.append('gender', this.props.fieldValues.gender);
        // data.append('certification', this.props.fieldValues.exp[0]);
        // data.append('school', this.props.fieldValues.exp[1]);
        // data.append('about', this.props.fieldValues.yourself);
        // data.append('inspiration', this.props.fieldValues.inspiration);
        // data.append('chefImageName', 'abc.jpg');
        // data.append('chefImage', this.props.fieldValues.cacheFile, 'abc.jpg');
        

        // const config = {
        //     headers: { 'content-type': 'multipart/form-data' }
        // }

        // axios.post('http://13.250.107.234/api/chef/create', data, config)
        // .then(function (response) {
        //     alert('Create successful ^^');
        // })
        // .catch(function (error) {
        //     alert('Error when create profile. Please try again');
            
        // });

        //- save data
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
                                <img src={this.props.fieldValues.dishImagesSrc} />
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
                    <div className="ingredient-wrapper">
                        <h4>Ingredients</h4>
                        {
                            this.props.fieldValues.ingredient.map(function(item, index){
                                return (
                                    <div key={index} className="ingredient-item">
                                        <span>{item.name}</span>
                                        <span>{item.qty} {item.unit}</span>
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
                            <span className="days" ref="dishName" suppressContentEditableWarning="true" contentEditable="true"><span>{this.props.fieldValues.days}</span> days</span>
                            <span className="hours" ref="dishName" suppressContentEditableWarning="true" contentEditable="true"><span>{this.props.fieldValues.hours}</span> hours</span>
                            <span className="mins" ref="dishName" suppressContentEditableWarning="true" contentEditable="true"><span>{this.props.fieldValues.mins}</span> mins</span>
                        </div>
                    </div>

                    {/* Allergies */}
                    <div className="allergies">
                        <h4>Major food allergies</h4>
                        <div className="list">
                            {
                                this.props.fieldValues.allergies.map(function(item, index){
                                    return (
                                        <div key={index} className="list-item">
                                            <span>{item.name}</span>
                                            <img src={'/static/icons/' + item.icon}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* Dietary */}
                    <div className="dietary">
                        <h4>Dietary preference</h4>
                        <div className="list">
                            {   
                                this.props.fieldValues.dietary.map(function(item, index){
                                    return (
                                        <div key={index} className="list-item">
                                            <span>{item.name}</span>
                                            <img src={'/static/icons/' + item.icon}/>
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
                                            <img
                                                style={{
                                                    position: 'absolute',
                                                    right: '8px',
                                                    top: '9px'
                                                }}
                                                src="/static/icons/close.svg"
                                                onClick={ () => { this.removeTag(index) } }
                                            />
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
                            <span className="mins" ref="dishName" suppressContentEditableWarning="true" contentEditable="true">{this.props.fieldValues.minimumOrder}</span>
                        </div>
                    </div>


                </div>
                <div className="container bottom-confirmation">
                    <button className="btn" onClick={ this.save }>Save</button>
                </div>

            </div>
        )
    }
}
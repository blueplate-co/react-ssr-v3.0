import Link from 'next/link';
import React from 'react';

import validator from 'validator';
import cx from 'classnames';
import axios from 'axios';
import TouchCarousel, { clamp } from 'react-touch-carousel';
import touchWithMouseHOC from '../../static/lib/touchWithMouseHOC';


const cardSize = 100
const cardPadCount = 0
const carouselWidth = 100

function log (text) {
    console.log(text);  
}


export default class MenuStepPreview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    /**
     * Author: baots
     * Created at: 12:21PM, 12-02-2018
     */
    addDish = (create_menu_id) => {
        return axios.post('http://13.250.107.234/api/menu/add/dish', {
            create_menu_id: create_menu_id,
            dishes: this.props.fieldValues.selectedDish2
        });
    }
      
    addAllergy = (create_menu_id) => {
        return axios.post('http://13.250.107.234/api/menu/create/allergies', {
            create_menu_id: create_menu_id,
            allergies: this.props.fieldValues.allergies2
        });
    }

    addDietary = (create_menu_id) => {
        return axios.post('http://13.250.107.234/api/menu/create/dietaries', {
            create_menu_id: create_menu_id,
            dietaries: this.props.fieldValues.dietaries
        });
    }

    sendRequest = (self) => {
        //- create form data
        const data = new FormData();

        //- update first then create ingredients, food allergy, dietary
        var propValues = this.props.fieldValues;
        var name = propValues.menuName;
        var describe = propValues.menuDescription;
        var numberOfPeople = propValues.numberOfPeople;

        //- cost
        var cost = propValues.cost;
        var suggestedPrice = propValues.suggestedPrice;
        var customPrice = propValues.customPrice;

        //- prepare time
        var prepareTime = propValues.prepareTime;

        //- tags
        var tags = propValues.tags;
        
        console.log(propValues);

        //- create data using for api
        //- local chef id: 5a7431f357076fd017913c9f
        //- server chef id: 5a79a1524be30c971138175e
        // data.append('chefID', '5a79a1524be30c971138175e');
        data.append('chefID', localStorage.getItem('create_chef_id'));
        data.append('name', name);
        data.append('describe', describe);
        data.append('numberOfPeople', numberOfPeople);

        //- cost
        data.append('cost', cost);
        data.append('suggestedPrice', suggestedPrice);
        data.append('customPrice', customPrice);
        
        //- preparation time
        data.append('prepareTime', prepareTime);

        //- tags
        data.append('tags', tags);

        console.log(data);
        
        //- set header
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }

        //- using axios
        axios
        .post('http://13.250.107.234/api/menu/create', data)
        .then(function(res){
            console.log(res);
            if(res.status === 201)
            {
                //- prop ids
                var menu_id = {};
                menu_id.create_menu_id = res.data.data.create_menu_id;
                menu_id.update_menu_id = res.data.data.update_menu_id;
                console.log(menu_id);
                //- using axios all
                self.addMore(menu_id);
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
            debugger
            let errorStack = [];
            errorStack.push('Error when create menu. Please try again');
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);

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
    addMore = (menu_id)=> {
        console.log(this.props.fieldValues);
        let that = this;
        axios.all([
            this.addDish(menu_id.create_menu_id),
            this.addAllergy(menu_id.create_menu_id), 
            this.addDietary(menu_id.create_menu_id), 
        ])
        .then(function(arr){
            console.log(arr[0].data);
            console.log(arr[1].data);
            console.log(arr[2].data);

            //- go back to /become with stage 2
            let errorStack = [];
            errorStack.push('Create menu successful!');
            let notification = { type: 'error', heading: 'Successful!', content: errorStack, createdAt: Date.now() };
            that.props.store.addNotification(notification);
            // sessionStorage.setItem("welcomeStage", 2);
            // Router.push('/become');
        })
        .catch(function(err){
            console.log(err);
        });
    }
    
    //------------------------------------

    // send profile to create profile
    save = () => {
        // create new form data
        // const data = new FormData();

        // sessionStorage.setItem("welcomeStage", 2);
        // alert('Create menu successfull :D');

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

    renderCard (indexx) {
        console.log(indexx);
        return this.props.fieldValues.selectedDish.map((item, index)=>{
            return (
                <div
                    key={index}
                    className='carousel-card'
                    onClick={() => log(`clicked card ${1 + index}`)}
                >
                    <div
                        className='carousel-card-inner'
                        style={{backgroundImage: `url(http://13.250.107.234/images/${item.dImageName})`}}
                    >
                        <div className='carousel-title'></div>
                        <div className='carousel-text'></div>
                    </div>
                </div>
            )
        })
    }

    CarouselContainer = (props) => {
        const {cursor, carouselState: {active, dragging}, ...rest} = props
        let current = -Math.round(cursor) % this.props.fieldValues.selectedDish.length
        while (current < 0) {
            current += this.props.fieldValues.selectedDish.length
        }
        // Put current card at center
        const translateX = (cursor - cardPadCount) * cardSize + (carouselWidth - cardSize) / 2
        return (
            <div
            className={cx(
                'carousel-container',
                {
                'is-active': active,
                'is-dragging': dragging
                }
            )}
            >
            <div
                className='carousel-track'
                style={{transform: `translate3d(${translateX}px, 0, 0)`}}
                {...rest}
            />
        
            <div className='carousel-pagination-wrapper'>
                <ol className='carousel-pagination'>
                {this.props.fieldValues.selectedDish.map((_, index) => (
                    <li
                    key={index}
                    className={current === index ? 'current' : ''}
                    />
                ))}
                </ol>
            </div>
            </div>
        )
    }

    render() {
        const Container = touchWithMouseHOC(this.CarouselContainer);

        return (
            <div className="create_profile_step">
                <style jsx>{`
                    /* Landscape phones and down */
                    @media (max-width: 480px) {
                        .container {
                            margin-top: 20px;
                            margin-bottom: 20px;
                            [conteneditable="true"] {
                                width: 100%
                            }
                            .bottom-confirmation {
                                position: fixed;
                                width: 70%;
                                bottom: 15px;
                                z-index: 5;
                                left: 15%;
                            }
                            .menu-name {
                                font-weight: bold;
                                font-size: 25px;
                                vertical-align: bottom;
                                display: inline-block;
                                margin: 3px 0px;
                                width: 100%;
                            }
                            .menu-description {
                                width: 100%;
                                display: block;
                                text-align: justify;
                                font-size: 14px;
                                margin: 5px 0px 0px 0px;
                            }
                            .menu-numberOrder {
                                width: 100%;
                                display: block;
                                text-align: center;
                                font-size: 14px;
                                margin: 5px 0px 0px 0px;
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
                        }
                    }
                `}</style>

                <div className="container">
                    {/* general information */}
                    <span className="menu-name" ref="dishName" suppressContentEditableWarning="true" contentEditable="true">{this.props.fieldValues.menuName}</span>
                    <span className="menu-description" ref="dishName" suppressContentEditableWarning="true" contentEditable="true">{this.props.fieldValues.menuDescription}</span>

                    <TouchCarousel
                        component={Container.bind(this)}
                        cardCount={1}
                        cardSize={375}
                        renderCard={this.renderCard.bind(this)}
                    />

                    <span className="menu-numberOrder" ref="dishName" suppressContentEditableWarning="true" contentEditable="true">Meal for {this.props.fieldValues.numberOfPeople} people</span>
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
                    <div className="allergies" onClick={ () => { this.props.store.globalStep = 6 } } >
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
                    <div className="dietary" onClick={ () => { this.props.store.globalStep = 7 } }>
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
                                            <img
                                                style={{
                                                    position: 'absolute',
                                                    right: '8px',
                                                    top: '9px'
                                                }}
                                                src="../../static/icons/close.svg"
                                                onClick={ () => { this.removeTag(index) } }
                                            />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>


                </div>
                <div className="container bottom-confirmation">
                    <button className="btn inline" onClick={ this.save }>Save</button>
                </div>

            </div>
        )
    }
}
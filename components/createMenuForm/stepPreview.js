import Link from 'next/link';
import React from 'react';

import validator from 'validator';
import axios from 'axios';


export default class MenuStepPreview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    // send profile to create profile
    save = () => {
        // create new form data
        const data = new FormData();

        // split firtname and lastname
        let fullname = validator.trim(this.refs.fullname.innerText);
        let firstname = null;
        let lastname = null;

        firstname = validator.trim(fullname.split(" ")[0]);
        lastname = validator.trim(fullname.substr(fullname.indexOf(" "), fullname.length));
        
        data.append('firstName', firstname);
        data.append('lastName', lastname);
        data.append('uid', '5a6e8312e35b20787806756a');
        data.append('address', this.props.fieldValues.location);
        data.append('phoneNumber', this.props.fieldValues.phoneNo);
        data.append('serviceOption', this.props.fieldValues.services);
        data.append('dateOfBirth', this.props.fieldValues.dob);
        data.append('gender', this.props.fieldValues.gender);
        data.append('certification', this.props.fieldValues.exp[0]);
        data.append('school', this.props.fieldValues.exp[1]);
        data.append('about', this.props.fieldValues.yourself);
        data.append('inspiration', this.props.fieldValues.inspiration);
        data.append('chefImageName', 'abc.jpg');
        data.append('chefImage', this.props.fieldValues.cacheFile, 'abc.jpg');
        

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post('http://13.250.107.234/api/chef/create', data, config)
        .then(function (response) {
            alert('Create successful ^^');
        })
        .catch(function (error) {
            alert('Error when create profile. Please try again');
            
        });

    }

    render() {
        return (
            <div className="create_profile_step">
                <style jsx>{`
                    /* Landscape phones and down */
                    @media (max-width: 480px) {
                        .container {
                            margin-top: 20px;
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
                    <div className="allergies">
                        <h4>Major food allergies</h4>
                        <div className="list">
                            {
                                this.props.fieldValues.allergies.map(function(item, index){
                                    return (
                                        <div key={index} className="list-item">
                                            <span>{item.name}</span>
                                            <img src={'./static/icons/' + item.icon}/>
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
                                this.props.fieldValues.diatary.map(function(item, index){
                                    return (
                                        <div key={index} className="list-item">
                                            <span>{item.name}</span>
                                            <img src={'./static/icons/' + item.icon}/>
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
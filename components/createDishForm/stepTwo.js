import Link from 'next/link';
import React from 'react';

import validator from 'validator';
import axios from 'axios';

export default class DishStepTwo extends React.Component {
    constructor(props) {
        super(props);

        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.checkLength = this.checkLength.bind(this);

        this.state = {
            descriptionContent: '',
            descriptionLength: 0
        }
    }

    // check length of textarea when user enter new value
    checkLength = () => {

        // get length of description
        let stringLength = this.refs.dishDescription.value.length;

        if (stringLength > 250) {
            alert('Length of description not greater than 250 charaters');
        } else {
            this.setState({
                descriptionContent: this.refs.dishDescription.value,
                descriptionLength: stringLength
            });
        }
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        //flag variables to check error existed
        let error = false;

        // Get values via this.refs
        let data = {
            dishName: null,
            dishDescription: null
        }

        // dish name must not empty string
        if (validator.isEmpty(validator.trim(this.refs.dishName.value))) {
            error = true;
            alert('Must have dish name');
        } else {
            error = false
        }

        // last name must not empty string
        if (validator.isEmpty(validator.trim(this.refs.dishDescription.value))) {
            error = true;
            alert('Must have dish description');
        } else {
            error = false
        }

        // no error found
        if (!error) {
            data = {
                dishName: this.refs.dishName.value,
                dishDescription: this.refs.dishDescription.value
            }
            
            //- create new dish with api
            this.apiCall();
            
            this.props.saveValues(data);
            this.props.nextStep();
        }
    }

    apiCall = () => {
        var propValues = this.props.fieldValues;
        var dishImageSrc = this.props.fieldValues.dishImagesSrc;
        var dishName = this.props.fieldValues.dishName;
        var dishDecription = this.refs.dishDescription.value;
        var cacheFile = this.props.fieldValues.cacheFile;
        var fileName = propValues.cacheFile['name'];

        console.log(propValues);

        const data = new FormData();

        //- create data using for api
        data.append('chefID', '5a79a1524be30c971138175e');
        data.append('dName', dishName);
        data.append('describe', dishDecription);
        data.append('dishImageName', fileName);
        data.append('dishImage', cacheFile);

        console.log(data);
        console.log(typeof(cacheFile));
        
        //- set header
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
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
                //- set to props
                this.props.saveValues(dish_id);
                console.log(this.props);
            }
        })
        .catch(function(err){
            console.log(err);
        });
    }

    render() {
        return (
            <div className="create_profile_step">
                <style jsx>{`
                    textarea {
                        width: 90%;
                        border: 1px solid #ccc;
                        margin-top: 20px;
                        outline: none;
                        padding: 10px;
                        font-size: 12px;
                    }
                    .text-length {
                        float: right;
                        font-size: 11px;
                    }
                    /* Landscape phones and down */
                    @media (max-width: 480px) {
                        .bottom-confirmation {
                            position: fixed;
                            width: 70%;
                            bottom: 15px;
                            z-index: 5;
                            left: 15%;
                        }
                    }
                `}</style>
                <div className="container">
                    <h3>Dish Detail</h3>
                    <input type="text" required ref="dishName" placeholder="dish name" defaultValue={ this.props.fieldValues.firstName }/>
                    <textarea 
                        onChange={this.checkLength}
                        ref="dishDescription"
                        rows="18"
                        placeholder="Also let foodie know more about your dishes” - hint ” How to make dishes? - Where it come from? - Why you think it is nice? - Any special ingredient used?”"
                        value= { this.state.descriptionContent }
                    >
                    </textarea>
                    <span className="text-length">{this.state.descriptionLength} / 250</span>
                    <div className="bottom-confirmation">
                        <button className="btn" onClick={ this.saveAndContinue }>Next</button>
                    </div>
                </div>

            </div>
        )
    }
}
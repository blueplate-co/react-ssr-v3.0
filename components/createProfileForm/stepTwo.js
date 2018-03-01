import Link from 'next/link';
import React from 'react';

import validator from 'validator';
import { inject, observer } from 'mobx-react';
import Phone, { formatPhoneNumber, parsePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';

@inject('store') @observer
export default class ProfileStepTwo extends React.Component {
    constructor(props) {
        super(props);
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.state = {
            lat: null,
            lng: null,
            phone: ''
        }
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        //flag variables to check error existed
        let errorStack = [];

        // Get values via this.refs
        let data = {
            lat: null,
            lng: null,
            location: null,
            phoneNo: null
        }

        // location must not empty string and with valid format
        if (validator.isEmpty(validator.trim(this.refs.location.value))) {
            errorStack.push('Location address cannot be blank.');
        } else {
            let addr = document.getElementById("location");
            // Get geocoder instance
            let geocoder = new google.maps.Geocoder();

            // Geocode the address
            geocoder.geocode({
                'address': addr.value
            }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
                    // set it to the correct, formatted address if it's valid
                    addr.value = results[0].formatted_address;
                }
                else{
                    errorStack.push("The address you typed in is not valid.");
                }
            });
        }

        // phone number must not empty string and correct format
        if (validator.isEmpty(validator.trim(this.state.phone))) {
            errorStack.push('Phone number cannot be blank.');
        } else {
            if(!isValidPhoneNumber(this.state.phone)) {
                errorStack.push('The format of phone number is invalid.');
            }
        }

        // no error found
        if (errorStack.length == 0) {
            // make sure check HTML entities before apply value to data variables
            data = {
                lat: this.state.lat,
                lng: this.state.lng,
                location: this.refs.location.value,
                phoneNo: this.state.phone
            }

            // set location value to mobx store
            this.props.store.address = data.location;
            this.props.store.lat = data.lat;
            this.props.store.lng = data.lng;
            
            this.props.saveValues(data);
            this.props.nextStep();
        } else {
            var notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
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

        this.props.setProgress(20);

        // focus to location input
        this.refs.location.focus();

        // init for google places autocomplete
        let that = this;
        let inputPlaces = document.getElementById('location');
        let autocomplete = new google.maps.places.Autocomplete(inputPlaces, {
            types: ["geocode"]
        });

        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            let place = autocomplete.getPlace();
            that.setState({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            });
        });

        // set default value for phone number
        this.setState({
            phone: this.props.fieldValues.phoneNo
        })
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
                    }
                `}</style>
                <div className="container" onKeyDown={ this.handleEnter }>
                    <h3>Where</h3>
                    <input type="text" required ref="location" id="location" placeholder="location" defaultValue={ this.props.fieldValues.location }/>
                    <Phone
                        country="HK"
                        placeholder="Enter phone number"
                        value={ this.state.phone }
                        convertToNational
                        onChange={
                            phone => this.setState({ phone })
                        }
                    />
                    <div className="bottom-confirmation">
                        <button className="btn" onClick={ this.saveAndContinue }>Next</button>
                    </div>
                </div>

            </div>
        )
    }
}
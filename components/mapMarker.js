import React from 'react';
import { inject, observer } from 'mobx-react';
import cnf from '../config';
import validator from 'validator';

@inject('store') @observer
export default class MapMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 16,
            address: this.props.store.address,
            lat: this.props.store.lat,
            lng: this.props.store.lng
        }
    }

    // init maps function
    initialize = () => {
        let that = this;
        // map option
        let mapOptions = {
            zoom: this.state.zoom,
            center: new google.maps.LatLng(this.state.lat, this.state.lng),
            mapTypeId: 'roadmap',
            draggable: true,
            keyboardShortcuts: false,
            fullscreenControl: false,
            disableDefaultUI: true
        };

        let map = new google.maps.Map(document.getElementById("map"), mapOptions);
        this.props.store.globalMaps = map;

        var geocoder = new google.maps.Geocoder();

        map.addListener("dragend", function() {
            var latlng = {
              lat: parseFloat(map.getCenter().lat()),
              lng: parseFloat(map.getCenter().lng())
            };
            geocoder.geocode({ location: latlng }, function(results, status) {
              if (status === "OK") {
                if (results[0]) {
                  that.setState({
                      address: results[0].formatted_address
                  })
                } else {
                  window.alert("No results found");
                }
              } else {
                window.alert("Geocoder failed due to: " + status);
              }
            });
        });
    }

    zoomIn = () => {
        let map = this.props.store.globalMaps;
        this.setState({
            zoom: this.state.zoom + 1
        }, () => {
            map.setZoom(this.state.zoom);
        });
    }

    zoomOut = () => {
        let map = this.props.store.globalMaps;
        this.setState({
            zoom: this.state.zoom - 1
        }, () => {
            map.setZoom(this.state.zoom);
        })
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }, () => {
                    let map = this.props.store.globalMaps;
                    let latlng = new google.maps.LatLng(this.state.lat, this.state.lng);
                    map.panTo(latlng);
                });
            });
        } else {
            errorStack.push('Location not support on your devices');
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
        }
    }

    // hide map for hidden
    hideMap = () => {
        // errorStack for init error list
        let errorStack = [];

        let that = this;

        // location must not empty string and with valid format
        if (validator.isEmpty(validator.trim(this.refs.search.value))) {
            errorStack.push('Must have location address.');
            let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
            this.props.store.addNotification(notification);
            return;
        } else {
            let addr = document.getElementById("search");
            // Get geocoder instance
            let geocoder = new google.maps.Geocoder();

            // Geocode the address
            geocoder.geocode({
                'address': addr.value
            }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
                    // set it to the correct, formatted address if it's valid
                    that.props.store.address = results[0].formatted_address;
                    that.props.store.lat = results[0].geometry.location.lat();
                    that.props.store.lng = results[0].geometry.location.lng();
                    // display again step-preview
                    let element = document.getElementsByClassName("create_profile_step");
                    element[0].classList.remove("hidden");
                    // hide map
                    that.props.store.showMap = false;
                }
                else{
                    errorStack.push("Invalid address.");
                    let notification = { type: 'error', heading: 'Validation error!', content: errorStack, createdAt: Date.now() };
                    that.props.store.addNotification(notification);
                }
            });
        }
    }

    // handle change when change input location
    handleChange = (e) => {
        let value = e.target.value;
        this.setState({
            address: value
        })
    }

    componentDidMount = () => {
        // init map for launch
        this.initialize();

        // init for google places autocomplete
        let that = this;
        let inputPlaces = document.getElementById('search');
        let autocomplete = new google.maps.places.Autocomplete(inputPlaces, {
            types: ["geocode"]
        });

        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            let place = autocomplete.getPlace();
            that.setState({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                address: place.formatted_address
            });
            // re-init google maps
            that.initialize();
        });
    }

    render() {
        return (
            <div className='map-container'>
                <style jsx>{`
                    .map-container {
                        width: 100vw;
                        height: 100%;
                        position: fixed;
                        z-index: 10;
                        top: 0px;
                        &:after {
                            width: 22px;
                            height: 40px;
                            display: block;
                            content: " ";
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            margin: -40px 0 0 -11px;
                            background: url("https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png");
                            background-size: 22px 40px;
                            pointer-events: none;
                        }
                        #map {
                            width: 100vw;
                            height: 100%;
                            position: relative;
                        }
                        #search {
                            position: absolute;
                            z-index: 10;
                            bottom: 5%;
                            width: 90%;
                            left: 5%;
                            height: 50px;
                            outline: none;
                            border: 1px solid #ccc;
                            font-size: 15px;
                            padding: 10px;
                            box-sizing: border-box;
                            background: url(/static/icons/check.svg) no-repeat 7px 7px #fff;
                            background-position: 95% 15px;
                            padding-right: 40px;
                        }
                        .float-btn {
                            position: absolute;
                        }
                        .round-btn {
                            border-radius: 50%;
                            height: 15px;
                            width: 15px;
                            padding: 10px;
                            background-color: ${cnf.color.primarycolor};
                        }
                        #back {
                            top: 10px;
                            left: 10px;
                        }
                        #current-place {
                            right: 5%;
                            bottom: 20%;
                        }
                        #zoom-out {
                            right: 5%;
                            bottom: 35%;
                        }
                        #zoom-in {
                            right: 5%;
                            bottom: 43%;
                        }
                    }
                `}</style>
                <div id="map"></div>
                <input defaultValue={this.state.address} value={this.state.address} onChange={(e) => {this.handleChange(e)}} id="search" ref="search" type="text" />
                <img id="back" onClick={ () => this.hideMap() } className="round-btn float-btn" src="/static/icons/arrow_back_white.svg" />
                <img id="zoom-in" onClick={ () => this.zoomIn() } className="round-btn float-btn" src="/static/icons/zoomIn.svg" />
                <img id="zoom-out" onClick={ () => this.zoomOut() } className="round-btn float-btn" src="/static/icons/zoomOut.svg" />
                <img id="current-place" onClick={ () => this.getLocation() } className="round-btn float-btn" src="/static/icons/current_location.svg" />
            </div>
        )
    }

}
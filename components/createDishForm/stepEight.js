
import Link from 'next/link';
import React from 'react';

import validator from 'validator';

import cnf from '../../config';
import layout from '../layout';


export default class DishStepEight extends React.Component {
    constructor(props) {
        super(props);

        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: '',
            tags: []
        }
    }

    // action when user click to next button
    saveAndContinue = (e) => {
        e.preventDefault();

        if (this.state.tags.length == 0) {
            alert("Must at least one tag");
            return false;
        }

        let data = {
            tags: this.state.tags
        }

        this.props.saveValues(data);
        this.props.nextStep();


    }

    // action remove tag when user click on x icon on right tags
    removeTag = (index) => {
        let dummy = this.state.tags;
        dummy.splice(index, 1);
        this.setState({
            tags: dummy
        });
    }

    // generate tags from state
    generateTags = () => {
        return this.state.tags.map((item, index) => {
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
                            top: '7px'
                        }}
                        src="/static/icons/close.svg"
                        onClick={ () => { this.removeTag(index) } }
                    />
                </li>
            );
        })
    }

    // update value to state when user type in input
    handleChange = (e) => {
        let tagValue = e.target.value;
        this.setState({
            value: tagValue
        });
    }

    // action when user press enter then add tag into list
    addTag = (e) => {
        if (e.keyCode == 13) { // press enter / return key
            let tagValue = this.state.value;
            let tagList = this.state.tags;
            tagList.push(tagValue);
            this.setState({
                tags: tagList,
                value: ''
            });
        }

    }

    render() {
        return (
            <div className="create_profile_step">
                <style jsx>{`
                    .row-data {
                        display: grid;
                        grid-template-columns: 100%;
                        font-weight: 400;
                        padding-bottom: 10px;
                        padding-top: 10px;
                        margin-bottom: 10px;
                        font-size: 12px;
                        ul {
                            list-style: none;
                            margin: 0px;
                            padding: 0px;
                        }
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
                        i.fas {
                            float: right;
                            margin: 5px;
                        }
                    }
                `}</style>

                <div className="container">
                    <h3>Tags</h3>
                    <div className="row-data">
                        <input type="text" placeholder="type words" onKeyDown={ this.addTag } value={ this.state.value } onChange={ this.handleChange }/>
                    </div>
                    <div className="row-data">
                        <ul>
                            { this.generateTags() }
                        </ul>
                    </div>
                </div>
                <div className="container bottom-confirmation">
                    <button className="btn inline" onClick={ this.saveAndContinue }>Next</button>
                </div>

            </div>
        )
    }
}
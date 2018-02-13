import React from 'react';
import { inject, observer } from 'mobx-react';

import cnf from '../config';

@inject('store') @observer
export default class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.closeNotification = this.closeNotification.bind(this);
    }

    // close selected notification
    closeNotification = (subject) => {
        let indexOfSelected = this.props.store.notification.indexOf(subject);
        if (indexOfSelected > -1) {
            this.props.store.removeNotification(indexOfSelected);
        }
    }

    componentDidUpdate = () => {
        let maxLifespan = 5000; // alive in 5s
        let that = this;
        // check once per second
        setInterval(function checkItems(){
            that.props.store.notification.forEach(function(item){
                if(Date.now() - maxLifespan > item.createdAt){
                    that.props.store.notification.shift() // remove first item
                }
            })
        }, 1000);
    }

    render() {
        return (
            <div className="notification-wrapper">
                <style jsx>{`
                    /* Landscape phones and dowsn */
                    @media (max-width: 480px) {
                        .notification-wrapper {
                            width: 100vw;
                            height: 100vh;
                            .notification {
                                animation-duration: 0.15s;
                                position: absolute;
                                margin-top: 20px;
                                left: 5%;
                                width: 90%;
                                color: #fff;
                                border-radius: 10px;
                                padding: 20px;
                                box-sizing: border-box;
                                &.error {
                                    background-color: ${cnf.color.redcolor};
                                }
                                h3 {
                                    margin: 5px 0px;
                                }
                                img {
                                    position: absolute;
                                    right: 15px;
                                    top: 15px;
                                }
                                .item-message {
                                    margin: 5px 0px;
                                    padding-left: 10px;
                                    width: 100%;
                                    display: block;
                                }
                            }
                        }
                    }
                `}</style>
                {
                    this.props.store.notification.map((item, index) => {
                        let hasTop = (index * 23) + '%';
                        let renderMarkup = () => {
                            let resultString = '';
                            if (Array.isArray(item.content) && item.content.length > 0) {
                                item.content.map((item, index) => {
                                    resultString += `<p class="item-message">` + item +`</p>`;
                                })
                            }
                            return {__html: resultString};
                        }
                        return (                            
                                <div
                                    key={index}
                                    style = {{ top: hasTop }}
                                    className={ 'notification animated slideInDown ' + item.type }
                                >
                                    <img src="/static/icons/close-white.svg" onClick={ () => { this.closeNotification(this.props.store.notification[index]) }}/>
                                    <h3>{ item.heading }</h3>
                                    <p dangerouslySetInnerHTML={renderMarkup()} />
                                </div>
                        )
                    })
                }
                { this.props.children }
            </div>
        )
    }
}
import Link from 'next/link';
import React from 'react';

export default class ProgressiveImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            background: '',
            loaded: false
        }
    }

    componentDidMount = () => {
        var placeholder = document.querySelector('.placeholder');
        var that = this;
        
        // 1: load small image and show it
        var img = new Image();
        img.src = this.props.small;
        img.onload = function () {
            that.setState({
                background: that.props.small
            },() => {
                console.log('small loaded');
            })
        };
        
        // 2: load large image
        var imgLarge = new Image();
        imgLarge.src = placeholder.dataset.large; 
        imgLarge.onload = function () {
            that.setState({
                background: that.props.large
            },() => {
                console.log('large loaded');
                that.setState({
                    loaded: true
                })
            })
        };
    }

    render() {
        return (

                <div className="placeholder" data-large={this.props.large}>
                    <style jsx>{`
                        .placeholder {
                            background-color: #f6f6f6;
                            background-size: cover;
                            background-repeat: no-repeat;
                            display: table;
                            min-width: 100%;
                            min-height: 100%;
                            overflow: hidden;
                            .blur {
                                filter: blur(50px);
                                transform: scale(1);
                            }
                            .background {
                                opacity: 1;
                                top: 0;
                                left: 0;
                                display: table-cell;
                                transition: 0.5s linear;
                                background-size: cover;
                                background-position: center center;
                                background-repeat: no-repeat;
                            }
                        }
                    `}</style>
                    <div className={(this.state.loaded) ? 'background' : 'background blur'} style={{backgroundImage: "url(" + this.state.background + ")"}}></div>
                </div>
        )
    }
}
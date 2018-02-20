import React from 'react';
import cnf from '../config';

export default class BPInput extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            placeholder: 'fdsfs'
        }
    }

    render() {
        return (
            <div className="wave-wrapper">
                <style jsx>{`
                    .wave-wrapper {
                        float: left;
                        width: 100%;
                        margin: 40px 3%;
                        position: relative;
                        .wave {
                            border: 0;
                            width: 100%;
                            outline: none;
                            border: 1px solid transparent;
                            box-sizing: border-box;
                            padding: 10px;
                            font-size: 15px;
                            outline: none;
                            border-radius: 0;
                            -webkit-appearance: none;
                            & ~ .focus-border {
                                position: absolute;
                                bottom: 0;
                                left: 50%;
                                width: 0;
                                height: 2px;
                                background-color: ${cnf.color.primarycolor};
                                transition: 0.3s;
                            }
                            &:focus ~ .focus-border{
                                width: 100%;
                                transition: 0.3s;
                                left: 0;
                            }
                        }
                    }
                `}</style>

                <input
                    className="wave"
                    placeholder={this.state.placeholder}
                />
                <span className="focus-border"></span>
            </div>
        )
    }
}
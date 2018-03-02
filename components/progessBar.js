import Link from 'next/link';
import React from 'react';

import cnf from '../config';

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="progress-bar">
                <style jsx>{`
                    .progress-bar {
                        position: fixed;
                        z-index: 2;
                        top: 55px;
                        width: 100%
                    }
                    #progressbar {
                        background-color: ${cnf.color.graycolor};
                    }
                      
                    #progressbar > div {
                        background-color: ${cnf.color.primarycolor};
                        height: 3px;
                        transition: width 0.25s ease-in;
                    }
                `}</style>
                <div id="progressbar">
                    <div style={{ width: this.props.progress + '%' }}></div>
                </div>
    
            </header>
        )
    }
}
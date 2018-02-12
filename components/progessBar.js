import Link from 'next/link';
import React from 'react';
import { inject, observer } from 'mobx-react';

import cnf from '../config';

@inject('store') @observer
export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="navigation">
                <style jsx>{`
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
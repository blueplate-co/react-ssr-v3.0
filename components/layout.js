import Head from './head';
import Navigation from './navigation';
import Footer from './footer';

import cnf from '../config';

const Layout = (props) => (
    <div className="layout-wrapper">
        {/* internal styles in sass format */}
        <style global jsx>{`
            * {
                font-family: '${cnf.font.primaryfont}', san-serif;
                -webkit-tap-highlight-color: transparent;
            }
            body {
                margin: 0px;
                padding: 0px;
            }
            .container {
                width: 70%;
                height: auto;
                margin: 0px auto;
                text-align: center;
            }
            input[type="text"] {
                border: none;
                border-bottom: 1px solid #ccc;
                color: #000;
                width: 100%;
                box-sizing: border-box;
                padding: 10px;
                font-size: 15px;
                outline: none;
                border-radius: 0;
                -webkit-appearance: none;
                &:focus {
                    border-bottom: 1px solid ${cnf.color.primarycolor};
                }
            }
            input[type="password"] {
                border: none;
                border-bottom: 1px solid #ccc;
                color: #000;
                width: 100%;
                box-sizing: border-box;
                padding: 10px;
                font-size: 15px;
                outline: none;
                border-radius: 0;
                -webkit-appearance: none;
                &:focus {
                    border-bottom: 1px solid ${cnf.color.primarycolor};
                }
            }
            input[type="email"] {
                border: none;
                border-bottom: 1px solid #ccc;
                color: #000;
                width: 100%;
                box-sizing: border-box;
                padding: 10px;
                font-size: 15px;
                outline: none;
                border-radius: 0;
                -webkit-appearance: none;
                &:focus {
                    border-bottom: 1px solid ${cnf.color.primarycolor};
                }
            }
            input[type="tel"] {
                border: none;
                border-bottom: 1px solid #ccc;
                color: #000;
                width: 100%;
                box-sizing: border-box;
                padding: 10px;
                font-size: 15px;
                outline: none;
                border-radius: 0;
                -webkit-appearance: none;
                &:focus {
                    border-bottom: 1px solid ${cnf.color.primarycolor};
                }
            }
            input[type="date"] {
                border: none;
                border-bottom: 1px solid #ccc;
                color: #000;
                width: 100%;
                box-sizing: border-box;
                padding: 10px;
                font-size: 15px;
                border-radius: 0;
                -webkit-appearance: none;
                outline: none;
            }
            /* Remove default checkbox */
            [type="checkbox"]:not(:checked),
            [type="checkbox"]:checked {
                position: absolute;
                left: -9999px;
            }
            [type="checkbox"]:not(:checked) + label,
            [type="checkbox"]:checked + label {  
                position: relative;
                overflow: hidden;
                padding-left: 35px;
                cursor: pointer;
                display: inline-block;
                height: 25px;
                line-height: 25px;

                -webkit-user-select: none; /* webkit (safari, chrome) browsers */
                -moz-user-select: none; /* mozilla browsers */
                -khtml-user-select: none; /* webkit (konqueror) browsers */
                -ms-user-select: none; /* IE10+ */
            }

            /* checkbox aspect */
            [type="checkbox"] + label:before,
            [type="checkbox"] + label:after {
                content: '';
                position: absolute;
                left: 0;
                z-index: 1;
                -webkit-transition: .2s;
                transition: .2s;
            }
            /* Unchecked styles */
            [type="checkbox"]:not(:checked) + label:before {
                top: 0px;
                width: 19px; height: 19px;
                border: 2px solid #767676;
            }
            [type="checkbox"]:not(:checked) + label:after {
                top: 0px;
                width: 19px; height: 19px;
                border: 2px solid #767676;
                z-index: 0;
            }
            /* Checked styles */
            [type="checkbox"]:checked + label:before {
                top: 2px;
                width: 6px; height: 12px;
                border-top: 2px solid transparent;
                border-left: 2px solid transparent;
                border-right: 2px solid #767676;
                border-bottom: 2px solid #767676;
                -webkit-transform: rotateZ(37deg);
                transform: rotateZ(37deg);

                -webkit-transform-origin: 20% 40%;
                transform-origin: 100% 100%;
            }
            [type="checkbox"]:checked + label:after {
                top: 0px;
                width: 19px; height: 19px;
                border: 2px solid #767676;
                z-index: 0;
            }
            /* disabled checkbox */
            [type="checkbox"]:disabled:not(:checked) + label:before,
            [type="checkbox"]:disabled:checked + label:before {
                top: 0;
                box-shadow: none;
                background-color: #444;
                width: 19px; height: 19px;
                border: 3px solid #444;
                -webkit-transform: rotateZ(0deg);
                transform: rotateZ(0deg);
            }
            [type="checkbox"]:disabled + label {
                color: #555;
            }
            [type="checkbox"]:disabled:not(:checked) + label:hover:before {
                border-color: #767676;
            }
            select {
                border: none;
                border-bottom: 1px solid #ccc;
                color: #000;
                width: 100%;
                box-sizing: border-box;
                padding: 10px;
                font-size: 15px;
                outline: none;
                background: none;
                border-radius: 0px;
            }
            .btn {
                background: ${cnf.color.primarycolor};
                border: none;
                width: 100%;
                padding: 10px;
                color: #fff;
                text-transform: uppercase;
                border-radius: 20px;
                outline: none;
                &.inline {
                    margin: 0px 5px;
                }
            }
            [contenteditable="true"] {
                outline: none;
                position: relative;
                border-bottom: ${cnf.color.primarycolor} 1px solid;
            }
            /* Landscape phones and down */
            @media (max-width: 480px) {
                .layout-wrapper {
                    display: grid;
                    grid-template-columns: 100%;
                }
            }
        `}</style>

        {props.children}
    </div>
)

export default Layout;
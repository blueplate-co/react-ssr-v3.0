import Head from './head';
import Navigation from './navigation';
import Footer from './footer';

// global setting for sass
const mainBackgroundcolor = '#fff';
const primarycolor = '#eee'

const Layout = (props) => (
    <div className="layout-wrapper">
        {/* internal styles in sass format */}
        <style global jsx>{`
            body {
                margin: 0px;
                font-family: 'Lato', sans-serif;
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
            }
            input[type="date"] {
                border: none;
                border-bottom: 1px solid #ccc;
                color: #000;
                width: 100%;
                box-sizing: border-box;
                padding: 10px;
                font-size: 15px;
                outline: none;
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
                background: #56A9CB;
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
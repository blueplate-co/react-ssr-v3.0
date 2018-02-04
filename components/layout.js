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
            /* Landscape phones and down */
            @media (max-width: 480px) {
                body {
                    margin: 0px;
                    font-family: 'Lato', sans-serif;
                }
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
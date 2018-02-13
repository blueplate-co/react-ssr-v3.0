import NextHead from 'next/head';
import { string } from 'prop-types';

import cnf from '../config';

const defaultDescription = ''
const defaultOGURL = ''
const defaultOGImage = ''

const Head = (props) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ''}</title>
    <meta name="description" content={props.description || defaultDescription} />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
    <meta name="theme-color" content={cnf.color.primarycolor} />
    <meta name="apple-mobile-web-app-status-bar-style" content={cnf.color.primarycolor} />
    <link rel="apple-touch-icon" href="/static/touch-icon.png" />
    <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
    <link rel="icon" href="/static/favicon.ico" />
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,700,900" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDsk4kS2PWLNQKcjOWZT28UJ4izWcUUgOQ&libraries=places"></script>
    {/* custom styles from component */}
    <link href="/static/styles/range-slider.css" rel="stylesheet" />
    <link href="/static/styles/touch-slider.css" rel="stylesheet" />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ''} />
    <meta property="og:description" content={props.description || defaultDescription} />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head

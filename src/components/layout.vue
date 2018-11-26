<template>
  <div>
      <layout-header></layout-header>
      <layout-main></layout-main>
      <layout-footer></layout-footer>
  </div>
</template>

<script>
  import LayoutHeader from './header'
  import LayoutFooter from './footer'
  import LayoutMain from './main'
  export default {
    name: "layout",
    components:{
      LayoutHeader,
      LayoutFooter,
      LayoutMain
    }
  }
</script>
<style>
  blockquote, body, button, dd, dl, dt, fieldset, figure, form, h1, h2, h3, h4, h5, h6, input, legend, li, ol, p, pre, select, td, textarea, th, ul {
    margin: 0;
    padding: 0;
    -moz-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  a, dd, div, dl, i, img, input, li, p, span, ul {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-font-smoothing: antialiased
  }

  article, aside, details, figcaption, figure, footer, header, main, nav, section, summary {
    display: block
  }

  audio, canvas, video {
    display: inline-block;
    *display: inline;
    *zoom: 1
  }

  audio:not([controls]) {
    display: none;
    height: 0
  }

  [hidden] {
    display: none
  }

  html {
    font-size: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%
  }

  html, button, input, select, textarea {
    font-family: sans-serif
  }

  body {
    margin: 0
  }

  a:active, a:hover {
    outline: 0
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.5em;
  }

  h3 {
    font-size: 1.17em;
  }

  h4 {
    font-size: 1em;
  }

  h5 {
    font-size: 0.83em;
  }

  h6 {
    font-size: 0.67em;
  }

  abbr[title] {
    border-bottom: 1px dotted
  }

  b, strong {
    font-weight: bold
  }

  blockquote {
    margin: 1em 40px
  }

  dfn {
    font-style: italic
  }

  hr {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    height: 0
  }

  mark {
    background: #ff0;
    color: #000
  }

  code, kbd, pre, samp {
    font-family: monospace, serif;
    _font-family: 'courier new', monospace;
    font-size: 1em
  }

  pre {
    white-space: pre;
    white-space: pre-wrap;
    word-wrap: break-word
  }

  q {
    quotes: none
  }

  q:before, q:after {
    content: '';
    content: none
  }

  small {
    font-size: 80%
  }

  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline
  }

  sup {
    top: -0.5em
  }

  sub {
    bottom: -0.25em
  }

  dl, menu, ol, ul {
    margin: 0
  }

  dd {
    margin: 0 0 0 40px
  }

  menu, ol, ul {
    padding: 0;
    list-style: none;
    list-style-image: none
  }

  nav ul, nav ol {
    list-style: none;
    list-style-image: none
  }

  img {
    border: 0;
    -ms-interpolation-mode: bicubic
  }

  svg:not(:root) {
    overflow: hidden;
    _zoom: 1
  }

  figure {
    margin: 0
  }

  form {
    margin: 0
  }

  fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em
  }

  legend {
    border: 0;
    padding: 0;
    white-space: normal;
    *margin-left: -7px
  }

  button, input, select, textarea {
    font-size: 100%;
    margin: 0;
    vertical-align: baseline;
    *vertical-align: middle
  }

  button, input {
    line-height: normal
  }

  button, select {
    text-transform: none
  }

  button, html input[type="button"], input[type="reset"], input[type="submit"] {
    -webkit-appearance: button;
    cursor: pointer;
    *overflow: visible;
    border-radius: 0
  }

  button[disabled], html input[disabled] {
    cursor: default
  }

  input[type="checkbox"], input[type="radio"] {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
    *height: 13px;
    *width: 13px
  }

  input[type="search"] {
    -webkit-appearance: textfield;
    -webkit-box-sizing: content-box;
    box-sizing: content-box
  }

  input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none
  }

  button::-moz-focus-inner, input::-moz-focus-inner {
    border: 0;
    padding: 0
  }

  textarea {
    overflow: auto;
    vertical-align: top
  }

  table {
    border-collapse: collapse;
    border-spacing: 0
  }

  body {
    font: 14px/1.5 "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    color: #333;
    background-color: #f5f5f5;
    min-width: 1226px
  }

  a {
    color: #555555;
    text-decoration: none
  }

  a:hover {
    color: #ff6700;
    text-decoration: none
  }

  .clearfix {
    *zoom: 1
  }

  .clearfix:before, .clearfix:after {
    content: " ";
    display: table
  }

  .clearfix:after {
    clear: both
  }

  .hide {
    display: none !important
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }
</style>



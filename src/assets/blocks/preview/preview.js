import $ from 'jquery';
import 'bxslider/dist/jquery.bxslider.min.js';
import 'bxslider/dist/jquery.bxslider.css';
import './preview-bxslider.scss';

import '../rate-button/rate-button.js';

$(document).ready(function(){
  $('.bxslider').bxSlider()
});
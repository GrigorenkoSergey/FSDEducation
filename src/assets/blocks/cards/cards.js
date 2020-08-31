import './cards.scss';

import '../search-form/search-form.js';
import '../final-bill/final-bill.js';
import '../preview/preview.js';
import '../registration/registration.js';
import '../log-in/log-in.js';
import Datepicker from '../datepicker/datepicker.js';

const calendar = new Datepicker(document.querySelector('.cards__calendar'), {
  // startDate: new Date(2019, 7),
});
calendar.datepicker.selectDate(new Date(Date.now() + 3 * 24 * 3600 * 1000));
calendar.datepicker.selectDate(new Date(Date.now() + 7 * 24 * 3600 * 1000));

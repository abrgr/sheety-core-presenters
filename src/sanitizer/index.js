// TODO: THIS IS DISGUSTING.
//       caja (https://developers.google.com/caja/) is intended to run
//       on the server but we are monkeying with it to get it to be an
//       html/css sanitizer.
//
//       The files in here are cobbled together from a file returned by
//       the Caja server,
//       https://caja.appspot.com/v6012-es53-2-ge0690ee2/ses-single-frame.js,
//       and the github repo, https://github.com/google/caja.
import { html_sanitize } from './htmlsanitizer';

const sanitizer = {
  sanitize: html_sanitize
};

export default sanitizer;

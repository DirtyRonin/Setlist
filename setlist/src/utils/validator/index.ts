import validator from 'validator';

const default_url_options = {
    protocols: ['http', 'https', 'ftp'],
    require_tld: false,
    require_protocol: false,
    require_host: false,
    require_valid_protocol: false,
    allow_underscores: false,
    allow_trailing_dot: false,
    allow_protocol_relative_urls: false
  };

export const validatorIsUrl = (url : string) : boolean => validator.isURL(url,default_url_options)

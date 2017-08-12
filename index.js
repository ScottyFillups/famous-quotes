const express = require('express');
const router = express.Router();
const unirest = require('unirest');
const request = require('request');
const DEFAULT_QUOTE = {
  quote: 'You cannot escape the responsibility of tomorrow by evading it today.',
  author: 'Abraham Lincoln',
  category: 'famous'
};

function quoteMaker(key, options) {
  options = options || {};
  options.default = options.default || DEFAULT_QUOTE;

  let quote = options.default;
  
  router.get('/', (req, res) => {
    res.send(quote);
  });
  
  return {
    getRouter: () => { return router; },
    genQuote: (quoteOptions) => {
      let type = quoteOptions.count || 'famous';
      let count = quoteOptions.count || 1;
      count = (count > 100) ? 100 : count;
      let url = `https://andruxnet-random-famous-quotes.p.mashape.com/?cat=${type}&count=${count}`;
      unirest.get(url)
      .header('X-Mashape-Key', key)
      .header('Content-Type', 'application/x-www-form-urlencoded')
      .header('Accept', 'application/json')
      .end((res) => {
        if (res.body && res.body.quote) {
          quote = res.body;
        }
      });
    },
    getGenerator: function(refresh, quoteOptions) {
      refresh = refresh || 1000 * 60 * 60 * 24;
      return setInterval((function() {
        this.genQuote({
          type: quoteOptions.type,
          count: quoteOptions.count
        });
      }, refresh);
    }
  };
}

module.exports = quoteMaker;

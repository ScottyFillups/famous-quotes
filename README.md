# famous-quotes

An Express wrapper for the "Random Famous Quotes" API found on Mashape. 
Link: https://market.mashape.com/andruxnet/random-famous-quotes

The response body of the `GET` request to the endpoint will be an object with a `quote` and `author` property. See examples for more details.

You may use this for a "quote of the day", at least, that's what I use it for. Or perhaps you could have a button that generates a random quote when clicked. Keep in mind that there are likely rate limits for the API; this wrapper does not limit the number of requests you can make, so please do your own research if you plan to do something request intensive.

## Usage

#### getQuoteMaker(key, options)
- `key` _(String)_ The secret key provided by Mashape
- `options` _(Object)_
  - `default` _(Object)_ The default quote to be shown, if the request fails, for some reason. Below are the relevant properties.
    - `quote`
    - `author`
- **Returns** _(Object)_ Returns a quoteMaker object (see below).

#### quoteMaker.getRouter()
- **Returns** _(Router)_ Returns an Express router to be `use`d for middleware.

#### quoteMaker.genQuote(options)
- `options` _(Object)_ Properties below.
  - `type` _(String)_ The quote type. There are two options, the default, `'famous'`, and `'movies'`.
  - `count` _Integer_ The number of quotes to be returned, with a maximum limit of 100. Defaults to 1.

#### quoteMaker.getGenerator(refresh, options) 
- `refresh` _(Integer)_ The amount of delay, in milliseconds, between each `.genQuote()` call. Defaults to one day.
- `options` _(Object)_ The options object to be passed to `.genQuote()`.
- **Returns** _(setInterval ID)_ Returns the setInterval ID of the interval that will call `.genQuote()` every X milliseconds;

## Example
```js
const DEFAULT_QUOTE = {
  quote: 'Don\'t let schooling interfere with your education.',
  author: 'Mark Twain'
};
const MASHAPE_KEY = 'SOME_KEY';
const express = require('express');
const quoteMaker = require('famous-quotes')(MASHAPE_KEY, DEFAULT_QUOTE);
const app = express();

// Regenerate a new quote every hour
quoteMaker.getGenerator(1000 * 60 * 60);
app.use('myendpoint', quoteMaker.getRouter());
```

And on client-side... (I'm using Angular, and omitted some steps; consider it an exercise for the reader to fill in the steps ;))
```js
$http({
  method: 'GET',
  url: 'myendpoint'
}).then(function(res) {
  console.log('Quote: ' + res.data.quote);
  console.log('Author: ' + res.data.author);
}, function(err) {
  console.log(err);
});
```

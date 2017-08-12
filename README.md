# famous-quotes

An Express wrapper for the "Random Famous Quotes" API found on Mashape. Link: https://market.mashape.com/andruxnet/random-famous-quotes

## Usage

#### quoteMaker(key, options)
- `key` _(String)_: The secret key provided by Mashape
- `options` _(Object)_:
  - `default` _(Object)_: The default quote to be shown, if the request fails, for some reason. Below are the relevant properties.
    - `quote`
    - `author`

Returns an object with the following methods:

`.getRouter()`: Returns an Express router.
`.genQuote(options)`: Generates a new random quote.
- `options` _(Object)_: Properties below.
  - `type` _(String)_: The quote type. There are two options, the default, `'famous'`, and `'movies'`.
  - `count` _Integer_: The number of quotes to be returned, with a maximum limit of 100. Defaults to 1.
`.getGenerator(refresh, options)`: Returns the setInterval ID of an interval that will call `genQuote()` X milliseconds;
- `refresh` _(Integer)_: The amount of delay, in milliseconds, between each `.genQuote()` call.
- `options` _(Object)_: The options object to be passed to `.genQuote()`.

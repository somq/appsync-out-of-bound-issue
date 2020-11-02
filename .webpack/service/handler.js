(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let getFollowing = (() => {
  var _ref = _asyncToGenerator(function* (handle, consumerKey, consumerSecret) {
    const url = 'friends/list';

    const oauth2 = new _oauth.OAuth2(consumerKey, consumerSecret, 'https://api.twitter.com/', null, 'oauth2/token', null);

    return new Promise(function (resolve) {
      oauth2.getOAuthAccessToken('', {
        grant_type: 'client_credentials'
      }, function (error, accessToken) {
        resolve(accessToken);
      });
    }).then(function (accessToken) {
      const client = new Twitter({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        bearer_token: accessToken
      });

      const params = { screen_name: handle };

      return client.get(url, params).then(function (followers) {
        // console.log(followers);
        const followerArray = [];

        for (let i = 0; i < followers.users.length; i += 1) {
          followerArray.push(followers.users[i].screen_name);
        }

        // console.log(followerArray);

        return followerArray;
      }).catch(function (error) {
        throw error;
      });
    }).catch(function (error) {
      return error;
    });
  });

  return function getFollowing(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

let getRawTweets = (() => {
  var _ref2 = _asyncToGenerator(function* (handle, consumerKey, consumerSecret) {
    const url = 'statuses/user_timeline';

    const oauth2 = new _oauth.OAuth2(consumerKey, consumerSecret, 'https://api.twitter.com/', null, 'oauth2/token', null);

    return new Promise(function (resolve) {
      oauth2.getOAuthAccessToken('', {
        grant_type: 'client_credentials'
      }, function (error, accessToken) {
        resolve(accessToken);
      });
    }).then(function (accessToken) {
      const client = new Twitter({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        bearer_token: accessToken
      });

      const params = { screen_name: handle };

      return client.get(url, params).then(function (tweets) {
        const tweetArray = [];
        let listOfTweets;

        return getFollowing(handle, consumerKey, consumerSecret).then(function (data) {
          if (tweets.length >= 1) {
            listOfTweets = {
              name: tweets[0].user.name,
              handle: tweets[0].user.screen_name,
              location: tweets[0].user.location,
              description: tweets[0].user.description,
              followers_count: tweets[0].user.followers_count,
              friends_count: tweets[0].user.friends_count,
              favourites_count: tweets[0].user.favourites_count,
              following: data
            };
          }

          for (let i = 0; i < tweets.length; i += 1) {
            const t = {
              tweet: tweets[i].text,
              tweet_id: tweets[i].id_str,
              favorited: tweets[i].favorited,
              retweeted: tweets[i].retweeted,
              retweet_count: tweets[i].retweet_count
            };

            tweetArray.push(t);
          }

          tweetArray.sort(function (a, b) {
            return b.retweet_count - a.retweet_count;
          });

          const [topTweet] = tweetArray;
          listOfTweets.topTweet = topTweet;
          listOfTweets.tweets = { items: tweetArray };

          return listOfTweets;
        });
      }).catch(function (error) {
        throw error;
      });
    }).catch(function (error) {
      return error;
    });
  });

  return function getRawTweets(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
})();

let postTweet = (() => {
  var _ref3 = _asyncToGenerator(function* (tweet, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret) {
    const url = 'statuses/update';

    const client = new Twitter({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token_key: accessTokenKey,
      access_token_secret: accessTokenSecret
    });

    const params = { status: tweet };

    return client.post(url, params).then(function (response) {
      console.log(response);

      return {
        tweet: response.text,
        tweet_id: response.id_str,
        retweeted: false,
        retweet_count: 0,
        favorited: false
      };
    }).catch(function (error) {
      throw error;
    });
  });

  return function postTweet(_x7, _x8, _x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
})();

let deleteTweet = (() => {
  var _ref4 = _asyncToGenerator(function* (tweetId, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret) {
    const url = 'statuses/destroy';

    const client = new Twitter({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token_key: accessTokenKey,
      access_token_secret: accessTokenSecret
    });

    const params = { id: tweetId };

    return client.post(url, params).then(function (tweet) {
      console.log(tweet);

      return {
        tweet: tweet.text,
        tweet_id: tweet.id_str,
        retweeted: tweet.retweeted,
        retweet_count: tweet.retweet_count,
        favorited: tweet.favorited
      };
    }).catch(function (error) {
      throw error;
    });
  });

  return function deleteTweet(_x12, _x13, _x14, _x15, _x16) {
    return _ref4.apply(this, arguments);
  };
})();

let reTweet = (() => {
  var _ref5 = _asyncToGenerator(function* (tweetId, consumerKey, consumerSecret, accessTokenKey, accessTokenSecret) {
    const url = 'statuses/retweet';

    const client = new Twitter({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token_key: accessTokenKey,
      access_token_secret: accessTokenSecret
    });

    const params = { id: tweetId };

    return client.post(url, params).then(function (tweet) {
      console.log(tweet);

      return {
        tweet: tweet.text,
        tweet_id: tweet.id_str,
        retweeted: tweet.retweeted,
        retweet_count: tweet.retweet_count,
        favorited: tweet.favorited
      };
    }).catch(function (error) {
      throw error;
    });
  });

  return function reTweet(_x17, _x18, _x19, _x20, _x21) {
    return _ref5.apply(this, arguments);
  };
})();

__webpack_require__(1);

var _oauth = __webpack_require__(2);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Twitter = __webpack_require__(3);

exports.graphqlHandler = (event, context, callback) => {
  console.log('Received event {}', JSON.stringify(event, 3));

  const consumerKey = event.arguments.consumer_key;
  const consumerSecret = event.arguments.consumer_secret;

  console.log('Got an Invoke Request.');
  switch (event.field) {
    case 'getUserInfo':
      {
        getRawTweets(event.arguments.handle, consumerKey, consumerSecret).then(result => {
          callback(null, result);
        });

        break;
      }
    case 'meInfo':
      {
        getRawTweets(event.handle, consumerKey, consumerSecret).then(result => {
          callback(null, result);
        });

        break;
      }
    case 'createTweet':
      {
        postTweet(event.arguments.tweet, consumerKey, consumerSecret, event.arguments.access_token_key, event.arguments.access_token_secret).then(result => {
          callback(null, result);
        });

        break;
      }
    case 'deleteTweet':
      {
        deleteTweet(event.arguments.tweet_id, consumerKey, consumerSecret, event.arguments.access_token_key, event.arguments.access_token_secret).then(result => {
          callback(null, result);
        });

        break;
      }
    case 'reTweet':
      {
        reTweet(event.arguments.tweet_id, consumerKey, consumerSecret, event.arguments.access_token_key, event.arguments.access_token_secret).then(result => {
          callback(null, result);
        });

        break;
      }
    default:
      {
        callback(`Unknown field, unable to resolve ${event.field}`, null);
        break;
      }
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("oauth");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("twitter");

/***/ })
/******/ ])));
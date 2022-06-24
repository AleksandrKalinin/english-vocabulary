var request = require('request');
var async = require('async');
var fs = require('fs');

var API_key = "AIzaSyANIs2WwcSlrkJhfkw2z-q0Zumsu80CR28";
var channelID = "UCOtnu-KKoAbN47IuYMeDPOg";
var maxResults = 12;
var url =
  "https://www.googleapis.com/youtube/v3/search?key=" +
  API_key +
  "&channelId=" +
  "UCOtnu-KKoAbN47IuYMeDPOg" +
  "&part=snippet,id&order=date&maxResults=" +
  maxResults;
var parseJson;
fs.readFile('music.json',function(err,content){
  if(err) throw err;
  parseJson = JSON.parse(content);
}) 
async.map(parseJson , function(item, callback) {
  request(url,
           function(error, response, body) {
             if(!error) {
               //having checked there was no error, you pass 
               //the result of `JSON.parse(body)` as the second
               //callback argument so async.map can collect the
               //results
               callback(null, JSON.parse(body));
             }
           });
}, function(err, results) {
  //results is an array of all of the completed requests (note
  //that the order may be different than when you kicked off
  //the async.map function)
  console.log('success' ,results);
  //console.log(err, results);
});

/*
var fs = require('fs');
fs.readFile('music.json',function(err,content){
  if(err) throw err;
  var parseJson = JSON.parse(content);
  for (i=0; i <parseJson.length ; i++){
  }
  fs.writeFile('music-new.json',JSON.stringify(parseJson),function(err){
    if(err) throw err;
  }) 
})
*/
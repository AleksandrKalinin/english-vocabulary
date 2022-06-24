var fs = require('fs');
fs.readFile('tests.json',function(err,content){
  if(err) throw err;
  var parseJson = JSON.parse(content);
  console.log(parseJson.length);
  //console.log(parseJson);
  var id = 0;
  //const inputStringDate = new Date().toUTCString();
  //const imageUrl = "https://loremflickr.com/320/240";
  //const inputDate = new Date();
  var sentenceArray = [];
  var variantArray = [];
  var newArray = [];
  var rightAnswers = [3, 2, 3, 4, 1, 3, 2, 2, 1, 2, 2, 1, 3, 4, 3, 2, 3, 1, 3, 1];
  for (i=0; i < parseJson.length ; i+=4){
    var param = i;
    var temp = [];
    var tempSentence;
    var object = {};
    console.log(parseJson[param]['sentence']);
    temp.push(parseJson[param+1]['sentence']);
    temp.push(parseJson[param+2]['sentence']);
    temp.push(parseJson[param+3]['sentence']);
    tempSentence = parseJson[param]['sentence'];
    sentenceArray.push(parseJson[param]['sentence']);
    object['sentence'] = tempSentence;
    object['varians'] = temp; 
    //object['correct_answer'] = rightAnswers[i];
    newArray.push(object);
    //parseJson[i]['category'] = "trees";
   //var value = parseJson[i]['name'];
   //parseJson[i]['image'] = imageUrl + '/' + value;
   //id++;
   //console.log(temp);
  }
  for (var i = 0; i < newArray.length; i++) {
    newArray[i]['correct_answer'] = (rightAnswers[i] - 1);
  }
  //console.log(variantArray);
  //console.log(sentenceArray);

  fs.writeFile('test-array.json',JSON.stringify(newArray),function(err){
    if(err) throw err;
  })  
})
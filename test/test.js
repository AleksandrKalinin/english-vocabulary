var fs = require('fs');
fs.readFile('WORDS-working.json',function(err,content){
  if(err) throw err;
  var parseJson = JSON.parse(content);
  console.log(parseJson.length);
  //console.log(parseJson);
  var id = 0;
  const inputStringDate = new Date().toUTCString();
  const imageUrl = "https://loremflickr.com/320/240";
  //const inputDate = new Date();
  for (i=0; i < parseJson.length ; i++){
    //parseJson[i]['category'] = "trees";
   var value = parseJson[i]['name'];
   parseJson[i]['image'] = imageUrl + '/' + value;
   id++;
   //console.log(parseJson);
  }

  fs.writeFile('working.json',JSON.stringify(parseJson),function(err){
    if(err) throw err;
  }) 
})
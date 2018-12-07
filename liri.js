require("dotenv").config();

var axios = require("axios");

var spotify = new Spotify(keys.spotify);

var commandArray = process.argv;
var commandString = "";
var commandQuery = "The Sign";

if (process.argv.length > 4){
    setString();
}else{
    commandQuery = process.argv[3];
}

function setString(){
    var separator = false;
    for (var i; i< commandArray.length; i++){
        if(commandArray[i] != "," && separator){
            commandString = commandString + commandArray[i];
        }else{
            separator = true;
        }
        if (separator){
            commandQuery = commandQuery + commandArray[i];
        }
    }
}

function movieThis(){
// Then run a request with axios to the OMDB API with the movie specified
axios.get("http://www.omdbapi.com/?t="+ commandQuery + "&y=&plot=short&apikey=trilogy").then(
    function(response) {
      console.log(response.data.Title);
    }
  );
}

function spotifyThis(){
    spotify.search({ type: 'track', query: commandQuery }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      console.log(data); 
      });
      
}


function doWhatItSays(){

}

function concertThis(){

}



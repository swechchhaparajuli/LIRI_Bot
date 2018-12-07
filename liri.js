require("dotenv").config();

var axios = require("axios");
var argvArray = process.argv;

//var spotify = new Spotify(keys.spotify);

var commandArray = process.argv;
var commandString = "";
var commandQuery = "The Sign";

if (argvArray.length < 4){
    setString();
    assignAction();
}else{
    var temp = argvArray.splice(3);
    commandQuery = temp.join(" ");
    commandString = argvArray[2];
    assignAction();
}

function setString(){
    if(argvArray[2] == "movie-this" && argvArray.length == 3){
        console.log("");
        console.log("If you haven't watched 'Mr. Nobody' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    }
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

function assignAction(){
    if(commandString == "do-what-it-says"){
        doWhatItSays();
    } else if(commandString == "concert-this"){
        concertThis();
    } else if(commandString == "spotify-this-song"){
        spotifyThis();
    } else if(commandString == "movie-this"){
        movieThis();
    }
}

function movieThis(){
// Then run a request with axios to the OMDB API with the movie specified
axios.get("http://www.omdbapi.com/?t="+ commandQuery + "&y=&plot=short&apikey=trilogy").then(
    function(response) {
        console.log("");
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Rated);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
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

    axios.get("https://rest.bandsintown.com/artists/" + commandQuery + "/events?app_id=codingbootcamp").then(
    
    function(response) {
        console.log("Shawn Mendes Concerts:");
        console.log("");
        for(var i = 0; i<5; i++){
            console.log(i+1);
            console.log(response.data[i].venue.name);
            console.log(response.data[i].venue.city + " " + response.data[i].venue.region + ", " + response.data[i].venue.country);
            console.log(response.data[i].datetime);
            console.log("");
        }
    }
  );

}


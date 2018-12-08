
//references--------
require("dotenv").config();
var Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var argvArray = process.argv;
var spotify = new Spotify(keys.spotify);
var printingArray = [];
var divider = "\n--------------------------------------------------------------\n"
//--------

if (argvArray.length == 2){
    
    printingArray.push("INSTRUCTIONS: ", "", "node liri.js concert-this <artist/band reference here>\n       prints out 5 different concerts related to the artist on console" 
    ,""
    ,"node liri.js movie-this <Movie Reference here> \n     prints out movie information " 
    ,""
    ,"node liri.js movie-this \n     prints out message: \n          If you haven't watched 'Mr. Nobody,' then you should:http://www.imdb.com/title/tt0485947/ \n      It's on Netflix!"
    ,""
    ,"node liri.js spotify-this-song <artist/song reference here>" 
    ,""
    , "node liri.js do-what-it-says\n     takes in text from random.txt and executes what it says"
    ,"");

    printingArray.forEach(element => {console.log(element);
        });
   // printingArray = [" "];
   addToFile();
}

var commandString = "";
var commandQuery = "The Sign";

if (argvArray.length < 4){
    if(argvArray[2] == "movie-this" && argvArray.length == 3){
        printingArray.push( ""
        ,"\nIf you haven't watched 'Mr. Nobody' then you should: http://www.imdb.com/title/tt0485947/"
        ,"\nIt's on Netflix!");
        printingArray.forEach(element => {console.log(element);
        });
    //printingArray = [" "];
    addToFile();
        
    }
    if (argvArray[2] == "do-what-it-says"){
        doWhatItSays();
    }
}else{
    var temp = argvArray.splice(3);
    commandQuery = temp.join(" ");
    commandString = argvArray[2];
    assignAction();
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
        printingArray.push("",
      "\nTitle: " + response.data.Title,
      "\nRelease Year: " + response.data.Year,
      "\nIMDB Rating: " + response.data.imdbRating,
      "\nRotten Tomatoes Rating: " + response.data.Rated,
      "\nCountry: " + response.data.Country,
      "\nLanguage: " + response.data.Language,
      "\nPlot: " + response.data.Plot,
      "\nActors: " + response.data.Actors);

      printingArray.forEach(element => {console.log(element);
      });
    //printingArray = [" "];
    addToFile();
      
    }
  );
}

function spotifyThis(){
    spotify.search({ type: 'track', query: commandQuery }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       // console.log(data.tracks.items[0]);
       var artists = [];
       for(var i = 0; i< data.tracks.items[0].artists.length; i++){
           artists.push(data.tracks.items[0].artists[i].name);
       }
       printingArray.push(
        "\nArtists: " + artists.join(" , "),
        "\nSong Name: " + data.tracks.items[0].name,
        "\nAlbum: " + data.tracks.items[0].album.name,
        "\nLink: " + data.tracks.items[0].external_urls.spotify);

        printingArray.forEach(element => {console.log(element);
        });
      //printingArray = [" "];
      addToFile();
      });   
}

function doWhatItSays(){

    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        var temp = data.split(",");
        argvArray.push(temp[0]);
        argvArray.push(temp[1]);
        commandString = temp[0];
        commandQuery = temp[1];
        printingArray.push(commandQuery);
        assignAction();
    });
}

function concertThis(){
    axios.get("https://rest.bandsintown.com/artists/" + commandQuery + "/events?app_id=codingbootcamp").then(
    
    function(response) {
        printingArray.push(
        commandQuery + " Concerts:"
        ,"");
        for(var i = 0; i<5; i++){
            if (response.data[i] != undefined){
                printingArray.push(i+1,
                "\n"+response.data[i].venue.name,
                "\n"+response.data[i].venue.city + " " + response.data[i].venue.region + ", " + response.data[i].venue.country,
                "\n"+fixDate(response.data[i].datetime),
                "\n");
            }else{
               printingArray.push("\nNo more than " + i + " concerts for "+ commandQuery);
               printingArray.forEach(element => {console.log(element);
               });
            // printingArray = [" "];
            addToFile();
                return;
            }

        }
        printingArray.forEach(element => {console.log(element);
        });
      //printingArray = [" "];
      addToFile();
    }
  );
}

function fixDate(t){
    var tArray = t.split("T");
    return moment(tArray[0]).format("MM/DD/YYYY");
}

function addToFile(){

    fs.appendFile("log.txt", printingArray + divider, function(err) {
        if (err) throw err;
    });
   // printingArray = [" "];
}
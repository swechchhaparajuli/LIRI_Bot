
*Disclaimer: While editing the random.txt file, if using "concert-this" be sure to not have any empty spaces in the string with query name*

**External Packages and APIs Used**

    Axios used for:
        Bands In Town API
            To grab concert dates and information
        OMDB API
            For movie information

    Spotify
        for spotify feature-- to obtain song/album information and a link to the song

    Moment
        To convert dates from Bands In Town API to desired layout

    DotEnv
        Loading spotify-secret key and user information from .env file


**GIF or Video**

**Screenshots**
    ![concert-this](/images/concert.png)
    Format: ![concert-this](url)
    ![movie-this](/images/movie.png)
    Format: ![movie-this](url)
    ![movie-this:no-movie](/images/movie2.png)
    Format: ![movie-this:no-movie](url)
    ![spotify-this-song](/images/spotify.png)
    Format: ![spotify-this-song](url)
    ![do-what-it-says](/images/do-what-it-says.png)
    Format: ![do-what-it-says](url)


**User flow**

    Possible entries:

        node liri.js concert-this <artist/band reference here>
                prints out 5 different concerts related to the artist on console
                    * Name of the venue
                    * Venue location
                    * Date of the Event

        node liri.js movie-this <Movie Reference here>
                prints out movie information 
                    * Title of the movie.
                    *Year the movie came out.
                    * IMDB Rating of the movie.
                    * Rotten Tomatoes Rating of the movie.
                    * Country where the movie was produced.
                    * Language of the movie.
                    * Plot of the movie.
                    * Actors in the movie.


        node liri.js movie-this
                prints out message:
                    *If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
                    *It's on Netflix!

        node liri.js spotify-this-song <artist/song reference here>
                    * Artist(s)
                    * The song's name
                    * A preview link of the song from Spotify
                    * The album that the song is from

        node liri.js do-what-it-says
                takes in text from random.txt and executes what it says



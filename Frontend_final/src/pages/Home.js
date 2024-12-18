import React, { useState, useEffect, useRef } from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import HorizontalScollCard from "../components/HorizontalScollCard";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import useFetch from "../hooks/useFetch";
import "intro.js/introjs.css";
import { useMicrophone } from "../context/MicrophoneContext";
import "./Home.css";
import "intro.js/introjs.css";
import { Steps } from "intro.js-react";

// Define dynamic genre mappings and filter lists
const movieGenreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const tvGenreMap = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
};

const cinemas = [
  "Regal Cinemas",
  "AMC Theaters",
  "Cinemark",
  "Alamo Drafthouse",
  "Vue Cinemas",
  "Cineworld",
  "Odeon",
  "ArcLight Cinemas",
  "Landmark Theatres",
  "Showcase Cinemas",
  "Cinepolis",
  "Picturehouse",
  "Studio Movie Grill",
  "Carmike Cinemas",
  "IMAX Theater",
  "Magic Johnson Theaters",
  "Cineplex",
  "Hollywood Theater",
  "Rio Cinema",
  "The Electric Cinema",
  "Theater 1",
  "Theater 2",
  "Plaza Cinema",
  "Palladium Cinemas",
  "Regal Union Square",
  "Capitol Cinema",
  "Grand Cinema",
  "Downtown Theater",
  "Cinemagic",
  "Eclipse Cinemas",
  "Skyline Cinemas",
];

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "San Francisco",
  "Dallas",
  "Miami",
  "Atlanta",
  "Boston",
  "Seattle",
  "Washington D.C.",
  "Denver",
  "Houston",
  "Philadelphia",
  "Phoenix",
  "San Diego",
  "Austin",
  "Dallas",
  "Detroit",
  "Las Vegas",
  "Portland",
  "Minneapolis",
  "Cleveland",
  "Charlotte",
  "Indianapolis",
  "Tampa",
  "Nashville",
  "Orlando",
  "Sacramento",
  "Kansas City",
  "Salt Lake City",
  "Denver",
  "Austin",
];

const Home = () => {
  // States for selected filters
  const [cinema, setCinema] = useState("");
  const [genre, setGenre] = useState("");
  const [city, setCity] = useState("");
  const [mediaType, setMediaType] = useState("movie"); // Can switch between 'movie' or 'tv'

  const { transcript } = useMicrophone(); // Microphone context hook
  const lastTranscriptRef = useRef("");

  useEffect(() => {
    if (transcript && transcript !== lastTranscriptRef.current) {
      lastTranscriptRef.current = transcript;
      const command = transcript.toLowerCase().trim();

      //console.log("Command received:", command);

      // Handle Cinema Selection
      cinemas.forEach((cinemaName) => {
        const cinemaCommand = `cinema ${cinemaName.toLowerCase()}`;
        if (command.includes(cinemaCommand)) {
          setCinema(cinemaName);
          //console.log(`Cinema selected: ${cinemaName}`);
        }
      });

      // Handle City Selection
      cities.forEach((cityName) => {
        const cityCommand = `city ${cityName.toLowerCase()}`;
        if (command.includes(cityCommand)) {
          setCity(cityName);
          //console.log(`City selected: ${cityName}`);
        }
      });

      // Handle Genre Selection
      const genreMap = mediaType === "movie" ? movieGenreMap : tvGenreMap;
      Object.entries(genreMap).forEach(([genreId, genreName]) => {
        const genreCommand = `genre ${genreName.toLowerCase()}`;
        if (command.includes(genreCommand)) {
          setGenre(genreId);
          //console.log(`Genre selected: ${genreName}`);
        }
      });
    }
  }, [transcript, mediaType, cinemas, cities]);

  // Fetched data
  const trendingData = useSelector((state) => state.movieoData.bannerData);
  const { data: nowPlayingData } = useFetch("/movie/now_playing");
  const { data: topRatedData } = useFetch("/movie/top_rated");
  const { data: popularTvShowData } = useFetch("/tv/popular");
  const { data: onTheAirShowData } = useFetch("/tv/on_the_air");

  //console.log(nowPlayingData);

  // States to store filtered data
  const [filteredNowPlaying, setFilteredNowPlaying] = useState(nowPlayingData);
  const [filteredTopRated, setFilteredTopRated] = useState(topRatedData);
  const [filteredPopularTvShows, setFilteredPopularTvShows] =
    useState(popularTvShowData);
  const [filteredOnTheAirShows, setFilteredOnTheAirShows] =
    useState(onTheAirShowData);

  // Apply filters to data when filters change
  // Filter by Cinema
  useEffect(() => {
    const applyCinemaFilter = (data) => {
      return cinema ? data.filter((item) => item.cinema === cinema) : data;
    };

    setFilteredNowPlaying(applyCinemaFilter(nowPlayingData));
    setFilteredTopRated(applyCinemaFilter(topRatedData));
    setFilteredPopularTvShows(applyCinemaFilter(popularTvShowData));
    setFilteredOnTheAirShows(applyCinemaFilter(onTheAirShowData));
  }, [
    cinema,
    nowPlayingData,
    topRatedData,
    popularTvShowData,
    onTheAirShowData,
  ]);

  // Filter by Genre
  useEffect(() => {
    const applyGenreFilter = (data) => {
      return genre
        ? data.filter((item) => item.genre_ids.includes(Number(genre)))
        : data;
    };

    setFilteredNowPlaying(applyGenreFilter(nowPlayingData));
    setFilteredTopRated(applyGenreFilter(topRatedData));
    setFilteredPopularTvShows(applyGenreFilter(popularTvShowData));
    setFilteredOnTheAirShows(applyGenreFilter(onTheAirShowData));
  }, [
    genre,
    nowPlayingData,
    topRatedData,
    popularTvShowData,
    onTheAirShowData,
  ]);

  // Filter by City
  useEffect(() => {
    const applyCityFilter = (data) => {
      //console.log("city", city, "data", data);
      return city ? data.filter((item) => item.city === city) : data;
    };

    setFilteredNowPlaying(applyCityFilter(nowPlayingData));
    setFilteredTopRated(applyCityFilter(topRatedData));
    setFilteredPopularTvShows(applyCityFilter(popularTvShowData));
    setFilteredOnTheAirShows(applyCityFilter(onTheAirShowData));
  }, [city, nowPlayingData, topRatedData, popularTvShowData, onTheAirShowData]);

  // Handle filter changes
  const handleCinemaChange = (e) => setCinema(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  // const handleMediaTypeChange = (e) => setMediaType(e.target.value);

  const steps = [
    {
      element: ".cinema-selector",
      intro:
        "Select a cinema to filter the movies and TV shows available in that cinema.",
    },
    {
      element: ".genre-selector",
      intro:
        "Choose a genre to filter the content by its type, such as Action, Comedy, Drama, etc.",
    },
    {
      element: ".city-selector",
      intro: "Pick a city to filter the movies and TV shows based on location.",
    },
    {
      element: ".nowplaying",
      intro:
        "Here you can see the movies that are currently playing in cinemas.",
    },
    {
      element: ".toprated",
      intro: "Explore the top-rated movies across different genres.",
    },
    {
      element: ".popular",
      intro: "Check out the most popular TV shows right now.",
    },
    {
      element: ".onair",
      intro: "Find out which TV shows are currently on air.",
    },
  ];
  const [tourIsOpen, setTourIsOpen] = useState(true);
  useEffect(() => {
    if (tourIsOpen) {
      // Automatically open the tour
      setTourIsOpen(true);
    }
  }, []);

  return (
    <div>
      <Steps
        enabled={tourIsOpen}
        steps={steps}
        initialStep={0}
        onExit={() => setTourIsOpen(false)}
      />
      <BannerHome />
      {/* Filter Section */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "20px", padding: "0 20px" }}
      >
        <Grid item className="cinema-selector">
          <FormControl
            variant="outlined"
            style={{
              minWidth: 180,
              backgroundColor: "#333",
              borderRadius: "5px",
            }}
          >
            <InputLabel style={{ color: "#fff" }}>Cinema</InputLabel>
            <Select
              value={cinema}
              onChange={handleCinemaChange}
              label="Cinema"
              style={{
                color: "#fff",
                backgroundColor: "#444",
                border: "1px solid #666",
              }}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cinemas.map((cinema, index) => (
                <MenuItem key={index} value={cinema}>
                  {cinema}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item className="genre-selector">
          <FormControl
            variant="outlined"
            style={{
              minWidth: 180,
              backgroundColor: "#333",
              borderRadius: "5px",
            }}
          >
            <InputLabel style={{ color: "#fff" }}>Genre</InputLabel>
            <Select
              value={genre}
              onChange={handleGenreChange}
              label="Genre"
              style={{
                color: "#fff",
                backgroundColor: "#444",
                border: "1px solid #666",
              }}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {mediaType === "movie"
                ? Object.entries(movieGenreMap).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))
                : Object.entries(tvGenreMap).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item className="city-selector">
          <FormControl
            variant="outlined"
            style={{
              minWidth: 180,
              backgroundColor: "#333",
              borderRadius: "5px",
            }}
          >
            <InputLabel style={{ color: "#fff" }}>City</InputLabel>
            <Select
              value={city}
              onChange={handleCityChange}
              label="City"
              style={{
                color: "#fff",
                backgroundColor: "#444",
                border: "1px solid #666",
              }}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cities.map((city, index) => (
                <MenuItem key={index} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <div className="nowplaying">
        <HorizontalScollCard
          data={filteredNowPlaying}
          heading={"Now Playing"}
          media_type={"movie"}
          className="now-playing-card"
        />
      </div>
      <div className="toprated">
        <HorizontalScollCard
          data={filteredTopRated}
          heading={"Top Rated Movies"}
          media_type={"movie"}
          className="top-rated-movies-card"
        />
      </div>
      <div className="popular">
        <HorizontalScollCard
          data={filteredPopularTvShows}
          heading={"Popular TV Show"}
          media_type={"tv"}
          className="popular-tv-show-card"
        />
      </div>
      <div className="onair">
        <HorizontalScollCard
          data={filteredOnTheAirShows}
          heading={"On The Air"}
          media_type={"tv"}
          className="on-the-air-card"
        />
      </div>
    </div>
  );
};

export default Home;

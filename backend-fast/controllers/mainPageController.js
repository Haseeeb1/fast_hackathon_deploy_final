const axios = require("axios");

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
exports.getTrendingData = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/trending/all/week`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
      }
    );

    const data = response.data.results.map((item) => {
      // Get genre names from movie or tv genre map
      const genreNames = item.genre_ids.map((genreId) => {
        if (item.media_type === "movie") {
          return movieGenreMap[genreId] || "Unknown Genre";
        } else if (item.media_type === "tv") {
          return tvGenreMap[genreId] || "Unknown Genre";
        }
        return "Unknown Genre";
      });

      // Add random city and cinema to the response
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomCinema = cinemas[Math.floor(Math.random() * cinemas.length)];

      return {
        ...item,
        genre_names: genreNames,
        city: randomCity,
        cinema: randomCinema,
      };
    });

    res.status(200).json({ results: data });
  } catch (error) {
    console.error("Error fetching trending data:", error.message);
    res.status(500).json({ message: "Failed to fetch trending data." });
  }
};

// exports.getTrendingData = async (req, res) => {
//   try {
//     const response = await axios.get(
//       `${process.env.TMDB_BASE_URL}/trending/all/week`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
//         },
//       }
//     );
//     console.log("response", response.data);
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error("Error fetching trending data:", error.message);
//     res.status(500).json({ message: "Failed to fetch trending data." });
//   }
// };

exports.getConfiguration = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/configuration`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching configuration data:", error.message);
    res.status(500).json({ message: "Failed to fetch configuration data." });
  }
};

exports.getNowPlayingMovies = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/movie/now_playing`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
      }
    );

    // Map genre IDs and add random city and cinema to each movie
    const data = response.data.results.map((item) => {
      const genreNames = item.genre_ids.map(
        (genreId) => movieGenreMap[genreId] || "Unknown Genre"
      );
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomCinema = cinemas[Math.floor(Math.random() * cinemas.length)];

      return {
        ...item,
        genre_names: genreNames,
        city: randomCity,
        cinema: randomCinema,
      };
    });

    res.status(200).json({ results: data });
  } catch (error) {
    console.error("Error fetching now playing movies:", error.message);
    res.status(500).json({ message: "Failed to fetch now playing movies." });
  }
};

// Fetch top-rated movies
exports.getTopRatedMovies = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/movie/top_rated`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
      }
    );

    // Map genre IDs and add random city and cinema to each movie
    const data = response.data.results.map((item) => {
      const genreNames = item.genre_ids.map(
        (genreId) => movieGenreMap[genreId] || "Unknown Genre"
      );
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomCinema = cinemas[Math.floor(Math.random() * cinemas.length)];

      return {
        ...item,
        genre_names: genreNames,
        city: randomCity,
        cinema: randomCinema,
      };
    });

    res.status(200).json({ results: data });
  } catch (error) {
    console.error("Error fetching top-rated movies:", error.message);
    res.status(500).json({ message: "Failed to fetch top-rated movies." });
  }
};

// Fetch popular TV shows
exports.getPopularTVShows = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/tv/popular`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
      }
    );

    // Map genre IDs and add random city and cinema to each TV show
    const data = response.data.results.map((item) => {
      const genreNames = item.genre_ids.map(
        (genreId) => tvGenreMap[genreId] || "Unknown Genre"
      );
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomCinema = cinemas[Math.floor(Math.random() * cinemas.length)];

      return {
        ...item,
        genre_names: genreNames,
        city: randomCity,
        cinema: randomCinema,
      };
    });

    res.status(200).json({ results: data });
  } catch (error) {
    console.error("Error fetching popular TV shows:", error.message);
    res.status(500).json({ message: "Failed to fetch popular TV shows." });
  }
};

// Fetch TV shows on the air
exports.getOnTheAirTVShows = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/tv/on_the_air`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
      }
    );

    // Map genre IDs and add random city and cinema to each TV show
    const data = response.data.results.map((item) => {
      const genreNames = item.genre_ids.map(
        (genreId) => tvGenreMap[genreId] || "Unknown Genre"
      );
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomCinema = cinemas[Math.floor(Math.random() * cinemas.length)];

      return {
        ...item,
        genre_names: genreNames,
        city: randomCity,
        cinema: randomCinema,
      };
    });

    res.status(200).json({ results: data });
  } catch (error) {
    console.error("Error fetching TV shows on the air:", error.message);
    res.status(500).json({ message: "Failed to fetch TV shows on the air." });
  }
};

exports.discoverMedia = async (req, res) => {
  const { explore } = req.params; // e.g., 'movie' or 'tv'
  const { page } = req.query; // page number

  if (!explore) {
    return res.status(400).json({ message: "Explore parameter is required." });
  }

  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/discover/${explore}`,
      {
        params: { page: page || 1 }, // Defaults to page 1 if not provided
        headers: {
          Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error fetching ${explore} discovery data:`, error.message);
    res.status(500).json({ message: "Failed to fetch discovery data." });
  }
};

exports.getMediaDetails = async (req, res) => {
  const { explore, id } = req.params; // 'movie' or 'tv' and the media ID

  if (!explore || !id) {
    return res
      .status(400)
      .json({ message: "Explore and ID parameters are required" });
  }

  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/${explore}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error fetching ${explore} details:`, error.message);
    res.status(500).json({ message: "Failed to fetch media details." });
  }
};

// Fetch media credits (cast and crew)
exports.getMediaCredits = async (req, res) => {
  const { explore, id } = req.params;

  if (!explore || !id) {
    return res
      .status(400)
      .json({ message: "Explore and ID parameters are required" });
  }

  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/${explore}/${id}/credits`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error fetching ${explore} credits:`, error.message);
    res.status(500).json({ message: "Failed to fetch media credits." });
  }
};

// Fetch similar media
exports.getSimilarMedia = async (req, res) => {
  const { explore, id } = req.params;

  if (!explore || !id) {
    return res
      .status(400)
      .json({ message: "Explore and ID parameters are required" });
  }

  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/${explore}/${id}/similar`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error fetching similar ${explore}:`, error.message);
    res.status(500).json({ message: "Failed to fetch similar media." });
  }
};

// Fetch recommendations
exports.getRecommendations = async (req, res) => {
  const { explore, id } = req.params;

  if (!explore || !id) {
    return res
      .status(400)
      .json({ message: "Explore and ID parameters are required" });
  }

  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/${explore}/${id}/recommendations`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      `Error fetching recommendations for ${explore}:`,
      error.message
    );
    res.status(500).json({ message: "Failed to fetch recommendations." });
  }
};

let cachedResults = []; // Temporary storage to append the results

// Function to handle the search request
// exports.searchData = async (req, res) => {
//   console.log("hdllo");
//   const { query, page } = req.query; // Extract query and page parameters from the request
//   console.log("hello");
//   console.log(query, page);

//   try {
//     // Call TMDB search/multi API
//     const response = await axios.get(
//       `${process.env.TMDB_BASE_URL}/search/multi`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`, // Or use an API key if needed
//         },
//         params: {
//           query: query, // The search query
//           page: page, // Page number for pagination
//         },
//       }
//     );

//     // Append the new results to the cachedResults array
//     cachedResults = [...cachedResults, ...response.data.results];

//     // Log the response data (mimicking console.log(response.data))
//     console.log(response.data);

//     // Send a success response back to the frontend
//     res
//       .status(200)
//       .json({ message: "Data fetched and appended successfully." });
//   } catch (error) {
//     console.error("Error fetching search data:", error.message);
//     res.status(500).json({ message: "Failed to fetch search data from TMDb." });
//   }
// };

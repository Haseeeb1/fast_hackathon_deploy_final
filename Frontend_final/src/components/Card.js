import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const Card = ({ data, trending, index, media_type }) => {
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  console.log(media_type);
  const mediaType = data.media_type ?? media_type;
  console.log(data);
  return (
    // <Link to={"/"+mediaType+"/"+data.id} className='w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all'>

    //     {
    //         data?.poster_path ? (
    //             <img
    //                 src={imageURL+data?.poster_path}
    //             />
    //         ) : (
    //             <div className='bg-neutral-800 h-full w-full flex justify-center items-center'>
    //                 No image found
    //             </div>
    //         )

    //     }

    //     <div className='absolute top-4 '>
    //         {
    //             trending && (
    //                 <div className='py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden'>
    //                     #{index} Trending
    //                 </div>
    //             )
    //         }
    //     </div>

    //     <div className='absolute bottom-0 h-16 backdrop-blur-3xl w-full  bg-black/60 p-2'>
    //         <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>{data?.title || data?.name}</h2>
    //         <div className='text-sm text-neutral-400 flex justify-between items-center'>
    //             <p>{ moment(data.release_date).format("MMMM Do YYYY") }</p>
    //             <p className='bg-black px-1 rounded-full text-xs text-white'>Rating :{Number(data.vote_average).toFixed(1)}</p>
    //         </div>
    //     </div>
    // </Link>
    <Link
      to={`/${mediaType}/${data.id}`}
      className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all duration-300"
    >
      {data?.poster_path ? (
        <img
          src={imageURL + data?.poster_path}
          className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-50"
          alt={data?.name || "Image"}
        />
      ) : (
        <div className="bg-neutral-800 h-full w-full flex justify-center items-center">
          No image found
        </div>
      )}

      <div className="absolute top-4">
        {trending && (
          <div className="py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden">
            #{index} Trending
          </div>
        )}
      </div>

      <div
        className="absolute bottom-0 h-full w-full bg-black/70 text-white p-4 flex flex-col justify-end 
        opacity-0 hover:opacity-100 transition-opacity duration-300"
      >
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
          {data?.title || data?.name}
        </h2>
        <div className="text-sm text-neutral-300 flex justify-between items-center mt-2">
          <p>
            {moment(data.first_air_date || data.release_date).format(
              "MMMM Do YYYY"
            )}
          </p>
          <p className="bg-black px-2 py-1 rounded-full text-xs text-white">
            Rating: {Number(data.vote_average).toFixed(1)}
          </p>
          <p className="bg-black px-2 py-1 rounded-full text-xs text-white">
            Country: {data.origin_country}
          </p>
        </div>
        <p className="mt-2 text-sm">
          {data.overview?.split(" ").slice(0, 20).join(" ")}
          {data.overview?.split(" ").length > 20 && "..."}
        </p>
      </div>
    </Link>
  );
};

export default Card;

// import React from 'react';
// import { useSelector } from 'react-redux';
// import moment from 'moment';
// import { Link } from 'react-router-dom';
// import './Card.css';

// const Card = ({ data, trending, index, media_type }) => {
//   const imageURL = useSelector((state) => state.movieoData.imageURL);
//   const mediaType = data.media_type ?? media_type;

//   console.log(data)
//   return (
//     <Link to={`/${mediaType}/${data.id}`} className="card">
//       <div className="card-content">
//         {data?.poster_path ? (
//           <img src={imageURL + data?.poster_path} alt={data?.title || data?.name} className="card-image" />
//         ) : (
//           <div className="no-image">No image found</div>
//         )}
//         {trending && (
//           <div className="trending-badge">
//             #{index} Trending
//           </div>
//         )}
//         <div className="card-info">
//           <h2 className="card-title">{data?.title || data?.name}</h2>
//           <div className="card-details">
//             <p className="release-date">{moment(data.release_date).format("MMMM Do YYYY")}</p>
//             <p className="rating">Rating: {Number(data.vote_average).toFixed(1)}</p>
//           </div>
//           <p className="overview">{data.overview}</p>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default Card;

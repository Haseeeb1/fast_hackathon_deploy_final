import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Footer = () => {
  const [footerLinks, setFooterLinks] = useState([]);

  // Fetch footer links on component mount
  useEffect(() => {
    const fetchFooterLinks = async () => {
      try {
        const response = await axios.get("http://192.168.137.1:5000/api/footer"); // Make sure your API endpoint matches this path
        console.log(response.data);
        setFooterLinks(response.data); // Store the footer links in state
      } catch (error) {
        console.error("Error fetching footer links", error);
      }
    };

    fetchFooterLinks();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="p-5 bg-black bg-opacity-50 rounded-lg py-12 m-5">
        <div className="flex flex-col">
          <h3 className="text-3xl leading-10 text-white w-full text-center font-bold">
            Sign up to our newsletter to receive updates
          </h3>
          <div className="text-base text-gray-500 w-full md:w-3/4 self-center text-center lg:pt-4">
            Welcome to Bookme by Syntax Studios. Subscribe to our newsletter to
            get latest updates on movies.
          </div>
        </div>
        <div className="flex flex-row justify-center space-x-3 py-4">
          <input
            className="bg-white rounded-lg text-sm px-2 sm:px-3 md:px-8 py-3"
            type="text"
            placeholder="email@email.com"
          />
          <input
            className="font-bold rounded-lg text-black bg-white hover:bg-white-400 cursor-pointer px-3 py-1 md:px-6 md:py-3 focus:outline-none"
            type="submit"
            value="SUBSCRIBE"
          />
        </div>
        <div className="font-bold text-white content-center">
          <ul className="flex flex-row space-x-6 py-4 justify-center">
            {/* Dynamically render footer links */}
            {footerLinks.map((link) => (
              <li key={link._id}>
                {" "}
                {/* Unique key should be used from the DB */}
                <Link
                  to={link.to_link}
                  className="hover:underline cursor-pointer"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;

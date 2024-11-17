import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/logo_new1.svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../contants/navigation";
import { useMicrophone } from "../context/MicrophoneContext"; // Import the microphone context

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();
  const { transcript } = useMicrophone(); // Access the microphone transcript
  const lastTranscriptRef = useRef("");

  useEffect(() => {
    if (searchInput) {
      //console.log("Search input is ", searchInput);
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput, navigate]);

  useEffect(() => {
    if (transcript && transcript !== lastTranscriptRef.current) {
      lastTranscriptRef.current = transcript;
      const command = transcript.toLowerCase().trim();

      //console.log(command);

      navigation.forEach((nav) => {
        const labelLower = nav.label.toLowerCase();
        const navCommands = [
          `go to ${labelLower}`,
          `navigate to ${labelLower}`,
          `open ${labelLower}`,
        ];
        const searchCommands = [`search`];

        // Navigate to the corresponding link
        if (navCommands.some((cmd) => command.includes(cmd))) {
          navigate(nav.href);
        }
        // Handle search commands
        else if (searchCommands.some((cmd) => command.startsWith(cmd))) {
          // Extract the search term
          const searchQuery = command.replace("search", "").trim();
          //console.log("Search Query:", searchQuery);

          // Update the search input state
          setSearchInput(searchQuery);
        }
      });
    }
  }, [transcript, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40">
      <div className="container mx-auto px-3 flex items-center h-full">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={120} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-5">
          {navigation.map((nav, index) => (
            <div key={`nav-${index}`}>
              <NavLink
                to={nav.href}
                className={({ isActive }) =>
                  `px-2 hover:text-neutral-100 ${
                    isActive && "text-neutral-100"
                  }`
                }
              >
                {nav.label}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-2xl text-white">
              <IoSearchOutline />
            </button>
          </form>
          {/* <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all'>
                        <img
                            src={userIcon}
                            width='w-ful h-full'
                        />
                    </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;

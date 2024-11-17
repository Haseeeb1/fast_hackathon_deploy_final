import React, { useRef, useEffect, useCallback } from "react";
import Card from "./Card";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { useMicrophone } from "../context/MicrophoneContext";

const HorizontalScollCard = ({
  data = [],
  heading,
  trending,
  media_type,
  sectionId, // Add this prop to identify each section uniquely
}) => {
  const { transcript } = useMicrophone();
  const contaierRef = useRef();
  const lastTranscriptRef = useRef("");

  const handleNext = useCallback(() => {
    contaierRef.current.scrollLeft += 300;
  }, []);

  const handlePrevious = useCallback(() => {
    contaierRef.current.scrollLeft -= 300;
  }, []);

  useEffect(() => {
    if (transcript && transcript !== lastTranscriptRef.current) {
      lastTranscriptRef.current = transcript;
      const command = transcript.toLowerCase().trim();

      //console.log(command);

      // Create section-specific voice commands
      const nextCommands = [
        `next ${heading?.toLowerCase()}`,
        `scroll right ${heading?.toLowerCase()}`,
        `show more ${heading?.toLowerCase()}`,
      ];

      const previousCommands = [
        `previous ${heading?.toLowerCase()}`,
        `scroll left ${heading?.toLowerCase()}`,
        `back ${heading?.toLowerCase()}`,
      ];

      // Check if any of the next commands match
      if (nextCommands.some((cmd) => command.includes(cmd))) {
        handleNext();
      }
      // Check if any of the previous commands match
      else if (previousCommands.some((cmd) => command.includes(cmd))) {
        handlePrevious();
      }
    }
  }, [transcript, heading, handleNext, handlePrevious]);

  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">
        {heading}
      </h2>

      <div className="relative">
        <div
          ref={contaierRef}
          className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrolbar-none"
        >
          {data.map((data, index) => (
            <Card
              key={`${heading}-${data.id || index}`}
              data={data}
              index={index + 1}
              media_type={media_type}
            />
          ))}
        </div>

        <div className="absolute top-0 hidden lg:flex justify-between w-full h-full items-center">
          <button
            onClick={handlePrevious}
            className="bg-white p-1 text-black rounded-full -ml-2 z-10"
            aria-label={`Previous ${heading}`}
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white p-1 text-black rounded-full -mr-2 z-10"
            aria-label={`Next ${heading}`}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScollCard;

import React from "react";
import CredentialListCard from "./CredentialListCard";
import { BiBriefcase } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineEye, AiOutlineCalendar } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import HighlightsCard from "./HighlightsCard";
import img1 from "../../../Images/movie.jpeg";
import img2 from "../../../Images/music.jpeg";
import img3 from "../../../Images/technology.jpeg";

const Credentials = (props) => {
  return (
    <div className={props.className}>
      <div className="mt-4">
        <div className="border-bottom d-flex">
          <p className="fw-bold mb-1">Credentials & Highlights</p>
          <div className="text-secondary ms-auto">Most recent</div>
        </div>
        <ul className="m-0 py-2 p-0 ">
          <CredentialListCard
            value="Junior Software Engineer"
            period="2022-present"
          >
            <BiBriefcase className="icons d-inline" />
          </CredentialListCard>

          <CredentialListCard
            value="BSc in Cybernetics, University of Kent"
            period="Graduated 2021"
          >
            <FaGraduationCap className="icons d-inline" />
          </CredentialListCard>

          <CredentialListCard value="Lives in Abuja" period="2000-present">
            <IoLocationOutline className="icons d-inline" />
          </CredentialListCard>

          <CredentialListCard value="0 content views" period="0 this month">
            <AiOutlineEye className="icons d-inline" />
          </CredentialListCard>

          <CredentialListCard value="Active in 0 Spaces" period="">
            <HiOutlineUsers className="icons d-inline" />
          </CredentialListCard>

          <CredentialListCard value="Joined September 2022" period="">
            <AiOutlineCalendar className="icons d-inline" />
          </CredentialListCard>
        </ul>
      </div>

      <div className="mt-4">
        <div className="border-bottom d-flex">
          <p className="fw-bold mb-1">Spaces</p>
        </div>
        <ul className="m-0 p-0">
            <HighlightsCard title="Movies" position="Admin" item="126 items" src={img1} />

            <HighlightsCard title="Cooking" position="Contributor" item="33 items" src={img2} />

            <HighlightsCard title="Music" position="Contributor" item="5 items" src={img3} />

            <HighlightsCard title="Fine art" position="Contributor" item="4 items" src={img1} />
        </ul>
      </div>

      <div className="mt-4">
        <div className="border-bottom d-flex">
          <p className="fw-bold mb-1">Spaces</p>
        </div>
        <ul className="m-0 p-0">
            <HighlightsCard title="Technology" position="Admin" item="126 items" src={img1} />

            <HighlightsCard title="Couples" position="Contributor" item="33 items" src={img2} />

            <HighlightsCard title="Emergency" position="Contributor" item="5 items" src={img3} />

            <HighlightsCard title="Tinubu" position="Contributor" item="4 items" src={img1} />
        </ul>
      </div>
    </div>
  );
};

export default Credentials;

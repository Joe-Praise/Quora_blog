import React from "react";
import Interest from "./Interest";
import movie from "../../../Images/movie.jpeg";
import cooking from "../../../Images/food.jpeg";
import music from "../../../Images/food.jpeg";
import art from "../../../Images/fine_art.jpeg";
import technology from "../../../Images/technology.jpeg";
import couples from "../../../Images/couples.jpeg";
import hindus from "../../../Images/hindus.jpeg";
import parenting from "../../../Images/parenting.jpeg";
import CreateSpace from "./CreateSpace";
import LoginBottomLinks from "../Login/LoginBottomLinks";

const SideBar = () => {
  return (
    <section className={`d-none d-xl-block sticky--position sideBar--width`}>
      <div className="border-bottom pb-5 ">
        <CreateSpace value="Create Space" />
        <Interest
          src={movie}
          className="thumbnail rounded "
          alt="Movies thumbnail"
          value="Movies"
        />

        <Interest
          src={cooking}
          className="thumbnail rounded "
          alt="Cooking thumbnail"
          value="Cooking"
        />

        <Interest
          src={music}
          className="thumbnail rounded "
          alt="Music thumbnail"
          value="Music"
        />

        <Interest
          src={art}
          className="thumbnail rounded "
          alt="Fine art thumbnail"
          value="Fineart"
        />

        <Interest
          src={technology}
          className="thumbnail rounded "
          alt="Technology thumbnail"
          value="Technology"
        />

        <Interest
          src={couples}
          className="thumbnail rounded "
          alt="Couples thumbnail"
          value="Couples"
        />

        <Interest
          src={parenting}
          className="thumbnail rounded "
          alt="emergency thumbnail"
          value="Emergency"
        />
        <Interest
          src={hindus}
          className="thumbnail rounded "
          alt="Tinubu thumbnail"
          value="Tinubu"
        />
      </div>
      <ul className="row m-0 p-0">
        <LoginBottomLinks
          text="About ."
          className="font-tiny text-secondary"
          listClass="col-auto text-start m-0 p-0"
        />
        <LoginBottomLinks
          text="Careers ."
          className="font-tiny text-secondary"
          listClass="col text-start m-0 p-0"
        />
        <LoginBottomLinks
          text="Terms ."
          className="font-tiny text-secondary"
          listClass="col-auto text-start m-0 p-0"
        />
        <LoginBottomLinks
          text="Privacy ."
          className="font-tiny text-secondary"
          listClass="col text-start m-0 p-0"
        />
        <LoginBottomLinks
          text="Acceptable Use ."
          className="font-tiny text-secondary"
          listClass="col-auto text-start m-0 p-0"
        />
        <LoginBottomLinks
          text="Businesses ."
          className="font-tiny text-secondary"
          listClass="col-auto text-start m-0 p-0"
        />
        <LoginBottomLinks
          text="Press ."
          className="font-tiny text-secondary"
          listClass="col-auto text-start m-0 p-0"
        />
        <LoginBottomLinks
          text="Your Ad Choices ."
          className="font-tiny text-secondary"
          listClass="col-auto text-start m-0 p-0"
        />
      </ul>
    </section>
  );
};

export default SideBar;

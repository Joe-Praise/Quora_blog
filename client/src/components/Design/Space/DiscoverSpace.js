import DisplaySpaceCard from "./DisplaySpaceCard";
import movie from "../../../Images/movie.jpeg";
import cooking from "../../../Images/food.jpeg";
import music from "../../../Images/food.jpeg";
import art from "../../../Images/fine_art.jpeg";
import technology from "../../../Images/technology.jpeg";
import couples from "../../../Images/couples.jpeg";
import hindus from "../../../Images/hindus.jpeg";
import parenting from "../../../Images/parenting.jpeg";

const spaceInfo = [
  {
    _id: "space1",
    title: "Movies",
    info: "Space dedicated to movies, actors, celebrities and entertainment world",
    img: movie,
    to: "Movies",
  },
  {
    _id: "space2",
    title: "Cooking",
    info: "Space dedicated tPost and share secrets of impeccable cooking from chefs and amateurso movies, actors, celebrities and entertainment worldPost and share secrets of impeccable cooking from chefs and amateurs",
    img: cooking,
    to: "Cooking",
  },
  {
    _id: "space3",
    title: "Music",
    info: "A space for artists, producers & other music pros to network/share experiences.",
    img: music,
    to: "Music",
  },
  {
    _id: "space4",
    title: "Fine Art",
    info: "A safe, no-judgement place to share drawings, paintings, poems, songs, anything",
    img: art,
    to: "Fineart",
  },
  {
    _id: "space5",
    title: "Technology",
    info: "Smartest tech discover the latest and the greatest technology.",
    img: technology,
    to: "Technology",
  },
  {
    _id: "space6",
    title: "Couples",
    info: "A safe, no-judgement place to share relationsip advice, healthy marriage tips, pictures, anything",
    img: couples,
    to: "Couples",
  },
  {
    _id: "space7",
    title: "Emergency",
    info: "A space for medical advice, pro medical tips, survival tips to know, anything.",
    img: parenting,
    to: "Emergency",
  },
  {
    _id: "space8",
    title: "Tinubu",
    info: "A space focused on the new leadership of Nigeria, views, honest opinions and predictions of what's to come.",
    img: hindus,
    to: "Tinubu",
  },
];

function DiscoverSpace() {
  return (
    <>
      <div className="mt-5 ms-2 fw-bold">
        <h1 className="default-h1 fs-3">Discover Space</h1>
        <p className="mt-3">Spaces you might like</p>
      </div>
      <div className="spaceCardContainer">
        {spaceInfo.map((category) => {
          return (
            <DisplaySpaceCard
              key={category._id}
              to={category.to}
              img={category.img}
              title={category.title}
              info={category.info}
            />
          );
        })}
      </div>
    </>
  );
}

export default DiscoverSpace;

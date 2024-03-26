import SpaceDisplayBtn from "./SpaceDisplayBtn";
import { AiOutlineCompass } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import DiscoverSpace from "./DiscoverSpace";

function SpaceDisplay() {
  let img = `url(${"//qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.tribes.tribe_welcome_banner_full.png-26-64d500fd69494b66.png"})`;    

  return (
    <div className="spaceContentWrapper">
      <div style={{backgroundImage: img}} className="bg-white p-4 py-3 rounded spaceBgImg">
        <div className="welcomebanner">
          <h1 className="">Welcome to Spaces!</h1>
          <p>Follow Spaces to explore your interests on Quora.</p>
          <div className="d-flex ">
            <SpaceDisplayBtn value="Create">
              <IoAddCircleOutline className="fs-5" />
            </SpaceDisplayBtn>
            <SpaceDisplayBtn value="Discover">
              <AiOutlineCompass className="fs-5" />
            </SpaceDisplayBtn>
          </div>
        </div>
      </div>
      <div>
        <DiscoverSpace/>
      </div>
    </div>
  );
}

export default SpaceDisplay;

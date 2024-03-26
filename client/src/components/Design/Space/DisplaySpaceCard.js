import Card from "../../UI/Card";
import { Link } from "react-router-dom";

function DisplaySpaceCard(props) {
  return (
    <Card className="spaceCard shadow-sm">
      <Link className="text-decoration-none h-100" to={props.to}>
        <figure className="fig">
          <img src={props.img} alt="card avi" className="spaceCardImg" />
        </figure>
        <figcaption className="spaceCardFigcaption">
          <img src={props.img} alt="card avi" className="absoluteSpaceCardImg" />
          <div className="px-3 text-center">
            <span className="fw-bolder d-block mb-1">{props.title}</span>
            <span className="space-text--ellipsis">{props.info}</span>
          </div>
        </figcaption>
      </Link>
    </Card>
  );
}

export default DisplaySpaceCard;

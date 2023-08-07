import { Link } from "react-router-dom";

const Recipe = ({ id, image, name, type, onDelete, onEdit }) => {
  return (
    <div className="recipe">
      <div className="icons">
        <span onClick={onDelete}>
          <i class="fa-solid fa-trash"></i>
        </span>
        <span onClick={onEdit}>
          <i class="fa-regular fa-pen-to-square"></i>
        </span>
      </div>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <h5>Cuisine Type : {type}</h5>
      <h5>
        Ingredients :<Link to={`recipe/${id}`}>See more</Link>{" "}
      </h5>
      <h5>
        Instructions :<Link to={`recipe/${id}`}>See more</Link>{" "}
      </h5>
    </div>
  );
};

export default Recipe;

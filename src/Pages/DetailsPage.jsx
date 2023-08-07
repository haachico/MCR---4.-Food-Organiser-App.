import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { RecipesContext } from "..";
const DetailsPage = () => {
  const { recipes } = useContext(RecipesContext);

  const { id } = useParams();

  const selectedRecipe = recipes.find((recipe) => recipe.id == id);

  return (
    <div>
      <Link to="/" className="back--btn">
        Back
      </Link>
      <h1>{selectedRecipe?.name}</h1>
      <div className="details--div">
        <div className="details--img">
          <img src={selectedRecipe?.image} alt={selectedRecipe?.name} />
        </div>
        <div className="details--info">
          <p>
            <strong>Cuisine : </strong> {selectedRecipe?.type}
          </p>
          <p>
            <strong>Ingredients : </strong> {selectedRecipe?.ingredients}
          </p>
          <p>
            <strong>Instructions : </strong>{" "}
          </p>
          <p>{selectedRecipe?.instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;

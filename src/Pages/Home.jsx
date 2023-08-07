import { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { RecipesContext } from "..";
import Modal from "../Modal";
import Recipe from "../Components/Recipe";

//Edit details process when we want to use only one modal for adding new recipes and editing existing recipes

//initialise a editRecipe, setEditRecipe to empty values and isEditMode, setIsEditMode to false

//When we click on the edit icon, the handleEditRecipe function should execute. In this function, we set the recipe that we want to edit in to the newly created/initialised editRecipe by using the setEditRecipe amd we also set the isEditMode to true and isModalOpen to true

//So the modal opens, the exiting one. In the input fields of Modal in the code, we conditioanlly set the value---If isEditMode is true, we set the editRecipe values , if not we set the recipe values. Similarly, we also conditionally render the buttoon. If isEdit mode is true, redner "Save" butto, if not true, render "Add" button---having the functin handleAddRecipe

// In handleAddRecipe,, we conditionally update / add the recipe.  If isEditMode is true, we map through the recipes array and check which recipe match the edit recipe with id and replace that recipe with the editRecipe, and than re-inialise all values of editRecipe to empty strings, and set the isEditMode and isModalOpen both to false. AND if isEditMode is false, we as usual apply the adding recipe logic.

//Also note that in handleChange function (which is for updating the input values), there also we conditioanlly update the input values. If  isEditMode is true, we update the input values of editRecipe with setEditRecipe, if isEdit is false, we update the recipe with setRecipe ofcouse--to update the correspond input values in Modal.

const Home = () => {
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipe, setRecipe] = useState({
    image: "",
    name: "",
    ingredients: "",
    instructions: "",
    type: ""
  });

  const [editRecipe, setEditRecipe] = useState({
    image: "",
    name: "",
    ingredients: "",
    instructions: "",
    type: ""
  });
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

    if (isEditMode) {
      setEditRecipe({
        image: "",
        name: "",
        ingredients: "",
        instructions: "",
        type: ""
      });
    } else {
      setRecipe({
        image: "",
        name: "",
        ingredients: "",
        instructions: "",
        type: ""
      });
    }
  };

  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");

    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditMode) {
      setEditRecipe((prevState) => {
        return {
          ...prevState,
          [name]: value
        };
      });
    } else {
      setRecipe((prevState) => {
        return {
          ...prevState,
          [name]: value
        };
      });
    }
  };

  const handleAddRecipe = () => {
    if (isEditMode) {
      const updatedRecipes = recipes.map((recipe) =>
        recipe.id === editRecipe.id ? editRecipe : recipe
      );
      setRecipes(updatedRecipes);
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
      setIsEditMode(false);
      setIsModalOpen(false);
      setEditRecipe({
        image: "",
        name: "",
        ingredients: "",
        instructions: "",
        type: ""
      });
    } else {
      const newRecipe = {
        id: uuid(),
        image: recipe.image,
        name: recipe.name,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        type: recipe.type
      };
      const updatedRecipes = [...recipes, newRecipe];
      setRecipes(updatedRecipes);
      // localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

      setIsModalOpen(false);
    }
  };

  const handleSelectFilter = (e) => {
    setSelectedFilter(e.target.value);
  };

  const searchedRecipe =
    selectedFilter === "NAME"
      ? recipes.filter((recipe) =>
          recipe.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : selectedFilter === "INGREDIENTS"
      ? recipes.filter((recipe) =>
          recipe.ingredients.toLowerCase().includes(searchText.toLowerCase())
        )
      : selectedFilter === "CUISINE"
      ? recipes.filter((recipe) =>
          recipe.type.toLowerCase().includes(searchText.toLowerCase())
        )
      : recipes;

  const handleDelete = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  const handleEditRecipe = (id) => {
    const recipeToUpdate = recipes.find((recipe) => recipe.id == id);
    setEditRecipe(recipeToUpdate);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  console.log(editRecipe);
  return (
    <div className="home--div">
      <div className="search--field">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search--input"
          placeholder="Select a filter and then search."
        />
        <fieldset>
          <legend>Filter</legend>
          <label>
            Name
            <input
              type="radio"
              value="NAME"
              checked={selectedFilter === "NAME"}
              onChange={(e) => handleSelectFilter(e)}
            />
          </label>
          <label>
            Ingredients
            <input
              type="radio"
              value="INGREDIENTS"
              checked={selectedFilter === "INGREDIENTS"}
              onChange={(e) => handleSelectFilter(e)}
            />
          </label>
          <label>
            Cuisne
            <input
              type="radio"
              value="CUISINE"
              checked={selectedFilter === "CUISINE"}
              onChange={(e) => handleSelectFilter(e)}
            />
          </label>
        </fieldset>
      </div>

      <div>
        <button onClick={openModal}>Add a recipe + </button>
        <div className="list">
          {searchedRecipe?.map(
            ({ id, image, name, ingredients, instructions, type }) => (
              <Recipe
                id={id}
                image={image}
                name={name}
                ingredients={ingredients}
                instructions={instructions}
                type={type}
                key={id}
                onDelete={() => handleDelete(id)}
                onEdit={() => handleEditRecipe(id)}
              />
            )
          )}
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="modal">
            <h3>{isEditMode ? "Edit Recipe." : "Add a recipe."}</h3>
            <label htmlFor="image">Add an image : </label>
            <input
              type="text"
              id="image"
              name="image"
              value={isEditMode ? editRecipe.image : recipe.image}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="name">Recipe name : </label>
            <input
              type="text"
              id="name"
              name="name"
              value={isEditMode ? editRecipe.name : recipe.name}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="ingredients">Ingredients : </label>
            <textarea
              type="text"
              id="ingredients"
              name="ingredients"
              value={isEditMode ? editRecipe.ingredients : recipe.ingredients}
              onChange={(e) => handleChange(e)}
              rows={3}
              style={{
                resize: "vertical",
                minHeight: "50px"
              }}
            />
            <label htmlFor="instructions">Cooking instructions : </label>
            <textarea
              type="text"
              id="instructions"
              name="instructions"
              value={isEditMode ? editRecipe.instructions : recipe.instructions}
              onChange={(e) => handleChange(e)}
              rows={3}
              style={{
                resize: "vertical",
                minHeight: "100px"
              }}
            />
            <label htmlFor="type">Cuisine type : </label>
            <input
              type="text"
              id="type"
              name="type"
              value={isEditMode ? editRecipe.type : recipe.type}
              onChange={(e) => handleChange(e)}
            />
            <button onClick={handleAddRecipe}>
              {isEditMode ? "Save" : "Add"}
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Home;

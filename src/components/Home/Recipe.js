import './Recipe.css';
import { useState } from 'react';

function Recipe(props) {
  const recipe = props.recipe;

  const [missingIngredientsOpened, setMissingIngredientsOpened] = useState();

  function toggleMissingIngredientsPanel() {
    setMissingIngredientsOpened((prevValue) => !prevValue);
  }

  return (
    <div className="recipe">
      <div className="recipe-image-container">
        <img className="recipe-image" src={recipe.image} alt="" />
      </div>
      <div className="recipe-title">{recipe.title}</div>
      <div
        style={
          recipe.missedIngredientCount > 0
            ? { color: 'red' }
            : { color: 'gray' }
        }
        className="recipe-missing-ingredients"
        onMouseOver={toggleMissingIngredientsPanel}
        onMouseOut={toggleMissingIngredientsPanel}
      >
        <i className="fa-solid fa-caret-up"></i> Missing Ingredients:{' '}
        {recipe.missedIngredientCount} <i className="fa-solid fa-caret-up"></i>
      </div>
      <div
        className={`missing-ingredients-panel ${
          missingIngredientsOpened && 'opened'
        }`}
      >
        <div className="missing-ingredients-title">Missing:</div>
        {recipe.missedIngredients.map((ingredient, index) => {
          return (
            <>
              {ingredient.name}
              {index !== recipe.missedIngredientCount - 1 && ', '}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Recipe;

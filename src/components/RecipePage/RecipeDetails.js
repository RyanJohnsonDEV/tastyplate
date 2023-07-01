import './RecipeDetails.css';
import { useEffect, useState } from 'react';

function RecipeDetails(props) {
  const info = props.recipeInfo;
  const instructions = props.recipeInstructions;
  const [ingredients, setIngredients] = useState();
  const [instructionsList, setInstructionsList] = useState();
  const [otherSteps, setOtherSteps] = useState();
  let extraSteps = [];

  function setIngredientsList() {
    setIngredients(
      info.extendedIngredients.map((ingredient, index) => {
        return (
          <li key={index}>
            <strong>{ingredient.measures.us.amount}x</strong>{' '}
            {ingredient.measures.us.unitLong !== '' &&
              `${ingredient.measures.us.unitLong} of`}{' '}
            {ingredient.name}
          </li>
        );
      })
    );

    instructions.forEach((recipePiece) => {
      if (recipePiece.name === '') {
        setInstructionsList(
          recipePiece.steps.map((step) => {
            return (
              <li className="recipe-details-step" key={step.number}>
                <strong>Step {step.number}</strong>
                <br />
                {step.step}
              </li>
            );
          })
        );
      } else {
        extraSteps.push({ name: recipePiece.name, steps: recipePiece.steps });
      }
    });

    setOtherSteps(
      extraSteps.length > 0 &&
        extraSteps.map((extraStep) => {
          const steps = extraStep.steps.map((step) => {
            return (
              <li className="recipe-details-step" key={step.number}>
                <strong>Step {step.number}</strong> <br />
                {step.step}
              </li>
            );
          });

          return (
            <>
              <h1 className="recipe-details-subtitle">{extraStep.name}</h1>
              <p>{steps}</p>
            </>
          );
        })
    );
  }

  useEffect(() => {
    if (info && instructions) {
      setIngredientsList();
    }
  }, [info, instructions]);

  return (
    <div className="recipe-details">
      {info && instructions && (
        <div className="recipe-content">
          <h1 className="recipe-details-title">Ingredients:</h1>
          <div className="recipe-details-separator"></div>
          <div className="recipe-details-list">
            <ul className="recipe-ingredients-list">{ingredients}</ul>
          </div>
          <h1 className="recipe-details-title">Instructions:</h1>
          <div className="recipe-details-separator"></div>
          <div className="recipe-details-list">
            <ul>
              {instructionsList}
              {otherSteps}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;

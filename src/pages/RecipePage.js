import { useEffect, useState } from 'react';
import RecipeHeader from '../components/RecipePage/RecipeHeader';
import Header from '../components/UI/Header';
import { useParams } from 'react-router-dom';
import Footer from '../components/UI/Footer';
import RecipeDetails from '../components/RecipePage/RecipeDetails';
import './RecipePage.css';

function RecipePage() {
  const params = useParams();
  // const recipeData = DUMMY_RECIPE;
  const [recipeData, setRecipeData] = useState();
  const [recipeInstructions, setRecipeInstructions] = useState();

  async function getRecipeInstructions() {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/analyzedInstructions?apiKey=58c37f6baf3242039421a0ecd7adcce9`,
      {
        headers: { authorization: '58c37f6baf3242039421a0ecd7adcce9' },
      }
    );
    const data = await response.json();
    setRecipeInstructions(data);
  }

  async function getRecipeData() {
    getRecipeInstructions();
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?includeNutrition=false&apiKey=58c37f6baf3242039421a0ecd7adcce9`,
      {
        headers: { authorization: '58c37f6baf3242039421a0ecd7adcce9' },
      }
    );
    const data = await response.json();
    setRecipeData(data);
  }

  useEffect(() => {
    getRecipeData();
  }, []);

  return (
    <div className="recipe-details-wrapper">
      <Header />
      <RecipeHeader recipeInfo={recipeData} />
      <RecipeDetails
        recipeInfo={recipeData}
        recipeInstructions={recipeInstructions}
        className="recipe-details"
      />
      <Footer className="footer" />
    </div>
  );
}

export default RecipePage;

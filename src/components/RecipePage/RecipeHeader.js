import Loading from '../UI/Loading';
import './RecipeHeader.css';

function RecipeHeader(props) {
  const recipe = props.recipeInfo;

  function convertToHours(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return `${
      rhours > 0 ? rhours + ` hour${rhours === 1 ? '' : 's'} and` : ''
    } ${rminutes} minute${rminutes === 1 ? '' : 's'}.`;
  }

  return (
    <div className="recipe-header-container">
      {recipe ? (
        <div className="recipe-header-content">
          <h1 className="recipe-header-title">{recipe.title}</h1>
          <h3>{recipe.servings} Servings</h3>
          <h3>Ready in {convertToHours(recipe.readyInMinutes)}</h3>
          <img
            className="recipe-header-image"
            src={recipe.image}
            alt={recipe.title}
          />
          <a href={recipe.sourceUrl} target="_blank" rel="noreferrer">
            Source: {recipe.sourceName}
          </a>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default RecipeHeader;

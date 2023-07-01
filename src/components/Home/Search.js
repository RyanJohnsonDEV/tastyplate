import { useRef, useState, useEffect } from 'react';
import './Search.css';
import Recipe from './Recipe';
import { Link } from 'react-router-dom';
import Loading from '../UI/Loading';

function Search() {
  const inputRef = useRef();
  const [recipes, setRecipes] = useState();
  const [recipeData, setRecipeData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function getRecipes(searchString) {
    setIsLoading(true);
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchString}&apiKey=58c37f6baf3242039421a0ecd7adcce9&number=10`,
      {
        headers: { authorization: '58c37f6baf3242039421a0ecd7adcce9' },
      }
    );
    const data = await response.json();
    setRecipes(data);
    window.localStorage.setItem('recipes', JSON.stringify(data));
    setIsLoading(false);
  }

  function mapRecipeData(data) {
    setRecipeData(
      data.map((recipe) => {
        return (
          <Link to={`/${recipe.id}`}>
            <Recipe recipe={recipe} key={recipe.id} />
          </Link>
        );
      })
    );
  }

  useEffect(() => {
    if (recipes) {
      mapRecipeData(recipes);
      console.log(recipes);
    }
  }, [recipes]);

  useEffect(() => {
    if (window.localStorage.getItem('recipes')) {
      setRecipes(JSON.parse(window.localStorage.getItem('recipes')));
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setRecipes([]);
    let searchTerms;
    let searchString = '';

    if (inputRef.current.value.toLowerCase().includes(', ')) {
      searchTerms = inputRef.current.value.toLowerCase().split(', ');
    } else if (inputRef.current.value.toLowerCase().includes(',')) {
      searchTerms = inputRef.current.value.toLowerCase().split(',');
    } else {
      searchTerms = inputRef.current.value.toLowerCase().split(' ');
    }
    searchTerms.forEach((string, index) => {
      if (index !== 0) {
        searchString += `,+${string}`;
      } else {
        searchString += `${string}`;
      }
    });

    if (searchString.includes(' ')) {
      searchTerms = searchString.split(' ');
      searchString = '';
      searchTerms.forEach((string, index) => {
        if (index !== 0) {
          searchString += `%20${string}`;
        } else {
          searchString += `${string}`;
        }
      });
    }

    getRecipes(searchString);
  }

  return (
    <>
      <div className="search-box">
        <label htmlFor="Enter Ingredients" className="search-label">
          Enter Ingredients
        </label>

        <form className="search-form" onSubmit={handleSubmit}>
          <input type="text" className="search-input" ref={inputRef} />
          <button className="search-form-button">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </form>
        <div className="how-it-works">
          <label htmlFor="How it works">
            <i className="fa-solid fa-circle-info"></i> How does it work?
          </label>
          <div className="info-popup">
            <p>
              Enter your ingredients in the search bar separated by commas,
              click search, and get instant recipe suggestions based your
              ingredients. Cook with ease using what you already have!
            </p>
          </div>
        </div>
        {isLoading && <Loading />}
      </div>
      {recipeData && !isLoading && (
        <div>
          <h1 className="recipes-list-title">Recipes</h1>
          <div className="recipe-list">{recipeData}</div>
        </div>
      )}
    </>
  );
}

export default Search;

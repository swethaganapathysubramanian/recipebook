import React, { useState , useEffect } from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {

  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_API_KEY;


  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('Nachos');
;
  useEffect(()=>{
    getRecipes();
  },[query]);

  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e =>{
    setRecipes([]);
    setSearch(e.target.value);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
     <div className="App">
     <h1 className = "title"> <br></br>Recipe Book - Search Any Recipe</h1>
     <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
          <button type="submit" className="search-button">
          Search
         </button>
        </form>
        <div className="recipes">
      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.url}
          title={recipe.recipe.label}
          calories = {recipe.recipe.calories}
          image = {recipe.recipe.image}
          ingredients = {recipe.recipe.ingredients}
          source = {recipe.recipe.url}
        />
        
      ))}
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    let APP_ID = process.env.REACT_APP_APP_ID;
    let APP_KEY = process.env.REACT_APP_APP_KEY;
    let query = search;
    let URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    try {
      let recipeData = await Axios.get(URL);
      setRecipes(recipeData.data.hits);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <h2>Silicon Test</h2>
      <form className="search" onSubmit={handleSearch}>
        <input
          type="search"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
        <button
          type="button"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        >
          Search
        </button>
      </form>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        recipes.map(({ recipe }) => (
          <>
            <div className="container">
              <div className="recipe" key={recipe.label}>
                <img loading="lazy" src={recipe.image} alt={recipe.label} />
                <p>Recipe Name: {recipe.label}</p>
              </div>
            </div>
          </>
        ))
      )}
    </>
  );
}

export default App;

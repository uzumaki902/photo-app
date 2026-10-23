import { useReducer, useEffect } from "react";

function getInitialFavorites() {
  try {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch {
    return [];
  }
}

function favoritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      if (state.includes(action.id)) {
        return state.filter((id) => id !== action.id);
      }

      return [...state, action.id];
    }

    default:
      return state;
  }
}

function useFavorites() {
  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    undefined,
    getInitialFavorites,
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(id) {
    dispatch({ type: "TOGGLE_FAVOURITE", id });
  }

  return { favorites, toggleFavorite };
}

export default useFavorites;

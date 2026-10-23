import { useReducer, useEffect } from "react";

// Read saved favourite IDs when the reducer is initialized.
function getInitialFavorites() {
  try {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch {
    return [];
  }
}

// Decide how the favourites list changes.
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

  // Save favourites whenever the collection changes.
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(id) {
    dispatch({ type: "TOGGLE_FAVOURITE", id });
  }

  return { favorites, toggleFavorite };
}

export default useFavorites;

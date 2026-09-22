import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

const STORAGE_KEY = 'apex_favorite_ids';

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setFavoriteIds(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Failed to read favorites", e);
      } finally {
        setLoaded(true);
      }
    }
    loadFavorites();
  }, []);

  const toggleFavorite = async (vehicleId) => {
    let next;
    if (favoriteIds.includes(vehicleId)) {
      next = favoriteIds.filter(id => id !== vehicleId);
    } else {
      next = [...favoriteIds, vehicleId];
    }
    setFavoriteIds(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("Failed to save favorites", e);
    }
  };

  const isFavorite = (vehicleId) => favoriteIds.includes(vehicleId);

  const clearFavorites = async () => {
    setFavoriteIds([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <FavoritesContext.Provider value={{
      favoriteIds,
      toggleFavorite,
      isFavorite,
      clearFavorites,
      favoritesCount: favoriteIds.length,
      loaded
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

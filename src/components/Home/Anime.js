import React from "react";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Anime() {
	
	const [isAnimeLoading, setAnimeLoading] = useState(true);
	const [animeData, setAnimeData] = useState([]);
	const [error, setError] = useState(null);
	
	const [favorites, setFavorites] = useState(() => {
	  const saved = localStorage.getItem('favorites');
	  const value = JSON.parse(saved)
	  if(value !== null){
		return value
	  }
	  else{
		return []
	  }
	});
	
	const fetchAnime = async (id) => {
	  try {
		const response = await fetch(`https://kitsu.io/api/edge/anime/${id}`);
		const json = await response.json();
		if(response.status !== 200){
		  fetchAnime(generateRandomId())
		}
		setAnimeData(json.data);
	  } catch (error) {
		setError(error)
	  } finally {
		setAnimeLoading(false);
	  }
	}
  
	const generateRandomId = () => {
		return Math.floor(Math.random() * 10000)
	}
  
	const addToFav = (id) => {
	  if(!favorites.includes(id)){
		const newFavorites = [...favorites]
  
		const newFavItem = id
	
		newFavorites.unshift(newFavItem)
		setFavorites(newFavorites);
		localStorage.setItem('favorites', JSON.stringify(newFavorites))
		toast("added to fav list!");
	  }
	  else{
		toast("this anime is already in your fav list!");
	  }
	}
	
	useEffect(() => {
	  fetchAnime(generateRandomId())
	},[]);
  
	
	if (error) {
	  return <div>Erreur : {error.message}</div>;
	} else if (isAnimeLoading) {
	  return <div>Chargement...</div>;
	}
	else {
	  return (
		<div>
		  <h2>{animeData?.attributes?.titles?.en_jp}</h2>
		  <img width={400} src={animeData?.attributes?.posterImage?.original} />
		  <div>
			<button onClick={() => addToFav(animeData?.id)}>ajouter aux favoris</button>
			<button onClick={() => fetchAnime(generateRandomId())}>Suivant</button>
		  </div>
		  <ToastContainer />
		</div>
	  );
	}
  }
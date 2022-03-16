import React, { useEffect, useState } from "react";
import AnimeItem from "./AnimeItem";

export default function Favorites(){

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
	
	const [favoritesAnimes, setFavoritesAnimes] = useState([{}])

	

	function deleteItem(id) {
		setFavoritesAnimes(favoritesAnimes.filter(item => {return item.id !== id}))
	  }

	useEffect(() => {
		fetchAnime(favorites[0])
	},[]);
	
	
	const fetchAnime = async (id) => {
		const response = await fetch(`https://kitsu.io/api/edge/anime/${id}`);
		const json = await response.json();
		return json.data
	}

	return (
		<div>
			<h2>Mes favoris</h2>
			<ul>
			</ul>
		</div>
	)
}
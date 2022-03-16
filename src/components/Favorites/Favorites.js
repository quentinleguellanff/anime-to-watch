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
	const [isLoading, setIsLoading] = useState(true)

	

	function deleteItem(id) {
		setFavoritesAnimes(favoritesAnimes.filter(item => {return item.id !== id}))
	}

	useEffect(() => {
		fecthFavoritesAnimes(favorites)
	},[]);

	const fecthFavoritesAnimes = async (favoritesIds) => {
		let i = 0
		const array = []
		while(array.length != favoritesIds.length){
			const animeFetched = await fetchAnime(favoritesIds[i])
			array.push(animeFetched)
			i++
		}
		setFavoritesAnimes(array)
		if(array.length == favoritesIds.length){
			setIsLoading(false)
		}
	}
	
	
	const fetchAnime = async (id) => {
		const response = await fetch(`https://kitsu.io/api/edge/anime/${id}`);
		const json = await response.json();
		return json.data
	}
	if(isLoading){
		return (
			<p>Chargement...</p>
		)
	}
	else{
		return (
			<div>
				<h2>Mes favoris</h2>
				<ul>
					{favoritesAnimes.map((item, index) => {
						return (
							<AnimeItem 
							key={item.id}
							id={item.id}
							index={index}
							title={item.attributes?.titles?.en_jp}
							imageLink={item.attributes?.posterImage?.medium}
							/>
					)
					})}
				</ul>
			</div>
		)
	}

}
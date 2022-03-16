import React from "react";

export default function AnimeItem(props) {
	return (
	<li key={props.id}>
		<p>{props.title}</p>
	</li>
	/*
		test
		<p>{props.title}</p>
		<img width={50} src={props.imageLink} />
		<button onClick={() => props.delete(props.id)}>supprimer</button>
  	</li>*/
	);
}
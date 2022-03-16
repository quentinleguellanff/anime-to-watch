import React from "react";

export default function AnimeItem(props) {
	return (
	<li key={props.id}>
		<p>{props.title}</p>
		<img width={50} src={props.imageLink} />
	</li>
	);
}
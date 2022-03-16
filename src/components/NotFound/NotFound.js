import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {

	const navigate = useNavigate();

	return (
		<div>
			<h2>Woops, the requested page was not found</h2>
			<button onClick={() => navigate('/')}>back to Home</button>
		</div>
	)
}
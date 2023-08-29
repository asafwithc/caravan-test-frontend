import React, { useEffect } from 'react';
import axios from 'axios';

export default function ListOfUsers({ token }) {
	useEffect(() => {
		if (token) {
			fetchData(token);
		}
	}, [token]);

	const fetchData = async (token) => {
		const res = await axios.get('http://localhost:3010/login', {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		console.log(res.data.token);
	};

	

	return (
		<div>
			<h1>List of users</h1>
		</div>
	);
}
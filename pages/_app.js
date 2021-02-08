import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/FooterPage';
import { Container } from 'react-bootstrap';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from '../UserContext.js';
import AppHelper from '../app-helper'

export default function MyApp({ Component, pageProps }) {

	//global user state

	// let useridlocal = localStorage.getItem("useridlocal")

	const [user, setUser] = useState({
		//user state is an object with properties from our local storage
		id: null,
		isAdmin: null //convert string to boolean
	})

	//function to clear local storage upon logout
	const unsetUser = () => {
		// localStorage.clear();

		setUser({
			id: null,
			isAdmin: null,
		})
	}

	useEffect(() => {
		const options = {
			headers: { Authorization: `Bearer: ${ AppHelper.getAccessToken() }` }
		}
		
		fetch(`${ AppHelper.API_URL }/users/details`, options)
		.then(AppHelper.toJSON)
		.then(data => {
			localStorage.setItem('useridlocal', data._id)
			if( typeof data._ID !== undefined){
				setUser({ id: data._ID, isAdmin: data.isAdmin})
			}else{
				setUser({ id: null, isAdmin: null})
			}
		})

	}, [])

	
	useEffect(() => {
	   
		console.log(`User with id: ${user.id} is an admin: ${user.isAdmin}`);
    }, [ user.isAdmin, user.id ]);

  	return (
  		<React.Fragment>
  			<UserProvider value={{ user, setUser, unsetUser }}>
		  		<NavBar />
		  		<Container>
					<Component {...pageProps} />
					
					
				</Container>
				
			</UserProvider>
		</React.Fragment>
	)
}
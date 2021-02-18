import React, { useState, useContext, useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import Swal from 'sweetalert2'
import UserContext from '../../UserContext';
import users from '../../data/users';
import View from '../../components/View';
import AppHelper from '../../app-helper';

export default function index(){

	return(
		<View title={ 'Login' }>
			<Row className="justify-content-center">
				<Col xs md="6">
					<h3 className="justify-content-canter text-center">Login</h3>
					<LoginForm />
				</Col>
			</Row>
		</View>
	)
}

const LoginForm = () => {

	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function authenticate(e){

		e.preventDefault();

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify({
				email: email,
				password: password
			})
		}

	

		fetch(`${ AppHelper.API_URL }/users/login`, options)
		.then(AppHelper.toJSON)
		.then(data => {

			console.log(data)

			
			if (typeof data.accessToken !== 'undefined'){
				localStorage.setItem('token', data.accessToken)
				retrieveUserDetails(data.accessToken)
			}else{
				if(data.error === 'incorrect-password'){
					Swal.fire('Authentication Failed', 'Passsword is incorrect', 'error')
				}else if(data.error === 'does-not-exist'){
					Swal.fire('Authentication Failed', 'Does not Exist', 'error')
				}else if(data.error === 'login-type-error'){
					Swal.fire('Authentication Failed', 'Log in type error', 'error')
				}
			}
		})


	}

	const authenticateGoogleToken = (response) => {
		

		const options = {
			method: 'POST',
			headers:  {'Content-Type': 'application/json'},
			body: JSON.stringify({
				tokenId: response.tokenId
			})
		}

		fetch(`${AppHelper.API_URL}/users/verify-google-id-token`, options)
		.then(AppHelper.toJSON)
		.then(data => {
			if(typeof data.accessToken !== 'undefined'){
				localStorage .setItem('token', data.accessToken)
				localStorage.setItem('useridlocal', data._id)
				retrieveUserDetails(data.accessToken)
			}else if(data.error === 'google-auth-error')
			{
				Swal.fire('Google Auth Error', 'Google authentication procedure failed', 'error')
			} else if(data.error === 'login-type-error'){
				Swal.fire('Login type Error', 'You may have registered through a different login procedure', 'error')
			}
		})
	}

	

	const retrieveUserDetails = (accessToken) => {

		const options = {
			headers: {
				 Authorization: `Bearer ${ accessToken }`,
				 'Content-Type': 'application/json',
				 'Access-Control-Allow-Origin': '*'
				 }
		}
		fetch(`${ AppHelper.API_URL }/users/details`, options)
		.then(AppHelper.toJSON)
		.then(data => {
			localStorage.setItem('useridlocal', data._id)
			
			setUser({ id: data._id, isAdmin: data.isAdmin });
			
			Router.push('/transactions');
			

		})

	}


	return(
	<React.Fragment>
			<Head>
				<title>Authentication</title>
			</Head>
			<Container>
				<Form onSubmit={e => authenticate(e)}>

					<Form.Group controlId="email">
						<Form.Label>Email:</Form.Label>
						<Form.Control type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required/>
					</Form.Group>

					<Form.Group controlId="password">
		                <Form.Label>Password:</Form.Label>
		                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
		            </Form.Group>

		            <Button variant="success" type="submit" block>Login</Button>

		            <GoogleLogin 
		            	clientId="370755427923-knkj0uei6odr9iojv0qvsnd1n0hrkjpj.apps.googleusercontent.com"
						buttonText="Login with Google"
						theme = "light"
						
		            	onSuccess={ authenticateGoogleToken }
		            	onFailure={ authenticateGoogleToken }
		            	cookiesPolicy={ 'single_host_origin' }
		            	className="w-100 text-center d-flex justify-content-center"
		            />

				</Form>
			</Container>
		</React.Fragment>
	)
}


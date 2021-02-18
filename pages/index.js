import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Banner from '../components/Banner';
import Login from '../pages/login/index';
import {useContext} from 'react'
import UserContext from './../UserContext' 
import HomeContent from './transactions/index'

export default function Home({ Component, pageProps }) {

	const {user} = useContext(UserContext);

	return (
		<React.Fragment>
			<Login />
		{user.id !== undefined} ? <Component {...props}/> : <Login/>	
		</React.Fragment>
	)
}
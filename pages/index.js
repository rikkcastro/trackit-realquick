import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Banner from '../components/Banner';
import Login from '../pages/login/index';

export default function Home() {


	return (
		<React.Fragment>
			<Login />
		</React.Fragment>
	)
}
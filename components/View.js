import React from 'react';
import Head from 'next/head';
import { Container } from 'react-bootstrap';

const View = ({ title, children }) => {
	return (
		<React.Fragment>
			<Head>
				<title key="title-tag">{ title }</title>
				{/* Meta tag for responsivness */}
				<meta key="title-meta" name="viewport" content="initial-scale=1.0, width=device-width"/>
			</Head>
			<Container className="mt-5 pt-4 mb-5">
				{ children }
			</Container>
		</React.Fragment>
	)
}

export default View;



/*	

head.js
		export default head {

		}
]

react-bootstrap

export function Container(){
}

export function Row(){
}

export function Column(){
}

export default {
	Container,
	Row,
	Column
}

*/

/*react

export default React {
	useState: () => {}
	useEffect: () => {}
}*/

/* 
<View title={title} children={children}>
	<h3></h3>
	<LoginForm />
</View>

View {
	title: "login",
	children: [<h1></h1>]
}

export default function View() {
	return(
	)
}
*/

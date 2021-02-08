import Link from 'next/link';
import { Jumbotron, Row, Col } from 'react-bootstrap';

export default function Banner({data}){

	const {title, content, destination, label} = data;

	return(
		<Row>
			<Col>
				<Jumbotron>
					<h1>{title}</h1>
					<p>{content}</p>
					<Link href={destination}>
						<a>
							{label}
						</a>
					</Link>
				</Jumbotron>
			</Col>
		</Row>
	)
}
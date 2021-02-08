import { Row, Col, Card } from 'react-bootstrap';

export default function Highlights(){
	return(
		<Row>
			<Col xs={12} md={4}>
				<Card className="cardHighlight">
					<Card.Body>
						<Card.Title>
							<h2>Learn from Home</h2>
						</Card.Title>
						<Card.Text>
							Pariatur adipisicing aute do amet dolore cupidatat. Eu labore aliqua eiusmod commodo occaecat mollit ullamco labore minim. Minim irure fugiat anim ea sint consequat fugiat laboris id. Lorem elit irure mollit officia incididunt ea ullamco laboris excepteur amet. Cillum pariatur consequat adipisicing aute ex.
						</Card.Text>
					</Card.Body>					
				</Card>
			</Col>
			<Col xs={12} md={4}>
				<Card className="cardHighlight">
					<Card.Body>
						<Card.Title>
							<h2>Study Now, Pay Later</h2>
						</Card.Title>
						<Card.Text>
							Pariatur adipisicing aute do amet dolore cupidatat. Eu labore aliqua eiusmod commodo occaecat mollit ullamco labore minim. Minim irure fugiat anim ea sint consequat fugiat laboris id. Lorem elit irure mollit officia incididunt ea ullamco laboris excepteur amet. Cillum pariatur consequat adipisicing aute ex.
						</Card.Text>
					</Card.Body>					
				</Card>
			</Col>
			<Col xs={12} md={4}>
				<Card className="cardHighlight">
					<Card.Body>
						<Card.Title>
							<h2>Be Part of Our Community</h2>
						</Card.Title>
						<Card.Text>
							Pariatur adipisicing aute do amet dolore cupidatat. Eu labore aliqua eiusmod commodo occaecat mollit ullamco labore minim. Minim irure fugiat anim ea sint consequat fugiat laboris id. Lorem elit irure mollit officia incididunt ea ullamco laboris excepteur amet. Cillum pariatur consequat adipisicing aute ex.
						</Card.Text>
					</Card.Body>					
				</Card>
			</Col>
		</Row>
	)
}
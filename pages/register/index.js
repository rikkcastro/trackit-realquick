import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'
import Router from 'next/router';
import AppHelper from '../../app-helper';

export default function index() {
	const [fname, setfname] = useState('');
	const [lname, setlname] = useState('');
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	const [MN, setMN] = useState('');
	const [isActive, setIsActive] = useState(false);

	function registerUser(e) {
		e.preventDefault();

		setfname('')
		setlname('')
		setEmail('');
		setPassword1('');
		setPassword2('');
		setMN('');
		console.log('tesdt')
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"firstName": fname,
				"lastName": lname,
				"email": email,
				"mobileNo": MN,
				"password": password2
			})
		}
		fetch(`${AppHelper.API_URL}/users`, options)
			.then(res => {
				return res.json()
			})
			.then(data => {
                if(data === true){
                    Swal.fire('Welcome', 'You are now Registered to TrackIT-RealQuick', 'success')
					Router.push('/login');
                }else{
                    console.log(data)
                }
			})  
	}


	useEffect(() => {
		if((email !== '' && password1 !== '' && password2 !== '') && (password1 === password2)){
			
		}else{
		
		}
	},[email, password1, password2]);

	return (
		<Form onSubmit={e => registerUser(e)} className="col-lg-4 offset-lg-4 my-5">
			<Form.Group>
				<Form.Label>Firstname</Form.Label>
				<Form.Control 
					type="name"
					placeholder="Enter Firstname"
					value={fname}
					onChange={e => setfname(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Lastname</Form.Label>
				<Form.Control 
					type="name"
					placeholder="Enter Lastname"
					value={lname}
					onChange={e => setlname(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Email Address</Form.Label>
				<Form.Control 
					type="email"
					placeholder="Enter email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Mobile Number</Form.Label>
				<Form.Control 
						type="mobileNumber"
						placeholder="Enter mobile number"
						value={MN}
						onChange={e => setMN(e.target.value)}
						required
					/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control 
					type="password"
					placeholder="Password"
					value={password1}
					onChange={e => setPassword1(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Verify Password</Form.Label>
				<Form.Control 
					type="password"
					placeholder="Verify Password"
					value={password2}
					onChange={e => setPassword2(e.target.value)}
					required
				/>
			</Form.Group>

		
				<Button 
					className="bg-success"
					type="submit"
					id="submitBtn"
					
				>
					Submit
				</Button>
			
	
		</Form>
	)
};
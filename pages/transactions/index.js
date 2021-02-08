import React, { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, Button, Form, InputGroup, FormControl, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import Swal from 'sweetalert2'
import AppHelper from '../../app-helper'


export default function Transactions() {
  const [transaction, setTransaction] = useState('');
  const [userID, setUserID] = useState('');
  const [categoryd, setCategoryd] = useState('');
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('');
  const [category, setCategory] = useState('')
  function deleteTransaction(e) {

  }
  useEffect(() => {
    const transactionView = async () => {
      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      
      const users = await fetch(`${AppHelper.API_URL}/users/details`, options);
      const data = await users.json();
      const filtercategory = data.categories.filter((match) => {
        return ( 
          match.transactionType === transactionType
        );
        });
      let categoryArray = []
      filtercategory.map((data) =>{
        
        let iedata = data.name;

        return categoryArray.push(
          <Dropdown.Item onClick={e => setCategory(iedata)}>{iedata}</Dropdown.Item>
        )
      })
      setCategoryd(categoryArray)
      let array = [];
      let incomearray = [];
      data.transactions.map((data) => {
        incomearray = data.amount
        let amount;
        let dc = data.createdOn
				let id = dc.substr(0, 10)
        if(data.transactionType === "Income"){
          amount = '+'+data.amount
        }else {
          amount ='-'+data.amount
        }
        return array.push(
          <tr key={data._id}>
          <td className="p-2 text-center">{data.description}</td>
          <td className="p-2 text-center">{amount}.00</td>
          <td className="p-2 text-center">{data.category}</td>
          <td className="p-2 text-center">{id}</td>
          <td className="p-2 text-center"><Button className="bg-secondary">delete</Button></td>
          <td className="p-2 text-center"><Button className="bg-warning">update</Button></td>
        </tr>
        
        )
      })

      setIncome(incomearray)
      setTransaction(array)
      setUserID(data._id)
    }
    transactionView();
    }, [transaction])

    


  let getuserid = userID

 
  function createTransaction(e) {
      e.preventDefault();


      setDescription('');
      setAmount(0);
      setTransactionType('')
      setCategory('')
    



      const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
        
          "description": description,
          "amount": amount,
          "transactionType": transactionType,
          "category": category
    })
    }

		fetch(`${AppHelper.API_URL}/transaction`, options)
			.then(res => {
				return res.json()
			})
			.then(data => {
                
                    Swal.fire('New record', 'You are have added a transaction', 'success')
                    fetch(`${AppHelper.API_URL}/users/transact`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        "userId": getuserid,
                        "transactionid": data._id,
                        "description": data.description,
                        "amount": data.amount,
                        "transactionType": data.transactionType,
                        "category": data.category
                    }
                      )
                    })
                    .then( res => {
                      return res.json
                    }).then(transact => {
                      return null
                    })
                    console.log(data)
      })  
      
  }

  return(
    <React.Fragment>
    <Head>
    <title>Manage Transactions</title>
  </Head>
  <h4 className="justify-content-canter text-center">Add Transaction</h4>
  <Container theme-color="dark" variant = "dark" expand="lg" className="row justify-content-center">
  
  <Form onSubmit={(e) => createTransaction(e)}>
          <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="Enter Transaction Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
              />
          </Form.Group>

          <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control 
                  type="number"
                  placeholder="Enter Transaction Amount"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  required
              />
          </Form.Group>

          <Form.Label>Transaction Type</Form.Label>
          <InputGroup>
          
          <FormControl
                  placeholder="select transaction Type"
                  aria-label="select transaction Type"
                  aria-describedby="basic-addon2"
                  placeholder="select transaction type"
                  value={transactionType}
                  onChange={e => setTransactionType(e.target.value)}
                  required
                  disabled
          />

          <DropdownButton
            as={InputGroup.Append}
            variant="outline-secondary"
            id="input-group-dropdown-2"
            onClick={e => setCategory("")}
          >
            <Dropdown.Item onClick={e => setTransactionType("Income")} >Income</Dropdown.Item>
            <Dropdown.Item onClick={e => setTransactionType("Expenses")} >Expenses</Dropdown.Item>
          </DropdownButton>
        </InputGroup>



        <Form.Label>Category</Form.Label>
          <InputGroup>
          
          <FormControl
                  placeholder="select category"
                  aria-label="select category"
                  aria-describedby="basic-addon2"
                  placeholder="select category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  required
                  disabled
          />

          <DropdownButton
            as={InputGroup.Append}
            variant="outline-secondary"
            id="input-group-dropdown-2"
          >
            {categoryd}
          </DropdownButton>
        </InputGroup>
        <hr></hr>
          
          <Button className="bg-success" type="submit" >
              Add Transaction
          </Button>
          <hr></hr>
          
      </Form>
  
  <Table striped bordered hover className="row justify-content-center">
    <thead>
    <tr className="p-2 text-center " >{transaction}</tr>
    </thead>
    
  </Table>
  </Container>
  </React.Fragment> 
    
  )
}
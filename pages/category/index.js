import React, { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import UserContext from '../../UserContext';
import { Container, Button, Form, InputGroup, FormControl, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import Swal from 'sweetalert2'
import Link from 'next/link';
import AppHelper from '../../app-helper'


export default function Category() {
  const [category, setCategory] = useState('');
  const [userID, setUserID] = useState('');
  const [categoryId, setCategoryId] = useState('');

 
  function deleteCategory (e) {
    console.log({categoryId})
    fetch(`${AppHelper.API_URL}/users/del`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userId": userID,
        "categoryId": categoryId,
    }
      )
    })
    .then( res => {
      return res.json
    }).then(transact => {
      return null
    })


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
      
      let array = [];
      data.categories.map((data) => {
        
        return array.push(
        <tr key={data.categoryId}>
          <td className="p-2 text-center">{data.transactionType}</td>
          <td className="p-2 text-center">{data.name}</td>
          <td className="p-2 text-center"><Button onClick={(e) => deleteCategory(e)}  className="bg-secondary">delete</Button></td>
          <td className="p-2 text-center"><Button  onClick={(e) => setCategoryId(data._id)} className="bg-warning">update</Button></td>
        </tr>
        
        )
      })

      setCategory(array)
      setUserID(data._id)
    }
    transactionView();
    }, [category])

    
  const [name, setName] = useState('');
  const [transactionType, setTransactionType] = useState('');

  let getuserid = userID

 
  function createCategory(e) {
      e.preventDefault();
    
      setName('');
      setTransactionType('')

      const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
        
          "name": name,
          "transactionType": transactionType,
    })
    }

		fetch(`${AppHelper.API_URL}/category`, options)
			.then(res => {
				return res.json()
			})
			.then(data => {
                console.log(data)
                    Swal.fire('New record', 'You are have added a Category', 'success')
                    fetch(`${AppHelper.API_URL}/users/categorize`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        "userId": getuserid,
                        "categoryId": data._id,
                        "name": data.name,
                        "transactionType": data.transactionType,

                    }
                      )
                    })
                    .then( res => {
                      return res.json
                    }).then(transact => {
                      return null
                      console.log(transact)
                    })
                    console.log(data)
      })  
      
  }

  return(
    <React.Fragment>
    <Head>
    <title>Manage Category</title>
  </Head>
  <h4 className="justify-content-canter text-center">Add Category</h4>
  <Container theme-color="dark" variant = "dark" expand="lg" className="row justify-content-center">
  
  <Form onSubmit={(e) => createCategory(e)}>


          <Form.Label>Category Type</Form.Label>
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
          >
            <Dropdown.Item onClick={e => setTransactionType("Income")}>Income</Dropdown.Item>
            <Dropdown.Item onClick={e => setTransactionType("Expenses")}>Expenses</Dropdown.Item>
          </DropdownButton>
        </InputGroup>

          <Form.Group controlId="category">
              <Form.Label>Category Name</Form.Label>
              <Form.Control 
                  type="text"
                  aria-label="Text input with dropdown button"
                  placeholder="Enter category name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                 
              />
          </Form.Group>
          
          <Button className="bg-success" type="submit" >
              Add Category
          </Button>
          <hr></hr>
          
      </Form>
  
  <Table striped bordered hover className="row justify-content-center">
    <thead>
    <tr className="p-2 text-center " >{category}</tr>
    </thead>
  </Table>
  <Table striped bordered hover className="row justify-content-center">
    <thead>
    <tr className="p-2 text-center " ></tr>
    </thead>
  </Table>
  </Container>
  </React.Fragment> 
    
  )
}


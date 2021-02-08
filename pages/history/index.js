import React, { useContext, useState, useEffect } from 'react';
import Head from 'next/head';

import { Container, InputGroup, FormControl, DropdownButton, Dropdown, Table, Form } from 'react-bootstrap';
import AppHelper from '../../app-helper'


export default function Transactions() {
  const [transaction, setTransaction] = useState('');
  const [userID, setUserID] = useState('');
  const [categoryd, setCategoryd] = useState('');
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [search, setSearch] = useState('');
  const [transactionType, setTransactionType] = useState('');

  useEffect(() => {
    const transactionView = async () => {
      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const users = await fetch(`${AppHelper.API_URL}/users/details`, options);
      const data = await users.json();
      const sortbytype = data.transactions.filter((match) => {
        return (
          match.transactionType === transactionType ||
          match.description === search
        );
      });
      let doet = []
      sortbytype.map((data) =>{
        let dc = data.createdOn
				let id = dc.substr(0, 10)
        return doet.push(
          <tr key={data._id}>
            <td className="p-2 text-center">{id}</td>
          <td className="p-2 text-center">{data.description}</td>
          <td className="p-2 text-center">{data.transactionType}</td>
          <td className="p-2 text-center">{data.category}</td>
          <td className="p-2 text-center">{data.amount}.00</td>
        </tr>
        )
      })
      let categoryArray = []
      data.categories.map((data) =>{
        return categoryArray.push(
          <Dropdown.Item onClick={e => setCategoryd(data.name)}>{data.name}</Dropdown.Item>
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
            <td className="p-2 text-center">{id}</td>
          <td className="p-2 text-center">{data.description}</td>
          <td className="p-2 text-center">{data.transactionType}</td>
          <td className="p-2 text-center">{data.category}</td>
          <td className="p-2 text-center">{amount}.00</td>
        </tr>
        
        )
      })

      setIncome(incomearray)
      if(transactionType === '' && search === ''){
        setTransaction(array)
      }else{
        setTransaction(doet)
      }
      
      setUserID(data._id)
    }
    transactionView();
    }, [transaction, transactionType])
 

  return(
    <React.Fragment>
    <Head>
    <title>History</title>
  </Head>
  <Container theme-color="dark" variant = "dark" expand="lg" className="row justify-content-center">
  <Form>

  <InputGroup>
         <FormControl
                  placeholder="search"
                  aria-label="search"
                  aria-describedby="basic-addon2"
                  placeholder="search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  required
          />
          <FormControl
                  placeholder="sort by transaction type"
                  aria-label="sort by transaction type"
                  aria-describedby="basic-addon2"
                  placeholder="sort by transaction type"
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
             <Dropdown.Item onClick={e => setTransactionType("")} >All</Dropdown.Item>
            <Dropdown.Item onClick={e => setTransactionType("Income")} >Income</Dropdown.Item>
            <Dropdown.Item onClick={e => setTransactionType("Expenses")} >Expenses</Dropdown.Item>
          </DropdownButton>
        </InputGroup>
        </Form>
  <Table striped bordered hover className="row justify-content-center">
    <thead>
    <tr>
						<th>Date</th>
						<th>Description</th>
						<th>Type</th>
						<th>Category</th>
						<th>Amount</th>
					</tr>
    <tbody className="p-2 text-center " >{transaction}</tbody>
    </thead>
    
  </Table>
  </Container>
  </React.Fragment> 
    
  )
}




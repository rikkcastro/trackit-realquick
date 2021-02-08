import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import DoughnutChart from '../../components/DoughnutChart'
import AppHelper from '../../app-helper'

export default function Transactions({ data }) {


  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [balance, setBalance] = useState("");
  const [incomep, setIncomep] = useState("");
  const [expensep, setExpensep] = useState("");
 
  useEffect(()=> {
    const token = localStorage.getItem('token')
  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  fetch(`${AppHelper.API_URL}/users/details`, options)
  .then(res => res.json())
  .then(data => {
   let tExpense = 0
   let tIncome = 0
   let total
   let total2
   let incometotal
   let expensetotal
   data.transactions.forEach(transaction => {
    
    const type = transaction.transactionType
    const amount = transaction.amount

    if(type === 'Income'){
        tIncome += amount
    }else if(type === 'Expenses')
    {
      tExpense += amount
    }
   })
   total =  tIncome - tExpense
   total2 =  tIncome + tExpense
   incometotal = (tIncome / total2) * 100
   expensetotal = (tExpense / total2) * 100
    
    setExpensep(expensetotal.toFixed(1))
    setIncomep(incometotal.toFixed(1))
    setBalance(total)
    setExpense(tExpense)
    setIncome(tIncome)
    
  })
  },[])
  



   return(
      <React.Fragment>
          <Head>
				<title>Dashboard</title>
			</Head>
      <h4 className="justify-content-canter text-center">Income and Expense Percentage</h4>
        <Container>
        <h6 className="justify-content-canter text-center">Total Balance: {balance}.00</h6>
        <h6 className="justify-content-canter text-center">Total Expenses: {expense}.00 ({expensep}%)</h6>
        <h6 className="justify-content-canter text-center">Total income: {income}.00 ({incomep}%)</h6>
        {/* <DoughnutChart expense={income} income={expense}/> */}
        </Container>
        <Container/>
      </React.Fragment> 
    )
 }
import React from 'react'
import {Doughnut} from 'react-chartjs-2'

export default function DoughnutChart({income, expense}){
	return(
        <React.Fragment>
            <Doughnut
				data={{
					datasets:[{
						data:[expense, income],
						backgroundColor:["green", "red"]
					}],
					labels:["Income", "Expense"]
				}}
				redraw={false}
			/>
        </React.Fragment>
		
		)
}

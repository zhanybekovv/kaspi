import React, { FC } from 'react'
import Employees from '../Employees'
import AddForm from '../Forms/AddForm'

const EmployeePage: FC = () => {
    return(
        <div style={{width: 500, border: '1px solid black'}}>
            <Employees />
            <AddForm />
        </div>
        )
}

export default EmployeePage
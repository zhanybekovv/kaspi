import React, { FC, useContext } from 'react'
import { useAuth } from '../../App'

import Employee from '../Employee'
import { observer } from 'mobx-react-lite'
import { DivisionIdContext } from '../../App'
import './index.css'

const Employees: FC = observer(() => {
  const x = useAuth()
  const divisionId = useContext(DivisionIdContext)

  return (
    <div className='worker'>
      <div style={{ fontWeight: 'bold' }}>{divisionId.selectedDivisionId}</div>
      {x.getEmployeesByDivision(divisionId.selectedDivisionId).map((item, index) => (
        <Employee id={item.id} key={item.id}/>
      ))}
    </div>
  )
})

export default Employees

import React, { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import EmployeePage from '../EmployeePage'
import SearchForm from '../Forms/SearchForm'
import Divisions from '../Divisions'
import AutoSize from '../AutoSize'


const MainPage: FC = observer(() => {

  const [value, setValue] = useState('')
  const [showEmployees, setShowEmployees] = useState(false)


  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <div style={{ border: '1px solid black', width: 600}}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 8}}>
          <SearchForm setValue={setValue} />
          <button onClick={() => setShowEmployees(!showEmployees)}>
            Показать сотрудников
          </button>
        </div>
        <Divisions value={value} />
      </div>
      {
        showEmployees ?
            <EmployeePage /> 
        : <div></div>
      }
    </div>
  )
})

export default MainPage

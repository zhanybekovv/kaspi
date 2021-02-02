import React, { FC, FormEvent, useState, useContext } from 'react'
import { useAuth } from '../../../App'
import { DivisionIdContext } from '../../../App'


const AddForm: FC = () => {
  const divisionId = useContext(DivisionIdContext)
  const store = useAuth()
  const [newEmployee, setNewEmployee] = useState('')

  const handleNewEmployeeSubmit = (e:FormEvent<HTMLFormElement>) => {
    if(!newEmployee || newEmployee.length === 0){
      alert('Введите ФИО')
      return
    }
    store.addNewEmployee(newEmployee, divisionId.selectedDivisionId)
    setNewEmployee('')
    e.preventDefault()
  }
  
  const handleNewEmplChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmployee(e.target.value)
  }
  return(
    <div style={{display: 'flex', flexDirection: 'column', padding: '15px' }}>
      <form onSubmit={(event) => handleNewEmployeeSubmit(event)}>
        <label>
          ФИО:
          <input type='text' name='name' value={newEmployee} onChange={handleNewEmplChange}/>
        </label>
        <input type='submit' value='Отправить'/>
      </form>
    </div>
  )
}

export default AddForm
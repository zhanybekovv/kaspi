import React, { FC, useState } from 'react'

import Worker from '../Worker'
import { Props, Employee } from './props'
import './index.css'
import { FormEvent } from 'react'

const Unit: FC<Props> = (props: Props) => {
  const { element } = props
  const [expanded, setExpanded] = useState(false)
  const [showEmployees, setShowEmployees] = useState(false)
  const [addNewEmployee, setAddNewEmployee] = useState(false)
  const [newEmployee, setNewEmployee] = useState('')
  const [a, setA] = useState<Employee>()

  const toggle = () => {
    setExpanded(!expanded)
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    if(!newEmployee || newEmployee.length === 0){
      alert('Введите ФИО')
    }
    const employee = {
      id: 0,
      name: newEmployee,
      divisionId: element.id
    }
    setA(employee)
    setNewEmployee('')
    e.preventDefault()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmployee(event.target.value)
  }

  const showNodes = () => {
    if (element.subdivisions && element.subdivisions.length > 0) {
      const arNodes = element.subdivisions.map((item, index) => {
        return <Unit key={index} element={item} />
      })
      return arNodes
    }
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className='row'>
        <div className='heading'>
          <button onClick={() => toggle()}>{expanded ? '-' : '+'}</button>
          <h3>{element.name}</h3>
          <div>
            <button onClick={() => setShowEmployees(!showEmployees)}>
              Показать сотрудников
            </button>
            <button onClick={() => setAddNewEmployee(!addNewEmployee)}>
              Добавить сотрудника
            </button>
          </div>
        </div>
        {expanded && <div style={{ padding: 20 }}>{showNodes()}</div>}
      </div>
      <div style={{ width: '20%' }}>
        {showEmployees && (
          <Worker id={element.id} divisionName={element.name} newEmployee={a}/>
        )}
        {addNewEmployee && (
          <div style={{display: 'flex', flexDirection: 'column', padding: '15px'}}>
            <div style={{fontWeight: 'bold'}}>{element.name}</div>
            <form onSubmit={(event) => handleSubmit(event)}>
              <label>
                ФИО:
                <input type='text' name='name' value={newEmployee} onChange={(event) => handleChange(event)}/>
              </label>
              <input type='submit' value='Отправить'/>
              <button onClick={() => setAddNewEmployee(false)}>Отмена</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Unit

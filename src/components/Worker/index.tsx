import React, { FC, useState, useEffect } from 'react'

import { Props } from './props'
import employeesData from '../../employees.json'
import './index.css'

const Worker: FC<Props> = (props: Props) => {
  const [data, setData] = useState(employeesData)
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState('')
  const { id, divisionName, newEmployee } = props

  const getEmployees = () => {
    const employees = data.filter((employee, index) => {
      return employee.divisionId === id
    })
    return employees
  }

  const getEmployee = (id: number) => {
    const employee = data.filter(user => 
     user.id === id
    )
    return employee
  }

  useEffect(() => {
    if (newEmployee) {
      setData([...data, newEmployee ])
    }
  }, [newEmployee])

  const handleSubmit = (e:any, id:number) => {
    e.preventDefault()
    if(!value || value.length === 0){
      alert('Введите ФИО')
    }
    getEmployee(id)[0].name = value
    data[getEmployee(id)[0].id-1] = getEmployee(id)[0]
    setData(data)
    setEdit(!edit)
  }

  const handleOnChange = (e: any) => {
    setValue(e.target.value.trim())
  }

  return (
    <div className='worker'>
      <div style={{ fontWeight: 'bold' }}>{divisionName}</div>
      {getEmployees().map((item, index) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          {!edit ? (
            <div key={index}>{item.name}</div>
          ) : (
            <form onSubmit={event => handleSubmit(event, item.id)}>
              <label>
                <input
                  type='text'
                  name='name'
                  defaultValue={item.name}
                  onChange={event => handleOnChange(event)}
                />
              </label>
              <input type='submit' value='Save' />
              <button onClick={() => setEdit(!edit)}>Отмена</button>
            </form>
          )}
          {
            !edit && <button onClick={() => setEdit(!edit)}>edit</button>  
          }
        </div>
      ))}
    </div>
  )
}

export default Worker

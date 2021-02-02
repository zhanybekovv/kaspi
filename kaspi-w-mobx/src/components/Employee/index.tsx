import React, { FC, useState, FormEvent } from 'react'
import { observer } from 'mobx-react-lite'
import { useAuth } from '../../App'
import { Props } from './props'

const Employee: FC<Props> = observer((props: Props) => {
  const { id } = props
  const store = useAuth()
  const [edit, setEdit] = useState(false)
  const [employeeName, setEmployeeName] = useState(store.getEmployeeById(id))

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
     if(employeeName && employeeName?.length > 0){
      store.editEmployee(employeeName, id)
      e.preventDefault()
      setEdit(!edit)
     }
  }


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setEmployeeName(e.target.value)
  }


  return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          {!edit ? (
            <div>{employeeName}</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  type='text'
                  name='name'
                  value={employeeName}
                  onChange={handleOnChange}
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
  )
})

export default Employee

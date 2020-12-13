import React, { FC, useState } from 'react'
import Unit from '../Subdivision'

import structure from '../../structure.json'
import { FormEvent } from 'react'

const SubdivisionsPage: FC = () => {
  const [data, setData] = useState(structure)
  const [value, setValue] = useState('')

  const findByName = (name: string, data: any) => {
    if (!data || data.length === 0) return undefined

    for (let i = 0; i < data.length; i++) {
      if (data[i].name === name) return data[i]
      else {
        const res: object = findByName(name, data[i].subdivisions)
        if (res) return res
      }
    }

    return undefined
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (value.length > 0) {
      const res = findByName(value, data)
      if (res) {
        setData([res])
      } else setData([])
    }
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length === 0) {
      setData(structure)
    } else {
      setValue(e.target.value.trim())
    }
  }
  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={event => handleSubmit(event)}>
        <label>
          <input
            type='text'
            name='name'
            onChange={event => handleOnChange(event)}
          />
        </label>
        <input type='submit' value='Искать' />
      </form>
      {data.length > 0 ? (
        data.map((element, index) => <Unit key={index} element={element} />)
      ) : (
        <div>Ничего не найдено</div>
      )}
    </div>
  )
}

export default SubdivisionsPage

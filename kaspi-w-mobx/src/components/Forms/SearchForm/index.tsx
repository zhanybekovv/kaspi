import React, { FC } from 'react'

type Props = {
    setValue: Function
}

const SearchForm: FC<Props> = (props: Props) => {
    const { setValue } = props

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim().length === 0) {
        } else {
        setValue(e.target.value.trim())
        }
    }

    return (
          <form onSubmit={() => console.log("hgjghj")}>
            <label>
              <input
                type='text'
                name='name'
                onChange={event => handleOnChange(event)}
              />
            </label>
            <input type='submit' value='Искать' />
          </form>
    )
}

export default SearchForm
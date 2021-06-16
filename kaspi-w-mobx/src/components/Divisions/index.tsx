import React, { FC } from 'react'
import { FixedSizeList } from "react-window"

import { useAuth } from '../../App'
import Subdivision from '../Subdivision'
import AutoSize from '../AutoSize'

type Props = {
    value: string
}

const Divisions: FC<Props> = (props: Props) => {
    const { value } = props
    
    const store = useAuth()
    const divisions = store.search(value)
    console.log("size", divisions.length)
		return(
			<div style={{height: 500}}> 
						 {divisions.map(item => (<Subdivision  element={item} />))}
			</div> 
		)
}

export default Divisions
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
					<AutoSize>
					{(size: any) => (<FixedSizeList height={size.height} itemCount={divisions.length} itemSize={50} width={size.width}>
						{({index, style}) => (
								<Subdivision key = {index} element={divisions[index]} style={style} />
								)}
					</FixedSizeList>) }
					</AutoSize>
			</div> 
		)
}

export default Divisions
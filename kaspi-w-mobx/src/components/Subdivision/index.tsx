import React, { FC, useState, useContext } from 'react'

import { Props } from './props'
import { observer } from 'mobx-react-lite'
import { DivisionIdContext } from '../../App' 
import { useAuth } from '../../App'

import './index.css'

const Subdivision: FC<Props> = observer( function Subdivision(props: Props){
  const { element, style } = props
  const divisionId = useContext(DivisionIdContext)
  const [expanded, setExpanded] = useState(false)
  const store = useAuth()
  const toggle = () => {
    setExpanded(!expanded)
  }

  const handleOnClick = (event: any) => {
    event.stopPropagation()
    divisionId.selectedDivisionId = element
  }

  

  const x = store.getDivision(element)
  const showNodes = () => {
    if (x?.subdivisions && x.subdivisions.length > 0) {
      const arNodes = x.subdivisions.map((item, index) => {
        return <Subdivision key={index} element={item.id} style={style}/>
      })
      return arNodes
    }
  }


  return (
    <div style={style}>
      <div className='row'>
        <div className='heading' onClick={handleOnClick}>
          {/* <button onClick={() => toggle()}>{expanded ? '-' : '+'}</button> */}
          <h3 style={{paddingRight: 8, paddingLeft: 8}}>{store.getDivision(element)?.name}</h3>
        </div>
        {/* {expanded && <div style={{ padding: 20 }}>{showNodes()}</div>} */}
      </div>
    </div>
  )
})

export default Subdivision

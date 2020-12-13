import React, { FC, useState } from 'react'
import { Props } from './props'

import './index.css'

const Unit: FC<Props> = (props: Props) => {
  const { element } = props
  const [expanded, setExpanded] = useState(false)

  React.useEffect(() => {
    console.log("expanded", expanded)
  }, [expanded])

  const toggle = () => {
    setExpanded(!expanded)
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
    <div>
      <div className='row'>
        <div className='heading'>
          <button onClick={() => toggle()}>
            {expanded ? '-' : '+'}
          </button>
          <h3>
            {element.name}
          </h3>
        </div>
        {expanded && <div style={{padding: 20}}>{showNodes()}</div>}
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Unit

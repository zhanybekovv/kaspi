import React, {FC} from 'react'
import Unit from '../Unit'

import structure from '../../structure.json'

const SubdivisionsPage: FC = () => {
    return (
      <div style={{width: '80%'}}>
      {
      structure.map((element, index) =>  
        <Unit key={index} element={element}/> 
      )
      }
      </div>
    );
}

export default SubdivisionsPage
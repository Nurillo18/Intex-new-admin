import React from 'react'
import "./MButton.css"

function MButton({BType, type, children }) {
 
  return <button className={`btn ${BType} `} type={type}>{children}</button>  

}

export default MButton

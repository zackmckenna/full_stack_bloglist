import React from 'react'

const FormInput = ( props ) => {
return (

  <input
    type={props.type}
    value={props.password}
    name={props.name}
    onChange={props.onChange}
  />

  )
}

export Default FormInput

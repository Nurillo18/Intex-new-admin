import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Select(props) {
  const { label, name, options, ...rest } = props
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field
        as="select"
        id={name}
        name={name}
        {...rest}
        className="flex flex-row w-full p-3 rounded-lg outline-none border border-gray-200 focus-visible:border-gray-300 text-base"
      >
        {options.map((option) => {
          return (
            <option
              key={option.value}
              value={option.value}
            >
              {option.key}
            </option>
          )
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default Select

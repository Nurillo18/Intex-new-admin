import React, { useEffect, useState } from 'react'
import './Assets/main.css'
import MButton from './BaseComponents/MButton/MButton'
import MFilter from './BaseComponents/MFilter/MFilter'
import MLabel from './BaseComponents/MLabel/MLabel'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikContainer from './BaseComponents/FormInput/FormikContainer'
import FormikControl from './BaseComponents/FormInput/FormikControl'

function IbrohimTest() {
  const dropdownOptions = [
    { key: 'В ожидании', value: '' },
    { key: 'Option1', value: 'option 1' },
    { key: 'Option2', value: 'option 2' },
    { key: 'Option3', value: 'option 3' },
  ]

  const initialValues = {
    name: '',
    password: '',
    birthDate: null,
    selectOption: '',
    price: '',
    description: ''
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    selectOption: Yup.string().required('Required'),
    birthDate: Yup.date().required('Required').nullable(),
    price: Yup.number().required('Required'),
  })

  const onSubmit = (values, { resetForm }) => {
    console.log('Form data', values)
    resetForm()
  }

  return (
    <>
      {/* <FormikContainer /> */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="w-96">
            <FormikControl
              control="input"
              type="name"
              id="name"
              label="Имя"
              name="name"
              autoComplete="off"
              placeholder="Введите ваше имя"
            />


            

            <FormikControl
              control="input"
              type="password"
              id="password"
              label="password"
              name="password"
              placeholder="Введите ваше password"
            />

            <FormikControl
              control="input"
              type="number"
              id="number"
              label="Цена со скидкой"
              name="price"
              placeholder="2 600 000"
            />

            <FormikControl
              control="date"
              label="Pick a date"
              name="birthDate"
              placeholder="28.09.2022  14:00"
            />

            <FormikControl
              control="select"
              label="Статус"
              name="selectOption"
              options={dropdownOptions}
            />

            <FormikControl
              control="textarea"
              label="Description"
              name="description"
              placeholder="Введите Описание продукта"
            />

            <br />
            <MButton BType="login" type="submit">
              Войти
            </MButton>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default IbrohimTest

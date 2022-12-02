import { useEffect, useRef, useState } from 'react'
import DropDown from '../../../../BaseComponents/DropDown/DropDown'
import DropImg from '../../../../Assets/Images/HomeContentImg/Drop.svg'
import * as Yup from 'yup'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useFormik } from 'formik'
import MButton from '../../../../BaseComponents/MButton/MButton'
import MFilter from '../../../../BaseComponents/MFilter/MFilter'
import { Modal } from '../../../../components/Modal/Modal'
import Close from '../../../../Assets/Images/SettingsImg/close.svg'

export default function AtributPage({
  showModal,
  setShowModal,
  infoPageThis,
  ownPage,
}) {
  const env = process.env.REACT_APP_ALL_API
  const [navBarDrop, setNavBarDrop] = useState(true)
  const [navBarDrop1, setNavBarDrop1] = useState(false)
  const [navBarDrop2, setNavBarDrop2] = useState(false)
  const [subLoading, setSubLoading] = useState(false)
  const [data, setData] = useState([])
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState([])

  const initialValues = {
    price: '',
    salePrice: '',
    type: '',
    status: '',
    type_eng: '',
    type_uz: '',
    status_uz: '',
    status_eng: '',
  }
  const infor = JSON.parse(window.localStorage.getItem('information'))
  const image = JSON.parse(window.localStorage.getItem('image'))
  const token = JSON.parse(window.localStorage.getItem('token'))

  const onSubmit = (values, { resetForm }) => {
    let atributeIds = addedDate.map((itm) => itm.ids)
    let atributUInfo = {
      price: values.price,
      discount_price: values.salePrice,
      category_id: Number(values.type),
      status_id: Number(values.status),
      attribute_id: atributeIds.flat(),
    }
    const resultData = {
      ...infor,
      image,
      ...atributUInfo,
    }
    ownPage(false)
    infoPageThis(true)
    resetForm()
    axios
      .post(
        'https://web-production-5638.up.railway.app/api/products',
        resultData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if (res.status === 201) {
          window.localStorage.removeItem('information')
          window.localStorage.removeItem('image')
        }
        toast.success('Успешно присоединился')
      })
      .catch((err) => {
        toast.error('Ошибка при вставке или вставке')
      })
  }

  const validationSchema = Yup.object({
    price: Yup.number().required('Required!'),
    salePrice: Yup.number().required('Required!'),
    type: Yup.string().required('Required!'),
    type_eng: Yup.string().required('Required!'),
    type_uz: Yup.string().required('Required!'),
    status: Yup.string().required('Required!'),
    status_eng: Yup.string().required('Required!'),
    status_uz: Yup.string().required('Required!'),
  })

  const removeTags = () => {}
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })

  const loaderButton = (
    <svg
      className="inline mr-2 w-6 h-6 text-text-white animate-spin dark:text-white fill-gray-400 dark:fill-gray-400"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  )
  const selectOnce = useRef()
  useEffect(() => {
    axios
      .get(`${env}attributes?page=0&limit=10`)
      .then((res) => {
        setData(res?.data.result)
      })
      .catch((err) => console.error(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    axios
      .get(`${env}categories/categories`)
      .then((res) => {
        setCategories(res?.data)
      })
      .catch((err) => console.error(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    axios
      .get(`${env}status-products/getAll`)
      .then((res) => {
        setStatus(res?.data)
      })
      .catch((err) => console.error(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [addedDate, setAddedDate] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    let result = data.find((e) => e.attribute_ru === selectOnce.current.value)

    setShowModal(false)
    if (!addedDate.includes(result)) {
      setAddedDate([...addedDate, result])
    }
  }

  return (
    <div className="pb-16">
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e)
          formik.values = initialValues
        }}
        className=" flex flex-col"
      >
        <DropDown
          dropName="Русский"
          imgAlt="dropimg"
          wDrop="12"
          hdrop="9"
          downClick={() => setNavBarDrop(!navBarDrop)}
          imgURL={DropImg}
          rotateDelete={navBarDrop ? '-rotate-180' : '-rotate-0'}
        >
          <div
            className={
              navBarDrop ? 'h-auto overflow-auto pr-5 ' : 'h-0 overflow-hidden '
            }
          >
            <div className="flex justify-between ">
              <div className="relative">
                <label className="text-base flex flex-col">Цена</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="1 290 000"
                  className={
                    formik.touched.price && formik.errors.price
                      ? '  h-12 w-[340px] text-base rounded-lg p-2 sm:p-4 outline-none border border-red-600 mb-3 sm:mb-6'
                      : '  h-12 w-[340px] text-base rounded-lg p-2 sm:p-4 outline-none border border-gray-input_radius mb-3 sm:mb-6'
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps('price')}
                />
                {formik.touched.price && formik.errors.price ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.price}
                  </span>
                ) : null}
                <span className="absolute top-9 left-[295px]">Сум</span>
              </div>
              <div className="relative">
                <label className="text-base flex flex-col">
                  Цена со скидкой
                </label>
                <input
                  type="number"
                  name="salePrice"
                  id="salePrice"
                  placeholder="1 290 000"
                  className={
                    formik.touched.salePrice && formik.errors.salePrice
                      ? '  h-12 w-[340px] text-base rounded-lg p-2 sm:p-4 outline-none border border-red-600 mb-3 sm:mb-6'
                      : '  h-12 w-[340px] text-base rounded-lg p-2 sm:p-4 outline-none border border-gray-input_radius mb-3 sm:mb-6'
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps('salePrice')}
                />
                {formik.touched.salePrice && formik.errors.salePrice ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.salePrice}
                  </span>
                ) : null}
                <span className="absolute top-9 left-[295px]">Сум</span>
              </div>
              <div className="relative">
                <label className="text-base flex flex-col">Тип продукта</label>
                <select
                  name="type"
                  id="type"
                  className={
                    formik.touched.type && formik.errors.type
                      ? ' h-12 w-[340px] px-3 text-base rounded-lg outline-none border border-red-600 mb-3 sm:mb-6'
                      : ' h-12 w-[340px] px-3  text-base rounded-lg outline-none border border-gray-input_radius mb-3 sm:mb-6'
                  }
                  {...formik.getFieldProps('type')}
                >
                  <option hidden >Тип</option>
                  {categories.length &&
                    categories.map((el) => (
                      <option value={el.id} key={el.id}>
                        {el.category_ru}
                      </option>
                    ))}
                </select>
                {formik.touched.type && formik.errors.type ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.type}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-14 gap-y-3">
              {addedDate.length > 0 &&
                addedDate.map((el) => {
                  return (
                    <div key={el.id}>
                      <label>{el.attribute_ru}</label>
                      <div className=" w-[340px] h-[48px] border rounded-lg border-gray-200 p-1 flex items-center flex-wrap">
                        <ul className="flex flex-wrap gap-2  ">
                          {el.ru &&
                            el?.ru.map((item, index) => (
                              <li key={index}>
                                <MFilter>
                                  {item}
                                  <span
                                    className="ml-2 cursor-pointer"
                                    onClick={() => removeTags()}
                                  ></span>
                                </MFilter>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  )
                })}
            </div>

            <div>
              <div className="relative mt-5">
                <label className="text-base flex flex-col">Статус</label>
                <select
                  name="status"
                  id="status"
                  className={
                    formik.touched.status && formik.errors.status
                      ? ' h-12 w-[340px] px-3 text-base rounded-lg outline-none border border-red-600 mb-3 sm:mb-6'
                      : ' h-12 w-[340px] px-3  text-base rounded-lg outline-none border border-gray-input_radius mb-3 sm:mb-6'
                  }
                  {...formik.getFieldProps('status')}
                >
                  <option hidden>Статус</option>
                  {status.length &&
                    status.map((el) => (
                      <option key={el.id} id={el.id} value={el.id}>
                        {el.status_ru}
                      </option>
                    ))}
                </select>
                {formik.touched.status && formik.errors.status ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.status}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </DropDown>
        <DropDown
          dropName="Англиский"
          imgAlt="dropimg"
          wDrop="12"
          hdrop="9"
          downClick={() => setNavBarDrop1(!navBarDrop1)}
          imgURL={DropImg}
          rotateDelete={navBarDrop1 ? '-rotate-180' : '-rotate-0'}
        >
          <div
            className={
              navBarDrop1 ? 'h-auto overflow-auto pr-5' : 'h-0 overflow-hidden'
            }
          >
            <div className="flex justify-between ">
              <div className="relative">
                <label className="text-base flex flex-col">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="1 290 000"
                  className={
                    formik.touched.price && formik.errors.price
                      ? '  h-12 w-[340px] text-base rounded-lg p-2 sm:p-4 outline-none border border-red-600 mb-3 sm:mb-6'
                      : '  h-12 w-[340px] text-base rounded-lg p-2 sm:p-4 outline-none border border-gray-input_radius mb-3 sm:mb-6'
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps('price')}
                />
                {formik.touched.price && formik.errors.price ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.price}
                  </span>
                ) : null}
                <span className="absolute top-9 left-[295px]">Sum</span>
              </div>
              <div className="relative">
                <label className="text-base flex flex-col">Sale price</label>
                <input
                  type="number"
                  name="salePrice"
                  id="salePrice"
                  placeholder="1 290 000"
                  className={
                    formik.touched.salePrice && formik.errors.salePrice
                      ? '  h-12 w-[340px] text-base rounded-lg p-2 sm:p-4 outline-none border border-red-600 mb-3 sm:mb-6'
                      : '  h-12 w-[340px] text-base rounded-lg p-2 sm:p-4 outline-none border border-gray-input_radius mb-3 sm:mb-6'
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps('salePrice')}
                />
                {formik.touched.salePrice && formik.errors.salePrice ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.salePrice}
                  </span>
                ) : null}
                <span className="absolute top-9 left-[295px]">Sum</span>
              </div>

              <div className="relative">
                <label className="text-base flex flex-col">Type product</label>
                <select
                  name="type_eng"
                  id="type_eng"
                  className={
                    formik.touched.type_eng && formik.errors.type_eng
                      ? ' h-12 w-[340px] px-3 text-base rounded-lg outline-none border border-red-600 mb-3 sm:mb-6'
                      : ' h-12 w-[340px] px-3  text-base rounded-lg outline-none border border-gray-input_radius mb-3 sm:mb-6'
                  }
                  {...formik.getFieldProps('type_eng')}
                >
                  <option hidden>Type</option>
                  {categories.length &&
                    categories.map((el) => (
                      <option value={el.id} key={el.id}>
                        {el.category_en}
                      </option>
                    ))}
                </select>
                {formik.touched.type_eng && formik.errors.type_eng ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.type_eng}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-14 gap-y-3">
              {addedDate.length > 0 &&
                addedDate.map((el) => {
                  return (
                    <div key={el.id}>
                      <label>{el.attribute_en}</label>
                      <div className=" w-[340px] h-[48px] border rounded-lg border-gray-200 p-1 flex items-center flex-wrap">
                        <ul className="flex flex-wrap gap-2  ">
                          {el.en &&
                            el?.en.map((item, index) => (
                              <li key={index}>
                                <MFilter>
                                  {item}
                                  <span
                                    className="ml-2 cursor-pointer"
                                    // onClick={() => removeTags()}
                                  >
                                    
                                  </span>
                                </MFilter>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  )
                })}
            </div>

            <div className="relative mt-5">
              <label className="text-base flex flex-col">Status</label>
              <select
                name="status_eng"
                id="status_eng"
                className={
                  formik.touched.status_eng && formik.errors.status_eng
                    ? ' h-12 w-[340px] px-3 text-base rounded-lg outline-none border border-red-600 mb-3 sm:mb-6'
                    : ' h-12 w-[340px] px-3  text-base rounded-lg outline-none border border-gray-input_radius mb-3 sm:mb-6'
                }
                {...formik.getFieldProps('status_eng')}
              >
                <option hidden>Status</option>
                {status.length &&
                  status.map((el) => (
                    <option key={el.id} id={el.id} value={el.id}>
                      {el.status_en}
                    </option>
                  ))}
              </select>
              {formik.touched.status_eng && formik.errors.status_eng ? (
                <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                  {formik.errors.status_eng}
                </span>
              ) : null}
            </div>
          </div>
        </DropDown>
        <DropDown
          dropName="Узбекский"
          imgAlt="dropimg"
          wDrop="12"
          hdrop="9"
          downClick={() => setNavBarDrop2(!navBarDrop2)}
          imgURL={DropImg}
          rotateDelete={navBarDrop2 ? '-rotate-180' : '-rotate-0'}
        >
          <div
            className={
              navBarDrop2 ? 'h-auto overflow-auto pr-5' : 'h-0 overflow-hidden'
            }
          >
            <div className="flex justify-between ">
              <div className="relative">
                <label className="text-base flex flex-col">Narx</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="1 290 000"
                  className={
                    formik.touched.price && formik.errors.price
                      ? '  h-12 w-[340px] text-base rounded-lg p-2 sm:p-4 outline-none border border-red-600 mb-3 sm:mb-6'
                      : '  h-12 w-[340px] text-base rounded-lg p-2 sm:p-4 outline-none border border-gray-input_radius mb-3 sm:mb-6'
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps('price')}
                />
                {formik.touched.price && formik.errors.price ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.price}
                  </span>
                ) : null}
                <span className="absolute top-9 left-[295px]">So'm</span>
              </div>
              <div className="relative">
                <label className="text-base flex flex-col">Chegirma narx</label>
                <input
                  type="number"
                  name="salePrice"
                  id="salePrice"
                  placeholder="1 290 000"
                  className={
                    formik.touched.salePrice && formik.errors.salePrice
                      ? '  h-12 w-[340px] text-base rounded-lg p-2 sm:p-4 outline-none border border-red-600 mb-3 sm:mb-6'
                      : '  h-12 w-[340px] text-base rounded-lg p-2 sm:p-4 outline-none border border-gray-input_radius mb-3 sm:mb-6'
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps('salePrice')}
                />
                {formik.touched.salePrice && formik.errors.salePrice ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.salePrice}
                  </span>
                ) : null}
                <span className="absolute top-9 left-[295px]">So'm</span>
              </div>

              <div className="relative">
                <label className="text-base flex flex-col">Mahsulot turi</label>
                <select
                  name="type_uz"
                  id="type_uz"
                  className={
                    formik.touched.type_uz && formik.errors.type_uz
                      ? ' h-12 w-[340px] px-3 text-base rounded-lg outline-none border border-red-600 mb-3 sm:mb-6'
                      : ' h-12 w-[340px] px-3  text-base rounded-lg outline-none border border-gray-input_radius mb-3 sm:mb-6'
                  }
                  {...formik.getFieldProps('type_uz')}
                >
                  <option hidden >Turi</option>
                  {categories.length &&
                    categories.map((el) => (
                      <option value={el.id} key={el.id}>
                        {el.category_uz}
                      </option>
                    ))}
                </select>
                {formik.touched.type_uz && formik.errors.type_uz ? (
                  <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                    {formik.errors.type_uz}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-14 gap-y-3">
              {addedDate.length > 0 &&
                addedDate.map((el) => {
                  return (
                    <div key={el.id}>
                      <label>{el.attribute_uz}</label>
                      <div className=" w-[340px] h-[48px] border rounded-lg border-gray-200 p-1 flex items-center flex-wrap">
                        <ul className="flex flex-wrap gap-2  ">
                          {el.uz &&
                            el?.uz.map((item, index) => (
                              <li key={index}>
                                <MFilter>
                                  {item}
                                  <span
                                    className="ml-2 cursor-pointer"
                                    // onClick={() => removeTags()}
                                  >
                                    
                                  </span>
                                </MFilter>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  )
                })}
            </div>

            <div className="relative mt-5">
              <label className="text-base flex flex-col">Status</label>
              <select
                name="status_uz"
                id="status_uz"
                className={
                  formik.touched.status_uz && formik.errors.status_uz
                    ? ' h-12 w-[340px] px-3 text-base rounded-lg outline-none border border-red-600 mb-3 sm:mb-6'
                    : ' h-12 w-[340px] px-3  text-base rounded-lg outline-none border border-gray-input_radius mb-3 sm:mb-6'
                }
                {...formik.getFieldProps('status_uz')}
              >
                <option hidden >Status</option>
                {status.length &&
                  status.map((el) => (
                    <option key={el.id} id={el.id} value={el.id}>
                      {el.status_uz}
                    </option>
                  ))}
              </select>
              {formik.touched.status_uz && formik.errors.status_uz ? (
                <span className="text-red-600 text-xs absolute -bottom-1 sm:bottom-1 left-2">
                  {formik.errors.status_uz}
                </span>
              ) : null}
            </div>
          </div>
        </DropDown>

        <div className=" flex justify-center gap-8">
          <MButton BType="reject" type="button">
            Отменить
          </MButton>
          <MButton BType="next" type="submit">
            Добавить
          </MButton>
        </div>
      </form>

      {/* Type modal */}

      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="flex justify-between">
          <h2 className="text-2xl text-addProductColor font-bold">
            Добавить атрибуть
          </h2>
          <button onClick={() => setShowModal(false)} className="rounded-md">
            <img src={Close} width={25} height={25} alt={'close_image'} />
          </button>
        </div>
        <form className="mt-6" autoComplete="off" onSubmit={handleSubmit}>
          <label className="flex flex-col">
            Тип атрибуты
            <select
              ref={selectOnce}
              className="w-[330px] h-12 rounded-lg border border-gray-200 outline-none "
              name="select"
            >
              {data.map((datas) => (
                <option
                  value={datas.attribute_ru}
                  id={datas.id}
                  key={datas.id}
                  name={datas.id}
                >
                  {datas.attribute_ru}
                </option>
              ))}
            </select>
          </label>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-[#F2F2F2] w-72 py-3 rounded-xl text-russuanColor font-medium text-lg"
            >
              Отменить
            </button>
            <button
              type="submit"
              className="bg-russuanColor w-72 py-3 ml-8 rounded-xl text-[#fff] font-medium text-lg"
            >
              {subLoading ? loaderButton : 'Сохранить'}
            </button>
          </div>
        </form>
      </Modal>
      <Toaster position="bottom-right" />
    </div>
  )
}

import { useEffect, useState } from 'react'
import DropDown from '../../../../BaseComponents/DropDown/DropDown'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
// Images
import Drop from '../../../../Assets/Images/HomeContentImg/Drop.svg'
import MButton from '../../../../BaseComponents/MButton/MButton'
const env = process.env.REACT_APP_ALL_API
const token = JSON.parse(window.localStorage.getItem('token'))
export default function AtributPage({ setImg, info }) {
  const [openRu, setOpenRu] = useState(true)
  const [openEn, setOpenEn] = useState(false)
  const [openUz, setOpenUz] = useState(false)
  const [data, setData] = useState([])
  const [countryData, setCountryData] = useState([])
  const [category, setCategory] = useState([])
  const initialValues = {
    name: '',
    enName: '',
    uzName: '',
    ruQuantity: '',
    ruUserInfo: '',
    ruCategory:'',
    enUserInfo: '',
    uzUserInfo: '',
    ruCountry: '',
    uzCountry:'',
    productType: '',
    enProductType:'',
    enCountry:'',
    enCategory:'',
    uzProductType:'',
    uzCategory:'',
  }
  const onSubmit = (values, { resetForm }) => {
    info(false)
    setImg(true)
    resetForm()
    
    const informationResult = {
      name_uz: values.uzName,
      name_ru: values.name,
      name_en: values.enName,
      count: Number(values.ruQuantity),
      about_uz: values.uzUserInfo,
      about_ru: values.ruUserInfo,
      about_en: values.enUserInfo,
      country_id: Number(values.ruCountry),
      manufacturer_id: Number(values.productType),
    }
    window.localStorage.setItem(
      'information',
      JSON.stringify(informationResult),
    )
  }

  const handleClick = () => {
    console.log('Hello world');
  }

  // Manufactory get start
  useEffect(() => {
    axios
      .get(`${env}manufacturers/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res?.data)
      })
  }, [])
  // Manufactory get end
  // Country get start
  useEffect(() => {
    axios
      .get(`${env}countries/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCountryData(res?.data)
      })
  }, [])
  // Country get end
  // Category get start
  useEffect(() => {
    axios
      .get(`${env}categories/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategory(res?.data)
      })
  }, [])
  // Category get end
  
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    productType: Yup.string().required('Required'),
    ruCountry: Yup.string().required('Required'),
    ruUserInfo: Yup.string().required('Required'),
    ruCategory: Yup.string().required('Required'),
    ruQuantity: Yup.number().required('Required'),
    
    enName: Yup.string().required('Required'),
    enProductType: Yup.string().required('Required'),
    enCountry: Yup.string().required('Required'),
    enUserInfo: Yup.string().required('Required'),
    enCategory: Yup.string().required('Required'),
    uzName: Yup.string().required('Required'),
    uzProductType: Yup.string().required('Required'),
    uzCountry: Yup.string().required('Required'),
    uzUserInfo: Yup.string().required('Required'),
    uzCategory: Yup.string().required('Required'),
  })
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })



  return (
    <div>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e)
          formik.values = initialValues
        }}
        className=" flex flex-col"
      >
        <DropDown
          dropName="Русский"
          imgAlt="drop img"
          wDrop="12"
          hdrop="9"
          imgURL={Drop}
          downClick={() => setOpenRu(!openRu)}
          rotateDelete={`${
            openRu ? '-rotate-180 duration-300' : '-rotate-0 duration-300'
          }`}
        >
          <div
            className={`${
              openRu ? 'h-auto overflow-auto pb-8' : 'h-0 overflow-hidden'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <label className="text-base relative flex flex-col w-[346px]">
                Название продукта
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Каркасный басейн Intex прямоуголь.."
                  className={
                    formik.touched.name && formik.errors.name
                      ? ' mt-3 p-4 text-base rounded-lg outline-none border border-red-600'
                      : ' mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name ? (
                  <span className="text-red-600 text-xs absolute -bottom-4  left-2">
                    {formik.errors.name}
                  </span>
                ) : null}
              </label>
              <label className="text-base relative flex flex-col w-[346px]">
                Призводства
                <select
                  name="productType"
                  id="name"
                  className={
                    formik.touched.productType && formik.errors.productType
                      ? ' mt-3 p-4 text-base rounded-lg outline-none border border-red-600'
                      : ' mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                  }
                  {...formik.getFieldProps('productType')}
                >
                  <option>Выберите призводству продукта</option>
                  {data.map((item) => (
                    <option value={item.id} id={item.id} key={item.id}>
                      {item.manufacturer_ru}
                    </option>
                  ))}
                </select>
                {formik.touched.productType && formik.errors.productType ? (
                  <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                    {formik.errors.productType}
                  </span>
                ) : null}
              </label>
              <label className="text-base relative flex flex-col w-[346px]">
                Страна призводства
                <select
                  name="ruCountry"
                  id="name"
                 
                  className={
                    formik.touched.ruCountry && formik.errors.ruCountry
                      ? ' mt-3 p-4 text-base rounded-lg outline-none border border-red-600'
                      : ' mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                  }
                  {...formik.getFieldProps('ruCountry')}
                >
                  <option >Выберите страна призводства</option>
                  {countryData.map((item) => (
                    <option value={item.id} id={item.id} key={item.id} onClick={handleClick} >
                      {item.country_ru}
                    </option>
                  ))}
                </select>
                {formik.touched.ruCountry && formik.errors.ruCountry ? (
                  <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                    {formik.errors.ruCountry}
                  </span>
                ) : null}
              </label>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-base relative flex flex-col w-[65%]">
                Описание продукта
                <textarea
                  rows={5}
                  name="ruUserInfo"
                  id="name"
                  placeholder="Введите Описание продукта"
                  className={
                    formik.touched.ruUserInfo && formik.errors.ruUserInfo
                      ? ' mt-3 p-4 text-base rounded-lg outline-none border border-red-600'
                      : ' mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps('ruUserInfo')}
                />
                {formik.touched.ruUserInfo && formik.errors.ruUserInfo ? (
                  <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                    {formik.errors.ruUserInfo}
                  </span>
                ) : null}
              </label>
              <div>
                <label className="text-base relative flex flex-col w-[346px]">
                  Категория
                  <select
                    name="ruCategory"
                    id="name"
                    className={
                      formik.touched.ruCategory && formik.errors.ruCategory
                        ? ' p-4 text-base rounded-lg outline-none border border-red-600'
                        : ' p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                    }
                    {...formik.getFieldProps('ruCategory')}
                  >
                    <option >Выберите категория продукта</option>
                    {category.map((item) => (
                      <option id={item.id} key={item.id}>
                        {item.category_ru}
                      </option>
                    ))}
                  </select>
                  {formik.touched.ruCategory && formik.errors.ruCategory ? (
                    <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                      {formik.errors.ruCategory}
                    </span>
                  ) : null}
                </label>
                <label className="text-base relative flex flex-col w-[346px] mt-4 ">
                  Количество
                  <input
                    type="number"
                    name="ruQuantity"
                    id="name"
                    placeholder="Введите количество продукта"
                    className={
                      formik.touched.ruQuantity && formik.errors.ruQuantity
                        ? ' p-4 text-base rounded-lg outline-none border border-red-600'
                        : ' p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                    }
                    minLength="3"
                    maxLength="25"
                    {...formik.getFieldProps('ruQuantity')}
                  />
                  {formik.touched.ruQuantity && formik.errors.ruQuantity ? (
                    <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                      {formik.errors.ruQuantity}
                    </span>
                  ) : null}
                </label>
              </div>
            </div>
          </div>
        </DropDown>
        <DropDown
          dropName="English"
          imgAlt="drop img"
          wDrop="12"
          hdrop="9"
          imgURL={Drop}
          downClick={() => setOpenEn(!openEn)}
          rotateDelete={`${
            openEn ? '-rotate-180 duration-300' : '-rotate-0 duration-300'
          }`}
        >
          <div
            className={`${
              openEn ? 'h-auto overflow-auto pb-8' : 'h-0 overflow-hidden'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <label className="text-base relative flex flex-col w-[346px]">
                Product's name
                <input
                  type="text"
                  name="enName"
                  id="name"
                  placeholder="Frame pool Intex rectangular.."
                  className={
                    formik.touched.enName && formik.errors.enName
                      ? ' mt-3 p-4 text-base rounded-lg outline-none border border-red-600'
                      : ' mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps('enName')}
                />
                {formik.touched.enName && formik.errors.enName ? (
                  <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                    {formik.errors.uzName}
                  </span>
                ) : null}
              </label>
              <label className="text-base relative flex flex-col w-[346px]">
                Production
                <select
                  name="enProductType"
                  id="name"
                  className={
                    formik.touched.enProductType && formik.errors.enProductType
                      ? ' mt-3 p-4 text-base rounded-lg outline-none border border-red-600'
                      : ' mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                  }
                  {...formik.getFieldProps('enProductType')}
                >
                  <option>Choose a product</option>
                  {data.map((item) => (
                    <option key={item.id} id={item.id}>
                      {item.manufacturer_en}
                    </option>
                  ))}
                </select>
                {formik.touched.enProductType && formik.errors.enProductType ? (
                  <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                    {formik.errors.enProductType}
                  </span>
                ) : null}
              </label>
              <label className="text-base relative flex flex-col w-[346px]">
                Country of origin
                <select
                  name="enCountry"
                  id="name"
                  className={
                    formik.touched.enCountry && formik.errors.enCountry
                      ? ' mt-3 p-4 text-base rounded-lg outline-none border border-red-600'
                      : ' mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                  }
                  {...formik.getFieldProps('enCountry')}
                >
                  <option>Select country of origin</option>
                  {countryData.map((item) => (
                    <option id={item.id} key={item.id} >
                      {item.country_en}
                    </option>
                  ))}
                </select>
                {formik.touched.enCountry && formik.errors.enCountry ? (
                  <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                    {formik.errors.enCountry}
                  </span>
                ) : null}
              </label>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-base relative flex flex-col w-[65%]">
                Product description
                <textarea
                  rows={5}
                  name="enUserInfo"
                  id="name"
                  placeholder="Enter product description"
                  className={
                    formik.touched.enUserInfo && formik.errors.enUserInfo
                      ? ' mt-3 p-4 text-base rounded-lg outline-none border border-red-600'
                      : ' mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps('enUserInfo')}
                />
                {formik.touched.enUserInfo && formik.errors.enUserInfo ? (
                  <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                    {formik.errors.enUserInfo}
                  </span>
                ) : null}
              </label>
              <div>
                <label className="text-base relative flex flex-col w-[346px]">
                  Category
                  <select
                    name="enCategory"
                    id="name"
                    className={
                      formik.touched.enCategory && formik.errors.enCategory
                        ? ' mt-3 p-4 text-base rounded-lg outline-none border border-red-600'
                        : ' mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                    }
                    {...formik.getFieldProps('enCategory')}
                  >
                    <option>Select category</option>
                    {category.map((item) => (
                      <option id={item.id} key={item.id}>
                        {item.category_en}
                      </option>
                    ))}
                  </select>
                  {formik.touched.enCategory && formik.errors.enCategory ? (
                    <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                      {formik.errors.enCategory}
                    </span>
                  ) : null}
                </label>
                <label className="text-base relative flex flex-col w-[346px] mt-4">
                  Quantity
                  <input
                    type="number"
                    name="ruQuantity"
                    id="name"
                    placeholder="Enter quantity of product"
                    className={
                      formik.touched.ruQuantity && formik.errors.ruQuantity
                        ? '  p-4 text-base rounded-lg outline-none border border-red-600'
                        : '  p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                    }
                    minLength="3"
                    maxLength="25"
                    {...formik.getFieldProps('ruQuantity')}
                  />
                  {formik.touched.ruQuantity && formik.errors.ruQuantity ? (
                    <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                      {formik.errors.ruQuantity}
                    </span>
                  ) : null}
                </label>
              </div>
            </div>
          </div>
        </DropDown>
        <DropDown
          dropName="O’zbekcha"
          imgAlt="drop img"
          wDrop="12"
          hdrop="9"
          imgURL={Drop}
          downClick={() => setOpenUz(!openUz)}
          rotateDelete={`${
            openUz ? '-rotate-180 duration-300' : '-rotate-0 duration-300'
          }`}
        >
          <div
            className={`${
              openUz ? 'h-auto overflow-auto pb-8' : 'h-0 overflow-hidden'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <label className="text-base relative flex flex-col w-[346px]">
                Mahsulot nomi
                <input
                  type="text"
                  name="uzName"
                  id="name"
                  placeholder="Ramkali basseyn Intex to'rtburchak.."
                  className={
                    formik.touched.uzName && formik.errors.uzName
                      ? ' mt-3 p-4 text-base rounded-lg outline-none border border-red-600'
                      : ' mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps('uzName')}
                />
                {formik.touched.uzName && formik.errors.uzName ? (
                  <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                    {formik.errors.uzName}
                  </span>
                ) : null}
              </label>
              <label className="text-base relative flex flex-col w-[346px]">
                Ishlab chiqaruvchi
                <select
                  name="uzProductType"
                  id="name"
                  className={
                    formik.touched.uzProductType && formik.errors.uzProductType
                      ? ' mt-3 p-4 text-base rounded-lg outline-none border border-red-600'
                      : ' mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                  }
                  {...formik.getFieldProps('uzProductType')}
                >
                  <option>Ishlab chiqaruvchini tanlang</option>
                  {data.map((item) => (
                    <option key={item.id} id={item.id}>
                      {item.manufacturer_uz}
                    </option>
                  ))}
                </select>
                {formik.touched.uzProductType && formik.errors.uzProductType ? (
                  <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                    {formik.errors.uzProductType}
                  </span>
                ) : null}
              </label>
              <label className="text-base relative flex flex-col w-[346px]">
                Ishlab chiqaruvchi mamlakat
                <select
                  name="uzCountry"
                  id="name"
                  className={
                    formik.touched.uzCountry && formik.errors.uzCountry
                      ? ' mt-3 p-4 text-base rounded-lg outline-none border border-red-600'
                      : ' mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                  }
                  {...formik.getFieldProps('uzCountry')}
                >
                  <option>Ishlab chiqaruvchi davlat</option>
                  {countryData.map((item) => (
                    <option id={item.id} key={item.id}>
                      {item.country_uz}
                    </option>
                  ))}
                </select>
                {formik.touched.uzCountry && formik.errors.uzCountry ? (
                  <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                    {formik.errors.uzCountry}
                  </span>
                ) : null}
              </label>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-base relative flex flex-col w-[65%]">
                Mahsulot ta'rifi
                <textarea
                  rows={5}
                  name="uzUserInfo"
                  id="name"
                  placeholder="Mahsulot ta'rifini yozing"
                  className={
                    formik.touched.uzUserInfo && formik.errors.uzUserInfo
                      ? ' mt-3 p-4 text-base rounded-lg outline-none border border-red-600'
                      : ' mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                  }
                  minLength="3"
                  maxLength="25"
                  {...formik.getFieldProps('uzUserInfo')}
                />
                {formik.touched.uzUserInfo && formik.errors.uzUserInfo ? (
                  <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                    {formik.errors.uzUserInfo}
                  </span>
                ) : null}
              </label>
              <div>
                <label className="text-base relative flex flex-col w-[346px]">
                  Kategoriya
                  <select
                    name="uzCategory"
                    id="name"
                    className={
                      formik.touched.uzCategory && formik.errors.uzCategory
                        ? ' mt-3 p-4 text-base rounded-lg outline-none border border-red-600'
                        : ' mt-3 p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                    }
                    {...formik.getFieldProps('uzCategory')}
                  >
                    <option>Kategoriya turlari</option>
                    {category.map((item) => (
                      <option id={item.id} key={item.id}>
                        {item.category_uz}
                      </option>
                    ))}
                  </select>
                  {formik.touched.uzCategory && formik.errors.uzCategory ? (
                    <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                      {formik.errors.uzCategory}
                    </span>
                  ) : null}
                </label>
                <label className="text-base relative flex flex-col w-[346px] mt-4">
                  Miqdori
                  <input
                    type="number"
                    name="ruQuantity"
                    id="name"
                    placeholder="Mahsulot miqdorini kiriting"
                    className={
                      formik.touched.ruQuantity && formik.errors.ruQuantity
                        ? '  p-4 text-base rounded-lg outline-none border border-red-600'
                        : '  p-4 text-base rounded-lg outline-none border border-gray-input_radius'
                    }
                    minLength="3"
                    maxLength="25"
                    {...formik.getFieldProps('ruQuantity')}
                  />
                  {formik.touched.ruQuantity && formik.errors.ruQuantity ? (
                    <span className="text-red-600 text-xs absolute -bottom-4 left-2">
                      {formik.errors.ruQuantity}
                    </span>
                  ) : null}
                </label>
              </div>
            </div>
          </div>
        </DropDown>
        <div className="flex items-center justify-center space-x-5 mt-6 pb-6">
          <MButton BType="reject" type="reset">
            Отменить
          </MButton>
          <MButton BType="next" type="submit">
            Submit
          </MButton>
        </div>
      </form>
    </div>
  )
}

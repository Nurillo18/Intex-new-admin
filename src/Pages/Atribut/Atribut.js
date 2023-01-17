import React from 'react'
import THead from '../../components/THead/THead'
import TBody from '../../components/TBody/TBody'
import { Link } from 'react-router-dom'
import AtributeProducts from './AtributeTable'
import MButton from '../../BaseComponents/MButton/MButton'
// Styles
import '../../BaseComponents/MButton/MButton.css'
// Images
import HomeImg from '../../Assets/Images/HeaderImgs/HomeImg.svg'
import { useSelector, useDispatch } from 'react-redux'
import { searchProduction } from '../../redux/siteDataReducer'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const data = [
  {
    title: 'ID',
    image: false,
    style: 'w-[80px] justify-center',
  },
  {
    title: 'Название товара',
    image: false,
    style: 'w-[300px] ',
  },
  {
    title: 'Вид формы',
    image: false,
    style: 'w-[190px]',
  },
  {
    title: 'Значение атрибута',
    image: false,
    style: 'w-[480px]',
  },
]

export default function Home() {
  const search = useSelector((state) => state.data.search)
  const [products, setProducts] = useState([])
  const [limit, setLimit] = React.useState(5)
  const [totalPage, setTotalpage] = React.useState(0)
  const [atr, setAtr] = React.useState([])
  const [page, setPage] = React.useState(0)

  const dispatch = useDispatch()

  // ----------------------------------------

  useEffect(() => {
    axios
      .get(
        'https://intex-shop-production.up.railway.app/api/attributes?page=0&limit=10',
      )
      .then((res) => {
        setAtr(res?.data.result)
      })
      .catch((err) => console.error(err))
      .finally(() => {})
  }, [limit, page])

  const vitalData = atr.map((item) => {
    return [
      {
        title: item.id,
        style: 'w-[80px] flex justify-center',
      },
      {
        title: item.attribute_en,
        style: 'w-[300px] flex pl-3 items-center',
      },
      {
        title: item.view,
        style: 'w-[190px] flex pl-3 items-center',
      },
      {
        title: item.en,
        style: 'w-[480px] flex pl-3 items-center',
      },
    ]
  })

  const handleChange = (e) => {
    const { name, checked } = e.target

    if (name === 'allSelect') {
      let tempUser = vitalData.map((user) => {
        return { ...user, isChecked: checked }
      })
      setProducts(tempUser)
    } else {
      let tempUser = vitalData.map((user) =>
        user.username === name ? { ...user, isChecked: checked } : user,
      )

      setProducts(tempUser)
    }
  }
  return (
    <div>
      <div className="bg-white flex items-center w-full pt-1.5 pb-1.5 px-8">
        <Link className="flex items-center" to={'/'}>
          <img src={HomeImg} alt="Home Img" width="16" height="16" />
        </Link>
        <span className="ml-2.5 text-navSubColor ">/</span>
        <Link to="/atribut">
          <h2 className="font-normal text-navSubColor text-xs ml-2.5">
            Атрибуты
          </h2>
        </Link>
      </div>
      <div className="pt-6 pb-8 px-homeContentPadding h-[100vh] ">
        <div className=" mb-4">
          <h2 className="text-navBarColor font-bold leading-8 text-2xl mb-4">
            Атрибуты
          </h2>
          <div className="bg-white py-3 px-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center">
              <MButton BType="filter bg-filterBg" type="button">
                Фильтр
              </MButton>
              <input
                id="homeSearch"
                className="py-3 ml-4 w-homeInpWidth outline-none pl-9 pr-3 rounded-xl bg-headerInpBg"
                type="text"
                placeholder="Поиск товара"
                autoComplete="off"
                value={search}
                onChange={(e) => {
                  dispatch(searchProduction(e.target.value))
                }}
              />
            </div>
            <div className="flex items-center">
              <strong className="font-semibold text-base text-homeColor mr-2.5">
                Сортировка
              </strong>
              <div className="w-homeSortWidth cursor-pointer mr-6 flex items-center justify-between bg-headerInpBg p-3 rounded-xl">
                <span className="font-medium text-sm text-homeSortWrap">
                  По А-Я
                </span>
                <svg
                  width="24"
                  height="22"
                  viewBox="0 0 24 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 11L12 14L15 11"
                    stroke="#04009A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <Link to="/addAtribut" className="add bg-filterBg" type="button">
                Добавить
              </Link>
            </div>
          </div>
        </div>
        {/* <AtributeProducts /> */}
        <table className="w-full">
          <THead data={data}></THead>
          <TBody vitalData={vitalData}></TBody>
        </table>
      </div>
    </div>
  )
}

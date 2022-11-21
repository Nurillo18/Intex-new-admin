/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      margin:{
        navBarIcon:'14px',
      },
      padding:{
        headerInpPl:'38px',
        headerPaddingTopBottom:'19px',
        headerPaddingX:'30px',
        homeContentPadding:'30px',
        selectInp:"17.5px",
      },
      width:{
        logoWidth:'180px',
        loginLogoWidth:'240px',
        sitebarWidth:'253px',
        supportWidth:'150px',
        headerInputWidth:'260px',
        homeInpWidth:'284px',
        homeSortWidth:'170px',
        addProductListWidth:'65%',
        submitBtnsWidth:'331px',
      },
      height:{
        logoHeight:'17px',
        logoLoginHeight:'22px',
        addProductHeight:'3px',
      },
      backgroundColor:{
        loginBtn:"#2B3D90",
        navbarItemActive:"rgba(55, 125, 255, 0.05)",
        modalFixedBg:"rgba(0, 0, 0, 0.15)",
        languageBg:"#F2F2F2",
        newBtnBg:"#0BCC23",
        saleBtnBg:"#FF5C5C",
        xitProductBtnBg:"#FF3A3A",
        defaultBtnBg:"#F2F2F2",
        recomendBtnBg:"#22B0F8;",
        addProductSizeBtnBg:"#9CDAFF",
        headerInpBg:"#FBFBFC",
        filterBg:'#109ef4',
        resetBtn:'#F2F2F2',
        submitBtnBg:'#2B3D91',
      },
      colors:{
        addProductColor:"#24283A",
        addProductLinks:"#D8D8D8",
        forgotPasswordColor:'#4F46E5',
        inputPleacholderColor:'#B4B6B8',
        ruUzUsColors:"#2B3D91",
        navBarColor:"#464A4D",
        navSubColor:'#B9B9B9',
        supportColor:'#109EF4',
        homeColor:'#333',
        homeSortWrap:'#666',
        russuanColor:"#2B3D91",
        
      },
      lineHeight:{
        lead:'150%',
      },
      borderRadius:{
        headerNotif:'50%',
      },
      translate:{
        bottom:"60px",
      }
    },
  },
  plugins: [],
}

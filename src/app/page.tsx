import React from 'react'
import Header from './componets/Header'
import Products from './componets/Products'

const page = () => {
  return (
    <div>
      <img className='bg-img' src="https://www.canva.com/design?create&type=TACUOfRHN_8&template=EAGEX0F-kzI&category=tACZCuMaFhc&analyticsCorrelationId=4f523d7a-2c1b-4ece-89db-fa2ebb9b1086" alt="" />
      <Header />
      <Products />
    </div>
  )
}

export default page
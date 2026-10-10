import React from 'react'

const Card = ({title,price,category="NO"}) => {
  return (
    <>
    <h1 className='text-red-600'>Card</h1>
    <h2>title:{title}</h2>
    <p>price:{price}</p>
    <p>category:{category}</p>
    </>
  )
}

const ProductCard = (props) => {
  return (
    <>
    <h1 className='text-red-600'>ProductCard</h1>
    <h2>title:{props.title}</h2>
    <p>price:{props.price}</p>
    </>
  )
}

const SaleCard = ({children}) => {
  return (
    <>

    <h1>Salecard</h1>
    {/* <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl cursor-pointer">
  <img className="w-full h-100 object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-75" src="src/assets/hero.png" alt="Sunset in the mountains"/>
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p className="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
  </div>
</div> */}
{children}
    </>
  )
}


export default Card
export {ProductCard,SaleCard}
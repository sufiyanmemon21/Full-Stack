import React from 'react'
import Card, { ProductCard, SaleCard } from './components/Card'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Dashboard from './page/Dashboard'
import DashboardLayout from './layout/DashboardLayout'
import Contact from './page/Contact'
import ProductDetail from './page/Productdetail'
import AddProductPage from './page/addproduct'
import Products from './page/Prouductlist'
import Login from './page/login'
import Signup from './page/Signup'
import Form from './page/form'

const App = () => {
   return ( 

    <Routes>

<Route path={'/'} element={<Form/>}/>
<Route path={'/dashboard'} element={<DashboardLayout/>}>
<Route index element={<Dashboard/>}/>
<Route path={'contact'} element={<Contact/>}/>
<Route path={'Productdetail'} element={<ProductDetail/>}/>
<Route path={'addProduct'} element={<AddProductPage/>}/>
<Route path={'Productlist'} element={<Products/>}/>
<Route path="/dashboard/login" element={<Login />} />
<Route path="/dashboard/Signup" element={<Signup />} />



<Route path={"productdetail/2/:id"} element={<ProductDetail />} />


</Route>


</Routes>
    // <div className="flex min-h-svh flex-col items-center justify-center">
    //   <Button>Click me</Button>
    // </div>
  )
}


export default App
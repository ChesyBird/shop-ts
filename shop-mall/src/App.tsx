
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './layouts/Header'
import ProductList from './products/ProductList'
import ProductProvider from './context/ProductProvider'
import ProductDetail from './products/ProductDetail'
import AddProduct from './products/AddProduct'
import CartProvider from './context/CartProvider'
import Cart from './products/Cart'
import UserProvider from './context/UserProvider'
import SignUp from './users/SignUp'
import SignIn from './users/SignIn'
import AdminPage from './users/AdminPage'

function App() {

  return (
    <>
      <section className='app'>
      {/* ProductProvider 내부의 컴포넌트는 children */}
        <UserProvider>
        <ProductProvider>
          <CartProvider>
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<ProductList />} />
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/product/new' element={<AddProduct />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/admin' element={<AdminPage />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
            </Routes>
          </main>
        </BrowserRouter>
          </CartProvider>
        </ProductProvider>
        </UserProvider>
      </section>
    </>
  )
}

export default App

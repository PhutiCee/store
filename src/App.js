import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import AddProduct from './components/AddProduct';
import { ProductsProviderWithBoundary } from './context/ProductsContext';
import { CartContextProvider } from './context/CartContext';
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import { AuthProvider } from './context/AuthContext';
import Cart from './components/Cart';
import { Cashout } from './components/Cashout';
import ProductDetails from './components/ProductDetails';

function App() {

  return (
    <AuthProvider>
      <ProductsProviderWithBoundary>
        <CartContextProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Main />} />
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="cart" element={<Cart />} />
              <Route path="cashout" element={<Cashout />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </ProductsProviderWithBoundary>
    </AuthProvider>
  );
}

export default App;

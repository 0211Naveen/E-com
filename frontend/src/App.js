
import { Routes, Route } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import Cookies from 'js-cookie';


import Home from './components/home';
import Register from './components/register';
import Login from './components/login';
import Addproducts from './components/Addproducts';
import Display from './components/display';
import Cart from './components/cart';
import Order from './components/order';
import Orderpdf from './components/orderpdf';
import ProtectedRoute from './components/protectedroute';
import Wishlist from './components/wishlist';
import Navbar from './components/navbar';
import ProductDetails from './components/hi';
import Admincustomers from './components/admincustomers';
import Admindisplay from './components/admindisplay';
import Admineditproducts from './components/admineditproducts';
import AdminDashboard from './components/dash';
import Adminpending from './components/adminpending';
import Adminorders from './components/adminorders';
import Blog from './components/blog';
import UserDashboard from './components/userdashboard'
import Adminimages from './components/adminimages';
import Group from './components/group';
import Show from './components/show';
// import AdminRegister from './components/adminregister';
import AdminLogin from './components/adminlogin';
import Storereg from './components/storereg';
import Storelog from './components/storelog';
import Storeaddproducts from './components/storeaddproducts';
import Storeeditproducts from './components/storeeditproducts';
import Storedisplay from './components/storedisplay';
import Storeimage from './components/storeimg';
import StoreProtectedRoute from './components/protectstore';
import AdminProtectedRoute from './components/adminproduct';
import Side from './components/side';
import About from './components/about';
import Contact from './components/contact';









export const userContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from cookies", error);
        Cookies.remove('user');
      }
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    Cookies.set('user', JSON.stringify(userData), { expires: 7 });
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find((item) => item._id === product._id);
      return productInCart
        ? prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        : [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: Math.max(newQuantity, 1) } : item
      )
    );
  };

  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item._id === product._id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== productId));
  };
  const resetCart = () => setCart([]); // Reset cart count to zero


  return (
    <userContext.Provider value={{ user, setUser: loginUser }}>

      <Routes>

        <Route path="/navbar" element={<Navbar cartCount={cart.length} wishlistCount={wishlist.length} resetCart={resetCart} />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />

        {/* .env */}
        <Route path="/order" element={<Order />} />
        <Route path="/orderpdf" element={<Orderpdf />} />
        {/* .env  */}
        <Route path="/hi/:id" element={<ProductDetails addToCart={addToCart} updateQuantity={updateQuantity} cart={cart} addToWishlist={addToWishlist} />} />

        {/* .env */}
        <Route path="/display" element={<ProtectedRoute><Display addToCart={addToCart} /></ProtectedRoute>} />
        {/* .env  */}
        <Route path="/cart" element={<ProtectedRoute><Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} /></ProtectedRoute>} />
        {/* .env  */}
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} /></ProtectedRoute>} />
        <Route path="/blog" element={<Blog />} />
       {/* .env  */}
        <Route path="/userdashboard" element={<UserDashboard />} />



        {/* admin  */}
        {/* .env */}
        <Route path="/dash" element={<AdminProtectedRoute> <AdminDashboard /> </AdminProtectedRoute>} />
        {/* .env  */}
        <Route path="/admincustomers" element={<AdminProtectedRoute> <Admincustomers /> </AdminProtectedRoute>} />
        {/* .env  */}
        <Route path="/displayproduct" element={<AdminProtectedRoute> <Admindisplay /> </AdminProtectedRoute>} />
        {/* .env  */}
        <Route path="/admineditproducts/:productId" element={<AdminProtectedRoute> <Admineditproducts /> </AdminProtectedRoute>} />
        {/* .env  */}
        <Route path="/adminpending" element={<AdminProtectedRoute> <Adminpending /> </AdminProtectedRoute>} />
        {/* .env  */}
        <Route path="/adminorders" element={<AdminProtectedRoute> <Adminorders /> </AdminProtectedRoute>} />
        {/* .env  */}
        <Route path="/adminimages" element={<AdminProtectedRoute> <Adminimages /> </AdminProtectedRoute>} />
        {/* .env  */}
        <Route path="/group" element={<AdminProtectedRoute> <Group /> </AdminProtectedRoute>} />
        {/* .env  */}
        <Route path="/Addproducts" element={<AdminProtectedRoute> <Addproducts /> </AdminProtectedRoute>} />

        {/* .env  */}
        {/* <Route path="/adminreg" element={<AdminRegister />} /> */}
        {/* .env  */}
        <Route path="/adminlog" element={<AdminLogin />} />



        {/* store admin */}
        <Route path="/show" element={<StoreProtectedRoute> <Show /> </StoreProtectedRoute>} />
        <Route path="/storereg" element={<Storereg />} />
        <Route path="/storelog" element={<Storelog />} />
        <Route path="/storeaddproducts" element={<StoreProtectedRoute> <Storeaddproducts /> </StoreProtectedRoute>} />
        <Route path="/storedisplay" element={<StoreProtectedRoute> <Storedisplay /> </StoreProtectedRoute>} />
        <Route path="/storeedit/:productId" element={<StoreProtectedRoute> <Storeeditproducts /> </StoreProtectedRoute>} />
        <Route path="/storeimgage" element={<StoreProtectedRoute> <Storeimage /> </StoreProtectedRoute>} />

        <Route path="/side" element={<Side />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </userContext.Provider>
  );


}

export default App;


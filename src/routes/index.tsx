import { Route, Routes } from 'react-router-dom';
import CreateProduct from '../pages/createProduct';
import CreateProductDetails from '../pages/createProductDetails';
import Products from '../pages/products';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/*' element={<h1>Paremo</h1>} />
      <Route path='/products' element={<Products />} />
      <Route path='/products/create' element={<CreateProduct />} />
      <Route path='/products/:id/details/create' element={<CreateProductDetails />} />
    </Routes>
  );
}

export default AppRoutes;

import './App.css';
import {RequestProduct} from "./components/requestProduct";
import {FetchProductData} from "./components/fetchProductData";
import {CreateCart} from "./components/createCart";
import {AddItemToCart} from "./components/addItemToCart";
import {CustomerInformation} from "./components/customerInformation";
import {SelectShippingMethod} from "./components/selectShippingMethod";
import {Payment} from "./components/payment";

function App() {
  return (
    <div className="app">
      <h1 style={{ textAlign: "center" }}>Rye Quickstart</h1>
      <RequestProduct />
      <FetchProductData />
      <CreateCart />
      <AddItemToCart />
      <CustomerInformation />
      <SelectShippingMethod />
      <Payment />
    </div>
  );
}

export default App;

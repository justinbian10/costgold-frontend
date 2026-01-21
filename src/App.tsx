import { useState } from 'react'
import ProductForm from "./components/ProductForm.tsx";
import PurchaseValueDisplay from "./components/PurchaseValueDisplay.tsx";

import CostgoldClient from "./helpers/CostgoldClient.tsx";

function App() {
  const [price, setPrice] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [isPriceLoading, setIsPriceLoading] = useState(false);

  const handlePriceQuery = async (event) => {
	const inputBuyPrice = event.target.price.value != "" ? parseFloat(event.target.price.value) : 0;
	if (Number.isNaN(inputBuyPrice)) {
		setPrice(0);
		return
	}
	setBuyPrice(inputBuyPrice);

  	const client = new CostgoldClient(import.meta.env.VITE_BASE_URL);
  	const response = client.getPrice(event.target.product.value);
	setIsPriceLoading(true);
	const newPrice = (await response).Price;
	setIsPriceLoading(false);
	setPrice(newPrice);
  }
  
  const displayPrice = () => {
	if (isPriceLoading) {
		return "Loading";
	}
	if (price === 0) {
		return ""
	}
	return <div>Pure Sell Price: <span className="font-semibold text-sky-700">${price.toFixed(2)}</span></div>;
  }

  return (
    <>
    	<div className="flex items-center flex-col mx-auto" >
		<ProductForm handlePriceQuery={handlePriceQuery}/>
		<p>{displayPrice()}</p>
		<PurchaseValueDisplay price={price} buyPrice={buyPrice} />
	</div>
    </>
  )
}

export default App

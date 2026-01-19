import { useState, useEffect } from 'react'

function PurchaseValueDisplay({price, buyPrice}) {
	//const [buyPrice, setBuyPrice] = useState(0);
	const [pureStatusPercent, setPureStatusPercent] = useState(.75);

	const calculateBreakeven = (feePercent) => {
		const pureFee = 0.01 * parseFloat(pureStatusPercent);
		const priceAfterPure = price - (price * pureFee)
		console.log(priceAfterPure)
		const maxBuyPrice = priceAfterPure / (1 + (0.01 * feePercent))
		return `$${(maxBuyPrice).toFixed(2)}`;
	}

	const calculatePercentage = () => {

	}

	const handleStatusChange = (event) => {
		setPureStatusPercent(event.target.value);
	}

	//const handleBuyPriceChange = (event) => {
	//	setBuyPrice(event.target.value);
	//}

	const displayPaymentSummary = (paymentName, feePercent) => {
		return (
			<>
				<h3 className="col-span-2">{paymentName}</h3>
				<p className="border text-center w-full">{calculateBreakeven(feePercent)}</p>
				<p className="text-center">{calculatePercentage()}</p>
			</>
		)
	}

	return (
		<div className="grid grid-cols-6 gap-2 p-10 w-full">
			<PaymentSummary price={price} buyPrice={buyPrice} paymentName="0%" feePercent="0" pureStatusPercent={pureStatusPercent} />
			<PaymentSummary price={price} buyPrice={buyPrice} paymentName="1%" feePercent="-1" pureStatusPercent={pureStatusPercent} />
			<PaymentSummary price={price} buyPrice={buyPrice} paymentName="1.8% (Citi AA Biz + PBP*)" feePercent="-1.8" pureStatusPercent={pureStatusPercent} />
			<PaymentSummary price={price} buyPrice={buyPrice} paymentName="2%" feePercent="-2" pureStatusPercent={pureStatusPercent} />
			<PaymentSummary price={price} buyPrice={buyPrice} paymentName="2.5% (Chase Ink Premier)" feePercent="-2.5" pureStatusPercent={pureStatusPercent} />
			<PaymentSummary price={price} buyPrice={buyPrice} paymentName="5% (Venmo + PBP*)" feePercent="-5" pureStatusPercent={pureStatusPercent} />
			<p className="col-span-2">Pure Status</p>
			<select name="product" className="border text-md appearance-none rounded-sm p-1 col-span-4 flex items-center" onChange={handleStatusChange}>
				<option value=".75">Copper</option>
				<option value=".7">Silver</option>
				<option value=".625">Gold</option>
				<option value=".5">Plum</option>
			</select>

		</div>
	)

			//{displayPaymentSummary("Kasheesh Full Fee*", 2)}
			//{displayPaymentSummary("Citi AA Biz + PBP*", -1.8)}
			//{displayPaymentSummary("Venmo + PBP", -5)}
}


function PaymentSummary({price, buyPrice, paymentName, feePercent, pureStatusPercent}) {
	const [breakeven, setBreakeven] = useState(price);
	const [percent, setPercent] = useState("");
	const [backgroundColor, setBackgroundColor] = useState("bg-white");
	
	const setBackground = (currPercent) => {
		if (currPercent <= -2) {
			setBackgroundColor("bg-red-500");
		} else if (currPercent > -2 && currPercent < 0) {
			setBackgroundColor("bg-red-300");
		} else if (currPercent >= 0 && currPercent < 2) {
			setBackgroundColor("bg-green-300");
		} else if (currPercent >= 2) {
			setBackgroundColor("bg-green-500");
		}
	}

	const floatToPercent = (num) => {
		return (100 * num).toFixed(2);
	}

	useEffect(() => {
		console.log(price);
		const pureFee = pureStatusPercent != "" ? 0.01 * parseFloat(pureStatusPercent) : 0;
		const priceAfterPure = price - (price * pureFee)
		const maxBuyPrice = priceAfterPure / (1 + (0.01 * feePercent))
		setBreakeven(maxBuyPrice);

		const currPercent = floatToPercent(maxBuyPrice / buyPrice - 1);
		setPercent(currPercent);
		setBackground(currPercent);
	}, [pureStatusPercent, price, buyPrice]);

	return (
		<>
			<h3 className="text-center sm:text-left col-span-6 sm:col-span-2">{paymentName}</h3>
			<p className="border text-center w-full col-span-2 sm:col-span-1">{`$${(breakeven).toFixed(2)}`}</p>
			<p className={`border text-center w-full col-span-2 sm:col-span-1 ${backgroundColor}`}>{`${(breakeven - buyPrice).toFixed(2)}`}</p>
			<p className={"border text-right col-span-2 sm:col-span-2 " + backgroundColor}>{percent}%</p>			
		</>
	)
}
export default PurchaseValueDisplay;

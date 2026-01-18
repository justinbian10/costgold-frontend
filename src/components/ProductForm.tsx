function ProductForm({handlePriceQuery}) {

  function handleSubmit(event) {
  	event.preventDefault();
	handlePriceQuery(event);
  }

  return (
	<form onSubmit={handleSubmit} className="p-10 flex gap-4 flex-wrap">
		<div className="basis-[calc(50%-8px)] grow-1 flex flex-col">
			<label htmlFor="price" className="text-md">Purchase Price:</label>
			<input type="text" id="price" name="price" className="border text-md appearance-none rounded-sm p-1 basis-full" />
		</div>
		<label htmlFor="product" className="basis-[calc(50%-8px)] grow-1 flex flex-col">
			Product:
			<select name="product" className="border text-md appearance-none rounded-sm p-1 basis-full">
				<option value="hi">Hi</option>
				<option value="one-oz-fortuna">1oz Fortuna</option>
				<option value="one-oz-koi">1oz Koi</option>
				<option value="one-oz-rand">1oz Rand</option>
				<option value="one-oz-any">1oz Any</option>
				<option value="one-oz-maple-leaf-26">1oz Maple Leaf 26</option>
				<option value="one-oz-maple-leaf-any">1oz Maple Leaf Any</option>
				<option value="one-oz-buffalo-coin-26">1oz Buffalo Coin 26</option>
				<option value="one-oz-buffalo-coin-any">1oz Buffal Coin Any</option>
				<option value="one-oz-eagle-coin-25">1oz Eagle Coin 26</option>
				<option value="one-oz-eagle-coin-any">1oz Eagle Coin Any</option>
				<option value="50-gram-fortuna">50g Fortuna</option>
				<option value="50-gram-any">50g Any</option>
				<option value="100-gram-fortuna">100g Fortuna</option>
				<option value="100-gram-any">100g Any</option>
			</select>
		</label>
		<div className="flex items-center gap-4 basis-full">
			<div className="flex basis-[calc(50%-8px)] shrink-0 items-center">
				<input type="checkbox" id="executive" name="executive"  className="border ml-1 p-1.5 checked:bg-yellow-300 accent-yellow-300" />
				<label htmlFor="executive" className="ml-1 cursor-pointer">Executive</label>
			</div>
			<button type="submit" className="ml-auto border border-yellow-600 w-[20%] rounded-sm p-1.5 bg-yellow-300 hover:bg-yellow-400 cursor-pointer">Submit</button>
		</div>
	</form>
  )
}

export default ProductForm

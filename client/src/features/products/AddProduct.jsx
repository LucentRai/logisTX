

function AddProduct(){
	return (
		<div className="modal fade" id="addProductModal" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-xl">
				<div className="modal-content">

					<div className="modal-header">
						<h1 className="modal-title" id="addProductModalLabel">Add Product</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>

					<form className="modal-body row g-3 multi-collapse" id="productForm">
						<input
							type="text"
							className="form-control"
							placeholder="Product Name"
							name="name"
							required
						/>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="submit" className="btn btn-primary">Add Product</button>
						</div>
					</form>

				</div>
			</div>
		</div>
	);
}

export default AddProduct;
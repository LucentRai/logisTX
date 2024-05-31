import PropTypes from 'prop-types';
import {Button, Col, Form, FormGroup, FormFeedback, FormText, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Row} from 'reactstrap';

function AddProductModal({isOpen, toggle, ...args}){

	function handleSubmit(e){
		e.preventDefault();
		const formData = new FormData(e.target);
		const formDataObject = Object.fromEntries(formData.entries());
		console.log(formDataObject);
	}

	return (
		<Modal isOpen={isOpen} toggle={toggle} {...args} size="xl">
			<ModalHeader toggle={toggle}>Add Product</ModalHeader>
			<ModalBody>
				<Form onSubmit={e => handleSubmit(e)}>
					<Row>
						<Col md={6}>
							<FormGroup>
								<Label for="name">
									Name
								</Label>
								<Input
									id="name"
									name="name"
									placeholder="Product Name"
									required
								/>
							</FormGroup>
						</Col>
						<Col md={4}>
							<FormGroup>
								<Label for="price">
									Price
								</Label>
								<Input
									id="price"
									name="price"
									min="1"
									type="number"
									required
								/>
							</FormGroup>
						</Col>
						<Col md={2}>
							<FormGroup>
								<Label for="stock">
									Item in Stock
								</Label>
								<Input
									id="stock"
									name="stockQuantity"
									min="1"
									type="number"
									required
								/>
							</FormGroup>
						</Col>
					</Row>
					<FormGroup>
						<Label for="description">
							Description
						</Label>
						<Input
							id="description"
							name="description"
							placeholder="Description of the product"
							type="textarea"
						/>
					</FormGroup>
					<FormGroup>
						<Label for="productImage">
							Upload Images
						</Label>
						<Input
							id="productImage"
							name="imgs"
							type="file"
						/>
					</FormGroup>
					<Row>
						<Col md={6}>
							<FormGroup>
								<Label for="weight">
									Weight
								</Label>
								<Input
									id="weight"
									name="weight"
									type="number"
									required
								/>
								<FormText>
									Weight in kilograms
								</FormText>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for="dimensions">
									Dimensions
								</Label>
								<Input
									id="dimensions"
									name="dimensions"
									required
								/>
								<FormText>
									Format: length, breadth, height (in meters)<br/>
									Eg: 1.2, 0.5, 0.8
								</FormText>
							</FormGroup>
						</Col>
					</Row>
					<ModalFooter>
						<Button type="submit" color="primary">Add Product</Button>{' '}
						<Button color="secondary" onClick={toggle}>Cancel</Button>
					</ModalFooter>
				</Form>
			</ModalBody>
			
		</Modal>
	);
}

AddProductModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	toggle: PropTypes.func.isRequired
};

export default AddProductModal;
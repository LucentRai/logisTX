import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Button, Col, Form, FormGroup, FormText, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Row, Spinner} from 'reactstrap';
import { useCreateProduct } from './useCreateProduct';
import { useEffect, useRef } from 'react';

function AddProductModal({isOpen, toggle, ...args}){
	const companyId = useSelector(state => state.user.companyId);
	const {isCreating, isSuccess, createProduct} = useCreateProduct();
	const formRef = useRef(null);

	function handleSubmit(e){
		e.preventDefault();
		const formData = new FormData(e.target);
		const formDataObject = Object.fromEntries(formData.entries());
		createProduct({
			name: formDataObject.name,
			companyId,
			description: formDataObject.description,
			price: formDataObject.price,
			stockQuantity: formDataObject.stockQuantity,
			weight: formDataObject.weight,
			dimensions: [formDataObject.length, formDataObject.breadth, formDataObject.height]
		});
	}

	useEffect(() => {
		if(isSuccess && formRef.current){
			formRef.current.reset();
		}
	}, [isSuccess]);


	return (
		<Modal isOpen={isOpen} toggle={toggle} {...args} size="xl">
			<ModalHeader toggle={toggle}>Add Product</ModalHeader>
			<ModalBody>
				<Form onSubmit={e => handleSubmit(e)} ref={formRef}>
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
									In Stock
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
					{/* <FormGroup>
						<Label for="productImage">
							Upload Images
						</Label>
						<Input
							id="productImage"
							name="imgs"
							type="file"
						/>
					</FormGroup> */}
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
						<Col md={2}>
							<FormGroup>
								<Label for="length">
									Length
								</Label>
								<Input
									id="length"
									name="length"
									required
								/>
							</FormGroup>
						</Col>
						<Col md={2}>
							<FormGroup>
								<Label for="breadth">
									Breadth
								</Label>
								<Input
									id="breadth"
									name="breadth"
									required
								/>
							</FormGroup>
						</Col>
						<Col md={2}>
							<FormGroup>
								<Label for="height">
									Height
								</Label>
								<Input
									id="height"
									name="height"
									required
								/>
							</FormGroup>
						</Col>
					</Row>
					<ModalFooter>
						{isCreating && <Spinner color="me-2" size="sm">Loading...</Spinner>}
						<Button type="submit" color="primary" disabled={isCreating}>
							Add Product
						</Button>{' '}
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
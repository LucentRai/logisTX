import { useState } from 'react';
import { PlusCircle } from 'react-bootstrap-icons';
import {Button, Col, Form, FormGroup, FormFeedback, FormText, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Row} from 'reactstrap';

function AddProduct(args){
	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	return (
		<div>
			<Button color="primary" onClick={toggle}>
				<PlusCircle style={{width: "1.5rem", height: "1.5rem"}} />
			</Button>
			<Modal isOpen={modal} toggle={toggle} {...args} size="xl">
				<ModalHeader toggle={toggle}>Add Product</ModalHeader>
				<ModalBody>
					<Form>
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
										min="0.001"
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
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={toggle}>Add Product</Button>{' '}
					<Button color="secondary" onClick={toggle}>Cancel</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}

export default AddProduct;
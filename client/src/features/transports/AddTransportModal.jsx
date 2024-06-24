import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Button, Col, Form, FormGroup, FormText, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Row, Spinner} from 'reactstrap';
import { useCreateTransport } from './useCreateTransport';
import { useEffect, useRef } from 'react';
import { useWarehouses } from '../warehouses/useWarehouses';

function AddTransportModal({isOpen, toggle, ...args}){
	const warehouses = useSelector(state => state.warehouses);
	const companyId = useSelector(state => state.user.companyId);
	const {isCreating, isSuccess, createTransport} = useCreateTransport();
	const formRef = useRef(null);

	// if(!warehouses.length){
	// 	const {isLoading, warehouses} = useWarehouses();
	// 	const dispatch = useDispatch();
	
	// 	useEffect(() => {
	// 		if(warehouses){
	// 			dispatch({type: 'warehouses/setWarehouses', payload: warehouses});
	// 		}
	// 	}, [dispatch, warehouses]);
	// }

	function handleSubmit(e){
		e.preventDefault();
		const formData = new FormData(e.target);
		const formDataObject = Object.fromEntries(formData.entries());
		createTransport({
			name: formDataObject.name,
			companyId,
			volumne: formDataObject.volumne,
			maxCapacity: formDataObject.maxCapacity,
			maxSpeed: formDataObject.maxSpeed,
			parkingLocation: [formDataObject.lat, formDataObject.lng]
		});
	}

	useEffect(() => {
		if(isSuccess && formRef.current && formRef.current.reset){
			formRef.current.reset();
		}
	}, [isSuccess]);


	return (
		<Modal isOpen={isOpen} toggle={toggle} {...args} size="xl">
			<ModalHeader toggle={toggle}>Add Transport</ModalHeader>
			<ModalBody>
				<Form onSubmit={e => handleSubmit(e)} innerRef={formRef}>
					<Row>
						<Col md={12}>
							<FormGroup>
								<Label for="name">
									Name
								</Label>
								<Input
									id="name"
									name="name"
									placeholder="Transport Name"
									required
								/>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<FormGroup>
								<Label for="volume">
									Volume
								</Label>
								<Input
									id="volume"
									name="volume"
									min="1"
									type="number"
									required
								/>
								<FormText>
									Volume in cubic meters
								</FormText>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for="maxCapacity">
									Max Capacity
								</Label>
								<Input
									id="maxCapacity"
									name="maxCapacity"
									min="1"
									type="number"
									required
								/>
								<FormText>
									Maximum weight in kilograms
								</FormText>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<FormGroup>
								<Label for="maxSpeed">
									Max Speed
								</Label>
								<Input
									id="maxSpeed"
									name="maxSpeed"
									type="number"
									required
								/>
								<FormText>
									Maximum Speed in km/hr
								</FormText>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for="parkingLocation">
									Parking Location
								</Label>
								<Input
									id="parkingLocation"
									name="parkingLocation"
									type="select"
									placeholder="Select Location"
									required
								>
									<option value="" disabled>Select Parking Location</option>
									<option value="onMap">Select in map</option>
								</Input>
							</FormGroup>
						</Col>
					</Row>
					<ModalFooter>
						<Button type="submit" color="primary" disabled={isCreating}>
							{isCreating && <Spinner className="me-2" color="light" size="sm">Loading...</Spinner>}
							Add Transport
						</Button>{' '}
						<Button color="secondary" onClick={toggle}>Cancel</Button>
					</ModalFooter>
				</Form>
			</ModalBody>
		</Modal>
	);
}

AddTransportModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	toggle: PropTypes.func.isRequired
};

export default AddTransportModal;
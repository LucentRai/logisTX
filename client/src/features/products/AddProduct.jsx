import { useState } from 'react';
import { PlusCircle } from 'react-bootstrap-icons';
import {Button} from 'reactstrap';
import AddProductModal from './AddProductModal';


function AddProduct(){
	const [openModal, setOpenModal] = useState(false);


	const toggle = () => setOpenModal(!openModal);

	return (
		<div>
			<Button color="primary" onClick={toggle}>
				<PlusCircle style={{width: "1.5rem", height: "1.5rem"}} />
			</Button>
			<AddProductModal isOpen={openModal} toggle={toggle} />
		</div>
	);
}

export default AddProduct;
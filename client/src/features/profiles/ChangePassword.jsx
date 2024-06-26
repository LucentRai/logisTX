import { useSelector } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from "reactstrap";
import { useUpdateProfile } from "./useUpdateProfile";
import { useState } from "react";

function ChangePassword(){
	const user = useSelector(state => state.user);
	const { isEditing, updateProfile } = useUpdateProfile();

	const [userData, setUserData] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	function handleEdit(e){
		e.preventDefault();
		updateProfile({id: 'updateMe', newProfile: userData}); // /users/updateMe is the URL for updating the user's profile
	}

	return (
		<Form className="my-2">
			<Row>
				<Col md={4}>
					<FormGroup>
						<Label for="firstname">
							First Name
						</Label>
						<Input
							id="firstname"
							name="firstname"
							type="text"
							placeholder={user.firstname}
							onChange={handleChange}
						/>
					</FormGroup>
				</Col>
				<Col md={4}>
					<FormGroup>
						<Label for="middlename">
							Middle Name
						</Label>
						<Input
							id="middlename"
							name="middlename"
							type="text"
							placeholder={user.middlename}
							onChange={handleChange}
						/>
					</FormGroup>
				</Col>
				<Col md={4}>
					<FormGroup>
						<Label for="lastname">
							Last Name
						</Label>
						<Input
							id="lastname"
							name="lastname"
							type="text"
							onChange={handleChange}
							placeholder={user.lastname}
						/>
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<FormGroup>
						<Label for="email">
							Email Address
						</Label>
						<Input
							id="email"
							name="email"
							type="email"
							onChange={handleChange}
							placeholder={user.email}
							/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Label for="phone">
							Phone Number
						</Label>
						<Input
							id="phone"
							name="phone"
							onChange={handleChange}
							placeholder={user.phone}
							/>
					</FormGroup>
				</Col>
			</Row>
			<Button color="primary" onClick={handleEdit} disabled={isEditing}>
				{isEditing && <Spinner size="sm" className="me-2" />}
				Update
			</Button>
		</Form>
	);
}

export default ChangePassword;
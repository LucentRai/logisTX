import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from "reactstrap";

function EditProfile(){

	return (
		<Form>
			<Row>
				<Col md={4}>
					<FormGroup>
						<Label for="oldPassword">
							Old Password
						</Label>
						<Input
							id="oldPassword"
							name="oldPassword"
							type="password"
						/>
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<FormGroup>
						<Label for="newPassword">
							New Password
						</Label>
						<Input
							id="newPassword"
							name="newPassword"
							type="password"
						/>
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<FormGroup>
						<Label for="confirmPassword">
							Confirm Password
						</Label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							/>
					</FormGroup>
				</Col>
			</Row>
			<Button color="primary">
				Change
			</Button>
		</Form>
	);
}

export default EditProfile;
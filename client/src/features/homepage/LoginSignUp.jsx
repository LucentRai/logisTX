import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import SignUpModal from "./SignUpModal";


function LoginForm(){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailInfoClassName, setEmailInfoClassName] = useState('invisible');

	function handleLogin(e){
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		e.preventDefault();

		if(!emailRegex.test(email)){
			setEmailInfoClassName('visible text-danger');
			return;
		}

		axios.post('/users/login', {
			email: email,
			password: password
		})
			.then((response) => {
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('user', JSON.stringify(response.data.user));
				toast.success('Redirecting to dashboard...');
				setTimeout(() => {
					window.location.href = '/app';
				}, 1000);
			})
			.catch((response) => {
				if(response.response.status === 401) toast.error('Invalid email or password');
				else {
					console.error(response);
					toast.error('Something went wrong');
				}
			});
	}


	return (
		<>
			<div className="col-md-10 mx-auto col-lg-5">
				<form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" id="loginForm">
					<div className="form-floating mb-3">
						<input
							type="email"
							className="form-control"
							id="floatingEmail"
							placeholder="Email Address"
							name="email"
							onChange={e => setEmail(e.target.value)}
						/>
						<label htmlFor="floatingEmail">Email address</label>
						<div className={emailInfoClassName}>Please enter a valid email address.</div>
					</div>
					<div className="form-floating mb-3">
						<input
							type="password"
							className="form-control"
							id="floatingPassword"
							placeholder="Password"
							name="password"
							onChange={e => setPassword(e.target.value)}
						/>
						<label htmlFor="floatingPassword">Password</label>
					</div>
					<div className="checkbox mb-3">
						<label>
							<input type="checkbox" value="remember-me" /> Remember me
						</label>
					</div>
					<button className="w-100 btn btn-lg btn-primary" type="submit" onClick={(e) => handleLogin(e)}>Log in</button>
					<hr className="my-4" />
					<button type="button" className="w-100 btn btn-lg btn-outline-info" data-bs-toggle="modal" data-bs-target="#registerModal">Register</button>
				</form>
			</div>
			<SignUpModal />
		</>
	);
}

export default LoginForm;
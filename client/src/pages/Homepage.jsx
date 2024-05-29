import { useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios';

import SignUpModal from "../features/homepage/SignUpModal";


function Homepage(){

	return (
		<div className="container">
			<header className="sticky-top">
				<nav className="navbar navbar-expand-lg bg-body-tertiary">
					<div className="container-fluid">
						<a className="navbar-brand" href="/"><img width="60" height="60" src="img/logo.png" alt="logisTX logo" /></a>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								<li className="nav-item">
									<a className="nav-link" href="#features">Features</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#team">Team</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</header>

			<main className="px-4 pt-4">
				{/* HERO SECTION */}
				<div className="row align-items-center g-lg-5">
					<div className="col-lg-7 text-center text-lg-start">
						<h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">The Future of Logistics Today</h1>
						<p className="col-lg-10 fs-4">Improving Logistics and Supply Chain Productivity & Performance</p>
					</div>
					<LoginForm />
					<SignUpModal />
				</div>
				{/* END OF HERO SECTION */}

				{/* FEATURES */}
				<div className="px-4 pt-5">
					<h2 className="pb-2 border-bottom" id="features">Features</h2>
					<div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
						<div className="feature col">
							<div className="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
								<img src="img/Routing.svg" alt="Routing Icon" width="100" height="100" />
							</div>
							<h3 className="fs-2 text-body-emphasis">AI Based Routing & Mobile</h3>
							<p>Improve fleet productivity with integrated planning, dispatch, mobile, and telematics .</p>
						</div>
						<div className="feature col">
							<div className="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
								<img src="img/Transport.svg" alt="Routing Icon" width="100" height="100" />
							</div>
							<h3 className="fs-2 text-body-emphasis">Transport Management</h3>
							<p>View, optimize, and manage transportation operations across modes.</p>
						</div>
						<div className="feature col">
							<div className="feature-icon d-inline-flex align-items-center justify-content-center fs-2 mb-3">
								<img src="img/Parcel.svg" alt="Routing Icon" width="100" height="100" />
							</div>
							<h3 className="fs-2 text-body-emphasis"> Ecommerce Fulfillment Soluctions</h3>
							<p>Improve and scale ecommerce warehouse, pick, pack, ship, and other logistics operations</p>
						</div>
					</div>
				</div>
				{/* END OF FEATURES */}

				{/* TEAM */}
				<div className="px-4">
					<h2 className="pb-2 border-bottom" id="team">Team</h2>
					<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
						<div className="col">
							<div className="card shadow-sm">
								<img className="bd-placeholder-img card-img-top" width="100%" src="img/Team_Kashmin.jpg" alt="Kashmin Shrestha" />
								<div className="card-body">
									<p className="card-text text-center">190314 Kashmin Shrestha</p>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="card shadow-sm">
								<img className="bd-placeholder-img card-img-top" width="100%" src="img/Team_Lucent.jpg" alt="Lucent Rai" />
								<div className="card-body">
									<p className="card-text text-center">190317 Lucent Thulung Rai</p>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="card shadow-sm">
								<img className="bd-placeholder-img card-img-top" width="100%" src="img/Team_Ujjwal.jpg" alt="Ujjwal Babu Tiwari" />
								<div className="card-body">
									<p className="card-text text-center">190338 Ujjwal Babu Tiwari</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* END OF TEAM */}
				</main>

				<footer className="py-3 my-4">
				<ul className="nav justify-content-center border-bottom pb-3 mb-3">
					<li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Home</a></li>
					<li className="nav-item"><a href="#features" className="nav-link px-2 text-body-secondary">Features</a></li>
					<li className="nav-item"><a href="#team" className="nav-link px-2 text-body-secondary">Team</a></li>
				</ul>
				<p className="text-center text-body-secondary">&copy; 2024 logisTX</p>
			</footer>
		</div>
	);
}

function LoginForm(){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailInfoClassName, setEmailInfoClassName] = useState('invisible');

	function handleLogin(e){
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		e.preventDefault();

		if(!emailRegex.test(email)){
			setEmailInfoClassName('visible text-danger');
			setTimeout(() => {
				setEmailInfoClassName('invisible');
			}, 1000);

			return;
		}
		axios.post(`${import.meta.env.VITE_API_USERS}/login`, {
			email: email,
			password: password
		})
			.then(() => {
				toast.success('Redirecting to dashboard...');
				setTimeout(() => {
					window.location.href = '/app';
				}, 2000);
			})
			.catch(() => {
				toast.error('Something went wrong');
			});
	}


	return (
		<div className="col-md-10 mx-auto col-lg-5">
			<form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" id="loginForm">
				<div className="form-floating mb-3">
					<input
						type="email"
						className="form-control"
						id="floatingEmail"
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
	);
}


export default Homepage;
import { useState } from "react";
import toast from "react-hot-toast";


function Homepage(){
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleLogin(e){
		e.preventDefault();
		fetch('/api/v1/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		})
		.then(res => {
			if(res.ok){
				toast.success('Login Successful');
				setTimeout(() => {
					window.location.href = '/app';
				}, 2000);
			}
			else{
				console.log(res);
				toast.error('Invalid Email or Password');
			}
		})
		.catch(err => {
			toast.error('Error: ' + err.message);
		});
	}

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
					{/* Modal */}
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

function SignUpModal(){
	const [firstname, setFirstname] = useState('');
	const [middlename, setMiddlename] = useState('');
	const [lastname, setLastname] = useState('');
	const [company, setCompany] = useState('');
	const [address, setAddress] = useState('');
	const [role, setRole] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	function handleSignUp(e){
		e.preventDefault();
		fetch('/api/v1/users/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				firstname,
				middlename,
				lastname,
				address,
				role,
				email,
				phone,
				password
			})
		})
		.then(res => {
			if(res.ok){
				toast.success('Sign Up Successful. Redirecting to Dashboard');
				setTimeout(() => {
					window.location.href = '/app';
				}, 1000);
			}
			else{
				console.log(res);
				toast.error('Something went wrong.');
			}
		})
		.catch(err => {
			toast.error('Error: ' + err.message);
		});
	}

	return (
		<div className="modal fade" id="registerModal" tabIndex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-xl">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title" id="registerModalLabel">Sign Up</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<form className="modal-body row g-3 multi-collapse" id="registerForm">
						<div className="col-md-4">
							<label htmlFor="inputFirstname" className="form-label" required>Firstname</label>
							<input type="text" className="form-control" id="inputFirstname" onChange={e => setFirstname(e.target.value)} />
						</div>
						<div className="col-md-4">
							<label htmlFor="inputMiddlename" className="form-label">Middle Name (Optional)</label>
							<input type="text" className="form-control" id="inputMiddlename" onChange={e => setMiddlename(e.target.value)} />
						</div>
						<div className="col-md-4">
							<label htmlFor="inputLastname" className="form-label" required>Lastname</label>
							<input type="text" className="form-control" id="inputLastname" onChange={e => setLastname(e.target.value)} />
						</div>
						<div className="col-md-6">
							<label htmlFor="inputCompany" className="form-label" required>Company Name</label>
							<input type="text" className="form-control" id="inputCompany" placeholder="Enter Company Name" onChange={e => setCompany(e.target.value)} />
						</div>
						<div className="col-md-6">
							<label htmlFor="inputAddress" className="form-label">Address</label>
							<input type="text" className="form-control" id="inputAddress" placeholder="Enter Company Address" required onChange={e => setAddress(e.target.value)} />
						</div>
						<div className="col-md-4">
							<label htmlFor="inputRole" className="form-label">Role</label>
							<input type="text" className="form-control" id="inputRole" name="role" placeholder="Position in the Company" required onChange={e => setRole(e.target.value)} />
						</div>
						<div className="col-md-4">
							<label htmlFor="inputPhone" className="form-label">Phone Number</label>
							<input type="tel" className="form-control" id="inputPhone" name="phone" placeholder="Contact Person Phone Number" required onChange={e => setPhone(e.target.value)} />
						</div>
						<div className="col-md-4">
							<label htmlFor="inputEmail" className="form-label">Email</label>
							<input type="email" className="form-control" id="inputEmail" name="email" placeholder="Company Email Address" required onChange={e => setEmail(e.target.value)} />
						</div>
						<div className="col-md-6">
							<label htmlFor="inputPassword" className="form-label">Password</label>
							<input type="password" className="form-control" id="inputPassword" name="password" placeholder="Enter New Password" required onChange={e => setPassword(e.target.value)} />
						</div>
						<div className="col-md-6">
							<label htmlFor="inputPassword2" className="form-label">Confirm Password</label>
							<input type="password" className="form-control" id="inputPassword2" name="confirmPassword" placeholder="Reenter Password" required onChange={e => setPassword2(e.target.value)} />
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Homepage;

function Header(){

	return (
		<header className="py-3 border-bottom">
			<div className="container-fluid d-grid gap-3 align-items-center header-container">
					<a href="/" className="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
						<img src="/img/logo.png" alt="logisTX Logo" className="logo-sm rounded-circle me-2" />
						<span id="header-company-name" className="h5">logisTX</span>
					</a>

				<div className="d-flex align-items-center">
					<form className="w-100 me-3" role="search">
						<input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
					</form>

					<div className="flex-shrink-0 dropdown">
						<a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
							<img src="/img/default-profile-img.png" alt="Profile name" width="32" height="32" className="rounded-circle" />
						</a>
						<ul className="dropdown-menu text-small shadow">
							{/* <li><a className="dropdown-item" href="#">{name}</a></li> */}
							<li><a className="dropdown-item" href="#">Settings</a></li>
							<li><hr className="dropdown-divider" /></li>
							<li><a className="dropdown-item" href="#">Sign out</a></li>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
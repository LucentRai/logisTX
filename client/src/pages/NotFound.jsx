function NotFound(){
	return (
		<section className="section">
			<div className="text-center">
				<img src="/img/error.png" alt="Error 404" />
				<h1 className="display-1" style={{color: "var(--bs-danger)"}}>ERROR 404</h1>
				<p className="lead">Page not found</p>
			</div>
		</section>
	);
}

export default NotFound;
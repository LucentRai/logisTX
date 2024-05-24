function SidebarDevButtons(){

	function handleImport(){
	
	}

	function handleDelete(){

	}

	return (
		<>
			<hr className="my-3" />
			<h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
				<span>Dev Tools</span>
			</h6>
			<div className="d-flex flex-column p-2">
				<button className="btn btn-info mb-1" type="Button" onClick={handleImport}>Import Data</button>
				<button className="btn btn-danger" type="Button" onClick={handleDelete}>Delete Data</button>
			</div>
		</>
	);
}

export default SidebarDevButtons;
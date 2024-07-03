import axios from 'axios';
import toast from 'react-hot-toast';

function SidebarDevButtons(){

	async function handleImport(){
		axios.post('/dev/import')
			.then(() => toast.success('All data imported'))
			.catch(err => {
				toast.error('Error importing data');
				console.error(err);
			});
	}

	async function handleDelete(){
		axios.delete('/dev')
			.then(() => {
				toast.success('All data deleted');
				window.location.reload();
			})
			.catch(err => {
				toast.error('Error deleting data');
				console.error(err);
			});
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
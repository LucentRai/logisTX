import { useSelector } from "react-redux";

import ChangePassword from "../features/profiles/ChangePassword";
import EditProfile from "../features/profiles/EditProfile";

function Profile(){
	const firstname = useSelector(state => state.user.firstname);

	return (
		<>
		<div className="d-flex justify-content-between align-items-end mb-2">
			<h1 className="h2">{`${firstname}'s Profile`}</h1>
		</div>
		<section className="section">
			<ChangePassword />
			<h2 className="h3 mt-4">Change Password</h2>
			<EditProfile />
		</section>
		</>
	);
}

export default Profile;
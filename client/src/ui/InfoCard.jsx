import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './InfoCard.module.scss';


function InfoCard({children, title, icon, iconColor, href, value}) {

	return (
		<div className="col-xxl-4 col-md-6">
			<div className={"card info-card"}>

				<NavLink className="card-body" to={href}>
					<h5 className="card-title">{title}</h5>

					<div className="d-flex align-items-center">
						<div className={`card-icon rounded-circle d-flex align-items-center justify-content-center ${iconColor}`}>
							{icon}
						</div>
						<div className="ps-3">
							<h6>{value}</h6>
							{children}
						</div>
					</div>
				</NavLink>

			</div>
		</div>
	);
}

InfoCard.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string.isRequired,
	icon: PropTypes.node.isRequired,
	iconColor: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
};

export default InfoCard;
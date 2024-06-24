import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './InfoCard.module.css';

function InfoCard({children, href, icon, iconStyle, title, value}) {

	return (
		<div className="col-xxl-4 col-md-6">
			<div className={styles["card"]}>

				<NavLink className={styles["card-body"]} to={href}>
					<h5 className={styles["card-title"]}>{title}</h5>
					<div className="d-flex align-items-center">
						<div style={iconStyle} className={`${styles["card-icon"]} rounded-circle d-flex align-items-center justify-content-center`}>
							{icon}
						</div>
						<div className="ps-3">
							<h6 className={styles["value"]}>{value}</h6>
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
	href: PropTypes.string.isRequired,
	icon: PropTypes.node.isRequired,
	iconStyle: PropTypes.object,
	title: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired
};

export default InfoCard;
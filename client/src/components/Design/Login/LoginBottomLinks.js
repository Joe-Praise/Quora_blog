import React from 'react';
import { Link } from 'react-router-dom';
const LoginBottomLinks = (props) => {
	return (
		<li className={`d-inline mx-1 ${props.listClass}`}>
			<Link to={props.to} className={`link ${props.className}`}>
				{props.text}
			</Link>
		</li>
	);
};

export default LoginBottomLinks;

import React from 'react'

const FormBtn = ({ value, width, bg, onClick }) => {
    const style = {
		width: width,
		backgroundColor: bg,
		border: "none",
	};
	return (
		<button style={style} onClick={onClick} className="formBtn">
			{value}
		</button>
	);
};

export default FormBtn
import React from 'react';
import Card from '../components/UI/Card';

const PopUp = (props) => {
	return (
		<Card className='popUp'>
			<p className='text-center p-0 m-0'>{props.message}</p>
			<button className='btn' onClick={props.btnAction}>
				close
			</button>
		</Card>
	);
};

export default PopUp;

import React from 'react';
// import ReactDOM from "react-dom";
import SideBar from '../components/Design/Home/SideBar';
import Create from '../components/Design/Home/Create';
import Advertisment from '../components/Design/Home/Advertisment';
import { useRouteLoaderData } from 'react-router-dom';
// import Card from '../components/UI/Card';

// let displayModal = true;
const Index = () => {
	const token = useRouteLoaderData('userProfile')?.data;
	// const [modal, setModal] = useState(false);

	// const closeModalHandler = () => {
	//   setModal(false);
	// };

	// useEffect(() => {
	//   if (displayModal) {
	//     setModal(true);
	//     displayModal = false;
	//     return;
	//   }
	// }, []);

	// const Backdrop = () => {
	//   return <div className="back--drop" onClick={closeModalHandler}></div>;
	// };

	// const ModalOverlay = () => {
	//   return (
	//     <>
	//       <Card className="initial-Popup">
	//         <div>
	//           <h1>Notice!!!</h1>
	//           <div className="fw-bold fs-5 mb-4">
	//             This project is a remake of Quora blog developed by Joe Praise with the intention of
	//             becoming a better developer and it's purely for educational purpose.
	//             <p className="my-2">
	//               Click the link to visit the official website --{"> "}
	//               <a
	//                 href="http://quora.com"
	//                 target="_blank"
	//                 rel="noopener noreferrer"
	//               >
	//                 Quora.com
	//               </a>
	//             </p>
	//           </div>
	//           <button
	//             onClick={closeModalHandler}
	//             className="initial-Popup-btn btn btn-primary rounded-pill btn-color mb-2"
	//           >
	//             Close Modal
	//           </button>
	//         </div>
	//       </Card>
	//     </>
	//   );
	// };

	return (
		<main className='main'>
			<section className='body--width home-flex'>
				<SideBar />
				<Create userInfo={token} />
				<Advertisment />
				{/* {modal === true && (
          <React.Fragment>
            {ReactDOM.createPortal(
              <Backdrop />,
              document.getElementById("backdrop--overlay")
            )}

            {ReactDOM.createPortal(
              <ModalOverlay onClick={closeModalHandler} />,
              document.getElementById("backdrop--overlay")
            )}
          </React.Fragment>
        )} */}
			</section>
		</main>
	);
};

export default Index;

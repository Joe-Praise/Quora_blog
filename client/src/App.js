import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '../src/components/Admin/Admin.css';
import './Styles.css';
import './components/Design/Profile/profile.css';
import './components/Admin/Admin.css';

import NavigationWrapper from './helper/NavigationWrapper';
import DataContext from './helper/context';
import AdminNavigationWrapper from './components/Admin/AdminNavigationWrapper';
import { tokenLoader } from './util/auth';
import { adminTokenLoader } from './util/adminAuth';
import { lazy, Suspense } from 'react';

const Index = lazy(() => import('./Pages/Index'));
const SinglePost = lazy(() => import('./Pages/SinglePost'));
const EditSinglePost = lazy(() => import('./Pages/EditSinglePost'));
const Profile = lazy(() => import('./Pages/Profile'));
const Space = lazy(() => import('./Pages/Space'));
const SpaceCategory = lazy(() => import('./Pages/SpaceCategory'));
const ErrorPage = lazy(() => import('./helper/ErrorPage'));
const Login = lazy(() => import('./Pages/Login'));
const AdminLogin = lazy(() => import('./Pages/AdminLogin'));
const AdminDashboard = lazy(() =>
	import('./components/Admin/Pages/AdminDashboard')
);
const Users = lazy(() => import('./components/Admin/Pages/Users'));
const Posts = lazy(() => import('./components/Admin/Pages/Posts'));
const CreateUser = lazy(() => import('./components/Admin/Pages/CreateUser'));
const AdminProfile = lazy(() => import('./components/Admin/Pages/Profile'));

const router = createBrowserRouter([
	{
		path: '/login',
		element: (
			<Suspense
				fallback={
					<div className='dots-container'>
						<span className='dot'></span>
						<span className='dot'></span>
						<span className='dot'></span>
					</div>
				}
			>
				<Login />
			</Suspense>
		),
	},
	{
		path: '/adminLogin',
		element: (
			<Suspense
				fallback={
					<div className='dots-container'>
						<span className='dot'></span>
						<span className='dot'></span>
						<span className='dot'></span>
					</div>
				}
			>
				<AdminLogin />
			</Suspense>
		),
	},
	{
		path: '/',
		element: <NavigationWrapper />,
		errorElement: (
			<Suspense
				fallback={
					<div className='dots-container'>
						<span className='dot'></span>
						<span className='dot'></span>
						<span className='dot'></span>
					</div>
				}
			>
				<ErrorPage />
			</Suspense>
		),
		id: 'userProfile',
		loader: tokenLoader,

		children: [
			{
				index: true,
				element: (
					<Suspense
						fallback={
							<div className='dots-container'>
								<span className='dot'></span>
								<span className='dot'></span>
								<span className='dot'></span>
							</div>
						}
					>
						<Index />
					</Suspense>
				),
			},
			{
				path: 'post/:id',
				id: 'postDetail',
				loader: (meta) =>
					import('./Pages/SinglePost').then((module) => module.loader(meta)),
				children: [
					{
						index: true,
						element: (
							<Suspense
								fallback={
									<div className='dots-container'>
										<span className='dot'></span>
										<span className='dot'></span>
										<span className='dot'></span>
									</div>
								}
							>
								<SinglePost />
							</Suspense>
						),
					},
					{
						path: 'edit',
						element: (
							<Suspense
								fallback={
									<div className='dots-container'>
										<span className='dot'></span>
										<span className='dot'></span>
										<span className='dot'></span>
									</div>
								}
							>
								<EditSinglePost />
							</Suspense>
						),
					},
				],
			},
			{
				path: 'profile/:id',
				loader: (meta) =>
					import('./Pages/Profile').then((module) => module.loader(meta)),
				element: (
					<Suspense
						fallback={
							<div className='dots-container'>
								<span className='dot'></span>
								<span className='dot'></span>
								<span className='dot'></span>
							</div>
						}
					>
						<Profile />
					</Suspense>
				),
			},
			{
				path: 'space',
				children: [
					{
						index: true,
						element: (
							<Suspense
								fallback={
									<div className='dots-container'>
										<span className='dot'></span>
										<span className='dot'></span>
										<span className='dot'></span>
									</div>
								}
							>
								<Space />
							</Suspense>
						),
					},
					{
						path: ':category',
						element: (
							<Suspense
								fallback={
									<div className='dots-container'>
										<span className='dot'></span>
										<span className='dot'></span>
										<span className='dot'></span>
									</div>
								}
							>
								<SpaceCategory />
							</Suspense>
						),
						loader: (meta) =>
							import('./Pages/SpaceCategory').then((module) =>
								module.loader(meta)
							),
					},
				],
			},
		],
	},
	{
		path: '/admin',
		element: <AdminNavigationWrapper />,
		errorElement: (
			<Suspense
				fallback={
					<div className='dots-container'>
						<span className='dot'></span>
						<span className='dot'></span>
						<span className='dot'></span>
					</div>
				}
			>
				<ErrorPage />
			</Suspense>
		),
		id: 'adminProfile',
		loader: adminTokenLoader,
		children: [
			{
				index: true,
				element: (
					<Suspense
						fallback={
							<div className='dots-container'>
								<span className='dot'></span>
								<span className='dot'></span>
								<span className='dot'></span>
							</div>
						}
					>
						<AdminDashboard />
					</Suspense>
				),
			},
			{
				path: 'users',
				element: (
					<Suspense
						fallback={
							<div className='dots-container'>
								<span className='dot'></span>
								<span className='dot'></span>
								<span className='dot'></span>
							</div>
						}
					>
						<Users />
					</Suspense>
				),
			},
			{
				path: 'posts',
				element: (
					<Suspense
						fallback={
							<div className='dots-container'>
								<span className='dot'></span>
								<span className='dot'></span>
								<span className='dot'></span>
							</div>
						}
					>
						<Posts />
					</Suspense>
				),
			},
			{
				path: 'create-user',
				element: (
					<Suspense
						fallback={
							<div className='dots-container'>
								<span className='dot'></span>
								<span className='dot'></span>
								<span className='dot'></span>
							</div>
						}
					>
						<CreateUser />
					</Suspense>
				),
			},
			{
				path: 'profile',
				element: (
					<Suspense
						fallback={
							<div className='dots-container'>
								<span className='dot'></span>
								<span className='dot'></span>
								<span className='dot'></span>
							</div>
						}
					>
						<AdminProfile />
					</Suspense>
				),
			},
		],
	},
]);

function App() {
	return (
		<DataContext>
			<RouterProvider router={router} />
		</DataContext>
	);
}

export default App;

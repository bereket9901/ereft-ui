import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdPerson, MdHome, MdLock, MdOutlineShoppingCart } from 'react-icons/md';
// Admin Imports
import Order from 'views/admin/OrderPage';
import Ordered from 'views/admin/OrderedPage';
import Inventory from 'views/admin/Inventory';
import RequestForm from 'views/admin/Request';
// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
	{
		name: 'Order Page',
		layout: '/admin',
		path: '/order-page',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: Order
	},
	{
		name: 'Ordered Display',
		layout: '/admin',
		path: '/order-display',
		icon: <Icon as={MdOutlineShoppingCart} width='20px' height='20px' color='inherit' />,
		component: Ordered,
		secondary: true
	},
	
	{
		name: 'Inventory',
		layout: '/admin',
		path: '/inventory',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: Inventory
	},
	{
		name: 'Request Form',
		layout: '/admin',
		icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
		path: '/request-form',
		component: RequestForm
	},
	{
		name: 'Sign In',
		layout: '/auth',
		path: '/sign-in',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		component: SignInCentered
	},
];

export default routes;

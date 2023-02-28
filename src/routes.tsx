import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdPerson, MdHome, MdLock, MdOutlineShoppingCart } from 'react-icons/md';
// Admin Imports
import Order from 'views/admin/cashierOrderPage';
import Ordered from 'views/admin/kitchenOrderDisplay';
import kitchenInventory from 'views/admin/kitchenInventory';
import kitchenItemRequestForm from 'views/admin/kitchenItemRequestForm';
import storeInventory from 'views/admin/kitchenInventory';
import storeItemRequestForm from 'views/admin/storeItemRequestForm';
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
		name: 'Kitchen Inventory',
		layout: '/admin',
		path: '/kitchen-inventory',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: kitchenInventory
	},
	{
		name: 'Kitchen Item Request',
		layout: '/admin',
		icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
		path: '/kitchen-item-request-form',
		component: kitchenItemRequestForm
	},
	{
		name: 'Store Inventory',
		layout: '/admin',
		path: '/store-inventory',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: storeInventory
	},
	{
		name: 'Store Item Request',
		layout: '/admin',
		icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
		path: '/store-item-request-form',
		component: storeItemRequestForm
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

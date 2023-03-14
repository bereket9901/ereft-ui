import { Icon } from '@chakra-ui/react';
import {MdHome, MdLock, MdOutlineShoppingCart, MdApproval, MdOutlineInventory, MdOutlineInventory2 } from 'react-icons/md';
// Admin Imports
import Order from 'views/admin/cashierOrderPage';
import Ordered from 'views/admin/kitchenOrderDisplay';
import Inventory from 'views/admin/inventory';
import ItemRequestForm from 'views/admin/itemRequestForm';
import RequestApproval from 'views/admin/requestApproval';
// Auth Imports
import SignInCentered from 'views/auth/signIn';
import ItemRemainingForm from 'views/admin/itemRemainingForm';


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
		icon: <Icon as={MdOutlineInventory2} width='20px' height='20px' color='inherit' />,
		component: Inventory
	},
	{
		name: 'Item Request',
		layout: '/admin',
		icon: <Icon as={MdOutlineInventory} width='20px' height='20px' color='inherit' />,
		path: '/item-request-form',
		component: ItemRequestForm
	},
	{
		name: 'Item Remaining',
		layout: '/admin',
		icon: <Icon as={MdOutlineInventory} width='20px' height='20px' color='inherit' />,
		path: '/item-remaining-form',
		component: ItemRemainingForm
	},
	{
		name: 'Request Approval',
		layout: '/admin',
		icon: <Icon as={MdApproval} width='20px' height='20px' color='inherit' />,
		path: '/request-approval',
		component: RequestApproval
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

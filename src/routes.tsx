import { Icon } from '@chakra-ui/react';
import {MdLock,  MdApproval, MdOutlineInventory, MdOutlineInventory2, MdOutlineRestaurantMenu,MdOutlineRestaurant, MdAppRegistration} from 'react-icons/md';
// Admin Imports
import Order from 'views/admin/cashierOrderPage';
import Ordered from 'views/admin/kitchenOrderDisplay';
import Inventory from 'views/admin/inventory';
import ItemRequestForm from 'views/admin/itemRequestForm';
import RequestApproval from 'views/admin/requestApproval';
// Auth Imports
import SignInCentered from 'views/auth/signIn';
import ItemRemainingForm from 'views/admin/itemRemainingForm';
import RemainingApproval from 'views/admin/RemainingApproval';


const routes = [
	{
		name: 'Order Page',
		layout: '/admin',
		path: '/order-page',
		icon: <Icon as={MdOutlineRestaurantMenu} width='20px' height='20px' color='inherit' />,
		component: Order,
		allowedRoles:['Cashier']
	},
	{
		name: 'Ordered Display',
		layout: '/admin',
		path: '/order-display',
		icon: <Icon as={MdOutlineRestaurant} width='20px' height='20px' color='inherit' />,
		component: Ordered,
		secondary: true,
		allowedRoles:['Barista', 'Chief']
	},
	
	{
		name: 'Inventory',
		layout: '/admin',
		path: '/inventory',
		icon: <Icon as={MdOutlineInventory2} width='20px' height='20px' color='inherit' />,
		component: Inventory,
		allowedRoles:['Barista', 'Chief', 'StoreManager']
	},
	{
		name: 'Item Request',
		layout: '/admin',
		icon: <Icon as={MdOutlineInventory} width='20px' height='20px' color='inherit' />,
		path: '/item-request-form',
		component: ItemRequestForm,
		allowedRoles:['Barista', 'Chief', 'StoreManager']
	},
	{
		name: 'Item Remaining',
		layout: '/admin',
		icon: <Icon as={MdOutlineInventory} width='20px' height='20px' color='inherit' />,
		path: '/item-remaining-form',
		component: ItemRemainingForm,
		allowedRoles:['Barista', 'Chief', 'StoreManager']
	},
	{
		name: 'Request Approval',
		layout: '/admin',
		icon: <Icon as={MdApproval} width='20px' height='20px' color='inherit' />,
		path: '/request-approval',
		component: RequestApproval,
		allowedRoles:['StoreManager']
	},
	{
		name: 'Remaining Approval',
		layout: '/admin',
		icon: <Icon as={MdAppRegistration} width='20px' height='20px' color='inherit' />,
		path: '/remaining-item-approval',
		component: RemainingApproval,
		allowedRoles:['StoreManager']
	},
	{
		name: 'Sign In',
		layout: '/auth',
		path: '/sign-in',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		component: SignInCentered,
		allowedRoles:[]
	},
];

export default routes;

import {  Box, useColorModeValue } from '@chakra-ui/react';
import OrderPage from './components/CashierOrderPage';

export default function UserReports() {
	const brandColor = useColorModeValue('brand.500', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			  <OrderPage />
		</Box>
	);
}

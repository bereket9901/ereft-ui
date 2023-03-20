import { Box } from '@chakra-ui/react';
import OrderHistory from './components/orderHistory';

export default function Approval() {
	return (
		<Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
			<OrderHistory />
		</Box>
	);
}

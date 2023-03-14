import { Box } from '@chakra-ui/react';
import ItemRemaining from './components/ItemRemainingForm';

export default function ItemRequestForm() {
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<ItemRemaining />
		</Box>
	);
}

import { Box } from '@chakra-ui/react';
import RequestForm from './components/ItemRequestForm';

export default function ItemRequestForm() {
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<RequestForm />
		</Box>
	);
}

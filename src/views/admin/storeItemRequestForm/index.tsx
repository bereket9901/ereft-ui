import { Box } from '@chakra-ui/react';
import RequestForm from './components/storeItemRequestForm';

export default function storeItemRequestForm() {
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			 <p className='login-header-text'>Store Item Request Form</p>
			<RequestForm />
		</Box>
	);
}

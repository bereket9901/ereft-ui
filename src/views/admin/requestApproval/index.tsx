import { Box } from '@chakra-ui/react';
import RequestApproval from './components/requestApproval';

export default function Approval() {
	const IsRefill=true;
	return (
		<Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
			<RequestApproval Refill={IsRefill} />
		</Box>
	);
}

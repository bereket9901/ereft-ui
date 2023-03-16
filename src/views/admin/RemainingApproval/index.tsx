import { Box } from '@chakra-ui/react';
import RequestApproval from '../requestApproval/components/requestApproval';

export default function Approval(){
	const IsRefill=false;
	return (
		<Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
			<RequestApproval Refill={IsRefill} RequestName={"Remaining"} />
		</Box>
	);
}

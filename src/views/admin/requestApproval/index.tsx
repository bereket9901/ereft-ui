import React from 'react';
import { Box,useColorModeValue } from '@chakra-ui/react';
import RequestApproval from './components/requestApproval';

export default function Approval() {
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorBrand = useColorModeValue('brand.500', 'white');
	return (
		<Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
			<RequestApproval />
		</Box>
	);
}

// Chakra imports
import { Flex, Img, useColorModeValue } from '@chakra-ui/react';
import {Row,Col } from 'antd';
import logo from 'assets/img/ereft/logo ereft.png';
// Custom components
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<img width={170} src={logo}/> 
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;

// chakra imports
import { Box, Flex, Stack } from '@chakra-ui/react';
//   Custom components
import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';

// FUNCTIONS

function SidebarContent(props: { routes: RoutesType[] }) {
	const { routes } = props;
	// SIDEBAR
	return (
		<Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
			<Brand />
			<Stack direction='column' mt='8px' mb='auto'>
				<Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }}>
			      	
					<Links routes={FilterRoutesByRole(routes)} />
				</Box>
			</Stack>


		</Flex>
	);
}

function FilterRoutesByRole(routes:RoutesType[]):RoutesType[]{

  var roles = localStorage.getItem('role');
  let route:RoutesType[] = [];
  var rolesArray = roles.split(',');
  routes.forEach(element => {
	if(rolesArray.some(r=> element.allowedRoles.includes(r))){		
		route.push(element);
	}
  });
  return route;
}

export default SidebarContent;

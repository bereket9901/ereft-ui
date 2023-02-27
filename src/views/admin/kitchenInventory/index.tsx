import { Box, Grid } from '@chakra-ui/react';
import { Col, Row } from 'antd';
import InventoryTable from './components/InventoryTable';

export default function Overview() {
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			{/* Main Fields */}
			<Row>
		      <Col span={12}>
			    <InventoryTable />
			  </Col>
			  <Col span={12}>
			    <InventoryTable />
			  </Col>
			  <Col span={12}>
			    <InventoryTable />
			  </Col>
			</Row>
		</Box>
	);
}

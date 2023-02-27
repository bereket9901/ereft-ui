import React, { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Card,Select } from 'antd';
const { Option } = Select;

const itemOption=[{
  name:'Meat',
  value:"meat",

},
{
  name:'Onion',
  value:"onion",

},
{
  name:'Tomato',
  value:"tomato",

},
];
type Unit = 'kg' | 'pic' | 'lt';

interface AmountValue {
  number?: number;
  unit?: Unit;
}

interface AmountInputProps {
  value?: AmountValue;
  onChange?: (value: AmountValue) => void;
}

const AmountInput: React.FC<AmountInputProps> = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);
  const [unit, setUnit] = useState<Unit>('kg');

  const triggerChange = (changedValue: { number?: number; unit?: Unit }) => {
    onChange?.({ number, unit, ...value, ...changedValue });
  };

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!('number' in value)) {
      setNumber(newNumber);
    }
    triggerChange({ number: newNumber });
  };

  const onUnitChange = (newUnit: Unit) => {
    if (!('unit' in value)) {
      setUnit(newUnit);
    }
    triggerChange({ unit: newUnit });
  };
  return (
    <span>
      <Input
        placeholder="amount"
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        style={{ width: 100 }}
      />
      <Select
        value={value.unit || unit}
        style={{ width: 80, margin: '0 8px' }}
        onChange={onUnitChange}
      >
        <Option value="kg">kg</Option>
        <Option value="pic">pic</Option>
        <Option value="lt">lt</Option>
      </Select>
    </span>
  );
};
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };
  
  const checkPrice = (_: any, value: { number: number }) => {
    if (value.number > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Amount must be greater than zero!'));
  };

const RequestForm: React.FC = () => (
  <>
  <p className='login-header-text'>Request form</p>
  <Card  className='request-form-card' style={{ maxWidth: 600 }} >
    <Form
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      autoComplete="off"
    >
      <Form.List name="RequestedItems">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 6 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name,'itemType']}
                  rules={[{ required: true, message: 'Missing Item type' }]}
                >
                  {/* <Input placeholder="Item Type" /> */}
                  <Select showSearch placeholder="Item Type">
                    
                  {itemOption.map((option:any,index:number)=>(<Option key={index} value={option.value}>{option.name}</Option>)) }
                    
                  </Select>
                </Form.Item>
                 <Form.Item name={[name,'itemAmout']}
                 {...restField} rules={[{ validator: checkPrice }]}>
                   <AmountInput />
                  </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button  onClick={() => add()} block icon={<PlusOutlined />}>
                Add Item
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button className='login-form-button' htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </Card>
  </>
);

export default RequestForm;

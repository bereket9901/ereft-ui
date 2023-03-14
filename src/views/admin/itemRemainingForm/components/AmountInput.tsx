import { Input } from "@chakra-ui/react";
import { useState } from "react";

interface AmountValue {
    number?: number;
  }
  
  interface AmountInputProps {
    value?: AmountValue;
    onChange?: (value: AmountValue) => void;
  }
  
  const AmountInput: React.FC<AmountInputProps> = ({ value ={}, onChange }) => {
    const [number, setNumber] = useState(0);
   
  
    const triggerChange = (changedValue:{ number?: number;} ) => {
      onChange?.({ number, ...value, ...changedValue });
    };
  
    const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newNumber = parseInt(e.target.value || "0", 10);
      if (Number.isNaN(number)) {
        return;
      }
      if (!("number" in value)) {
        setNumber(newNumber);
      }
      triggerChange({ number: newNumber });
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
      </span>
    );
  };
  
 

  export default AmountInput;
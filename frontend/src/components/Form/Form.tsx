import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import s from './Form.module.css';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';


// 1. Define a Field config type
export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'radio' | 'title' | 'select'; // added 'title' type
  required?: boolean;
  options?: string[]; // only for radio
}

// 2. Define your component props
interface FormProps {
  fields: FieldConfig[];
  onSubmit?: (values: Record<string, string>) => void;
}

const Form: React.FC<FormProps> = ({ fields, onSubmit }) => {
  // values are strings for both text/number/radio
  const [values, setValues] = useState<Record<string, string>>({});

  // 3. Type your handler parameters
  const handleChange = (name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  return (
    <form className={s.formParent} onSubmit={handleSubmit}>
      <div className={s.form}>
        <FormControl fullWidth className={s.formControl}>
          {fields.map(field => {
            switch (field.type) {
               case 'title':
                return (
                  <h1>
                    {field.label}
                  </h1>
                );
              case 'text':
              case 'number':
                return (
                  <TextField
                    key={field.name}
                    className={s.textField}
                    sx={{ backgroundColor: 'white' }}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    variant="filled"
                    required={field.required}
                    fullWidth
                    value={values[field.name] || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(field.name, e.target.value)
                    }
                  />
                );

              case 'radio':
                return (
                  <div key={field.name}>
                    <FormLabel id={`${field.name}-label`}>{field.label}</FormLabel>
                    <RadioGroup
                      aria-labelledby={`${field.name}-label`}
                      name={field.name}
                      value={values[field.name] || ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(field.name, e.target.value)
                      }
                    >
                      {field.options?.map(opt => (
                        <FormControlLabel
                          key={opt}
                          value={opt}
                          control={<Radio />}
                          label={opt}
                        />
                      ))}
                    </RadioGroup>
                  </div>
                );
              
              case 'select':
                return (
                  <FormControl fullWidth key={field.name} variant="filled" sx={{ mb: 2 }}>
                    <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                    <Select
                      labelId={`${field.name}-label`}
                      name={field.name}
                      value={values[field.name] || ''}
                      onChange={(e) =>
                        handleChange(field.name, e.target.value as string)
                      }
                      required={field.required}
                    >
                      {field.options?.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );


              default:
                return null;
            }
          })}
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </FormControl>
      </div>
    </form>
  );
};

export default Form;

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
  OutlinedInput,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

// 1. Field config type
export interface Option {
  id: string;
  label: string;
}


export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'radio' | 'title' | 'select' | 'multiselect' | 'password';
  required?: boolean;
  options?: Option[];
}
// 2. Props
interface FormProps {
  fields: FieldConfig[];
  onSubmit?: (values: Record<string, string | string[]>) => void;
}

type FormValues = Record<string, string | string[]>;

const Form: React.FC<FormProps> = ({ fields, onSubmit }) => {
  const [values, setValues] = useState<FormValues>({});

  const handleChange = (name: string, value: string | string[]) => {
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
                return <h1 key={field.name}>{field.label}</h1>;

              case 'password':
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
                    value={(values[field.name] as string) || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(field.name, e.target.value)
                    }
                  />
                );

             case "radio":
              return (
                <div key={field.name}>
                  <FormLabel id={`${field.name}-label`}>{field.label}</FormLabel>
                  <RadioGroup
                    aria-labelledby={`${field.name}-label`}
                    name={field.name}
                    value={(values[field.name] as string) || ""} // stores opt.id
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(field.name, e.target.value) // "true" or "false"
                    }
                  >
                    {field.options?.map((opt) => (
                      <FormControlLabel
                        key={opt.id}
                        value={opt.id}
                        control={<Radio />}
                        label={opt.label}
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
                      value={(values[field.name] as string) || ''}     // stores id
                      onChange={(e) => handleChange(field.name, e.target.value as string)}
                      required={field.required}
                    >
                      {field.options?.map((opt) => (
                        <MenuItem key={opt.id} value={opt.id}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </Select>

                  </FormControl>
                );

              case 'multiselect':
                return (
                  <FormControl fullWidth key={field.name} variant="filled" sx={{ mb: 2 }}>
                    <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                   <Select
                    multiple
                    labelId={`${field.name}-label`}
                    name={field.name}
                    value={(values[field.name] as string[]) || []}   // stores ids
                    onChange={(e) => {
                      const v = e.target.value;
                      handleChange(field.name, typeof v === 'string' ? v.split(',') : (v as string[]));
                    }}
                    renderValue={(selected) => {
                      const ids = selected as string[];
                      const idToLabel = new Map(field.options?.map(o => [o.id, o.label]));
                      return ids.map(id => idToLabel.get(id) ?? id).join(', ');
                    }}
                  >
                    {field.options?.map((opt) => (
                      <MenuItem key={opt.id} value={opt.id}>
                        {opt.label}
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

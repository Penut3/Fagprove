import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ApiUrl = import.meta.env.VITE_BACKEND_API // e.g. "http://localhost:3000/"

type Field = {
  name: string
  label: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  defaultValue?: string
}

const fields: Field[] = [
  { name: "firstName", label: "Fornavn", placeholder: "Ola" },
  { name: "lastName", label: "Etternavn", placeholder: "Nordmann" },
  { name: "email", label: "Email", type: "email", placeholder: "ola@eksempel.no" },
]

export default function Registrer() {
  const [values, setValues] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ""]))
  )

  const onChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((v) => ({ ...v, [name]: e.target.value }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // NO error handling on purpose (as requested)
    await fetch(`${ApiUrl}users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
  }

  return (
   
      <div className="w-full max-w-lg mx-auto p-6 space-y-6">
        <h1 className=" font-semibold" style={{fontSize:"30px", marginBottom:"20px"}}>Registrer deltager</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          {fields.map((f) => (
            <div key={f.name} className="space-y-2">
              <Label htmlFor={f.name}>{f.label}</Label>
              <Input
                id={f.name}
                name={f.name}
                type={f.type ?? "text"}
                placeholder={f.placeholder}
                value={values[f.name] ?? ""}
                onChange={onChange(f.name)}
              />
            </div>
          ))}

          <Button type="submit" className="w-full">
            Send
          </Button>
        </form>
      </div>
   
  )
}

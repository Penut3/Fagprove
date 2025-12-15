import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";

const ApiUrl = import.meta.env.VITE_BACKEND_API;

type FormValues = Record<string, string | string[]>;

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (values: FormValues) => {
    const email = values.email as string;
    const password = values.password as string;

    console.log("VALUES FROM FORM:", values);

    const response = await fetch(`${ApiUrl}users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Send only what the backend likely expects
      body: JSON.stringify({ email, password }),
      credentials: "include", // include cookies if your backend uses them
    });

    let data: any = null;
    try {
      data = await response.json();
    } catch {
      // if backend returns empty body on error, avoid crashing
    }

    console.log("API response:", data);

    if (!response.ok) {
      throw new Error(data?.message || "Login failed");
    }

    if (data?.role_name === "Kontoransatt") {
      navigate("/kontoransatt");
    } else if (data?.role_name === "Lærer") {
      navigate("/laerer");
    } else {
      // fallback if role is something else / missing
      navigate("/");
    }
  };

  return (
    <section>
      <div className="contentWidth">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            minHeight: "90vh",
          }}
        >
          <Form
            fields={[
              { type: "title", name: "title", label: "Logg inn" },
              { type: "text", name: "email", label: "Email", required: true },
              {
                type: "password",
                name: "password",
                label: "Passord",
                required: true,
              },
            ]}
            onSubmit={handleLogin}
          >
            <h1>vilkår og betingelser</h1>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default Login;

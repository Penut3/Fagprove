import Form from '../../components/Form/Form'
import { useNavigate } from 'react-router-dom';

const ApiUrl = import.meta.env.VITE_BACKEND_API;

function Login() {
const navigate = useNavigate();

  const handleLogin = async (values: Record<string, string>) => {
    console.log('VALUES FROM FORM:', values);

    const response = await fetch(`${ApiUrl}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    console.log('API response:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    if(data.role_name == "kontoransatt"){
        navigate("/kontoransatt")
    }
     else if(data.role_name == "lærer"){
        navigate("/laerer")
    }
  };


  return(
    <section>
      <div className='contentWidth'>
        <div style={{display:"flex", alignItems:"center", height:"100%", minHeight:"90vh"}}>
         <Form
          fields={[
            // { type: 'title', name: 'title', label: 'Registrert Bruker' },
            // { name: 'ExistingUser', label: 'finnes bruker?', type: 'select', options: ['USA', 'Canada', 'Mexico'] },
            { type: 'title', name: 'title', label: 'Logg inn' },
            { type: 'text', name: 'email', label: 'Email', required: true },
            { type: 'password', name: 'password', label: 'Passord', required: true },
          ]}
           onSubmit={handleLogin}
        />
        </div>
      </div>
    </section>
 

  ) 
}



export default Login;

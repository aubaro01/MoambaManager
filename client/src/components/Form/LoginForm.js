import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { api } from "../../services/api";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [logName, setLogName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onLogin(logName, password);
  };

  const onLogin = async (logName, password) => {
    setLoading(true);
    try {
      const response = await api.post('/user/login', { logName, password });

      const { token } = response.data;
      localStorage.setItem('jwt_token', token);

      alert('Login realizado com sucesso!');
      setLogName('');
      setPassword('');

      navigate('/dashboard');  
    } catch (error) {
      alert('Erro no login: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex flex-column gap-4">
        <div className="flex flex-column gap-2">
          <label htmlFor="logname" className="font-medium text-700">Log Name</label>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText
              id="logname"
              type="text"
              value={logName}
              onChange={(e) => setLogName(e.target.value)}
              placeholder="Teste12323"
              required
              className="w-full"
              pt={{ root: { style: { border: 'none', borderBottom: '1px solid #ced4da' } } }}
            />
          </div>
        </div>

        <div className="flex flex-column gap-2">
          <label htmlFor="password" className="font-medium text-700">Senha</label>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">
              <i className="pi pi-lock"></i>
            </span>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              toggleMask
              placeholder="Digite sua senha"
              required
              inputClassName="w-full"
              inputStyle={{ border: 'none', borderBottom: '1px solid #ced4da' }}
              pt={{
                input: { 
                  style: { 
                    border: 'none', 
                    borderBottom: '1px solid #ced4da',
                    paddingLeft: '0',
                    borderRadius: '0'
                  } 
                }
              }}
            />
          </div>
        </div>

        <div className="mt-2">
          <Button
            label="Entrar"
            icon="pi pi-arrow-right"
            iconPos="right"
            className="w-full"
            type="submit"
            loading={loading}
            pt={{
              root: { 
                style: { 
                  padding: '0.75rem', 
                  borderRadius: '12px',
                  background: 'linear-gradient(90deg, var(--primary-500) 0%, var(--primary-700) 100%)',
                  border: 'none'
                } 
              },
              label: { className: 'font-semibold' }
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

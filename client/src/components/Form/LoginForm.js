import React, { useState, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { api } from "../../services/api";
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast'; 

const LoginForm = () => {
  const [logName, setLogName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!logName.trim() || !password.trim()) {
      toast.current.show({
        severity: 'warn',
        summary: 'Campos obrigatórios',
        detail: 'Preencha todos os campos',
        life: 3000
      });
      return;
    }
  };

  const onLogin = async (logName, password) => {
  setLoading(true);
  try {

    const response = await api.post('/user/login', { 
      logName, 
      password 
    });

      if (response.status === 200) {
        const { token } = response.data;
        
        localStorage.setItem('jwt_token', token);
        
        setLogName('');
        setPassword('');
        
        toast.current.show({
          severity: 'success',
          summary: 'Login realizado!',
          detail: 'Redirecionando...',
          life: 2000
        });
        
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        throw new Error('Resposta inesperada do servidor');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           error.message || 
                           'Erro desconhecido';
      
      toast.current.show({
        severity: 'error',
        summary: 'Falha no login',
        detail: errorMessage,
        life: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast ref={toast} position="top-right" />
      
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
                placeholder="Seu identificador"
                required
                className="w-full"
                pt={{ root: { style: { border: 'none', borderBottom: '1px solid #ced4da' } } }}
                autoComplete="username"
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
                placeholder="Sua senha secreta"
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
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="mt-2">
            <Button
              label={loading ? "Autenticando..." : "Entrar"}
              icon={loading ? null : "pi pi-arrow-right"}
              iconPos="right"
              className="w-full"
              type="submit"
              loading={loading}
              disabled={loading}
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
    </>
  );
};

export default LoginForm;
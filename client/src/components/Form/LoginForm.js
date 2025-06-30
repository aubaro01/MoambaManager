import React, { useState, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const LoginForm = ({ onLogin, loading }) => {
  const [logName, setLogName] = useState('');
  const [password, setPassword] = useState('');
  const toast = useRef(null);

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

    onLogin(logName, password);
  };

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <form onSubmit={handleSubmit} className="p-6">
        <div className="flex flex-column gap-4">
          <div className="flex flex-column gap-2">
            <label htmlFor="logname" className="font-medium text-700">Login</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                id="logname"
                value={logName}
                onChange={(e) => setLogName(e.target.value)}
                placeholder="O seu login"
                required
                className="w-full"
                autoComplete="username"
              />
            </div>
          </div>

          <div className="flex flex-column gap-2">
            <label htmlFor="password" className="font-medium text-700">Password</label>
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
                placeholder="A sua password"
                required
                inputClassName="w-full"
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="mt-2">
            <Button
              label={loading ? "Autenticar..." : "Entrar"}
              icon={loading ? null : "pi pi-arrow-right"}
              iconPos="right"
              className="w-full"
              type="submit"
              loading={loading}
              disabled={loading}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;

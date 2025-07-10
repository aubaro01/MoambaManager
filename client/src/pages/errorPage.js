import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage({
    code = 404,
    message = "Página não encontrada",
    subMessage = "A página que você procura não existe ou ocorreu um erro inesperado"
}) {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Erro ${code} | ${message}`;
    }, [code, message]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <div className="animate-pulse">
                        <i className="pi pi-exclamation-circle text-8xl text-red-500 dark:text-red-400"></i>
                    </div>
                </div>
                <h1 className="text-8xl font-extrabold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent mb-4">
                    {code}
                </h1>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                    {message}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {subMessage}
                </p>
                <div className="flex flex-col items-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 sm:justify-center">
                    <Button
                        label="Voltar"
                        icon="pi pi-arrow-left"
                        className="p-button-outlined p-button-secondary"
                        onClick={() => navigate(-1)}
                    />
                    <Button
                        label="Página Inicial"
                        icon="pi pi-home"
                        className="p-button p-button-primary"
                        onClick={() => navigate('/')}
                    />
                </div>
            </div>
        </div>
    );
}

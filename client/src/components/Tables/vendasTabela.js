import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const TabelaExemplo = () => {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        // Dados simulados (poderiam vir de uma API)
        const dadosMock = [
            { id: 1, nome: 'João', idade: 28, cidade: 'São Paulo' },
            { id: 2, nome: 'Maria', idade: 34, cidade: 'Rio de Janeiro' },
            { id: 3, nome: 'Carlos', idade: 22, cidade: 'Belo Horizonte' },
            { id: 4, nome: 'Ana', idade: 30, cidade: 'Curitiba' },
            { id: 5, nome: 'Paulo', idade: 41, cidade: 'Salvador' },
            { id: 6, nome: 'Fernanda', idade: 27, cidade: 'Recife' },
            { id: 7, nome: 'Lucas', idade: 35, cidade: 'Brasília' },
            { id: 8, nome: 'Cláudia', idade: 29, cidade: 'Fortaleza' },
            { id: 9, nome: 'Bruno', idade: 26, cidade: 'Manaus' },
            { id: 10, nome: 'Patrícia', idade: 33, cidade: 'Porto Alegre' },
        ];

        setDados(dadosMock);
    }, []);

    return (
        <div className="card" style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
            <h3>Tabela de Pessoas</h3>
            <DataTable
                value={dados}
                paginator
                rows={5}
                scrollable
                scrollHeight="400px"
                responsiveLayout="scroll"
                style={{ minWidth: '1000px' }}
            >
                <Column field="id" header="ID" sortable style={{ width: '100px' }}></Column>
                <Column field="nome" header="Nome" sortable style={{ width: '200px' }}></Column>
                <Column field="idade" header="Idade" sortable style={{ width: '150px' }}></Column>
                <Column field="cidade" header="Cidade" sortable style={{ width: '250px' }}></Column>
            </DataTable>
        </div>
    );
};

export default TabelaExemplo;

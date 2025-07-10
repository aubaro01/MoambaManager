import React from 'react';
import { Calendar } from 'primereact/calendar';
import { addLocale, locale } from 'primereact/api';

addLocale('pt', {
    firstDayOfWeek: 1,
    dayNames: ['domingo','segunda','terça','quarta','quinta','sexta','sábado'],
    dayNamesShort: ['dom','seg','ter','qua','qui','sex','sáb'],
    dayNamesMin: ['D','S','T','Q','Q','S','S'],
    monthNames: ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'],
    monthNamesShort: ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'],
    today: 'Hoje',
    clear: 'Limpar',
    chooseDate: 'Escolher data',
    dateFormat: 'dd/mm/yy',
});

locale('pt');

export default function DateRangePicker({ value, onChange }) {
    return (
        <Calendar
            value={value}
            onChange={(e) => onChange(e.value)}
            selectionMode="range"
            readOnlyInput
            hideOnRangeSelection
            showIcon
            placeholder="Ver vendas de uma data..."
            locale="pt"
        />
    );
}

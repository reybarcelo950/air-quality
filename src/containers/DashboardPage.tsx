import React, {useEffect, useState} from 'react';
import {Container, Grid, Paper, Typography} from '@mui/material';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import Header from "../components/Header";
import AreaContainer from '../components/AreaContainer/AreaContainer';
import MetricsGrid from "../components/MetricsGrid";

const defaultFilters = {
    from: new Date(2004, 0, 1),
    to: new Date(2005, 11, 31),
}

const DashboardPage = () => {
    // filter state
    const [range, setRange] = useState<{ from: Date, to: Date }>(defaultFilters);
    const [category, setCategory] = useState('all');

    // data state
    const [data, setData] = useState<any[]>([]);
    const [rows, setRows] = useState<any[]>([]);

    // example fetch effect
    useEffect(() => {
        // TODO: replace with real data fetching based on filters
        const generated: any[] = [];
        const start = range.from;
        const end = range.to;
        const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        for (let i = 0; i <= diff; i++) {
            const date = new Date(start.getTime() + i * 1000 * 60 * 60 * 24);
            const value = Math.floor(Math.random() * 100);
            generated.push({date: date.toISOString().slice(0, 10), value});
        }
        setData(generated);
        setRows(generated.map((d, idx) => ({id: idx, date: d.date, value: d.value})));
    }, [range, category]);

    const cols: GridColDef[] = [
        {field: 'date', headerName: 'Date', flex: 1},
        {field: 'value', headerName: 'Value', flex: 1}
    ];

    return (
        <Container className="w-full py-6 flex flex-col gap-4">
            <Header/>

            <MetricsGrid />

            <AreaContainer>
                <Typography variant="h6" gutterBottom>Trend Over Time</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                    </LineChart>
                </ResponsiveContainer>
            </AreaContainer>

            <AreaContainer>
                <Typography variant="h6" gutterBottom>Data Table</Typography>
                <div style={{height: 400, width: '100%'}}>
                    <DataGrid rows={rows} columns={cols} pageSize={10} rowsPerPageOptions={[10]}/>
                </div>
            </AreaContainer>
        </Container>
    );
};

export default DashboardPage;

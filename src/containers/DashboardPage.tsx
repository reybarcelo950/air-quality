import React from 'react';
import {Container} from '@mui/material';
import Header from "../components/Header";
import MetricsGrid from "../components/MetricsGrid";
import LineChartSection from "../components/LineChartSection";

const defaultFilters = {
    from: new Date(2004, 0, 1),
    to: new Date(2005, 11, 31),
}

const DashboardPage = () => {
    return (
        <Container className="w-full py-6 flex flex-col gap-4">
            <Header/>
            <MetricsGrid/>
            <LineChartSection/>
        </Container>
    );
};

export default DashboardPage;

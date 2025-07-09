import React from 'react';
import {Container} from '@mui/material';
import Header from "../components/Header";
import MetricsGrid from "../components/MetricsGrid";
import LineChartSection from "../components/LineChartSection";
import {FilterProvider} from "../providers/FilterProvider";

const DashboardPage = () => {
    return (
        <FilterProvider>
            <Container className="w-full py-6 flex flex-col gap-4">
                <Header/>
                <MetricsGrid/>
                <LineChartSection/>
            </Container>
        </FilterProvider>
    );
};

export default DashboardPage;

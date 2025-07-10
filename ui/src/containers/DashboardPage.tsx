import React from 'react';
import {Container} from '@mui/material';
import Header from "../components/Header";
import MetricsGrid from "../components/MetricsGrid";
import LineChartSection from "../components/LineChartSection";
import {FilterProvider} from "../providers/FilterProvider";
import DataListSection from '../components/DataListSection';

const DashboardPage = () => {
    return (
        <FilterProvider>
            <Container className="w-full py-6 flex flex-col gap-4">
                <Header/>
                <MetricsGrid/>
                <LineChartSection/>
                <DataListSection/>
            </Container>
        </FilterProvider>
    );
};

export default DashboardPage;

import React from 'react';
import DashboardPage from "./containers/DashboardPage";
import './App.css'
import QueryProvider from "./providers/QueryProvider";

const App = () => {
    return (<QueryProvider>
        <DashboardPage/>
    </QueryProvider>);
};

export default App;

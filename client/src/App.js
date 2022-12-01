import React from 'react';
import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import SideBar from "./components/topBar";
import Dashboard from "./page/dashboard";
import {Routes, Route} from "react-router-dom";
import TopBar from "./components/topBar";

function App() {
    const [theme, colorMode] = useMode()
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <main className="content">
                        <TopBar />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />

                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>

    )
}

export default App;





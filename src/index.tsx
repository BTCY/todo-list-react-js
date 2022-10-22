import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme/MainTheme';
import reportWebVitals from './reportWebVitals';
import { TodoProvider } from './providers/TodoProvider';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { CssBaseline, ThemeProvider } from '@mui/material';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <DndProvider backend={HTML5Backend}>
                <TodoProvider>
                    <App />
                </TodoProvider>
            </DndProvider>
        </ThemeProvider>
    </React.StrictMode>
);


reportWebVitals();

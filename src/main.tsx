import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Link, Outlet, RouterProvider, createHashRouter } from 'react-router-dom';

import './index.css';
import AddView from './views/AddView';
import DocumentationView from './views/DocumentationView';
import TimersView from './views/TimersView';

const PageIndex = () => {
    return (
        <div>
            <h1>Assignment</h1>
            <ul>
                <li>
                    <Link to="/">Timers</Link>
                </li>
                <li>
                    <Link to="/docs">Documentation</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    );
};

const router = createHashRouter([
    {
        path: '/',
        // element: <PageIndex />,
        children: [
            {
                index: true,
                element: <TimersView />,
            },
            {
                path: '/docs',
                element: <DocumentationView />,
            },
            {
                path: '/add',
                element: <AddView />,
            },
        ],
    },
]);

// biome-ignore lint/style/noNonNullAssertion: root html element is there
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
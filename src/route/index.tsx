import {Suspense, lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

interface RouteItem {
    id: number;
    path?: string;
    isIndex?: boolean;
    fallback: any;
    element: any;
}

const Home = lazy(() => import('../pages/Home'));
const About = lazy(
    () =>
        new Promise((resolve) => {
            setTimeout(() => resolve(import('../pages/About') as any), 1500);
        })
);
const Login = lazy(() => import('../pages/Login'));

const routeList: Array<RouteItem> = [
    {
        id: 0,
        isIndex: true,
        fallback: <>Home...</>,
        element: <Home />
    },
    {
        id: 1,
        path: '/about',
        fallback: <>About...</>,
        element: <About />
    },
    {
        id: 2,
        path: '/login',
        fallback: <>Login...</>,
        element: <Login />
    },
    {
        id: 3,
        path: '*',
        fallback: <>Home...</>,
        element: <Home />
    }
];

function PageRouter() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                {routeList.map((route: RouteItem) => {
                    return (
                        <Route
                            key={route.id}
                            index={route.isIndex ? true : false}
                            path={route.path ? route.path : undefined}
                            element={<Suspense fallback={route.fallback}>{route.element}</Suspense>}
                        />
                    );
                })}
            </Route>
        </Routes>
    );
}

export default PageRouter;

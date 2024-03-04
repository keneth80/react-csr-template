import {Suspense, lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import EmptyLayout from '../layout/EmpltyLayout';

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
const SignIn = lazy(() => import('../pages/SignIn'));
const Dashboard = lazy(() => import('../pages/Dashboard'));

const routeList: Array<RouteItem> = [
    {
        id: 0,
        isIndex: true,
        fallback: <>Home Loading...</>,
        element: <Home />
    },
    {
        id: 1,
        path: '/about',
        fallback: <>About Loading...</>,
        element: <About />
    },
    {
        id: 3,
        path: '*',
        fallback: <>Home Loading...</>,
        element: <Home />
    },
    {
        id: 4,
        path: '/dashboard',
        fallback: <>Dashboard Loading...</>,
        element: <Dashboard />
    }
];

const emptyRouteList: Array<RouteItem> = [
    {
        id: 2,
        path: '/login',
        fallback: <>Loading...</>,
        element: <SignIn />
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
            <Route element={<EmptyLayout />}>
                {emptyRouteList.map((route: RouteItem) => {
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

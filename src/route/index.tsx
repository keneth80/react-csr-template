import {Suspense, lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import EmptyLayout from '../layout/EmpltyLayout';
import LoadingBar from '../componenets/common/LoadingBar';
import ProtectedRoute from '../route/ProtectedRoute';
import {AuthProvider} from '../hooks/auth/useAuth';
import {Verify2FA} from '../pages/Verify2FA';

export interface RouteItem {
    id: number;
    path?: string;
    isIndex?: boolean;
    fallback: any;
    element: any;
    routeName?: string;
}

const Home = lazy(() => import('../pages/Home'));
const About = lazy(
    () =>
        new Promise((resolve) => {
            setTimeout(() => resolve(import('../pages/About') as any), 1500);
        })
);
const SignIn = lazy(() => import('../pages/SignIn'));
const SignUp = lazy(() => import('../pages/SignUp'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const NotFound = lazy(() => import('../pages/NotFound'));
const StepLayout = lazy(() => import('../pages/StepLayout'));

export const routeList: Array<RouteItem> = [
    {
        id: 0,
        routeName: 'Home',
        isIndex: true,
        fallback: <LoadingBar />,
        element: <Home />
    },
    {
        id: 1,
        routeName: 'About',
        path: '/about',
        fallback: <LoadingBar />,
        element: <About />
    },
    {
        id: 3,
        routeName: 'Dashboard',
        path: '/dashboard',
        fallback: <LoadingBar />,
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        )
    },
    {
        id: 4,
        routeName: 'Step Example',
        path: '/step',
        fallback: <LoadingBar />,
        element: <StepLayout />
    }
];

const emptyRouteList: Array<RouteItem> = [
    {
        id: 11,
        path: '/login',
        fallback: <LoadingBar />,
        element: <SignIn />
    },
    {
        id: 12,
        path: '/signup',
        fallback: <LoadingBar />,
        element: <SignUp />
    },
    {
        id: 13,
        path: '*',
        fallback: <LoadingBar />,
        element: <NotFound />
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
                <Route path="/verify-2fa" element={<Verify2FA />} />
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

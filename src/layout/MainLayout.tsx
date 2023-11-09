import {Link} from 'react-router-dom';
import Header from '../pages/common/Header';
import Footer from '../pages/common/Footer';
import {Outlet} from 'react-router-dom';

function MainLayout() {
    return (
        <>
            <Header isMain={true}></Header>
            <div className="route-container">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/login">Login</Link>
            </div>
            <Outlet />
            <Footer></Footer>
        </>
    );
}

export default MainLayout;

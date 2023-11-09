import logo from '../../logo.svg';
import '../../App.css';

function Header({isMain}: {isMain: boolean}) {
    console.log('isMain : ', isMain);
    return (
        <header className="app-header">
            <img src={logo} className="app-logo" alt="logo" />
        </header>
    );
}

export default Header;

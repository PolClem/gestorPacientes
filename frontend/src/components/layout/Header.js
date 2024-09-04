import '../../styles/components/layout/Header.css';

const Header = (props) => {
    return(
        <header>
            <div className="holderHeader">
                <img src="images/logo.png" width="100" alt='logo'/>
                <h1>Gestión de pacientes</h1>
            </div>
        </header>
    );
}

export default Header;

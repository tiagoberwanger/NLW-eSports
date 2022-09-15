import logoImg from '../assets/logo-nlw-esports.png'

function Header() {
    return (
        <>
            <img src={logoImg} alt="logo" />
            <h1 className="text-6xl text-white font-black mt-20">
                Seu <span className='text-transparent bg-clip-text bg-nlw-gradient'>duo</span> está aqui.
            </h1>
        </>
    );
}

export default Header;
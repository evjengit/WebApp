import Title from "./Title";

export default function Header () {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <a className="nav-a" href="#">Home</a>
                    </li>
                    <li>
                        <a className="nav-a" href="#">Projekter</a>
                    </li>
                </ul>
            </nav>
            <Title title="Prosjekter" level="1"/>
        </header>
    )
}
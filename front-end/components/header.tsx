import Link from 'next/link';
import React, { useEffect, useState } from "react";

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

    useEffect(() => {
        const user = sessionStorage.getItem("loggedInUser")
        if (user) {
            setLoggedInUser(user)
        }
    }, [])

    const handleLogOut = () => {
        sessionStorage.removeItem("loggedInUser")
        setLoggedInUser(null)
    }

    return (
        <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
            <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
                {' '}
                Recipe share
            </a>
            <nav className="nav justify-content-center">
                <Link href="/" className="nav-link px-4 fs-5 text-white">
                    Home
                </Link>
                <Link href="/recipes" className="nav-link px-4 fs-5 text-white">
                    Recipes
                </Link>
                {!loggedInUser && <Link href="/login" className="nav-link px-4 fs-5 text-white">
                    Log in
                </Link>}
                {loggedInUser && <a
                    onClick={handleLogOut}
                    href="/login"
                    className="nav-link px-4 fs-5 text-white"
                >
                    Logout
                </a>}
            </nav>
        </header>
    )
}
export default Header
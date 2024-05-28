import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate('/')
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center text-center text-2xl font-bold">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/" onClick={handleGoHome} className="mt-8 rounded-md bg-blue-500 px-8 py-3 text-white transition-colors hover:bg-blue-600">
                Go Home
            </Link>
        </div>
    )
}

export default NotFoundPage
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, { email, password });
            localStorage.setItem('token', res.data.token);
            router.push('/upload');
        } catch (err) {
            setError('Connexion échouée. Vérifie tes identifiants.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-md rounded p-6 w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-4 text-center">Connexion</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <input
                    type="text"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring focus:border-blue-400"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-400"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    Se connecter
                </button>
            </div>
        </div>
    );
}

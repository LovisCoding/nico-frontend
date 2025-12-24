import { useState } from 'react';

// MUI
import { Container, Paper, TextField, Typography, Button, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router';
import api from '../lib/api.js';
import SEO from '../components/SEO.jsx';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        try {
            const res = await api.post(`auth/login`, { name: email, password });
            localStorage.setItem('token', res.data.access_token);
            api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
            await navigate('/upload');
        } catch (err) {
            setError('Connexion échouée. Vérifie tes identifiants.');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default'
            }}
        >
            <SEO title="Connexion" description="Connectez-vous pour accéder à l'administration." />
            <Container maxWidth="xs">
                <Paper
                    elevation={6}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 3
                    }}
                >
                    <Box
                        component="img"
                        src="/logo.png"
                        alt="Logo"
                        sx={{ width: 80, height: 'auto', mb: 2 }}
                    />

                    <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                        Connexion
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email / Nom d'utilisateur"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem' }}
                        >
                            Se connecter
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

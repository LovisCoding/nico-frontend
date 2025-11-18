import { useState } from 'react';

// MUI
import { Container, Paper, TextField, Typography, Button, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router';
import api from '../lib/api.js';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
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
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <Paper elevation={3} sx={{ width: '100%', padding: 4, borderRadius: 2 }}>
              <Typography variant="h5" align="center" marginBottom={3}>
                  Connexion
              </Typography>

              {error && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                    {error}
                </Alert>
              )}

              <Box display="flex" flexDirection="column" gap={2}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    fullWidth
                  />

                  <TextField
                    label="Mot de passe"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    fullWidth
                  />

                  <Button variant="contained" fullWidth onClick={handleLogin}>
                      Se connecter
                  </Button>
              </Box>
          </Paper>
      </Container>
    );
}

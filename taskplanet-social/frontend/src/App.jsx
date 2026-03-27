import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FeedPage from './pages/FeedPage';
import CreatePostPage from './pages/CreatePostPage';
import './styles/global.css';
const brutalTheme = createTheme({
  palette: {
    primary: {
      main: '#0033CC',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0A0A0A',
    }
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: '2px solid #0A0A0A',
          boxShadow: '3px 3px 0px #0A0A0A',
          transition: 'all 0.1s ease-in-out',
          '&:hover': {
            transform: 'translate(-1px, -1px)',
            boxShadow: '4px 4px 0px #0A0A0A',
          },
          '&:active': {
            transform: 'translate(3px, 3px)',
            boxShadow: '0px 0px 0px #0A0A0A',
          }
        },
        contained: {
          backgroundColor: '#0A0A0A',
          color: '#FFFFFF',
          borderColor: '#0A0A0A',
          '&:hover': {
            backgroundColor: '#000000',
          }
        },
        outlined: {
          backgroundColor: '#FFFFFF',
          color: '#0A0A0A',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '2px solid #0A0A0A',
          boxShadow: '6px 6px 0px #0A0A0A',
          overflow: 'visible',
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            border: '2px solid #0A0A0A',
            backgroundColor: '#FFFFFF',
            boxShadow: '3px 3px 0px #0A0A0A',
            transition: 'all 0.1s ease-in-out',
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
            '&.Mui-focused': {
              transform: 'translate(-1px, -1px)',
              boxShadow: '4px 4px 0px #0A0A0A',
            },
            '&.Mui-focused fieldset': {
              border: 'none',
            },
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#0A0A0A',
          borderBottom: '2px solid #0A0A0A',
          boxShadow: 'none',
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '2px solid #0A0A0A',
        }
      }
    }
  }
});
function App() {
  return (
    <ThemeProvider theme={brutalTheme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/feed" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route 
              path="/create" 
              element={
                <ProtectedRoute>
                  <CreatePostPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
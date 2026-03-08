import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { mapel, paket, jenjang } = location.state || {}; // Get data from previous page

    const [username, setUsername] = useState('P130100230');
    const [password, setPassword] = useState('.....');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/confirmation', { state: { mapel, paket, jenjang } }); // Pass data forward
        }, 2000);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#ffffff',
            zIndex: 99999,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            {/* GLOBAL LOADING GIF OVERLAY */}
            {loading && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(255,255,255,0.8)', zIndex: 999999,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <img src="/images/loader2.gif" alt="Loading..." />
                </div>
            )}

            {/* Header */}
            <div className="header-container d-flex align-items-center" style={{
                backgroundImage: 'url(/images/bg-top.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '110px', /* Slight height adjustment */
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                flexShrink: 0,
                position: 'relative', /* Override fixed if needed, or keep relative to flex col */
                zIndex: 10001
            }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex align-items-center">
                                <div className="logo-container mr-4">
                                    <img src="/images/logo-edutry.png" alt="Logo" style={{ height: 90, filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))' }} />
                                </div>
                                <div className="header-text text-left text-white">
                                    <h3 style={{ fontSize: 24, fontWeight: 700, margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.3)', fontFamily: 'Poppins, sans-serif' }}>EDUTRY_TKA</h3>
                                    <p style={{ fontSize: 13, margin: 0, opacity: 0.9, textShadow: '0 1px 2px rgba(0,0,0,0.3)', fontFamily: 'Poppins, sans-serif' }}>APLIKASI SIMULASI TKA ONLINE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: '20px'
            }}>
                <div className="auth-card fadeIn" style={{
                    background: '#fff',
                    padding: '45px 50px',
                    borderRadius: '20px', /* Match Login Page */
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)', /* Stronger shadow for floating effect */
                    width: '100%',
                    maxWidth: '500px',
                    textAlign: 'left',
                    border: '1px solid rgba(0,0,0,0.05)',
                    position: 'relative',
                    top: '-20px' /* Slight offset upwards */
                }}>
                    <h4 className="mb-2" style={{ fontWeight: 700, color: '#333' }}>Selamat Datang</h4>
                    <p style={{ color: '#666', marginBottom: '30px', fontSize: '14px' }}>Silakan login dengan menggunakan username dan password yang anda miliki</p>

                    <form onSubmit={handleLogin}>
                        {/* Username */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold', fontSize: '14px', marginBottom: '5px', color: '#333' }}>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 15px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: '30px', position: 'relative' }}>
                            <label style={{ display: 'block', fontWeight: 'bold', fontSize: '14px', marginBottom: '5px', color: '#333' }}>Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 15px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    fontSize: '16px'
                                }}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '15px',
                                    top: '35px',
                                    cursor: 'pointer',
                                    color: '#666'
                                }}
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </span>
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                cursor: 'pointer',
                                boxShadow: '0 4px 6px rgba(0,123,255,0.3)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            Login
                        </button>

                    </form>
                </div>
            </div>
        </div >
    );
};

export default AuthPage;

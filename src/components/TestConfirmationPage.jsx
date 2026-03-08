import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TestConfirmationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const mapel = location.state?.mapel || 'Matematika';
    const paket = location.state?.paket || '';

    // Formatting current date for "Waktu Tes"
    const now = new Date();
    // Format: MM/DD/YYYY HH:MM (matching screenshot 02/18/2026 02:56)
    const formattedDate = now.toLocaleDateString('en-US', {
        month: '2-digit', day: '2-digit', year: 'numeric'
    }) + ' ' + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const [loading, setLoading] = useState(false);

    const handleStart = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // Navigate to the actual exam
            navigate('/exam', { state: { mapel, paket } });
        }, 2000);
    };

    return (
        <div style={{
            minHeight: '100vh',
            fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            background: '#f4f4f4', // Light gray background for body
            position: 'relative'
        }}>
            {/* GLOBAL LOADING GIF OVERLAY */}
            {loading && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(255,255,255,0.8)', zIndex: 99999,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <img src="/images/loader2.gif" alt="Loading..." />
                </div>
            )}

            {/* Blue Header Background - Occupies top portion */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '45vh', // Covers about half screen height
                backgroundImage: 'url(/images/header-bg-blue.png?v=2)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0
            }}></div>

            {/* Header Content (Logo & User) */}
            <div className="container-fluid" style={{
                position: 'relative',
                zIndex: 2,
                padding: '25px 50px',
            }}>
                <div className="d-flex justify-content-between align-items-center">
                    {/* Left: Brand */}
                    <div className="d-flex align-items-center">
                        <img src="/images/logo-edutry.png" alt="Logo" style={{ height: 75, marginRight: 15 }} />
                        <div className="text-white text-left">
                            <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, fontFamily: 'Arial, sans-serif' }}>EDUTRY_TKA</h2>
                            <p style={{ fontSize: 12, margin: 0, opacity: 0.9, fontFamily: 'Arial, sans-serif' }}>APLIKASI SIMULASI TKA ONLINE</p>
                        </div>
                    </div>

                    {/* Right: Login Status */}
                    <div className="d-flex align-items-center text-white">
                        <span style={{ fontSize: 13, marginRight: 15, fontWeight: 600 }}>P130100230 - PESERTA TKA</span>
                        <div style={{
                            width: 35, height: 35, background: '#6dace3', borderRadius: 4,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <i className="fas fa-graduation-cap"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Centered Card Content */}
            <div className="container d-flex justify-content-center align-items-center" style={{
                minHeight: '80vh', // Centers vertically roughly
                position: 'relative',
                zIndex: 2
            }}>
                <div className="bg-white shadow" style={{
                    width: '100%',
                    maxWidth: '550px',
                    borderRadius: '8px',
                    padding: '40px',
                    position: 'relative',
                    overflow: 'hidden' // For watermark containment
                }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h4 style={{ fontWeight: 400, color: '#333', marginBottom: 30 }}>Konfirmasi Tes</h4>

                        {/* Field: Nama Tes */}
                        <div className="form-group mb-3">
                            <label style={{ fontSize: 11, fontWeight: 700, color: '#000', marginBottom: 5 }}>Nama Tes</label>
                            <div style={{ fontSize: 15, borderBottom: '1px solid #ddd', paddingBottom: 5, minHeight: 24, fontWeight: 600 }}>
                                {mapel.toUpperCase()} {paket ? `- ${paket.toUpperCase()}` : ''}
                            </div>
                        </div>

                        {/* Field: Status Tes */}
                        <div className="form-group mb-3">
                            <label style={{ fontSize: 11, fontWeight: 700, color: '#000', marginBottom: 5 }}>Status Tes</label>
                            <div style={{ fontSize: 15, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>Tes Baru</div>
                        </div>

                        {/* Field: Waktu Tes */}
                        <div className="form-group mb-3">
                            <label style={{ fontSize: 11, fontWeight: 700, color: '#000', marginBottom: 5 }}>Waktu Tes</label>
                            <div style={{ fontSize: 15, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>{formattedDate}</div>
                        </div>

                        {/* Field: Alokasi Waktu Tes */}
                        <div className="form-group mb-4">
                            <label style={{ fontSize: 11, fontWeight: 700, color: '#000', marginBottom: 5 }}>Alokasi Waktu Tes</label>
                            <div style={{ fontSize: 15, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>75 Menit</div>
                        </div>

                        {/* Button */}
                        <button
                            onClick={handleStart}
                            className="btn btn-primary btn-block"
                            style={{
                                borderRadius: 30, // Rounded pill shape as per screenshot
                                background: '#007bff',
                                border: 'none',
                                fontWeight: 600,
                                padding: '10px'
                            }}
                        >
                            Mulai
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestConfirmationPage;

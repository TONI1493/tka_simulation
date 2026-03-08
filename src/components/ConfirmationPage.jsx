
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/login.css';

const ConfirmationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // Get data from location state
    const mapel = location.state?.mapel || 'Matematika';
    const paket = location.state?.paket || '';
    const jenjang = location.state?.jenjang || '';

    // Form states
    const [name, setName] = useState('');
    const [gender, setGender] = useState('Laki-Laki');
    const [token, setToken] = useState('');
    const [serverToken, setServerToken] = useState('XMZ667');

    // Date states
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [loading, setLoading] = useState(false);

    // Static Data
    const nik = "P130100230";
    const nameDisplay = "P130100230 - PESERTA TKA";

    // Date Options
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 40 }, (_, i) => currentYear - 10 - i); // Ages 10-50 approx

    // Initial random token
    useEffect(() => {
        generateToken();
    }, []);

    const generateToken = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setServerToken(result);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!name.trim()) {
            alert('Silakan isi Nama Peserta!');
            return;
        }
        if (!day || !month || !year) {
            alert('Silakan lengkapi Tanggal Lahir!');
            return;
        }
        if (!token.trim()) {
            alert('Silakan isi Token!');
            return;
        }
        if (token !== serverToken) {
            alert('Token salah! Silakan cek kembali token Anda.');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            // Navigate to Test Confirmation Page instead of Exam
            navigate('/test-confirmation', { state: { mapel, paket, jenjang } });
        }, 2000);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#ffffff', // Bottom background white
            fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            overflowX: 'hidden'
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

            {/* FIXED TOP BACKGROUND (Blue) */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: 230, // Tall blue header area
                backgroundImage: 'url(/images/header-bg-blue.png?v=2)', // Force refresh
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0,
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>
                {/* Content inside the fixed background (Logo, Text) */}
                <div className="container-fluid" style={{ padding: '0 50px', marginTop: 25 }}>
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
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="container-fluid" style={{
                position: 'relative',
                zIndex: 10,
                paddingTop: 110, // Start overlapping the blue
                paddingLeft: 50,
                paddingRight: 50,
                paddingBottom: 50
            }}>
                <div className="row">

                    {/* Left: Token Box */}
                    <div className="col-md-7 mb-4">
                        <div className="bg-white shadow" style={{
                            padding: '25px 30px',
                            borderRadius: '15px', // More rounded
                            display: 'flex',
                            alignItems: 'center',
                            minHeight: 100,
                            position: 'relative',
                        }}>
                            <span style={{ fontSize: 16, color: '#333', marginRight: 10 }}>Token : </span>
                            <span style={{ fontSize: 20, color: '#333', fontWeight: 'bold', marginRight: 20 }}>{serverToken}</span>
                            <button
                                onClick={generateToken}
                                className="btn btn-primary"
                                style={{
                                    fontSize: 14, fontWeight: 600, padding: '5px 20px',
                                    backgroundColor: '#007bff', border: 'none', borderRadius: 5
                                }}
                            >
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* Right: Confirmation Form */}
                    <div className="col-md-5">
                        <div className="bg-white shadow" style={{
                            padding: '40px',
                            borderRadius: '15px',
                            minHeight: 500
                        }}>

                            <h4 className="mb-4" style={{ fontWeight: 400, color: '#333', fontSize: 24 }}>Konfirmasi data Peserta</h4>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3 text-left">
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#000', marginBottom: 5 }}>Kode NIK</label>
                                    <div style={{ fontSize: 15, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>{nik}</div>
                                </div>

                                <div className="form-group mb-3 text-left">
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#000', marginBottom: 5 }}>Nama Peserta</label>
                                    <div style={{ fontSize: 15, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>{nameDisplay}</div>
                                </div>

                                <div className="form-group mb-3 text-left">
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#000', marginBottom: 5 }}>Jenis Kelamin</label>
                                    <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}
                                        style={{ border: 'none', borderBottom: '1px solid #ddd', borderRadius: 0, paddingLeft: 0, background: 'transparent', fontWeight: 500 }}>
                                        <option>Laki-Laki</option>
                                        <option>Perempuan</option>
                                    </select>
                                </div>

                                <div className="form-group mb-3 text-left">
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#000', marginBottom: 5 }}>Mata Ujian</label>
                                    <div style={{ fontSize: 15, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>
                                        {mapel} {paket ? `- ${paket}` : ''}
                                    </div>
                                </div>

                                <div className="form-group mb-3 text-left">
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#000', marginBottom: 5 }}>Nama Peserta</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ketikkan Nama Peserta"
                                        style={{ background: '#fcfcfc', border: '1px solid #ddd', borderRadius: 4 }} />
                                </div>

                                <div className="form-group mb-3 text-left">
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#000', marginBottom: 5 }}>Tanggal Lahir</label>
                                    <div className="d-flex">
                                        <select className="form-control mr-2" value={day} onChange={(e) => setDay(e.target.value)}
                                            style={{ background: '#f8f9fa', border: '1px solid #ddd', borderRadius: 4 }}>
                                            <option value="">Hari</option>
                                            {days.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                        <select className="form-control mr-2" value={month} onChange={(e) => setMonth(e.target.value)}
                                            style={{ background: '#f8f9fa', border: '1px solid #ddd', borderRadius: 4 }}>
                                            <option value="">Bulan</option>
                                            {months.map((m, i) => <option key={i} value={m}>{m}</option>)}
                                        </select>
                                        <select className="form-control" value={year} onChange={(e) => setYear(e.target.value)}
                                            style={{ background: '#f8f9fa', border: '1px solid #ddd', borderRadius: 4 }}>
                                            <option value="">Tahun</option>
                                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group mb-4 mt-4 text-left">
                                    <label style={{ fontSize: 11, fontWeight: 700, color: '#007bff', marginBottom: 5 }}>Token</label>
                                    <input type="text" className="form-control" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Ketikkan token di sini"
                                        style={{ background: '#fcfcfc', border: '1px solid #ddd', borderRadius: 4 }} />
                                </div>

                                <button type="submit" className="btn btn-primary btn-block py-2" style={{ fontWeight: 600, borderRadius: 4, background: '#007bff' }}>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;

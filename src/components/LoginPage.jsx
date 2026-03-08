import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [jenjang, setJenjang] = useState('sma');
  const [mapel, setMapel] = useState('');
  const [paket, setPaket] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!mapel) {
      alert("Silakan pilih mata pelajaran terlebih dahulu!");
      return;
    }
    if (!paket || paket === 'none') {
      alert("Silakan pilih paket soal terlebih dahulu!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Format: "Matematika - SD Sederajat"
      const jenjangLabel = jenjang === 'sd' ? 'SD Sederajat' : jenjang === 'smp' ? 'SMP Sederajat' : 'SMA Sederajat';
      const mapelName = mapel === 'matematika' ? 'Matematika' : 'Bahasa Indonesia';

      let paketName = '';
      if (paket && paket.startsWith('paket')) {
        const num = paket.replace('paket', '');
        paketName = `Paket ${num}`;
      }

      navigate('/auth', { state: { mapel: mapelName, paket: paketName, jenjang: jenjangLabel } });
    }, 2000);
  };

  return (
    <div className="login-page">
      {/* Background Pattern */}
      <div className="bg-pattern"></div>

      {loading && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(255,255,255,0.8)', zIndex: 9999,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <img src="/images/loader2.gif" alt="Loading..." />
        </div>
      )}

      {/* Header */}
      <div className="header-container d-flex align-items-center" style={{
        backgroundImage: 'url(/images/bg-top.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-center">
                <div className="logo-container mr-4">
                  <img src="/images/logo-edutry.png" alt="Logo EDUTRY" style={{ height: 90 }} />
                </div>
                <div className="header-text text-left text-white">
                  <h3>EDUTRY_TKA</h3>
                  <p>APLIKASI SIMULASI TKA ONLINE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="wrapper">
        <div id="formContent" className="fadeIn">
          {/* Icon Header */}
          <div className="header-icon mb-4">
            <div className="icon-circle">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h4 className="mt-3 mb-1" style={{ color: '#333', fontWeight: 600 }}>Simulasi TKA</h4>
            <p className="text-muted" style={{ fontSize: '14px' }}>Pilih jenjang dan mata pelajaran untuk memulai simulasi</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div className="form-group text-left">
              <label className="form-label"><i className="fas fa-layer-group mr-2"></i><b>Jenjang Pendidikan:</b></label>
              <select className="form-control custom-select" value={jenjang} onChange={(e) => {
                setJenjang(e.target.value);
                setMapel('');
                setPaket('');
              }}>
                <option value="sd">SD/MI/Sederajat</option>
                <option value="smp">SMP/MTs/Sederajat</option>
                <option value="sma">SMA/MA/SMK/MAK/Sederajat</option>
              </select>
            </div>

            <div className="form-group text-left">
              <label className="form-label"><i className="fas fa-book-open mr-2"></i><b>Jenis Mata Pelajaran:</b></label>
              <select className="form-control custom-select">
                <option value="wajib">Mata Pelajaran Wajib</option>
                <option value="pilihan">Mata Pelajaran Pilihan</option>
              </select>
            </div>

            <div className="form-group text-left">
              <label className="form-label"><i className="fas fa-book mr-2"></i><b>Mata Pelajaran:</b></label>
              <select className="form-control custom-select" value={mapel} onChange={(e) => {
                setMapel(e.target.value);
                setPaket(''); // Reset paket when mapel changes
              }}>
                <option value="">Pilih mata pelajaran...</option>
                {jenjang === 'sd' ? (
                  <>
                    <option value="matematika">Matematika</option>
                    <option value="indonesia">Bahasa Indonesia</option>
                  </>
                ) : (
                  <option value="none" disabled>Belum Tersedia</option>
                )}
              </select>
            </div>

            <div className="form-group text-left">
              <label className="form-label"><i className="fas fa-box-open mr-2"></i><b>Paket Soal:</b></label>
              <select className="form-control custom-select" value={paket} onChange={(e) => setPaket(e.target.value)}>
                <option value="">Pilih paket soal...</option>
                {jenjang === 'sd' ? (
                  <>
                    {mapel === 'matematika' && (
                      <>
                        {[...Array(11)].map((_, i) => (
                          <option key={i} value={`paket${i + 1}`}>Paket {i + 1}</option>
                        ))}
                      </>
                    )}
                    {mapel === 'indonesia' && (
                      <>
                        {[...Array(11)].map((_, i) => (
                          <option key={i} value={`paket${i + 1}`}>Paket {i + 1}</option>
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  <option value="none" disabled>Belum Tersedia</option>
                )}
              </select>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="custom-btn btn-block" disabled={loading}>
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <span><i className="fas fa-play mr-2"></i> Mulai Simulasi</span>
                )}
              </button>
            </div>
          </form>


        </div>
      </div>

      {/* Footer */}
      <div className="footer-info">
        <div className="container">
          <div className="text-center">
            <div className="copyright-card">
              <span>Copyright &copy; 2026 EduTry_TKA | Pak. Tony. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

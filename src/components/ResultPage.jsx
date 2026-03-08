import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import questions from '../data/mockQuestions';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import '../styles/login.css';

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, total, correct, wrong, mapel, paket, answers } = location.state || {
        score: 0, total: 0, correct: 0, wrong: 0, mapel: 'Simulasi Ujian', paket: '', answers: {}
    };

    const [loading, setLoading] = React.useState(false);

    // Get the question list for review
    const mapelKey = mapel === 'Bahasa Indonesia' ? 'bahasa_indonesia' : 'matematika';
    const paketKey = paket.toLowerCase().replace(/ /g, '');
    const questionList = questions[mapelKey]?.[paketKey] || [];

    const handleRestart = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/');
        }, 2000);
    };

    return (
        <div className="login-page">
            <div className="bg-pattern"></div>

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
                backgroundColor: '#76A2B7'
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

            <div className="container" style={{ marginTop: 140, marginBottom: 50 }}>
                <div className="text-center mb-4">
                    <h3 style={{ fontWeight: 700, color: '#333' }}>Hasil Simulasi Ujian</h3>
                    <p className="text-muted">Berikut adalah hasil dari simulasi yang telah Anda selesaikan.</p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <div className="card border-0 shadow-lg mb-5" style={{ borderRadius: 15, overflow: 'hidden' }}>
                            <div className="card-header text-center text-white py-3" style={{ background: '#76A2B7' }}>
                                <h5 className="mb-0 font-weight-bold">Laporan Skor</h5>
                            </div>
                            <div className="card-body p-4 text-center">
                                <h5 className="mb-4 font-weight-bold">{mapel} {paket ? `- ${paket}` : ''}</h5>
                                <hr />

                                <div className="row justify-content-center mb-4">
                                    <div className="col-md-8 text-left">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="font-weight-bold">Jumlah Soal</span>
                                            <span>: {total} Soal</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="font-weight-bold">Jawaban Benar</span>
                                            <span className="text-success">: {correct} Soal</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="font-weight-bold">Jawaban Salah</span>
                                            <span className="text-danger">: {wrong} Soal</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="score-display mb-4">
                                    <h6 className="font-weight-bold mb-3">Skor Akhir Anda:</h6>
                                    <h1 className="display-2 font-weight-bold" style={{ color: '#76A2B7' }}>{score}</h1>
                                </div>

                                <div className="alert alert-light border">
                                    <small className="text-muted">
                                        Terima kasih telah mengikuti simulasi. Teruslah berlatih untuk hasil yang lebih baik!
                                    </small>
                                </div>
                            </div>
                        </div>

                        {/* KEY AND REVIEW SECTION */}
                        <div className="card border-0 shadow-lg mb-4" style={{ borderRadius: 15, overflow: 'hidden' }}>
                            <div className="card-header text-white py-3" style={{ background: '#76A2B7', paddingLeft: '30px' }}>
                                <h5 className="mb-0 font-weight-bold"><i className="fas fa-key mr-2"></i> Kunci Jawaban & Pembahasan</h5>
                            </div>
                            <div className="card-body p-0">
                                <div style={{ maxHeight: '800px', overflowY: 'auto', padding: '20px 30px' }}>
                                    {questionList.map((q, index) => {
                                        const studentAnswer = answers[q.id];
                                        return (
                                            <div key={q.id} className="mb-5 p-4" style={{ border: '1px solid #eee', borderRadius: '12px', background: '#fdfdfd' }}>
                                                <h6 className="font-weight-bold mb-3" style={{ color: '#76A2B7' }}>Pertanyaan Nomor {index + 1}</h6>

                                                {/* Stimulus */}
                                                {q.stimulus && (
                                                    <div className="mb-3 p-3" style={{ background: '#f8f9fa', borderRadius: '8px', fontSize: '14px', borderLeft: '4px solid #76A2B7' }}>
                                                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                                            {q.stimulus.replace(/([^\n])\n(?!\n)/g, '$1  \n')}
                                                        </ReactMarkdown>
                                                    </div>
                                                )}

                                                {/* Image */}
                                                {q.image && (
                                                    <div className="text-center mb-3">
                                                        <img src={q.image} alt="Stimulus" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} />
                                                    </div>
                                                )}

                                                {/* Question Text */}
                                                <div className="mb-4 font-weight-bold" style={{ fontSize: '16px' }}>
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                                        {q.text}
                                                    </ReactMarkdown>
                                                </div>

                                                {/* Options/Statements Review */}
                                                <div className="options-review">
                                                    {q.type === 'true-false-statements' ? (
                                                        <table className="table table-bordered table-sm text-center">
                                                            <thead>
                                                                <tr style={{ background: '#f1f1f1' }}>
                                                                    <th className="text-left">Pernyataan</th>
                                                                    <th style={{ width: '100px' }}>Kunci</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {q.statements.map(s => (
                                                                    <tr key={s.id}>
                                                                        <td className="text-left" style={{ fontSize: '14px' }}>
                                                                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                                                                {s.text}
                                                                            </ReactMarkdown>
                                                                        </td>
                                                                        <td>
                                                                            <span className={`badge badge-${s.correctAnswer === 'benar' ? 'success' : 'danger'}`}>
                                                                                {s.correctAnswer.toUpperCase()}
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    ) : q.type === 'multiple-answer' ? (
                                                        <div className="row">
                                                            {q.options.map(opt => (
                                                                <div key={opt.id} className="col-12 mb-2">
                                                                    <div className="p-2 px-3 d-flex align-items-center" style={{
                                                                        borderRadius: '8px',
                                                                        border: q.correctAnswers.includes(opt.id) ? '2px solid #28a745' : '1px solid #ddd',
                                                                        background: q.correctAnswers.includes(opt.id) ? '#e9f7ef' : '#fff'
                                                                    }}>
                                                                        <span className="mr-3 font-weight-bold">{opt.id}.</span>
                                                                        <span style={{ flex: 1 }}>
                                                                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                                                                {opt.text}
                                                                            </ReactMarkdown>
                                                                        </span>
                                                                        {q.correctAnswers.includes(opt.id) && <i className="fas fa-check-circle text-success ml-2"></i>}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="row">
                                                            {q.options.map(opt => (
                                                                <div key={opt.id} className="col-12 mb-2">
                                                                    <div className="p-2 px-3 d-flex align-items-center" style={{
                                                                        borderRadius: '8px',
                                                                        border: opt.id === q.correctAnswer ? '2px solid #28a745' : '1px solid #ddd',
                                                                        background: opt.id === q.correctAnswer ? '#e9f7ef' : '#fff'
                                                                    }}>
                                                                        <span className="mr-3 font-weight-bold">{opt.id}.</span>
                                                                        <span style={{ flex: 1 }}>
                                                                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                                                                {opt.text}
                                                                            </ReactMarkdown>
                                                                        </span>
                                                                        {opt.id === q.correctAnswer && <i className="fas fa-check-circle text-success ml-2"></i>}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-4 mb-5">
                            <button
                                className="btn btn-danger btn-lg px-5 py-2"
                                style={{ borderRadius: 30, fontWeight: 600, background: '#dc3545', boxShadow: '0 4px 15px rgba(220,53,69,0.3)' }}
                                onClick={handleRestart}
                            >
                                <i className="fas fa-power-off mr-2"></i> Selesai & Ulangi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import questions from '../data/mockQuestions';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import '../styles/exam.css';

const ExamPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const mapel = location.state?.mapel || 'Matematika';
    const paket = location.state?.paket || '';

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [doubtful, setDoubtful] = useState({});
    const [timeLeft, setTimeLeft] = useState(73 * 60 + 50); // 01:13:50 as per screenshot
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fontSize, setFontSize] = useState(16); // Default font size

    // Normalize mapel and paket keys for object lookup
    const mapelKey = mapel === 'Bahasa Indonesia' ? 'bahasa_indonesia' : 'matematika';
    const paketKey = paket.toLowerCase().replace(/ /g, '');

    const questionList = questions[mapelKey]?.[paketKey] || questions.matematika.paket1 || [];
    const currentQuestion = questionList[currentQuestionIndex];

    // Fallback if question not found
    if (!currentQuestion && !loading) {
        return (
            <div className="exam-container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="text-center p-5 bg-white shadow rounded">
                    <h4 className="text-danger mb-3">Oops! Soal tidak ditemukan.</h4>
                    <p className="text-muted">Terjadi kendala saat memuat data mata pelajaran: {mapel} - {paket}</p>
                    <button onClick={() => navigate('/')} className="btn btn-primary px-4 mt-3">Kembali ke Beranda</button>
                </div>
            </div>
        );
    }

    const cleanText = (text) => {
        if (!text) return "";
        return text
            .replace(/SOAL NOMOR\s*\d+/gi, "")
            .replace(/SOAL MATEMATIKA PAKET\s*\d+/gi, "")
            .replace(/SOAL B\.\s*INDO\s*\d+/gi, "")
            .replace(/Kunci Jawaban\s*[:]\s*.*$/gim, "")
            .replace(/Mata Pelajaran\s*[:]\s*.*$/gim, "")
            .replace(/Paket\s*[A-Z]\s*\|\s*Jumlah Soal\s*[:].*$/gim, "")
            .replace(/Dokumen ini dibuat otomatis.*$/gim, "")
            .replace(/\(PG\s*Kompleks\)/gi, "")
            .replace(/\(PG\)/gi, "")
            .replace(/\(BS\)/gi, "")
            .replace(/\(Benar\/Salah\)/gi, "")
            .replace(/Pilihan Ganda/gi, "")
            .replace(/<br\s*\/?>/gi, " ")
            .replace(/\n\s*\n/g, "\n")
            .trim();
    };

    // Timer Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    // Trigger submit when time is up
                    const finishBtn = document.getElementById('finish-btn');
                    if (finishBtn) finishBtn.click();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleOptionSelect = (optionId) => {
        if (currentQuestion.type === 'multiple-answer') {
            const currentAnswers = answers[currentQuestion.id] || [];
            const newAnswers = currentAnswers.includes(optionId)
                ? currentAnswers.filter(id => id !== optionId)
                : [...currentAnswers, optionId];
            setAnswers({ ...answers, [currentQuestion.id]: newAnswers });
        } else {
            setAnswers({
                ...answers,
                [currentQuestion.id]: optionId
            });
        }
    };

    const handleStatementChange = (statementId, value) => {
        const currentAnswers = answers[currentQuestion.id] || {};
        setAnswers({
            ...answers,
            [currentQuestion.id]: { ...currentAnswers, [statementId]: value }
        });
    };

    const toggleDoubtful = () => {
        setDoubtful({
            ...doubtful,
            [currentQuestion.id]: !doubtful[currentQuestion.id]
        });
    };

    const handleSubmit = () => {
        if (window.confirm("Apakah Anda yakin ingin mengakhiri tes?")) {
            navigate('/result', { state: { answers, mapel, paket, questionList } });
        }
    };

    return (
        <div className="exam-container">
            {loading && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(255,255,255,0.8)', zIndex: 99999,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <img src="/images/loader2.gif" alt="Loading..." />
                </div>
            )}

            {/* TOP HEADER (TEAL) */}
            <div className="exam-top-header d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img src="/images/logo-w.png" alt="Logo" style={{ height: 35, marginRight: 15 }} />
                    <span style={{ fontWeight: 600, fontSize: 16 }}>Simulasi TKA Online</span>
                </div>
                <div className="d-flex align-items-center">
                    <span className="mr-3" style={{ fontSize: 13, fontWeight: 500 }}>P130100230 - PESERTA TKA</span>
                    <div style={{ width: 35, height: 35, background: 'rgba(255,255,255,0.2)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fas fa-user text-white"></i>
                    </div>
                </div>
            </div>

            <div className="exam-main-container">
                <div className="exam-card-wrapper shadow-lg">
                    {/* CARD HEADER */}
                    <div className="exam-card-header">
                        <div className="d-flex justify-content-between align-items-center header-top-row">
                            <div className="d-flex align-items-center">
                                <div style={{ background: '#326698', color: 'white', padding: '10px 20px', borderRadius: 4, fontWeight: 700, fontSize: 18, marginRight: 20 }}>
                                    SOAL NO {currentQuestionIndex + 1}
                                </div>
                                <div className="d-flex align-items-center" style={{ background: '#f0f2f5', padding: '5px 15px', borderRadius: 20 }}>
                                    <span style={{ fontSize: 12, fontWeight: 600, marginRight: 10 }}>Ukuran Font Soal :</span>
                                    <span
                                        onClick={() => setFontSize(13)}
                                        style={{ fontSize: 13, cursor: 'pointer', margin: '0 8px', color: fontSize === 13 ? '#007bff' : '#333', fontWeight: fontSize === 13 ? 700 : 400 }}
                                    >A</span>
                                    <span
                                        onClick={() => setFontSize(16)}
                                        style={{ fontSize: 16, cursor: 'pointer', margin: '0 8px', color: fontSize === 16 ? '#007bff' : '#333', fontWeight: fontSize === 16 ? 700 : 400 }}
                                    >A</span>
                                    <span
                                        onClick={() => setFontSize(20)}
                                        style={{ fontSize: 20, cursor: 'pointer', margin: '0 8px', color: fontSize === 20 ? '#007bff' : '#333', fontWeight: fontSize === 20 ? 700 : 400 }}
                                    >A</span>
                                </div>
                            </div>

                            <div className="d-flex align-items-center header-controls">
                                <button className="btn btn-primary mr-3" style={{ borderRadius: 20, background: '#007bff', fontSize: 12, padding: '6px 20px', fontWeight: 600 }}>
                                    INFORMASI SOAL
                                </button>
                                <div className="timer-box mr-3">
                                    Sisa Waktu : <span style={{ fontWeight: 700 }}>{formatTime(timeLeft)}</span>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    style={{ borderRadius: 20, background: '#007bff', fontSize: 12, padding: '6px 20px', fontWeight: 600 }}
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                >
                                    Daftar Soal <i className="fas fa-th-list ml-1"></i>
                                </button>
                            </div>
                        </div>

                        <div className="text-right mt-2">
                            <span style={{ fontSize: 16, fontWeight: 400, color: '#333' }}>{mapel} {paket ? `- ${paket}` : ''}</span>
                        </div>
                    </div>

                    {/* CARD CONTENT */}
                    <div className="exam-card-content">
                        {/* Left Side: Stimulus (FORCED 50/50 Layout) */}
                        <div className="pane-stimulus">
                            {cleanText(currentQuestion.stimulus) ? (
                                <div style={{
                                    fontSize: fontSize,
                                    lineHeight: '1.8',
                                    textAlign: 'justify',
                                    marginBottom: 20,
                                    color: '#333'
                                }} className="markdown-content">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                        {cleanText(currentQuestion.stimulus).replace(/([^\n])\n(?!\n)/g, '$1  \n')}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                !currentQuestion.image && (
                                    <div style={{ color: '#999', fontStyle: 'italic', fontSize: '0.9em' }}>
                                        Informasi tambahan tidak tersedia untuk soal ini.
                                    </div>
                                )
                            )}

                            {currentQuestion.image && (
                                <div className="text-center mb-4" style={{ background: '#fff', borderRadius: 8, padding: '15px', border: '1px solid #eee' }}>
                                    <img
                                        src={currentQuestion.image}
                                        alt="Stimulus"
                                        loading="lazy"
                                        style={{ maxWidth: '100%', maxHeight: '480px', objectFit: 'contain', borderRadius: 8 }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Right Side: Question & Options */}
                        <div className="pane-question">
                            <div style={{
                                fontSize: fontSize + 2,
                                fontWeight: 600,
                                lineHeight: '1.6',
                                marginBottom: 25,
                                color: '#1a2a3a',
                                textAlign: 'left'
                            }} className="markdown-content question-text">
                                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                    {cleanText(currentQuestion.text) || ""}
                                </ReactMarkdown>
                            </div>

                            {currentQuestion.type === 'true-false-statements' ? (
                                <div className="table-responsive">
                                    <table className="table table-bordered text-center" style={{ fontSize: fontSize }}>
                                        <thead style={{ background: '#f0f2f5' }}>
                                            <tr>
                                                <th className="text-left">Pernyataan</th>
                                                <th style={{ width: 100 }}>Benar</th>
                                                <th style={{ width: 100 }}>Salah</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(currentQuestion.statements || []).length > 0 ? (
                                                currentQuestion.statements.map((s) => (
                                                    <tr key={s.id}>
                                                        <td className="text-left">
                                                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                                                {cleanText(s.text)}
                                                            </ReactMarkdown>
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="radio"
                                                                name={`statement-${s.id}`}
                                                                checked={answers[currentQuestion.id]?.[s.id] === 'benar'}
                                                                onChange={() => handleStatementChange(s.id, 'benar')}
                                                                style={{ width: 22, height: 22, cursor: 'pointer' }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="radio"
                                                                name={`statement-${s.id}`}
                                                                checked={answers[currentQuestion.id]?.[s.id] === 'salah'}
                                                                onChange={() => handleStatementChange(s.id, 'salah')}
                                                                style={{ width: 22, height: 22, cursor: 'pointer' }}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr><td colSpan="3" className="text-muted">Data pernyataan tidak tersedia</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="options-list">
                                    {(currentQuestion.options || []).length > 0 ? (
                                        currentQuestion.options.map((option) => (
                                            <div
                                                key={option.id}
                                                className="d-flex align-items-center mb-4 p-2 rounded-lg option-item-hover"
                                                onClick={() => handleOptionSelect(option.id)}
                                            >
                                                <div style={{
                                                    minWidth: 32, height: 32,
                                                    borderRadius: currentQuestion.type === 'multiple-answer' ? '4px' : '50%',
                                                    border: '2px solid #326698',
                                                    background: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginRight: 20,
                                                    flexShrink: 0
                                                }}>
                                                    {currentQuestion.type === 'multiple-answer' ? (
                                                        (answers[currentQuestion.id] || []).includes(option.id) && (
                                                            <i className="fas fa-check" style={{ color: '#326698', fontSize: 16 }}></i>
                                                        )
                                                    ) : (
                                                        answers[currentQuestion.id] === option.id && (
                                                            <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#326698' }}></div>
                                                        )
                                                    )}
                                                </div>
                                                <div style={{ fontSize: fontSize, color: '#333', fontWeight: 500 }}>
                                                    {option.text.startsWith('image:') ? (
                                                        <img src={option.text.replace('image:', '')} alt="Option" style={{ maxHeight: 80, maxWidth: '100%', objectFit: 'contain', borderRadius: 4, border: '1px solid #ddd', padding: '5px', background: 'white' }} />
                                                    ) : (
                                                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                                            {cleanText(option.text)}
                                                        </ReactMarkdown>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="alert alert-warning">Opsi jawaban tidak tersedia untuk soal ini.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CARD FOOTER */}
                    <div className="exam-card-footer">
                        <button
                            className="btn btn-danger d-flex align-items-center"
                            style={{ borderRadius: 30, padding: '10px 30px', fontWeight: 600, background: '#dc3545' }}
                            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                            disabled={currentQuestionIndex === 0}
                        >
                            <i className="fas fa-chevron-left mr-2 bg-white text-danger rounded-circle p-1" style={{ fontSize: 12 }}></i> Soal sebelumnya
                        </button>

                        <button
                            className="btn d-flex align-items-center"
                            style={{ borderRadius: 30, padding: '10px 40px', fontWeight: 600, background: '#ffc107', color: '#333' }}
                            onClick={toggleDoubtful}
                        >
                            <input type="checkbox" checked={!!doubtful[currentQuestion.id]} readOnly className="mr-3" style={{ transform: 'scale(1.4)' }} />
                            Ragu-ragu
                        </button>

                        {currentQuestionIndex === questionList.length - 1 ? (
                            <button
                                id="finish-btn"
                                className="btn btn-success d-flex align-items-center"
                                style={{ borderRadius: 30, padding: '10px 40px', fontWeight: 600, background: '#28a745' }}
                                onClick={handleSubmit}
                            >
                                Selesai Tes <i className="fas fa-check ml-2 bg-white text-success rounded-circle p-1" style={{ fontSize: 12 }}></i>
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary d-flex align-items-center"
                                style={{ borderRadius: 30, padding: '10px 30px', fontWeight: 600, background: '#007bff' }}
                                onClick={() => setCurrentQuestionIndex(Math.min(questionList.length - 1, currentQuestionIndex + 1))}
                            >
                                Soal berikutnya <i className="fas fa-chevron-right ml-2 bg-white text-primary rounded-circle p-1" style={{ fontSize: 12 }}></i>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* SIDEBAR MODAL */}
            {isSidebarOpen && (
                <>
                    <div
                        className="sidebar-overlay"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                    <div className="sidebar-panel">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="m-0 font-weight-bold">Daftar Soal</h5>
                            <button className="btn btn-light btn-sm" onClick={() => setIsSidebarOpen(false)}>&times;</button>
                        </div>
                        <div className="grid-container">
                            {questionList.map((q, index) => {
                                let bgColor = '#fff';
                                let color = '#333';
                                let border = '1px solid #ddd';

                                if (currentQuestionIndex === index) {
                                    bgColor = '#007bff';
                                    color = '#fff';
                                } else if (doubtful[q.id]) {
                                    bgColor = '#ffc107';
                                } else if (answers[q.id]) {
                                    bgColor = '#28a745';
                                    color = '#fff';
                                }

                                return (
                                    <div
                                        key={q.id}
                                        style={{
                                            height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            background: bgColor, color: color, border: border, borderRadius: 4,
                                            cursor: 'pointer', fontWeight: 600, fontSize: 14
                                        }}
                                        onClick={() => {
                                            setCurrentQuestionIndex(index);
                                            setIsSidebarOpen(false);
                                        }}
                                    >
                                        {index + 1}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ExamPage;

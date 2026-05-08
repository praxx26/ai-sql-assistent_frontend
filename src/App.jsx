import React, { useEffect, useState, useCallback } from 'react';

const API_BASE = import.meta.env.VITE_API_URL;

// Animated background component with floating white orbs
const AnimatedBackground = () => {
  useEffect(() => {
    const createDrop = () => {
      const drop = document.createElement('div');
      const size = Math.random() * 40 + 10;
      drop.style.width = `${size}px`;
      drop.style.height = `${size}px`;
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDuration = `${Math.random() * 15 + 8}s`;
      drop.style.animationDelay = `${Math.random() * 5}s`;
      drop.classList.add('animate-drop');
      const bgContainer = document.getElementById('animated-bg');
      if (bgContainer) {
        bgContainer.appendChild(drop);
      }
      setTimeout(() => drop.remove(), 20000);
    };
    const interval = setInterval(createDrop, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="animated-bg" className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-gradient-to-br from-gray-950 via-black to-gray-950">
      <style>{`
        .animate-drop {
          position: absolute;
          top: -50px;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), rgba(255,255,255,0.05));
          border-radius: 50%;
          filter: blur(3px);
          box-shadow: 0 0 20px rgba(255,255,255,0.15);
          animation: fall linear infinite;
        }
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0.6; }
          80% { opacity: 0.3; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
        @keyframes slideOut {
          0% { opacity: 1; transform: translateX(0) scale(1); }
          100% { opacity: 0; transform: translateX(100%) scale(0.8); }
        }
        .history-item-exit {
          animation: slideOut 0.3s ease-out forwards;
        }
        @keyframes pageFade {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .page-transition {
          animation: pageFade 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

const GlassCard = ({ children, className = '' }) => (
  <div className={`bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 transition-all duration-300 hover:border-white/20 ${className}`}>
    {children}
  </div>
);

const Logo = ({ size = 'large' }) => {
  const sizeClasses = size === 'large' ? 'w-12 h-12' : 'w-8 h-8';
  
  return (
    <div className={`${sizeClasses} rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30`}>
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"/>
        <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"/>
        <path d="M3 2v3c0 1.657 3.134 3 7 3s7-1.343 7-3V2c0 1.657-3.134 3-7 3S3 3.657 3 2z"/>
      </svg>
    </div>
  );
};

// Connection Page Component
const ConnectionPage = ({ onConnect, host, port, user, password, database, setHost, setPort, setUser, setPassword, setDatabase, onBackToStudy }) => {
  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
      <GlassCard className="max-w-2xl w-full p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="large" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Database Connection</h2>
          <p className="text-gray-400 text-sm">Connect to your MySQL database to run real queries</p>
          <p className="text-gray-500 text-xs mt-2">(Don't have a database? Just use Study Mode!)</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2">HOST</label>
              <input
                type="text"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                placeholder="localhost"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-white/30 transition text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2">PORT</label>
              <input
                type="text"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                placeholder="3306"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-white/30 transition text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2">USER</label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="root"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-white/30 transition text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-white/30 transition text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-2">DATABASE</label>
            <input
              type="text"
              value={database}
              onChange={(e) => setDatabase(e.target.value)}
              placeholder="database_name"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-white/30 transition text-white"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onBackToStudy}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl py-3.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.788 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.522 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
              Study Mode
            </button>
            <button
              onClick={onConnect}
              className="flex-1 bg-gradient-to-r from-white to-gray-200 text-black font-bold rounded-xl py-3.5 transition-all duration-300 hover:shadow-xl hover:shadow-white/20 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
              </svg>
              Connect
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

// History Item Component
const HistoryItem = ({ item, onClick, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    await onDelete();
  };

  return (
    <div className={`group bg-white/5 hover:bg-white/10 rounded-xl p-3 border border-white/5 transition-all cursor-pointer hover:scale-[1.02] hover:border-white/20 ${isDeleting ? 'history-item-exit' : ''}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1" onClick={() => onClick()}>
          <p className="text-sm text-gray-200 line-clamp-2 font-medium">{item.title}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] font-mono text-gray-500">{item.created_at?.slice(0, 16)}</span>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-red-400 p-1 rounded-lg hover:bg-red-500/10"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Simple Explanation Component - Clean and readable
const SimpleExplanation = ({ explanation }) => {
  if (!explanation) return null;

  // Split explanation into lines and process
  const lines = explanation.split(/\r?\n/);
  const steps = [];
  let currentStep = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Check if line starts with a number and dot (e.g., "1.", "2.")
    const stepMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (stepMatch) {
      if (currentStep) {
        steps.push(currentStep);
      }
      currentStep = {
        number: parseInt(stepMatch[1]),
        text: stepMatch[2]
      };
    } else if (currentStep) {
      currentStep.text += ' ' + line;
    } else {
      // Plain text without numbering
      steps.push({
        number: null,
        text: line
      });
    }
  }
  
  if (currentStep) {
    steps.push(currentStep);
  }

  return (
    <div className="space-y-3">
      {steps.map((step, idx) => (
        <div 
          key={idx} 
          className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 ${
            step.number 
              ? 'bg-white/5 border-white/10 hover:border-purple-500/30 hover:bg-white/10' 
              : 'bg-transparent border-transparent'
          }`}
        >
          {step.number && (
            <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center border border-purple-500/30">
              <span className="text-purple-400 text-xs font-bold">{step.number}</span>
            </div>
          )}
          <p className="text-gray-300 text-sm leading-relaxed flex-1">
            {step.text}
          </p>
        </div>
      ))}
    </div>
  );
};

// Main App
export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [showConnectionPage, setShowConnectionPage] = useState(false);
  const [mode, setMode] = useState('study');
  const [question, setQuestion] = useState('');

  const [host, setHost] = useState('localhost');
  const [port, setPort] = useState('3306');
  const [user, setUser] = useState('root');
  const [password, setPassword] = useState('');
  const [database, setDatabase] = useState('company');

  const [sqlQuery, setSqlQuery] = useState('');
  const [explanation, setExplanation] = useState('');
  const [allResults, setAllResults] = useState([]);
  const [paginatedResults, setPaginatedResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [executionTime, setExecutionTime] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(6);

  const [studyHistory, setStudyHistory] = useState([]);
  const [executeHistory, setExecuteHistory] = useState([]);
  const [isPageTransition, setIsPageTransition] = useState(false);

  const fetchStudyHistory = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/study-history`);
      const data = await res.json();
      setStudyHistory(data.history || []);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchExecuteHistory = useCallback(async () => {
    if (!isConnected) return;
    try {
      const res = await fetch(`${API_BASE}/execute-history`);
      const data = await res.json();
      setExecuteHistory(data.history || []);
    } catch (err) {
      console.log(err);
    }
  }, [isConnected]);

  useEffect(() => {
    fetchStudyHistory();
    if (isConnected) {
      fetchExecuteHistory();
    }
  }, [isConnected, fetchStudyHistory, fetchExecuteHistory]);

  useEffect(() => {
    if (allResults.length > 0) {
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      setPaginatedResults(allResults.slice(startIndex, endIndex));
      setIsPageTransition(true);
      setTimeout(() => setIsPageTransition(false), 300);
    } else {
      setPaginatedResults([]);
    }
  }, [allResults, currentPage, rowsPerPage]);

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setSqlQuery('');
    setExplanation('');
    setAllResults([]);
    setPaginatedResults([]);
    setExecutionTime(0);
    setCurrentPage(1);

    try {
      if (mode === 'database' && isConnected) {
        const response = await fetch(`${API_BASE}/generate-and-execute`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            host,
            port: Number(port),
            user,
            password,
            database,
            question,
          }),
        });
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setSqlQuery(data.sql_query);
          setExplanation(data.explanation);
          setAllResults(data.results || []);
          setExecutionTime(data.execution_time_seconds || 0);
          await fetchExecuteHistory();
        }
      } else {
        const response = await fetch(`${API_BASE}/study-sql`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question }),
        });
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setSqlQuery(data.sql_query);
          setExplanation(data.explanation);
          setAllResults([]);
          await fetchStudyHistory();
        }
      }
    } catch (err) {
      console.error(err);
      setError('Backend connection failed. Make sure server is running on port 8000');
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = (item) => {
    setQuestion(item.title);
    if (item.sql_query) {
      setSqlQuery(item.sql_query);
    }
    if (item.explanation) {
      setExplanation(item.explanation);
    }
  };

  const deleteSingleStudyHistory = async (historyId) => {
    try {
      await fetch(`${API_BASE}/delete-single-study-history/${historyId}`, { method: 'DELETE' });
      await fetchStudyHistory();
    } catch (err) {
      console.error('Failed to delete study history:', err);
    }
  };

  const deleteSingleExecuteHistory = async (historyId) => {
    try {
      await fetch(`${API_BASE}/delete-single-execute-history/${historyId}`, { method: 'DELETE' });
      await fetchExecuteHistory();
    } catch (err) {
      console.error('Failed to delete execute history:', err);
    }
  };

  const clearStudyHistory = async () => {
    await fetch(`${API_BASE}/delete-study-history`, { method: 'DELETE' });
    await fetchStudyHistory();
  };

  const clearExecuteHistory = async () => {
    if (!isConnected) return;
    await fetch(`${API_BASE}/delete-execute-history`, { method: 'DELETE' });
    await fetchExecuteHistory();
  };

  const clearHistory = () => {
    if (mode === 'database') {
      clearExecuteHistory();
    } else {
      clearStudyHistory();
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setShowConnectionPage(false);
    setMode('study');
    setQuestion('');
    setSqlQuery('');
    setExplanation('');
    setAllResults([]);
    setPaginatedResults([]);
    setError('');
    setExecutionTime(0);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(allResults.length / rowsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const totalPages = Math.ceil(allResults.length / rowsPerPage);
  const tableColumns = paginatedResults.length > 0 ? Object.keys(paginatedResults[0]) : [];
  const currentHistory = mode === 'database' ? executeHistory : studyHistory;

  if (showConnectionPage && !isConnected) {
    return (
      <div className="relative min-h-screen bg-transparent">
        <AnimatedBackground />
        <ConnectionPage
          onConnect={() => {
            setIsConnected(true);
            setShowConnectionPage(false);
            setMode('database');
            setQuestion('');
            setSqlQuery('');
            setExplanation('');
            setAllResults([]);
            setError('');
          }}
          onBackToStudy={() => {
            setShowConnectionPage(false);
            setMode('study');
            setQuestion('');
            setSqlQuery('');
            setExplanation('');
            setAllResults([]);
            setError('');
          }}
          host={host}
          port={port}
          user={user}
          password={password}
          database={database}
          setHost={setHost}
          setPort={setPort}
          setUser={setUser}
          setPassword={setPassword}
          setDatabase={setDatabase}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-transparent text-gray-200">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center">
  <img
    src="/favico2.png"
    alt="QueryForge Logo"
    className="w-30 object-cover drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
  />

  <div>
    <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent tracking-tight">
      QueryForge
    </h1>

    <div className="flex items-center gap-2 mt-0.5">
      <p className="text-gray-400 text-xs md:text-xs font-medium">
        Intelligent SQL workspace
      </p>

      {mode === 'study' && (
        <div className="flex items-center gap-1 bg-purple-500/15 border border-purple-400/25 px-1.5 py-0.5 rounded-full">
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
          <span className="text-[9px] md:text-[10px] font-mono font-medium text-purple-300">
            Learning Mode
          </span>
        </div>
      )}

      {mode === 'database' && isConnected && (
        <div className="flex items-center gap-1 bg-emerald-500/15 border border-emerald-400/25 px-1.5 py-0.5 rounded-full">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-[9px] md:text-[10px] font-mono font-medium text-emerald-300">
            DB Connected
          </span>
        </div>
      )}
    </div>
  </div>
</div>
          
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (isConnected) {
                  setMode('database');
                  setQuestion('');
                  setSqlQuery('');
                  setExplanation('');
                  setAllResults([]);
                  setPaginatedResults([]);
                  setError('');
                  setExecutionTime(0);
                } else {
                  setShowConnectionPage(true);
                }
              }}
              className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                mode === 'database'
                  ? 'bg-white text-black shadow-lg shadow-white/20'
                  : 'bg-white/5 backdrop-blur-sm text-gray-400 hover:text-white hover:bg-white/15 border border-white/10'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"/>
                <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"/>
                <path d="M3 2v3c0 1.657 3.134 3 7 3s7-1.343 7-3V2c0 1.657-3.134 3-7 3S3 3.657 3 2z"/>
              </svg>
              Database Mode
            </button>
            <button
              onClick={() => {
                setMode('study');
                setQuestion('');
                setSqlQuery('');
                setExplanation('');
                setAllResults([]);
                setPaginatedResults([]);
                setError('');
                setExecutionTime(0);
                setShowConnectionPage(false);
              }}
              className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                mode === 'study'
                  ? 'bg-white text-black shadow-lg shadow-white/20'
                  : 'bg-white/5 backdrop-blur-sm text-gray-400 hover:text-white hover:bg-white/15 border border-white/10'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.788 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.522 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
              Study Mode
            </button>
            {isConnected && (
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 rounded-xl text-sm transition-all duration-300 flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-3">
            <GlassCard className="h-full flex flex-col p-4">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                    </svg>
                  </div>
                  <h2 className="font-mono text-xs font-semibold text-gray-300 tracking-wider uppercase">
                    {mode === 'database' ? 'Execution Log' : 'Study Log'}
                  </h2>
                </div>
                {currentHistory.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-gray-500 hover:text-red-400 text-xs transition-all flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    Clear All
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[60vh]">
                {currentHistory.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 opacity-40" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <p className="text-xs font-mono">No history yet</p>
                    <p className="text-[10px] font-mono text-gray-600 mt-1">Your queries will appear here</p>
                  </div>
                ) : (
                  currentHistory.map((item, idx) => (
                    <HistoryItem
                      key={item.id || idx}
                      item={item}
                      onClick={() => handleHistoryClick(item)}
                      onDelete={() => {
                        if (mode === 'database') {
                          return deleteSingleExecuteHistory(item.id);
                        } else {
                          return deleteSingleStudyHistory(item.id);
                        }
                      }}
                    />
                  ))
                )}
              </div>
            </GlassCard>
          </div>

          {/* RIGHT MAIN CONTENT */}
          <div className="lg:col-span-9 space-y-5">
            {/* Input Panel */}
            <GlassCard className="p-5 transition-all">
              {mode === 'database' && isConnected && (
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg">
                    <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-[10px] font-mono text-gray-400">{host}:{port}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg">
                    <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"/>
                      <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"/>
                      <path d="M3 2v3c0 1.657 3.134 3 7 3s7-1.343 7-3V2c0 1.657-3.134 3-7 3S3 3.657 3 2z"/>
                    </svg>
                    <span className="text-[10px] font-mono text-gray-400">{database}</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-4">
                <textarea
                  rows={3}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={mode === 'database' && isConnected
                    ? '🔍 Ask anything about your data...\nExample: "Show me total sales by category"'
                    : '📚 Learn SQL! Ask any question...\nExample: "Write a query to find duplicate emails" or "Explain LEFT JOIN"'}
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-5 py-4 outline-none resize-none focus:border-white/30 focus:ring-1 focus:ring-white/20 font-mono text-sm text-gray-200 placeholder:text-gray-600 transition"
                />
                <button
                  onClick={handleGenerate}
                  disabled={loading || !question.trim()}
                  className="bg-gradient-to-r from-white to-gray-200 text-black font-bold rounded-xl px-8 py-4 transition-all duration-300 hover:shadow-xl hover:shadow-white/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px] group"
                >
                  {loading ? (
                    <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> Processing</>
                  ) : (
                    <><svg className="w-4 h-4 group-hover:rotate-12 transition" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                    </svg> Generate</>
                  )}
                </button>
              </div>

              {mode === 'database' && isConnected && allResults.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-5 pt-3 border-t border-white/10">
                  <div className="bg-white/5 rounded-xl p-2.5 text-center">
                    <p className="text-gray-400 text-[9px] font-mono uppercase">Execution</p>
                    <p className="text-base font-bold text-white font-mono">{executionTime.toFixed(2)}s</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2.5 text-center">
                    <p className="text-gray-400 text-[9px] font-mono uppercase">Total Rows</p>
                    <p className="text-base font-bold text-white font-mono">{allResults.length}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2.5 text-center">
                    <p className="text-gray-400 text-[9px] font-mono uppercase">Page</p>
                    <p className="text-base font-bold text-white font-mono">{currentPage} / {totalPages}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2.5 text-center">
                    <p className="text-gray-400 text-[9px] font-mono uppercase">Rows/Page</p>
                    <p className="text-base font-bold text-white font-mono">{rowsPerPage}</p>
                  </div>
                </div>
              )}
            </GlassCard>

            {/* Error Display */}
            {error && (
              <div className="bg-red-950/40 border-l-4 border-red-500 text-red-300 rounded-xl p-4 text-sm font-mono flex items-start gap-3 shadow-lg shadow-red-500/10">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                <div className="flex-1">
                  <p className="font-semibold mb-1 text-red-400">Error:</p>
                  <p className="break-words whitespace-pre-wrap">{error}</p>
                </div>
                <button 
                  onClick={() => setError('')}
                  className="flex-shrink-0 text-red-400 hover:text-red-300 transition"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            )}

            {/* SQL and Explanation */}
            {(sqlQuery || explanation) && (
              <div className={mode === 'study' ? 'space-y-5' : 'grid grid-cols-1 md:grid-cols-2 gap-5'}>
                {/* SQL Card - Clean display without HTML tags */}
                <GlassCard className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <h3 className="text-xs font-mono font-semibold text-gray-300 uppercase tracking-wider">Generated SQL</h3>
                    </div>
                    {sqlQuery && (
                      <button
                        onClick={() => navigator.clipboard.writeText(sqlQuery)}
                        className="text-gray-400 hover:text-white text-xs bg-white/5 px-2.5 py-1.5 rounded-lg transition flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                        </svg>
                        Copy
                      </button>
                    )}
                  </div>
                  <pre className="bg-black/60 rounded-xl p-4 text-emerald-400 overflow-x-auto min-h-[150px] font-mono text-sm border border-white/10 whitespace-pre-wrap break-words">
                    {sqlQuery || <span className="text-gray-500 italic">-- SQL will appear here --</span>}
                  </pre>
                </GlassCard>

                {/* Explanation Card - Using Simple Explanation Component */}
                <GlassCard className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="text-xs font-mono font-semibold text-gray-300 uppercase tracking-wider">AI Explanation</h3>
                  </div>
                  <div className="bg-black/60 rounded-xl p-4 min-h-[150px] text-sm border border-white/10 overflow-y-auto max-h-[500px]">
                    {explanation ? (
                      <SimpleExplanation explanation={explanation} />
                    ) : (
                      <span className="text-gray-500 italic">✨ Explanation will appear here...</span>
                    )}
                  </div>
                </GlassCard>
              </div>
            )}

            {/* Welcome Message for Study Mode */}
            {mode === 'study' && !sqlQuery && !explanation && !error && (
              <GlassCard className="p-8 text-center bg-gradient-to-br from-purple-500/5 to-pink-500/5">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.788 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.522 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Welcome to Study Mode! 🎓</h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  No database needed. Learn SQL by asking questions - AI will generate queries and explain concepts.
                </p>
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  <span className="text-xs bg-white/5 px-3 py-1.5 rounded-full">🎯 "What is a subquery?"</span>
                  <span className="text-xs bg-white/5 px-3 py-1.5 rounded-full">🔗 "Explain JOIN types"</span>
                  <span className="text-xs bg-white/5 px-3 py-1.5 rounded-full">📊 "Write a pivot query"</span>
                  <span className="text-xs bg-white/5 px-3 py-1.5 rounded-full">⚡ "Optimize slow query"</span>
                </div>
              </GlassCard>
            )}

            {/* Database Mode Results Table */}
            {mode === 'database' && isConnected && paginatedResults.length > 0 && (
              <GlassCard className="p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h2 className="text-xs font-mono font-semibold text-gray-300 uppercase tracking-wider">Query Results</h2>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                    <span>Showing {(currentPage - 1) * rowsPerPage + 1} - {Math.min(currentPage * rowsPerPage, allResults.length)} of {allResults.length} rows</span>
                  </div>
                </div>

                <div className={`overflow-auto rounded-xl border border-white/10 max-h-[450px] ${isPageTransition ? 'page-transition' : ''}`}>
                  <table className="w-full text-sm">
                    <thead className="bg-black/80 sticky top-0">
                      <tr>
                        <th className="text-left p-3 font-mono text-[10px] font-semibold text-gray-300 uppercase tracking-wider border-b border-white/10 w-10">#</th>
                        {tableColumns.map((col) => (
                          <th key={col} className="text-left p-3 font-mono text-[10px] font-semibold text-gray-300 uppercase tracking-wider border-b border-white/10">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedResults.map((row, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition">
                          <td className="p-3 font-mono text-xs text-gray-500">{(currentPage - 1) * rowsPerPage + idx + 1}</td>
                          {tableColumns.map((col) => (
                            <td key={col} className="p-3 font-mono text-xs text-gray-300">
                              {row[col] !== null && row[col] !== undefined ? String(row[col]) : <span className="text-gray-500 italic">NULL</span>}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button onClick={goToPrevPage} disabled={currentPage === 1} className="bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-xs font-mono transition flex items-center gap-2">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) pageNum = i + 1;
                      else if (currentPage <= 3) pageNum = i + 1;
                      else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                      else pageNum = currentPage - 2 + i;
                      return (
                        <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`w-8 h-8 rounded-lg text-xs font-mono transition ${currentPage === pageNum ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10 text-gray-400'}`}>
                          {pageNum}
                        </button>
                      );
                    })}
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span className="text-gray-500">...</span>
                        <button onClick={() => setCurrentPage(totalPages)} className="w-8 h-8 rounded-lg text-xs font-mono bg-white/5 hover:bg-white/10 text-gray-400">{totalPages}</button>
                      </>
                    )}
                  </div>

                  <button onClick={goToNextPage} disabled={currentPage === totalPages} className="bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-xs font-mono transition flex items-center gap-2">
                    Next
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
                  </button>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
        <div className="text-center mt-8 text-[9px] font-mono text-gray-600">
          <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.5 4.5A.5.5 0 013 4h12a.5.5 0 01.5.5v10a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5v-10zM4 5v9h10V5H4z" clipRule="evenodd"/><path d="M7 7h4v2H7V7zm0 3h4v2H7v-2z"/></svg>
          SQLMind AI · Learn SQL with AI assistance
        </div>
      </div>
    </div>
  );
}
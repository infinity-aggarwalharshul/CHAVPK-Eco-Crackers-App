```react
import React, { useState, useEffect, useRef } from 'react';
import {
  Shield, Cpu, Fingerprint, Zap, KeyRound, Smartphone, Globe,
  MessageSquare, Menu, X, CheckCircle2, ChevronRight,
  Monitor, Coins, BarChart3, Users, Building, Lock, FileText, Activity,
  UploadCloud, Image as ImageIcon, Video, Mic, File, Search
} from 'lucide-react';

// --- CUSTOM CSS FOR FUTURISTIC EFFECTS ---
const customStyles = `
  @keyframes lightning {
    0%, 95%, 98% { opacity: 0; }
    96%, 99% { opacity: 0.8; background: #60a5fa; }
    100% { opacity: 0; }
  }
  .lightning-overlay {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none;
    z-index: 9999;
    animation: lightning 10s infinite;
    mix-blend-mode: overlay;
  }
  .neon-glow {
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5), inset 0 0 10px rgba(59, 130, 246, 0.2);
  }
  .neon-text {
    text-shadow: 0 0 10px rgba(59, 130, 246, 0.7);
  }
  .glass-panel {
    background: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(59, 130, 246, 0.3);
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.5);
    border-radius: 10px;
  }
`;

// --- MOCK DATA ---
const JOB_ROLES = [
  "HR Department", "Finance Department", "CEO Department", "Brainstormers",
  "Data Analysts", "Data Scientists", "Researchers", "Shareholders",
  "Meeting Rooms Head", "CCTV Monitoring", "Interior Designers",
  "Transportation", "Emergency Conditions", "Cleaning Staff", "Extra"
];

const CRYPTO_RATES = { CHC: 154.23, BTC: 64230.10, ETH: 3450.40, USD: 1.0, INR: 83.5 };

// --- MAIN APP COMPONENT ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [rates, setRates] = useState(CRYPTO_RATES);

  // Live Currency Simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setRates(prev => ({
        ...prev,
        CHC: prev.CHC + (Math.random() - 0.5) * 2,
        BTC: prev.BTC + (Math.random() - 0.5) * 100,
        INR: prev.INR + (Math.random() - 0.5) * 0.1,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      <style>{customStyles}</style>
      <div className="lightning-overlay"></div>
     
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]"></div>
      </div>

      {/* Navigation */}
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />

      {/* Live Ticker */}
      <CurrencyTicker rates={rates} />

      {/* Main Content Area */}
      <main className="relative z-10 container mx-auto px-4 py-8 min-h-[80vh]">
        {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === 'about' && <About />}
        {currentPage === 'auth' && <Auth onLogin={handleLogin} />}
        {currentPage === 'dashboard' && <Dashboard user={user} rates={rates} />}
        {currentPage === 'pricing' && <Pricing />}
        {currentPage === 'blogs' && <Blogs />}
        {currentPage === 'legal' && <LegalPages />}
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Agent Floating Widget */}
      <AIAgentWidget isOpen={aiOpen} setIsOpen={setAiOpen} />
    </div>
  );
}

// --- SUB-COMPONENTS ---

function Navigation({ currentPage, setCurrentPage, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'pricing', label: 'Freemium' },
    { id: 'legal', label: 'Legal & Support' }
  ];

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b-0 border-t-0 border-x-0 border-b-blue-500/30">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
       
        {/* Left Side: Hamburger Menu + Logo */}
        <div className="flex items-center gap-4">
          <button
            className="text-white hover:text-blue-400 transition-colors p-2 rounded-lg bg-slate-900/50 border border-slate-700 hover:border-blue-500/50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
         
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <Zap className="text-blue-500 h-8 w-8 animate-pulse" />
            <span className="text-xl md:text-2xl font-bold text-white tracking-wider neon-text hidden sm:block">
              The CHAVPK <span className="text-blue-400">Urja</span>
            </span>
          </div>
        </div>

        {/* Right Side: Auth / Dashboard Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="flex items-center gap-2 px-3 py-2 md:px-4 rounded-full neon-glow bg-blue-900/40 text-blue-300 border border-blue-500/50 hover:bg-blue-800/60 transition-all text-sm md:text-base"
              >
                <Monitor size={16} /> <span className="hidden md:inline">Dashboard</span>
              </button>
              <button onClick={onLogout} className="text-xs md:text-sm text-red-400 hover:text-red-300">Logout</button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentPage('auth')}
              className="flex items-center gap-2 px-4 py-2 md:px-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm md:text-base font-medium hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all transform hover:scale-105"
            >
              <Fingerprint size={18} /> Sign In
            </button>
          )}
        </div>
      </div>

      {/* Slide-down Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full md:w-80 glass-panel border-b md:border-r md:rounded-br-2xl border-blue-500/30 flex flex-col p-6 gap-4 shadow-2xl z-40 animate-fade-in">
          <div className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-bold">Navigation</div>
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => { setCurrentPage(link.id); setMenuOpen(false); }}
              className={`text-left py-3 px-4 rounded-lg flex items-center justify-between group transition-all ${currentPage === link.id ? 'bg-blue-900/40 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:bg-slate-800 hover:text-blue-300'}`}
            >
              {link.label}
              <ChevronRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${currentPage === link.id ? 'opacity-100' : ''}`} />
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function CurrencyTicker({ rates }) {
  return (
    <div className="bg-slate-900 border-b border-slate-800 py-1 overflow-hidden">
      <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] inline-block text-xs md:text-sm font-mono tracking-widest text-slate-400">
        <span className="mx-4"><span className="text-blue-500 font-bold">CHC (ChitraHarsha Crypto):</span> ${rates.CHC.toFixed(2)}</span>
        <span className="mx-4"><span className="text-orange-500 font-bold">BTC:</span> ${rates.BTC.toFixed(2)}</span>
        <span className="mx-4"><span className="text-purple-500 font-bold">ETH:</span> ${rates.ETH.toFixed(2)}</span>
        <span className="mx-4"><span className="text-green-500 font-bold">USD/INR:</span> ₹{rates.INR.toFixed(2)}</span>
        <span className="mx-4 text-emerald-400 font-bold">LIVE TRACKING ACTIVE • 10 TRILLION SQL SUPPORT ONLINE • QUANTUM ENCRYPTION: SECURE</span>
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
      `}</style>
    </div>
  );
}

function Home({ setCurrentPage }) {
  return (
    <div className="space-y-20 animate-fade-in">
      {/* Hero */}
      <section className="text-center pt-10 md:pt-20">
        <div className="inline-block mb-4 px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium backdrop-blur-md">
          Pioneering The AI-Driven Innovations
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
          Next-Gen Ecosystem for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Real World Solutions
          </span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Powered by Quantum Computing speed simulation, Google Cloud Database, and Advanced NLP Models.
          Experience the future of enterprise management, eco-friendly energy exploration, and seamless crypto transactions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage('auth')}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all neon-glow flex items-center justify-center gap-2"
          >
            Get Started <ChevronRight size={18} />
          </button>
          <button
            onClick={() => setCurrentPage('about')}
            className="w-full sm:w-auto px-8 py-3 rounded-full glass-panel hover:bg-slate-800/80 text-white font-bold transition-all flex items-center justify-center gap-2"
          >
            Explore Technology
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          { icon: <Shield className="text-emerald-400" size={32}/>, title: "Quantum Security", desc: "Blockchain-backed management with dark web monitoring and military-grade data encryption." },
          { icon: <Cpu className="text-blue-400" size={32}/>, title: "AI/ML & NLP Engine", desc: "Built-in interactive AI agent for file analysis, 3D modeling, and real-time translation." },
          { icon: <Globe className="text-purple-400" size={32}/>, title: "Global Cloud DB", desc: "Google BigQuery integration with 10 trillion SQL query support for massive scale." }
        ].map((f, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl hover:border-blue-500/60 transition-all hover:-translate-y-1">
            <div className="mb-4 bg-slate-900/50 w-16 h-16 rounded-xl flex items-center justify-center neon-glow">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

function About() {
  return (
    <div className="max-w-4xl mx-auto py-10 animate-fade-in space-y-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4 neon-text">About The CHAVPK Urja</h2>
        <p className="text-slate-400">Driving sustainable innovation through advanced artificial intelligence.</p>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-slate-700 space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-3 text-blue-400">Our Mission</h3>
          <p className="text-slate-300 leading-relaxed">
            The ChitraHarshaVPK Ventures Pvt Ltd is committed to solving real-world environmental and enterprise challenges. By combining 10-trillion SQL database capabilities with cutting-edge Large Language Models (LLM), we offer a platform capable of handling vast multi-modal data streams for real-world impact.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-3 text-emerald-400">Eco-Friendly Initiatives</h3>
          <p className="text-slate-300 leading-relaxed">
            A core part of our mission is exploring energy generation from recycled waste and eco-friendly firecrackers. Through advanced 3D modeling and live monitoring systems embedded within our application, we calculate energy outputs and provide sustainable alternative data directly to our researchers and public users.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-3 text-purple-400">Security & Compliance First</h3>
          <p className="text-slate-300 leading-relaxed">
            Our infrastructure is built for the future. We integrate robust malware monitoring, anti-phishing shields, and continuous Dark Web scanning to secure user credentials. Fully compliant with Google Chrome security standards and global data protection laws, our Blockchain Management system ensures immutable records for enterprise payrolls and data uploads.
          </p>
        </div>
      </div>
    </div>
  );
}

function Auth({ onLogin }) {
  const [tab, setTab] = useState('new');
  const [step, setStep] = useState(1);
 
  // Form state
  const [formData, setFormData] = useState({
    username: '', password: '', jobRole: JOB_ROLES[0]
  });

  const handleSimulatedLogin = () => {
    // Simulate OTP / Fingerprint step
    if (step === 1) {
      setStep(2);
      setTimeout(() => setStep(3), 1500); // simulate checking
    } else if (step === 3) {
      onLogin({ username: formData.username || 'Demo User', role: tab === 'admin' ? 'Founder/Admin' : 'Employee', jobRole: formData.jobRole });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 glass-panel rounded-2xl p-6 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
     
      <div className="flex justify-between border-b border-slate-700 pb-2 mb-6 text-sm">
        <button onClick={() => {setTab('new'); setStep(1);}} className={`${tab==='new' ? 'text-blue-400 font-bold border-b-2 border-blue-400' : 'text-slate-400'} pb-2`}>New User</button>
        <button onClick={() => {setTab('company'); setStep(1);}} className={`${tab==='company' ? 'text-blue-400 font-bold border-b-2 border-blue-400' : 'text-slate-400'} pb-2`}>Company</button>
        <button onClick={() => {setTab('admin'); setStep(1);}} className={`${tab==='admin' ? 'text-blue-400 font-bold border-b-2 border-blue-400' : 'text-slate-400'} pb-2`}>Admin</button>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">
        {tab === 'new' ? 'Registration Process' : tab === 'admin' ? 'Founder / Admin Login' : 'Company Login'}
      </h2>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Username (Email/Mobile No.)</label>
            <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="Enter ID" onChange={e => setFormData({...formData, username: e.target.value})}/>
          </div>
         
          {tab === 'new' && (
            <>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Job Role / Department</label>
                <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" onChange={e => setFormData({...formData, jobRole: e.target.value})}>
                  {JOB_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">City</label>
                  <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Pincode</label>
                  <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">ID Proof (Aadhaar/PAN)</label>
                <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs text-slate-400 mb-1">Password (8+ chars)</label>
            <input type="password" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
          </div>
         
          <button onClick={handleSimulatedLogin} className="w-full py-3 mt-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all neon-glow">
            {tab === 'new' ? 'Proceed to Verification' : 'Authenticate'}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="text-center py-10 space-y-4">
          <Activity className="animate-spin text-blue-500 w-12 h-12 mx-auto" />
          <p className="text-blue-400 font-mono text-sm">Verifying via Global Cloud DB...</p>
          <p className="text-slate-500 text-xs">Checking OTP & Blockchain Records</p>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-6 space-y-6">
          <div className="w-20 h-20 mx-auto bg-slate-900 rounded-full border-2 border-blue-500 flex items-center justify-center neon-glow relative overflow-hidden group cursor-pointer" onClick={handleSimulatedLogin}>
            <Fingerprint className="text-blue-400 w-10 h-10 group-hover:scale-110 transition-transform" />
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 animate-[scan_2s_ease-in-out_infinite]"></div>
          </div>
          <div>
            <h3 className="text-white font-bold mb-1">OTP / Passkey Required</h3>
            <p className="text-slate-400 text-xs">Tap fingerprint sensor to complete secure login.</p>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Or Enter Manual Passkey</label>
            <input type="password" placeholder="6-digit PIN" className="w-1/2 text-center bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white mx-auto block" />
          </div>
          <button onClick={handleSimulatedLogin} className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-all border border-slate-700">
            Verify & Secure Login
          </button>
        </div>
      )}
     
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          50% { top: 100%; opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function Dashboard({ user, rates }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  if (!user) return null;

  const handleFileUpload = (e) => {
    if(e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files).map(file => ({
        name: file.name,
        type: file.type.split('/')[0],
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
      }));
      setUploadedFiles([...uploadedFiles, ...filesArray]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-800 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white neon-text mb-1">Workspace Portal</h1>
          <p className="text-slate-400 text-sm flex items-center gap-2">
            <Lock size={14} className="text-emerald-400"/> Blockchain-Secured Session
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/30">
          <CheckCircle2 size={14} /> Global Node Synced
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: ID Card & Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-blue-500 relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-blue-500/20 rounded-full blur-[30px]"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <Zap className="text-blue-400 w-8 h-8" />
              <div className="text-right">
                <p className="text-xs text-slate-400 font-mono">VIRTUAL ID CARD</p>
                <p className="text-[10px] text-blue-500 font-mono tracking-widest">CHAVPK-VENTURES-PVT-LTD</p>
              </div>
            </div>
            <div className="space-y-4 relative z-10">
              <div>
                <p className="text-xs text-slate-500 uppercase">Name / ID</p>
                <p className="text-lg font-bold text-white">{user.username}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase">Role / Dept</p>
                <p className="text-sm font-medium text-blue-300">{user.role} - {user.jobRole}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-700/50 flex justify-center">
                <div className="w-24 h-24 bg-white p-1 rounded-lg flex flex-wrap gap-1">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className={`w-[20%] h-[20%] ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Social / Content Interfaces */}
          <div className="glass-panel p-4 rounded-2xl">
            <h4 className="text-sm font-bold text-white mb-3">Content Creation Access</h4>
            <div className="grid grid-cols-2 gap-3">
              {['YouTube', 'Instagram', 'Twitter / X', 'LinkedIn'].map(platform => (
                <button key={platform} className="text-xs py-2 bg-slate-900 border border-slate-800 rounded-lg hover:border-blue-500/50 hover:bg-slate-800 text-slate-300 transition-colors">
                  {platform} Portal
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Admin/User Tools & ML Upload */}
        <div className="lg:col-span-2 space-y-6">
         
          {/* File Upload / ML Processing Section */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-700">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-bold text-white flex items-center gap-2">
                 <UploadCloud size={18} className="text-purple-400"/> Cloud Data Upload & NLP Processing
               </h3>
               <span className="text-[10px] bg-purple-900/40 text-purple-300 px-2 py-1 rounded border border-purple-500/30">10 Trillion SQL Ready</span>
            </div>
           
            <div className="border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-900/50 rounded-xl p-8 text-center transition-colors relative">
              <input
                type="file"
                multiple
                accept="audio/*,video/*,image/*,.pdf,.doc,.txt"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex justify-center gap-4 mb-3 text-slate-500">
                <ImageIcon size={24} /> <Video size={24} /> <Mic size={24} /> <File size={24} />
              </div>
              <p className="text-white font-medium mb-1">Drag & Drop or Click to Upload</p>
              <p className="text-xs text-slate-400">Audio, Video, Images, or Documents for AI/ML Analysis</p>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-xs text-slate-500 uppercase font-bold">Encrypted Storage Queue</h4>
                {uploadedFiles.map((file, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-900 p-2 rounded border border-slate-800">
                    <div className="flex items-center gap-2">
                      {file.type === 'image' ? <ImageIcon size={14} className="text-blue-400"/> :
                       file.type === 'video' ? <Video size={14} className="text-purple-400"/> :
                       file.type === 'audio' ? <Mic size={14} className="text-orange-400"/> :
                       <File size={14} className="text-slate-400"/>}
                      <span className="text-sm text-slate-300">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">{file.size}</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-500/20">Uploaded</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {user.role === 'Founder/Admin' ? (
            <>
              {/* Admin Dashboard Specifics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-panel p-6 rounded-2xl border border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="text-blue-400" />
                    <h3 className="text-white font-bold">Total Employees</h3>
                  </div>
                  <p className="text-3xl font-extrabold text-white">330</p>
                  <p className="text-xs text-slate-400 mt-2 text-green-400">+ Live Database Sync Active</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="text-emerald-400" />
                    <h3 className="text-white font-bold">Monthly Budget</h3>
                  </div>
                  <p className="text-3xl font-extrabold text-white">₹ 2.26 Cr</p>
                  <p className="text-xs text-slate-400 mt-2">Annual: ₹ 27.12 Cr</p>
                </div>
              </div>
             
              <div className="glass-panel p-6 rounded-2xl border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Lock size={18}/> Automated Salary Engine (The CHAVPK Pay)</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {[
                    { dept: 'HR Department', count: 39, budget: '23 Lakh' },
                    { dept: 'Finance Department', count: 39, budget: '23 Lakh' },
                    { dept: 'Brainstormers', count: 39, budget: '23 Lakh' },
                    { dept: 'Data Scientists', count: 39, budget: '23 Lakh' },
                    { dept: 'Security / CCTV', count: 5, budget: '4 Lakh' },
                  ].map((dept, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div>
                        <p className="text-white text-sm font-medium">{dept.dept}</p>
                        <p className="text-xs text-slate-500">{dept.count} Employees</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-400 text-sm font-bold">₹ {dept.budget}</p>
                        <button className="text-[10px] bg-blue-600/20 text-blue-400 px-2 py-1 rounded mt-1 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-colors">
                          Auto-Transact (Blockchain)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Employee Dashboard */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-700">
                 <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Coins size={18} className="text-yellow-400"/> My Financials & Crypto</h3>
                 <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                      <p className="text-xs text-slate-500 mb-1">Monthly Salary (INR)</p>
                      <p className="text-2xl font-bold text-white">₹ 50,000</p>
                    </div>
                    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                      <p className="text-xs text-slate-500 mb-1">Crypto Holdings (CHC)</p>
                      <p className="text-2xl font-bold text-blue-400">{(50000 / rates.CHC).toFixed(2)} CHC</p>
                    </div>
                 </div>
                
                 <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 mb-4">
                    <h4 className="text-sm font-bold text-white mb-2">Live Converter Engine</h4>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="text-[10px] text-slate-500">Amount (CHC)</label>
                        <input type="number" defaultValue="1" className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm text-white" />
                      </div>
                      <div className="pt-4 text-slate-500">=</div>
                      <div className="flex-1">
                        <label className="text-[10px] text-slate-500">Value (USD)</label>
                        <input type="text" readOnly value={`$${rates.CHC.toFixed(2)}`} className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm text-green-400 font-bold" />
                      </div>
                    </div>
                 </div>

                 <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold transition-all neon-glow flex justify-center items-center gap-2">
                   Open The CHAVPK Pay <ChevronRight size={16}/>
                 </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Pricing() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in pt-10">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4 neon-text">Flexible Freemium Ecosystem</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Unlock the full potential of quantum-level processing and 10 trillion SQL database support.
          Pay with FIAT via The CHAVPK Pay or use our native Crypto API.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: 'Guest / Basic', price: 'Free', features: ['Basic Cloud Access', 'Standard Security', 'Community Forums'], color: 'slate' },
          { name: 'Pro Innovator', price: '₹ 4,999 / mo', crypto: '≈ 32.4 CHC', features: ['Advanced AI/ML Agent', 'Full Cloud DB Storage', 'Real-time Analytics', 'Priority API Access'], color: 'blue', popular: true },
          { name: 'Enterprise', price: 'Custom', features: ['Quantum Encryption', 'Dedicated Node', 'Full Employee Payroll Suite', 'Custom Blockchain setup'], color: 'purple' }
        ].map((plan, i) => (
          <div key={i} className={`glass-panel p-8 rounded-3xl relative flex flex-col ${plan.popular ? 'border-2 border-blue-500 transform scale-105 shadow-[0_0_30px_rgba(59,130,246,0.3)] z-10' : 'border border-slate-700'}`}>
            {plan.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</div>}
           
            <h3 className={`text-2xl font-bold text-white mb-2`}>{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-white">{plan.price}</span>
              {plan.crypto && <p className="text-blue-400 text-sm mt-1">{plan.crypto}</p>}
            </div>
           
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-3 text-slate-300 text-sm">
                  <CheckCircle2 className={`w-5 h-5 shrink-0 text-${plan.color}-400`} /> {f}
                </li>
              ))}
            </ul>
           
            <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular ? 'bg-blue-600 hover:bg-blue-500 text-white neon-glow' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}>
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Blogs() {
  const [expanded, setExpanded] = useState(null);

  const blogs = [
    { id: 1, title: "Integrating Supercomputers in Enterprise Workflows", date: "July 2026", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800", snippet: "Exploring the latest AI/ML models and deep learning frameworks that power The CHAVPK ventures ecosystem.", fullText: "Our infrastructure relies on quantum-simulated speeds to process 10 trillion SQL queries rapidly. We implement this across all nodes, from payroll to AI modeling, providing seamless latency-free environments for our enterprise clients and employees." },
    { id: 2, title: "Eco-Friendly Firecrackers: The Future of Energy Generation", date: "June 2026", img: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800", snippet: "Discover how we are utilizing 3D modeling and chemical analysis to create sustainable energy solutions from waste.", fullText: "By analyzing the chemical breakdown of recycled materials through our NLP and ML algorithms, we can simulate energy outputs of green crackers. This data is stored securely via Blockchain and helps direct real-world manufacturing processes towards zero-emission goals." },
    { id: 3, title: "Quantum Computing & NLP: A Dual Approach", date: "May 2026", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", snippet: "A deep dive into our multi-modal AI Agent and its capability to process audio, video, and text securely.", fullText: "With our new update, users can upload media directly into the secure cloud. Our AI parses audio transcripts and video frames using advanced Large Language Models, cross-referencing global databases to deliver actionable intelligence instantly." }
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-8 neon-text border-b border-slate-800 pb-4">Latest Insights & Updates</h2>
      <div className="space-y-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="glass-panel rounded-2xl overflow-hidden flex flex-col md:flex-row border border-slate-800 hover:border-blue-500/50 transition-all">
            <div className="w-full md:w-2/5 h-56 md:h-auto overflow-hidden relative">
              <div className="absolute inset-0 bg-blue-900/20 z-10"></div>
              <img src={blog.img} alt={blog.title} className="w-full h-full object-cover transform hover:scale-105 transition-duration-500" />
            </div>
            <div className="p-6 md:w-3/5 flex flex-col justify-center">
              <span className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-wider">{blog.date}</span>
              <h3 className="text-2xl font-bold text-white mb-3">{blog.title}</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                {expanded === blog.id ? blog.fullText : blog.snippet}
              </p>
              <button
                onClick={() => setExpanded(expanded === blog.id ? null : blog.id)}
                className="text-sm font-bold text-blue-500 flex items-center gap-1 self-start hover:text-blue-400 transition-colors"
              >
                {expanded === blog.id ? 'Show Less' : 'Read Full Post'} <ChevronRight size={16} className={expanded === blog.id ? 'rotate-90 transition-transform' : 'transition-transform'}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LegalPages() {
  return (
    <div className="max-w-4xl mx-auto py-10 animate-fade-in space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-slate-800 pb-2">Privacy Policy</h2>
        <div className="text-slate-300 text-sm leading-relaxed glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <p>
            At The CHAVPK Ventures Pvt Ltd, we prioritize your data security with quantum-level encryption and robust blockchain management systems. All user data is stored safely in Google Cloud Databases adhering strictly to global and Indian government regulations.
          </p>
          <p>
            <strong>Dark Web & Malware Monitoring:</strong> Our servers actively scan network requests to prevent unauthorized access. We deploy constant Dark Web monitoring to ensure user credentials remain uncompromised, immediately alerting users if potential breaches are detected elsewhere.
          </p>
          <p>
            <strong>Browser Compliance:</strong> Our web application strictly follows all security rules and regulations set by major search engines and platforms, including Google Chrome's Safe Browsing protocols, preventing phishing and malicious injections.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-slate-800 pb-2">Terms and Conditions</h2>
        <div className="text-slate-300 text-sm leading-relaxed glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <p>
            By utilizing the Freemium model or interacting with the Live AI Agent, you agree to comply with our fair-use policies. All transactions processed via The CHAVPK Pay or our native Cryptocurrency API are final and immutably recorded on our blockchain ledger.
          </p>
          <p>
            <strong>Commercial Use & API Limits:</strong> The platform utilizes an advanced architecture capable of supporting 10 trillion SQL database queries. Misuse or attempted denial-of-service against these NLP/ML endpoints is strictly prohibited and will result in immediate termination of the Virtual ID.
          </p>
          <p>
            Content creators utilizing our linked Social Media login portals (YouTube, X, Facebook, LinkedIn) must adhere to their respective platform guidelines in addition to our internal community standards.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-slate-800 pb-2">FAQs</h2>
        <div className="space-y-4">
          {[
            { q: "How does the Cryptocurrency (CHC) conversion work?", a: "We utilize real-time live monitoring APIs linked to global exchanges, allowing instantaneous conversion tracking against INR, USD, BTC, and ETH." },
            { q: "Is the app safe from phishing?", a: "Yes. Our platform includes in-built dark web monitoring and safe-browsing modules that actively block malicious intent and phishing attempts, fully compliant with Google Chrome security standards." },
            { q: "How does the ML File Upload work?", a: "Users can upload audio, video, image, or document files to the secure cloud. Our internal Large Language Models and NLP engines analyze the content to provide insights, transcripts, or 3D modeling data." },
            { q: "How is the Virtual ID generated?", a: "Upon successful OTP and Passkey/Fingerprint verification, our cloud system automatically mints a unique Virtual ID embedded with a QR code referencing your blockchain entry." }
          ].map((faq, i) => (
            <div key={i} className="glass-panel p-5 rounded-xl border border-slate-800">
              <h4 className="text-blue-400 font-bold mb-3">{faq.q}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AIAgentWidget({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Namaste! I am the CHAVPK NLP AI Agent. You can ask me questions or upload files (audio, video, images) for ML processing.' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if(!input.trim()) return;
    const newMsgs = [...messages, { sender: 'user', text: input }];
    setMessages(newMsgs);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMsgs, { sender: 'ai', text: "Processing your request via our LLM modules. Query mapped against the 10-trillion SQL dataset. Solution optimized and synthesized successfully." }]);
    }, 1500);
  };

  const handleFileAttach = (e) => {
    if(e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newMsgs = [...messages, { sender: 'user', text: `[Uploaded File: ${file.name}]` }];
      setMessages(newMsgs);
     
      setTimeout(() => {
        setMessages([...newMsgs, { sender: 'ai', text: `I have received ${file.name}. Initializing NLP and visual data models to extract insights from this file. Data is encrypted and stored securely in the cloud.` }]);
      }, 1500);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.6)] z-50 hover:scale-110 transition-transform"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] max-w-[90vw] h-[450px] glass-panel border border-blue-500/50 rounded-2xl flex flex-col overflow-hidden z-50 animate-fade-in shadow-2xl">
          <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400">
              <Zap size={16} className="text-blue-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">CHAVPK Live AI</h4>
              <p className="text-[10px] text-green-400">NLP Engine Online • Mic & Cam Sync Active</p>
            </div>
          </div>
         
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-slate-950/80">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-xl p-3 text-sm ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-slate-800 text-slate-300 rounded-bl-sm border border-slate-700'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-3 bg-slate-900 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileAttach}
                className="hidden"
                accept="audio/*,video/*,image/*,.pdf,.doc"
              />
              <button onClick={() => fileInputRef.current.click()} className="p-2 text-slate-400 hover:text-blue-400 transition-colors">
                <UploadCloud size={20} />
              </button>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask or upload data..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
              <button onClick={handleSend} className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-900/50 backdrop-blur-md relative z-10">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
       
        <div className="flex items-center gap-2 mb-6">
          <Zap className="text-blue-500 h-6 w-6" />
          <span className="text-xl font-bold text-white neon-text">
            The CHAVPK <span className="text-blue-400">Urja</span>
          </span>
        </div>
       
        <p className="text-slate-400 text-sm max-w-2xl text-center mb-10">
          Pioneering the AI-Driven Innovations. Bridging quantum computing, blockchain security, and eco-friendly energy solutions for a sustainable commercial future. Compliant with Google Chrome Safe Browsing and Indian Government data protocols.
        </p>

        {/* Centered Contact Us Button */}
        <button className="px-8 py-3 rounded-full bg-slate-800 hover:bg-blue-600 text-white font-bold transition-all border border-slate-700 hover:border-blue-500 flex items-center gap-2 mb-10 shadow-lg">
          <MessageSquare size={18}/> Contact Us (Get in Touch)
        </button>

        <div className="w-full border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 The CHAVPK Ventures Pvt Ltd. All rights reserved. Trademarks Protected.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1"><Shield size={12}/> Govt Cloud DB Secured</span>
            <span className="flex items-center gap-1"><Search size={12}/> Dark Web Monitored</span>
            <span className="flex items-center gap-1">Made in India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}


```
import React, { useState } from 'react';
import { Code, Key, Type, Binary, Copy, Check, Sparkles } from 'lucide-react';

export const InteractiveToolsEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'json' | 'pass' | 'text' | 'base64'>('json');
  const [copied, setCopied] = useState(false);

  // JSON Formatter State
  const [jsonInput, setJsonInput] = useState('{"name":"Hanan Irfan","role":"Full-Stack Developer","location":"Rahim Yar Khan","skills":["React","Next.js","SEO","Design"],"age":18}');
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonError, setJsonError] = useState('');

  // Password Generator State
  const [passLength, setPassLength] = useState(16);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [generatedPass, setGeneratedPass] = useState('');

  // Text Case State
  const [textInput, setTextInput] = useState('Building Digital Experiences That Move People and Technology Forward.');
  const [caseOutput, setCaseOutput] = useState('');

  // Base64 State
  const [b64Input, setB64Input] = useState('Hanan Irfan — Full-Stack Developer');
  const [b64Output, setB64Output] = useState('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
      setJsonError('');
    } catch (err: any) {
      setJsonError(err.message || 'Invalid JSON format');
      setJsonOutput('');
    }
  };

  const handleGeneratePassword = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let res = '';
    for (let i = 0; i < passLength; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPass(res);
  };

  const handleBase64Encode = () => {
    try {
      setB64Output(btoa(b64Input));
    } catch (e) {
      setB64Output('Error encoding');
    }
  };

  const handleBase64Decode = () => {
    try {
      setB64Output(atob(b64Input));
    } catch (e) {
      setB64Output('Invalid Base64 string');
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-purple-500/20 bg-[#0c0e17]/90 text-left my-6">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
          <h3 className="text-lg font-bold font-display text-white">Free Tools Hub — Interactive Live Playground</h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono border border-purple-500/30">
          Client-Side Processing
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('json')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'json'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Code className="w-4 h-4" /> JSON Formatter
        </button>
        <button
          onClick={() => { setActiveTab('pass'); if (!generatedPass) handleGeneratePassword(); }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'pass'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Key className="w-4 h-4" /> Password Gen
        </button>
        <button
          onClick={() => setActiveTab('text')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'text'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Type className="w-4 h-4" /> Case Converter
        </button>
        <button
          onClick={() => { setActiveTab('base64'); if (!b64Output) handleBase64Encode(); }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'base64'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Binary className="w-4 h-4" /> Base64 Tool
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'json' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Unformatted Raw JSON:</label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full h-24 p-3 bg-[#05060a] border border-white/10 rounded-xl font-mono text-xs text-purple-300 focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            onClick={handleFormatJson}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold transition-all"
          >
            Format & Validate JSON
          </button>
          {jsonError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl font-mono">
              ❌ {jsonError}
            </div>
          )}
          {jsonOutput && (
            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-emerald-400 font-mono">✔ Formatted JSON Output:</span>
                <button
                  onClick={() => copyToClipboard(jsonOutput)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-3 bg-[#05060a] border border-emerald-500/20 rounded-xl font-mono text-xs text-emerald-300 overflow-x-auto max-h-40">
                {jsonOutput}
              </pre>
            </div>
          )}
        </div>
      )}

      {activeTab === 'pass' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Length: {passLength}</label>
              <input
                type="range"
                min="8"
                max="32"
                value={passLength}
                onChange={(e) => setPassLength(Number(e.target.value))}
                className="w-36 accent-purple-500"
              />
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={(e) => setUseNumbers(e.target.checked)}
                className="accent-purple-500 rounded"
              />
              Include Numbers
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={(e) => setUseSymbols(e.target.checked)}
                className="accent-purple-500 rounded"
              />
              Include Symbols
            </label>
          </div>
          <button
            onClick={handleGeneratePassword}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold transition-all"
          >
            Generate Secure Password
          </button>
          {generatedPass && (
            <div className="flex items-center justify-between p-3 bg-[#05060a] border border-purple-500/30 rounded-xl font-mono text-sm text-purple-300">
              <span className="break-all">{generatedPass}</span>
              <button
                onClick={() => copyToClipboard(generatedPass)}
                className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-all ml-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'text' && (
        <div className="space-y-4">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="w-full h-20 p-3 bg-[#05060a] border border-white/10 rounded-xl font-mono text-xs text-slate-200 focus:outline-none focus:border-purple-500"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCaseOutput(textInput.toUpperCase())}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs text-slate-200 rounded-lg transition-all"
            >
              UPPERCASE
            </button>
            <button
              onClick={() => setCaseOutput(textInput.toLowerCase())}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs text-slate-200 rounded-lg transition-all"
            >
              lowercase
            </button>
            <button
              onClick={() => setCaseOutput(textInput.replace(/\b\w/g, c => c.toUpperCase()))}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs text-slate-200 rounded-lg transition-all"
            >
              Capitalized Case
            </button>
            <button
              onClick={() => setCaseOutput(textInput.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()))}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs text-slate-200 rounded-lg transition-all"
            >
              camelCase
            </button>
          </div>
          {caseOutput && (
            <div className="p-3 bg-[#05060a] border border-purple-500/20 rounded-xl font-mono text-xs text-purple-300 flex items-center justify-between">
              <span>{caseOutput}</span>
              <button onClick={() => copyToClipboard(caseOutput)} className="text-slate-400 hover:text-white ml-2">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
          <div className="text-[11px] text-slate-400 font-mono">
            Word count: {textInput.trim() ? textInput.trim().split(/\s+/).length : 0} | Character count: {textInput.length}
          </div>
        </div>
      )}

      {activeTab === 'base64' && (
        <div className="space-y-4">
          <textarea
            value={b64Input}
            onChange={(e) => setB64Input(e.target.value)}
            className="w-full h-20 p-3 bg-[#05060a] border border-white/10 rounded-xl font-mono text-xs text-slate-200 focus:outline-none focus:border-purple-500"
          />
          <div className="flex gap-2">
            <button
              onClick={handleBase64Encode}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold transition-all"
            >
              Encode Base64
            </button>
            <button
              onClick={handleBase64Decode}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold transition-all"
            >
              Decode Base64
            </button>
          </div>
          {b64Output && (
            <div className="p-3 bg-[#05060a] border border-cyan-500/30 rounded-xl font-mono text-xs text-cyan-300 flex items-center justify-between break-all">
              <span>{b64Output}</span>
              <button onClick={() => copyToClipboard(b64Output)} className="text-slate-400 hover:text-white ml-2">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

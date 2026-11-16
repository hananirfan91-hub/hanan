import React, { useState } from 'react';
import { Code, Key, Type, Binary, Copy, Check, Wrench } from 'lucide-react';
import { copyTextSafely } from '../lib/safeStorage';

export const InteractiveToolsEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'json' | 'pass' | 'text' | 'base64'>('json');
  const [copied, setCopied] = useState(false);

  const [jsonInput, setJsonInput] = useState(
    '{"name":"Hanan Irfan","role":"Multidisciplinary Developer & SEO Specialist","location":"Rahim Yar Khan, Pakistan","semester":"5th Semester","cgpa":3.65}'
  );
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonError, setJsonError] = useState('');

  const [passLength, setPassLength] = useState(16);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [generatedPass, setGeneratedPass] = useState('');

  const [textInput, setTextInput] = useState('Building reliable web applications and search-driven experiences.');
  const [caseOutput, setCaseOutput] = useState('');

  const [b64Input, setB64Input] = useState('Hanan Irfan — Developer & SEO Specialist');
  const [b64Output, setB64Output] = useState('');

  const copyToClipboard = async (text: string) => {
    const ok = await copyTextSafely(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
      setJsonError('');
    } catch (err: unknown) {
      setJsonError(err instanceof Error ? err.message : 'Invalid JSON format');
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
    } catch {
      setB64Output('Error encoding input');
    }
  };

  const handleBase64Decode = () => {
    try {
      setB64Output(atob(b64Input));
    } catch {
      setB64Output('Invalid Base64 string');
    }
  };

  return (
    <div className="rounded-2xl p-6 border border-white/[0.12] bg-white/[0.04] text-left my-6">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.1] flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-[#3B82F6]" />
          <h3 className="text-base sm:text-lg font-bold font-display text-[#F8FAFC]">
            Free Tools Hub — Interactive Preview
          </h3>
        </div>
        <span className="text-xs text-[#3B82F6] font-mono">
          Client-Side Processing
        </span>
      </div>

      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        {(
          [
            { id: 'json', label: 'JSON Formatter', Icon: Code },
            { id: 'pass', label: 'Password Gen', Icon: Key },
            { id: 'text', label: 'Case Converter', Icon: Type },
            { id: 'base64', label: 'Base64 Tool', Icon: Binary },
          ] as const
        ).map(({ id, label, Icon }) => (
          <button
            type="button"
            key={id}
            onClick={() => {
              setActiveTab(id);
              if (id === 'pass' && !generatedPass) handleGeneratePassword();
              if (id === 'base64' && !b64Output) handleBase64Encode();
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === id
                ? 'bg-[#3B82F6] text-[#F8FAFC]'
                : 'bg-white/[0.05] border border-white/[0.12] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.08]'
            }`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {activeTab === 'json' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">Unformatted JSON:</label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full h-24 p-3 bg-[#080D1B]/80 border border-white/[0.14] rounded-xl font-mono text-xs text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6]"
            />
          </div>
          <button
            type="button"
            onClick={handleFormatJson}
            className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Format &amp; Validate JSON
          </button>
          {jsonError && (
            <div className="p-3 bg-red-500/15 border border-red-400/30 text-red-200 text-xs rounded-xl font-mono">
              Error: {jsonError}
            </div>
          )}
          {jsonOutput && (
            <div className="relative">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-emerald-300 font-mono font-semibold">Formatted JSON:</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(jsonOutput)}
                  className="flex items-center gap-1 text-xs text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-3 bg-[#080D1B]/80 border border-white/[0.12] rounded-xl font-mono text-xs text-[#F8FAFC] overflow-x-auto max-h-40">
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
              <label className="block text-xs text-[#94A3B8] mb-1">Length: {passLength}</label>
              <input
                type="range"
                min="8"
                max="32"
                value={passLength}
                onChange={(e) => setPassLength(Number(e.target.value))}
                className="w-36 accent-[#3B82F6]"
              />
            </div>
            <label className="flex items-center gap-2 text-xs text-[#94A3B8] cursor-pointer">
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={(e) => setUseNumbers(e.target.checked)}
                className="accent-[#3B82F6] rounded"
              />
              Include Numbers
            </label>
            <label className="flex items-center gap-2 text-xs text-[#94A3B8] cursor-pointer">
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={(e) => setUseSymbols(e.target.checked)}
                className="accent-[#3B82F6] rounded"
              />
              Include Symbols
            </label>
          </div>
          <button
            type="button"
            onClick={handleGeneratePassword}
            className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Generate Password
          </button>
          {generatedPass && (
            <div className="flex items-center justify-between p-3 bg-[#080D1B]/80 border border-white/[0.12] rounded-xl font-mono text-sm text-[#F8FAFC]">
              <span className="break-all">{generatedPass}</span>
              <button
                type="button"
                onClick={() => copyToClipboard(generatedPass)}
                className="p-1.5 hover:bg-white/[0.08] rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] transition-colors ml-2 cursor-pointer"
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
            className="w-full h-20 p-3 bg-[#080D1B]/80 border border-white/[0.14] rounded-xl font-mono text-xs text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6]"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCaseOutput(textInput.toUpperCase())}
              className="px-3 py-1.5 bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.1] text-xs text-[#F8FAFC] rounded-lg transition-colors cursor-pointer"
            >
              UPPERCASE
            </button>
            <button
              type="button"
              onClick={() => setCaseOutput(textInput.toLowerCase())}
              className="px-3 py-1.5 bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.1] text-xs text-[#F8FAFC] rounded-lg transition-colors cursor-pointer"
            >
              lowercase
            </button>
            <button
              type="button"
              onClick={() => setCaseOutput(textInput.replace(/\b\w/g, (c) => c.toUpperCase()))}
              className="px-3 py-1.5 bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.1] text-xs text-[#F8FAFC] rounded-lg transition-colors cursor-pointer"
            >
              Title Case
            </button>
            <button
              type="button"
              onClick={() =>
                setCaseOutput(
                  textInput.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr: string) => chr.toUpperCase())
                )
              }
              className="px-3 py-1.5 bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.1] text-xs text-[#F8FAFC] rounded-lg transition-colors cursor-pointer"
            >
              camelCase
            </button>
          </div>
          {caseOutput && (
            <div className="p-3 bg-[#080D1B]/80 border border-white/[0.12] rounded-xl font-mono text-xs text-[#F8FAFC] flex items-center justify-between">
              <span>{caseOutput}</span>
              <button
                type="button"
                onClick={() => copyToClipboard(caseOutput)}
                className="text-[#94A3B8] hover:text-[#F8FAFC] ml-2 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
          <div className="text-[11px] text-[#94A3B8] font-mono">
            Words: {textInput.trim() ? textInput.trim().split(/\s+/).length : 0} &bull; Characters: {textInput.length}
          </div>
        </div>
      )}

      {activeTab === 'base64' && (
        <div className="space-y-4">
          <textarea
            value={b64Input}
            onChange={(e) => setB64Input(e.target.value)}
            className="w-full h-20 p-3 bg-[#080D1B]/80 border border-white/[0.14] rounded-xl font-mono text-xs text-[#F8FAFC] focus:outline-none focus:border-[#3B82F6]"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleBase64Encode}
              className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Encode Base64
            </button>
            <button
              type="button"
              onClick={handleBase64Decode}
              className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.14] text-[#F8FAFC] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Decode Base64
            </button>
          </div>
          {b64Output && (
            <div className="p-3 bg-[#080D1B]/80 border border-white/[0.12] rounded-xl font-mono text-xs text-[#F8FAFC] flex items-center justify-between break-all">
              <span>{b64Output}</span>
              <button
                type="button"
                onClick={() => copyToClipboard(b64Output)}
                className="text-[#94A3B8] hover:text-[#F8FAFC] ml-2 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

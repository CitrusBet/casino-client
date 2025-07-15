import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useUser } from './UserContext';

interface Currency {
  flag: React.ReactNode;
  code: string;
  symbol?: string;
  balance?: string;
}

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  currencies: Currency[];
}

const NETWORKS: Record<string, string> = {
  ETH: 'Ethereum (ERC20)',
  BTC: 'Bitcoin',
  SOL: 'Solana',
  TRX: 'Tron',
  TON: 'TON',
  APT: 'Aptos',
  NEAR: 'NEAR',
  KAS: 'Kaspa',
};

const BONUSES: Record<string, string> = {
  ETH: '180% bonus for a minimum deposit of 0,0032909 ETH',
  BTC: '150% bonus for a minimum deposit of 0,0001 BTC',
  SOL: '120% bonus for a minimum deposit of 0,1 SOL',
  TRX: '100% bonus for a minimum deposit of 10 TRX',
  TON: '110% bonus for a minimum deposit of 1 TON',
  APT: '130% bonus for a minimum deposit of 1 APT',
  NEAR: '140% bonus for a minimum deposit of 1 NEAR',
  KAS: '160% bonus for a minimum deposit of 100 KAS',
};

const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose, currencies }) => {
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState('');
  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [copied, setCopied] = useState(false);
  const [qrLoading, setQrLoading] = useState(true);
  const { profile } = useUser();

  useEffect(() => {
    if (currencies.length === 0) return;
    if (!selectedCurrencyCode || !currencies.some(c => c.code === selectedCurrencyCode)) {
      setSelectedCurrencyCode(currencies[0].code);
    }
  }, [currencies, selectedCurrencyCode]);

  useEffect(() => {
    scrollToIdx(scrollIndex);
  }, [scrollIndex, currencies]);

  useEffect(() => {
    if (isOpen) setScrollIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const idx = currencies.findIndex(c => c.code === selectedCurrencyCode);
    if (idx !== -1) {
      setScrollIndex(idx);
    }
  }, [selectedCurrencyCode]);

  function scrollToIdx(idx: number) {
    const btn = btnRefs.current[idx];
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }
  }

  const handleCopy = async () => {
    const address = depositAddress;
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error(e instanceof Error ? e.message : e);
    }
  };

  if (typeof window === 'undefined' || !isOpen) return null;

  const selectedCurrency = currencies.find(c => c.code === selectedCurrencyCode) || currencies[0];
  const code = selectedCurrency?.code || 'ETH';

  const networkToCurrency: Record<string, string> = {
    ETH: 'ETH',
    BTC: 'BTC',
    SOL: 'SOL',
    TRX: 'TRX',
    TON: 'TON',
    APTOS: 'APT',
    NEAR: 'NEAR',
    KASPA: 'KAS',
  };

  const addressMap: Record<string, string> = {};
  if (profile && Array.isArray(profile.wallets)) {
    for (const wallet of profile.wallets) {
      const codeMap = networkToCurrency[wallet.network];
      if (codeMap) addressMap[codeMap] = wallet.address;
    }
  }

  const depositAddress = addressMap[code] || '';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(depositAddress)}`;

  const handleLeft = () => {
    if (scrollIndex > 0) {
      const newIdx = scrollIndex - 1;
      setScrollIndex(newIdx);
      scrollToIdx(newIdx);
    }
  };
  const handleRight = () => {
    if (scrollIndex < currencies.length - 1) {
      const newIdx = scrollIndex + 1;
      setScrollIndex(newIdx);
      scrollToIdx(newIdx);
    }
  };

  const ArrowLeft = (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  );
  const ArrowRight = (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-lg mx-auto rounded-[24px] shadow-2xl max-h-[90vh] overflow-hidden"
            style={{ boxShadow: '0 0 32px 0 #794DFD55, 0 8px 32px 0 #0008' }}
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32, duration: 0.35 }}
          >
            <div className="bg-[#22232e] rounded-[24px] p-6 flex flex-col relative max-h-[90vh] overflow-y-auto min-w-[350px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-lg font-semibold">Deposit</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl focus:outline-none p-1 rounded-full transition-colors" aria-label="Close">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="relative flex items-center gap-2 mb-4 w-full min-h-[44px]">
                <button
                  className="h-11 aspect-square flex items-center justify-center text-white bg-[#33364a] rounded-full hover:bg-[#44475a] z-40"
                  onClick={handleLeft}
                  aria-label="Scroll left"
                  type="button"
                  disabled={scrollIndex === 0}
                >
                  {ArrowLeft}
                </button>
                <div
                  ref={scrollRef}
                  className="flex gap-2 overflow-x-auto no-scrollbar w-full px-1"
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                  {currencies.map((currency, idx) => (
                    <button
                      key={currency.code}
                      ref={el => { btnRefs.current[idx] = el; }}
                      className={`scroll-ms-[28px] bg-[#33364a] rounded-full flex flex-row items-center transition-colors border-2 w-full min-w-[120px] pr-4 pl-2 py-2 ${selectedCurrencyCode === currency.code ? 'border-[#794DFD] text-white' : 'border-transparent text-gray-300'}'}`}
                      onClick={() => { setSelectedCurrencyCode(currency.code); scrollToIdx(idx); }}
                      style={{ scrollSnapAlign: 'center' }}
                      type="button"
                    >
                      <span className="w-7 h-7 flex items-center justify-center rounded-full overflow-hidden mr-2">{currency.flag}</span>
                      <span className="text-base font-medium leading-none text-left">{currency.code}</span>
                    </button>
                  ))}
                </div>
                <button
                  className="h-11 aspect-square flex items-center justify-center text-white bg-[#33364a] rounded-full hover:bg-[#44475a] z-40"
                  onClick={handleRight}
                  aria-label="Scroll right"
                  type="button"
                  disabled={scrollIndex === currencies.length - 1}
                >
                  {ArrowRight}
                </button>
              </div>
              <div className="flex gap-2 mb-4">
                <div className="flex-1">
                  <label className="block text-gray-400 text-xs mb-1">Deposit Currency</label>
                  <div className="bg-[#33364a] rounded-lg px-3 py-2 text-white flex items-center gap-2 h-10">
                    {selectedCurrency.flag}
                    <span>{selectedCurrency.code}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-400 text-xs mb-1">Network</label>
                  <div className="bg-[#33364a] rounded-lg px-3 py-2 text-white h-10">{NETWORKS[code] || 'Network'}</div>
                </div>
              </div>
              <div className="bg-[#2d2e3a] rounded-lg p-3 flex items-center gap-2 mb-4">
                <span className="text-yellow-400 text-xl">🎁</span>
                <span className="text-white text-sm">Get an additional <span className="text-yellow-400 font-bold">{BONUSES[code] || ''}</span></span>
              </div>
              <div className="flex flex-row items-start gap-4 rounded-xl py-4 mb-4 w-full">
                <div className="bg-white p-2 rounded-lg flex items-center justify-center min-w-[124px] min-h-[124px]" style={{ width: 124, height: 124 }}>
                  {qrLoading && (
                    <div className="w-8 h-8 flex items-center justify-center animate-spin">
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                    </div>
                  )}
                  <img
                    src={qrUrl}
                    alt="Deposit QR Code"
                    className={`w-28 h-28 ${qrLoading ? 'hidden' : ''}`}
                    onLoad={() => setQrLoading(false)}
                    onError={() => setQrLoading(false)}
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="text-gray-400 text-xs mb-1">Deposit Address</div>
                  <div className="bg-[#33364a] rounded-lg px-3 py-2 font-mono text-green-400 text-sm break-all mb-2 select-all">
                    {depositAddress}
                  </div>
                  <button className="flex w-full items-center gap-2 px-3 py-2 bg-[#33364a] rounded-lg text-gray-200 hover:text-white hover:bg-[#23243a]/80 transition-colors text-sm" onClick={handleCopy}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    {copied ? 'Copied!' : 'Copy Address'}
                  </button>
                </div>
              </div>
              <div className="bg-[#33364a] rounded-lg p-3 text-green-400 text-xs">
                Send only {selectedCurrency.code} to this deposit address. Transfers below the minimum amount will not be credited.
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default DepositModal; 
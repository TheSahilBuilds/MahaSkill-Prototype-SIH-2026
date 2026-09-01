import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, X, Music, ShieldCheck } from 'lucide-react';

export default function RajyageetModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(90);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Audio play error", err);
          setIsPlaying(true);
        });
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(Math.floor(audioRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      setDuration(Math.floor(audioRef.current.duration));
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      
      {/* Real Audio Player Element */}
      <audio 
        ref={audioRef}
        src="/audio/rajyageet.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="auto"
      />

      <div className="bg-white rounded-3xl shadow-2xl border border-[#D9E1EA] w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="bg-[#032447] text-white p-5 border-b border-slate-700 flex justify-between items-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#F2A900] uppercase tracking-wider mb-0.5">
              <Music className="w-3.5 h-3.5" />
              <span>Official State Anthem of Maharashtra</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">जय जय महाराष्ट्र माझा</h3>
            <p className="text-xs text-slate-300">Jai Jai Maharashtra Majha (Rajyageet)</p>
          </div>

          <button 
            onClick={handleClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg relative z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Background Gold Ornament Accent */}
          <div className="absolute right-2 -bottom-6 text-[#F2A900]/10 font-serif text-8xl font-bold select-none pointer-events-none">
            ॥
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-xs text-[#172B4D]">
          
          {/* AUDIO PLAYER CONTROLS CARD */}
          <div className="bg-[#062B52] text-white p-5 rounded-2xl border border-[#0B3B70] shadow-md space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-[#F2A900] hover:bg-amber-400 text-[#032447] flex items-center justify-center shadow-lg transition transform hover:scale-105 shrink-0"
                  title={isPlaying ? "Pause Anthem" : "Play Anthem"}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>
                <div>
                  <h4 className="font-extrabold text-sm text-white">जय जय महाराष्ट्र माझा</h4>
                  <p className="text-[11px] text-slate-300 font-medium">गीतः राजा बढे • संगीतः शाहीर साबळे</p>
                </div>
              </div>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-slate-300 hover:text-white p-2 rounded-lg"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-[#F2A900]" />}
              </button>
            </div>

            {/* Audio Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                <div 
                  className="bg-[#F2A900] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(currentTime / (duration || 90)) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between font-mono text-[10px] text-slate-300">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

          </div>

          {/* LYRICS SECTION MATCHING OFFICIAL GOVERNMENT DOCUMENT */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="font-extrabold text-sm text-[#062B52]">संपूर्ण राज्यगीत (Official Anthem Lyrics)</h4>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                शासकीय राज्यगीत
              </span>
            </div>

            {/* Marathi Lyrics - Exact Match to Government Document Image */}
            <div className="bg-[#FFFBEB] p-6 rounded-2xl border border-[#FDE68A] space-y-5 text-center font-serif text-sm sm:text-base leading-relaxed text-[#032447]">
              
              <div className="space-y-1">
                <p className="font-bold text-[#D97706] text-xs uppercase tracking-widest font-sans">महाराष्ट्र शासन</p>
                <h3 className="font-extrabold text-xl text-[#062B52]">राज्यगीत</h3>
              </div>

              {/* धृपद */}
              <div className="space-y-1 font-bold text-base text-[#062B52]">
                <p>जय जय महाराष्ट्र माझा, गर्जा महाराष्ट्र माझा</p>
                <p>जय जय महाराष्ट्र माझा, गर्जा महाराष्ट्र माझा॥धृ॥</p>
              </div>

              {/* कडवे १ */}
              <div className="space-y-1 border-t border-amber-200/80 pt-4">
                <p>भीती न आम्हा तुझी मुळी ही गडगडणाऱ्या नभा</p>
                <p>अस्मानाच्या सुलतानीला जवाब देती जिभा</p>
                <p>सह्याद्रीचा सिंह गर्जतो शिव शंभू राजा</p>
                <p>दरी दरीतून नाद गुंजला महाराष्ट्र माझा</p>
                <p className="font-bold text-[#062B52] pt-1">जय जय महाराष्ट्र माझा, गर्जा महाराष्ट्र माझा॥१॥</p>
              </div>

              {/* कडवे २ */}
              <div className="space-y-1 border-t border-amber-200/80 pt-4">
                <p>काळ्या छातीवरी कोरली, अभिमानाची लेणी</p>
                <p>पोलादी मनगटे खेळती, खेळ जीव घेणी</p>
                <p>दारिद्रयाच्या उन्हात शिजला</p>
                <p>निढळाच्या घामाने भिजला</p>
                <p>देश गौरवासाठी झिजला</p>
                <p>दिल्लीचे ही तख्त राखितो, महाराष्ट्र माझा</p>
                <p className="font-bold text-[#062B52] pt-1">जय जय महाराष्ट्र माझा, गर्जा महाराष्ट्र माझा</p>
                <p className="font-bold text-[#062B52]">जय जय महाराष्ट्र माझा॥२॥</p>
              </div>

            </div>

            {/* Official Background Info */}
            <div className="bg-[#F5F7FA] p-4 rounded-xl border border-slate-200 text-slate-600 text-[11px] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#062B52]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16A36A]" />
                <span>State Decision Notification</span>
              </div>
              <p className="leading-relaxed">
                Adopted as the Official State Song of Maharashtra on 19 February 2023 (Chhatrapati Shivaji Maharaj Jayanti) by the Government of Maharashtra.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#F5F7FA] p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={handleClose}
            className="bg-[#062B52] hover:bg-[#0B3B70] text-white px-5 py-2 rounded-xl font-bold text-xs shadow-xs"
          >
            Close / बंद करा
          </button>
        </div>

      </div>
    </div>
  );
}

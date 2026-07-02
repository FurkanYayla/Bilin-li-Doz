import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [qrScanned, setQrScanned] = useState(false);

  // 🌟 BOŞLUKSUZ VE TAM UYUMLU GERÇEK SES ENTEGRASYONU
  const audioTracks = [
    { 
      id: 'ney-dinlendirici', 
      name: 'Ney Dinlendirici Müzik', 
      desc: 'Ruhsal dinginlik veren kadim ney sesi', 
      src: '/ney-dinlendirici-muzik-ney-sesi.mp3' 
    },
    { 
      id: 'ney-tasavvuf', 
      name: 'Ney Tasavvuf Müziği', 
      desc: 'Geleneksel darüşşifa terapi nameleri', 
      src: '/ney-demedim-tasavvuf-muzigi.mp3' 
    },
    { 
      id: 'ud-sesi-1', 
      name: 'Ud Terapisi - Parça 1', 
      desc: 'Zihni dinlendiren kadim ud tınıları', 
      src: '/ud-sesi-1.mp3' 
    },
    { 
      id: 'ud-sesi-2', 
      name: 'Ud Terapisi - Parça 2', 
      desc: 'Pozitif ve bütünsel enerji veren ud sentezi', 
      src: '/ud-sesi-2.mp3' 
    }
  ];

  const [currentTrack, setCurrentTrack] = useState(audioTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) { 
      audioRef.current.pause(); 
    } else { 
      audioRef.current.play().catch(err => console.log("Ses dosyası oynatılamadı", err)); 
    }
    setIsPlaying(!isPlaying);
  };

  const changeTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) { 
      audioRef.current.pause(); 
      audioRef.current.load(); 
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const goldenQuestions = [
    { id: 1, title: "İlacı nasıl hazırlayacağım?", desc: "Özellikle toz halindeki süspansiyon ilaçlar veya şurupların sulandırılma oranları, steril su kullanımı ve çalkalama süreleri hayati önem taşır." },
    { id: 2, title: "İlacı nasıl kullanacağım?", desc: "Aç karnına mı, tok karnına mı alınacak? Çiğnenerek mi yutulacak, doğrudan suyla mı? Doğru uygulama şifanın ilk şartıdır." },
    { id: 3, title: "İlacı günün hangi saatlerinde ve kaç kez kullanacağım?", desc: 'Kanda ilaç düzeyinin sabit kalabilmesi için tam 8 saatte bir (günde 3 defa) alınması gerekir. Saat düzenine sadakat şarttır.' },
    { id: 4, title: "İlaç tedavim kaç gün sürecek?", desc: "Kendinizi iyi hissettiğiniz an ilacı bırakmak en büyük hatalardan biridir. Bakterilerin direnç kazanmaması için tedavi süresi tamamlanmalıdır." },
    { id: 5, title: "İlacı kullanırken kaçınmam gereken yiyecek ve içecekler var mı?", desc: "Özellikle greyfurt suyu ilaçların etkisini tehlikeli düzeyde artırabilir; süt ürünleri ise bazı antibiyotiklerin emilimini durdurabilir." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased overflow-x-hidden font-sans">
      
      {/* GERÇEK ARKA PLAN SES MOTORU */}
      <audio 
        ref={audioRef} 
        src={currentTrack.src} 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={() => setIsPlaying(false)} 
      />

      {/* MENÜ ALANI */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-teal-600 text-white p-2 rounded-xl shadow-md">✨</div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-teal-950 to-teal-700 bg-clip-text text-transparent">Bilinçli Doz</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#vizyon" className="hover:text-teal-600 transition">Vizyonumuz</a>
              <a href="#altin-sorular" className="hover:text-teal-600 transition">5 Altın Soru</a>
              <a href="#dijital-kartlar" className="hover:text-teal-600 transition">Proje Kartları</a>
              <a href="#qr-rehber" className="hover:text-teal-600 transition">QR Kod Sistemi</a>
              <a href="#sifahane" className="hover:text-teal-600 transition">Dijital Şifahane</a>
            </div>
          </div>
        </div>
      </nav>

      {/* GİRİŞ (HERO) BÖLÜMÜ */}
      <header id="vizyon" className="relative bg-gradient-to-br from-teal-950 via-teal-900 to-emerald-950 text-white py-24 px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase">🌱 Akılcı İlaç & Bütünsel Sağlık Hareketi</span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Bilinçli Doz ve <br/><span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent italic font-serif font-normal">Dijital Şifahane</span></h1>
          <p className="text-base sm:text-lg text-teal-100/80 max-w-2xl mx-auto">Modern tıbbın rasyonel ilkelerini, Türk-İslam medeniyetinin ruhu ve bedeni bütünleştiren kadim darüşşifa kültürüyle harmanlıyoruz.</p>
        </div>
      </header>

      {/* 5 ALTIN SORU LİSTESİ */}
      <section id="altin-sorular" className="py-20 max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">İlaç Kullanırken "5 Altın Soru"</h2>
        </div>
        <div className="space-y-4">
          {goldenQuestions.map((q) => (
            <div key={q.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <button onClick={() => toggleAccordion(q.id)} className="w-full flex items-center justify-between p-5 text-left font-semibold hover:bg-slate-50">
                <span className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="h-7 w-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0">{q.id}</span>
                  {q.title}
                </span>
                <span>{activeAccordion === q.id ? '▲' : '▼'}</span>
              </button>
              {activeAccordion === q.id && <p className="p-5 text-sm text-slate-600 border-t bg-slate-50">{q.desc}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* DİJİTAL PROJE KARTLARI (BROŞÜR ALANI) */}
      <section id="dijital-kartlar" className="py-20 bg-stone-100 border-y border-stone-200 px-4">
        <div className="max-w-5xl mx-auto space-y-4 text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-md">Fiziksel Materyal Tasarımı</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Proje Farkındalık Kartlarımız</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm">Saha çalışmalarımızda toplumla buluşturduğumuz bilgilendirme kartlarımızın yüksek çözünürlüklü dijital replikası.</p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-[#fcfbf7] rounded-[24px] shadow-xl border border-stone-200 p-8 min-h-[520px] flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex justify-between items-start border-b border-stone-200 pb-4 mb-6">
                <div>
                  <h3 className="text-stone-500 text-xs font-bold tracking-wider uppercase">İlacını Alırken</h3>
                  <h4 className="text-teal-950 font-black text-2xl tracking-tight mt-0.5">5 ALTIN SORU</h4>
                </div>
                <div className="text-3xl bg-teal-50 p-2 rounded-xl border border-teal-100">❤️‍🩹</div>
              </div>
              <div className="space-y-4 text-slate-800 text-sm font-medium">
                <div className="flex gap-3 items-start"><span className="text-teal-600 text-base">💧</span> <div><strong className="text-slate-900 block font-bold">İlacı nasıl hazırlayacağım?</strong><span className="text-xs text-slate-500 font-normal">(Sulandırma, çalkalama vb.)</span></div></div>
                <div className="flex gap-3 items-start"><span className="text-amber-500 text-base">💊</span> <div><strong className="text-slate-900 block font-bold">İlacı nasıl kullanacağım?</strong></div></div>
                <div className="flex gap-3 items-start"><span className="text-blue-500 text-base">🕒</span> <div><strong className="text-slate-900 block font-bold">İlacı günün hangi saatlerinde ve kaç kez kullanacağım?</strong></div></div>
                <div className="flex gap-3 items-start"><span className="text-rose-500 text-base">📅</span> <div><strong className="text-slate-900 block font-bold">İlaç tedavim kaç gün sürecek?</strong></div></div>
                <div className="flex gap-3 items-start"><span className="text-emerald-600 text-base">🍽️</span> <div><strong className="text-slate-900 block font-bold">İlacı kullanırken kaçınmam gereken yiyecek ve içecekler var mı?</strong></div></div>
              </div>
            </div>
            <div className="text-center text-[11px] text-stone-500 border-t border-stone-200/60 pt-4 mt-6 font-semibold italic">Anlamadığınız noktaları mutlaka sağlık uzmanınıza danışın.</div>
          </div>

          <div className="bg-[#fcfbf7] rounded-[24px] shadow-xl border-4 border-teal-600 p-8 min-h-[520px] flex flex-col justify-between items-center text-center relative">
            <h3 className="text-teal-950 font-black text-xl leading-snug max-w-xs mx-auto">Bilgini sor, ilacını doğru kullan, sağlığını koru.</h3>
            <div className="bg-white p-4 rounded-2xl shadow-md border border-stone-100 my-4">
              <img 
                src="/site-qr.png" 
                alt="Bilinçli Doz QR Kodu" 
                className="w-48 h-48 object-contain"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://bilin-li-doz-oawz.vercel.app";
                }}
              />
            </div>
            <div className="w-full space-y-4">
              <div className="flex justify-center items-center gap-2 text-xs font-bold text-teal-800 bg-teal-50 border border-teal-100 py-1.5 px-4 rounded-full w-fit mx-auto">
                <span>⚡ HEMEN OKUT!</span><span className="text-stone-400">→</span><span className="text-emerald-700">Eğitici Videoslar</span>
              </div>
              <div className="flex justify-center gap-6 pt-1 text-stone-600 text-xs font-bold">
                <span>🎵 TikTok</span><span>📺 YouTube</span><span>📸 Instagram</span>
              </div>
              <div className="text-teal-900 text-sm font-bold tracking-wide">@bilincli.doz</div>
            </div>
            <div className="text-[11px] text-teal-700 font-bold tracking-wider uppercase pt-2 border-t border-stone-200/60 w-full">Bu kart senin sağlığın için.</div>
          </div>
        </div>
      </section>

      {/* QR REHBERİ BİLGİ ALANI */}
      <section id="qr-rehber" className="bg-teal-900 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold">İlaç Kutularındaki QR Kodlar ve Saklama Isısı</h2>
            <p className="text-teal-100/80 text-sm">İlaç kutularının üzerinde yer alan karekodlar (ITS), ilacın dijital kimlik kartıdır. Doğru ısıda saklanmayan ilaçlar yapısal olarak bozulabilir.</p>
          </div>
          <div className="flex justify-center">
            <div className="bg-white text-slate-900 p-6 rounded-2xl max-w-xs w-full text-center space-y-4">
              <button onClick={() => setQrScanned(true)} className="w-full bg-teal-600 text-white font-bold py-2 rounded-lg text-xs">📸 KAREKODU SİMÜLE ET</button>
              {qrScanned && <div className="p-3 bg-emerald-50 text-left rounded-xl text-xs"><strong>Parasetamol 500 mg</strong><br/>Maksimum Isı: 25°C (Oda Sıcaklığı)</div>}
            </div>
          </div>
        </div>
      </section>

      {/* DİJİTAL ŞİFAHANE (BOŞLUKSUZ YENİ SES DOSYALARI) */}
      <section id="sifahane" className="py-24 max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-br from-amber-50 to-stone-100 rounded-3xl p-8 md:p-12 border grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3 space-y-6">
            <h2 className="text-3xl font-bold text-amber-950 font-serif">Kadim Darüşşifalar og Müzik Terapisi</h2>
            <p className="text-slate-600 text-sm">Ecdadımız darüşşifalarda hastaları su sesi ve özel müzik makamlarıyla iyileştiriyordu. Yüklediğiniz gerçek ses dosyaları arasından seçim yaparak şifa melodilerini canlandırın.</p>
            
            {/* 4 Şarkı İçin Dinamik Seçim Butonları */}
            <div className="grid sm:grid-cols-2 gap-3">
              {audioTracks.map((track) => (
                <button 
                  key={track.id}
                  onClick={() => changeTrack(track)} 
                  className={`p-3 rounded-xl border text-left transition text-xs ${currentTrack.id === track.id ? 'bg-amber-600/10 border-amber-600 font-bold shadow-sm' : 'bg-white hover:bg-amber-50/50'}`}
                >
                  <div className="text-amber-900 font-semibold truncate">{track.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 truncate">{track.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* SES OYNATICI PANELİ */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl border space-y-3 w-full">
            <div className="text-center font-bold text-xs text-amber-950 uppercase tracking-wider pb-1 border-b">Şifahane Audio Player</div>
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
              <button onClick={togglePlay} className="h-10 w-10 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center font-bold shadow shrink-0">
                {isPlaying ? '⏸' : '▶'}
              </button>
              <div className="w-full text-xs min-w-0">
                <div className={`font-bold truncate ${isPlaying ? 'text-amber-600 animate-pulse' : ''}`}>{currentTrack.name}</div>
                <div className="w-full bg-slate-200 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-600 h-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-500 py-8 text-center text-xs border-t border-slate-800">
        <p>&copy; 2026 Bilinçli Doz ve Dijital Şifahane Hareketi. Tüm Hakları Saklıdır.</p>
      </footer>
    </div>
  );
}

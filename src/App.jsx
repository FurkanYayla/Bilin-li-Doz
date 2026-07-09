import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [qrScanned, setQrScanned] = useState(false);

  // GÜNCEL SES LİSTESİ (neysesi-2 ve neysesi-3)
  const audioTracks = [
    { 
      id: 'ney-sesi-2', 
      name: 'Ney Terapisi - Parça 1', 
      desc: 'Geleneksel darüşşifa terapi nameleri', 
      src: '/neysesi-2.mp3' 
    },
    { 
      id: 'ney-sesi-3', 
      name: 'Ney Terapisi - Parça 2', 
      desc: 'Ruhsal dinginlik ve iç huzuru veren kadim ney melodisi', 
      src: '/neysesi-3.mp3' 
    }
  ];

  const [currentTrack, setCurrentTrack] = useState(audioTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  // Safari ve React zamanlama çakışmasını çözen doğrudan yükleme motoru
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load(); 
      setProgress(0);
      
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Safari engeli:", error);
            setIsPlaying(false);
          });
        }
      }
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.log("Oynatma hatası:", err);
          audioRef.current.src = currentTrack.src;
          audioRef.current.play().then(() => setIsPlaying(true));
        });
    }
  };

  const changeTrack = (track) => {
    setCurrentTrack(track);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const goldenQuestions = [
    { id: 1, title: "İlacı nasıl hazırlayacağım?", desc: "Özellikle toz halindeki süspansiyon ilaçlar veya şurupların sulandırılma oranları, steril su kullanımı ve çalkalama süreleri hayati önem taşır. Yanlış hazırlanan ilaçlar etkinliğini kaybedebilir veya eksik doz alınmasına sebep olur." },
    { id: 2, title: "İlacı nasıl kullanacağım?", desc: "Aç karnına mı, tok karnına mı alınacak? Çiğnenerek mi yutulacak, doğrudan suyla mı? Bazı hapların bölünerek içilmesi koruyucu kaplamasını bozarak mideye zarar verir veya emilimi engeller." },
    { id: 3, title: "İlacı günün hangi saatlerinde ve kaç kez kullanacağım?", desc: '"Günde 3 defa" ifadesi rastgele sabah-öğle-akşam demek değildir; kanda ilaç düzeyinin sabit kalabilmesi için tam 8 saatte bir alınması gerekir. Saat düzenine milimetrik sadakat şarttır.' },
    { id: 4, title: "İlaç tedavim kaç gün sürecek?", desc: "Kendinizi iyi hissettiğiniz an ilacı bırakmak en büyük hatalardan biridir. Özellikle antibiyotiklerde, vücutta kalan dirençli az sayıdaki mikroorganizma tedavinin yarıda kesilmesiyle çoğalarak hastalığın çok daha şiddetli nüksetmesine neden olur." },
    { id: 5, title: "İlacı kullanırken kaçınmam gereken yiyecek ve içecekler var mı?", desc: "Bazı besinler ilaçlarla etkileşime girer. Örneğin greyfurt suyu birçok ilacın karaciğerde yıkımını engelleyebilir; bu durum kanda aşırı birikmeye ve ciddi zehirlenmelere yol açabilir." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased overflow-x-hidden font-sans select-none">
      
      <audio 
        ref={audioRef} 
        src={currentTrack.src} 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={() => { setIsPlaying(false); setProgress(0); }} 
        preload="auto"
      />

      {/* MENÜ ALANI (Kurumsal Logo Sol Üste Entegre Edildi) */}
      <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-100/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              {/* 🌟 YENİ LOGO GÖRSELİNİZ */}
              <img 
                src="/logo.png" 
                alt="Bilinçli Doz" 
                className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-teal-950 to-teal-700 bg-clip-text text-transparent">Bilinçli Doz</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <a href="#vizyon" className="hover:text-teal-600 transition-colors">Vizyonumuz</a>
              <a href="#altin-sorular" className="hover:text-teal-600 transition-colors">5 Altın Soru</a>
              <a href="#dijital-kartlar" className="hover:text-teal-600 transition-colors">Proje Kartları</a>
              <a href="#qr-rehber" className="hover:text-teal-600 transition-colors">QR Kod Sistemi</a>
              <a href="#sifahane" className="hover:text-teal-600 transition-colors">Dijital Şifahane</a>
            </div>
          </div>
        </div>
      </nav>

      {/* GİRİŞ (HERO) BÖLÜMÜ */}
      <header id="vizyon" className="relative bg-gradient-to-br from-teal-950 via-teal-900 to-emerald-950 text-white py-28 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">🌱 Akılcı İlaç & Bütünsel Sağlık Hareketi</span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">Bilinçli Doz ve <br/><span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent italic font-serif font-normal">Dijital Şifahane</span></h1>
          <p className="text-base sm:text-lg text-teal-100/80 max-w-2xl mx-auto leading-relaxed font-medium">Modern tıbbın rasyonel ilkelerini, Türk-İslam medeniyetinin ruhu ve bedeni bütünleştiren kadim darüşşifa kültürüyle harmanlıyoruz.</p>
        </div>
      </header>

      {/* 5 ALTIN SORU LİSTESİ */}
      <section id="altin-sorular" className="py-24 max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-md">Reçete Danışmanlığı</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">İlaç Kullanırken "5 Altın Soru"</h2>
        </div>
        <div className="space-y-4">
          {goldenQuestions.map((q) => {
            const isCurrentActive = activeAccordion === q.id;
            return (
              <div 
                key={q.id} 
                className={`rounded-2xl border transition-all duration-300 shadow-sm overflow-hidden ${isCurrentActive ? 'border-teal-500/40 bg-gradient-to-b from-teal-50/40 to-white shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                <button 
                  onClick={() => setActiveAccordion(isCurrentActive ? null : q.id)} 
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 transition-colors"
                >
                  <span className="flex items-center gap-4 text-sm sm:text-base">
                    <span className={`h-8 w-8 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-300 ${isCurrentActive ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20' : 'bg-slate-100 text-slate-700'}`}>{q.id}</span>
                    {q.title}
                  </span>
                  <span className={`text-xs transition-transform duration-300 ${isCurrentActive ? 'rotate-180 text-teal-600' : 'text-slate-400'}`}>▼</span>
                </button>
                <div className="transition-all duration-300 overflow-hidden" style={{ maxHeight: isCurrentActive ? '250px' : '0px' }}>
                  <p className="p-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 font-medium">{q.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DİJİTAL PROJE KARTLARI (BROŞÜR ALANI) */}
      <section id="dijital-kartlar" className="py-24 bg-stone-100/80 border-y border-stone-200/60 px-4">
        <div className="max-w-5xl mx-auto space-y-3 text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-md">Fiziksel Materyal Tasarımı</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Proje Farkındalık Kartlarımız</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm font-medium">Saha çalışmalarımızda toplumla buluşturduğumuz bilgilendirme kartlarımızın yüksek çözünürlüklü dijital replikası.</p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-[#fcfbf7] rounded-[28px] shadow-lg border border-stone-200/80 p-8 min-h-[540px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
            <div>
              <div className="flex justify-between items-start border-b border-stone-200 pb-4 mb-6">
                <div>
                  <h3 className="text-stone-500 text-xs font-bold tracking-wider uppercase">İlacını Alırken</h3>
                  <h4 className="text-teal-950 font-black text-2xl tracking-tight mt-0.5">5 ALTIN SORU</h4>
                </div>
                <div className="text-2xl bg-teal-50 p-2 rounded-xl border border-teal-100">❤️‍🩹</div>
              </div>
              <div className="space-y-4 text-slate-800 text-sm font-semibold">
                <div className="flex gap-3 items-start"><span className="text-teal-600 text-base shrink-0">💧</span> <div><strong className="text-slate-900 block font-bold">İlacı nasıl hazırlayacağım?</strong><span className="text-xs text-slate-500 font-normal">(Sulandırma, çalkalama vb.)</span></div></div>
                <div className="flex gap-3 items-start"><span className="text-amber-500 text-base shrink-0">💊</span> <div><strong className="text-slate-900 block font-bold">İlacı nasıl kullanacağım?</strong></div></div>
                <div className="flex gap-3 items-start"><span className="text-blue-500 text-base shrink-0">🕒</span> <div><strong className="text-slate-900 block font-bold">İlacı günün hangi saatlerinde ve kaç kez kullanacağım?</strong></div></div>
                <div className="flex gap-3 items-start"><span className="text-rose-500 text-base shrink-0">📅</span> <div><strong className="text-slate-900 block font-bold">İlaç tedavim kaç gün sürecek?</strong></div></div>
                <div className="flex gap-3 items-start"><span className="text-emerald-600 text-base shrink-0">🍽️</span> <div><strong className="text-slate-900 block font-bold">İlacı kullanırken kaçınmam gereken yiyecek ve içecekler var mı?</strong></div></div>
              </div>
            </div>
            <div className="text-center text-[11px] text-stone-500 border-t border-stone-200/60 pt-4 mt-6 font-bold italic">Anlamadığınız noktaları mutlaka sağlık uzmanınıza danışın.</div>
          </div>

          <div className="bg-[#fcfbf7] rounded-[28px] shadow-lg border-4 border-teal-600 p-8 min-h-[540px] flex flex-col justify-between items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
            <h3 className="text-teal-950 font-black text-xl leading-snug max-w-xs mx-auto">Bilgini sor, ilacını doğru kullan, sağlığını koru.</h3>
            <div className="bg-white p-4 rounded-2xl shadow-md border border-stone-100 my-3 transition-transform duration-300 hover:scale-105">
              <img 
                src="/site-qr.png" 
                alt="Bilinçli Doz QR" 
                className="w-44 h-44 object-contain"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://bilin-li-doz-oawz.vercel.app";
                }}
              />
            </div>
            <div className="w-full space-y-4">
              <div className="flex justify-center items-center gap-2 text-xs font-extrabold text-teal-800 bg-teal-50 border border-teal-100 py-1.5 px-4 rounded-full w-fit mx-auto">
                <span>⚡ HEMEN OKUT!</span><span className="text-stone-300">→</span><span className="text-emerald-700">Eğitici Videolar</span>
              </div>
              <div className="flex justify-center gap-5 text-stone-600 text-xs font-bold bg-stone-100 py-2 px-4 rounded-xl">
                <span>🎵 TikTok</span><span>📺 YouTube</span><span>📸 Instagram</span>
              </div>
              <div className="text-teal-900 text-sm font-black tracking-wide">@bilincli.doz</div>
            </div>
            <div className="text-[11px] text-teal-700 font-bold tracking-wider uppercase pt-2 border-t border-stone-200/60 w-full">Bu kart senin sağlığın için.</div>
          </div>
        </div>
      </section>

      {/* QR REHBERİ */}
      <section id="qr-rehber" className="bg-gradient-to-r from-teal-900 to-teal-950 text-white py-24 px-4 border-b border-teal-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">Teknoloji Entegrasyonu</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">İlaç Kutularındaki QR Kodlar ve Saklama Isısı</h2>
            <p className="text-teal-100/80 text-sm sm:text-base leading-relaxed font-medium">İlaç kutularının üzerinde yer alan karekodlar (ITS), ilacın dijital kimlik kartıdır. Doğru ısıda ve nemde saklanmayan kimyasallar, zamanla şifa özelliklerini yitirerek toksik yapılara dönüşebilir.</p>
          </div>
          
          <div className="md:col-span-5 flex justify-center md:justify-end w-full">
            <div className="bg-white text-slate-900 p-6 rounded-3xl shadow-xl shadow-teal-950/40 max-w-sm w-full text-center space-y-4 border border-teal-800/20">
              <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200 text-2xl">📸</div>
              <h4 className="font-bold text-sm text-slate-500 uppercase tracking-wider">Akıllı Isı Denetim Modülü</h4>
              <button 
                onClick={() => setQrScanned(true)} 
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold py-3 rounded-xl text-xs transition shadow-md shadow-teal-600/10"
              >
                KAREKODU SİMÜLE ET
              </button>
              {qrScanned && (
                <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl text-left text-xs space-y-1.5 shadow-sm">
                  <div className="font-bold text-slate-900 flex justify-between"><span>Parasetamol 500 mg</span> <span className="text-emerald-600">✓ Onaylı</span></div>
                  <div className="text-slate-600 font-medium"><strong>Maksimum Isı:</strong> 25°C (Oda Sıcaklığı)</div>
                  <div className="text-rose-600 font-bold text-[10px] bg-rose-50 p-1.5 rounded-lg border border-rose-100">⚠️ Buzdolabına koymayınız, dondurmayınız.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DİJİTAL ŞİFAHANE */}
      <section id="sifahane" className="py-24 max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-br from-amber-50 to-stone-100/60 rounded-[32px] p-8 md:p-14 border grid md:grid-cols-5 gap-10 items-center shadow-sm">
          <div className="md:col-span-3 space-y-6">
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Kültürel Miras & Terapi</span>
            <h2 className="text-3xl font-black text-amber-950 font-serif tracking-tight">Kadim Darüşşifalar ve Müzik Terapisi</h2>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">Ecdadımız darüşşifalarda hastaları su sesi ve özel müzik makamlarıyla iyileştiriyordu. Güncellediğiniz neysesi-2 ve neysesi-3 ses dosyalarını aşağıdan seçerek dinleyebilirsiniz.</p>
            
            <div className="grid sm:grid-cols-2 gap-3">
              {audioTracks.map((track) => {
                const isSelected = currentTrack.id === track.id;
                return (
                  <button 
                    key={track.id}
                    onClick={() => changeTrack(track)} 
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 ${isSelected ? 'bg-amber-600/10 border-amber-600 font-bold shadow-md ring-2 ring-amber-600/20' : 'bg-white border-stone-200 hover:border-amber-300 hover:bg-amber-50/30'}`}
                  >
                    <div className="text-amber-950 font-bold text-xs sm:text-sm flex items-center justify-between">
                      <span className="truncate">{track.name}</span>
                      {isSelected && <span className="text-[10px] text-amber-600 shrink-0 font-black">{isPlaying ? '● AÇIK' : '● SEÇİLİ'}</span>}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1.5 truncate font-medium">{track.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SES OYNATICI PANELİ */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-stone-200/60 shadow-xl shadow-stone-200/40 w-full space-y-4">
            <div className="text-center font-extrabold text-xs text-amber-950 uppercase tracking-widest pb-2 border-b border-stone-100">Şifahane Audio Player</div>
            <div className="flex items-center gap-4 bg-stone-50 p-4 rounded-xl border border-stone-100">
              <button 
                onClick={togglePlay} 
                className="h-12 w-12 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center font-bold shadow-lg transition-transform active:scale-95 shrink-0 text-base"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <div className="w-full text-xs min-w-0 space-y-1">
                <div className={`font-black truncate transition-colors text-slate-900 ${isPlaying ? 'text-amber-600 animate-pulse' : ''}`}>{currentTrack.name}</div>
                <div className="text-[10px] text-slate-400 font-medium truncate">{currentTrack.desc}</div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden relative">
                  <div className="bg-amber-600 h-full transition-all duration-75" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-500 py-10 text-center text-xs border-t border-slate-800">
        <p className="font-bold text-slate-400 mb-1">Bilinçli Doz - Akılcı İlaç Kullanımı Sosyal Sorumluluk Hareketi</p>
        <p>&copy; 2026 Tüm Hakları Saklıdır. Bir Mezuniyet Çalışmasıdır.</p>
      </footer>
    </div>
  );
}

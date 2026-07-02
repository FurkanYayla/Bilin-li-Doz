import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  // 1. Akordeon State (5 Altın Soru)
  const [activeAccordion, setActiveAccordion] = useState(null);

  // 2. QR Kod Simülatör State
  const [qrScanned, setQrScanned] = useState(false);

  // 3. GERÇEK SES OYNATICI SİSTEMİ
  const audioTracks = [
    { id: 'rast', name: 'Rast Makamı - Kadim Terapi Melodisi', desc: 'Geleneksel Ney & Ud Sentezi', src: '/rast.mp3' },
    { id: 'nihavend', name: 'Nihavend Makamı - Rahatlık Melodisi', desc: 'Derin Dinlendirici Kanun & Ney Sentezi', src: '/nihavend.mp3' }
  ];

  const [currentTrack, setCurrentTrack] = useState(audioTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef(null);

  // Oynatma/Durdurma Kontrolü
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Ses dosyası yüklenemedi:", err));
    }
    setIsPlaying(!isPlaying);
  };

  // Makam Değiştirme Kontrolü
  const changeTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  };

  // Müzik çalarken ilerleme çubuğunu güncelleme
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  // Müzik bittiğinde otomatik durdurma veya başa sarma
  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  // Şarkı çalarken makam değişirse otomatik oynat
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrack]);

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const goldenQuestions = [
    { id: 1, title: "İlacı nasıl hazırlayacağım?", desc: "Özellikle toz halindeki süspansiyon ilaçlar veya şurupların sulandırılma oranları, steril su kullanımı ve çalkalama süreleri hayati önem taşır. Yanlış hazırlanan ilaçlar etkinliğini kaybedebilir veya eksik doz alınmasına sebep olur." },
    { id: 2, title: "İlacı nasıl kullanacağım?", desc: "Aç karnına mı, tok karnına mı alınacak? Çiğnenerek mi yutulacak, doğrudan suyla mı? Bazı hapların bölünerek içilmesi koruyucu kaplamasını bozarak mideye zarar verebilir veya bağırsaktaki emilimi engelleyebilir. Doğru uygulama şifanın ilk şartıdır." },
    { id: 3, title: "İlacı günün hangi saatlerinde ve kaç kez kullanacağım?", desc: '"Günde 3 defa" ifadesi rastgele sabah-öğle-akşam demek değildir; kanda ilaç düzeyinin sabit kalabilmesi için tam 8 saatte bir (24 saat / 3) alınması gerekir. Saat düzenine milimetrik sadakat, bakterilerin veya hastalığın boşluk bulmasını engeller.' },
    { id: 4, title: "İlaç tedavim kaç gün sürecek?", desc: "Kendinizi iyi hissettiğiniz an ilacı bırakmak en büyük hatalardan biridir. Özellikle antibiyotiklerde, vücutta kalan dirençli az sayıdaki mikroorganizma tedavinin yarıda kesilmesiyle çoğalarak hastalığın çok daha şiddetli nüksetmesine neden olur." },
    { id: 5, title: "İlacı kullanırken kaçınmam gereken yiyecek ve içecekler var mı?", desc: "Bazı besinler ilaçlarla etkileşime girer. Örneğin greyfurt suyu birçok ilacın karaciğerde yıkımını engelleyebilir; bu durum kanda aşırı birikmeye ve ciddi zehirlenmelere yol açabilir. Süt ürünleri ise bazı antibiyotiklerin emilimini tamamen durdurabilir." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased overflow-x-hidden font-sans">
      
      {/* GİZLİ HTML5 AUDIO ETİKETİ (Arka Planda Sesi Çalan Motor) */}
      <audio 
        ref={audioRef} 
        src={currentTrack.src} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
      />

      {/* MENÜ ALANI */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-teal-600 text-white p-2 rounded-xl shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-teal-950 to-teal-700 bg-clip-text text-transparent">Bilinçli Doz</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#vizyon" className="hover:text-teal-600 transition">Vizyonumuz</a>
              <a href="#altin-sorular" className="hover:text-teal-600 transition">5 Altın Soru</a>
              <a href="#qr-rehber" className="hover:text-teal-600 transition">QR Kod Sistemi</a>
              <a href="#sifahane" className="hover:text-teal-600 transition">Dijital Şifahane</a>
            </div>
            <div>
              <span className="hidden sm:inline-block text-xs font-semibold bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full border border-teal-100">Sosyal Sorumluluk Hareketi</span>
            </div>
          </div>
        </div>
      </nav>

      {/* GİRİŞ (HERO) BÖLÜMÜ */}
      <header id="vizyon" className="relative bg-gradient-to-br from-teal-950 via-teal-900 to-emerald-950 text-white py-24 px-4 text-center overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
            🌱 Akılcı İlaç & Bütünsel Sağlık Hareketi
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Bilinçli Doz ve <br/>
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent italic font-serif font-normal">Dijital Şifahane</span>
          </h1>
          <p className="text-base sm:text-lg text-teal-100/80 max-w-2xl mx-auto leading-relaxed">
            Giderek artan bilinçsiz ilaç kullanımının yıkıcı etkilerine dikkat çekiyoruz. Modern tıbbın rasyonel ilkelerini, Türk-İslam medeniyetinin ruhu ve bedeni bütünleştiren kadim darüşşifa kültürüyle harmanlıyoruz.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a href="#altin-sorular" className="bg-emerald-500 hover:bg-emerald-400 text-teal-950 font-bold px-8 py-3.5 rounded-xl shadow-lg transition text-sm">
              5 Altın Soru'yu Keşfet
            </a>
            <a href="#sifahane" className="bg-white/5 hover:bg-white/10 text-white border border-white/20 font-medium px-8 py-3.5 rounded-xl transition text-sm">
              Müzik Terapisini Dinle
            </a>
          </div>
        </div>
      </header>

      {/* TEHLİKE VE FARKINDALIK KARTLARI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-rose-50 flex flex-col justify-between">
            <div>
              <div className="bg-rose-50 text-rose-600 h-12 w-12 rounded-xl flex items-center justify-center mb-6 text-xl">⚠️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Antibiyotik Direnci</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gereksiz ve yarım bırakılan antibiyotik kullanımı, bakterilerin direnç kazanmasına neden olarak en basit enfeksiyonları bile gelecekte ölümcül hale getiriyor.
              </p>
            </div>
            <div className="mt-6 pt-4 text-xs font-semibold text-rose-600 bg-rose-50 py-2 px-3 rounded-lg w-fit">Kritik Küresel Tehdit</div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border border-amber-50 flex flex-col justify-between">
            <div>
              <div className="bg-amber-50 text-amber-600 h-12 w-12 rounded-xl flex items-center justify-center mb-6 text-xl">💊</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Organ Tahribatı</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                En ufak bir fiziksel veya ruhsal gerilimde hemen kimyasal ağrı kesicilere sarılmak, karaciğer ve böbreklerimizde geri dönüşsüz hasarlar bırakıyor.
              </p>
            </div>
            <div className="mt-6 pt-4 text-xs font-semibold text-amber-600 bg-amber-50 py-2 px-3 rounded-lg w-fit">Psikosomatik Yükler</div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl border border-teal-50 flex flex-col justify-between">
            <div>
              <div className="bg-teal-50 text-teal-600 h-12 w-12 rounded-xl flex items-center justify-center mb-6 text-xl">📉</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Milli Ekonomik İsraf</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Evlerde bilinçsizce biriktirilen, kullanılmayan ve tarihi geçerek çöpe atılan atıl ilaçlar her yıl milyonlarca dolarlık milli servet kaybına yol açıyor.
              </p>
            </div>
            <div className="mt-6 pt-4 text-xs font-semibold text-teal-600 bg-teal-50 py-2 px-3 rounded-lg w-fit">Maddi & Ekolojik Kayıp</div>
          </div>
        </div>
      </section>

      {/* İNTERAKTİF 5 ALTIN SORU */}
      <section id="altin-sorular" className="py-24 max-w-5xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-md">Akılcı İlaç Danışmanlığı</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">İlaç Kullanırken "5 Altın Soru"</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            Sağlığınızı korumak adına, doktorunuzdan veya eczacınızdan ilaçlarınızı teslim alırken bu 5 temel sorunun cevabını mutlaka öğrenin.
          </p>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {goldenQuestions.map((q) => (
            <div key={q.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition">
              <button 
                onClick={() => toggleAccordion(q.id)} 
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 hover:bg-slate-50 transition"
              >
                <span className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="h-7 w-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0">{q.id}</span>
                  {q.title}
                </span>
                <svg 
                  className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${activeAccordion === q.id ? 'rotate-180' : ''}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className="transition-all duration-300 overflow-hidden" 
                style={{ maxHeight: activeAccordion === q.id ? '200px' : '0px' }}
              >
                <p className="p-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {q.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QR KOD REHBERİ VE SİMÜLATÖR */}
      <section id="qr-rehber" className="bg-teal-900 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase">Teknoloji Entegrasyonu</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">İlaç Kutularındaki QR Kodlar ve Saklama Isısı</h2>
            <p className="text-teal-100/80 leading-relaxed text-sm sm:text-base">
              İlaç kutularının üzerinde yer alan karekodlar (İlaç Takip Sistemi - ITS), ilacın sadece sahte olup olmadığını denetlemez; aynı zamanda o ilacın dijital kimlik kartıdır.
            </p>
            <div className="bg-teal-950/40 p-5 rounded-xl border border-teal-800 space-y-3">
              <h4 className="font-bold text-emerald-400 flex items-center gap-2 text-sm sm:text-base">❄️ Soğuk Zincir ve Saklama Dereceleri</h4>
              <p className="text-xs sm:text-sm text-teal-200/90 leading-relaxed">
                Çoğu ilaç 15-25°C arasındaki oda sıcaklığında saklanırken, bazı biyolojik ürünler, insülinler og aşılar 2-8°C buzdolabı ortamı (soğuk zincir) gerektirir. Uygun sıcaklıkta tutulmayan ilaçların kimyasal yapısı bozularak şifa yerine toksik maddelere dönüşebilir.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-white text-slate-900 p-8 rounded-3xl shadow-2xl max-w-sm w-full border-4 border-teal-950 text-center space-y-4">
              <div className="mx-auto bg-slate-100 p-6 rounded-2xl w-fit relative">
                <svg className="w-24 h-24 text-teal-950" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2V15H5zm13 1h1v1h-1v-1zm-2-2h2v2h-2v-2zm2-2h1v2h-1v-2zm-2 0h1v1h-1V11zm4 4h1v3h-1v-3zm-2 2h1v2h-2v-2zm-2-2h1v1h-1v-1zm4-4h2v2h-2v-2zm0 4h1v1h-1v-1z"/>
                </svg>
                <div className="absolute inset-0 border-2 border-emerald-500 rounded-2xl animate-pulse m-4"></div>
              </div>
              <h4 className="font-bold text-lg">Karekod Bilgi Sistemi</h4>
              <p className="text-xs text-slate-500">Aşağıdaki butona tıklayarak bir ilaç kutusu üzerindeki QR kodun simülasyon çıktısını test edin.</p>
              
              <button 
                onClick={() => setQrScanned(true)} 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition tracking-wide shadow-md"
              >
                📸 KAREKODU SİMÜLE ET
              </button>

              {qrScanned && (
                <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-left space-y-2 animate-fade-in">
                  <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                    <span>Durum: Bakanlık Onaylı</span>
                    <span className="text-emerald-600">✓</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">Parasetamol 500 mg Tablet</div>
                  <div className="text-[11px] text-slate-600 space-y-1 border-t border-emerald-200/50 pt-2 mt-1">
                    <div><strong>Maksimum Isı:</strong> 25°C (Oda Sıcaklığı)</div>
                    <div><strong>Nem Koşulu:</strong> Kuru, Kutusunda og Işıksız Ortam</div>
                    <div className="text-rose-600 font-semibold mt-1">⚠ Buzdolabına koymayınız, dondurmayınız.</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DİJİTAL ŞİFAHANE VE MÜZİK TERAPİ */}
      <section id="sifahane" className="py-24 max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-stone-100 rounded-3xl p-8 md:p-16 border border-amber-200/50 grid md:grid-cols-5 gap-12 items-center relative overflow-hidden">
          
          <div className="md:col-span-3 space-y-6">
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Kültürel Miras & Ruhsal Arınma</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-950 font-serif">Kadim Darüşşifalar og Müzik Terapisi</h2>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              Projemiz, her psikolojik gerginlikte, uykusuzlukta veya strese bağlı baş ağrısında hemen ağır kimyasallara sığınmak yerine insanı ruh og beden bütünlüğüyle ele alır.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              Ecdadımız, Selçuklu og Osmanlı darüşşifalarında hastaları su sesi ve özel müzik makamlarıyla tedavi ediyordu. Büyük İslam hekim og düşünürleri İbn Sina ve Farabi, hangi makamın günün hangi saatinde zihne ve fıtrata iyi geldiğini bilimsel olarak tasnif etmişlerdi.
            </p>
            
            {/* İnteraktif Makam Seçim Kartları */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <button 
                onClick={() => changeTrack(audioTracks[0])}
                className={`p-4 rounded-xl border text-left transition ${currentTrack.id === 'rast' ? 'bg-amber-600/10 border-amber-600 shadow-md' : 'bg-white/80 border-amber-200/40 hover:bg-amber-50'}`}
              >
                <div className="font-bold text-amber-900 text-xs sm:text-sm flex items-center justify-between">
                  <span>Rast Makamı</span>
                  {currentTrack.id === 'rast' && <span className="text-amber-600">● Seçili</span>}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">İnsana neşe, sefa ve iç huzuru verir; kemik sistemine iyi gelir.</div>
              </button>
              
              <button 
                onClick={() => changeTrack(audioTracks[1])}
                className={`p-4 rounded-xl border text-left transition ${currentTrack.id === 'nihavend' ? 'bg-amber-600/10 border-amber-600 shadow-md' : 'bg-white/80 border-amber-200/40 hover:bg-amber-50'}`}
              >
                <div className="font-bold text-amber-900 text-xs sm:text-sm flex items-center justify-between">
                  <span>Nihavend Makamı</span>
                  {currentTrack.id === 'nihavend' && <span className="text-amber-600">● Seçili</span>}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Kan dolaşımını sakinleştirir, zihni derin düşüncelerden arındırır.</div>
              </button>
            </div>
          </div>

          {/* GERÇEK SES OYNATICI PANELİ */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-xl border border-amber-200/30 space-y-4">
            <div className="text-center font-bold text-sm text-amber-950 uppercase tracking-wider pb-2 border-b border-slate-100">
              Şifahane Ses Oynatıcı
            </div>
            <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl">
              <button 
                onClick={togglePlay} 
                className="h-12 w-12 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center transition shrink-0 shadow-md text-lg"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <div className="w-full">
                <div className={`text-xs font-bold transition-colors ${isPlaying ? 'text-amber-600 animate-pulse' : 'text-slate-900'}`}>
                  {currentTrack.name}
                </div>
                <div className="text-[10px] text-slate-500">{currentTrack.desc}</div>
                
                {/* Dinamik İlerleme Çubuğu */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-600 h-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 italic text-center leading-normal">
              *Müzik seçimi yaptıktan sonra oynat butonuna basın. Gerçek makam melodileri zihinsel dinginlik sağlayarak stres kaynaklı psikosomatik ilaç ihtiyacını azaltmayı hedefler.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 border-t border-slate-800 text-center text-xs">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-bold text-slate-300 text-sm">Bilinçli Doz - Akılcı İlaç Kullanımı Sosyal Sorumluluk Projesi</p>
          <p className="max-w-xl mx-auto text-slate-500 leading-relaxed">
            Bu web sitesi, toplum sağlığını tehdit eden gereksiz ilaç tüketimine karşı toplumsal bilinç oluşturmak amacıyla hazırlanmış bir mezuniyet ödevi çalışmasıdır.
          </p>
          <div className="pt-4 text-slate-600 border-t border-slate-800">
            &copy; 2026 Bilinçli Doz ve Dijital Şifahane Hareketi. Tüm Hakları Saklıdır.
          </div>
        </div>
      </footer>

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Search, Home, Book, AlertCircle, Phone, Menu, X } from 'lucide-react';

export default function IlacSitesi() {
  useEffect(() => {
    document.title = "Bilinçli Doz - Akılcı İlaç Kullanımı";
  }, []);

  const [page, setPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const altinSorular = [
    {
      soru: "Bu ilaç bana neden verildi?",
      aciklama: "İlacın tedavi ettiği hastalığı ve neden size gerekli olduğunu doktorunuzdan öğrenin."
    },
    {
      soru: "Bu ilaçtan nasıl yararlanırım?",
      aciklama: "Doğru dozda, doğru zamanda, doğru şekilde almak önemlidir. Talimatları dikkatle okuyun."
    },
    {
      soru: "Bu ilacın yan etkileri nelerdir?",
      aciklama: "Olası yan etkileri bilin. Ağır yan etkiler görürseniz hemen doktorunuzu arayın."
    },
    {
      soru: "Bu ilaç diğer ilaçlarla etkileşime girerse ne olur?",
      aciklama: "Aldığınız diğer ilaçlar, takviyeler ve besinler hakkında doktorunuzu bilgilendirin."
    },
    {
      soru: "Bu ilaçtan güvenli midir?",
      aciklama: "Reçete talimatlarına uyun. Dosyahınızı izleyin ve düzenli doktor kontrolleri yaptırın."
    }
  ];

  const ilaclarOrnek = [
    {
      ad: "Lisinopril",
      kategori: "Tansiyon İlacı",
      yanEtkiler: "Baş dönmesi, kuru öksürük, yorgunluk",
      kullanim: "Günde 1 defa, sabahları yemek ile birlikte alınız"
    },
    {
      ad: "Metformin",
      kategori: "Diyabet İlacı",
      yanEtkiler: "Mide bulantısı, iştahsızlık, midede rahatsızlık",
      kullanim: "Günde 2-3 kez, yemeklerle birlikte alınız"
    },
    {
      ad: "Atorvastatin",
      kategori: "Kolesterol İlacı",
      yanEtkiler: "Kas ağrıları, baş ağrısı, sindirim sorunları",
      kullanim: "Günde 1 defa, akşamları alınız"
    },
    {
      ad: "Amlodipine",
      kategori: "Tansiyon İlacı",
      yanEtkiler: "Düşük tansiyon, baş dönmesi, ayak şişmesi",
      kullanim: "Günde 1 defa, sabahları alınız"
    },
    {
      ad: "Levothyroxine",
      kategori: "Tiroid İlacı",
      yanEtkiler: "Kalp çarpıntısı, tremor, uyku sorunları",
      kullanim: "Sabahları, aç karnına, su ile birlikte alınız"
    }
  ];

  const filtredilmisIlaclar = ilaclarOrnek.filter(ilac =>
    ilac.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ilac.kategori.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const kullanimRehberi = [
    {
      baslik: "İlaçlarınızı Organize Edin",
      adim: "Haftaya göre hazırlanan ilaç kutuları kullanın. Her kutuya gün ve saat yazılı etiketler yapıştırın."
    },
    {
      baslik: "Alındı Listesi Tutun",
      adim: "Aldığınız her ilacı bir kağıda yazın. Doktor kontrolleri için bu listeyi yanınızda taşıyın."
    },
    {
      baslik: "Saatini Ayarla",
      adim: "Telefonda ya da saatte alarm kurun. Her ilaç zamanında hatırlanacak."
    },
    {
      baslik: "Birlikte Almayın",
      adim: "Bazı ilaçlar birlikte alındığında etkisini kaybeder. Doktorunuza sorun hangileri ayrı alınmalı."
    },
    {
      baslik: "Yan Etkiler Hakkında",
      adim: "İlaçlarınızın yan etkilerini bilin. Ağır yan etki görürseniz hemen doktorunuzu arayın."
    }
  ];

  const MenuComponent = () => (
    <nav className="bg-blue-700 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">💊 Bilinçli Doz</h1>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        <div className={`${menuOpen ? 'block' : 'hidden'} lg:flex gap-4 flex-wrap lg:flex-nowrap`}>
          <button
            onClick={() => { setPage('home'); setMenuOpen(false); }}
            className={`px-6 py-2 rounded-lg text-lg font-semibold transition ${page === 'home' ? 'bg-white text-blue-700' : 'bg-blue-600 hover:bg-blue-500'}`}
          >
            <Home className="inline mr-2" size={20} /> Ana Sayfa
          </button>
          <button
            onClick={() => { setPage('sorular'); setMenuOpen(false); }}
            className={`px-6 py-2 rounded-lg text-lg font-semibold transition ${page === 'sorular' ? 'bg-white text-blue-700' : 'bg-blue-600 hover:bg-blue-500'}`}
          >
            ❓ 5 Altın Soru
          </button>
          <button
            onClick={() => { setPage('ilac'); setMenuOpen(false); }}
            className={`px-6 py-2 rounded-lg text-lg font-semibold transition ${page === 'ilac' ? 'bg-white text-blue-700' : 'bg-blue-600 hover:bg-blue-500'}`}
          >
            <Search className="inline mr-2" size={20} /> İlaç Arama
          </button>
          <button
            onClick={() => { setPage('yan'); setMenuOpen(false); }}
            className={`px-6 py-2 rounded-lg text-lg font-semibold transition ${page === 'yan' ? 'bg-white text-blue-700' : 'bg-blue-600 hover:bg-blue-500'}`}
          >
            <AlertCircle className="inline mr-2" size={20} /> Yan Etkiler
          </button>
          <button
            onClick={() => { setPage('rehber'); setMenuOpen(false); }}
            className={`px-6 py-2 rounded-lg text-lg font-semibold transition ${page === 'rehber' ? 'bg-white text-blue-700' : 'bg-blue-600 hover:bg-blue-500'}`}
          >
            <Book className="inline mr-2" size={20} /> Rehber
          </button>
        </div>
      </div>
    </nav>
  );

  const AnaSayfa = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8 mb-8 border-2 border-blue-200">
        <h2 className="text-4xl font-bold text-blue-800 mb-4">Hoş Geldiniz!</h2>
        <p className="text-xl text-gray-700 mb-4">
          Bilinçli Doz, akılcı ilaç kullanımı konusunda bilgi ve rehberlik sunan bir platformdur.
        </p>
        <p className="text-lg text-gray-600">
          QR kodunuzu tarayarak bu sayfaya ulaştınız. İlaçlarınızı doğru kullanmak için gerekli bilgiler burada bulunmaktadır.
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
        <h3 className="text-2xl font-bold text-yellow-800 mb-4">⚠️ ÖNEMLİ</h3>
        <p className="text-lg text-yellow-900">
          Bu sitedeki bilgiler eğitim amaçlıdır. Herhangi bir tıbbi karar almadan önce lütfen doktorunuza danışın.
        </p>
      </div>

      <h3 className="text-3xl font-bold text-blue-800 mb-6 text-center">5 ALTIN SORU</h3>
      <p className="text-xl text-center text-gray-600 mb-8">
        Her ilaç aldığınızda bu 5 soruyu kendinize sorun:
      </p>

      <div className="grid gap-6">
        {altinSorular.map((item, idx) => (
          <div key={idx} className="bg-white border-2 border-blue-300 rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                {idx + 1}
              </div>
              <div>
                <h4 className="text-2xl font-bold text-blue-800 mb-2">{item.soru}</h4>
                <p className="text-lg text-gray-700">{item.aciklama}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SorularSayfasi = () => (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-blue-800 mb-8">5 ALTIN SORU</h2>
      <p className="text-xl text-gray-600 mb-8 bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
        Aldığınız her ilacı kullanmadan önce bu soruların cevaplarını doktorunuzdan veya eczacınızdan öğrenin.
      </p>

      <div className="space-y-6">
        {altinSorular.map((item, idx) => (
          <div key={idx} className="bg-gradient-to-r from-blue-50 to-white border-2 border-blue-300 rounded-lg p-8">
            <div className="flex gap-4 mb-4">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 text-2xl font-bold">
                {idx + 1}
              </div>
              <h3 className="text-3xl font-bold text-blue-800 flex items-center">{item.soru}</h3>
            </div>
            <div className="ml-20">
              <p className="text-xl text-gray-700 leading-relaxed">{item.aciklama}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-green-50 border-2 border-green-300 rounded-lg p-8 mt-8">
        <h3 className="text-2xl font-bold text-green-800 mb-4">💡 İPUÇU</h3>
        <p className="text-lg text-green-900">
          Bu soruların cevaplarını bir kağıda yazın ve her doktor ziyaretinde yanınıza alın. 
          Böylece hiçbir şey unutmayacaksınız.
        </p>
      </div>
    </div>
  );

  const IlacArama = () => (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-blue-800 mb-8">İLAÇ ARAMA</h2>
      
      <div className="mb-8">
        <input
          type="text"
          placeholder="İlaç adı veya türü yazın..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-4 text-xl border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600"
        />
      </div>

      {filtredilmisIlaclar.length > 0 ? (
        <div className="space-y-6">
          {filtredilmisIlaclar.map((ilac, idx) => (
            <div key={idx} className="bg-white border-2 border-gray-300 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-3xl font-bold text-blue-700 mb-3">{ilac.ad}</h3>
              <div className="mb-4 p-3 bg-blue-100 rounded-lg border-l-4 border-blue-600">
                <p className="text-lg font-semibold text-blue-800">{ilac.kategori}</p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold text-gray-700 mb-2">Kullanım:</p>
                <p className="text-xl text-gray-600 bg-gray-50 p-4 rounded-lg">{ilac.kullanim}</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-red-700 mb-2">⚠️ Olası Yan Etkiler:</p>
                <p className="text-xl text-gray-600 bg-red-50 p-4 rounded-lg border-l-4 border-red-400">{ilac.yanEtkiler}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-8 text-center">
          <p className="text-2xl text-yellow-800">Aradığınız ilaç bulunamadı.</p>
          <p className="text-lg text-yellow-700 mt-2">Lütfen ilaç adını doğru yazın veya doktorunuza danışın.</p>
        </div>
      )}
    </div>
  );

  const YanEtkiler = () => (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-red-700 mb-8">⚠️ YAN ETKİLER VE UYARILAR</h2>

      <div className="bg-red-50 border-2 border-red-400 rounded-lg p-8 mb-8">
        <h3 className="text-2xl font-bold text-red-800 mb-4">ACIL DURUMDA NE YAPMALI?</h3>
        <p className="text-xl text-red-900 mb-4">
          Aşağıdaki durumları yaşarsanız hemen doktor arayın veya hastaneye gidin:
        </p>
        <ul className="text-lg text-red-900 space-y-3 ml-6">
          <li>• Nefes almakta zorlanma</li>
          <li>• Göğüste şiddetli ağrı</li>
          <li>• Ciddi alerjik reaksiyonlar (şişme, çıban)</li>
          <li>• Şiddetli başdönmesi ve bilinç kaybı</li>
          <li>• Gaita veya idrada kan</li>
          <li>• Şiddetli kas ağrıları</li>
        </ul>
      </div>

      <div className="space-y-6">
        <div className="bg-white border-2 border-yellow-400 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-yellow-700 mb-4">🚫 Sık Görülen Yan Etkiler</h3>
          <p className="text-lg text-gray-700 mb-4">
            Çoğu ilacın hafif yan etkileri olabilir. İlk birkaç gün içinde genellikle geçer.
          </p>
          <ul className="text-lg text-gray-700 space-y-2 ml-6">
            <li>• Mide bulantısı</li>
            <li>• Baş ağrısı</li>
            <li>• Uyku sorunları</li>
            <li>• Dönem ağrısı</li>
          </ul>
        </div>

        <div className="bg-white border-2 border-orange-400 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-orange-700 mb-4">⚠️ Dikkat Edilmesi Gereken Yan Etkiler</h3>
          <p className="text-lg text-gray-700 mb-4">
            Bu yan etkileri yaşarsanız doktorunuzu bilgilendirin:
          </p>
          <ul className="text-lg text-gray-700 space-y-2 ml-6">
            <li>• Kalp çarpıntısı</li>
            <li>• Ciddi ishal veya kabızlık</li>
            <li>• Cilt döküntüsü</li>
            <li>• Görme sorunları</li>
            <li>• İştahsızlık</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const Rehber = () => (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-green-800 mb-8">📖 KULLANIM REHBERİ</h2>

      <p className="text-xl text-gray-700 bg-green-50 p-6 rounded-lg border-2 border-green-300 mb-8">
        İlaçlarınızı doğru kullanmak, tedavinin başarısının en önemli kısmıdır. 
        Aşağıdaki adımları takip ederek ilaçlarınızı en etkili şekilde kullanabilirsiniz.
      </p>

      <div className="space-y-6">
        {kullanimRehberi.map((item, idx) => (
          <div key={idx} className="bg-white border-2 border-green-300 rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex items-start gap-4">
              <div className="bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0 text-2xl font-bold">
                {idx + 1}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-800 mb-3">{item.baslik}</h3>
                <p className="text-lg text-gray-700">{item.adim}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-8 mt-8">
        <h3 className="text-2xl font-bold text-blue-800 mb-4">💊 İLAÇ ALMADA İPUÇLARI</h3>
        <ul className="text-lg text-blue-900 space-y-3 ml-6">
          <li>• İlaçları belli saatlerde almaya alışkanlık yapın</li>
          <li>• Bazı ilaçlar yemek ile birlikte alınmalıdır</li>
          <li>• Çok sıcak su ile ilaç almayın</li>
          <li>• İlaçları asla kendiniz değiştirmeyin</li>
          <li>• İlaçlarınızı serin ve kuru yerde tutun</li>
          <li>• Süre dolduktan sonra eski ilaçları kullanmayın</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <MenuComponent />
      
      {page === 'home' && <AnaSayfa />}
      {page === 'sorular' && <SorularSayfasi />}
      {page === 'ilac' && <IlacArama />}
      {page === 'yan' && <YanEtkiler />}
      {page === 'rehber' && <Rehber />}

      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-2">Dijital Şifahane - Bilinçli Doz</h3>
          <p className="text-lg mb-4">Akılcı İlaç Kullanımı İçin Bilgi Platformu</p>
          <p className="text-sm opacity-80">
            Bu site sadece eğitim amaçlıdır. Tıbbi danışmanız doktor ve eczacılarınız olmalıdır.
          </p>
          <p className="text-sm mt-4 opacity-70">
            ☎️ Acil Durumda: 112 • Zehir Danışma Merkezi: 0 312 312 20 20
          </p>
        </div>
      </footer>
    </div>
  );
}

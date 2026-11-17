import { useState } from 'react';
import {
  MapPin,
  ArrowRight,
  Check,
  X,
  Menu,
  MessageSquare,
  Download,
  FileText,
  ShoppingBag,
  Search
} from 'lucide-react';

/**
 * ============================================================================
 * PITHU PROYEKTOR — SHOPEE MARKETPLACE STYLE & WHATSAPP DIRECT BOOKING
 * ============================================================================
 */
const PITHU_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  
  * { box-sizing: border-box; }
  body {
    font-family: 'Inter', sans-serif;
    background-color: #F5F5F5;
    color: #222222;
    margin: 0;
    padding: 0;
  }
  .shopee-orange {
    background-color: #EE4D2D;
    color: #FFFFFF;
  }
  .shopee-orange-hover:hover {
    background-color: #D73211;
  }
  .shopee-badge {
    background-color: #FFF1EE;
    color: #EE4D2D;
    border: 1px solid rgba(238, 77, 45, 0.2);
  }
  .shopee-card {
    background: #FFFFFF;
    border: 1px solid #E8E8E8;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    transition: all 150ms ease;
  }
  .shopee-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
    border-color: #EE4D2D;
    transform: translateY(-1px);
  }
`;

const PRODUCTS = [
  {
    id: 'prod-2500',
    name: 'Epson 2500 Lumens',
    category: 'Proyektor Only',
    lumens: 2500,
    includes_screen: false,
    resolution: 'XGA (1024 x 768)',
    capacity: '15 - 35 Orang',
    desc: 'Cocok untuk rapat kantor, presentasi kelas, atau sidang skripsi.',
    price_6h: 85000,
    price_24h: 120000
  },
  {
    id: 'prod-2500-scr',
    name: 'Epson 2500 Lumens + Screen',
    category: 'Paket Hemat',
    lumens: 2500,
    includes_screen: true,
    screen: 'Layar Tripod 70 inch',
    resolution: 'XGA (1024 x 768)',
    capacity: '15 - 35 Orang',
    desc: 'Paket lengkap proyektor dan layar tripod siap pakai.',
    price_6h: 135000,
    price_24h: 180000
  },
  {
    id: 'prod-3000',
    name: 'Epson 3000 Lumens',
    category: 'Proyektor Only',
    lumens: 3000,
    includes_screen: false,
    resolution: 'WXGA (1280 x 800)',
    capacity: '35 - 75 Orang',
    desc: 'Tingkat kecerahan tinggi untuk ruang dengan lampu menyala.',
    price_6h: 135000,
    price_24h: 185000
  },
  {
    id: 'prod-3000-scr',
    name: 'Epson 3000 Lumens + Screen',
    category: 'Paket Favorit',
    lumens: 3000,
    includes_screen: true,
    screen: 'Layar Tripod 70/84 inch',
    resolution: 'WXGA (1280 x 800)',
    capacity: '35 - 75 Orang',
    desc: 'Pilihan utama instansi dan kampus untuk seminar menengah.',
    price_6h: 175000,
    price_24h: 250000
  },
  {
    id: 'prod-3500',
    name: 'Epson 3500 Lumens',
    category: 'Proyektor Only',
    lumens: 3500,
    includes_screen: false,
    resolution: 'WXGA / Full HD Support',
    capacity: '75 - 150 Orang',
    desc: 'Performa tinggi untuk aula atau ruangan besar.',
    price_6h: 220000,
    price_24h: 270000
  },
  {
    id: 'prod-3500-scr',
    name: 'Epson 3500 Lumens + Screen',
    category: 'Paket Seminar',
    lumens: 3500,
    includes_screen: true,
    screen: 'Layar Tripod 84 inch',
    resolution: 'WXGA / Full HD Support',
    capacity: '75 - 150 Orang',
    desc: 'Paket lengkap seminar nasional dan acara korporat.',
    price_6h: 275000,
    price_24h: 325000
  },
  {
    id: 'prod-4500',
    name: 'ViewSonic 4500 Lumens',
    category: 'High Brightness',
    lumens: 4500,
    includes_screen: false,
    resolution: 'Full HD WUXGA',
    capacity: '150 - 300 Orang',
    desc: 'Khusus sewa 24 jam untuk ballroom hotel & pameran.',
    price_6h: null,
    price_24h: 430000
  },
  {
    id: 'prod-5000',
    name: 'ViewSonic 5000 Lumens',
    category: 'Flagship Series',
    lumens: 5000,
    includes_screen: false,
    resolution: 'Full HD WUXGA',
    capacity: '300 - 500+ Orang',
    desc: 'Daya pancar ekstrem untuk panggung utama & auditorium besar.',
    price_6h: null,
    price_24h: 500000
  }
];

const ACCESSORIES = [
  { name: 'Standing Proyektor', price: 30000, note: '24 Jam' },
  { name: 'Layar Tripod', price: 85000, note: 'Standar' },
  { name: 'Dongle', price: 15000, note: 'Standar' },
  { name: 'Standing Dinding Proyektor', price: 30000, note: 'Standar' },
  { name: 'Layar Besar 2×3M', price: 250000, note: 'Standar' },
  { name: 'Layar Besar 3×4M', price: 350000, note: 'Standar' },
  { name: 'Kabel HDMI 10M', price: 25000, note: 'Standar' },
  { name: 'Kabel HDMI 20M', price: 35000, note: 'Standar' },
  { name: 'Kabel HDMI 50M', price: 60000, note: 'Standar' },
  { name: 'Spliter', price: 30000, note: 'Standar' }
];

interface BookingFormState {
  product_name: string;
  duration: string;
  date: string;
  time: string;
  name: string;
  institution: string;
  whatsapp: string;
  address: string;
  notes: string;
  selectedAccessories: string[];
}

interface InvoiceData extends BookingFormState {
  invoiceNo: string;
  bookingNo: string;
  totalPrice: number;
  createdAt: string;
}

export default function App() {
  const [page, setPage] = useState('beranda');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[1]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingFormState>({
    product_name: PRODUCTS[1].name,
    duration: '24 Jam',
    date: '',
    time: '09:00',
    name: '',
    institution: '',
    whatsapp: '',
    address: '',
    notes: '',
    selectedAccessories: []
  });

  const [generatedInvoiceData, setGeneratedInvoiceData] = useState<InvoiceData | null>(null);

  const openBookingModal = (prod: (typeof PRODUCTS)[0]) => {
    setBookingForm((prev) => ({ 
      ...prev, 
      product_name: prod.name,
      selectedAccessories: [] 
    }));
    setGeneratedInvoiceData(null);
    setIsModalOpen(true);
  };

  const getProductPrice = (prodName: string, duration: string) => {
    const p = PRODUCTS.find(item => item.name === prodName);
    if (!p) return 150000;
    if (duration === '6 Jam' && p.price_6h) return p.price_6h;
    return p.price_24h;
  };

  const handleAccessoryToggle = (accName: string) => {
    setBookingForm((prev) => {
      const exists = prev.selectedAccessories.includes(accName);
      if (exists) {
        return { ...prev, selectedAccessories: prev.selectedAccessories.filter(item => item !== accName) };
      } else {
        return { ...prev, selectedAccessories: [...prev.selectedAccessories, accName] };
      }
    });
  };

  const calculateTotal = () => {
    const base = getProductPrice(bookingForm.product_name, bookingForm.duration);
    const accTotal = bookingForm.selectedAccessories.reduce((sum, accName) => {
      const found = ACCESSORIES.find(a => a.name === accName);
      return sum + (found ? found.price : 0);
    }, 0);
    return base + accTotal;
  };

  const handleProcessBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const totalPrice = calculateTotal();
    const invoiceNo = 'INV-PTH-' + Math.floor(100000 + Math.random() * 900000);
    const bookingNo = 'BKG-' + Math.floor(10000 + Math.random() * 90000);

    const data: InvoiceData = {
      ...bookingForm,
      invoiceNo,
      bookingNo,
      totalPrice,
      createdAt: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
    };

    setGeneratedInvoiceData(data);
  };

  const downloadInvoiceJPG = () => {
    if (!generatedInvoiceData) return;
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 1080, 1350);

    ctx.fillStyle = '#EE4D2D';
    ctx.fillRect(0, 0, 1080, 220);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px "Inter", sans-serif';
    ctx.fillText('PITHU PROYEKTOR', 60, 80);

    ctx.font = '20px "Inter", sans-serif';
    ctx.fillText('Your Event. Our Visual Solution.', 60, 120);
    ctx.fillText('Surabaya, Jawa Timur | Telp/WA: 0895340439050', 60, 160);

    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(60, 260, 960, 150);
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 260, 960, 150);

    ctx.fillStyle = '#EE4D2D';
    ctx.font = 'bold 24px "Inter", sans-serif';
    ctx.fillText('INVOICE RESMI PENYEWAAN', 100, 315);

    ctx.font = '18px "Inter", sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText(`No. Invoice : ${generatedInvoiceData.invoiceNo}`, 100, 360);
    ctx.fillText(`No. Booking : ${generatedInvoiceData.bookingNo}`, 560, 360);
    ctx.fillText(`Tanggal     : ${generatedInvoiceData.createdAt}`, 100, 395);

    ctx.fillStyle = '#EE4D2D';
    ctx.font = 'bold 22px "Inter", sans-serif';
    ctx.fillText('INFORMASI PELANGGAN', 60, 470);

    ctx.font = '18px "Inter", sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText(`Nama Pemesan : ${generatedInvoiceData.name}`, 60, 520);
    ctx.fillText(`Instansi/EO  : ${generatedInvoiceData.institution || '-'}`, 60, 560);
    ctx.fillText(`No. WhatsApp : ${generatedInvoiceData.whatsapp}`, 60, 600);
    ctx.fillText(`Alamat Acara : ${generatedInvoiceData.address}`, 60, 640);

    ctx.fillStyle = '#EE4D2D';
    ctx.font = 'bold 22px "Inter", sans-serif';
    ctx.fillText('RINCIAN PRODUK & PERALATAN', 60, 720);

    ctx.fillStyle = '#EE4D2D';
    ctx.fillRect(60, 750, 960, 45);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px "Inter", sans-serif';
    ctx.fillText('Deskripsi Item', 90, 780);
    ctx.fillText('Durasi', 600, 780);
    ctx.fillText('Subtotal', 820, 780);

    let yPos = 820;
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 16px "Inter", sans-serif';
    ctx.fillText(generatedInvoiceData.product_name, 90, yPos);
    ctx.font = '15px "Inter", sans-serif';
    ctx.fillText(generatedInvoiceData.duration, 600, yPos);
    const baseP = getProductPrice(generatedInvoiceData.product_name, generatedInvoiceData.duration);
    ctx.fillText(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(baseP), 820, yPos);
    yPos += 40;

    generatedInvoiceData.selectedAccessories.forEach((accName) => {
      const accObj = ACCESSORIES.find(a => a.name === accName);
      if (accObj) {
        ctx.fillStyle = '#334155';
        ctx.font = '15px "Inter", sans-serif';
        ctx.fillText(`+ ${accObj.name}`, 90, yPos);
        ctx.fillText('Unit', 600, yPos);
        ctx.fillText(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(accObj.price), 820, yPos);
        yPos += 35;
      }
    });

    ctx.fillStyle = '#FFF1EE';
    ctx.fillRect(60, 1030, 960, 90);
    ctx.fillStyle = '#EE4D2D';
    ctx.font = 'bold 20px "Inter", sans-serif';
    ctx.fillText('TOTAL PEMBAYARAN:', 90, 1085);
    ctx.font = 'bold 26px "Inter", sans-serif';
    ctx.fillText(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(generatedInvoiceData.totalPrice), 620, 1085);

    ctx.fillStyle = '#64748B';
    ctx.font = '16px "Inter", sans-serif';
    ctx.fillText('Terima kasih telah mempercayakan kebutuhan visual acara Anda pada Pithu Proyektor.', 60, 1220);
    ctx.fillText('Status: Menunggu Konfirmasi & Pembayaran DP oleh Admin.', 60, 1255);

    const link = document.createElement('a');
    link.download = `${generatedInvoiceData.invoiceNo}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();

    const adminPhone = '62895340439050';
    const accListText = generatedInvoiceData.selectedAccessories.length > 0 
      ? generatedInvoiceData.selectedAccessories.map(a => `\n   - ${a}`).join('') 
      : '\n   - Tidak ada';

    const message = `Halo Pithu Proyektor Surabaya, berikut pesanan saya:

*No. Invoice:* ${generatedInvoiceData.invoiceNo}
*No. Booking:* ${generatedInvoiceData.bookingNo}
- Produk: ${generatedInvoiceData.product_name} (${generatedInvoiceData.duration})
- Peralatan Tambahan:${accListText}
- Tanggal: ${generatedInvoiceData.date} (${generatedInvoiceData.time} WIB)
- Nama: ${generatedInvoiceData.name}
- Instansi: ${generatedInvoiceData.institution || '-'}
- WhatsApp: ${generatedInvoiceData.whatsapp}
- Alamat: ${generatedInvoiceData.address}
- *Total Pembayaran:* ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(generatedInvoiceData.totalPrice)}

Mohon konfirmasi pesanan ini. File Invoice JPG (1080x1350) telah saya unduh. Terima kasih!`;

    const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setIsModalOpen(false);
  };

  const formatIDR = (val: number | null | undefined) => {
    if (val === null || val === undefined) return 'Tidak Tersedia';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#222222] flex flex-col font-sans">
      <style dangerouslySetInnerHTML={{ __html: PITHU_CSS }} />

      {/* Shopee Top Utility Bar */}
      <div className="bg-[#EE4D2D] text-white text-[11px] py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>Tentang Pithu Proyektor Surabaya</span>
            <span>|</span>
            <span>Garansi Unit Prima & Siap Antar</span>
          </div>
          <div className="flex items-center gap-4 font-semibold">
            <span>📞 0895-3404-39050</span>
            <span>|</span>
            <span>💬 Live Chat WhatsApp</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <button onClick={() => setPage('beranda')} className="flex items-center gap-3 text-left">
            <div className="w-11 h-11 rounded-lg shopee-orange font-black text-xl flex items-center justify-center shadow">
              P
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 block leading-none">PITHU PROYEKTOR</span>
              <span className="text-[11px] font-bold text-[#EE4D2D] block mt-1">Acara Anda. Solusi Visual Kami.</span>
            </div>
          </button>

          {/* Search bar simulation ala Shopee */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="w-full flex rounded-lg border-2 border-[#EE4D2D] bg-white overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Cari proyektor, lumens, atau layar tripod..."
                className="w-full px-4 py-2 text-xs outline-none text-slate-800"
              />
              <button className="shopee-orange px-6 flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: 'beranda', label: 'Beranda & Katalog' },
              { id: 'katalog', label: 'Produk' },
              { id: 'harga', label: 'Daftar Harga' },
              { id: 'formulir', label: 'Formulir WhatsApp' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setPage(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                  page === item.id ? 'bg-[#EE4D2D] text-white shadow-sm' : 'text-slate-700 hover:bg-orange-50 hover:text-[#EE4D2D]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/62895340439050?text=Halo%20Pithu%20Proyektor,%20saya%20ingin%20bertanya%20seputar%20sewa%20proyektor."
              target="_blank"
              rel="noreferrer"
              className="shopee-orange shopee-orange-hover px-4 py-2.5 rounded-lg text-xs font-bold inline-flex items-center gap-2 shadow"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-slate-200 bg-white text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 shadow-lg">
            {[
              { id: 'beranda', label: 'Beranda & Katalog' },
              { id: 'katalog', label: 'Produk' },
              { id: 'harga', label: 'Daftar Harga' },
              { id: 'formulir', label: 'Formulir WhatsApp' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setPage(item.id);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold ${
                  page === item.id ? 'shopee-orange text-white' : 'bg-slate-50 text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1">
        {page === 'beranda' && (
          <div className="space-y-12 pb-20">
            {/* Shopee Style Banner / Hero Section */}
            <section className="bg-gradient-to-r from-[#EE4D2D] to-[#FF7337] text-white py-14 px-4 sm:px-6 lg:px-8 shadow-md">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
              <span className="inline-block px-3 py-1 rounded bg-white text-[#EE4D2D] font-extrabold text-[11px] uppercase tracking-wider shadow-sm">
                🔥 Pusat Sewa Proyektor #1 di Surabaya
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                <span className="text-white drop-shadow-sm">PITHU PROYEKTOR.</span><br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-white drop-shadow">
                  Acara Anda. Solusi Visual Kami.
                </span>
              </h1>
              <p className="text-orange-100 text-xs sm:text-sm leading-relaxed font-medium">
                    Sewa proyektor 2500 - 5000 Lumens lengkap dengan layar tripod & aksesoris. Cepat, terpercaya, dan siap diantar ke seluruh wilayah Surabaya & sekitarnya.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      onClick={() => openBookingModal(PRODUCTS[1])}
                      className="bg-white text-[#EE4D2D] hover:bg-orange-50 px-6 py-3 rounded-lg text-xs font-black inline-flex items-center gap-2 shadow-lg transition"
                    >
                      <span>Pesan Cepat via WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        const el = document.getElementById('semua-katalog');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-black/20 hover:bg-black/30 text-white font-bold px-6 py-3 rounded-lg text-xs transition border border-white/30"
                    >
                      Lihat Produk & Diskon
                    </button>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center p-2">
                  <div className="w-full h-80 rounded-2xl overflow-hidden shadow-2xl relative bg-white/5 border border-white/20 flex items-center justify-center">
                    <img
                      src="https://www.xclusiv-media.com/wp-content/uploads/2019/04/Sewa-LCD-Proyektor-Surabaya-768x576.jpg"
                      alt="Proyektor Demo"
                      className="w-full h-full object-cover opacity-90 hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                      <span className="text-white text-xs font-bold bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs">
                        ✨ Unit Epson & ViewSonic Siap Pakai
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Shopee Flash Sale / Mall Header Banner */}
            <section id="semua-katalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="bg-white border-l-4 border-[#EE4D2D] p-4 shadow-sm flex items-center justify-between rounded-r-lg">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-[#EE4D2D]" />
                  <div>
                    <h2 className="font-extrabold text-base text-slate-900">Katalog & Paket Sewa Proyektor</h2>
                    <p className="text-[11px] text-slate-500">Pilih durasi 6 Jam atau 24 Jam sesuai kebutuhan acara Anda.</p>
                  </div>
                </div>
                <span className="shopee-badge text-[11px] font-bold px-3 py-1 rounded">
                  ✨ Harga Resmi Surabaya
                </span>
              </div>

              {/* Product Grid - Shopee Style with Modern Card Redesign */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {PRODUCTS.map((prod) => (
                  <div key={prod.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#EE4D2D] transition-all duration-300 p-5 flex flex-col justify-between group">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="bg-orange-50 text-[#EE4D2D] border border-orange-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {prod.category}
                        </span>
                        <span className="text-xs font-black text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">{prod.lumens} Lumens</span>
                      </div>
                      <div>
                        <h3 className="font-black text-base text-slate-900 group-hover:text-[#EE4D2D] transition-colors">{prod.name}</h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{prod.desc}</p>
                      </div>
                      <div className="text-xs space-y-1 text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <p className="flex justify-between"><span>Resolusi:</span> <strong className="text-slate-800">{prod.resolution}</strong></p>
                        <p className="flex justify-between"><span>Kapasitas:</span> <strong className="text-slate-800">{prod.capacity}</strong></p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-5">
                      <div className="grid grid-cols-2 gap-2 text-center text-xs">
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                          <span className="text-[10px] text-slate-400 font-semibold block mb-0.5">Durasi 6 Jam</span>
                          <strong className="text-slate-900 text-xs font-bold">{formatIDR(prod.price_6h)}</strong>
                        </div>
                        <div className="p-2 rounded-lg bg-orange-50 border border-orange-200">
                          <span className="text-[10px] text-[#EE4D2D] font-extrabold block mb-0.5">Durasi 24 Jam</span>
                          <strong className="text-[#EE4D2D] text-xs font-black">{formatIDR(prod.price_24h)}</strong>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            setSelectedProduct(prod);
                            setPage('detail');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => openBookingModal(prod)}
                          className="shopee-orange shopee-orange-hover py-2.5 rounded-lg text-xs font-black shadow-sm transition"
                        >
                          Pesan
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Accessories Section */}
              <div className="pt-10 space-y-4">
                <div className="bg-white p-4 border-l-4 border-[#EE4D2D] rounded-r-lg shadow-sm">
                  <h3 className="font-extrabold text-sm text-slate-900">Peralatan Tambahan (Accessories)</h3>
                  <p className="text-[11px] text-slate-500">Lengkapi kebutuhan presentasi Anda dengan aksesoris tambahan berkualitas.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {ACCESSORIES.map((acc, idx) => (
                    <div key={idx} className="shopee-card p-3.5 flex flex-col justify-between space-y-2">
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">{acc.name}</span>
                        <span className="text-[10px] text-[#EE4D2D] block font-semibold">{acc.note}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                        <span className="text-[10px] text-slate-400">Harga</span>
                        <strong className="text-xs font-black text-[#EE4D2D]">{formatIDR(acc.price)}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lokasi / Google Maps Section */}
              <div className="pt-12 space-y-4">
                <div className="bg-white p-4 border-l-4 border-[#EE4D2D] rounded-r-lg shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">Lokasi & Titik Pick-up Pithu Proyektor</h3>
                    <p className="text-[11px] text-slate-500">Jemur Wonosari, Gg Sekolahan, No. 123, Surabaya</p>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/RZKCsAeMiSRpbsdb8?g_st=ac"
                    target="_blank"
                    rel="noreferrer"
                    className="shopee-orange px-4 py-2 rounded text-xs font-bold shadow flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Buka di Google Maps</span>
                  </a>
                </div>

                <div className="shopee-card overflow-hidden h-[450px] w-full relative">
                  <iframe
                    title="Pithu Proyektor Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.472718134701!2d112.7485329!3d-7.319598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbcd8c16d25b%3A0x66bb1dfbc23f11d6!2sJl.%20Jemur%20Wonosari%20Gg.%20Sekolahan%20No.123%2C%20Wonocolo%2C%20Surabaya%20City%2C%20East%20Java!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </section>
          </div>
        )}

        {page === 'katalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="bg-white p-4 border-l-4 border-[#EE4D2D] rounded-r-lg shadow-sm flex items-center justify-between">
              <div>
                <h1 className="font-black text-lg text-slate-900">Semua Katalog Produk</h1>
                <p className="text-xs text-slate-500">Pilih unit proyektor terbaik untuk event Anda.</p>
              </div>
              <span className="shopee-badge text-xs font-bold px-3 py-1 rounded">
                Total {PRODUCTS.length} Produk
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PRODUCTS.map((prod) => (
                <div key={prod.id} className="shopee-card p-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="shopee-badge text-[10px] font-bold px-2 py-0.5 rounded">
                        {prod.category}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold">{prod.lumens} Lumens</span>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">{prod.name}</h3>
                      <p className="text-[11px] text-slate-500 mt-1">{prod.desc}</p>
                    </div>
                    <div className="text-[11px] space-y-0.5 text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">
                      <p><strong>Resolusi:</strong> {prod.resolution}</p>
                      <p><strong>Audience:</strong> {prod.capacity}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                      <div className="p-1.5 rounded bg-slate-50 border border-slate-200">
                        <span className="text-[9px] text-slate-500 block">6 Jam</span>
                        <strong className="text-slate-900 text-xs">{formatIDR(prod.price_6h)}</strong>
                      </div>
                      <div className="p-1.5 rounded bg-orange-50 border border-orange-200">
                        <span className="text-[9px] text-[#EE4D2D] block font-bold">24 Jam</span>
                        <strong className="text-[#EE4D2D] text-xs font-black">{formatIDR(prod.price_24h)}</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(prod);
                          setPage('detail');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="py-2 rounded border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => openBookingModal(prod)}
                        className="shopee-orange shopee-orange-hover py-2 rounded text-xs font-extrabold shadow"
                      >
                        Pesan
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 'detail' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            <button
              onClick={() => setPage('beranda')}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-white px-4 py-2 rounded border border-slate-300 shadow-sm hover:bg-slate-50 transition"
            >
              ← Kembali ke Beranda
            </button>

            <div className="shopee-card p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="shopee-badge text-xs font-bold px-3 py-1 rounded">
                    {selectedProduct.category}
                  </span>
                  <h1 className="text-2xl font-black text-slate-900 mt-2">{selectedProduct.name}</h1>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Tarif Sewa 24 Jam</span>
                  <span className="text-2xl font-black text-[#EE4D2D]">{formatIDR(selectedProduct.price_24h)}</span>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{selectedProduct.desc}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-orange-50/50 p-5 rounded border border-orange-100 text-xs">
                <div>
                  <span className="text-slate-500 block font-bold uppercase">Tingkat Kecerahan:</span>
                  <strong className="text-sm text-slate-900">{selectedProduct.lumens} ANSI Lumens</strong>
                </div>
                <div>
                  <span className="text-slate-500 block font-bold uppercase">Resolusi Tampilan:</span>
                  <strong className="text-sm text-slate-900">{selectedProduct.resolution}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block font-bold uppercase">Kapasitas Audience:</span>
                  <strong className="text-sm text-slate-900">{selectedProduct.capacity}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block font-bold uppercase">Paket Layar:</span>
                  <strong className="text-sm text-slate-900">
                    {selectedProduct.includes_screen ? `Termasuk (${selectedProduct.screen})` : 'Unit Proyektor Saja'}
                  </strong>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openBookingModal(selectedProduct)}
                  className="shopee-orange shopee-orange-hover px-6 py-3.5 rounded text-xs font-black inline-flex items-center gap-2 shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Pesan Produk Ini via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {page === 'harga' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            <div className="bg-white p-4 border-l-4 border-[#EE4D2D] rounded-r-lg shadow-sm">
              <h1 className="font-black text-lg text-slate-900">Daftar Tarif Resmi Pithu Proyektor</h1>
              <p className="text-xs text-slate-500">Transparan dan sesuai standar harga sewa Surabaya.</p>
            </div>

            <div className="shopee-card overflow-hidden">
              <div className="shopee-orange px-6 py-3 flex justify-between items-center">
                <h2 className="font-extrabold text-xs text-white uppercase tracking-wider">Matriks Harga Proyektor & Layar</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold uppercase text-slate-600">
                      <th className="py-3 px-6">Produk / Paket</th>
                      <th className="py-3 px-6">Kategori</th>
                      <th className="py-3 px-6 text-right">Durasi 6 Jam</th>
                      <th className="py-3 px-6 text-right">Durasi 24 Jam</th>
                      <th className="py-3 px-6 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    {PRODUCTS.map((prod) => (
                      <tr key={prod.id} className="hover:bg-orange-50/30 transition">
                        <td className="py-3.5 px-6 font-extrabold text-slate-900">{prod.name}</td>
                        <td className="py-3.5 px-6 text-slate-500">{prod.category}</td>
                        <td className="py-3.5 px-6 text-right font-mono font-bold text-slate-800">
                          {formatIDR(prod.price_6h)}
                        </td>
                        <td className="py-3.5 px-6 text-right font-mono font-extrabold text-[#EE4D2D]">
                          {formatIDR(prod.price_24h)}
                        </td>
                        <td className="py-3.5 px-6 text-center">
                          <button
                            onClick={() => openBookingModal(prod)}
                            className="bg-orange-50 text-[#EE4D2D] border border-orange-200 px-3 py-1.5 rounded font-bold hover:bg-orange-100"
                          >
                            Pesan
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {page === 'formulir' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            <div className="bg-white p-4 border-l-4 border-[#EE4D2D] rounded-r-lg shadow-sm">
              <h1 className="font-black text-lg text-slate-900">Formulir Pemesanan Langsung WhatsApp</h1>
              <p className="text-xs text-slate-500">Isi data pesanan Anda dan langsung terhubung dengan admin.</p>
            </div>

            <form onSubmit={handleProcessBooking} className="shopee-card p-6 sm:p-8 space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pilih Produk Proyektor *</label>
                  <select
                    value={bookingForm.product_name}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, product_name: e.target.value }))}
                    className="w-full rounded border border-slate-300 px-3 py-2 font-bold text-slate-900 bg-white focus:ring-2 focus:ring-[#EE4D2D] outline-none"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({formatIDR(p.price_24h)} / 24j)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pilih Durasi Sewa *</label>
                  <select
                    value={bookingForm.duration}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, duration: e.target.value }))}
                    className="w-full rounded border border-slate-300 px-3 py-2 font-bold text-slate-900 bg-white focus:ring-2 focus:ring-[#EE4D2D] outline-none"
                  >
                    <option value="6 Jam">6 Jam</option>
                    <option value="24 Jam">24 Jam (Full Day)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Acara *</label>
                  <input
                    type="date"
                    required
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, date: e.target.value }))}
                    className="w-full rounded border border-slate-300 px-3 py-2 bg-white focus:ring-2 focus:ring-[#EE4D2D] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jam Mulai Acara *</label>
                  <input
                    type="time"
                    required
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, time: e.target.value }))}
                    className="w-full rounded border border-slate-300 px-3 py-2 bg-white focus:ring-2 focus:ring-[#EE4D2D] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Pemesan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded border border-slate-300 px-3 py-2 bg-white focus:ring-2 focus:ring-[#EE4D2D] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Instansi / Kampus / EO (Opsional)</label>
                  <input
                    type="text"
                    placeholder="Contoh: Universitas Airlangga"
                    value={bookingForm.institution}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, institution: e.target.value }))}
                    className="w-full rounded border border-slate-300 px-3 py-2 bg-white focus:ring-2 focus:ring-[#EE4D2D] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0812xxxxxxxx"
                    value={bookingForm.whatsapp}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, whatsapp: e.target.value }))}
                    className="w-full rounded border border-slate-300 px-3 py-2 bg-white focus:ring-2 focus:ring-[#EE4D2D] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Alamat Lengkap Pengiriman / Lokasi Acara *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama gedung, jalan, nomor, kecamatan di Surabaya & sekitarnya"
                    value={bookingForm.address}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, address: e.target.value }))}
                    className="w-full rounded border border-slate-300 px-3 py-2 bg-white focus:ring-2 focus:ring-[#EE4D2D] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full shopee-orange shopee-orange-hover py-3.5 rounded text-xs font-black flex items-center justify-center gap-2 shadow"
                >
                  <FileText className="w-4 h-4" />
                  <span>Buat Invoice JPG (1080x1350) & Kirim ke WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Shopee Style Modal Booking & Accessories */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="shopee-badge text-[10px] font-bold px-2.5 py-0.5 rounded uppercase">
                  Pemesanan Kilat
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1">Form Pesan & Peralatan Tambahan</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!generatedInvoiceData ? (
              <form onSubmit={handleProcessBooking} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Produk Dipilih</label>
                  <input
                    type="text"
                    disabled
                    value={bookingForm.product_name}
                    className="w-full rounded border border-slate-200 px-3 py-2 bg-slate-50 font-bold text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Durasi Sewa *</label>
                    <select
                      value={bookingForm.duration}
                      onChange={(e) => setBookingForm((prev) => ({ ...prev, duration: e.target.value }))}
                      className="w-full rounded border border-slate-300 px-3 py-2 bg-white font-bold"
                    >
                      <option value="6 Jam">6 Jam</option>
                      <option value="24 Jam">24 Jam (Full Day)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Jam Acara *</label>
                    <input
                      type="time"
                      required
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm((prev) => ({ ...prev, time: e.target.value }))}
                      className="w-full rounded border border-slate-300 px-3 py-2 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Acara *</label>
                  <input
                    type="date"
                    required
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, date: e.target.value }))}
                    className="w-full rounded border border-slate-300 px-3 py-2 bg-white"
                  />
                </div>

                {/* Accessories Selection inside Modal */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Peralatan Tambahan / Accessories (Opsional)</label>
                  <div className="max-h-40 overflow-y-auto border border-slate-200 rounded p-2.5 space-y-1.5 bg-slate-50">
                    {ACCESSORIES.map((acc, idx) => {
                      const isChecked = bookingForm.selectedAccessories.includes(acc.name);
                      return (
                        <label key={idx} className="flex items-center justify-between text-xs cursor-pointer hover:bg-orange-50 p-1.5 rounded">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleAccessoryToggle(acc.name)}
                              className="w-4 h-4 text-[#EE4D2D] rounded border-slate-300 focus:ring-[#EE4D2D]"
                            />
                            <span className="font-semibold text-slate-800">{acc.name}</span>
                          </div>
                          <span className="font-bold text-[#EE4D2D]">{formatIDR(acc.price)}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama pemesan"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded border border-slate-300 px-3 py-2 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Instansi / Kampus / EO (Opsional)</label>
                  <input
                    type="text"
                    placeholder="Nama instansi"
                    value={bookingForm.institution}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, institution: e.target.value }))}
                    className="w-full rounded border border-slate-300 px-3 py-2 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">No. WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0812xxxxxxxx"
                    value={bookingForm.whatsapp}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, whatsapp: e.target.value }))}
                    className="w-full rounded border border-slate-300 px-3 py-2 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Alamat Pengiriman di Surabaya *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jalan, nomor, gedung, kecamatan"
                    value={bookingForm.address}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, address: e.target.value }))}
                    className="w-full rounded border border-slate-300 px-3 py-2 bg-white"
                  />
                </div>

                <div className="bg-orange-50 p-3 rounded flex items-center justify-between border border-orange-200">
                  <span className="font-bold text-slate-800">Total Biaya:</span>
                  <span className="font-black text-[#EE4D2D] text-sm">{formatIDR(calculateTotal())}</span>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full shopee-orange shopee-orange-hover py-3 rounded text-xs font-black flex items-center justify-center gap-2 shadow"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Buat Invoice JPG (1080x1350) & Kirim ke WhatsApp</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-5 text-center py-4">
                <div className="w-14 h-14 bg-orange-100 text-[#EE4D2D] rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-lg font-black text-slate-900">Invoice Berhasil Dibuat!</h4>
                  <p className="text-xs text-slate-600">
                    No. Invoice: <strong className="text-[#EE4D2D]">{generatedInvoiceData?.invoiceNo}</strong>
                  </p>
                  <p className="text-xs text-slate-500">
                    Klik tombol di bawah untuk mengunduh gambar JPG (1080x1350) dan langsung mengirimkan rincian pesanan ke WhatsApp Admin.
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2.5">
                  <button
                    onClick={downloadInvoiceJPG}
                    className="w-full shopee-orange shopee-orange-hover py-3 rounded text-xs font-black flex items-center justify-center gap-2 shadow"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Invoice JPG (1080x1350) & Chat WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setGeneratedInvoiceData(null)}
                    className="text-xs font-bold text-slate-500 hover:underline py-1"
                  >
                    ← Edit Kembali Data Pesanan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Shopee Style Footer */}
      <footer className="bg-[#EE4D2D] text-white py-12 mt-16 border-t border-[#D73211]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-white font-black flex items-center justify-center text-[#EE4D2D]">
                P
              </div>
              <span className="font-black text-sm text-white">PITHU PROYEKTOR</span>
            </div>
            <p className="text-orange-100 font-bold">Acara Anda. Solusi Visual Kami.</p>
            <p className="text-orange-50">Alamat: Jemur Wonosari, Gg Sekolahan, No. 123, Surabaya.</p>
            <div>
              <a
                href="https://maps.app.goo.gl/RZKCsAeMiSRpbsdb8?g_st=ac"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#EE4D2D] hover:bg-orange-50 border border-white px-3 py-2 rounded font-bold text-xs transition mt-2 shadow-xs"
              >
                <MapPin className="w-4 h-4" />
                <span>Buka Google Maps</span>
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-white">Navigasi Utama</h4>
            <ul className="space-y-1.5 text-orange-100">
              <li><button onClick={() => setPage('beranda')} className="hover:text-white underline-offset-4 hover:underline">Beranda & Katalog</button></li>
              <li><button onClick={() => setPage('katalog')} className="hover:text-white underline-offset-4 hover:underline">Katalog Produk</button></li>
              <li><button onClick={() => setPage('harga')} className="hover:text-white underline-offset-4 hover:underline">Daftar Harga</button></li>
              <li><button onClick={() => setPage('formulir')} className="hover:text-white underline-offset-4 hover:underline">Formulir WhatsApp</button></li>
            </ul>
          </div>

          <div className="space-y-2 text-orange-50">
            <h4 className="font-bold uppercase tracking-wider text-white">Layanan Pelanggan Surabaya</h4>
            <p>Alamat: Jemur Wonosari, Gg Sekolahan, No. 123</p>
            <p>WhatsApp: +62 895340439050</p>
            <p>Email: halo@pithuproyektor.id</p>
            <p>Jam Operasional: 24 Jam</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-orange-400 text-center text-xs text-orange-100">
          © 2026 Pithu Proyektor Surabaya. Hak Cipta Dilindungi Undang-Undang.
        </div>
      </footer>
    </div>
  );
}
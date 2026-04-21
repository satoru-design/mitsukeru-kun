"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { categoriesData } from "../data/mockData";
import { getQuestionnaireForCategory } from "../data/questionnaireData";
import QuoteWizardModal from "./components/QuoteWizardModal";
import { Search, MapPin, Building2, ChevronRight, Star, Quote, ChevronDown, CheckCircle2, Zap, ShieldCheck, HeartHandshake } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>([]);
  
  // Hero Panel Tab State
  const [heroTab, setHeroTab] = useState<'quote' | 'search'>('quote');
  const [selectedService, setSelectedService] = useState("");
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Simulator State
  const [simAnswers, setSimAnswers] = useState<Record<string, string>>({});
  const [simEstimate, setSimEstimate] = useState<number | null>(null);

  // Parallax / Scroll State
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const simFields = selectedService ? getQuestionnaireForCategory(selectedService).slice(0, 2) : [];

  useEffect(() => {
    setSimAnswers({});
    setSimEstimate(null);
  }, [selectedService]);

  useEffect(() => {
    if (selectedService && simFields.length > 0 && simFields.every(f => simAnswers[f.id])) {
      let base = 5000;
      if (selectedService === "完全代行") base = 50000;
      else if (selectedService.includes("撮影")) base = 35000;
      else if (selectedService.includes("スマートロック") || selectedService === "リネンサプライ") base = 25000;
      else if (selectedService === "不用品回収" || selectedService.includes("水回り")) base = 15000;
      
      const extra = Object.values(simAnswers).reduce((acc: number, val: any) => acc + (String(val).length * 500), 0);
      setSimEstimate(base + extra);
    } else {
      setSimEstimate(null);
    }
  }, [selectedService, simAnswers, simFields]);

  const handleAutoQuoteSubmit = () => {
    if (!selectedService) {
      alert("依頼したいサービスを選択してください。");
      return;
    }
    setIsWizardOpen(true);
  };

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  const openModal = () => { setTempSelectedCategories([]); setIsModalOpen(true); };
  const closeModal = () => setIsModalOpen(false);
  const toggleTempCategory = (cat: string) => setTempSelectedCategories(p => p.includes(cat) ? p.filter(c => c !== cat) : [...p, cat]);
  const toggleGroupAll = (groupItems: string[]) => {
    const allSelected = groupItems.every(i => tempSelectedCategories.includes(i));
    if (allSelected) setTempSelectedCategories(p => p.filter(c => !groupItems.includes(c)));
    else setTempSelectedCategories(p => Array.from(new Set([...p, ...groupItems])));
  };
  const applyFiltersAndSearch = () => {
    closeModal();
    const params = new URLSearchParams();
    if (tempSelectedCategories.length > 0) params.set('categories', tempSelectedCategories.join(','));
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="font-sans antialiased overflow-x-hidden selection:bg-orange-500 selection:text-white">
      {/* Header */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrollY > 20 ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-black text-xl italic tracking-tighter">M</span>
            </div>
            <span className={`text-2xl font-black tracking-tight ${scrollY > 20 ? 'text-gray-900' : 'text-gray-900 drop-shadow-sm'}`}>
              見つける<span className="text-orange-500">君</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/search" className="text-sm font-bold text-gray-700 hover:text-orange-600 transition-colors">業者を探す</Link>
            <Link href="/chat" className="text-sm font-bold text-gray-700 hover:text-orange-600 transition-colors">チャット</Link>
            <Link href="/mypage" className="text-sm font-bold text-gray-700 hover:text-orange-600 transition-colors">マイページ</Link>
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <Link href="/register" className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              プロとして登録
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
        {/* Abstract Backgrounds */}
        <div className="absolute inset-0 bg-blue-50/40 -z-20"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-300/30 to-amber-100/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 -z-10 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-300/20 to-blue-200/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 -z-10 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-16 py-12 relative z-10">
          
          <div className="lg:w-1/2 space-y-8 animate-in slide-in-from-bottom-8 duration-700 fade-in fill-mode-both">
            <div className="inline-flex items-center gap-2 bg-orange-100/80 border border-orange-200 text-orange-800 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
              民泊運営をもっとスマートに
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.15] tracking-tight">
              民泊の<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">清掃コスト</span>を<br/>
              最適化する。
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 font-medium leading-relaxed max-w-xl">
              中間マージンゼロ。直接依頼だから「安く」「高品質」なプロがすぐ見つかる。<br/>
              スマホひとつで、明日の清掃も即マッチング。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={() => {
                document.getElementById('estimation-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }} className="bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold px-8 py-4 rounded-full shadow-[0_8px_30px_rgb(234,88,12,0.3)] hover:shadow-[0_8px_30px_rgb(234,88,12,0.5)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2 w-full sm:w-auto">
                無料で見積もりを取る
                <ChevronRight className="w-5 h-5" />
              </button>
              <Link href="/search" className="bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-800 text-lg font-bold px-8 py-4 rounded-full shadow-sm transition-all hover:-translate-y-1 flex items-center justify-center w-full sm:w-auto">
                自分で業者を探す
              </Link>
            </div>
            
            <div className="flex items-center gap-6 pt-6 border-t border-gray-200 max-w-md">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-10 h-10 border-2 border-white rounded-full bg-gray-200" />
                ))}
              </div>
              <div className="text-sm font-bold text-gray-600">
                <span className="text-gray-900">10,000+</span> 人のオーナーが利用中
              </div>
            </div>
          </div>

          <div id="estimation-panel" className="lg:w-1/2 w-full max-w-lg lg:max-w-none mx-auto animate-in slide-in-from-right-12 duration-700 delay-200 fade-in fill-mode-both relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-pink-500 rounded-3xl blur-[80px] opacity-20 transform -rotate-6"></div>
            
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-6 lg:p-10 relative z-10">
              <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-8">
                <button 
                  onClick={() => setHeroTab('quote')}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all shadow-sm ${heroTab === 'quote' ? 'bg-white text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  一括見積もり
                </button>
                <button 
                  onClick={() => setHeroTab('search')}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all shadow-sm ${heroTab === 'search' ? 'bg-white text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  細かく検索
                </button>
              </div>

              {heroTab === 'quote' ? (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="text-center">
                    <h3 className="text-xl font-black text-gray-900 mb-2">カンタン3分で一括比較</h3>
                    <p className="text-sm text-gray-500 font-medium">条件を入力するだけで、最大5社から概算が届きます。</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">依頼事項</label>
                      <select 
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-base font-bold rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block p-4 appearance-none transition-shadow hover:shadow-sm"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\\"http://www.w3.org/2000/svg\\" fill=\\"none\\" viewBox=\\"0 0 24 24\\" stroke=\\"%236b7280\\"%3E%3Cpath stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M19 9l-7 7-7-7\\"%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                      >
                        <option value="" disabled>サービスを選択してください</option>
                        {categoriesData.map(group => (
                          <optgroup key={group.group} label={group.group}>
                            {group.items.map(item => <option key={item} value={item}>{item}</option>)}
                          </optgroup>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {simFields.map((field: any) => (
                        <div key={field.id}>
                          <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">{field.title}</label>
                          {field.type === 'select' ? (
                            <select 
                              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-bold rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-3.5"
                              value={simAnswers[field.id] || ""} 
                              onChange={e => setSimAnswers(p => ({...p, [field.id]: e.target.value}))}
                            >
                              <option value="">選択...</option>
                              {field.options?.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                          ) : (
                            <input 
                              type={field.type === 'number' ? 'number' : 'text'}
                              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-bold rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-3.5"
                              placeholder={field.placeholder || "入力"}
                              value={simAnswers[field.id] || ""}
                              onChange={e => setSimAnswers(p => ({...p, [field.id]: e.target.value}))}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {simEstimate !== null && (
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-5 text-center transform shadow-inner animate-in zoom-in-95 duration-300">
                      <span className="text-xs font-bold text-orange-600 mb-1 block">AI自動概算相場</span>
                      <div className="text-3xl font-black text-orange-600 tracking-tight">
                        ¥{simEstimate.toLocaleString()} <span className="text-xl font-bold text-orange-400">〜</span>
                      </div>
                    </div>
                  )}

                  <button onClick={handleAutoQuoteSubmit} className="w-full bg-gray-900 hover:bg-black text-white text-lg font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 mt-2">
                    {simEstimate ? 'この条件で詳細を入力する' : '次に進む'}
                  </button>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="text-center">
                    <h3 className="text-xl font-black text-gray-900 mb-2">条件を絞って探す</h3>
                    <p className="text-sm text-gray-500 font-medium">エリアやキーワードから直接プロを見つけます。</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="text" id="hero-kw"
                        className="w-full bg-white border border-gray-200 text-gray-900 text-base font-medium rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-sm"
                        placeholder="例：リネン持ち帰り、即日対応..."
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="relative flex-1">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select id="hero-ar" className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm font-bold rounded-xl py-3.5 pl-9 pr-4">
                          <option value="">エリア全国</option>
                          <option value="東京都">東京都</option>
                          <option value="大阪府">大阪府</option>
                        </select>
                      </div>
                      <div className="relative flex-1">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select id="hero-cat" className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm font-bold rounded-xl py-3.5 pl-9 pr-4">
                          <option value="">すべてのカテゴリ</option>
                          {categoriesData[2].items.map(i => <option key={i} value={i}>{i}</option>)} {/* Mock */}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button onClick={() => {
                    const kw = (document.getElementById('hero-kw') as HTMLInputElement).value;
                    router.push(kw ? `/search?keyword=${kw}` : `/search`);
                  }} className="w-full bg-gray-900 hover:bg-black text-white text-lg font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" /> 検索する
                  </button>
                  <div className="text-center pt-2">
                    <button onClick={openModal} className="text-sm font-bold text-orange-600 hover:text-orange-700 underline underline-offset-4">さらに細かい条件でタグ検索</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">なぜ「見つける君」が選ばれるのか？</h2>
            <p className="text-gray-500 font-medium">圧倒的なコストパフォーマンスと信頼性を両立する3つの理由</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Zap, color: 'text-orange-500', bg: 'bg-orange-100', title: '直接契約でマージンゼロ', desc: '業者と直接チャットで交渉できるため、無駄な中間手数料が一切かかりません。相場よりも20%以上安く依頼できます。' },
              { icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-100', title: '全業者・本人確認済み', desc: '登録されているプロはすべて厳格な本人確認と反社チェックをクリアしています。身元が確かなので安心です。' },
              { icon: HeartHandshake, color: 'text-blue-500', bg: 'bg-blue-100', title: 'レビューで品質が丸わかり', desc: '過去の利用者のリアルな口コミと星評価で、業者のクオリティを事前に確認可能。仕上がりのムラを防ぎます。' }
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className={`w-14 h-14 ${feature.bg} text-white rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-orange-600/20 rounded-[100%] blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <h2 className="text-3xl lg:text-4xl font-black mb-6 leading-tight">オーナー様からの<br/>喜びの声</h2>
              <p className="text-gray-400 font-medium mb-8">
                見つける君を導入したことで、収益化の要である「清掃」の悩みが解消したと多くのお声をいただいております。
              </p>
              <button className="text-white font-bold border-b-2 border-orange-500 pb-1 hover:text-orange-400 transition-colors">
                導入事例をもっと見る →
              </button>
            </div>
            <div className="md:w-2/3 grid sm:grid-cols-2 gap-6">
              {[
                { name: "S.K 様 (運用5施設)", text: "清掃費がネックで赤字スレスレでしたが、見つける君で個人事業主の方と直接契約し、月間の清掃コストが30%削減できました。" },
                { name: "T.M 様 (運用1施設)", text: "初めての民泊で業者の探し方が分かりませんでした。自動見積もりで相場がすぐに分かり、レビューを見て安心して依頼できました。" }
              ].map((t, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative">
                  <Quote className="w-10 h-10 text-orange-500/50 absolute top-6 right-6" />
                  <div className="flex text-orange-400 mb-4">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-gray-200 font-medium leading-relaxed mb-6">「{t.text}」</p>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <QuoteWizardModal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} category={selectedService} />
    </div>
  );
}

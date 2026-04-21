"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { mockServices, categoriesData, areasData } from "../../data/mockData";
import { Search, MapPin, SlidersHorizontal, Star, Zap, ChevronDown, CheckSquare, Square, X, Filter } from "lucide-react";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter States
  const [keyword, setKeyword] = useState<string>(searchParams.get("keyword") || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories") ? searchParams.get("categories")!.split(",") : []
  );
  const [selectedAreas, setSelectedAreas] = useState<string[]>(
    searchParams.get("areas") ? searchParams.get("areas")!.split(",") : []
  );
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [ratingFilter, setRatingFilter] = useState<string>("0");
  const [speedFilter, setSpeedFilter] = useState<boolean>(false);
  
  const [sortBy, setSortBy] = useState("newest");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fake loading effect for better UX
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, [keyword, selectedCategories, selectedAreas, minPrice, maxPrice, ratingFilter, speedFilter, sortBy]);

  const formatPrice = (price: number) => new Intl.NumberFormat('ja-JP').format(price);

  const toggleCategory = (cat: string) => setSelectedCategories(p => p.includes(cat) ? p.filter(c => c !== cat) : [...p, cat]);
  const toggleArea = (area: string) => setSelectedAreas(p => p.includes(area) ? p.filter(a => a !== area) : [...p, area]);

  const removeFilterTag = (type: string, value: string) => {
    if (type === 'keyword') setKeyword("");
    if (type === 'category') toggleCategory(value);
    if (type === 'area') toggleArea(value);
    if (type === 'speed') setSpeedFilter(false);
    if (type === 'rating') setRatingFilter("0");
  };

  const clearAllFilters = () => {
    setKeyword(""); setSelectedCategories([]); setSelectedAreas([]);
    setMinPrice(""); setMaxPrice(""); setRatingFilter("0"); setSpeedFilter(false);
    router.replace("/search", { scroll: false });
  };

  const filteredData = useMemo(() => {
    let data = mockServices.filter(service => {
      if (keyword && !`${service.title} ${service.desc} ${service.providerName} ${service.features.join(' ')}`.toLowerCase().includes(keyword.toLowerCase())) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(service.category)) return false;
      if (selectedAreas.length > 0 && !selectedAreas.includes(service.area) && service.area !== "全国対応") return false;
      if (minPrice && service.price < parseInt(minPrice)) return false;
      if (maxPrice && service.price > parseInt(maxPrice)) return false;
      if (ratingFilter !== "0" && service.rating < parseFloat(ratingFilter)) return false;
      if (speedFilter && service.speed !== "即日対応可") return false;
      return true;
    });

    if (sortBy === 'price-asc') data.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') data.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating-desc') data.sort((a, b) => b.rating - a.rating);
    else data.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());

    return data;
  }, [keyword, selectedCategories, selectedAreas, minPrice, maxPrice, ratingFilter, speedFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-orange-500 selection:text-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-black text-lg italic tracking-tighter">M</span>
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900">
              見つける<span className="text-orange-500">君</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/chat" className="relative flex flex-col items-center text-gray-500 hover:text-orange-600 transition">
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">1</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span className="text-[10px] font-bold mt-1">チャット</span>
            </Link>
            <Link href="/mypage" className="flex flex-col items-center text-gray-500 hover:text-orange-600 transition">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span className="text-[10px] font-bold mt-1">マイページ</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between mb-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
          <div className="font-bold text-gray-800">
            <span className="text-orange-600 text-xl">{filteredData.length}</span> 件のプロ
          </div>
          <button onClick={() => setIsMobileFilterOpen(true)} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl text-sm font-bold text-gray-700">
            <Filter className="w-4 h-4" /> 絞り込み
          </button>
        </div>

        {/* Sidebar Filters */}
        <aside className={`fixed inset-0 z-50 bg-white lg:bg-transparent lg:static lg:w-72 lg:shrink-0 transform transition-transform duration-300 lg:translate-x-0 ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} overflow-y-auto lg:overflow-visible`}>
          <div className="p-6 lg:p-0">
            <div className="flex items-center justify-between lg:hidden mb-6">
              <h2 className="text-xl font-black text-gray-900">絞り込み</h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-gray-100 rounded-full"><X className="w-5 h-5"/></button>
            </div>

            <div className="bg-white lg:rounded-3xl lg:shadow-sm lg:border border-gray-200 p-6 space-y-8 sticky top-24">
              
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><SlidersHorizontal className="w-4 h-4" /> 検索条件</h3>
                <button onClick={clearAllFilters} className="text-xs font-bold text-gray-400 hover:text-orange-600 transition">リセット</button>
              </div>

              {/* Keyword */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">フリーワード</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" placeholder="例: エアコン" 
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-medium rounded-xl py-3 pl-9 pr-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                    value={keyword} onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">カテゴリ</label>
                <div className="space-y-4">
                  {categoriesData.map(group => (
                    <div key={group.group}>
                      <div className="text-[11px] font-bold text-gray-400 mb-2">{group.group}</div>
                      <div className="space-y-2">
                        {group.items.map(cat => (
                          <label key={cat} className="flex items-center gap-3 cursor-pointer group/label">
                            <div className="relative flex items-center justify-center">
                              <input type="checkbox" className="peer sr-only" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
                              <div className="w-5 h-5 border-2 border-gray-300 rounded-[6px] peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-colors"></div>
                              <CheckSquare className="w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover/label:text-orange-600 transition-colors">{cat}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Area */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">エリア</label>
                <div className="space-y-2">
                  {areasData.map(area => (
                    <label key={area} className="flex items-center gap-3 cursor-pointer group/label">
                      <div className="relative flex items-center justify-center">
                        <input type="checkbox" className="peer sr-only" checked={selectedAreas.includes(area)} onChange={() => toggleArea(area)} />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-[6px] peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-colors"></div>
                        <CheckSquare className="w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover/label:text-orange-600 transition-colors">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">追加条件</label>
                <div className="flex flex-col gap-3">
                  <select className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm font-bold rounded-xl py-2.5 px-3 outline-none" value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
                    <option value="0">評価にこだわらない</option>
                    <option value="4.0">★ 4.0 以上</option>
                    <option value="4.5">★ 4.5 以上</option>
                  </select>
                  <label className="flex items-center gap-3 cursor-pointer group/label">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer sr-only" checked={speedFilter} onChange={(e) => setSpeedFilter(e.target.checked)} />
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-[6px] peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-colors"></div>
                      <Zap className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover/label:text-orange-600 transition-colors">即日対応可のみ</span>
                  </label>
                </div>
              </div>

              {/* Mobile apply button */}
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="lg:hidden w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg mt-8"
              >
                結果を見る ({filteredData.length}件)
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1">
          {/* Header Bar */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <h1 className="text-2xl font-black text-gray-900">
              <span className="text-orange-600 mr-2">{filteredData.length}</span>
              <span className="text-lg text-gray-500 font-bold">件のプロが見つかりました</span>
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-500">並び替え</span>
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-200 text-gray-900 text-sm font-bold rounded-xl py-2 pl-4 pr-10 outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="newest">おすすめ・新着順</option>
                  <option value="price-asc">価格の安い順</option>
                  <option value="price-desc">価格の高い順</option>
                  <option value="rating-desc">評価の高い順</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {keyword && <Tag label={`"${keyword}"`} onRemove={() => removeFilterTag('keyword', '')} />}
            {selectedCategories.map(cat => <Tag key={cat} label={cat} onRemove={() => removeFilterTag('category', cat)} />)}
            {selectedAreas.map(area => <Tag key={area} label={area} onRemove={() => removeFilterTag('area', area)} />)}
            {speedFilter && <Tag label="即日対応可" icon={<Zap className="w-3 h-3 text-yellow-500"/>} onRemove={() => removeFilterTag('speed', '')} />}
            {ratingFilter !== "0" && <Tag label={`★${ratingFilter}以上`} onRemove={() => removeFilterTag('rating', '')} />}
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading ? (
              // Skeletons
              Array.from({length: 6}).map((_, i) => (
                <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 animate-pulse flex flex-col h-full">
                  <div className="aspect-[4/3] bg-gray-200 rounded-2xl mb-4 w-full"></div>
                  <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-2/3 mb-auto"></div>
                  <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="h-8 bg-gray-200 rounded-xl w-24"></div>
                  </div>
                </div>
              ))
            ) : filteredData.length > 0 ? (
              filteredData.map(service => (
                <div key={service.id} className="group bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-orange-200 transition-all duration-300 flex flex-col overflow-hidden relative">
                  {/* Image Area */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-black px-3 py-1.5 rounded-lg shadow-sm">
                      {service.category}
                    </div>
                    {service.speed === "即日対応可" && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-sm flex items-center gap-1 animate-pulse">
                        <Zap className="w-3 h-3" fill="currentColor"/> 即日可
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-black text-gray-900 leading-tight mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {service.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md flex items-center gap-1"><MapPin className="w-3 h-3"/>{service.area}</span>
                      {service.features.slice(0,2).map(f => (
                        <span key={f} className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">{f}</span>
                      ))}
                    </div>
                    
                    <p className="text-sm text-gray-500 font-medium line-clamp-2 mb-auto leading-relaxed">
                      {service.desc}
                    </p>

                    <div className="flex items-center justify-between mt-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="font-black text-gray-900">{service.rating.toFixed(1)}</span>
                        <span className="text-xs text-gray-400 font-medium">({service.reviews})</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-400 font-bold">参考価格</span>
                        <div className="text-xl font-black text-gray-900 tracking-tight">
                          <span className="text-sm">¥</span>{formatPrice(service.price)}<span className="text-xs text-gray-500">〜</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                          {service.providerName.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-gray-700 truncate max-w-[100px]">{service.providerName}</span>
                      </div>
                      <Link href={`/vendor/${service.id}`} className="bg-gray-900 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-sm">
                        詳細を見る
                      </Link>
                    </div>
                  </div>
                  
                  {/* Gamification Badge Overlay */}
                  {(service as any).qualifications?.length > 0 && (
                    <div className="absolute -left-6 top-8 -rotate-45 bg-amber-400 text-amber-900 text-[10px] font-black py-1 w-32 text-center shadow-md select-none pointer-events-none">
                      公認プロ
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 xl:col-span-3 bg-white rounded-3xl border border-dashed border-gray-300 p-16 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">条件に一致するプロが見つかりません</h3>
                <p className="text-gray-500 font-medium mb-6">条件を少しゆるめるか、別のエリア・カテゴリをお試しください。</p>
                <button onClick={clearAllFilters} className="bg-orange-100 text-orange-700 hover:bg-orange-200 font-bold px-8 py-3 rounded-xl transition">
                  すべての条件をクリア
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function Tag({ label, onRemove, icon }: { label: string, onRemove: () => void, icon?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-800 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm animate-in zoom-in duration-200">
      {icon}
      {label}
      <button onClick={onRemove} className="w-4 h-4 bg-orange-200 hover:bg-orange-300 text-orange-900 rounded-full flex items-center justify-center transition-colors ml-1">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div></div>}>
      <SearchContent />
    </Suspense>
  );
}

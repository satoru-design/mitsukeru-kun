"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { mockServices, categoriesData, areasData } from "../../data/mockData";

// Suspense wrap needed for useSearchParams
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
  
  // Sort State
  const [sortBy, setSortBy] = useState("newest"); // newest, price-asc, price-desc, rating-desc

  // Format utility
  const formatPrice = (price: number) => new Intl.NumberFormat('ja-JP').format(price);

  // Handle Category Checkbox
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  // Handle Area Checkbox
  const handleAreaChange = (area: string) => {
    setSelectedAreas(prev => 
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const removeFilterTag = (type: string, value: string) => {
    if (type === 'keyword') setKeyword("");
    if (type === 'category') handleCategoryChange(value);
    if (type === 'area') handleAreaChange(value);
    if (type === 'speed') setSpeedFilter(false);
    if (type === 'rating') setRatingFilter("0");
  };

  const clearAllFilters = () => {
    setKeyword("");
    setSelectedCategories([]);
    setSelectedAreas([]);
    setMinPrice("");
    setMaxPrice("");
    setRatingFilter("0");
    setSpeedFilter(false);
    router.replace("/search", { scroll: false });
  };

  // Filter Logic
  const filteredData = useMemo(() => {
    let data = mockServices.filter(service => {
      // 1. Keyword Match
      if (keyword) {
        const lowerKeyword = keyword.toLowerCase();
        const textToSearch = `${service.title} ${service.desc} ${service.providerName} ${service.features.join(' ')}`.toLowerCase();
        if (!textToSearch.includes(lowerKeyword)) return false;
      }
      // 2. Category Match
      if (selectedCategories.length > 0 && !selectedCategories.includes(service.category)) {
        return false;
      }
      // 3. Area Match (Assume "全国対応" matches everything if selected, or if service is "全国対応" it matches any area)
      if (selectedAreas.length > 0) {
        const matchesArea = selectedAreas.includes(service.area) || service.area === "全国対応";
        if (!matchesArea) return false;
      }
      // 4. Price Range Match
      if (minPrice && service.price < parseInt(minPrice)) return false;
      if (maxPrice && service.price > parseInt(maxPrice)) return false;
      
      // 5. Rating Match
      if (ratingFilter !== "0" && service.rating < parseFloat(ratingFilter)) return false;
      
      // 6. Speed Match
      if (speedFilter && service.speed !== "即日対応可") return false;

      return true;
    });

    // Sort Logic
    if (sortBy === 'price-asc') {
      data.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      data.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      data.sort((a, b) => b.rating - a.rating);
    } else {
      // newest (mock dateAdded)
      data.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    }

    return data;
  }, [keyword, selectedCategories, selectedAreas, minPrice, maxPrice, ratingFilter, speedFilter, sortBy]);

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <div className="header-logo">
            <Link href="/">
              <img src="/assets/images/logo.png" alt="見つける君 ロゴ" />
            </Link>
          </div>
          <nav className="header-nav" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <Link href="/chat" className="nav-icon-link" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--color-text)', textDecoration: 'none', position: 'relative' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span style={{ fontSize: '0.7rem', marginTop: '2px', fontWeight: 'bold' }}>チャット</span>
              <span className="badge-notification" style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
            </Link>
            <Link href="/mypage" className="nav-icon-link" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--color-text)', textDecoration: 'none' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span style={{ fontSize: '0.7rem', marginTop: '2px', fontWeight: 'bold' }}>マイページ</span>
            </Link>
            <Link href="/register" className="btn btn-primary btn-sm hidden-sp">プロとして登録（無料）</Link>
          </nav>
        </div>
      </header>

      <main style={{ background: '#f8f9fa' }}>
        <div className="search-page-layout">
          {/* Sidebar */}
          <aside className="search-sidebar">
            <h3>絞り込み条件</h3>
            
            {/* Keyword */}
            <div className="filter-section">
              <h4>フリーワード</h4>
              <input 
                type="text" 
                placeholder="例: リネン、英語、24時間" 
                className="filter-keyword-input"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="filter-section">
              <h4>カテゴリ</h4>
              <div className="filter-checkbox-list">
                {categoriesData.map(group => (
                  <div key={group.group} className="category-filter-group">
                    <div className="category-filter-group-title">{group.group}</div>
                    {group.items.map(cat => (
                      <label key={cat} className="filter-checkbox-item">
                        <input 
                          type="checkbox" 
                          checked={selectedCategories.includes(cat)}
                          onChange={() => handleCategoryChange(cat)}
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Area */}
            <div className="filter-section">
              <h4>エリア</h4>
              <div className="filter-checkbox-list">
                {areasData.map(area => (
                  <label key={area} className="filter-checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={selectedAreas.includes(area)}
                      onChange={() => handleAreaChange(area)}
                    />
                    {area}
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="filter-section">
              <h4>価格帯</h4>
              <div className="filter-price-inputs">
                <input 
                  type="number" 
                  placeholder="下限" 
                  className="filter-price-input"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span>〜</span>
                <input 
                  type="number" 
                  placeholder="上限" 
                  className="filter-price-input"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Rating */}
            <div className="filter-section">
              <h4>評価</h4>
              <select 
                className="sort-select" 
                style={{ width: '100%' }}
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="0">こだわらない</option>
                <option value="4.0">★ 4.0 以上</option>
                <option value="4.5">★ 4.5 以上</option>
                <option value="4.8">★ 4.8 以上</option>
              </select>
            </div>

            {/* Speed & Availability */}
            <div className="filter-section">
              <h4>対応スピード・条件</h4>
              <label className="filter-checkbox-item">
                <input 
                  type="checkbox" 
                  checked={speedFilter}
                  onChange={(e) => setSpeedFilter(e.target.checked)}
                />
                即日対応可のみ
              </label>
            </div>

            <button 
              className="btn btn-outline" 
              style={{ width: '100%', marginTop: '10px' }}
              onClick={clearAllFilters}
            >
              条件をクリア
            </button>
          </aside>

          {/* Main Results */}
          <div className="search-main">
            {/* Active Tags & Sort Bar */}
            <div className="search-header-bar">
              <div className="search-results-count">
                <span>{filteredData.length}</span>件のサービス
              </div>
              <div className="results-sort">
                <span style={{ fontSize: '0.9rem', marginRight: '10px', color: '#666' }}>並び替え:</span>
                <select 
                  className="sort-select" 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">新着順</option>
                  <option value="price-asc">価格の安い順</option>
                  <option value="price-desc">価格の高い順</option>
                  <option value="rating-desc">評価の高い順</option>
                </select>
              </div>
            </div>

            <div className="search-active-tags">
              {keyword && (
                <div className="filter-tag">
                  "{keyword}" <button className="remove-filter" onClick={() => removeFilterTag('keyword', '')}>&times;</button>
                </div>
              )}
              {selectedCategories.map(cat => (
                <div key={cat} className="filter-tag">
                  {cat} <button className="remove-filter" onClick={() => removeFilterTag('category', cat)}>&times;</button>
                </div>
              ))}
              {selectedAreas.map(area => (
                <div key={area} className="filter-tag">
                  {area} <button className="remove-filter" onClick={() => removeFilterTag('area', area)}>&times;</button>
                </div>
              ))}
              {speedFilter && (
                <div className="filter-tag">
                  即日対応可 <button className="remove-filter" onClick={() => removeFilterTag('speed', '')}>&times;</button>
                </div>
              )}
              {ratingFilter !== "0" && (
                <div className="filter-tag">
                  ★ {ratingFilter}以上 <button className="remove-filter" onClick={() => removeFilterTag('rating', '')}>&times;</button>
                </div>
              )}
            </div>

            {/* Grid */}
            <div className="results-grid">
              {filteredData.length > 0 ? (
                filteredData.map(service => (
                  <div className="service-card" key={service.id}>
                    <div className="card-image-wrapper">
                      <img src={service.image} alt={service.title} className="card-image" loading="lazy" />
                      <span className="card-category-badge">{service.category}</span>
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">{service.title}</h3>
                      <div className="card-badges">
                        <span className="badge badge-speed">{service.speed}</span>
                        <span className="badge badge-feature">{service.area}</span>
                        {service.features.map(f => (
                          <span key={f} className="badge badge-feature">{f}</span>
                        ))}
                        {(service as any).qualifications?.map((q: string) => (
                          <span key={q} className="badge badge-qualification" style={{background: '#fff7ed', color: '#c2410c', border: '1px solid #fdba74', fontWeight: 'bold'}}>
                            🏆 {q}
                          </span>
                        ))}
                      </div>
                      <p className="card-desc" style={{ marginTop: '0' }}>{service.desc}</p>
                      
                      <div className="card-rating-area">
                        <span className="rating-stars">{"★".repeat(Math.round(service.rating))}</span>
                        <span className="rating-score">{service.rating.toFixed(1)}</span>
                        <span className="rating-count">({service.reviews})</span>
                      </div>

                      <div className="card-divider" style={{ margin: '15px 0' }}></div>
                      
                      <div className="provider-area">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span>{service.providerName}</span>
                      </div>

                      <div className="card-footer" style={{ marginTop: '15px' }}>
                        <div className="card-price-area">
                          <span className="price-currency">¥</span>
                          <span className="price-amount">{formatPrice(service.price)}</span>
                          <span className="price-suffix">〜</span>
                        </div>
                        <button className="btn-card-action">詳細をみる</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '8px', border: '1px solid #eee' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔍</div>
                  <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>条件に一致するサービスが見つかりません</h3>
                  <p style={{ color: '#666' }}>条件を少し緩めるか、別のキーワードでお試しください。</p>
                  <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={clearAllFilters}>
                    条件をクリアして探し直す
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <Link href="#">運営会社</Link>
            <Link href="#">利用規約</Link>
            <Link href="#">プライバシーポリシー</Link>
          </div>
          <p className="copyright">&copy; 2026 見つける君 All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>読み込み中...</div>}>
      <SearchContent />
    </Suspense>
  );
}

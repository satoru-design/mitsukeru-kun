"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { categoriesData } from "../data/mockData";
import { getQuestionnaireForCategory } from "../data/questionnaireData";
import QuoteWizardModal from "./components/QuoteWizardModal";

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>([]);
  
  // Hero Panel Tab State: 'quote' (ミツモア風の一括見積もり), 'search' (自分で探す)
  const [heroTab, setHeroTab] = useState<'quote' | 'search'>('quote');
  const [selectedService, setSelectedService] = useState("");
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Simulator State
  const [simAnswers, setSimAnswers] = useState<Record<string, string>>({});
  const [simEstimate, setSimEstimate] = useState<number | null>(null);

  // Derive which fields to show based on selected service
  const simFields = selectedService ? getQuestionnaireForCategory(selectedService).slice(0, 2) : [];

  // Reset simulator when service changes
  useEffect(() => {
    setSimAnswers({});
    setSimEstimate(null);
  }, [selectedService]);

  // Simple mock logic for simulator
  useEffect(() => {
    if (selectedService && simFields.length > 0 && simFields.every(f => simAnswers[f.id])) {
      let base = 5000;
      if (selectedService === "完全代行") base = 50000;
      else if (selectedService === "民泊新法届出 / 旅館業許可申請") base = 100000;
      else if (selectedService === "消防設備設置工事") base = 150000;
      else if (selectedService === "宿泊施設ページ制作（Airbnb等）") base = 60000;
      else if (selectedService === "コンサルティング") base = 50000;
      else if (selectedService === "SNS集客・運用") base = 40000;
      else if (selectedService.includes("撮影")) base = 35000;
      else if (selectedService === "ハウスガイド制作" || selectedService === "家具・家電選定") base = 30000;
      else if (selectedService.includes("スマートロック") || selectedService === "リネンサプライ") base = 25000;
      else if (selectedService.includes("代行")) base = 20000;
      else if (selectedService.includes("家具組み立て")) base = 20000;
      else if (selectedService === "不用品回収" || selectedService.includes("水回り") || selectedService.includes("鍵交換") || selectedService.includes("電話対応")) base = 15000;
      else if (selectedService.includes("エアコントラブル")) base = 10000;
      else if (selectedService.includes("サポート")) base = 8000;
      
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

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const openModal = () => {
    setTempSelectedCategories([]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleTempCategory = (cat: string) => {
    setTempSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleGroupAll = (groupItems: string[]) => {
    const allSelected = groupItems.every(item => tempSelectedCategories.includes(item));
    if (allSelected) {
      setTempSelectedCategories(prev => prev.filter(c => !groupItems.includes(c)));
    } else {
      setTempSelectedCategories(prev => {
        const newSet = new Set([...prev, ...groupItems]);
        return Array.from(newSet);
      });
    }
  };

  const applyFiltersAndSearch = () => {
    closeModal();
    const params = new URLSearchParams();
    if (tempSelectedCategories.length > 0) {
      params.set('categories', tempSelectedCategories.join(','));
    }
    router.push(`/search?${params.toString()}`);
  };

  const clearAllTemp = () => {
    setTempSelectedCategories([]);
  };

  return (
    <>
      {/* Header */}
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

      {/* Main Content */}
      <main>
        {/* FV */}
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-text-area">
              <h1 className="hero-title">
                民泊の清掃コストを最適化。<br />
                <span className="text-primary">スマホひとつで、信頼できる清掃プロがすぐ見つかる。</span>
              </h1>
              <p className="hero-subtitle">中間マージンゼロ。直接依頼だから「安く」「高品質」な民泊清掃マッチング。</p>
            </div>
            
            {/* New Rich Search Panel (Dual Experience) */}
            <div className="hero-search-panel">
              <div className="search-panel-tabs">
                <div 
                  className={`search-tab ${heroTab === 'quote' ? 'active' : ''}`}
                  onClick={() => setHeroTab('quote')}
                >
                  質問に答えて一括見積もり (無料)
                </div>
                <div 
                  className={`search-tab ${heroTab === 'search' ? 'active' : ''}`}
                  style={{ color: heroTab !== 'search' ? 'var(--color-text-muted)' : 'inherit', fontWeight: heroTab === 'search' ? 'bold' : 'normal' }}
                  onClick={() => setHeroTab('search')}
                >
                  自分で業者を探す
                </div>
              </div>

              {heroTab === 'quote' ? (
                // --- Experience 1: Auto Quote (Mitsumore logic) ---
                <div className="search-panel-body" style={{ flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text)', textAlign: 'center', marginBottom: '10px' }}>
                    カンタン3分！質問に答えるだけで最大5社から見積もりが届きます。
                  </h3>
                  
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <div className="search-input-group" style={{ flex: '1 1 200px' }}>
                      <label>依頼したいサービス</label>
                      <select 
                        className="search-panel-select" 
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                      >
                        <option value="" disabled>選択してください</option>
                        {categoriesData.map(group => (
                          <optgroup key={group.group} label={group.group}>
                            {group.items.map(item => (
                              <option key={item} value={item}>{item}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                    {/* Simulator Inputs (Visible if category is chosen) */}
                    {selectedService && simFields.map((field: any) => (
                      <div className="search-input-group" style={{ flex: '1 1 150px' }} key={field.id}>
                        <label>{field.title}</label>
                        {field.type === 'select' || field.type === 'radio' || field.type === 'checkbox' ? (
                          <select 
                            className="search-panel-select" 
                            value={simAnswers[field.id] || ""} 
                            onChange={e => setSimAnswers(prev => ({...prev, [field.id]: e.target.value}))}
                          >
                            <option value="">選択...</option>
                            {field.options?.map((opt: any) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        ) : (
                          <input 
                            type={field.type === 'number' ? 'number' : 'text'}
                            className="search-panel-input"
                            placeholder={field.placeholder || "入力"}
                            value={simAnswers[field.id] || ""}
                            onChange={e => setSimAnswers(prev => ({...prev, [field.id]: e.target.value}))}
                            style={{ height: '48px', padding: '12px' }}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Estimate Display */}
                  {simEstimate !== null && (
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '15px', textAlign: 'center', marginTop: '10px' }}>
                      <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 'bold' }}>自動概算見積もり結果 (相場)</span>
                      <div style={{ fontSize: '1.8rem', color: '#f97316', fontWeight: '900', margin: '5px 0' }}>
                        約 ¥{simEstimate.toLocaleString()} 〜 ¥{(simEstimate + 3000).toLocaleString()}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>※実際の金額は業者の設定やオプションにより変動します</span>
                    </div>
                  )}

                  <button 
                    className="btn btn-primary" 
                    onClick={handleAutoQuoteSubmit}
                    style={{ padding: '15px 40px', fontSize: '1.2rem', width: '100%', background: '#ff7f50', border: 'none', boxShadow: '0 4px 10px rgba(255, 127, 80, 0.3)' }}
                  >
                    {simEstimate ? 'この条件で業者を探す（詳細入力へ）' : '条件を指定する（次へ）'}
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#666' }}>※依頼後にチャット画面から業者と比較・交渉が可能です</p>
                </div>
              ) : (
                // --- Experience 2: Manual Search (Direct search and filter) ---
                <div className="search-panel-body">
                  {/* Keyword */}
                  <div className="search-input-group">
                    <label htmlFor="hero-keyword">フリーワード</label>
                    <input 
                      type="text" 
                      id="hero-keyword"
                      placeholder="例: リネン、英語、24時間" 
                      className="search-panel-input"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') applyFiltersAndSearch();
                      }}
                    />
                  </div>

                  {/* Category Quick Select */}
                  <div className="search-input-group" style={{ flex: '0.8' }}>
                    <label htmlFor="hero-category">カテゴリ</label>
                    <select 
                      id="hero-category" 
                      className="search-panel-select"
                      defaultValue=""
                    >
                      <option value="">すべてのカテゴリ</option>
                      {categoriesData.map(group => (
                        <optgroup key={group.group} label={group.group}>
                          {group.items.map(item => (
                            <option key={item} value={item}>{item}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  {/* Area Quick Select */}
                  <div className="search-input-group" style={{ flex: '0.6' }}>
                    <label htmlFor="hero-area">エリア</label>
                    <select 
                      id="hero-area" 
                      className="search-panel-select"
                      defaultValue=""
                    >
                      <option value="">全国</option>
                      <option value="北海道">北海道</option>
                      <option value="関東圏">関東圏</option>
                      <option value="東京都">東京都</option>
                      <option value="大阪府">大阪府</option>
                      <option value="九州・沖縄">九州・沖縄</option>
                    </select>
                  </div>

                  {/* Search Button */}
                  <button 
                    className="btn-search-large" 
                    onClick={() => {
                      const kw = (document.getElementById('hero-keyword') as HTMLInputElement).value;
                      const cat = (document.getElementById('hero-category') as HTMLSelectElement).value;
                      const area = (document.getElementById('hero-area') as HTMLSelectElement).value;
                      
                      const params = new URLSearchParams();
                      if(kw) params.set('keyword', kw);
                      if(cat) params.set('categories', cat);
                      if(area) params.set('areas', area);
                      
                      router.push(`/search?${params.toString()}`);
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    検索する
                  </button>
                </div>
              )}

              <div className="search-helper-links">
                <span className="search-helper-link" onClick={openModal}>すべての細かい条件から探す</span>
                <span style={{ color: '#ccc' }}>|</span>
                <Link href="/search" className="search-helper-link">まずは業者一覧を見てみる</Link>
              </div>
            </div>

          </div>
        </section>

        {/* Problem Section */}
        <section className="section section-alt problem-section">
          <div className="container">
            <h2 className="section-title">今まで、こんなお悩みありませんでしたか？</h2>
            <div className="problem-grid">
              <div className="card problem-card">
                <div className="problem-icon">💰</div>
                <p className="problem-text">清掃代行のコストが高く、<br />利益を圧迫している</p>
              </div>
              <div className="card problem-card">
                <div className="problem-icon">🏃‍♂️</div>
                <p className="problem-text">繁忙期に急に依頼できる<br />業者が捕まらない</p>
              </div>
              <div className="card problem-card">
                <div className="problem-icon">😞</div>
                <p className="problem-text">毎回仕上がりにムラがあり、<br />ゲストのレビュー低下が心配</p>
              </div>
            </div>
          </div>
        </section>

        {/* Work list */}
        <section className="section section-alt work-section">
          <div className="container">
            <h2 className="section-title">対応可能な作業内容</h2>
            <p className="work-lead text-center">以下の幅広い業務をプロに直接依頼できます。必要な項目を自由に組み合わせてご相談ください。</p>
            <div className="work-grid">
              <div className="work-card">
                <h4 className="work-category">✓ 定期清掃・リネン</h4>
                <ul className="work-items">
                  <li>室内清掃 / ベッドメイク</li>
                  <li>ゴミ出し / 不用品回収</li>
                  <li>リネンサプライ / コインランドリー手配</li>
                </ul>
              </div>
              <div className="work-card">
                <h4 className="work-category">✓ 緊急トラブル対応</h4>
                <ul className="work-items">
                  <li>現地駆けつけサポート</li>
                  <li>エアコントラブル・水回りトラブル</li>
                  <li>鍵交換（スマートロック新設等）</li>
                  <li>ゲストの多言語電話対応（英・中・韓など）</li>
                </ul>
              </div>
              <div className="work-card">
                <h4 className="work-category">✓ 運営代行・集客</h4>
                <ul className="work-items">
                  <li>メッセージ代行 / 完全代行</li>
                  <li>SNS集客・運用（Instagram・TikTok等）</li>
                  <li>ハウスガイド・宿泊施設ページ制作</li>
                  <li>写真・動画撮影</li>
                </ul>
              </div>
              <div className="work-card">
                <h4 className="work-category">✓ 設備・コンサル</h4>
                <ul className="work-items">
                  <li>インテリアコーディネート</li>
                  <li>消防・建築・許認可申請サポート</li>
                  <li>Wi-Fi・スマートロック導入</li>
                  <li>コンサルティング（売上向上・稼働率改善）</li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-4">
              <button 
                id="btn-search-conditions" 
                className="btn btn-primary"
                onClick={openModal}
              >
                条件を選択して業者を探す
              </button>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section id="cta-section" className="section section-accent closing-section">
          <div className="container">
            <div className="closing-content">
              <h2 className="closing-title">民泊運営の「清掃の悩み」を、<br className="sp-only" />プロの力で解決しませんか？</h2>
              <div className="mt-4">
                <Link href="/register" className="btn btn-primary btn-lg">無料でオーナー登録して業者を探す</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modals */}
      {isModalOpen && (
        <div id="condition-modal" className="modal is-open">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="modal-title">希望するサービスカテゴリを選択</h3>
              <button id="modal-close" className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <div id="category-list" className="category-list">
                {categoriesData.map(group => (
                  <div className="category-group" key={group.group}>
                    <div className="category-header">
                      <h4 className="category-title">{group.group}</h4>
                      <button 
                        type="button" 
                        className="btn-select-all"
                        onClick={() => toggleGroupAll(group.items)}
                      >
                        すべて
                      </button>
                    </div>
                    <div className="chip-container">
                      {group.items.map(item => (
                        <button 
                          key={item}
                          type="button" 
                          className={`category-chip ${tempSelectedCategories.includes(item) ? 'is-selected' : ''}`}
                          onClick={() => toggleTempCategory(item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer" id="modal-footer">
              <button 
                type="button" 
                className="btn-clear-all" 
                id="modal-clear-all"
                onClick={clearAllTemp}
              >
                すべてクリア
              </button>
              <div className="modal-footer-actions">
                <button type="button" className="btn-cancel" id="modal-cancel" onClick={closeModal}>キャンセル</button>
                <button type="button" className="btn btn-primary btn-sm btn-apply" id="modal-apply" onClick={applyFiltersAndSearch}>検索する</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
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

      {/* Mitsumore Style Dynamic Quote Wizard */}
      <QuoteWizardModal 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
        category={selectedService} 
      />
    </>
  );
}

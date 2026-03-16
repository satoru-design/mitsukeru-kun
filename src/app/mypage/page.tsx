"use client";

import { useState } from "react";
import Link from "next/link";
import { mockUser, mockChats, mockServices } from "../../data/mockData";
import QuoteWizardModal from "../components/QuoteWizardModal";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // Mock Properties for Owner
  const mockOwnerProperties = [
    { id: 'prop1', name: '新宿シティハイツ302', type: '1LDK', size: 40, bed: 2, status: '作業中', vendor: 'クリーンパートナーズ東京' },
    { id: 'prop2', name: '渋谷ロフト1階', type: 'その他', size: 65, bed: 0, status: '依頼中', vendor: '未定' },
    { id: 'prop3', name: '代々木ハウスA棟', type: '一戸建て', size: 90, bed: 4, status: '完了確認待ち', vendor: '高橋 不動産メンテ' },
    { id: 'prop4', name: '品川レジデンス405', type: '1R', size: 25, bed: 1, status: '運用中 (未手配)', vendor: '-' },
  ];

  // Format utility
  const formatDate = (isoStr: string) => {
    const d = new Date(isoStr);
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case '見積もり提案中': return 'status-proposing';
      case '成約済': return 'status-contracted';
      default: return '';
    }
  };

  return (
    <>
      <header className="header" style={{ borderBottom: '1px solid #eaeaea' }}>
        <div className="container header-inner">
          <div className="header-logo">
            <Link href="/">
              <img src="/assets/images/logo.png" alt="見つける君 ロゴ" />
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{mockUser.name} さん</span>
            <img src={mockUser.avatar} alt="user" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
          </div>
        </div>
      </header>

      <main style={{ background: '#f8f9fa', minHeight: 'calc(100vh - 70px)', paddingTop: '70px' }}>
        <div className="mypage-layout">
          {/* Sidebar Navigation */}
          <aside className="mypage-sidebar">
            <nav className="mypage-nav-menu">
              <a 
                className={`mypage-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
                  ダッシュボード
                </div>
              </a>
              <a 
                className={`mypage-nav-item ${activeTab === 'properties' ? 'active' : ''}`}
                onClick={() => setActiveTab('properties')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  物件マスタ管理
                </div>
              </a>
              <a 
                className={`mypage-nav-item ${activeTab === 'messages' ? 'active' : ''}`}
                onClick={() => setActiveTab('messages')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  メッセージ・見積もり
                </div>
                {mockChats.some(c => c.unreadCount > 0) && (
                  <span className="mypage-badge">
                    {mockChats.reduce((sum, c) => sum + c.unreadCount, 0)}
                  </span>
                )}
              </a>
              <a 
                className={`mypage-nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => setActiveTab('favorites')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  お気に入り業者
                </div>
              </a>
              <a className="mypage-nav-item" style={{ color: '#ef4444', marginTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  ログアウト
                </div>
              </a>
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="mypage-content" style={{ overflowX: 'hidden' }}>
            
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div>
                <div className="mypage-header">
                  <h1>物件ダッシュボード</h1>
                  <p>保有物件の現在のステータスを一覧で管理します。</p>
                </div>

                {/* Kanban Board for Properties */}
                <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px' }}>
                  
                  {/* Column: Idle */}
                  <div style={{ flex: '1', minWidth: '280px', background: '#f8fafc', borderRadius: '12px', padding: '15px', borderTop: '4px solid #cbd5e1' }}>
                    <h3 style={{ fontSize: '1rem', color: '#334155', marginBottom: '15px' }}>運用中 (手配なし)</h3>
                    {mockOwnerProperties.filter(p => p.status === '運用中 (未手配)').map(p => (
                      <div key={p.id} style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '10px' }}>
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem' }}>{p.name}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{p.type} / {p.size}㎡</p>
                        <button style={{ width: '100%', padding: '8px', marginTop: '10px', background: '#f97316', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActiveTab('properties')}>
                          ワンクリック発注
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Column: Requesting */}
                  <div style={{ flex: '1', minWidth: '280px', background: '#f8fafc', borderRadius: '12px', padding: '15px', borderTop: '4px solid #3b82f6' }}>
                    <h3 style={{ fontSize: '1rem', color: '#334155', marginBottom: '15px' }}>依頼中・見積り中</h3>
                    {mockOwnerProperties.filter(p => p.status === '依頼中').map(p => (
                      <div key={p.id} style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '10px' }}>
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem' }}>{p.name}</h4>
                        <p style={{ margin: '0 0 5px 0', fontSize: '0.8rem', color: '#64748b' }}>{p.type}</p>
                        <div style={{ fontSize: '0.8rem', background: '#eff6ff', color: '#1d4ed8', padding: '5px 8px', borderRadius: '4px', display: 'inline-block' }}>3件の提案あり</div>
                        <button style={{ width: '100%', padding: '8px', marginTop: '10px', background: 'transparent', color: '#3b82f6', border: '1px solid #3b82f6', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActiveTab('messages')}>
                          メッセージを確認
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Column: In Progress */}
                  <div style={{ flex: '1', minWidth: '280px', background: '#f8fafc', borderRadius: '12px', padding: '15px', borderTop: '4px solid #10b981' }}>
                    <h3 style={{ fontSize: '1rem', color: '#334155', marginBottom: '15px' }}>手配済・作業中</h3>
                    {mockOwnerProperties.filter(p => p.status === '作業中').map(p => (
                      <div key={p.id} style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '10px' }}>
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem' }}>{p.name}</h4>
                        <p style={{ margin: '0 0 10px 0', fontSize: '0.8rem', color: '#64748b' }}>担当: {p.vendor}</p>
                        <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>本日 10:00〜 作業予定</span>
                      </div>
                    ))}
                  </div>

                  {/* Column: Review Pending */}
                  <div style={{ flex: '1', minWidth: '280px', background: '#f8fafc', borderRadius: '12px', padding: '15px', borderTop: '4px solid #f59e0b' }}>
                    <h3 style={{ fontSize: '1rem', color: '#334155', marginBottom: '15px' }}>完了報告・確認待ち</h3>
                    {mockOwnerProperties.filter(p => p.status === '完了確認待ち').map(p => (
                      <div key={p.id} style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '10px' }}>
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem' }}>{p.name}</h4>
                        <p style={{ margin: '0 0 10px 0', fontSize: '0.8rem', color: '#64748b' }}>担当: {p.vendor}</p>
                        <button 
                          onClick={() => setIsReviewOpen(true)}
                          style={{ width: '100%', padding: '8px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(245, 158, 11, 0.2)' }}
                        >
                          写真確認・レビュー入力
                        </button>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <div className="mypage-header">
                  <h1>メッセージ・見積もり一覧</h1>
                  <p>業者とのやり取りや、届いた見積もりの確認はこちらから行えます。</p>
                </div>
                
                <div className="chat-list-container">
                  {mockChats.map(chat => (
                    <Link href={`/chat/${chat.id}`} key={chat.id} style={{ textDecoration: 'none' }}>
                      <div className="chat-list-card">
                        <img src={chat.vendorAvatar} alt={chat.vendorName} className="chat-list-avatar" />
                        <div className="chat-list-info">
                          <div className="chat-list-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span className="chat-list-vendor">{chat.vendorName}</span>
                              <span className={`chat-status-badge ${getStatusClass(chat.status)}`}>{chat.status}</span>
                            </div>
                            <span className="chat-list-date">{formatDate(chat.updatedAt)}</span>
                          </div>
                          <div className="chat-list-property">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                            {chat.propertyName}
                          </div>
                          <div className="chat-list-msg" style={{ fontWeight: chat.unreadCount > 0 ? 'bold' : 'normal', color: chat.unreadCount > 0 ? '#111' : '#666', marginBottom: '10px' }}>
                            {chat.lastMessage}
                          </div>
                          
                          {/* Urgent Plan Upgrade Action */}
                          {chat.status === '見積もり提案中' && (
                            <div style={{ marginTop: '10px', textAlign: 'right' }}>
                              <button 
                                onClick={(e) => {
                                  e.preventDefault(); // Prevent navigating to chat
                                  alert("【特急プラン決済フロー】\nStripeなどの決済画面へ遷移します。\n決済完了後、案件が「特急枠（優先表示）」に切り替わります。");
                                }}
                                className="btn btn-sm" 
                                style={{ background: '#fff0f0', color: '#ef4444', border: '1px solid #fca5a5', fontSize: '0.8rem', padding: '5px 12px', borderRadius: '15px', fontWeight: 'bold' }}
                              >
                                ⚡ 特急枠にアップグレード (¥1,000)
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                <div className="mypage-header">
                  <h1>お気に入り業者</h1>
                  <p>あなたが保存した業者の一覧です。</p>
                </div>
                <div className="results-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                  {mockServices.filter(s => mockUser.favorites.includes(s.id)).map(service => (
                    <div className="service-card" key={service.id}>
                      <div className="card-image-wrapper">
                        <img src={service.image} alt={service.title} className="card-image" />
                        <span className="card-category-badge">{service.category}</span>
                      </div>
                      <div className="card-content">
                        <h3 className="card-title" style={{ fontSize: '1rem' }}>{service.title}</h3>
                        <div className="provider-area" style={{ margin: '10px 0' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          <span>{service.providerName}</span>
                        </div>
                        <Link href={`/vendor/${service.id}`} className="btn-card-action" style={{ textAlign: 'center', display: 'block' }}>詳細を見る</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Properties Master Tab */}
            {activeTab === 'properties' && (
              <div>
                <div className="mypage-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h1>物件マスタ管理</h1>
                    <p>ワンクリック発注時に自動引用される、物件の詳細情報を管理します。</p>
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={() => setIsAddPropertyOpen(true)}>+ 新規物件を登録</button>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {mockOwnerProperties.map(p => (
                    <div key={p.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1e293b' }}>{p.name}</h3>
                          <span style={{ fontSize: '0.8rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: '12px', color: '#475569' }}>{p.type} / {p.size}㎡ / {p.bed}ベッド</span>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: '#64748b', flexWrap: 'wrap' }}>
                          <span><strong style={{color: '#334155'}}>鍵:</strong> スマートロック(連携済)</span>
                          <span><strong style={{color: '#334155'}}>ゴミ:</strong> 敷地内ステーション可</span>
                          <span><strong style={{color: '#334155'}}>マニュアル:</strong> <a href="#" style={{color: '#3b82f6'}}>PDF添付済</a></span>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          onClick={() => setIsWizardOpen(true)}
                          style={{ padding: '10px 20px', background: '#f97316', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(249, 115, 22, 0.3)', display: 'flex', alignItems: 'center', gap: '5px' }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                          この物件で一括依頼
                        </button>
                        <button style={{ padding: '10px', background: 'transparent', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer' }}>
                          編集
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Models Integration */}
      
      {/* 1. One-click Order Quote Wizard */}
      <QuoteWizardModal 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
        category={"定期清掃"} // In real app, prompt owner to select component
      />

      {/* 2. Add Property Modal */}
      {isAddPropertyOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f9fa' }}>
              <h2 style={{ fontSize: '1.2rem', margin: 0, color: '#333' }}>新規物件の登録</h2>
              <button onClick={() => setIsAddPropertyOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#888' }}>&times;</button>
            </div>
            <div style={{ padding: '20px', overflowY: 'auto' }}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>物件名</label>
                <input type="text" className="form-control" defaultValue="新宿新規物件" style={{ width: '100%', padding: '10px' }} />
              </div>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>間取り</label>
                  <select className="form-control" style={{ width: '100%', padding: '10px' }}>
                    <option>1R / 1K</option>
                    <option>1LDK / 2DK</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>広さ(平米)</label>
                  <input type="number" className="form-control" defaultValue="30" style={{ width: '100%', padding: '10px' }} />
                </div>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>鍵の受け渡し・保管方法 (セキュア情報)</label>
                <input type="text" className="form-control" defaultValue="スマートロック(RemoteLock)" style={{ width: '100%', padding: '10px' }} />
                <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '5px' }}>※業者が案件を承諾した後にのみ開示されます。</p>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>清掃マニュアル・間取り図</label>
                <input type="file" className="form-control" style={{ width: '100%', padding: '10px' }} />
              </div>
            </div>
            <div style={{ padding: '20px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', background: '#fff' }}>
              <button className="btn btn-primary" onClick={() => setIsAddPropertyOpen(false)}>マスタ情報を保存する</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Review & Work Report Modal */}
      {isReviewOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f9fa' }}>
              <h2 style={{ fontSize: '1.2rem', margin: 0, color: '#333' }}>作業完了報告の確認とレビュー</h2>
              <button onClick={() => setIsReviewOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#888' }}>&times;</button>
            </div>
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>業者からの報告作業写真 (Before/After)</h3>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <div style={{ flex: 1, height: '100px', background: '#eee', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>Before画像</div>
                <div style={{ flex: 1, height: '100px', background: '#eee', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>After画像</div>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px', padding: '10px', background: '#f1f5f9', borderRadius: '8px' }}>
                <b>業者からの報告メモ:</b><br/>
                「ベランダのゴミも回収完了しました。備品シャンプーの残量が少なくなっています。」
              </p>

              <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
              
              <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>この業者の評価 (1-5)</h3>
              <div style={{ display: 'flex', gap: '5px', fontSize: '1.5rem', color: '#fbbf24', marginBottom: '15px' }}>
                ★ ★ ★ ★ ☆
              </div>
              <textarea className="form-control" placeholder="次回の依頼に向けたコメントなど" style={{ width: '100%', minHeight: '80px', padding: '10px' }}></textarea>
            </div>
            <div style={{ padding: '20px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', background: '#fff' }}>
              <button 
                className="btn btn-primary" 
                style={{ background: '#10b981', borderColor: '#10b981' }}
                onClick={() => setIsReviewOpen(false)}
              >
                確認・レビューを送信して決済を確定
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

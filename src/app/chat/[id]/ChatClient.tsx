"use client";

import Link from "next/link";
import QuoteRequestForm from "../../vendor/[id]/QuoteRequestForm";

export default function ChatClient({ chat, mockChats }: { chat: any; mockChats: any[] }) {
  // Format utility
  const formatTime = (isoStr: string) => {
    const d = new Date(isoStr);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDateLabel = (isoStr: string) => {
    const d = new Date(isoStr);
    return `${d.getMonth() + 1}月${d.getDate()}日 (${['日','月','火','水','木','金','土'][d.getDay()]})`;
  };

  return (
    <>
      {/* Header */}
      <header className="header" style={{ borderBottom: '1px solid #eaeaea' }}>
        <div className="container header-inner">
          <div className="header-logo">
            <Link href="/">
              <img src="/assets/images/logo.png" alt="見つける君 ロゴ" />
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Link href="/mypage" style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none' }}>マイページへ戻る</Link>
          </div>
        </div>
      </header>

      <div className="chat-layout">
        {/* Left Sidebar: Thread List */}
        <aside className="chat-sidebar">
          <div className="chat-sidebar-header">
            <h2>メッセージ一覧</h2>
          </div>
          <div className="chat-thread-list">
            {mockChats.map(c => (
              <Link href={`/chat/${c.id}`} key={c.id} className={`chat-thread-item ${c.id === chat.id ? 'active' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#111' }}>{c.vendorName}</span>
                  {c.unreadCount > 0 && <span className="mypage-badge">{c.unreadCount}</span>}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {c.propertyName}
                </div>
              </Link>
            ))}
          </div>
        </aside>

        {/* Center: Chat Execution Area */}
        <main className="chat-main">
          {/* Main Chat Header */}
          <div className="chat-main-header">
            <div className="chat-vendor-info">
              <img src={chat.vendorAvatar} alt={chat.vendorName} />
              <div>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {chat.vendorName}
                  <span className="badge badge-feature" style={{ fontSize: '0.75rem', padding: '3px 8px' }}>{chat.status}</span>
                </h2>
                <span style={{ fontSize: '0.85rem', color: '#666' }}>物件: {chat.propertyName}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => alert("お気に入りに追加しました。")}
                className="btn btn-outline" 
                style={{ padding: '8px 15px', display: 'flex', alignItems: 'center', gap: '5px', borderRadius: '20px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#eb4d4b" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                お気に入り
              </button>
              <button 
                onClick={() => alert("このユーザーをブロックしました。今後メッセージは届きません。")}
                className="btn btn-outline" 
                style={{ padding: '8px 15px', display: 'flex', alignItems: 'center', gap: '5px', borderRadius: '20px', color: '#888', borderColor: '#ddd' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
                ブロック
              </button>
            </div>
          </div>

          <div className="chat-content-area">
            {/* Messages Scroll Area */}
            <div className="chat-messages-container">
              <div className="chat-messages-scroll">
                <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#888', margin: '10px 0' }}>
                  {formatDateLabel(chat.messages[0].timestamp)}
                </div>
                
                {chat.messages.map((msg: any) => (
                  <div key={msg.id} className={`message-bubble ${msg.sender === 'user' ? 'message-mine' : 'message-theirs'}`}>
                    {/* Simulated File Attachment */}
                    {msg.text.includes("ファイル") && (
                      <div style={{ background: 'rgba(0,0,0,0.05)', padding: '10px', borderRadius: '8px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        <span style={{ fontSize: '0.85rem', color: '#333' }}>添付ファイル.pdf</span>
                      </div>
                    )}
                    <div>{msg.text}</div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '5px', alignItems: 'center' }}>
                      <span className="message-time">{formatTime(msg.timestamp)}</span>
                      {/* Read status (LINE style) */}
                      {msg.sender === 'user' && (
                        <span style={{ fontSize: '0.7rem', color: '#888', marginTop: '2px' }}>既読</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Area */}
              <div className="chat-input-area" style={{ background: '#f8f9fa', padding: '15px' }}>
                <div className="chat-input-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', padding: '8px 15px', borderRadius: '25px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', color: '#888' }} onClick={() => alert("ファイル選択ダイアログを開きます")}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                  </button>
                  <textarea 
                    className="chat-input-textarea"
                    placeholder="メッセージを入力…"
                    style={{ flex: 1, border: 'none', background: 'transparent', resize: 'none', minHeight: '40px', padding: '10px 0', fontSize: '1rem', outline: 'none' }}
                  ></textarea>
                  <button className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '20px', background: '#00B900', border: 'none' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar: Quote Details (Mitsumore Style) */}
            <aside className="chat-quote-sidebar">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '2px solid #eaeaea', paddingBottom: '10px' }}>お見積り内容</h3>
              
              {chat.quote ? (
                <div className="quote-card">
                  <div className="quote-header">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '5px', verticalAlign: 'middle' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    安心の保証付き見積もり
                  </div>
                  <div className="quote-body">
                    <div className="quote-total">
                      ¥{chat.quote.total.toLocaleString()} <span>(税込)</span>
                    </div>
                    
                    <div style={{ marginTop: '20px' }}>
                      <h4 style={{ fontSize: '0.95rem', color: '#666', marginBottom: '10px' }}>料金内訳</h4>
                      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                        {chat.quote.breakdown.map((item: any, idx: number) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem', borderBottom: idx !== chat.quote.breakdown.length - 1 ? '1px dashed #ddd' : 'none', paddingBottom: idx !== chat.quote.breakdown.length - 1 ? '8px' : '0' }}>
                            <div>
                              <div style={{ fontWeight: '500', color: '#333' }}>{item.item}</div>
                              {item.quantity && item.unitPrice && (
                                <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '3px' }}>
                                  単価: ¥{item.unitPrice.toLocaleString()} × {item.quantity}
                                </div>
                              )}
                            </div>
                            <span style={{ fontWeight: 'bold', color: '#111' }}>¥{item.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.1rem', background: '#ff7f50', border: 'none' }}>
                          この内容で依頼を確定する
                        </button>
                        <button 
                          onClick={() => alert("【業者用機能】\n自動概算見積もりの金額や項目を編集し、再提示する画面が開きます。")}
                          className="btn btn-outline" 
                          style={{ width: '100%', padding: '10px', fontSize: '0.9rem', color: '#666', border: '1px solid #ccc' }}
                        >
                          業者の場合: 見積もり内容を修正・再提示
                        </button>
                      </div>

                    {/* Interactive Quote Editor */}
                    <div style={{ marginTop: '20px', borderTop: '1px solid #eaeaea', paddingTop: '15px' }}>
                      <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '10px' }}>条件を変更して見積もりを再計算する：</p>
                      <QuoteRequestForm vendorId={chat.vendorId.toString()} basePrice={chat.quote.total - 1500} />
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '30px', textAlign: 'center', background: '#f8f9fa', borderRadius: '8px', color: '#666' }}>
                  現在お見積りを算出中です。<br/>しばらくお待ちください。
                </div>
              )}
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}

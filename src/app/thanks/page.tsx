import Link from 'next/link';

export default function ThanksPage() {
  return (
    <>
      <header className="header" style={{ borderBottom: '1px solid #eaeaea' }}>
        <div className="container header-inner">
          <div className="header-logo">
            <Link href="/">
              <img src="/assets/images/logo.png" alt="見つける君 ロゴ" />
            </Link>
          </div>
        </div>
      </header>
      <main style={{ background: '#f8f9fa', minHeight: 'calc(100vh - 70px)', paddingTop: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'white', padding: '40px', margin: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', textAlign: 'center', maxWidth: '500px', width: '100%' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📩</div>
          <h1 style={{ fontSize: '1.5rem', color: '#1E40AF', marginBottom: '15px', fontWeight: 'bold' }}>お見積り依頼を受け付けました</h1>
          <p style={{ color: '#4B5563', lineHeight: '1.6', marginBottom: '30px', fontSize: '1.05rem' }}>
            ご依頼ありがとうございます。<br/>
            業者から順次お見積りが届きますので、<br/>
            マイページにて<strong>お見積りをお待ちください。</strong>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Link 
              href="/mypage" 
              style={{
                display: 'block',
                background: '#EA580C',
                color: 'white',
                padding: '15px',
                borderRadius: '999px',
                fontWeight: 'bold',
                textDecoration: 'none',
                boxShadow: '0 4px 14px 0 rgba(234, 88, 12, 0.39)',
                transition: 'all 0.3s ease'
              }}
            >
              マイページで確認する
            </Link>
            <Link 
              href="/" 
              style={{
                display: 'block',
                background: 'transparent',
                color: '#4B5563',
                padding: '15px',
                borderRadius: '999px',
                fontWeight: 'bold',
                textDecoration: 'none',
                border: '1px solid #E5E7EB',
                transition: 'all 0.3s ease'
              }}
            >
              トップページに戻る
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

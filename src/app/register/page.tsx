import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export default function Register() {
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container header-inner">
          <div className="header-logo">
            <Link href="/">
              <Image src="/assets/images/logo.png" alt="見つける君 ロゴ" width={150} height={40} />
            </Link>
          </div>
          <nav className="header-nav">
            <Link href="/" className="btn btn-outline btn-sm">トップへ戻る</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="page-main">
        <section className="section form-section">
          <div className="container container-sm">
            <div className="form-wrapper card">
              <div className="form-header text-center">
                <h1 className="form-title">無料オーナー事前登録</h1>
                <p className="form-desc text-muted mt-2">
                  以下のフォームに必要事項をご入力の上、送信してください。<br />
                  ご登録後、担当者より詳細をご案内いたします。
                </p>
              </div>

              <form action="mailto:satoru@inkyouup.co.jp?subject=事前登録のお申し込み" method="POST" encType="text/plain" className="register-form mt-4 h-adr">
                <span className="p-country-name" style={{ display: "none" }}>Japan</span>

                <div className="form-group row">
                  <div className="col-12">
                    <label htmlFor="companyName" className="form-label">会社名 <span className="badge badge-optional">任意</span></label>
                    <input type="text" id="companyName" name="会社名" className="form-control" placeholder="例：株式会社○○" />
                  </div>
                </div>

                <div className="form-group row mt-3">
                  <div className="col-12">
                    <label htmlFor="fullName" className="form-label">お名前 <span className="badge badge-required">必須</span></label>
                    <input type="text" id="fullName" name="お名前" className="form-control" placeholder="例：山田 太郎" required />
                  </div>
                </div>

                <fieldset className="form-group mt-3">
                  <legend className="form-label">物件所在地 <span className="badge badge-required">必須</span></legend>
                  <div className="row mt-1 mb-2">
                    <div className="col-12 col-md-5">
                      <input type="text" name="郵便番号" className="form-control p-postal-code" placeholder="郵便番号（ハイフンなし）" maxLength={8} />
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-12 col-md-4">
                      <select name="物件所在地_都道府県" className="form-control p-region" required defaultValue="">
                        <option value="" disabled>都道府県を選択</option>
                        <option value="北海道">北海道</option><option value="青森県">青森県</option><option value="岩手県">岩手県</option>
                        <option value="宮城県">宮城県</option><option value="秋田県">秋田県</option><option value="山形県">山形県</option>
                        <option value="福島県">福島県</option><option value="茨城県">茨城県</option><option value="栃木県">栃木県</option>
                        <option value="群馬県">群馬県</option><option value="埼玉県">埼玉県</option><option value="千葉県">千葉県</option>
                        <option value="東京都">東京都</option><option value="神奈川県">神奈川県</option><option value="新潟県">新潟県</option>
                        <option value="富山県">富山県</option><option value="石川県">石川県</option><option value="福井県">福井県</option>
                        <option value="山梨県">山梨県</option><option value="長野県">長野県</option><option value="岐阜県">岐阜県</option>
                        <option value="静岡県">静岡県</option><option value="愛知県">愛知県</option><option value="三重県">三重県</option>
                        <option value="滋賀県">滋賀県</option><option value="京都府">京都府</option><option value="大阪府">大阪府</option>
                        <option value="兵庫県">兵庫県</option><option value="奈良県">奈良県</option><option value="和歌山県">和歌山県</option>
                        <option value="鳥取県">鳥取県</option><option value="島根県">島根県</option><option value="岡山県">岡山県</option>
                        <option value="広島県">広島県</option><option value="山口県">山口県</option><option value="徳島県">徳島県</option>
                        <option value="香川県">香川県</option><option value="愛媛県">愛媛県</option><option value="高知県">高知県</option>
                        <option value="福岡県">福岡県</option><option value="佐賀県">佐賀県</option><option value="長崎県">長崎県</option>
                        <option value="熊本県">熊本県</option><option value="大分県">大分県</option><option value="宮崎県">宮崎県</option>
                        <option value="鹿児島県">鹿児島県</option><option value="沖縄県">沖縄県</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-8 mt-2 mt-md-0">
                      <input type="text" name="物件所在地_市区町村" className="form-control p-locality p-street-address" placeholder="例：渋谷区神南" required />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-12">
                      <input type="text" name="物件所在地_番地等" className="form-control" placeholder="例：1-2-3 ××ビル階室" required />
                    </div>
                  </div>
                </fieldset>

                <div className="form-group mt-3">
                  <label className="form-label">物件タイプ <span className="badge badge-required">必須</span></label>
                  <div className="radio-group mt-2">
                    <label className="radio-label">
                      <input type="radio" name="物件タイプ" value="戸建て" required />
                      <span className="custom-radio"></span> 戸建て
                    </label>
                    <label className="radio-label">
                      <input type="radio" name="物件タイプ" value="マンション" required />
                      <span className="custom-radio"></span> マンション
                    </label>
                    <label className="radio-label">
                      <input type="radio" name="物件タイプ" value="その他" required />
                      <span className="custom-radio"></span> その他
                    </label>
                  </div>
                </div>

                <div className="form-group row mt-3">
                  <div className="col-12">
                    <label htmlFor="phone" className="form-label">電話番号 <span className="badge badge-required">必須</span></label>
                    <input type="tel" id="phone" name="電話番号" className="form-control" placeholder="例：090-1234-5678" required />
                  </div>
                </div>

                <div className="form-group row mt-3">
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">メールアドレス <span className="badge badge-required">必須</span></label>
                    <input type="email" id="email" name="メールアドレス" className="form-control" placeholder="例：example@domain.com" required />
                  </div>
                </div>

                <div className="form-submit mt-5 text-center">
                  <button type="submit" className="btn btn-primary btn-lg btn-block">上記の内容で送信する</button>
                  <p className="text-xs text-muted mt-2">※送信ボタンを押すと、ご利用のメールソフトが起動します。</p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer mt-0">
        <div className="container">
          <div className="footer-links">
            <Link href="#">運営会社</Link>
            <Link href="#">利用規約</Link>
            <Link href="#">プライバシーポリシー</Link>
          </div>
          <p className="copyright">&copy; 2026 見つける君 All rights reserved.</p>
        </div>
      </footer>

      {/* 住所自動入力ライブラリ */}
      <Script src="https://yubinbango.github.io/yubinbango/yubinbango.js" strategy="lazyOnload" />
    </>
  );
}

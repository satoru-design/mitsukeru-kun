import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Building2, User, MapPin, Home, Phone, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Register() {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Left Visual Panel */}
      <div className="hidden md:flex flex-col md:w-5/12 lg:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        <div className="relative z-10 p-12 flex flex-col h-full justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-16 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xl italic tracking-tighter">M</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">見つける<span className="text-orange-500">君</span></span>
            </Link>
            <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-6">
              オーナー登録をして<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                理想のパートナーと
              </span><br/>
              出会いましょう
            </h1>
            <p className="text-gray-300 font-bold text-lg leading-relaxed max-w-md">
              登録はわずか1分。全国の厳選された清掃・リフォーム・害虫駆除のプロフェッショナルがあなたを待っています。
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-white">厳格な本人確認</h4>
                <p className="text-xs text-gray-400 font-medium">全ての業者は身元保証・資格確認済み</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="font-bold text-white">事前見積もり保証</h4>
                <p className="text-xs text-gray-400 font-medium">追加料金なし。透明性のある価格提示</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col h-full min-h-screen bg-[#F8FAFC]">
        <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24">
          
          <div className="md:hidden flex items-center justify-center gap-2 mb-10">
            <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-black text-lg italic tracking-tighter">M</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900">見つける<span className="text-orange-500">君</span></span>
          </div>

          <div className="max-w-xl w-full mx-auto">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">無料オーナー登録</h2>
              <p className="mt-3 text-sm font-bold text-gray-500">以下の項目を入力し、プラットフォームに参加してください。</p>
            </div>

            <form action="/thanks" method="GET" className="space-y-6 h-adr">
              <span className="p-country-name" style={{ display: "none" }}>Japan</span>
              
              {/* Company / Name */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="companyName" className="flex items-center gap-2 text-sm font-black text-gray-900">
                    <Building2 className="w-4 h-4 text-gray-400" /> 会社名 <span className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded">任意</span>
                  </label>
                  <input type="text" id="companyName" name="会社名" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all shadow-sm" placeholder="例: 株式会社○○" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-black text-gray-900">
                    <User className="w-4 h-4 text-gray-400" /> お名前 <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded">必須</span>
                  </label>
                  <input type="text" id="fullName" name="お名前" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all shadow-sm" placeholder="例: 山田 太郎" />
                </div>
              </div>

              {/* Address Fieldset */}
              <fieldset className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                <legend className="text-sm font-black text-gray-900 px-2 -mb-2 bg-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-500" /> 物件所在地 <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded">必須</span>
                </legend>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500">郵便番号</label>
                    <input type="text" name="郵便番号" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold p-postal-code focus:bg-white focus:border-orange-500 outline-none transition-all" placeholder="ハイフンなし (例: 1500041)" maxLength={8} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500">都道府県</label>
                    <div className="relative">
                      <select name="物件所在地_都道府県" required defaultValue="" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold p-region focus:bg-white focus:border-orange-500 outline-none transition-all appearance-none text-gray-900">
                        <option value="" disabled>選択してください</option>
                        <option value="北海道">北海道</option><option value="東京都">東京都</option><option value="神奈川県">神奈川県</option><option value="大阪府">大阪府</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500">市区町村・番地</label>
                  <input type="text" name="物件所在地_市区町村" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold p-locality p-street-address focus:bg-white focus:border-orange-500 outline-none transition-all" placeholder="例：渋谷区神南1-2-3" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500">建物名・部屋番号 <span className="font-normal text-[10px]">(任意)</span></label>
                  <input type="text" name="物件所在地_番地等" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:border-orange-500 outline-none transition-all" placeholder="例：××ビル 301号室" />
                </div>
              </fieldset>

              {/* Property Type */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-black text-gray-900">
                  <Home className="w-4 h-4 text-gray-400" /> 物件タイプ <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded">必須</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['戸建て', 'マンション', 'その他'].map((type, i) => (
                    <label key={i} className="flex relative items-center justify-center p-3 sm:p-4 rounded-xl border border-gray-200 cursor-pointer bg-white transition-all hover:border-orange-300 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50 has-[:checked]:shadow-sm">
                      <input type="radio" name="物件タイプ" value={type} required className="sr-only" />
                      <span className="text-sm font-black text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="flex items-center gap-2 text-sm font-black text-gray-900">
                  <Phone className="w-4 h-4 text-gray-400" /> 電話番号 <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded">必須</span>
                </label>
                <input type="tel" id="phone" name="電話番号" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm" placeholder="例: 090-1234-5678" />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center gap-2 text-sm font-black text-gray-900">
                  <Mail className="w-4 h-4 text-gray-400" /> メールアドレス <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded">必須</span>
                </label>
                <input type="email" id="email" name="メールアドレス" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm" placeholder="例: example@domain.com" />
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black text-lg py-4 rounded-2xl shadow-[0_8px_20px_rgba(234,88,12,0.3)] hover:shadow-[0_10px_25px_rgba(234,88,12,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  無料登録を完了する <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-xs font-bold text-gray-400 text-center mt-4">
                  登録することにより、<Link href="#" className="text-orange-500 hover:underline">利用規約</Link>および<Link href="#" className="text-orange-500 hover:underline">プライバシーポリシー</Link>に同意したものとみなされます。
                </p>
              </div>
            </form>
          </div>

        </div>
        
        {/* Simple Footer */}
        <footer className="py-6 text-center text-xs font-bold text-gray-400 border-t border-gray-200 bg-white">
          &copy; 2026 見つける君 All rights reserved.
        </footer>
      </div>

      {/* 住所自動入力ライブラリ */}
      <Script src="https://yubinbango.github.io/yubinbango/yubinbango.js" strategy="lazyOnload" />
    </div>
  );
}

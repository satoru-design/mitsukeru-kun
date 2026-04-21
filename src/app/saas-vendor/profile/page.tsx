"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Image as ImageIcon, 
  MapPin, 
  Tag, 
  CreditCard,
  Plus,
  Save,
  Trash2,
  CheckCircle2,
  ChevronLeft,
  Info,
  ShieldCheck,
  Star
} from 'lucide-react';

export default function VendorProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans selection:bg-blue-500 selection:text-white pb-20">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4 max-w-[1200px] mx-auto w-full">
          <Link href="/vendor-admin" className="text-gray-500 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2">
              <UserCircleIcon className="w-6 h-6 text-blue-600" /> パブリックプロフィール設定
            </h1>
          </div>
          
          <div className="ml-auto">
            <button 
              onClick={handleSave}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-black transition-all shadow-md transform hover:-translate-y-0.5
                ${isSaved 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30'
                }
              `}
            >
              {isSaved ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
              <span className="hidden sm:inline">{isSaved ? '保存が完了しました' : '設定を反映する'}</span>
              <span className="sm:hidden">{isSaved ? '保存済' : '保存'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 sm:px-8 mt-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Info Panel */}
        <div className="md:w-80 shrink-0">
          <div className="sticky top-28 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
               <div className="w-20 h-20 bg-gradient-to-tr from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-gray-400 mb-4 shadow-inner ring-1 ring-gray-200 overflow-hidden">
                 <Building2 className="w-8 h-8" />
               </div>
               <h2 className="text-lg font-black text-gray-900 mb-1">リベンライズ株式会社</h2>
               <p className="text-sm font-bold text-gray-500 mb-4 flex items-center gap-1">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" /> 本人確認済プロ
               </p>
               
               <div className="pt-4 border-t border-gray-100">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-xs font-bold text-gray-500">プロフィール充実度</span>
                   <span className="text-xs font-black text-blue-600">85%</span>
                 </div>
                 <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 rounded-full w-[85%]"></div>
                 </div>
               </div>
            </div>

            <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 flex gap-4">
              <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-black text-blue-900 mb-1">集客力アップのコツ</h4>
                <p className="text-xs font-bold text-blue-700/80 leading-relaxed">
                  プロフィール情報が充実している業者は、検索結果での表示順位が上がりやすく、成約率が最大3倍に向上します。全ての項目を埋めることを推奨します。
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Editor Area */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
            
            {/* Nav Tabs */}
            <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar px-2 sm:px-6 shrink-0 bg-gray-50/50">
              {[
                { id: 'basic', label: '基本情報・紹介文' },
                { id: 'images', label: '写真・実績ギャラリー' },
                { id: 'tags', label: '特徴・エリア・支払い' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-4 sm:px-6 py-5 text-sm font-black transition-all whitespace-nowrap relative
                    ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400 hover:text-gray-700'}
                  `}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full relative shadow-[0_-2px_10px_rgba(37,99,235,0.2)]"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Editor Content */}
            <div className="p-6 sm:p-10 flex-1 overflow-y-auto bg-white">
              
              {activeTab === 'basic' && (
                <div className="space-y-8 animate-in fade-in duration-300 max-w-2xl">
                  
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-black text-gray-900">
                      屋号 / 会社名 <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded">必須</span>
                    </label>
                    <input type="text" defaultValue="リベンライズ株式会社" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-black text-gray-900">
                      キャッチコピー <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded">必須</span>
                    </label>
                    <input type="text" defaultValue="【定期清掃】定期的な特別清掃は弊社リベンライズにおまかせ下さい。" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" placeholder="例: 経験豊富！丁寧で迅速な対応をお約束します" />
                    <p className="text-xs font-bold text-gray-400 pl-1">※検索一覧で一番大きく表示されます（最大40文字）</p>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-black text-gray-900">
                      事業内容・代表者挨拶 <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded">必須</span>
                    </label>
                    <textarea 
                      rows={6} 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-y"
                      defaultValue={`こんにちは、リベンライズ株式会社と申します。\n\n普段民泊として利用している客室も定期的（3ヶ月〜半年に1度が目安）な特別清掃は必須です。(水回り・窓、冊子、ベランダ、エアコン洗浄など)\n\n蓄積した汚れは普段の簡易清掃では綺麗になりません...そんな時はハウスクリーニング・水回りクリーニングを専門にしている弊社にお任せ下さい！`}
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-black text-gray-900 text-gray-700">アピールポイント</label>
                    <textarea 
                      rows={4} 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-y"
                      defaultValue={`ホテル業界出身の私達は清掃に関しては一切妥協しません。\n多種多様な薬剤テストを繰り返し行い、素材を傷つけることなく汚れを落とす方法を常に追求しています。`}
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                    <div className="space-y-2">
                      <label className="block text-xs font-black text-gray-500 uppercase">業界経験年数</label>
                      <div className="flex items-center">
                        <input type="number" defaultValue="5" className="w-24 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:border-blue-500 outline-none" text-center />
                        <span className="ml-3 text-sm font-bold text-gray-500">年</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-black text-gray-500 uppercase">従業員数</label>
                      <div className="flex items-center">
                        <input type="number" defaultValue="6" className="w-24 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:border-blue-500 outline-none text-center" />
                        <span className="ml-3 text-sm font-bold text-gray-500">人</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {activeTab === 'images' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex items-start gap-4">
                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                       <ImageIcon className="h-5 w-5 text-gray-400" />
                     </div>
                     <div>
                       <h4 className="text-sm font-black text-gray-900 mb-1">施工実績の画像をアップロード</h4>
                       <p className="text-xs font-bold text-gray-500 leading-relaxed">
                         作業前後のBefore/After写真や、スタッフの顔写真などを掲載すると成約率が大幅にアップします。最も特徴的な写真を「メイン画像」に設定してください。（最大10枚）
                       </p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Mock Images */}
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden border-2 border-transparent hover:border-blue-500 group shadow-sm transition-all focus-within:ring-4 focus-within:ring-blue-100 cursor-pointer">
                        <img src={`https://picsum.photos/seed/${item * 10}/400`} alt="gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        
                        {item === 1 && (
                           <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-sm border border-blue-500">
                             メイン写真
                           </div>
                        )}
                        <button className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                          <span className="text-white text-xs font-bold shadow-sm">ドラッグして並べ替え</span>
                        </div>
                      </div>
                    ))}
                    
                    {/* Upload Button */}
                    <button className="aspect-square bg-white border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 transition-colors group">
                      <div className="w-12 h-12 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center mb-3 transition-colors">
                        <Plus className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-black">写真を追加</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'tags' && (
                <div className="space-y-10 animate-in fade-in duration-300">
                  
                  {/* Features / Badges */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                        <Tag className="h-4 w-4 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-black text-gray-900">プロの特徴タグ</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                      {[
                        { label: '損害保険あり', active: true }, { label: '経験5年以上', active: true },
                        { label: '深夜料金なし', active: true }, { label: '夜間対応可', active: true },
                        { label: '作業外注なし', active: true }, { label: 'マスク着用', active: true },
                        { label: '女性スタッフ同行可', active: false }, { label: '英語対応可', active: false }
                      ].map((tag, i) => (
                        <label key={i} className={`
                          flex justify-center items-center p-4 rounded-2xl border-2 cursor-pointer transition-all active:scale-95
                          ${tag.active ? 'bg-blue-50 border-blue-500 shadow-[0_4px_12px_rgba(37,99,235,0.1)]' : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                        `}>
                          <input type="checkbox" defaultChecked={tag.active} className="peer sr-only" />
                          <div className={`w-5 h-5 border-2 rounded shrink-0 mr-3 flex items-center justify-center transition-colors ${tag.active ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                            {tag.active && <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />}
                          </div>
                          <span className={`text-sm font-black ${tag.active ? 'text-blue-900' : 'text-gray-600'}`}>{tag.label}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  <div className="border-t border-gray-100"></div>

                  {/* Service Areas */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                      </div>
                      <h3 className="text-lg font-black text-gray-900">対応可能なエリア</h3>
                      <button className="ml-auto flex items-center gap-1.5 text-xs font-black text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors">
                        <Plus className="w-3.5 h-3.5" /> エリア追加
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-black text-gray-900 bg-gray-100 px-3 py-1 rounded-md">東京都</span>
                          <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4"/></button>
                        </div>
                        <p className="text-sm font-bold text-gray-500 leading-relaxed pl-1">
                          大田区 / 品川区 / 世田谷区 / 目黒区 / 狛江区 / 稲城市 / 港区 / 調布市 / 町田市 / 三鷹市 / 多摩市 / 杉並区 / 中野区 / 府中市 / 新宿区
                        </p>
                      </div>
                      <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-black text-gray-900 bg-gray-100 px-3 py-1 rounded-md">神奈川県</span>
                          <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4"/></button>
                        </div>
                        <p className="text-sm font-bold text-gray-500 leading-relaxed pl-1">
                          横浜市 / 川崎市 / 相模原市 / 横須賀市 / 平塚市 / 鎌倉市 / 藤沢市 / 小田原市
                        </p>
                      </div>
                    </div>
                  </section>

                  <div className="border-t border-gray-100"></div>

                  {/* Payment Methods */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-amber-600" />
                      </div>
                      <h3 className="text-lg font-black text-gray-900">対応可能な決済手段</h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { label: 'クレジットカード', sub: 'システム経由', active: true },
                        { label: '現地現金決済', sub: '領収書必須', active: true },
                        { label: '後払い (Paid)', sub: '翌月末払い', active: true },
                        { label: '銀行振込', sub: '請求書払い対応', active: false }
                      ].map((method, i) => (
                        <label key={i} className={`
                          flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all active:scale-95 min-w-[200px]
                          ${method.active ? 'bg-amber-50 border-amber-400 shadow-sm' : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                        `}>
                          <input type="checkbox" defaultChecked={method.active} className="peer sr-only" />
                          <div className={`w-5 h-5 border-2 rounded shrink-0 mr-4 flex items-center justify-center transition-colors ${method.active ? 'bg-amber-500 border-amber-500' : 'bg-white border-gray-300'}`}>
                            {method.active && <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />}
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-sm font-black ${method.active ? 'text-amber-900' : 'text-gray-600'}`}>{method.label}</span>
                            <span className={`text-[10px] font-bold mt-0.5 ${method.active ? 'text-amber-700/80' : 'text-gray-400'}`}>{method.sub}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </section>
                  
                </div>
              )}

            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

function UserCircleIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}

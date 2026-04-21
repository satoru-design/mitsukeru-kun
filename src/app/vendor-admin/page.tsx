"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  AlertCircle, Clock, MessageSquare, 
  Settings, UserCircle, Star, Target, TrendingUp, Filter, Search,
  Zap, Calendar, MapPin, Building2, ChevronRight, CheckCircle2, ShieldCheck, PieChart, Wallet
} from "lucide-react";

export default function VendorAdminDashboard() {
  const [activeTab, setActiveTab] = useState("案件管理 (Kanban)");

  // --- Profile Gamification Data ---
  const profileCompleteness = 85;
  const missingTasks = [
    { title: "施工事例の写真をあと2枚追加", points: 10, url: "/saas-vendor/profile" },
    { title: "資格証明書の再提出", points: 5, url: "/saas-vendor/profile" }
  ];

  // --- Kanban Board Data (Mock CRM) ---
  const [columns, setColumns] = useState([
    {
      id: "new",
      title: "新規問合せ",
      icon: <Zap />,
      color: "from-rose-500 to-red-500",
      bgClass: "bg-rose-50",
      borderClass: "border-rose-200",
      textClass: "text-rose-700",
      cards: [
        { id: 1, client: "田中太郎 様", property: "新宿区 1LDK", date: "今日 14:30", amount: "¥15,000", unread: 1, type: "定期清掃", statusLabel: "査定中" },
        { id: 2, client: "株式会社ホスト", property: "渋谷ビル 空室清掃", date: "今日 10:15", amount: "未定", unread: 0, type: "不用品回収", statusLabel: "新規" }
      ]
    },
    {
      id: "negotiating",
      title: "交渉中 / 見積提示済",
      icon: <MessageSquare />,
      color: "from-blue-500 to-indigo-500",
      bgClass: "bg-blue-50",
      borderClass: "border-blue-200",
      textClass: "text-blue-700",
      cards: [
        { id: 3, client: "佐藤花子 様", property: "世田谷区 戸建て", date: "昨日", amount: "¥35,000", unread: 0, type: "写真撮影", statusLabel: "返答待ち" }
      ]
    },
    {
      id: "contracted",
      title: "受注確定 / 作業待ち",
      icon: <Calendar />,
      color: "from-orange-500 to-amber-500",
      bgClass: "bg-orange-50",
      borderClass: "border-orange-200",
      textClass: "text-orange-700",
      cards: [
        { id: 4, client: "高橋次郎 様", property: "品川区 マンション", date: "3日前", amount: "¥18,000", unread: 0, type: "鍵交換", statusLabel: "手配済" },
        { id: 5, client: "鈴木不動産", property: "浅草 特区民泊", date: "先週", amount: "¥120,000", unread: 2, type: "民泊完全代行", statusLabel: "急ぎ" }
      ]
    },
    {
      id: "completed",
      title: "作業完了 / 入金待ち",
      icon: <CheckCircle2 />,
      color: "from-emerald-500 to-teal-500",
      bgClass: "bg-emerald-50",
      borderClass: "border-emerald-200",
      textClass: "text-emerald-700",
      cards: [
        { id: 6, client: "渡辺様", property: "目黒区 アパート", date: "2週間前", amount: "¥22,000", unread: 0, type: "定期清掃", statusLabel: "完了" }
      ]
    }
  ]);

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 text-white px-4 sm:px-8 py-4 flex items-center justify-between z-30 shrink-0 sticky top-0 shadow-lg">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-lg italic tracking-tighter">M</span>
            </div>
            <span className="text-xl font-black tracking-tight flex items-center gap-2">
              見つける君 <span className="hidden sm:inline-block bg-white/20 text-white/90 text-[10px] px-2 py-0.5 rounded font-black tracking-wider uppercase">Vendor SaaS</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/saas-vendor/profile" className="hidden sm:flex text-sm font-bold text-gray-300 hover:text-white transition-colors items-center gap-1">
            プロフィール設定
          </Link>
          <div className="w-px h-6 bg-gray-700 hidden sm:block"></div>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
               <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ログイン中</div>
               <div className="text-sm font-bold">リベンライズ株式会社</div>
             </div>
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center border-2 border-gray-800 relative cursor-pointer hover:border-orange-500 transition-colors shadow-inner">
               <span className="text-white font-bold text-sm">R</span>
               <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-gray-900 rounded-full animate-pulse"></span>
             </div>
          </div>
        </div>
      </header>

      {/* Top Banner (Gamification) */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 sm:px-8 py-8 shrink-0 relative overflow-hidden border-b border-gray-800 shadow-sm">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-8 relative z-10">
          
          <div className="flex-1 w-full text-center xl:text-left">
            <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 backdrop-blur-sm shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 公式認定プロフェッショナル
            </div>
            <div className="flex items-center justify-center xl:justify-start gap-2 mb-3">
              <Star className="w-7 h-7 text-amber-400 fill-amber-400 drop-shadow-sm" />
              <h2 className="text-3xl font-black tracking-tight">リベンライズ株式会社 <span className="text-xl font-medium text-gray-400">様</span></h2>
            </div>
            <p className="text-gray-300 font-medium text-sm sm:text-base">現在、地域検索でのアルゴリズム評価順位は <strong className="text-amber-400 text-lg sm:text-xl px-1">Sランク直前 (A+)</strong> です。</p>
          </div>
          
          <div className="w-full xl:w-auto bg-white/10 rounded-3xl p-5 sm:p-6 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 shadow-2xl">
             <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-lg" viewBox="0 0 36 36">
                  <path strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-700/50" />
                  <path strokeDasharray={`${profileCompleteness}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-[10px] font-black text-gray-400 leading-none uppercase tracking-widest mb-1">充実度</span>
                  <span className="text-2xl sm:text-3xl font-black leading-none tracking-tighter text-white">{profileCompleteness}<span className="text-base font-bold text-gray-400">%</span></span>
                </div>
             </div>
             
             <div className="flex-1 w-full text-center sm:text-left">
               <p className="text-sm font-black text-white mb-4 bg-orange-500/20 border border-orange-500/30 px-3 py-1.5 rounded-lg inline-block">
                 🔥 あと少しで最上位の『Sランク』です！
               </p>
               <div className="flex flex-col gap-2 relative">
                 {missingTasks.map((task, i) => (
                   <Link key={i} href={task.url} className="text-xs flex items-center justify-between bg-black/20 hover:bg-black/40 px-4 py-2.5 rounded-xl transition-all font-bold border border-white/5 group">
                     <span className="text-gray-300 group-hover:text-white transition-colors">{task.title}</span>
                     <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-0.5 rounded-md text-[10px] font-black shrink-0 ml-3 shadow-md group-hover:scale-110 transition-transform">+{task.points}%</span>
                   </Link>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-4 sm:px-8 shrink-0 sticky top-[72px] z-20 shadow-sm">
        <div className="max-w-[1600px] mx-auto flex gap-2 sm:gap-6 overflow-x-auto no-scrollbar">
          {["案件管理 (Kanban)", "チャット", "プロフィール設定", "自動料金マスタ", "売上・分析"].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                flex items-center gap-2 px-3 py-4 sm:px-1 sm:py-5 font-black text-sm transition-all whitespace-nowrap relative
                ${activeTab === tab 
                  ? "text-gray-900" 
                  : "text-gray-400 hover:text-gray-700"
                }
              `}
            >
              {tab === "案件管理 (Kanban)" && <Target className="w-4 h-4" />}
              {tab === "チャット" && <MessageSquare className="w-4 h-4" />}
              {tab === "売上・分析" && <PieChart className="w-4 h-4" />}
              {tab === "自動料金マスタ" && <Settings className="w-4 h-4" />}
              {tab === "プロフィール設定" && <UserCircle className="w-4 h-4" />}
              {tab}
              
              {(tab === "案件管理 (Kanban)" || tab === "チャット") && (
                <span className="bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center -ml-1 shadow-sm">1</span>
              )}
              
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 rounded-t-full relative shadow-[0_-2px_10px_rgba(0,0,0,0.1)]"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Body */}
      <main className="flex-1 overflow-x-auto overflow-y-auto p-4 sm:p-8">
        <div className="max-w-[1600px] mx-auto h-full flex flex-col">
          
          {activeTab === "案件管理 (Kanban)" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
              
              {/* Kanban Utility Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 shrink-0 bg-white p-4 rounded-2xl shadow-sm border border-gray-200 gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="顧客名、タスク名で検索..." className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
                  </div>
                  <button className="flex items-center justify-center w-10 h-10 sm:w-auto sm:px-4 sm:py-2.5 gap-2 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm shrink-0">
                    <Filter className="w-4 h-4" /> <span className="hidden sm:inline">絞り込み</span>
                  </button>
                </div>
                <div className="text-sm font-bold text-gray-500 flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                  <Wallet className="w-4 h-4 text-gray-400" />
                  見込総額 <span className="text-gray-900 text-lg font-black tracking-tight ml-1">¥190,000</span>
                </div>
              </div>

              {/* Kanban Board Area */}
              <div className="flex gap-4 sm:gap-6 h-full min-h-[600px] pb-4 overflow-x-auto snap-x">
                {columns.map(col => (
                  <div key={col.id} className="snap-start flex flex-col w-[300px] sm:w-[340px] shrink-0 bg-gray-100/50 rounded-3xl border border-gray-200/60 shadow-inner overflow-hidden relative">
                     {/* Column Header */}
                    <div className="p-5 flex justify-between items-center bg-white/50 backdrop-blur-sm border-b border-gray-200/80">
                      <div className="flex items-center gap-2">
                         <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${col.color} text-white flex items-center justify-center shadow-sm`}>
                           {(() => {
                             const Icon = col.icon.type;
                             return <Icon className="w-4 h-4" />;
                           })()}
                         </div>
                         <h3 className="font-black text-gray-900 text-sm tracking-wide">{col.title}</h3>
                      </div>
                      <span className="bg-white text-gray-900 font-black text-xs px-2.5 py-1 rounded-lg shadow-sm border border-gray-100">{col.cards.length}</span>
                    </div>
                    
                    {/* Column Body (Drop Zone) */}
                    <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto">
                      {col.cards.map(card => (
                        <div key={card.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 cursor-grab hover:shadow-lg hover:border-orange-200 transition-all duration-300 group relative">
                          {col.id === "new" && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-rose-500 rounded-l-2xl"></div>}
                          {col.id === "negotiating" && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-l-2xl"></div>}
                          {col.id === "contracted" && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500 rounded-l-2xl"></div>}
                          {col.id === "completed" && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 rounded-l-2xl"></div>}

                          <div className="flex justify-between items-start mb-3">
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border tracking-wider ${col.bgClass} ${col.textClass} ${col.borderClass}`}>
                              {card.statusLabel}
                            </span>
                            {card.unread > 0 ? (
                              <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm animate-pulse">
                                <AlertCircle className="w-3 h-3" /> 未読 {card.unread}
                              </span>
                            ) : (
                               <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                                 <Clock className="w-3 h-3" /> {card.date}
                               </span>
                            )}
                          </div>
                          
                          <h4 className="font-black text-gray-900 text-base mb-1 group-hover:text-orange-600 transition-colors">{card.client}</h4>
                          <p className="text-xs font-bold text-gray-500 mb-4 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-gray-400" /> {card.property}
                          </p>
                          
                          <div className="flex justify-between items-end mb-4">
                            <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded inline-block">{card.type}</span>
                            <div className="font-black text-sm text-gray-900 tracking-tight">{card.amount}</div>
                          </div>
                   
                          <Link href="/chat/1" className="w-full bg-white hover:bg-orange-50 text-gray-700 hover:text-orange-700 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-gray-200 hover:border-orange-200 shadow-sm">
                            <MessageSquare className="w-3.5 h-3.5" /> 案件ボードを開く
                          </Link>
                        </div>
                      ))}
                      
                      {col.cards.length === 0 && (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-xs font-bold border-2 border-dashed border-gray-200 bg-white/50 rounded-2xl m-2 opacity-60 pointer-events-none p-6 text-center gap-2">
                          <Target className="w-8 h-8 text-gray-300" />
                          カードをここにドロップ
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== "案件管理 (Kanban)" && (
            <div className="flex-1 flex items-center justify-center bg-white rounded-3xl border border-gray-100 shadow-sm p-12 animate-in fade-in duration-300">
               <div className="text-center max-w-sm">
                 <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                   <Settings className="w-10 h-10 text-gray-400 animate-spin-slow" />
                 </div>
                 <h3 className="text-xl font-black text-gray-900 mb-2">準備中モジュール</h3>
                 <p className="text-sm text-gray-500 font-medium leading-relaxed">このモジュールのプレミアム機能は現在開発中です。「案件管理 (Kanban)」タブをご利用ください。</p>
                 <button onClick={() => setActiveTab("案件管理 (Kanban)")} className="mt-8 bg-gray-900 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-black transition-colors text-sm">
                   Kanbanボードに戻る
                 </button>
               </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

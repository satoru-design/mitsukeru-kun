"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, AlertCircle, Clock, ChevronRight, MessageSquare, 
  Settings, UserCircle, Star, Target, TrendingUp, Filter, Search 
} from "lucide-react";

export default function VendorAdminDashboard() {
  const [activeTab, setActiveTab] = useState("案件管理 (Kanban)");

  // --- Profile Gamification Data ---
  const profileCompleteness = 65;
  const missingTasks = [
    { title: "自己PR文を充実させる", points: 15, url: "#" },
    { title: "施工事例の写真を3枚追加する", points: 10, url: "#" },
    { title: "資格証明書をアップロードする", points: 10, url: "#" }
  ];

  // --- Kanban Board Data (Mock CRM) ---
  const [columns, setColumns] = useState([
    {
      id: "new",
      title: "新規問合せ",
      color: "bg-red-50 text-red-700 border-red-200",
      cards: [
        { id: 1, client: "田中太郎 様", property: "新宿区 1LDK", date: "今日 14:30", amount: "未定", unread: 1, type: "定期清掃" },
        { id: 2, client: "鈴木不動産", property: "渋谷ビル 空室清掃", date: "今日 10:15", amount: "未定", unread: 0, type: "不用品回収" }
      ]
    },
    {
      id: "negotiating",
      title: "交渉中 / 見積提示済",
      color: "bg-blue-50 text-blue-700 border-blue-200",
      cards: [
        { id: 3, client: "佐藤花子 様", property: "世田谷区 戸建て", date: "昨日", amount: "¥35,000", unread: 0, type: "写真撮影" }
      ]
    },
    {
      id: "contracted",
      title: "受注確定 / 作業待ち",
      color: "bg-orange-50 text-orange-700 border-orange-200",
      cards: [
        { id: 4, client: "高橋次郎 様", property: "品川区 マンション", date: "3日前", amount: "¥18,000", unread: 0, type: "鍵交換" },
        { id: 5, client: "株式会社ホスト", property: "浅草 特区民泊", date: "先週", amount: "¥120,000", unread: 2, type: "民泊完全代行" }
      ]
    },
    {
      id: "completed",
      title: "作業完了 / 入金待ち",
      color: "bg-gray-100 text-gray-700 border-gray-300",
      cards: [
        { id: 6, client: "渡辺様", property: "目黒区 アパート", date: "2週間前", amount: "¥22,000", unread: 0, type: "定期清掃" }
      ]
    }
  ]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      
      {/* Header */}
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md z-20 shrink-0 sticky top-0">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            <span className="text-orange-500">見つける君</span> for Vendors
          </h1>
          <span className="hidden md:inline-block bg-white/20 text-white/90 text-xs px-2 py-0.5 rounded font-bold">業者用CRM</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/saas-vendor/profile" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">
            公開プロフィール確認 ↗
          </Link>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 relative cursor-pointer hover:bg-white/20 transition-colors">
            <UserCircle className="w-6 h-6 text-gray-300" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-gray-900 rounded-full"></span>
          </div>
        </div>
      </header>

      {/* Top Banner (Gamification) */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-8 shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              <h2 className="text-2xl font-black">清掃マスター プロ株式会社 様</h2>
            </div>
            <p className="text-orange-100 font-medium">現在、地域検索での表示順位は <strong className="text-white text-lg">Aランク</strong> です。</p>
          </div>
          
          <div className="w-full md:w-auto bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20 flex items-center gap-6 shadow-lg">
             <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                {/* Circular Progress (Mock SVG) */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/20" />
                  <path strokeDasharray={`${profileCompleteness}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" className="text-white drop-shadow-md transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xs font-bold text-orange-200 leading-none">充実度</span>
                  <span className="text-xl font-black leading-none">{profileCompleteness}%</span>
                </div>
             </div>
             <div>
               <p className="text-sm font-bold text-white mb-2">あと少しで最上位の『Sランク』です！🔥</p>
               <div className="flex flex-col gap-1.5">
                 {missingTasks.slice(0, 2).map((task, i) => (
                   <Link key={i} href={task.url} className="text-xs flex items-center justify-between bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md transition-colors font-medium border border-white/10">
                     <span>{task.title}</span>
                     <span className="bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded text-[10px] font-black shrink-0 ml-3">+{task.points}%</span>
                   </Link>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 shrink-0 sticky top-[72px] z-10">
        <div className="max-w-7xl mx-auto flex gap-1">
          {["案件管理 (Kanban)", "チャット", "プロフィール設定", "自動料金マスタ", "売上・分析"].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-5 py-4 font-bold text-sm border-b-2 transition-colors whitespace-nowrap
                ${activeTab === tab 
                  ? "border-orange-600 text-orange-600" 
                  : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }
              `}
            >
              <div className="flex items-center gap-2">
                {tab === "案件管理 (Kanban)" && <Target className="w-4 h-4" />}
                {tab === "チャット" && <MessageSquare className="w-4 h-4" />}
                {tab === "売上・分析" && <TrendingUp className="w-4 h-4" />}
                {tab === "自動料金マスタ" && <Settings className="w-4 h-4" />}
                {tab}
                {(tab === "案件管理 (Kanban)" || tab === "チャット") && (
                  <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full leading-none">1</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Body */}
      <main className="flex-1 overflow-x-auto overflow-y-auto p-6">
        <div className="max-w-[1600px] mx-auto h-full flex flex-col">
          
          {activeTab === "案件管理 (Kanban)" && (
            <>
              {/* Kanban Utility Header */}
              <div className="flex justify-between items-center mb-6 shrink-0 bg-white p-3 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="案件・顧客名で検索..." className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none w-64" />
                  </div>
                  <button className="flex items-center gap-2 text-sm font-bold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-100">
                    <Filter className="w-4 h-4" /> 絞り込み
                  </button>
                </div>
                <div className="text-sm font-bold text-gray-500">
                  全 <span className="text-gray-900 text-base">6</span> 件の進行中案件
                </div>
              </div>

              {/* Kanban Board Area */}
              <div className="flex gap-6 h-full min-h-[500px] pb-4">
                {columns.map(col => (
                  <div key={col.id} className="flex flex-col w-[320px] shrink-0">
                    {/* Column Header */}
                    <div className={`p-3 rounded-t-xl border-x border-t font-black flex justify-between items-center ${col.color}`}>
                      <div className="flex items-center gap-2">
                        {col.title}
                        <span className="bg-white/50 px-2 py-0.5 rounded-full text-xs shrink-0 drop-shadow-sm">{col.cards.length}</span>
                      </div>
                    </div>
                    {/* Column Body (Drop Zone) */}
                    <div className="bg-gray-100 flex-1 p-3 rounded-b-xl border-x border-b border-gray-200 flex flex-col gap-3 shadow-inner">
                      {col.cards.map(card => (
                        <div key={card.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 cursor-grab hover:shadow-md hover:border-gray-300 transition-all group scale-100 active:scale-95">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded inline-block">{card.type}</span>
                            {card.unread > 0 && (
                              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 animate-pulse">
                                <AlertCircle className="w-3 h-3" /> 未読 {card.unread}
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{card.client}</h4>
                          <p className="text-xs font-semibold text-gray-500 mt-1 truncate">{card.property}</p>
                          
                          <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-center">
                            <div className="flex items-center gap-1 text-xs text-gray-400 font-bold">
                              <Clock className="w-3.5 h-3.5" /> {card.date}
                            </div>
                            <div className="font-black text-sm text-gray-800 bg-gray-50 px-2 py-1 rounded">{card.amount}</div>
                          </div>
                   
                          <Link href="/chat/1" className="mt-3 w-full bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1 transition-colors border border-orange-200">
                            <MessageSquare className="w-3.5 h-3.5" /> チャットを開く
                          </Link>
                        </div>
                      ))}
                      {/* Empty state hint */}
                      {col.cards.length === 0 && (
                        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm font-bold border-2 border-dashed border-gray-300 rounded-xl m-2 opacity-50">
                          ドラッグ＆ドロップで移動
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab !== "案件管理 (Kanban)" && (
            <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-gray-200 shadow-sm">
               <div className="text-center">
                 <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4 animate-spin-slow" />
                 <h3 className="text-lg font-bold text-gray-700">準備中</h3>
                 <p className="text-sm text-gray-500 mt-2">このタブの機能は現在開発中です。（Kanbanボードをお試しください）</p>
               </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

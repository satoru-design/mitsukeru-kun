"use client";

import { useState } from "react";
import Link from "next/link";
import { mockUser, mockChats, mockServices } from "../../data/mockData";
import QuoteWizardModal from "../components/QuoteWizardModal";
import { 
  LayoutDashboard, 
  Building2, 
  MessageSquare, 
  Heart, 
  LogOut, 
  Bell, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MoreVertical,
  Camera,
  Star,
  FileText
} from "lucide-react";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const mockOwnerProperties = [
    { id: 'prop1', name: '新宿シティハイツ302', type: '1LDK', size: 40, bed: 2, status: '作業中', vendor: 'クリーンパートナーズ東京' },
    { id: 'prop2', name: '渋谷ロフト1階', type: 'その他', size: 65, bed: 0, status: '依頼中', vendor: '未定' },
    { id: 'prop3', name: '代々木ハウスA棟', type: '一戸建て', size: 90, bed: 4, status: '完了確認待ち', vendor: '高橋 不動産メンテ' },
    { id: 'prop4', name: '品川レジデンス405', type: '1R', size: 25, bed: 1, status: '運用中 (未手配)', vendor: '-' },
  ];

  const formatDate = (isoStr: string) => {
    const d = new Date(isoStr);
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case '見積もり提案中': return 'bg-blue-100 text-blue-700 border-blue-200';
      case '成約済': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-500 selection:text-white pb-20">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-lg italic tracking-tighter">M</span>
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900 hidden sm:block">見つける<span className="text-orange-500">君</span></span>
          </Link>
          
          <div className="flex items-center gap-6">
            <button className="relative text-gray-500 hover:text-orange-600 transition">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-6 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-700">{mockUser.name} <span className="text-gray-400 font-normal">さん</span></span>
              <img src={mockUser.avatar} alt="user" className="w-9 h-9 rounded-full ring-2 ring-orange-100 object-cover shadow-sm bg-gray-100" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <nav className="space-y-1 sticky top-24">
            <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
              <LayoutDashboard className="w-5 h-5" /> ダッシュボード
            </button>
            <button onClick={() => setActiveTab('properties')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'properties' ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
              <Building2 className="w-5 h-5" /> 物件マスタ管理
            </button>
            <button onClick={() => setActiveTab('messages')} className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'messages' ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5" /> チャット
              </div>
              {mockChats.some(c => c.unreadCount > 0) && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${activeTab === 'messages' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-600'}`}>
                  {mockChats.reduce((sum, c) => sum + c.unreadCount, 0)}
                </span>
              )}
            </button>
            <button onClick={() => setActiveTab('favorites')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'favorites' ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
              <Heart className="w-5 h-5" /> お気に入り業者
            </button>
            
            <div className="my-4 border-t border-gray-200"></div>

            <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-red-600 hover:bg-red-50 transition-all">
              <LogOut className="w-5 h-5" /> ログアウト
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900 mb-2">運用ダッシュボード</h1>
                <p className="text-gray-500 font-medium">保有物件の状況を直感的に把握・一括管理できます。</p>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center">
                  <span className="text-xs font-bold text-gray-500 mb-1">総保有物件</span>
                  <div className="text-3xl font-black text-gray-900">4<span className="text-base text-gray-400 font-bold ml-1">件</span></div>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-blue-100 shadow-sm flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-16 h-16 bg-blue-50 rounded-bl-full flex items-start justify-end p-3"><Clock className="w-4 h-4 text-blue-300"/></div>
                  <span className="text-xs font-bold text-blue-600 mb-1">見積・依頼中</span>
                  <div className="text-3xl font-black text-blue-700">1<span className="text-base text-blue-400 font-bold ml-1">件</span></div>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-16 h-16 bg-emerald-50 rounded-bl-full flex items-start justify-end p-3"><CheckCircle2 className="w-4 h-4 text-emerald-300"/></div>
                  <span className="text-xs font-bold text-emerald-600 mb-1">作業中・手配済</span>
                  <div className="text-3xl font-black text-emerald-700">1<span className="text-base text-emerald-400 font-bold ml-1">件</span></div>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-amber-100 shadow-sm flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-16 h-16 bg-amber-50 rounded-bl-full flex items-start justify-end p-3"><AlertCircle className="w-4 h-4 text-amber-300"/></div>
                  <span className="text-xs font-bold text-amber-600 mb-1">確認・レビュー待ち</span>
                  <div className="text-3xl font-black text-amber-600">1<span className="text-base text-amber-400 font-bold ml-1">件</span></div>
                </div>
              </div>

              {/* Kanban Board */}
              <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
                {/* Column: 1. Idle */}
                <div className="snap-start shrink-0 w-80 bg-slate-100/50 rounded-[2rem] p-4 border border-slate-200/60 shadow-inner">
                  <div className="flex items-center justify-between px-2 mb-4">
                    <h3 className="text-sm font-black text-slate-700 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div> 運用中 (未手配)
                    </h3>
                    <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">1</span>
                  </div>
                  <div className="space-y-3">
                    {mockOwnerProperties.filter(p => p.status === '運用中 (未手配)').map(p => (
                      <div key={p.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition cursor-grab">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-900">{p.name}</h4>
                          <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4"/></button>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-4">
                          <Building2 className="w-3.5 h-3.5" /> {p.type} / {p.size}㎡
                        </div>
                        <button onClick={() => setActiveTab('properties')} className="w-full bg-orange-50 hover:bg-orange-100 text-orange-600 font-bold py-2.5 rounded-xl text-xs transition border border-orange-200">
                          ワンクリック清掃手配
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column: 2. Requesting */}
                <div className="snap-start shrink-0 w-80 bg-blue-50/50 rounded-[2rem] p-4 border border-blue-100 shadow-inner">
                  <div className="flex items-center justify-between px-2 mb-4">
                    <h3 className="text-sm font-black text-blue-700 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> 依頼中・見積中
                    </h3>
                    <span className="bg-blue-200 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">1</span>
                  </div>
                  <div className="space-y-3">
                    {mockOwnerProperties.filter(p => p.status === '依頼中').map(p => (
                      <div key={p.id} className="bg-white p-5 rounded-3xl border border-blue-100 shadow-sm hover:shadow-md transition cursor-grab border-l-4 border-l-blue-500">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-900">{p.name}</h4>
                        </div>
                        <p className="text-xs font-bold text-gray-500 mb-3">{p.type}</p>
                        <div className="bg-blue-50 px-3 py-2 rounded-lg text-xs font-bold text-blue-700 flex items-center justify-between mb-4">
                          <span>3件の見積提案あり</span>
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                          </span>
                        </div>
                        <button onClick={() => setActiveTab('messages')} className="w-full bg-white hover:bg-blue-50 text-blue-600 font-bold py-2.5 rounded-xl text-xs transition border border-blue-200 flex items-center justify-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" /> メッセージを確認
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column: 3. Working */}
                <div className="snap-start shrink-0 w-80 bg-emerald-50/50 rounded-[2rem] p-4 border border-emerald-100 shadow-inner">
                  <div className="flex items-center justify-between px-2 mb-4">
                    <h3 className="text-sm font-black text-emerald-700 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> 手配済・作業中
                    </h3>
                    <span className="bg-emerald-200 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">1</span>
                  </div>
                  <div className="space-y-3">
                    {mockOwnerProperties.filter(p => p.status === '作業中').map(p => (
                      <div key={p.id} className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition cursor-grab border-l-4 border-l-emerald-500">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-900">{p.name}</h4>
                        </div>
                        <div className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-1.5 bg-gray-50 p-2 rounded-lg">
                          <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center text-[8px] text-white">担当</div>
                          <span className="truncate">{p.vendor}</span>
                        </div>
                        <div className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5"/> 本日 10:00〜 作業予定
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column: 4. Review */}
                <div className="snap-start shrink-0 w-80 bg-amber-50/50 rounded-[2rem] p-4 border border-amber-100 shadow-inner">
                  <div className="flex items-center justify-between px-2 mb-4">
                    <h3 className="text-sm font-black text-amber-700 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></div> 完了確認待ち
                    </h3>
                    <span className="bg-amber-200 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">1</span>
                  </div>
                  <div className="space-y-3">
                    {mockOwnerProperties.filter(p => p.status === '完了確認待ち').map(p => (
                      <div key={p.id} className="bg-white p-5 rounded-3xl border border-amber-200 shadow-md hover:shadow-lg transition cursor-grab border-l-4 border-l-amber-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-full flex justify-end items-start p-3 -z-10"></div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-900">{p.name}</h4>
                        </div>
                        <div className="text-xs font-bold text-gray-500 mb-4 flex items-center gap-1.5 bg-gray-50 p-2 rounded-lg">
                          <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center text-[8px] text-white">担当</div>
                          <span className="truncate">{p.vendor}</span>
                        </div>
                        <button onClick={() => setIsReviewOpen(true)} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl text-xs transition shadow-[0_4px_14px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2">
                          <Camera className="w-4 h-4" /> 写真確認・レビュー入力
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-6">
                <h1 className="text-2xl font-black text-gray-900 mb-2">メッセージ・見積もり一覧</h1>
                <p className="text-gray-500 font-medium">業者との個別チャット、契約内容の確認を行います。</p>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {mockChats.map(chat => (
                    <div key={chat.id} className={`p-4 md:p-6 hover:bg-orange-50/50 transition-colors ${chat.unreadCount > 0 ? 'bg-orange-50/30' : ''}`}>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link href={`/chat/${chat.id}`} className="shrink-0 relative">
                          <img src={chat.vendorAvatar} alt={chat.vendorName} className="w-14 h-14 rounded-2xl object-cover shadow-sm bg-gray-100" />
                          {chat.unreadCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">{chat.unreadCount}</span>}
                        </Link>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <div className="flex items-center justify-between mb-1.5">
                            <Link href={`/chat/${chat.id}`} className="font-bold text-gray-900 text-lg hover:text-orange-600 truncate">{chat.vendorName}</Link>
                            <span className="text-xs font-bold text-gray-400 whitespace-nowrap">{formatDate(chat.updatedAt)}</span>
                          </div>
                          <Link href={`/chat/${chat.id}`} className="flex items-center gap-2 mb-2">
                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-black border uppercase tracking-wider ${getStatusColor(chat.status)}`}>{chat.status}</span>
                            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1 truncate"><Building2 className="w-3 h-3"/> {chat.propertyName}</span>
                          </Link>
                          <Link href={`/chat/${chat.id}`}>
                            <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'text-gray-900 font-bold' : 'text-gray-500 font-medium'}`}>{chat.lastMessage}</p>
                          </Link>

                          {/* Action Button outside Link */}
                          {chat.status === '見積もり提案中' && (
                            <div className="mt-3 flex justify-end">
                              <button onClick={() => alert("【特急プラン決済フロー】\nStripeなどの決済画面へ遷移します。\n決済完了後、案件が特急枠（優先対応）に切り替わります。")} className="bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 text-red-600 border border-red-200 text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5" fill="currentColor"/> 特急枠へアップグレード (¥1,000)
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Properties Tab */}
          {activeTab === 'properties' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex max-sm:flex-col sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h1 className="text-2xl font-black text-gray-900 mb-2">物件マスタ管理</h1>
                  <p className="text-gray-500 font-medium text-sm">見積もり依頼をワンクリックで行うための設定です。</p>
                </div>
                <button onClick={() => setIsAddPropertyOpen(true)} className="shrink-0 bg-gray-900 hover:bg-black text-white px-5 py-3 rounded-xl font-bold shadow-lg transition whitespace-nowrap text-sm">
                  + 新規物件を登録
                </button>
              </div>

              <div className="space-y-4">
                {mockOwnerProperties.map(p => (
                  <div key={p.id} className="bg-white rounded-3xl border border-gray-100 p-5 md:p-6 shadow-sm flex flex-col md:flex-row gap-6 md:items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-black text-gray-900">{p.name}</h3>
                        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-md">{p.type} / {p.size}㎡ / {p.bed}ベッド</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-bold">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5"/> 清掃マニュアル添付済</span>
                        <span className="bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200">鍵: スマートロック連携</span>
                        <span className="bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200">ゴミ: 敷地内可</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <button className="bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 font-bold px-4 py-3 rounded-xl text-sm transition">編集</button>
                       <button onClick={() => setIsWizardOpen(true)} className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition shadow-lg shadow-orange-600/30 flex items-center gap-2">
                         <Zap className="w-4 h-4 fill-current"/> 一括見積もり
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="mb-6">
                <h1 className="text-2xl font-black text-gray-900 mb-2">お気に入り業者</h1>
                <p className="text-gray-500 font-medium">またお願いしたい、お気に入りのプロフェッショナル。</p>
              </div>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                 {mockServices.filter(s => mockUser.favorites.includes(s.id)).map(service => (
                   <div key={service.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group">
                     <div className="aspect-video relative overflow-hidden">
                       <img src={service.image} alt="service" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" />
                       <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-red-500">
                         <Heart className="w-4 h-4 fill-current" />
                       </div>
                     </div>
                     <div className="p-5 flex-1 flex flex-col">
                       <div className="text-[10px] font-bold text-gray-500 mb-2 flex items-center gap-1"><MapPin className="w-3 h-3"/> {service.area}</div>
                       <h3 className="font-bold text-gray-900 leading-tight mb-auto">{service.title}</h3>
                       <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-[10px] font-bold">{service.providerName.charAt(0)}</div>
                            <span className="text-xs font-bold text-gray-600">{service.providerName}</span>
                         </div>
                         <Link href={`/vendor/${service.id}`} className="text-xs font-bold text-orange-600 hover:text-orange-700">詳細を見る →</Link>
                       </div>
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Modals */}
      <QuoteWizardModal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} category={"定期清掃"} />

      {isAddPropertyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl scale-100 animate-in zoom-in-95 duration-300">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-orange-600" /> 新規物件の登録
              </h2>
              <button onClick={() => setIsAddPropertyOpen(false)} className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors">
                <X className="w-5 h-5"/>
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6 bg-gray-50 flex-1">
              {/* Form fields */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">物件管理名</label>
                <input type="text" defaultValue="新宿新規物件" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition" />
              </div>
              <div className="flex gap-4">
                 <div className="flex-1">
                   <label className="block text-xs font-bold text-gray-500 mb-2">間取り</label>
                   <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:border-orange-500 outline-none">
                     <option>1R / 1K</option><option>1LDK / 2DK</option>
                   </select>
                 </div>
                 <div className="flex-1">
                   <label className="block text-xs font-bold text-gray-500 mb-2">広さ (平米)</label>
                   <input type="number" defaultValue="30" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:border-orange-500 outline-none" />
                 </div>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                <label className="flex items-center gap-2 text-xs font-bold text-amber-800 mb-2"><AlertCircle className="w-4 h-4"/> 鍵の受け渡し・保管方法 (セキュア情報)</label>
                <input type="text" defaultValue="スマートロック(RemoteLock)" className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:border-amber-500 outline-none mb-2" />
                <p className="text-[10px] font-bold text-amber-600/80">※この情報は業者が案件を承諾した後にのみ開示されます。</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">清掃マニュアル・間取り図</label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-white hover:bg-gray-50 transition cursor-pointer">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-gray-700 mb-1">クリックしてPDFをアップロード</p>
                  <p className="text-xs font-bold text-gray-400">または ここにドロップ</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setIsAddPropertyOpen(false)} className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition">キャンセル</button>
              <button onClick={() => setIsAddPropertyOpen(false)} className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold shadow-lg transition">マスタ情報を保存</button>
            </div>
          </div>
        </div>
      )}

      {isReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl scale-100 animate-in zoom-in-95 duration-300">
             <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-900">作業完了の確認とレビュー</h2>
              <button onClick={() => setIsReviewOpen(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"><X className="w-4 h-4"/></button>
             </div>
             <div className="p-6 overflow-y-auto max-h-[70vh]">
               <h3 className="text-sm font-bold text-gray-900 mb-3">業者からの完了報告 (写真)</h3>
               <div className="grid grid-cols-2 gap-4 mb-4">
                 <div className="aspect-[4/3] bg-gray-100 rounded-2xl flex flex-col items-center justify-center border border-gray-200 relative overflow-hidden group cursor-pointer">
                    <span className="z-10 bg-white/80 px-3 py-1 rounded-full text-xs font-bold text-gray-700 backdrop-blur-sm shadow-sm absolute bottom-2">Before</span>
                    <Camera className="w-8 h-8 text-gray-300" />
                 </div>
                 <div className="aspect-[4/3] bg-gray-100 rounded-2xl flex flex-col items-center justify-center border border-gray-200 relative overflow-hidden group cursor-pointer">
                    <span className="z-10 bg-white/80 px-3 py-1 rounded-full text-xs font-bold text-gray-700 backdrop-blur-sm shadow-sm absolute bottom-2">After</span>
                    <Camera className="w-8 h-8 text-emerald-300" />
                 </div>
               </div>
               
               <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-8">
                 <div className="text-[10px] font-black text-blue-800 mb-1 uppercase tracking-wider">業者の作業メモ</div>
                 <p className="text-sm font-medium text-blue-900 leading-relaxed">「ベランダのゴミも回収完了しました。備品シャンプーの残量が少なくなっています。」</p>
               </div>

               <div className="border-t border-gray-100 pt-8">
                 <h3 className="text-sm font-bold text-gray-900 mb-4 text-center">このクオリティを評価してください</h3>
                 <div className="flex justify-center gap-2 mb-6 cursor-pointer">
                   {[1,2,3,4,5].map(s => (
                     <Star key={s} className={`w-10 h-10 ${s <= 4 ? 'text-amber-400 fill-current' : 'text-gray-200'}`} />
                   ))}
                 </div>
                 <textarea placeholder="次回の依頼に向けたコメントや、お礼などを入力..." className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-orange-500 outline-none min-h-[120px]"></textarea>
               </div>
             </div>
             <div className="p-6 bg-gray-50 border-t border-gray-100">
               <button onClick={() => setIsReviewOpen(false)} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg py-4 rounded-2xl shadow-[0_8px_20px_rgba(16,185,129,0.3)] transition-transform hover:-translate-y-0.5">
                 確認して決済を確定する
               </button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}

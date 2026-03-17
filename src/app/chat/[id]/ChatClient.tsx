"use client";

import { useState } from "react";
import Link from "next/link";
import QuoteRequestForm from "../../vendor/[id]/QuoteRequestForm";
import { 
  ChevronLeft, Menu, Paperclip, Send, ShieldCheck, FileText, 
  ChevronUp, ChevronDown, CheckCircle2, MessageSquare, PlusCircle, MoreVertical, X
} from "lucide-react";

export default function ChatClient({ chat, mockChats }: { chat: any; mockChats: any[] }) {
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="h-[100dvh] flex flex-col bg-white font-sans overflow-hidden">
      
      {/* Global Header */}
      <header className="h-16 shrink-0 border-b border-gray-200 bg-white flex items-center justify-between px-4 sm:px-6 z-20">
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Toggle */}
          <button 
            className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" className="flex items-center">
            <img src="/assets/images/logo.png" alt="見つける君 ロゴ" className="h-8 object-contain" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/mypage" className="text-sm font-bold text-orange-600 hover:text-orange-700 bg-orange-50 px-4 py-2 rounded-full transition-colors">
            マイページ
          </Link>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* =========================================
            Left Sidebar: Thread List (Desktop + Mobile Overlay)
        ========================================= */}
        {/* Mobile Overlay Background */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        <aside className={`
          fixed md:relative inset-y-0 left-0 z-40 w-80 bg-gray-50 border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="h-16 shrink-0 flex items-center justify-between px-5 border-b border-gray-200 bg-white">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              メッセージ
            </h2>
            <button className="md:hidden p-2 -mr-2 text-gray-500 rounded-full hover:bg-gray-100" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto w-full">
            {mockChats.map(c => (
              <Link 
                href={`/chat/${c.id}`} 
                key={c.id} 
                className={`block p-4 border-b border-gray-100 hover:bg-white transition-colors relative
                  ${c.id === chat.id ? 'bg-white shadow-[inset_4px_0_0_0_#EA580C]' : ''}
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-bold text-sm truncate pr-2 ${c.id === chat.id ? 'text-gray-900' : 'text-gray-700'}`}>
                    {c.vendorName}
                  </span>
                  {c.unreadCount > 0 && (
                     <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                       {c.unreadCount}
                     </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {c.propertyName}
                </div>
              </Link>
            ))}
          </div>
        </aside>

        {/* =========================================
            Center: Chat Execution Area
        ========================================= */}
        <main className="flex-1 flex flex-col bg-[#F5F7FB] min-w-0 relative">
          
          {/* Chat Header */}
          <div className="h-[72px] shrink-0 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 shadow-sm z-10">
            <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
              <img src={chat.vendorAvatar} alt={chat.vendorName} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-gray-100 shrink-0 shadow-sm" />
              <div className="min-w-0">
                <h2 className="font-bold text-sm md:text-base text-gray-900 flex items-center gap-2 truncate">
                  <span className="truncate">{chat.vendorName}</span>
                  {chat.status && (
                    <span className="bg-green-100 text-green-700 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded shrink-0">
                      {chat.status}
                    </span>
                  )}
                </h2>
                <div className="text-[11px] md:text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>本人確認済</span>
                  <span className="mx-1 text-gray-300">|</span>
                  <span className="truncate">{chat.propertyName}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center shrink-0">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-32 md:pb-6">
            <div className="flex justify-center mb-6">
               <span className="bg-black/10 text-gray-600 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                 {formatDateLabel(chat.messages[0].timestamp)}
               </span>
            </div>
            
            <div className="flex flex-col gap-4 max-w-3xl mx-auto">
              {chat.messages.map((msg: any) => {
                const isMine = msg.sender === 'user';
                return (
                  <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    {!isMine && (
                      <img src={chat.vendorAvatar} alt="vendor" className="w-8 h-8 rounded-full object-cover mr-2 shrink-0 mt-1 shadow-sm" />
                    )}
                    
                    <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} max-w-[85%] md:max-w-[75%]`}>
                      <div className={`
                        relative px-4 py-3 text-sm md:text-base whitespace-pre-wrap leading-relaxed
                        ${isMine 
                          ? 'bg-[#00B900] text-white rounded-2xl rounded-tr-sm shadow-[0_2px_5px_rgba(0,185,0,0.2)]' 
                          : 'bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-tl-sm shadow-[0_2px_5px_rgba(0,0,0,0.05)]'
                        }
                      `}>
                        {/* File Attachment Mock */}
                        {msg.text.includes("ファイル") && (
                          <div className={`flex items-center gap-2 p-2 rounded-lg mb-2 cursor-pointer border ${isMine ? 'bg-white/20 border-white/30 hover:bg-white/30' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'} transition-colors`}>
                            <FileText className={`w-5 h-5 ${isMine ? 'text-white' : 'text-gray-500'}`} />
                            <span className="text-xs font-medium underline underline-offset-2">添付資料.pdf</span>
                          </div>
                        )}
                        {msg.text}
                      </div>
                      
                      <div className="flex items-center gap-1 mt-1 px-1">
                        {isMine && <span className="text-[10px] text-[#00B900] font-bold">既読</span>}
                        <span className="text-[11px] text-gray-400 font-medium">{formatTime(msg.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat Input Area (Sticky at bottom inside middle col) */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 bg-gradient-to-t from-[#F5F7FB] via-[#F5F7FB] to-transparent">
             <div className="max-w-3xl mx-auto flex items-end gap-2 bg-white p-2 rounded-2xl sm:rounded-[28px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 transition-shadow focus-within:shadow-[0_4px_25px_rgba(0,0,0,0.12)] focus-within:border-gray-300">
               <button className="p-3 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors shrink-0">
                 <PlusCircle className="w-6 h-6 sm:w-7 sm:h-7" />
               </button>
               <textarea 
                 className="flex-1 bg-transparent border-none resize-none max-h-32 min-h-[44px] py-3 px-1 text-sm md:text-base text-gray-800 focus:ring-0 placeholder-gray-400"
                 placeholder="メッセージを入力..."
                 rows={1}
               ></textarea>
               <button className="p-3 bg-[#00B900] text-white rounded-full hover:bg-green-600 transition-colors shadow-md hover:shadow-lg shrink-0 mr-1 mb-1">
                 <Send className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />
               </button>
             </div>
          </div>
          
        </main>

        {/* =========================================
            Right Sidebar: Quote Details (Desktop)
        ========================================= */}
        <aside className="hidden lg:flex w-96 flex-col border-l border-gray-200 bg-white z-10 shrink-0">
          <div className="h-16 shrink-0 flex items-center px-6 border-b border-gray-200 bg-gray-50/50">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-400" />
              お見積り内容
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {chat.quote ? (
              <div className="flex flex-col gap-6">
                
                {/* Master Price Card */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                   <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                   
                   <div className="text-sm text-gray-300 font-medium mb-1 drop-shadow-sm flex items-center gap-1.5">
                     <ShieldCheck className="w-4 h-4 text-emerald-400" />
                     安心の保証付き見積もり
                   </div>
                   <div className="flex items-baseline gap-1 mt-2">
                     <span className="text-xl font-bold">¥</span>
                     <span className="text-4xl font-black tracking-tight drop-shadow-md">
                       {chat.quote.total.toLocaleString()}
                     </span>
                     <span className="text-sm font-medium text-gray-400 ml-1">(税込)</span>
                   </div>
                </div>

                {/* Main Actions */}
                <div className="flex flex-col gap-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-[0_4px_14px_rgba(234,88,12,0.39)] hover:shadow-[0_6px_20px_rgba(234,88,12,0.4)] transition-all transform hover:-translate-y-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                    この内容で依頼を確定する
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-bold py-3.5 rounded-xl transition-all">
                    条件を変更して再計算
                  </button>
                </div>

                {/* Breakdown */}
                <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-1">
                  <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-100 rounded-t-lg">
                    <h4 className="text-sm font-bold text-gray-700">料金内訳</h4>
                  </div>
                  <div className="p-2">
                    {chat.quote.breakdown.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-start p-3 border-b border-dashed border-gray-100 last:border-0 hover:bg-orange-50/30 transition-colors rounded-lg">
                        <div className="pr-4">
                          <div className="text-sm font-bold text-gray-800 leading-snug">{item.item}</div>
                          {item.quantity && item.unitPrice && (
                            <div className="text-xs text-gray-500 mt-1 font-medium">
                              ¥{item.unitPrice.toLocaleString()} × {item.quantity}
                            </div>
                          )}
                        </div>
                        <div className="font-black text-gray-900 shrink-0">
                          ¥{item.price.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Editor Placeholder */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 mb-3 ml-1">条件を細かく変更する場合：</p>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 opacity-60 pointer-events-none filter grayscale">
                     <p className="text-xs text-center font-bold text-gray-500 mb-2">QuoteRequestFormコンポーネント</p>
                     <QuoteRequestForm vendorId={chat.vendorId.toString()} basePrice={chat.quote.total - 1500} />
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400 text-sm gap-3">
                <ShieldCheck className="w-12 h-12 text-gray-200" />
                <p>ただいまお見積りを算出中です。<br/>少々お待ちください。</p>
              </div>
            )}
          </div>
        </aside>

        {/* =========================================
            Mobile Quote Drawer (BottomSheet)
        ========================================= */}
        <div className={`
          lg:hidden fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-in-out
          ${isQuoteDrawerOpen ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'}
        `}>
          {/* Overlay when open */}
          {isQuoteDrawerOpen && (
            <div 
              className="fixed inset-0 bg-black/40 z-[-1] transition-opacity" 
              onClick={() => setIsQuoteDrawerOpen(false)}
            />
          )}

          {/* Drawer Content */}
          <div className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col max-h-[85vh]">
            
            {/* Drawer Header / Handle */}
            <div 
              className="p-4 cursor-pointer flex flex-col items-center border-b border-gray-100 bg-white rounded-t-3xl"
              onClick={() => setIsQuoteDrawerOpen(!isQuoteDrawerOpen)}
            >
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-3" />
              <div className="w-full flex justify-between items-center px-2">
                <span className="font-bold text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-400" />
                  お見積り内容
                </span>
                {!isQuoteDrawerOpen ? (
                  <div className="font-black text-orange-600 text-xl flex items-center gap-1">
                    ¥{chat.quote?.total.toLocaleString()}
                    <ChevronUp className="w-5 h-5 text-gray-400 ml-1" />
                  </div>
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>

            {/* Drawer Scrollable Area */}
            {isQuoteDrawerOpen && (
              <div className="flex-1 overflow-y-auto p-5 pb-8">
                {chat.quote ? (
                  <div className="flex flex-col gap-5">
                    
                    {/* Master Price Card */}
                    <div className="bg-gray-900 rounded-2xl p-5 text-white shadow-md">
                       <div className="text-xs text-gray-400 font-medium mb-1">総額見積もり</div>
                       <div className="flex items-baseline gap-1">
                         <span className="text-lg font-bold">¥</span>
                         <span className="text-3xl font-black">{chat.quote.total.toLocaleString()}</span>
                         <span className="text-xs font-medium text-gray-400 ml-1">(税込)</span>
                       </div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 bg-orange-600 active:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg transition-colors">
                      <CheckCircle2 className="w-5 h-5" />
                      この内容で依頼を確定する
                    </button>

                    {/* Breakdown */}
                    <div className="bg-white border text-sm border-gray-200 rounded-xl p-4">
                      <h4 className="font-bold text-gray-700 mb-3 pb-2 border-b">料金内訳</h4>
                      {chat.quote.breakdown.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-start py-2 border-b border-dashed border-gray-100 last:border-0 last:pb-0">
                          <div className="pr-2">
                            <div className="font-bold text-gray-800">{item.item}</div>
                            {item.quantity && item.unitPrice && (
                              <div className="text-xs text-gray-500 mt-0.5">
                                ¥{item.unitPrice.toLocaleString()} × {item.quantity}
                              </div>
                            )}
                          </div>
                          <div className="font-black text-gray-900 whitespace-nowrap">
                            ¥{item.price.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="w-full text-center text-sm font-bold text-gray-500 py-3 border border-gray-200 rounded-xl mt-2 active:bg-gray-50">
                      条件を変更して再計算
                    </button>

                  </div>
                ) : (
                   <p className="text-center text-gray-500 text-sm py-10">お見積りを算出中です...</p>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

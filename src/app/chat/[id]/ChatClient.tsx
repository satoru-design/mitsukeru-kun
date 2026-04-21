"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Menu, Paperclip, Send, ShieldCheck, FileText, 
  ChevronUp, ChevronDown, CheckCircle2, MessageSquare, PlusCircle, MoreVertical, X,
  CheckCheck, Clock, Image as ImageIcon, MapPin
} from "lucide-react";

export default function ChatClient({ chat, mockChats }: { chat: any; mockChats: any[] }) {
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<any[]>(chat.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on load and new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (isoStr: string) => {
    const d = new Date(isoStr);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDateLabel = (isoStr: string) => {
    const d = new Date(isoStr);
    return `${d.getMonth() + 1}月${d.getDate()}日 (${['日','月','火','水','木','金','土'][d.getDay()]})`;
  };

  const handleSendMessage = () => {
    if(!chatMessage.trim()) return;
    
    const newMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: chatMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, newMsg]);
    setChatMessage("");
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-white font-sans overflow-hidden selection:bg-orange-500 selection:text-white">
      
      {/* Global Header */}
      <header className="h-16 shrink-0 border-b border-gray-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 z-40">
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 hover:text-orange-600 rounded-full transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-lg italic tracking-tighter">M</span>
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900 hidden sm:block">見つける<span className="text-orange-500">君</span></span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/mypage" className="text-xs font-bold text-gray-600 hover:text-gray-900 px-4 py-2 border border-gray-200 hover:border-gray-300 rounded-full transition-colors">
            ダッシュボードに戻る
          </Link>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden relative bg-[#f1f5f9]">
        
        {/* =========================================
            Left Sidebar: Thread List
        ========================================= */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-30 md:hidden animate-in fade-in" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        <aside className={`
          fixed md:relative inset-y-0 left-0 z-40 w-80 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] md:translate-x-0 shadow-2xl md:shadow-none
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="h-16 shrink-0 flex items-center justify-between px-5 border-b border-gray-100 bg-white">
            <h2 className="font-black text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange-500" />
              メッセージ
            </h2>
            <button className="md:hidden p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto w-full">
            {mockChats.map(c => (
              <Link 
                href={`/chat/${c.id}`} 
                key={c.id} 
                className={`block p-4 border-b border-gray-50 hover:bg-orange-50/50 transition-all relative group
                  ${c.id === chat.id ? 'bg-orange-50/50' : ''}
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                {c.id === chat.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-r-md"></div>}
                
                <div className="flex gap-3 items-center">
                  <div className="relative shrink-0">
                    <img src={c.vendorAvatar} alt={c.vendorName} className="w-12 h-12 rounded-2xl object-cover shadow-sm bg-gray-100" />
                    {c.unreadCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                        {c.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-bold text-sm truncate ${c.id === chat.id ? 'text-orange-900' : 'text-gray-900 group-hover:text-orange-700'}`}>
                        {c.vendorName}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-gray-500 truncate flex items-center gap-1">
                       <MapPin className="w-3 h-3 text-gray-400"/> {c.propertyName}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>

        {/* =========================================
            Center: Chat Execution Area
        ========================================= */}
        <main className="flex-1 flex flex-col min-w-0 relative">
          
          {/* Chat Header */}
          <div className="h-20 shrink-0 bg-white/90 backdrop-blur-xl border-b border-gray-200/60 flex items-center justify-between px-4 sm:px-8 shadow-sm z-10 w-full">
            <div className="flex items-center gap-4 min-w-0">
              <img src={chat.vendorAvatar} alt={chat.vendorName} className="w-12 h-12 rounded-2xl object-cover border border-gray-100 shrink-0 shadow-sm" />
              <div className="min-w-0">
                <h2 className="font-black text-gray-900 text-base md:text-lg flex items-center gap-2 truncate">
                  <span className="truncate">{chat.vendorName}</span>
                  {chat.status && (
                    <span className="bg-emerald-100 border border-emerald-200 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-md shrink-0 uppercase tracking-tighter">
                      {chat.status}
                    </span>
                  )}
                </h2>
                <div className="text-[11px] md:text-xs font-bold text-gray-500 truncate flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-0.5 text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md"><ShieldCheck className="w-3 h-3" /> 本人確認済</span>
                  <span className="text-gray-300">|</span>
                  <span className="truncate flex items-center gap-1"><MapPin className="w-3 h-3"/> {chat.propertyName}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center shrink-0">
              <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 pb-32 md:pb-8 flex flex-col gap-6 w-full">
            <div className="flex justify-center mb-4">
               <span className="bg-white border border-gray-200 text-gray-500 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                 {formatDateLabel(chat.messages[0].timestamp)}
               </span>
            </div>
            
            <div className="flex flex-col gap-5 max-w-3xl w-full mx-auto">
              {messages.map((msg: any, index: number) => {
                const isMine = msg.sender === 'user';
                return (
                  <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}>
                    {!isMine && (
                      <img src={chat.vendorAvatar} alt="vendor" className="w-8 h-8 rounded-full object-cover mr-3 shrink-0 mt-1 shadow-sm" />
                    )}
                    
                    <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} max-w-[85%] md:max-w-[70%]`}>
                      
                      {/* Embedded Rich Card Mock (If the message is an estimation proposal) */}
                      {msg.text.includes("見積もりをご提示") && !isMine && chat.quote && (
                         <div className="bg-white border border-orange-200 rounded-2xl rounded-tl-sm shadow-md mb-2 overflow-hidden w-full max-w-sm">
                           <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 text-white flex items-center gap-2">
                             <FileText className="w-5 h-5"/>
                             <span className="font-bold text-sm">公式見積もりが届きました</span>
                           </div>
                           <div className="p-4">
                             <p className="text-[10px] font-bold text-gray-400 mb-1">総額見積もり (税込)</p>
                             <div className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                               ¥{chat.quote.total.toLocaleString()}
                             </div>
                             <button className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-xl text-sm transition-transform hover:-translate-y-0.5 shadow-md flex justify-center items-center gap-2">
                               <CheckCircle2 className="w-4 h-4" /> 確認して依頼を確定
                             </button>
                           </div>
                         </div>
                      )}

                      <div className={`
                        relative px-5 py-3 text-sm md:text-base font-medium whitespace-pre-wrap leading-relaxed shadow-sm
                        ${isMine 
                          ? 'bg-orange-500 text-white rounded-3xl rounded-tr-sm shadow-[0_4px_14px_rgba(234,88,12,0.2)]' 
                          : 'bg-white border border-gray-100 text-gray-900 rounded-3xl rounded-tl-sm'
                        }
                      `}>
                        {/* File Attachment Mock inside bubble */}
                        {msg.text.includes("ファイル") && !msg.text.includes("見積もりをご提示") && (
                          <div className={`flex items-center gap-3 p-3 rounded-xl mb-3 border cursor-pointer group transition-all
                            ${isMine ? 'bg-orange-600/30 border-orange-400/30 hover:bg-orange-600/40' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}
                          `}>
                            <div className={`p-2 rounded-lg ${isMine ? 'bg-orange-500' : 'bg-white shadow-sm'}`}>
                              <FileText className={`w-5 h-5 ${isMine ? 'text-white' : 'text-blue-500'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                               <p className={`text-xs font-bold truncate ${isMine ? 'text-white' : 'text-gray-900'}`}>清掃マニュアル_v2.pdf</p>
                               <p className={`text-[10px] ${isMine ? 'text-orange-200' : 'text-gray-500'}`}>2.4 MB</p>
                            </div>
                          </div>
                        )}
                        {msg.text}
                      </div>

                      <div className="flex items-center gap-1.5 mt-1.5 px-1">
                        {isMine && <span className="flex items-center gap-0.5 text-[10px] text-orange-600 font-bold"><CheckCheck className="w-3 h-3"/>既読</span>}
                        <span className="text-[11px] text-gray-400 font-bold flex items-center gap-0.5"><Clock className="w-3 h-3"/>{formatTime(msg.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat Input Area */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 bg-gradient-to-t from-white via-white/95 to-transparent z-20">
             <div className="max-w-3xl mx-auto flex items-end gap-2 bg-white p-2 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.08)] border border-gray-200 ring-4 ring-white/50 transition-all focus-within:shadow-[0_8px_30px_rgba(234,88,12,0.15)] focus-within:border-orange-300">
               <button className="p-3 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors shrink-0 flex items-center justify-center">
                 <ImageIcon className="w-6 h-6" />
               </button>
               <button className="p-3 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors shrink-0 flex items-center justify-center -ml-2">
                 <Paperclip className="w-6 h-6" />
               </button>
               <textarea 
                 className="flex-1 bg-transparent border-none resize-none max-h-32 min-h-[44px] py-3.5 px-2 text-base font-medium text-gray-900 focus:ring-0 placeholder-gray-400 outline-none"
                 placeholder="メッセージを送信..."
                 rows={1}
                 value={chatMessage}
                 onChange={(e) => setChatMessage(e.target.value)}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter' && !e.shiftKey) {
                     e.preventDefault();
                     handleSendMessage();
                   }
                 }}
               ></textarea>
               <button 
                 onClick={handleSendMessage}
                 disabled={!chatMessage.trim()}
                 className={`p-3 rounded-full transition-all shadow-md shrink-0 mr-1 mb-1 flex items-center justify-center
                   ${chatMessage.trim() ? 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                 `}
               >
                 <Send className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />
               </button>
             </div>
          </div>
          
        </main>

        {/* =========================================
            Right Sidebar: Quote Details (Desktop Only)
        ========================================= */}
        <aside className="hidden lg:flex w-[400px] flex-col border-l border-gray-200 bg-white z-20 shrink-0 shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
          <div className="h-20 shrink-0 flex items-center px-8 border-b border-gray-100 bg-white">
            <h3 className="font-black text-gray-900 flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-orange-500" />
              お見積り内容
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 relative">
            {chat.quote ? (
              <div className="flex flex-col gap-8 animate-in slide-in-from-right-4 fade-in duration-500">
                
                {/* Master Price Card */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden ring-1 ring-gray-900/50">
                   <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"></div>
                   <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                   
                   <div className="text-xs font-bold text-gray-400 mb-2 drop-shadow-sm flex items-center gap-1.5 uppercase tracking-wider">
                     <ShieldCheck className="w-4 h-4 text-emerald-400" />
                     保証付き最終見積もり
                   </div>
                   <div className="flex items-baseline gap-1 mt-2">
                     <span className="text-2xl font-bold text-gray-400">¥</span>
                     <span className="text-5xl font-black tracking-tighter drop-shadow-md">
                       {chat.quote.total.toLocaleString()}
                     </span>
                     <span className="text-sm font-bold text-gray-500 ml-1">(税込)</span>
                   </div>
                </div>

                {/* Main Actions */}
                <div className="flex flex-col gap-3 relative z-10">
                  <button className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-black text-lg py-5 rounded-2xl shadow-[0_8px_20px_rgba(234,88,12,0.3)] hover:shadow-[0_10px_25px_rgba(234,88,12,0.4)] transition-all transform hover:-translate-y-1 group">
                    <CheckCircle2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    この内容で依頼を確定する
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 font-bold py-4 rounded-xl transition-all">
                    条件を変更して再計算
                  </button>
                </div>

                {/* Breakdown */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
                    <h4 className="text-sm font-black text-gray-900">料金内訳</h4>
                  </div>
                  <div className="p-2">
                    {chat.quote.breakdown.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center p-4 border-b border-dashed border-gray-100 last:border-0 hover:bg-orange-50/50 transition-colors rounded-xl">
                        <div className="pr-4">
                          <div className="text-sm font-bold text-gray-900">{item.item}</div>
                          {item.quantity && item.unitPrice && (
                            <div className="text-[11px] text-gray-500 mt-1 font-bold bg-gray-100 px-2 py-0.5 rounded inline-block">
                              ¥{item.unitPrice.toLocaleString()} × {item.quantity}
                            </div>
                          )}
                        </div>
                        <div className="font-black text-lg text-gray-900 shrink-0">
                          ¥{item.price.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm gap-4">
                <Spinner />
                <p className="font-bold">お見積りを自動算出中です...</p>
              </div>
            )}
          </div>
        </aside>

        {/* =========================================
            Mobile Quote Drawer (BottomSheet)
        ========================================= */}
        <div className={`
          lg:hidden fixed inset-x-0 bottom-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]
          ${isQuoteDrawerOpen ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'}
        `}>
          {isQuoteDrawerOpen && (
            <div 
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[-1] transition-opacity animate-in fade-in" 
              onClick={() => setIsQuoteDrawerOpen(false)}
            />
          )}

          <div className="bg-white rounded-t-3xl shadow-[0_-15px_40px_rgba(0,0,0,0.15)] flex flex-col max-h-[85vh] ring-1 ring-gray-200/50">
            
            <div 
              className="p-5 cursor-pointer flex flex-col items-center bg-white rounded-t-3xl"
              onClick={() => setIsQuoteDrawerOpen(!isQuoteDrawerOpen)}
            >
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-4" />
              <div className="w-full flex justify-between items-center px-1">
                <span className="font-black text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-500" />
                  お見積り内容
                </span>
                {!isQuoteDrawerOpen ? (
                  <div className="font-black text-orange-600 text-2xl flex items-center gap-1 tracking-tight">
                    ¥{chat.quote?.total.toLocaleString()}
                    <ChevronUp className="w-6 h-6 text-gray-400 ml-1" />
                  </div>
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </div>

            {isQuoteDrawerOpen && (
              <div className="flex-1 overflow-y-auto p-6 pb-12 border-t border-gray-100 bg-gray-50/50">
                {chat.quote ? (
                  <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
                    
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                       <div className="absolute -right-6 -top-6 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl"></div>
                       <div className="text-xs text-gray-400 font-bold mb-1 uppercase tracking-widest">総額見積もり</div>
                       <div className="flex items-baseline gap-1 mt-2">
                         <span className="text-xl font-bold text-gray-400">¥</span>
                         <span className="text-4xl font-black tracking-tighter">{chat.quote.total.toLocaleString()}</span>
                         <span className="text-xs font-bold text-gray-500 ml-1">(税込)</span>
                       </div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 bg-orange-600 active:bg-orange-700 text-white font-black text-lg py-4 rounded-2xl shadow-[0_8px_20px_rgba(234,88,12,0.3)] transition-transform active:scale-[0.98]">
                      <CheckCircle2 className="w-6 h-6" />
                      この内容で依頼を確定する
                    </button>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
                      <h4 className="text-sm font-black text-gray-900 mb-4 pb-3 border-b border-gray-100">料金内訳</h4>
                      <div className="flex flex-col">
                        {chat.quote.breakdown.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center py-3 border-b border-dashed border-gray-100 last:border-0 last:pb-0">
                            <div className="pr-3">
                              <div className="text-sm font-bold text-gray-900">{item.item}</div>
                              {item.quantity && item.unitPrice && (
                                <div className="text-[11px] font-bold text-gray-500 mt-1 bg-gray-50 px-2 py-0.5 rounded inline-block">
                                  ¥{item.unitPrice.toLocaleString()} × {item.quantity}
                                </div>
                              )}
                            </div>
                            <div className="text-lg font-black text-gray-900 whitespace-nowrap">
                              ¥{item.price.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="w-full text-center text-sm font-bold text-gray-600 py-4 bg-white border-2 border-gray-200 rounded-xl mt-2 active:bg-gray-50">
                      条件を変更して再計算
                    </button>

                  </div>
                ) : (
                  <div className="py-16 flex flex-col items-center justify-center gap-4 text-gray-500">
                     <Spinner />
                     <p className="font-bold text-sm">お見積りを算出中です...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-8 w-8 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}

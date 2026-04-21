"use client";

import Link from 'next/link';
import { CheckCircle2, ChevronRight, Home, LayoutDashboard, Copy } from 'lucide-react';

export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col font-sans selection:bg-orange-500 selection:text-white relative overflow-hidden">
      
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-100/50 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Global Header */}
      <header className="h-20 shrink-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 flex items-center justify-between px-6 sm:px-10 z-40 relative">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-xl italic tracking-tighter">M</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900 hidden sm:block">見つける<span className="text-orange-500">君</span></span>
        </Link>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6 relative z-10 w-full">
        <div className="max-w-xl w-full bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 text-center relative overflow-hidden animate-in zoom-in-95 duration-500">
          
          {/* Confetti / Starburst Fake SVG inside container */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
          
          <div className="flex justify-center mb-8 relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(16,185,129,0.3)] border-4 border-white transform hover:rotate-12 transition-transform duration-500 relative z-10">
                <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={3} />
              </div>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 tracking-tight relative z-10">
             送信が完了しました！
          </h1>
          
          <p className="text-gray-500 leading-relaxed mb-10 text-sm sm:text-base font-bold relative z-10">
            この度はお問い合わせいただき誠にありがとうございます。<br className="hidden sm:block" />
            担当者、または該当するプロフェッショナルから<br className="hidden sm:block" />
            順次ご連絡・お見積りをお届けいたします。
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-10 text-left relative z-10">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Next Steps</h3>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex flex-col items-center justify-center text-sm font-black text-gray-700 shrink-0 shadow-sm mt-0.5">1</div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">マイページでお見積りを待つ</h4>
                <p className="text-xs font-bold text-gray-500 mt-1">ダッシュボードの「見積もり」ステータスから、届いた金額や提案内容をリアルタイムで確認できます。</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 relative z-10">
            <Link 
              href="/mypage" 
              className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white p-4 sm:p-5 rounded-2xl font-black text-base shadow-[0_8px_20px_rgba(234,88,12,0.25)] hover:shadow-[0_12px_25px_rgba(234,88,12,0.35)] transition-all transform hover:-translate-y-0.5"
            >
              <LayoutDashboard className="w-5 h-5" />
              マイページへ移動する
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/" 
              className="flex items-center justify-center gap-2 w-full bg-white text-gray-600 p-4 sm:p-5 rounded-2xl font-bold text-base border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              <Home className="w-5 h-5 text-gray-400" />
              トップページに戻る
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}

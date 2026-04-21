"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, X, ChevronRight, Home, Settings, User, Building, LayoutDashboard, MessageSquare } from 'lucide-react';

const ROUTES = [
  { group: 'コンシューマー向け (オーナー)', items: [
    { name: 'トップページ', path: '/', icon: <Home className="w-4 h-4"/> },
    { name: '検索・絞り込み', path: '/search', icon: <Compass className="w-4 h-4"/> },
    { name: 'マイページ (案件管理)', path: '/mypage', icon: <User className="w-4 h-4"/> },
    { name: 'チャット (見積ルーム)', path: '/chat/1', icon: <MessageSquare className="w-4 h-4"/> },
    { name: '無料登録フォーム', path: '/register', icon: <ChevronRight className="w-4 h-4"/> },
    { name: '登録完了', path: '/thanks', icon: <ChevronRight className="w-4 h-4"/> },
  ]},
  { group: '業者向けSaaS', items: [
    { name: '業者CRM (Kanban)', path: '/vendor-admin', icon: <LayoutDashboard className="w-4 h-4"/> },
    { name: 'プロフィール設定', path: '/saas-vendor/profile', icon: <Building className="w-4 h-4"/> },
  ]},
  { group: '運営・マスター管理', items: [
    { name: '司令塔 (Admin)', path: '/admin', icon: <Settings className="w-4 h-4"/> },
    { name: 'ユーザー詳細監視', path: '/admin/users/1', icon: <ChevronRight className="w-4 h-4"/> },
    { name: 'サービス＆マスタ設定', path: '/admin/menus', icon: <ChevronRight className="w-4 h-4"/> },
  ]}
];

export default function DevNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Only render in dev mode theoretically, but we'll show it for Satoru always for now
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[9990] bg-gray-900/90 text-white p-3 rounded-full shadow-2xl backdrop-blur-sm border border-gray-700 hover:bg-black transition-all hover:scale-110 group"
      >
        <Compass className="w-6 h-6 group-hover:rotate-45 transition-transform" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-full animate-in zoom-in-95 duration-200 border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
              <div>
                <h3 className="font-black text-gray-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-orange-500" /> 全環境ワープナビゲーター
                </h3>
                <p className="text-[10px] font-bold text-gray-500 mt-0.5">開発・確認用グローバルメニュー</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors">
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6 bg-white">
              {ROUTES.map((group, idx) => (
                <div key={idx}>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 pl-1">{group.group}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.items.map((route, i) => {
                      const isActive = pathname === route.path;
                      return (
                        <Link 
                          key={i} 
                          href={route.path}
                          onClick={() => setIsOpen(false)}
                          className={`
                            flex items-center gap-2 p-3 rounded-xl text-sm font-bold transition-all border
                            ${isActive 
                              ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' 
                              : 'bg-white border-gray-100 text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
                            }
                          `}
                        >
                          <span className={`${isActive ? 'text-blue-500' : 'text-gray-400'}`}>{route.icon}</span>
                          {route.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

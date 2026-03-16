import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquareWarning, 
  FileText, 
  Settings, 
  LogOut,
  Bell,
  Home
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col transition-all duration-300">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
          <span className="bg-orange-500 text-white rounded-md px-2 py-1 text-xl font-black mr-2 shadow-sm">見</span>
          <div>
            <span className="text-gray-900 font-bold text-lg leading-none">Admin Portal</span>
            <span className="block text-[10px] text-gray-500 font-medium">運営ダッシュボード</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <nav className="px-4 space-y-1">
            <Link href="/admin" className="flex items-center px-3 py-2.5 bg-blue-50 text-blue-700 rounded-md group font-bold">
              <LayoutDashboard className="h-5 w-5 mr-3 text-blue-600" />
              <span>ダッシュボード</span>
            </Link>
            
            <div className="pt-6 pb-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
              Management
            </div>
            
            <Link href="/admin/users/1" className="flex items-center px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors group font-medium">
              <Users className="h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-600" />
              <span>ユーザー管理</span>
            </Link>
            
            <Link href="#" className="flex items-center px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors group font-medium">
              <MessageSquareWarning className="h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-600" />
              <span className="flex-1">監視・アラート</span>
              <span className="bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs font-bold">3</span>
            </Link>
            
            <Link href="/admin/master/categories" className="flex items-center px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors group font-medium">
              <FileText className="h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-600" />
              <span>マスタ管理</span>
            </Link>
            
            <div className="pt-6 pb-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
              System
            </div>
            
            <Link href="#" className="flex items-center px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors group font-medium">
              <Settings className="h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-600" />
              <span>設定</span>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50/50">
          <div className="flex items-center mb-4 px-2">
            <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
              S
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">Satoru Koike</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
          <button className="flex items-center justify-center w-full px-3 py-2 text-sm text-gray-600 font-bold bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors">
            <LogOut className="h-4 w-4 mr-2" />
            ログアウト
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-2">
            {/* Breadcrumb pseudo */}
            <span className="text-sm font-bold text-gray-800">運営ダッシュボード</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-sm font-bold text-gray-500 hover:text-blue-600 flex items-center transition-colors">
              <Home className="h-4 w-4 mr-1.5" />
              ユーザー画面を確認
            </Link>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

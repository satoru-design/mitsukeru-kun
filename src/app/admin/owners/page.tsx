"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  ShieldAlert,
  Download
} from 'lucide-react';

const mockOwners = [
  { id: "OWN-10023", name: "鈴木 一郎", email: "ichiro@example.com", props: 3, registDate: "2026/01/10", lastLogin: "2026/03/15", status: "active" },
  { id: "OWN-10024", name: "佐藤 美咲", email: "misaki.s@example.com", props: 1, registDate: "2026/01/12", lastLogin: "2026/03/02", status: "active" },
  { id: "OWN-10025", name: "高橋 健太", email: "takahashi.k@example.com", props: 5, registDate: "2026/01/15", lastLogin: "2026/03/16", status: "active" },
  { id: "OWN-10026", name: "加藤 裕子", email: "yuko.kato@example.com", props: 0, registDate: "2026/02/05", lastLogin: "2026/02/05", status: "inactive" },
  { id: "OWN-10027", name: "インベスターズ合同会社", email: "info@investors-llc.jp", props: 12, registDate: "2026/02/10", lastLogin: "2026/03/17", status: "active" },
  { id: "OWN-10028", name: "トラブル 太郎", email: "trouble@suspicious.com", props: 2, registDate: "2026/02/20", lastLogin: "2026/03/10", status: "suspended" },
];

export default function AdminOwnersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOwners = mockOwners.filter(owner => 
    owner.name.includes(searchTerm) || 
    owner.email.includes(searchTerm) || 
    owner.id.includes(searchTerm)
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="h-6 w-6 mr-3 text-blue-600" />
            オーナー管理
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            プラットフォームに登録しているオーナー（発注者）の一覧・検索・ステータス管理を行います。
          </p>
        </div>
        <button className="bg-white border text-sm border-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-50 font-medium transition-colors flex items-center">
          <Download className="h-4 w-4 mr-2" />
          CSVエクスポート
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="名前、メールアドレス、IDで検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option value="all">すべてのステータス</option>
              <option value="active">アクティブ</option>
              <option value="inactive">未稼働</option>
              <option value="suspended">利用停止（ペナルティ）</option>
            </select>
            <button className="bg-white border text-sm border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm hover:bg-gray-50 flex items-center">
              <Filter className="h-4 w-4 mr-1" />
              詳細絞り込み
            </button>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">オーナー情報</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">登録物件数</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">登録日 / 最終ログイン</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOwners.map((owner) => (
                <tr key={owner.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {owner.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{owner.name}</div>
                        <div className="text-sm text-gray-500">{owner.email}</div>
                        <div className="text-xs text-gray-400 mt-0.5">ID: {owner.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{owner.props} 件</div>
                    {owner.props > 0 && (
                      <Link href="#" className="text-xs text-blue-600 hover:underline">物件一覧を見る</Link>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{owner.registDate}</div>
                    <div className="text-xs text-gray-500">最終: {owner.lastLogin}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {owner.status === 'active' && (
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        アクティブ
                      </span>
                    )}
                    {owner.status === 'inactive' && (
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        未稼働
                      </span>
                    )}
                    {owner.status === 'suspended' && (
                      <span className="px-2.5 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        <ShieldAlert className="h-3 w-3 mr-1" />
                        利用停止中
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Link href={`/admin/users/${owner.id}`} className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors">
                      詳細
                    </Link>
                    <button className="text-gray-400 hover:text-gray-900 p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredOwners.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              該当するオーナーが見つかりませんでした。
            </div>
          )}
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">1</span> から <span className="font-medium">{filteredOwners.length}</span> 件を表示 (全 {mockOwners.length} 件)
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">前へ</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">次へ</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

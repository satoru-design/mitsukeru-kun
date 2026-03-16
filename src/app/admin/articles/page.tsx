"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye,
  MoreVertical,
  ChevronLeft, 
  ChevronRight,
  Filter
} from 'lucide-react';

const mockArticles = [
  { id: "ART-501", title: "民泊清掃で高評価を得るための5つのポイント", category: "ノウハウ", author: "運営事務局", status: "published", views: 1240, date: "2026/03/10" },
  { id: "ART-502", title: "2026年最新版: インバウンド需要の動向", category: "市場動向", author: "運営事務局", status: "published", views: 890, date: "2026/03/05" },
  { id: "ART-503", title: "スマートロック導入ガイド: おすすめの機種比較", category: "ノウハウ", author: "運営事務局", status: "draft", views: 0, date: "2026/03/15" },
  { id: "ART-504", title: "インボイス制度への対応について", category: "お知らせ", author: "システム管理", status: "published", views: 3500, date: "2026/02/20" },
  { id: "ART-505", title: "新機能リリース: 自動見積り機能のアップデート", category: "お知らせ", author: "システム管理", status: "archived", views: 150, date: "2025/12/10" },
];

export default function AdminArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = mockArticles.filter(art => 
    art.title.includes(searchTerm) || 
    art.category.includes(searchTerm)
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FileText className="h-6 w-6 mr-3 text-indigo-600" />
            記事管理
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            プラットフォーム上で公開するお知らせ、ノウハウ記事、市場レポートなどのコンテンツを管理します。
          </p>
        </div>
        <div className="flex space-x-3">
          <Link href="/admin/articles/categories" className="bg-white border text-sm border-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-50 font-medium transition-colors flex items-center">
            カテゴリー管理
          </Link>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-1.5" />
            新規記事作成
          </button>
        </div>
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="記事タイトル、カテゴリーで検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="all">ステータス：すべて</option>
              <option value="published">公開中</option>
              <option value="draft">下書き</option>
              <option value="archived">アーカイブ</option>
            </select>
            <button className="bg-white border text-sm border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm hover:bg-gray-50 flex items-center">
              <Filter className="h-4 w-4 mr-1" />
              絞り込み
            </button>
          </div>
        </div>

        {/* Articles Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">記事タイトル</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">カテゴリー</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">閲覧数 / 最終更新</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredArticles.map((art) => (
                <tr key={art.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-900 line-clamp-2">{art.title}</div>
                    <div className="text-xs text-gray-500 mt-1">ID: {art.id} | 著者: {art.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-xs border border-gray-200">
                      {art.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {art.status === 'published' && (
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        公開中
                      </span>
                    )}
                    {art.status === 'draft' && (
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        下書き
                      </span>
                    )}
                    {art.status === 'archived' && (
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-600">
                        アーカイブ
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Eye className="h-3.5 w-3.5 mr-1 text-gray-400" />
                      {art.views.toLocaleString()} PV
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{art.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2 flex justify-end">
                    <button className="text-gray-400 hover:text-indigo-600 p-1.5 rounded-md hover:bg-indigo-50 transition-colors" title="プレビュー">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-blue-600 p-1.5 rounded-md hover:bg-blue-50 transition-colors" title="編集">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors" title="削除">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

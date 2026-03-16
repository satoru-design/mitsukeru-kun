"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Search, 
  Filter, 
  MoreVertical, 
  MapPin,
  Clock,
  ChevronLeft, 
  ChevronRight,
  Download,
  AlertTriangle
} from 'lucide-react';

const mockProperties = [
  { id: "PROP-3001", title: "新宿駅徒歩5分 1LDK", owner: "鈴木 一郎", address: "東京都新宿区西新宿1-1-1", category: "定期清掃", status: "active_req", reqDate: "2026/03/15", deadline: "2026/03/20" },
  { id: "PROP-3002", title: "浅草雷門 新築戸建", owner: "佐藤 美咲", address: "東京都台東区浅草2-2-2", category: "写真・動画撮影", status: "matched", reqDate: "2026/03/10", deadline: "-" },
  { id: "PROP-3003", title: "大阪難波 リノベマンション", owner: "インベスターズ合同会社", address: "大阪府大阪市中央区難波3-3", category: "完全代行", status: "active_req", reqDate: "2026/03/16", deadline: "2026/03/31" },
  { id: "PROP-3004", title: "京都町屋 ゲストハウス", owner: "インベスターズ合同会社", address: "京都府京都市東山区", category: "現地サポート", status: "urgent", reqDate: "2026/03/17", deadline: "2026/03/17" },
  { id: "PROP-3005", title: "渋谷神泉 デザイナーズ", owner: "トラブル 太郎", address: "東京都渋谷区神泉町", category: "スマートロック設置・設定", status: "suspended", reqDate: "2026/02/20", deadline: "-" },
];

export default function AdminPropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = mockProperties.filter(prop => 
    prop.title.includes(searchTerm) || 
    prop.owner.includes(searchTerm) || 
    prop.id.includes(searchTerm) ||
    prop.address.includes(searchTerm)
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Home className="h-6 w-6 mr-3 text-purple-600" />
            オーナー物件・依頼事項案件管理
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            オーナーが登録した物件データおよび、業者に向けて発行された「依頼事項案件」の一覧を管理・検索します。
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="物件名、オーナー名、住所、案件IDで検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
              <option value="all">案件ステータス：すべて</option>
              <option value="active_req">募集中（未マッチ）</option>
              <option value="matched">マッチング済 / 進行中</option>
              <option value="urgent">至急対応待ち</option>
              <option value="completed">完了</option>
            </select>
            <button className="bg-white border text-sm border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm hover:bg-gray-50 flex items-center">
              <Filter className="h-4 w-4 mr-1" />
              カテゴリ絞り込み
            </button>
          </div>
        </div>

        {/* Properties Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">物件・依頼事項案件 (案件ID)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">オーナー / 住所</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">依頼カテゴリ</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス / 期限</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProperties.map((prop) => (
                <tr key={prop.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{prop.title}</div>
                    <div className="text-xs text-gray-500 mt-1">ID: {prop.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">{prop.owner}</div>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                      {prop.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs border border-gray-200">
                      {prop.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="mb-1">
                      {prop.status === 'active_req' && (
                        <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          募集中
                        </span>
                      )}
                      {prop.status === 'matched' && (
                        <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                          進行中 (マッチ済)
                        </span>
                      )}
                      {prop.status === 'urgent' && (
                        <span className="px-2.5 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          至急対応中
                        </span>
                      )}
                      {prop.status === 'suspended' && (
                        <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-600">
                          凍結/停止
                        </span>
                      )}
                    </div>
                    {prop.status !== 'matched' && prop.status !== 'suspended' && (
                      <div className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        期限: {prop.deadline}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Link href={`#`} className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors">
                      編集・詳細
                    </Link>
                    <button className="text-gray-400 hover:text-gray-900 p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProperties.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              該当する物件・案件が見つかりませんでした。
            </div>
          )}
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">1</span> から <span className="font-medium">{filteredProperties.length}</span> 件を表示 (全 {mockProperties.length} 件)
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

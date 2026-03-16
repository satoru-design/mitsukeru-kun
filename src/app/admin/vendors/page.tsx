"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldCheck,
  Shield,
  Clock,
  ChevronLeft, 
  ChevronRight,
  Download
} from 'lucide-react';

const mockVendors = [
  { id: "VEND-20041", name: "株式会社クリーンアップ", email: "contact@cleanup.example.com", category: "清掃", kyc: "approved", rating: 4.8, projects: 45, registDate: "2026/01/05", status: "active" },
  { id: "VEND-20042", name: "鈴木カメラマン", email: "suzuki.photo@example.com", category: "写真・動画撮影", kyc: "approved", rating: 4.9, projects: 12, registDate: "2026/01/15", status: "active" },
  { id: "VEND-20043", name: "山田清掃", email: "yamada.clean@example.com", category: "清掃", kyc: "pending", rating: 0, projects: 0, registDate: "2026/03/16", status: "active" },
  { id: "VEND-20044", name: "合同会社サポート", email: "info@support-llc.jp", category: "現地サポート", kyc: "approved", rating: 4.2, projects: 8, registDate: "2026/02/01", status: "active" },
  { id: "VEND-20045", name: "Minpaku Solutions", email: "hello@minpaku-sol.com", category: "完全代行", kyc: "rejected", rating: 0, projects: 0, registDate: "2026/03/10", status: "inactive" },
];

export default function AdminVendorsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVendors = mockVendors.filter(vendor => 
    vendor.name.includes(searchTerm) || 
    vendor.email.includes(searchTerm) || 
    vendor.id.includes(searchTerm) ||
    vendor.category.includes(searchTerm)
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Briefcase className="h-6 w-6 mr-3 text-emerald-600" />
            業者会員管理
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            プラットフォームに登録している業者（受注者）の一覧・検索・KYC（本人確認）状況の管理を行います。
          </p>
        </div>
        <button className="bg-white border text-sm border-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-50 font-medium transition-colors flex items-center">
          <Download className="h-4 w-4 mr-2" />
          CSVエクスポート
        </button>
      </div>

      {/* KYC Alert Panel */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start justify-between">
        <div className="flex items-start">
          <Clock className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-amber-800">本人確認 (KYC) の審査待ちが 1 件あります</h3>
            <p className="text-xs text-amber-700 mt-1">
              業者がプラットフォームでサービスを提供するためには、本人確認書類・資格証明書の承認が必要です。
            </p>
          </div>
        </div>
        <button className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1.5 rounded text-sm font-medium transition-colors">
          審査する
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="業者名、カテゴリ、メールアドレスで検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md">
              <option value="all">KYCステータス：すべて</option>
              <option value="approved">認証済み</option>
              <option value="pending">審査待ち</option>
              <option value="rejected">否認</option>
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">業者情報 / メインカテゴリ</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">KYC (本人確認)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">実績 / 評価</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">登録日</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border border-emerald-200">
                        {vendor.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900">{vendor.name}</div>
                        <div className="text-sm text-gray-500">{vendor.email}</div>
                        <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                          <span>ID: {vendor.id}</span>
                          <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">{vendor.category}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {vendor.kyc === 'approved' && (
                      <span className="inline-flex flex-col items-center text-xs font-medium text-emerald-600">
                        <ShieldCheck className="h-5 w-5 mb-1" />
                        認証済 (公式バッジ)
                      </span>
                    )}
                    {vendor.kyc === 'pending' && (
                      <span className="inline-flex flex-col items-center text-xs font-medium text-amber-500">
                        <Clock className="h-5 w-5 mb-1" />
                        審査待ち
                      </span>
                    )}
                    {vendor.kyc === 'rejected' && (
                      <span className="inline-flex flex-col items-center text-xs font-medium text-gray-400">
                        <Shield className="h-5 w-5 mb-1 opacity-50" />
                        未提出/否認
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{vendor.projects} 件完了</div>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-400 text-xs">★</span>
                      <span className="text-sm font-bold text-gray-700 ml-1">{vendor.rating > 0 ? vendor.rating : '-'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vendor.registDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    {vendor.kyc === 'pending' && (
                      <Link href={`/admin/users/${vendor.id}?tab=kyc`} className="text-amber-600 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-md transition-colors font-bold mr-2">
                        KYC審査
                      </Link>
                    )}
                    <Link href={`/admin/users/${vendor.id}`} className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors">
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
          
          {filteredVendors.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              該当する業者が見つかりませんでした。
            </div>
          )}
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">1</span> から <span className="font-medium">{filteredVendors.length}</span> 件を表示 (全 {mockVendors.length} 件)
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

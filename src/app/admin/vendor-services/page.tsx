"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  MoreVertical, 
  MapPin,
  CheckCircle,
  ChevronLeft, 
  ChevronRight,
  Download
} from 'lucide-react';

const mockVendorServices = [
  { id: "VSERV-4001", vendor: "株式会社クリーンアップ", category: "定期清掃", areas: ["東京都港区", "東京都渋谷区", "東京都新宿区"], basePrice: "4,000円〜", status: "active", updated: "2026/03/10" },
  { id: "VSERV-4002", vendor: "株式会社クリーンアップ", category: "水回りクリーニング", areas: ["東京都全域"], basePrice: "12,000円〜", status: "active", updated: "2026/03/10" },
  { id: "VSERV-4003", vendor: "鈴木カメラマン", category: "写真・動画撮影", areas: ["埼玉県全域", "東京都23区"], basePrice: "15,000円〜", status: "active", updated: "2026/02/15" },
  { id: "VSERV-4004", vendor: "合同会社サポート", category: "現地サポート", areas: ["大阪府大阪市中央区"], basePrice: "都度見積もり", status: "active", updated: "2026/02/05" },
  { id: "VSERV-4005", vendor: "Minpaku Solutions", category: "完全代行", areas: ["全国"], basePrice: "売上の20%", status: "inactive", updated: "2026/01/20" },
];

export default function AdminVendorServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = mockVendorServices.filter(service => 
    service.vendor.includes(searchTerm) || 
    service.category.includes(searchTerm) || 
    service.id.includes(searchTerm)
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <ClipboardCheck className="h-6 w-6 mr-3 text-emerald-600" />
            業者対応可能事項・案件情報管理
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            業者が提供設定しているサービス（対応可能カテゴリ、対応エリア、価格設定）の一覧とその状態を管理します。
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="業者名、カテゴリ、サービスIDで検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md">
              <option value="all">カテゴリ：すべて</option>
              <option value="cleaning">清掃系</option>
              <option value="operation">運営・代行系</option>
              <option value="setup">立ち上げ・インフラ系</option>
            </select>
            <button className="bg-white border text-sm border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm hover:bg-gray-50 flex items-center">
              <Filter className="h-4 w-4 mr-1" />
              エリア詳細絞り込み
            </button>
          </div>
        </div>

        {/* Services Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">業者名 / サービスID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">提供カテゴリ・対応エリア</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">基本料金フラグ</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">公開ステータス</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900 hover:text-blue-600 cursor-pointer">{service.vendor}</div>
                    <div className="text-xs text-gray-500 mt-1">ID: {service.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="mb-1">
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-sm text-xs font-bold border border-gray-200">
                        {service.category}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-start mt-2">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex flex-wrap gap-1">
                        {service.areas.map((area, i) => (
                          <span key={i} className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[11px]">{area}</span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{service.basePrice}</div>
                    <div className="text-xs text-gray-500 mt-1">最終更新: {service.updated}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {service.status === 'active' ? (
                      <span className="px-2.5 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                        提供中 (公開)
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-500">
                        非公開 / 準備中
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Link href={`#`} className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors">
                      単価設定を確認
                    </Link>
                    <button className="text-gray-400 hover:text-gray-900 p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredServices.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              該当する提供可能サービスが見つかりませんでした。
            </div>
          )}
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">1</span> から <span className="font-medium">{filteredServices.length}</span> 件を表示 (全 {mockVendorServices.length} 件)
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

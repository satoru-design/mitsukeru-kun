"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FolderTree, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  GripVertical,
  ChevronLeft
} from 'lucide-react';

const initialCategories = [
  { id: "ACAT-1", name: "お知らせ", slug: "news", articleCount: 12, sortOrder: 1 },
  { id: "ACAT-2", name: "ノウハウ", slug: "know-how", articleCount: 45, sortOrder: 2 },
  { id: "ACAT-3", name: "市場動向", slug: "market-trends", articleCount: 8, sortOrder: 3 },
  { id: "ACAT-4", name: "システムアップデート", slug: "updates", articleCount: 24, sortOrder: 4 },
  { id: "ACAT-5", name: "よくある質問", slug: "faq", articleCount: 56, sortOrder: 5 },
];

export default function ArticleCategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/articles" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <FolderTree className="h-6 w-6 mr-3 text-indigo-600" />
              記事カテゴリー管理
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              お知らせやノウハウ記事を分類するためのカテゴリーを管理します。
            </p>
          </div>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors flex items-center">
          <Plus className="h-4 w-4 mr-1.5" />
          カテゴリー追加
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        {/* Table/List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="w-10 px-4 py-3"></th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">カテゴリー名</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">スラッグ (URL用)</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">記事数</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-4 py-4 text-center">
                    <div className="text-gray-300 cursor-grab hover:text-gray-600 flex justify-center">
                      <GripVertical className="h-5 w-5" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{cat.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-gray-100 font-mono text-gray-600 px-2 py-1 rounded text-xs">
                      {cat.slug}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                      {cat.articleCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
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
          
          {categories.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              カテゴリーが登録されていません。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

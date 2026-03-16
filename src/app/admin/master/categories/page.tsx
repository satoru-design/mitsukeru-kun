"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FolderTree, 
  Plus, 
  Edit2, 
  Trash2, 
  MoreVertical,
  ChevronRight,
  ChevronDown,
  GripVertical,
  Save,
  FileText
} from 'lucide-react';
import { categoriesData } from '../../../../data/mockData';

// ダミーデータとして現在のカテゴリ情報を少し加工して使用
type CategoryNode = {
  id: string;
  name: string;
  isExpanded?: boolean;
  children?: CategoryNode[];
  itemCount?: number;
};

const initialData: CategoryNode[] = categoriesData.map((group, i) => ({
  id: `g-${i}`,
  name: group.group,
  isExpanded: i === 0, // 最初だけ開いておく
  children: group.items.map((item, j) => ({
    id: `c-${i}-${j}`,
    name: item,
    itemCount: Math.floor(Math.random() * 10) + 2 // ダミーの設問数
  }))
}));

export default function MasterCategoriesPage() {
  const [categories, setCategories] = useState<CategoryNode[]>(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const toggleExpand = (id: string) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, isExpanded: !cat.isExpanded } : cat
    ));
  };

  const startEdit = (cat: CategoryNode) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const saveEdit = () => {
    if (!editName.trim()) return;
    
    // 大カテゴリ名の更新
    let newCategories = categories.map(cat => 
      cat.id === editingId ? { ...cat, name: editName } : cat
    );

    // 中カテゴリ名の更新 (雑な走査だがUIモック用)
    newCategories = newCategories.map(cat => ({
      ...cat,
      children: cat.children?.map(child => 
        child.id === editingId ? { ...child, name: editName } : child
      )
    }));

    setCategories(newCategories);
    setEditingId(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FolderTree className="h-6 w-6 mr-3 text-blue-600" />
            メニュー・カテゴリ管理
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            提供機能の大カテゴリ・中カテゴリの階層構造を管理します。中カテゴリごとの料金設定は詳細画面で行います。
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center">
          <Plus className="h-4 w-4 mr-1.5" />
          大カテゴリを追加
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center text-sm font-medium text-gray-600">
          <span>カテゴリ構成ツリー</span>
          <span>ドラッグ＆ドロップで並び替え可能</span>
        </div>
        
        <div className="p-4">
          <div className="space-y-3">
            {categories.map((group) => (
              <div key={group.id} className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                {/* 大カテゴリ Header */}
                <div 
                  className={`flex items-center px-4 py-3 cursor-pointer select-none transition-colors ${group.isExpanded ? 'bg-blue-50/50 border-b border-gray-100' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex-shrink-0 mr-2 text-gray-400 cursor-grab hover:text-gray-600">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  
                  <div 
                    className="flex-shrink-0 mr-2 text-gray-500" 
                    onClick={() => toggleExpand(group.id)}
                  >
                    {group.isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  </div>

                  <div className="flex-1 min-w-0" onClick={() => toggleExpand(group.id)}>
                    {editingId === group.id ? (
                      <div className="flex items-center" onClick={e => e.stopPropagation()}>
                        <input
                          type="text"
                          className="border border-blue-400 rounded px-2 py-1 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          autoFocus
                          onKeyDown={e => e.key === 'Enter' && saveEdit()}
                          onBlur={saveEdit}
                        />
                      </div>
                    ) : (
                      <h3 className="text-base font-bold text-gray-900 truncate">
                        {group.name}
                      </h3>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button 
                      className="text-gray-400 hover:text-blue-600 p-1.5 rounded-md hover:bg-blue-100 transition-colors"
                      title="中カテゴリを追加"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                      onClick={(e) => { e.stopPropagation(); startEdit(group); }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-gray-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-100 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* 中カテゴリ List (children) */}
                {group.isExpanded && group.children && (
                  <div className="bg-gray-50/50 py-2">
                    {group.children.map((child, index) => (
                      <div key={child.id} className="flex items-center px-4 py-2.5 group/item hover:bg-white transition-colors relative">
                        {/* Tree hierarchy lines */}
                        <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200"></div>
                        <div className="absolute left-6 top-1/2 w-4 h-px bg-gray-200"></div>

                        <div className="ml-10 flex-shrink-0 mr-3 text-gray-300 cursor-grab hover:text-gray-500 invisible group-hover/item:visible">
                          <GripVertical className="h-4 w-4" />
                        </div>

                        <div className="flex-1 min-w-0 flex items-center">
                          {editingId === child.id ? (
                            <input
                              type="text"
                              className="border border-blue-400 rounded px-2 py-1 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs"
                              value={editName}
                              onChange={e => setEditName(e.target.value)}
                              autoFocus
                              onKeyDown={e => e.key === 'Enter' && saveEdit()}
                              onBlur={saveEdit}
                            />
                          ) : (
                            <span className="text-sm font-medium text-gray-700">{child.name}</span>
                          )}
                          
                          <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">
                            設問: {child.itemCount}件
                          </span>
                        </div>

                        <div className="flex items-center space-x-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                          <Link 
                            href={`/admin/master/categories/${child.id}`}
                            className="flex items-center text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors mr-2"
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            設問・単価設定
                          </Link>
                          
                          <button 
                            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                            onClick={() => startEdit(child)}
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button className="text-gray-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-100 transition-colors">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add child button */}
                    <div className="flex items-center px-4 py-2 relative">
                      <div className="absolute left-6 top-0 bottom-1/2 w-px bg-gray-200"></div>
                      <div className="absolute left-6 top-1/2 w-4 h-px bg-gray-200"></div>
                      <button className="ml-10 flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
                        <Plus className="h-4 w-4 mr-1" />
                        中カテゴリを追加
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

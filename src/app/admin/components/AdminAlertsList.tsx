"use client";

import React, { useState } from 'react';
import { 
  MessageSquareWarning, 
  UserCheck, 
  CreditCard,
  X,
  CheckCircle2,
  AlertOctagon,
  ShieldAlert
} from 'lucide-react';

type AlertType = 'ng_word' | 'kyc_pending' | 'payment_error' | 'user_report';

interface Alert {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  time: string;
  details?: {
    userId?: string;
    userName?: string;
    targetUser?: string;
    transactionId?: string;
    amount?: number;
    evidenceText?: string;
    ngWords?: string[];
  };
}

const INITIAL_ALERTS: Alert[] = [
  {
    id: 'a1',
    type: 'ng_word',
    title: 'NGワード検知（直接取引の疑い）',
    description: '「LINE交換しませんか？」というメッセージが検知されました。',
    time: '10分前',
    details: {
      userId: 'U-10294',
      userName: '田中 太郎 (オーナー)',
      targetUser: '株式会社クリーンアップ (業者)',
      evidenceText: '先日の見積もりの件ですが、もしよろしければLINE交換しませんか？そちらの方がやり取りがスムーズかと思います。私のIDは xyz1234 です。直接お話しできればと思います。',
      ngWords: ['LINE交換', '直接']
    }
  },
  {
    id: 'a2',
    type: 'kyc_pending',
    title: '本人確認(KYC) 承認待ち',
    description: '株式会社クリーンアップ（業者）から免許証がアップロードされました。',
    time: '1時間前',
    details: {
      userId: 'V-5092',
      userName: '株式会社クリーンアップ',
    }
  },
  {
    id: 'a3',
    type: 'payment_error',
    title: '決済エラー',
    description: 'ユーザーID: 10293 のクレジットカード決済（1500円）が失敗しました。',
    time: '2時間前',
    details: {
      userId: 'U-10293',
      userName: '鈴木 一郎',
      transactionId: 'TXN-982374',
      amount: 1500
    }
  },
  {
    id: 'a4',
    type: 'user_report',
    title: 'ユーザー通報',
    description: '「連絡が途絶えた」という理由で通報がありました。',
    time: '昨日 15:30',
  },
  {
    id: 'a5',
    type: 'kyc_pending',
    title: '本人確認(KYC) 承認待ち',
    description: '山田 清掃（業者）から資格証明書がアップロードされました。',
    time: '昨日 14:20',
  }
];

export default function AdminAlertsList() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);

  const handleAction = (alertId: string, actionType: string) => {
    // 擬似的な処理中のアニメーションと削除
    setIsRemoving(alertId);
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== alertId));
      setSelectedAlert(null);
      setIsRemoving(null);
    }, 400); // 400msのアニメーション待ち
  };

  const getIcon = (type: AlertType) => {
    switch(type) {
      case 'ng_word': return <MessageSquareWarning className="h-5 w-5 text-red-500" />;
      case 'kyc_pending': return <UserCheck className="h-5 w-5 text-blue-500" />;
      case 'payment_error': return <CreditCard className="h-5 w-5 text-amber-500" />;
      case 'user_report': return <ShieldAlert className="h-5 w-5 text-purple-500" />;
      default: return <AlertOctagon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getActionText = (type: AlertType) => {
    return type === 'kyc_pending' ? '審査する' : '詳細確認';
  };

  // 証拠テキスト内のNGワードをハイライトする関数
  const renderHighlightedText = (text: string, ngWords: string[]) => {
    if (!text || !ngWords || ngWords.length === 0) return text;
    
    // 全てのNGワードをパイプで繋いで正規表現を作成
    const regex = new RegExp(`(${ngWords.join('|')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => {
      if (ngWords.some(word => part.toLowerCase() === word.toLowerCase())) {
        return <span key={i} className="bg-red-100 text-red-800 font-bold px-1 rounded mx-0.5 border border-red-200">{part}</span>;
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <CheckCircle2 className="h-10 w-10 text-emerald-400 mb-2" />
            <p className="font-medium text-gray-600">現在、対応が必要なアラートはありません。</p>
            <p className="text-xs mt-1">ダッシュボードは平和です 🎉</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {alerts.map((alert) => (
              <li 
                key={alert.id} 
                className={`p-4 hover:bg-gray-50 transition-all duration-300 cursor-pointer ${
                  isRemoving === alert.id ? 'opacity-0 scale-95 origin-top -translate-y-4' : 'opacity-100 scale-100'
                }`}
                onClick={() => setSelectedAlert(alert)}
              >
                <div className="flex flex-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    {getIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{alert.title}</p>
                    <p className="text-sm text-gray-500 mt-1 truncate">{alert.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-medium">{alert.time}</span>
                      <button 
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors"
                        onClick={(e) => {
                          e.stopPropagation(); // liのクリックイベントを発火させない
                          setSelectedAlert(alert);
                        }}
                      >
                        {getActionText(alert.type)}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 詳細モーダル (Overlay) */}
      {selectedAlert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-[slideIn_0.2s_ease-out]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {getIcon(selectedAlert.type)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{selectedAlert.title}</h3>
                  <p className="text-xs text-gray-500 font-medium">{selectedAlert.time}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAlert(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              
              {/* ユーザー情報セクション */}
              {(selectedAlert.details?.userId || selectedAlert.details?.userName) && (
                <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">関連ユーザー</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ユーザー名</p>
                      <p className="text-sm font-bold text-gray-900 flex items-center">
                        {selectedAlert.details.userName}
                        <a href={`/admin/users/${selectedAlert.details.userId}`} className="ml-2 text-xs text-blue-600 hover:underline">詳細</a>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ユーザーID</p>
                      <p className="text-sm font-mono text-gray-700">{selectedAlert.details.userId}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* NGワード特有パネル */}
              {selectedAlert.type === 'ng_word' && selectedAlert.details?.evidenceText && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">検知されたメッセージ全文</h4>
                  <div className="bg-red-50/50 border border-red-100 rounded-lg p-4 font-sans text-sm text-gray-800 leading-relaxed relative">
                    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                       <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm shadow-red-500/30">
                         マッチ率高
                       </span>
                    </div>
                    {renderHighlightedText(selectedAlert.details.evidenceText, selectedAlert.details.ngWords || [])}
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
                    <span className="font-bold flex items-center mb-1">
                      <AlertOctagon className="h-4 w-4 mr-1.5" />プラットフォーム規約 第8条違反の疑い
                    </span>
                    運営が仲介しない直接取引を誘導する行為は禁止されています。
                  </div>
                </div>
              )}

              {/* 決済エラー特有パネル */}
              {selectedAlert.type === 'payment_error' && (
                <div>
                   <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">取引情報</h4>
                   <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                      <div className="flex justify-between items-center border-b border-amber-200/50 pb-2 mb-2">
                        <span className="text-sm text-amber-800">決済金額</span>
                        <span className="text-lg font-bold text-amber-900">¥{selectedAlert.details?.amount?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-amber-700">トランザクションID</span>
                        <span className="font-mono text-amber-900">{selectedAlert.details?.transactionId}</span>
                      </div>
                   </div>
                </div>
              )}

            </div>

            {/* Modal Footer (Actions) */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3 justify-end items-center">
              
              <button 
                onClick={() => handleAction(selectedAlert.id, 'ignore')}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                問題なし（ミュート）
              </button>

              {selectedAlert.type === 'ng_word' && (
                <>
                  <button 
                    onClick={() => handleAction(selectedAlert.id, 'warn')}
                    className="px-4 py-2 bg-amber-500 text-white text-sm font-bold rounded-lg hover:bg-amber-600 transition-colors shadow-sm shadow-amber-500/20"
                  >
                    警告を送る
                  </button>
                  <button 
                    onClick={() => handleAction(selectedAlert.id, 'ban')}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors shadow-sm shadow-red-600/20"
                  >
                    アカウント凍結
                  </button>
                </>
              )}

              {selectedAlert.type === 'kyc_pending' && (
                <>
                  <button 
                    onClick={() => handleAction(selectedAlert.id, 'reject')}
                    className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 text-sm font-bold rounded-lg hover:bg-red-100 transition-colors"
                  >
                    差し戻す
                  </button>
                  <button 
                    onClick={() => handleAction(selectedAlert.id, 'approve')}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
                  >
                    本人確認を承認
                  </button>
                </>
              )}

              {(selectedAlert.type === 'payment_error' || selectedAlert.type === 'user_report') && (
                <button 
                  onClick={() => handleAction(selectedAlert.id, 'resolve')}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
                >
                  対応完了とする
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Add custom keyframe for slide/fade in to Tailwind global indirectly or via inline style class if needed. 
          Will rely on typical Tailwind opacity transition if custom class not found. 
      */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />
    </div>
  );
}

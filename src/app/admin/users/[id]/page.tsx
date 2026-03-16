import React from 'react';
import { 
  ArrowLeft,
  User,
  ShieldAlert,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
  ];
}

export default function AdminUserDetailPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/users" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">ユーザー詳細</h1>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border text-sm border-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors">
            パスワードリセット
          </button>
          <button className="bg-red-50 border text-sm border-red-200 text-red-600 hover:bg-red-100 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 font-medium transition-colors flex items-center">
            <ShieldAlert className="h-4 w-4 mr-2" />
            ペナルティ管理
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Basic Info & Penalty */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
            <div className="px-6 pb-6 relative">
              <div className="absolute -top-12 left-6">
                <div className="w-24 h-24 rounded-xl bg-white p-1 shadow-md border border-gray-100">
                  <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                    <User className="h-10 w-10" />
                  </div>
                </div>
              </div>
              <div className="mt-14">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">株式会社クリーンアップ</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-200">
                    業者
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">ID: VEND-102938</p>
                <div className="mt-4 flex items-center text-emerald-600 text-sm font-medium">
                  <CheckCircle className="h-4 w-4 mr-1.5" />
                  アカウント有効 (アクティブ)
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value="contact@cleanup.example.com" />
                <InfoRow icon={<Phone className="h-4 w-4" />} label="電話" value="03-1234-5678" />
                <InfoRow icon={<Building className="h-4 w-4" />} label="代表者" value="山田 太郎" />
                <InfoRow icon={<MapPin className="h-4 w-4" />} label="住所" value="東京都渋谷区〇〇 1-2-3" />
                <InfoRow icon={<Clock className="h-4 w-4" />} label="登録日" value="2026/01/15 14:30" />
              </div>
            </div>
          </div>

          {/* Penalty Management Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-red-200 overflow-hidden">
            <div className="bg-red-50 px-5 py-3 border-b border-red-100 flex items-center">
              <ShieldAlert className="h-5 w-5 text-red-600 mr-2" />
              <h3 className="font-semibold text-red-800">ペナルティ管理</h3>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-gray-600 mb-2">悪質な行為が確認された場合、アカウントの制限を行います。</p>
              
              <button className="w-full flex justify-between items-center py-2 px-3 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-left text-sm font-medium text-gray-700 transition">
                <span>警告メール送信</span>
                <Mail className="h-4 w-4 text-gray-400" />
              </button>
              
              <button className="w-full flex justify-between items-center py-2 px-3 bg-amber-50 border border-amber-200 rounded-md hover:bg-amber-100 text-left text-sm font-medium text-amber-900 transition">
                <span>アカウント一時停止</span>
                <Clock className="h-4 w-4 text-amber-600" />
              </button>
              
              <button className="w-full flex justify-between items-center py-2 px-3 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 text-left text-sm font-medium text-red-700 transition">
                <span>強制退会（BAN）処理</span>
                <XCircle className="h-4 w-4 text-red-600" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: KYC, Stats, History */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* KYC Panel (Very Important for Trust & Safety) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">本人確認 (KYC) 審査</h3>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                審査待ち
              </span>
            </div>
            <div className="p-6">
              <div className="flex space-x-6">
                <div className="w-1/2">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">アップロード書類: 運転免許証 (表面)</h4>
                  <div className="aspect-[1.6/1] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden group">
                    {/* Placeholder for actual image */}
                    <span className="text-gray-400 text-sm font-medium group-hover:hidden">画像プレビュー</span>
                    <button className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      拡大表示
                    </button>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">入力情報との照合</h4>
                  <div className="bg-gray-50 p-4 rounded-lg flex-1 border border-gray-100">
                    <ul className="space-y-3 text-sm">
                      <li className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500">氏名:</span>
                        <span className="font-medium text-gray-900">山田 太郎</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500">生年月日:</span>
                        <span className="font-medium text-gray-900">1985/05/20</span>
                      </li>
                      <li className="flex justify-between pb-1">
                        <span className="text-gray-500">住所:</span>
                        <span className="font-medium text-gray-900 text-right">東京都渋谷区〇〇 1-2-3</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-md text-sm font-bold shadow-sm transition-colors flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      承認する
                    </button>
                    <button className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-2.5 rounded-md text-sm font-bold shadow-sm transition-colors flex items-center justify-center">
                      <XCircle className="h-4 w-4 mr-2 text-red-500" />
                      非承認 (再提出)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Wallet */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                保有チケット残高
              </h3>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-gray-900">12</span>
                <span className="text-gray-500 font-medium mb-1">枚</span>
              </div>
              <button className="mt-4 text-sm text-blue-600 font-medium hover:underline">購入履歴を見る</button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                マッチング実績
              </h3>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-gray-900">48</span>
                <span className="text-gray-500 font-medium mb-1">件 成約</span>
              </div>
              <div className="mt-3 flex items-center text-sm">
                <span className="text-yellow-500 mr-1">★★★★☆</span>
                <span className="font-medium text-gray-700">4.8</span>
                <span className="text-gray-400 ml-2">(レビュー 32件)</span>
              </div>
            </div>
          </div>

          {/* Latest Transactions / Interventions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">直近の取引履歴</h3>
              <button className="text-sm text-blue-600 font-medium hover:underline">すべて見る</button>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 font-medium">取引ID / 相手</th>
                  <th className="px-6 py-3 font-medium">ステータス</th>
                  <th className="px-6 py-3 font-medium">金額</th>
                  <th className="px-6 py-3 font-medium text-right">アクション</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">TRX-98234</p>
                    <p className="text-gray-500 text-xs">オーナー: 鈴木 一郎</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                      作業中
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">¥15,000</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-900 font-medium">詳細・監視</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 bg-red-50/50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">TRX-98102</p>
                    <p className="text-gray-500 text-xs">オーナー: 佐藤 健</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 flex w-fit">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      トラブル報告あり
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">¥42,000</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-red-600 hover:text-red-900 font-bold">強制介入する</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">TRX-97554</p>
                    <p className="text-gray-500 text-xs">オーナー: 高橋 美紀</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                      完了（支払い済）
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">¥8,500</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-900 font-medium">詳細</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center text-sm">
      <div className="w-6 flex justify-center text-gray-400">{icon}</div>
      <div className="w-20 text-gray-500 ml-1">{label}</div>
      <div className="flex-1 text-gray-900 font-medium truncate">{value}</div>
    </div>
  );
}

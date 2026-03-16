import React from 'react';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  Percent,
  AlertTriangle,
  UserCheck,
  MessageSquareWarning,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ダッシュボードサマリー</h1>
          <p className="text-sm text-gray-500 mt-1">プラットフォーム全体の運営状況とKPIを確認します</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-white border text-sm border-gray-300 text-gray-700 py-2.5 px-4 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-medium">
            <option>今日</option>
            <option>今週</option>
            <option>当月（2026年3月）</option>
            <option>全期間</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-sm font-bold transition-colors shadow-sm flex items-center">
            レポートを出力
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard 
          title="流通取引総額 (GMV)" 
          value="¥12,450,000" 
          trend="+15.2%" 
          isPositive={true}
          icon={<TrendingUp className="h-6 w-6 text-blue-500" />} 
        />
        <KpiCard 
          title="プラットフォーム手数料" 
          value="¥2,490,000" 
          trend="+15.2%" 
          isPositive={true}
          icon={<CreditCard className="h-6 w-6 text-emerald-500" />} 
        />
        <KpiCard 
          title="チケット販売額" 
          value="¥845,500" 
          trend="+5.4%" 
          isPositive={true}
          icon={<CreditCard className="h-6 w-6 text-indigo-500" />} 
        />
        <KpiCard 
          title="新規登録数" 
          value="142" 
          subValue="オーナー: 120 / 業者: 22"
          trend="-2.1%" 
          isPositive={false}
          icon={<Users className="h-6 w-6 text-amber-500" />} 
        />
        <KpiCard 
          title="マッチング成約率" 
          value="34.2%" 
          trend="+1.2%" 
          isPositive={true}
          icon={<Percent className="h-6 w-6 text-purple-500" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area (Placeholder) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">売上推移</h2>
          </div>
          <div className="h-72 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium flex items-center"><TrendingUp className="mr-2 h-5 w-5" /> チャート表示エリア（Recharts等で実装）</p>
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              要対応アラート
            </h2>
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">5件</span>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-gray-100">
              <AlertItem 
                icon={<MessageSquareWarning className="h-5 w-5 text-red-500" />}
                title="NGワード検知（直接取引の疑い）"
                description="「LINE交換しませんか？」というメッセージが検知されました。"
                time="10分前"
                actionText="詳細確認"
              />
              <AlertItem 
                icon={<UserCheck className="h-5 w-5 text-blue-500" />}
                title="本人確認(KYC) 承認待ち"
                description="株式会社クリーンアップ（業者）から免許証がアップロードされました。"
                time="1時間前"
                actionText="審査する"
              />
              <AlertItem 
                icon={<CreditCard className="h-5 w-5 text-amber-500" />}
                title="決済エラー"
                description="ユーザーID: 10293 のクレジットカード決済（1500円）が失敗しました。"
                time="2時間前"
                actionText="詳細確認"
              />
              <AlertItem 
                icon={<MessageSquareWarning className="h-5 w-5 text-red-500" />}
                title="ユーザー通報"
                description="「連絡が途絶えた」という理由で通報がありました。"
                time="昨日 15:30"
                actionText="詳細確認"
              />
              <AlertItem 
                icon={<UserCheck className="h-5 w-5 text-blue-500" />}
                title="本人確認(KYC) 承認待ち"
                description="山田 清掃（業者）から資格証明書がアップロードされました。"
                time="昨日 14:20"
                actionText="審査する"
              />
            </ul>
          </div>
          <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-xl text-center">
            <button className="text-sm text-blue-600 font-medium hover:text-blue-800">すべてのアラートを見る</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, subValue, trend, isPositive, icon }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
          {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`flex items-center text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
          {trend}
        </span>
        <span className="text-xs text-gray-400 ml-2">前月比</span>
      </div>
    </div>
  );
}

function AlertItem({ icon, title, description, time, actionText }: any) {
  return (
    <li className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex flex-start gap-4">
        <div className="mt-1 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500 mt-1 truncate">{description}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-400">{time}</span>
            <button className="text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors">
              {actionText}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

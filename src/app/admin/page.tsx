import React from 'react';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  Percent,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import AdminAlertsList from './components/AdminAlertsList';

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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[400px]">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between shrink-0">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              要対応アラート
            </h2>
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">5件</span>
          </div>
          
          <AdminAlertsList />

          <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-xl text-center shrink-0">
            <button className="text-sm text-blue-600 font-medium hover:text-blue-800">すべてのアラートを見る</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, subValue, trend, isPositive, icon }: any) {
  return (
    <div className={`rounded-xl shadow-sm border p-5 flex flex-col transition-all hover:shadow-md ${
      !isPositive && parseFloat(trend) < -2 ? 'bg-red-50/50 border-red-200' : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-bold text-gray-500">{title}</p>
          <h3 className={`text-2xl font-black mt-1 tracking-tight ${
            !isPositive && parseFloat(trend) < -2 ? 'text-red-900' : 'text-gray-900'
          }`}>{value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${!isPositive && parseFloat(trend) < -2 ? 'bg-red-100' : 'bg-gray-50'}`}>
          {icon}
        </div>
      </div>
      {subValue && <p className="text-xs font-medium text-gray-400 mt-2">{subValue}</p>}
      <div className="mt-auto pt-4 flex items-center">
        <span className={`flex items-center text-sm font-black px-2 py-0.5 rounded-md ${
          isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
        }`}>
          {isPositive ? <ArrowUpRight className="h-4 w-4 mr-0.5" /> : <ArrowDownRight className="h-4 w-4 mr-0.5" />}
          {trend}
        </span>
        <span className="text-xs font-bold text-gray-400 ml-2">前月比</span>
      </div>
    </div>
  );
}

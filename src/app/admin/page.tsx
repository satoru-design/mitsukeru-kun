import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  Percent,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  ShieldAlert,
  Zap,
  MoreHorizontal
} from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12 selection:bg-blue-500 selection:text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            Platform Command Center
            <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-md tracking-widest uppercase">Live</span>
          </h1>
          <p className="text-sm font-bold text-gray-500 mt-1">「見つける君」全トラフィックおよびKPIのリアルタイム監視</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-white border text-sm border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold transition-all hover:border-blue-300">
            <option>今日 (リアルタイム)</option>
            <option>今週</option>
            <option>当月（2026年4月）</option>
          </select>
          <button className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-xl text-sm font-black transition-all shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
            レポートを出力
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard 
          title="流通取引総額 (GMV) / 月間" 
          value="¥12,450,000" 
          trend="+15.2%" 
          isPositive={true}
          color="blue"
          icon={<TrendingUp className="h-5 w-5" />} 
        />
        <KpiCard 
          title="プラットフォーム手数料" 
          value="¥2,490,000" 
          trend="+15.2%" 
          isPositive={true}
          color="emerald"
          icon={<CreditCard className="h-5 w-5" />} 
        />
        <KpiCard 
          title="特急チケット利用額" 
          value="¥845,500" 
          trend="+45.4%" 
          isPositive={true}
          color="amber"
          icon={<Zap className="h-5 w-5" />} 
        />
        <KpiCard 
          title="アクティブ登録者数" 
          value="1,424" 
          subValue="オ:1,102 / 業:322"
          trend="-2.1%" 
          isPositive={false}
          color="rose"
          icon={<Users className="h-5 w-5" />} 
        />
        <KpiCard 
          title="マッチング成約率 (直近7日)" 
          value="34.2%" 
          trend="+1.2%" 
          isPositive={true}
          color="purple"
          icon={<Percent className="h-5 w-5" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 p-6 sm:p-8 flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-blue-50/50 to-transparent rounded-bl-[100px] pointer-events-none"></div>
          
          <div className="flex items-start justify-between mb-8 relative z-10">
            <div>
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                取引額および成約トランザクション推移
              </h2>
              <div className="text-sm font-bold text-gray-500 mt-1">過去30日間の売上動向</div>
            </div>
            <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          <div className="flex-1 h-72 flex items-end justify-between relative mt-auto z-10">
            {/* Mock Chart Grid */}
            <div className="absolute inset-0 flex flex-col justify-between z-0 pb-6 pointer-events-none opacity-50">
               {[1,2,3,4,5].map(i => <div key={i} className="w-full border-t border-dashed border-gray-200"></div>)}
            </div>
            {/* Mock SVG Chart Area */}
            <div className="absolute inset-0 z-10 overflow-hidden pb-6">
               <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,80 C10,70 20,90 30,50 C40,10 50,40 60,30 C70,20 80,60 90,40 L100,50 L100,100 L0,100 Z" fill="url(#blue-grad)" opacity="0.3" className="transition-all duration-1000 group-hover:opacity-50" />
                  <path d="M0,80 C10,70 20,90 30,50 C40,10 50,40 60,30 C70,20 80,60 90,40 L100,50" fill="none" stroke="#3b82f6" strokeWidth="2.5" className="drop-shadow-md" />
                  <defs>
                    <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
               </svg>
            </div>
            {/* Mock X-Axis Labels */}
            <div className="absolute bottom-0 inset-x-0 flex justify-between text-[10px] font-bold text-gray-400">
              <span>3/1</span><span>3/8</span><span>3/15</span><span>3/22</span><span>3/29</span>
            </div>
          </div>
        </div>

        {/* Alerts & System Status Panel */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-[450px] relative overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white relative z-10">
            <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-red-500" />
              要対応アラート
            </h2>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="bg-red-50 text-red-600 text-xs font-black px-2.5 py-1 rounded-md border border-red-100 shadow-sm">5件</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 bg-gray-50/50">
             {/* Manually embedded mock alerts to skip external component dependencies for this UI overhaul */}
             <div className="flex flex-col gap-2 p-2">
                {[
                  { level: 'high', type: '決済エラー', text: 'Stripe決済失敗（カード限度額）', id: 'ACT-908' },
                  { level: 'high', type: 'スパム検知', text: 'メッセージ内で直電番号の送信を検知', id: 'MSG-442' },
                  { level: 'medium', type: '本人確認', text: '新規業者の登記簿アップロードあり', id: 'KYC-102' },
                  { level: 'medium', type: 'キャンセル', text: '受注確定後の直前キャンセル発生', id: 'ACT-905' },
                  { level: 'low', type: 'システム', text: 'バックアップジョブ正常完了', id: 'SYS-001' }
                ].map((alert, i) => (
                  <div key={i} className={`p-4 rounded-2xl border bg-white flex flex-col gap-2 hover:shadow-md transition-shadow cursor-pointer
                    ${alert.level === 'high' ? 'border-red-200 border-l-4 border-l-red-500 hover:border-red-300' : 
                      alert.level === 'medium' ? 'border-amber-200 border-l-4 border-l-amber-500 hover:border-amber-300' :
                      'border-gray-200 border-l-4 border-l-gray-400 hover:border-gray-300'}
                  `}>
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded
                        ${alert.level === 'high' ? 'bg-red-100 text-red-700' :
                          alert.level === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}
                      `}>{alert.type}</span>
                      <span className="text-[10px] font-bold text-gray-400">{alert.id}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800 leading-tight">{alert.text}</p>
                  </div>
                ))}
             </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-white text-center shrink-0">
            <Link href="/admin/logs" className="text-sm font-black text-blue-600 hover:text-blue-700 hover:underline transition-colors block py-1">
              すべてのシステムログを見る →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, subValue, trend, isPositive, icon, color }: any) {
  const colorMap: any = {
    blue: { icon: 'bg-blue-100 text-blue-600', hover: 'hover:border-blue-300 hover:shadow-blue-500/10' },
    emerald: { icon: 'bg-emerald-100 text-emerald-600', hover: 'hover:border-emerald-300 hover:shadow-emerald-500/10' },
    amber: { icon: 'bg-amber-100 text-amber-600', hover: 'hover:border-amber-300 hover:shadow-amber-500/10' },
    rose: { icon: 'bg-rose-100 text-rose-600', hover: 'hover:border-rose-300 hover:shadow-rose-500/10' },
    purple: { icon: 'bg-purple-100 text-purple-600', hover: 'hover:border-purple-300 hover:shadow-purple-500/10' },
  };

  const colors = colorMap[color];

  return (
    <div className={`rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border p-5 flex flex-col transition-all duration-300 relative overflow-hidden bg-white ${colors.hover} ${
      !isPositive && parseFloat(trend) < -2 ? 'border-red-200' : 'border-gray-200'
    }`}>
      {/* Decorative gradient corner */}
      <div className={`absolute -right-6 -top-6 w-20 h-20 rounded-full blur-2xl opacity-20 bg-${color}-500 pointer-events-none`}></div>

      <div className="flex justify-between items-start mb-2 relative z-10">
        <p className="text-[11px] font-black text-gray-500 uppercase tracking-wider">{title}</p>
        <div className={`p-2 rounded-xl shrink-0 shadow-sm ${colors.icon}`}>
          {icon}
        </div>
      </div>
      
      <div className="relative z-10 mb-2">
        <h3 className={`text-3xl font-black tracking-tighter ${
          !isPositive && parseFloat(trend) < -2 ? 'text-red-600' : 'text-gray-900'
        }`}>{value}</h3>
      </div>
      
      {subValue && <p className="text-[10px] font-bold text-gray-400 mb-2">{subValue}</p>}
      
      <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between relative z-10">
        <span className={`flex items-center text-xs font-black px-2 py-1 rounded-lg border ${
          isPositive ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'
        }`}>
          {isPositive ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
          {trend}
        </span>
        <span className="text-[10px] font-bold text-gray-400">前月比</span>
      </div>
    </div>
  );
}

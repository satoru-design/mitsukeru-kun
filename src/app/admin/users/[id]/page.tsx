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
  AlertTriangle,
  Eye,
  Settings,
  MoreVertical,
  Activity,
  History
} from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
  ];
}

export default function AdminUserDetailPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12 selection:bg-blue-500 selection:text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/users" className="p-3 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl transition-all shadow-sm">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              ユーザー詳細監視
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-md tracking-widest uppercase border border-emerald-200 shadow-sm">Active</span>
            </h1>
            <p className="text-sm font-bold text-gray-500 mt-1">ID: VEND-102938 / ロール: 業者</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border text-sm border-gray-200 text-gray-700 py-2.5 px-5 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:bg-gray-50 hover:border-gray-300 font-black transition-all flex items-center justify-center gap-2">
            <Settings className="w-4 h-4" /> パスワード再設定
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white py-2.5 px-6 rounded-xl shadow-[0_4px_14px_rgba(239,68,68,0.39)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.4)] hover:-translate-y-0.5 font-black transition-all flex items-center justify-center gap-2 group">
            <ShieldAlert className="h-4 w-4 group-hover:scale-110 transition-transform" />
            ペナルティ管理
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column: Basic Info & Penalty */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden relative">
            <div className="h-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
            </div>
            
            <div className="px-8 pb-8 relative">
              <div className="absolute -top-14 left-8">
                <div className="w-28 h-28 rounded-2xl bg-white p-1.5 shadow-xl border border-gray-100 overflow-hidden z-10 relative">
                  <div className="w-full h-full bg-gradient-to-tr from-gray-100 to-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                    <Building className="h-12 w-12 text-blue-500/50" />
                  </div>
                </div>
              </div>
              
              <div className="absolute top-4 right-6">
                <button className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-16">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">株式会社リベンライズ</h2>
                </div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded border border-blue-100 uppercase">Provider</span>
                  <span className="flex items-center text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    本人確認完了
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <InfoRow icon={<Mail className="h-4 w-4" />} label="E-mail" value="contact@cleanup.example.com" />
                <InfoRow icon={<Phone className="h-4 w-4" />} label="TEL" value="03-1234-5678" />
                <InfoRow icon={<User className="h-4 w-4" />} label="代表者" value="山田 太郎" />
                <div className="w-full h-px bg-gray-100 my-2"></div>
                <InfoRow icon={<MapPin className="h-4 w-4" />} label="所在地" value="東京都渋谷区神南 1-2-3" />
                <InfoRow icon={<Clock className="h-4 w-4" />} label="登録日時" value="2026/01/15 14:30" />
              </div>
              
              <button className="w-full mt-8 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-black py-4 rounded-xl flex justify-center items-center gap-2 transition-colors text-sm">
                <Eye className="w-4 h-4" /> 公開プロフィールを確認
              </button>
            </div>
          </div>

          {/* Penalty Management Panel */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-red-100 overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none transition-transform group-hover:scale-150 duration-500"></div>
            
            <div className="bg-red-50/50 px-6 py-4 border-b border-red-100 flex items-center justify-between">
              <h3 className="font-black text-red-800 flex items-center gap-2 text-sm uppercase tracking-wider">
                <ShieldAlert className="h-4 w-4 text-red-600" />
                ペナルティ・BAN管理
              </h3>
            </div>
            
            <div className="p-6 space-y-4 relative z-10">
              <p className="text-xs font-bold text-gray-500 mb-2 leading-relaxed">重大な利用規約違反が確認された場合、即座にアカウントへの制裁措置を実行します。</p>
              
              <button className="w-full flex justify-between items-center py-3.5 px-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm text-left text-sm font-black text-gray-700 transition-all">
                <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-400" /> 警告メール送信</span>
                <ChevronRight className="h-4 w-4 text-gray-300" />
              </button>
              
              <button className="w-full flex justify-between items-center py-3.5 px-4 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 hover:shadow-sm text-left text-sm font-black text-amber-900 transition-all shadow-inner">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-amber-600" /> アカウント一時停止</span>
                <ChevronRight className="h-4 w-4 text-amber-600/50" />
              </button>
              
              <button className="w-full flex justify-between items-center py-3.5 px-4 bg-red-50 border-2 border-red-200 rounded-xl hover:bg-red-100 hover:border-red-300 hover:shadow-sm text-left text-sm font-black text-red-700 transition-all shadow-[0_2px_10px_rgba(239,68,68,0.1)]">
                <span className="flex items-center gap-2"><XCircle className="h-4 w-4 text-red-600" /> 強制退会（BAN）処置</span>
                <ChevronRight className="h-4 w-4 text-red-600/50" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: KYC, Stats, History */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* KYC Panel (Very Important for Trust & Safety) */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50">
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-amber-500" />
                本人確認 (KYC) 審査ステータス
              </h3>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-3 py-1.5 rounded border border-amber-200 flex items-center w-fit uppercase tracking-wider shadow-sm">
                <Clock className="h-3 w-3 mr-1.5" />
                審査待ち (要確認)
              </span>
            </div>
            
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                
                <div className="w-full md:w-1/2">
                  <h4 className="text-xs font-black text-gray-500 mb-3 uppercase tracking-wider">提出された身分証明書</h4>
                  <div className="aspect-[1.58/1] bg-gray-100 rounded-2xl border border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group shadow-inner cursor-pointer hover:border-blue-300 transition-colors">
                    {/* Placeholder for actual image */}
                    <div className="text-gray-400 font-black group-hover:scale-105 transition-transform flex flex-col items-center gap-2">
                       <ShieldAlert className="w-8 h-8 opacity-50" />
                       <span className="text-sm">運転免許証_表面.jpg</span>
                    </div>
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all font-black text-sm">
                      <Eye className="w-8 h-8 mb-2" />
                      高解像度で確認する
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col">
                  <h4 className="text-xs font-black text-gray-500 mb-3 uppercase tracking-wider">抽出データとの照合</h4>
                  <div className="bg-gray-50/80 p-5 rounded-2xl flex-1 border border-gray-100">
                    <ul className="space-y-4 text-sm">
                      <li className="flex justify-between items-center border-b border-gray-200/60 pb-3">
                        <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">氏名</span>
                        <span className="font-black text-gray-900 border-b-2 border-blue-200 leading-tight">山田 太郎</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-gray-200/60 pb-3">
                        <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">生年月日</span>
                        <span className="font-black text-gray-900">1985/05/20</span>
                      </li>
                      <li className="flex flex-col gap-1 pb-1">
                        <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">住所 (OCR抽出)</span>
                        <span className="font-black text-gray-900 bg-white p-2 rounded border border-gray-200 shadow-sm leading-relaxed">東京都渋谷区神南 1-2-3</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-5 flex gap-3">
                    <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 border border-emerald-600 text-white py-3.5 rounded-xl text-sm font-black shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5">
                      <CheckCircle className="h-5 w-5" />
                      直ちに承認
                    </button>
                    <button className="bg-white border-2 border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-200 hover:text-red-600 py-3.5 px-5 rounded-xl text-sm font-black shadow-sm transition-all flex items-center justify-center">
                      再提出
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Stats & Wallet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-8 relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-colors"></div>
              
              <h3 className="text-xs font-black text-gray-500 mb-6 flex items-center uppercase tracking-widest">
                <CreditCard className="h-4 w-4 mr-2" />
                保有特急チケット残高
              </h3>
              <div className="flex items-baseline gap-2 relative z-10">
                <span className="text-5xl font-black text-gray-900 tracking-tighter">12</span>
                <span className="text-gray-500 font-bold text-sm">枚</span>
              </div>
              <button className="mt-6 text-sm text-blue-600 font-black hover:underline relative z-10 flex items-center gap-1">購入履歴を見る <ChevronRight className="w-4 h-4"/></button>
            </div>
            
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-8 relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-colors"></div>

              <h3 className="text-xs font-black text-gray-500 mb-6 flex items-center uppercase tracking-widest">
                <Activity className="h-4 w-4 mr-2" />
                マッチング実績 / 評価
              </h3>
              <div className="flex items-baseline gap-2 relative z-10">
                <span className="text-5xl font-black text-gray-900 tracking-tighter">48</span>
                <span className="text-gray-500 font-bold text-sm">件 成約</span>
              </div>
              <div className="mt-4 flex items-center text-sm relative z-10 bg-gray-50 w-fit px-3 py-1.5 rounded-lg border border-gray-100">
                <span className="text-amber-400 mr-2 drop-shadow-sm font-black tracking-widest">★★★★☆</span>
                <span className="font-black text-gray-900">4.8</span>
                <span className="text-gray-400 ml-2 font-bold text-[10px]">/ 32件のレビュー</span>
              </div>
            </div>
          </div>

          {/* Latest Transactions / Interventions */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white relative z-10">
              <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <History className="w-5 h-5 text-gray-400" />
                直近のトランザクション履歴
              </h3>
              <button className="text-xs text-blue-600 font-black flex items-center gap-1 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">すべて見る <ChevronRight className="w-3 h-3"/></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-8 py-3.5 font-black text-[10px] uppercase tracking-widest">取引ID / 顧客情報</th>
                    <th className="px-8 py-3.5 font-black text-[10px] uppercase tracking-widest">進行ステータス</th>
                    <th className="px-8 py-3.5 font-black text-[10px] uppercase tracking-widest">決済金額</th>
                    <th className="px-8 py-3.5 font-black text-[10px] uppercase tracking-widest text-right">アクション</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-blue-50/50 transition-colors group cursor-pointer">
                    <td className="px-8 py-5">
                      <p className="font-black text-gray-900 text-sm mb-0.5 group-hover:text-blue-600 transition-colors">TRX-98234</p>
                      <p className="text-gray-500 font-bold text-xs flex items-center gap-1"><User className="w-3 h-3"/> オーナー: 鈴木 一郎</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded bg-amber-100 border border-amber-200 text-[10px] font-black text-amber-800 uppercase tracking-wider">
                        作業中 / 完了待ち
                      </span>
                    </td>
                    <td className="px-8 py-5 font-black text-gray-900 text-base">¥15,000</td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-gray-400 hover:text-blue-600 bg-white border border-gray-200 hover:border-blue-300 font-black text-xs px-3 py-1.5 rounded shadow-sm transition-all">監査・詳細</button>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-red-50/80 bg-red-50/30 transition-colors group cursor-pointer relative">
                    <td className="px-8 py-5">
                      <p className="font-black text-gray-900 text-sm mb-0.5">TRX-98102</p>
                      <p className="text-gray-500 font-bold text-xs flex items-center gap-1"><User className="w-3 h-3"/> オーナー: 佐藤 健</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded bg-red-100 border border-red-200 text-[10px] font-black text-red-700 shadow-sm animate-pulse w-fit">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        トラブル介入要請
                      </span>
                    </td>
                    <td className="px-8 py-5 font-black text-gray-900 text-base">¥42,000</td>
                    <td className="px-8 py-5 text-right">
                      <button className="bg-red-600 hover:bg-red-700 text-white font-black text-xs px-4 py-2 rounded shadow-sm transition-colors border border-red-800">強制介入</button>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-blue-50/50 transition-colors group cursor-pointer">
                    <td className="px-8 py-5">
                      <p className="font-black text-gray-900 text-sm mb-0.5 group-hover:text-blue-600 transition-colors">TRX-97554</p>
                      <p className="text-gray-500 font-bold text-xs flex items-center gap-1"><User className="w-3 h-3"/> オーナー: 高橋 美紀</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded bg-emerald-100 border border-emerald-200 text-[10px] font-black text-emerald-800 uppercase tracking-wider">
                        通常完了 (決済済)
                      </span>
                    </td>
                    <td className="px-8 py-5 font-black text-gray-900 text-base">¥8,500</td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-gray-400 hover:text-blue-600 bg-white border border-gray-200 hover:border-blue-300 font-black text-xs px-3 py-1.5 rounded shadow-sm transition-all">監査・詳細</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center text-sm py-1 font-bold">
      <div className="w-6 flex justify-center text-gray-400 shrink-0">{icon}</div>
      <div className="w-24 text-gray-400 uppercase tracking-wider text-[10px]">{label}</div>
      <div className="flex-1 text-gray-900 truncate">{value}</div>
    </div>
  );
}
function ChevronRight(props:any){
  return <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
}

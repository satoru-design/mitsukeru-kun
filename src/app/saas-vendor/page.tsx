"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import VendorPricingSettings from "./VendorPricingSettings";

type KanbanStatus = 'inbox' | 'negotiating' | 'scheduled' | 'completed';

interface KanbanJob {
  id: string;
  title: string;
  property: string;
  owner: string;
  date: string;
  amount: number;
  status: KanbanStatus;
  isUrgent?: boolean;
}

const mockJobs: KanbanJob[] = [
  { id: "JOB-101", title: "定期清掃（1LDK）", property: "新宿シティハイツ302", owner: "佐藤 太郎", date: "明日 10:00", amount: 6500, status: 'inbox', isUrgent: true },
  { id: "JOB-102", title: "スマートロック設置", property: "渋谷ロフト1階", owner: "鈴木 マイケル", date: "未定", amount: 25000, status: 'negotiating' },
  { id: "JOB-103", title: "エアコン清掃（2台）", property: "代々木ハウスA棟", owner: "高橋 不動産", date: "3/20 14:00", amount: 18000, status: 'scheduled' },
  { id: "JOB-104", title: "定期清掃（2LDK）", property: "品川レジデンス405", owner: "伊藤 さくら", date: "3/15 11:00", amount: 8000, status: 'completed' },
];

export default function VendorDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pricing' | 'schedule' | 'settings'>('dashboard');
  const [jobs, setJobs] = useState<KanbanJob[]>(mockJobs);

  // Mock schedule state: '2026-03-20': { 'AM': true, 'PM': false, 'Night': false }
  const [schedule, setSchedule] = useState<Record<string, Record<string, boolean>>>({
    '2026-03-18': { 'AM': true, 'PM': true, 'Night': false },
    '2026-03-19': { 'AM': false, 'PM': true, 'Night': true },
    '2026-03-20': { 'AM': true, 'PM': true, 'Night': true },
  });

  const generateDays = () => {
    const days = [];
    const slots = ['AM (9:00~13:00)', 'PM (13:00~18:00)', 'Night (18:00~22:00)'];
    const slotKeys = ['AM', 'PM', 'Night'];

    for(let i=18; i<=24; i++) {
      days.push(`2026-03-${i}`);
    }
    return { days, slots, slotKeys };
  };

  const { days: scheduleDays, slots: scheduleSlots, slotKeys } = generateDays();

  const toggleSlot = (day: string, slotKey: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...(prev[day] || { 'AM': false, 'PM': false, 'Night': false }),
        [slotKey]: !(prev[day]?.[slotKey])
      }
    }));
  };

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<KanbanJob | null>(null);

  const stats = {
    monthlySales: 450000,
    depositBalance: 12000,
    activeJobs: 8,
    rating: 4.8
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('jobId', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // necessary to allow dropping
  };

  const handleDrop = (e: React.DragEvent, newStatus: KanbanStatus) => {
    e.preventDefault();
    const jobId = e.dataTransfer.getData('jobId');
    if (jobId) {
      setJobs(prevJobs => prevJobs.map(job => 
        job.id === jobId ? { ...job, status: newStatus } : job
      ));

      // Trigger modal if dropping into 'completed'
      if (newStatus === 'completed') {
        const job = jobs.find(j => j.id === jobId);
        if (job) {
          setSelectedJob(job);
          setIsReportModalOpen(true);
        }
      }
    }
  };

  const handleJobClick = (job: KanbanJob) => {
    if (job.status === 'scheduled' || job.status === 'completed') {
      setSelectedJob(job);
      setIsReportModalOpen(true);
    } else {
      const chatId = job.id.replace('JOB-', 'c-');
      router.push(`/chat/${chatId}`);
    }
  };

  const renderKanbanColumn = (status: KanbanStatus, title: string, color: string) => {
    const columnJobs = jobs.filter(j => j.status === status);
    
    return (
      <div 
        style={{ flex: '1', minWidth: '300px', background: '#f8fafc', borderRadius: '12px', padding: '15px', borderTop: `4px solid ${color}` }}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, status)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#334155', margin: 0 }}>{title}</h3>
          <span style={{ background: '#e2e8f0', color: '#475569', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>{columnJobs.length}</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {columnJobs.map(job => (
            <div 
              key={job.id} 
              draggable
              onClick={() => handleJobClick(job)}
              onDragStart={(e) => handleDragStart(e, job.id)}
              style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer', position: 'relative' }}
              onDragEnd={(e) => e.currentTarget.style.opacity = '1'}
              onDrag={(e) => e.currentTarget.style.opacity = '0.5'}
            >
              {job.isUrgent && (
                <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', color: 'white', fontSize: '0.7rem', fontWeight: 'bold', padding: '3px 8px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(239,68,68,0.3)' }}>特急枠</div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 'bold' }}>{job.id}</span>
                <span style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 'bold' }}>¥{job.amount.toLocaleString()}</span>
              </div>
              <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem', color: '#1e293b' }}>{job.title}</h4>
              <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                {job.property}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'white' }}>{job.owner[0]}</div>
                  <span style={{ fontSize: '0.8rem', color: '#475569' }}>{job.owner}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  {job.date}
                </div>
              </div>
            </div>
          ))}
          {columnJobs.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem', border: '2px dashed #e2e8f0', borderRadius: '8px' }}>
              案件がありません
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f1f5f9', overflow: 'hidden' }}>
      
      {/* SaaS Sidebar */}
      <aside style={{ width: '260px', background: '#1e293b', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 25px', borderBottom: '1px solid #334155' }}>
          <h1 style={{ margin: 0, fontSize: '1.4rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ background: '#f97316', color: 'white', borderRadius: '6px', padding: '4px 8px', fontSize: '1.2rem', fontWeight: 'black' }}>見</span>
            Pro Portal
          </h1>
          <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>クリーンパートナーズ東京</p>
        </div>
        
        <nav style={{ padding: '20px 15px', flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <button 
            onClick={() => setActiveTab('dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', background: activeTab === 'dashboard' ? '#334155' : 'transparent', color: activeTab === 'dashboard' ? 'white' : '#94a3b8', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', transition: 'all 0.2s', width: '100%' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
            ダッシュボード・案件
          </button>
          
          <button 
            onClick={() => setActiveTab('schedule')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', background: activeTab === 'schedule' ? '#334155' : 'transparent', color: activeTab === 'schedule' ? 'white' : '#94a3b8', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', transition: 'all 0.2s', width: '100%' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            スケジュール
          </button>
          
          <button 
            onClick={() => setActiveTab('pricing')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', background: activeTab === 'pricing' ? '#334155' : 'transparent', color: activeTab === 'pricing' ? 'white' : '#94a3b8', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', transition: 'all 0.2s', width: '100%' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            メニュー・単価設定
          </button>
        </nav>
        
        <div style={{ padding: '20px 25px', borderTop: '1px solid #334155' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>デポジット残高</span>
              <span style={{ fontSize: '0.9rem', color: '#fb923c', fontWeight: 'bold' }}>¥12,000</span>
           </div>
           <button style={{ width: '100%', padding: '10px', background: '#334155', color: '#e2e8f0', border: '1px solid #475569', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer', transition: 'background 0.2s' }}
                   onMouseOver={(e) => e.currentTarget.style.background = '#475569'}
                   onMouseOut={(e) => e.currentTarget.style.background = '#334155'}
           >
             チャージする
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        
        {/* Top Header */}
        <header style={{ height: '70px', background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#1e293b', margin: 0 }}>
            {activeTab === 'dashboard' && '案件ダッシュボード'}
            {activeTab === 'pricing' && 'メニュー・単価設定'}
            {activeTab === 'schedule' && 'スケジュール管理'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Automatic Matching Notifications */}
            <div 
              style={{ position: 'relative', cursor: 'pointer', padding: '5px' }}
              onClick={() => alert("【自動マッチング通知】\n港区で「水回りクリーニング」の新規案件が発生しました！\n★マッチ度: 85%")}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span style={{ position: 'absolute', top: '2px', right: '4px', width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></span>
            </div>
            
            <Link href="/" style={{ fontSize: '0.9rem', color: '#64748b', textDecoration: 'none' }}>ユーザー側サイトを見る</Link>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8', fontWeight: 'bold', fontSize: '1.1rem' }}>
              C
            </div>
          </div>
        </header>

        {/* Dynamic Canvas */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          
          {activeTab === 'dashboard' && (
            <>
              {/* Stats KPIs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '5px' }}>今月の売上見込</div>
                  <div style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 'bold' }}>¥{stats.monthlySales.toLocaleString()}</div>
                  <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                    前月比 +12%
                  </div>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '5px' }}>進行中の案件</div>
                  <div style={{ fontSize: '1.8rem', color: '#0f172a', fontWeight: 'bold' }}>{stats.activeJobs} 件</div>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '5px' }}>総合評価</div>
                  <div style={{ fontSize: '1.8rem', color: '#f59e0b', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    ★ {stats.rating}
                  </div>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '5px' }}>デポジット残高</div>
                  <div style={{ fontSize: '1.8rem', color: '#f97316', fontWeight: 'bold' }}>¥{stats.depositBalance.toLocaleString()}</div>
                </div>
              </div>

              {/* Kanban Board */}
              <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px' }}>
                {renderKanbanColumn('inbox', '商談中 / 見積もり提示', '#3b82f6')}
                {renderKanbanColumn('negotiating', '契約待ち / 調整中', '#f59e0b')}
                {renderKanbanColumn('scheduled', '手配済 / 作業予定', '#10b981')}
                {renderKanbanColumn('completed', '完了 / 請求済', '#94a3b8')}
              </div>
            </>
          )}

          {activeTab === 'pricing' && (
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
              <VendorPricingSettings />
            </div>
          )}
          
          {activeTab === 'schedule' && (
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9', overflow: 'hidden', padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1e293b' }}>対応可能スケジュールの管理</h3>
                  <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>枠をクリックしてステータス（<span style={{color: '#10b981'}}>〇 空き</span> / <span style={{color: '#cbd5e1'}}>× 不可</span>）を切り替えます。</p>
                </div>
                <button 
                  onClick={() => alert("スケジュールを保存しました！\nオーナーに見積もりを提示する際、この空き枠がサジェストされます。")}
                  style={{ padding: '10px 24px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)' }}
                >
                  カレンダーを保存
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ minWidth: '800px', width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ background: '#f8fafc', padding: '15px', borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569', fontWeight: 'bold', width: '150px' }}>日付</th>
                      {scheduleSlots.map(slot => (
                        <th key={slot} style={{ background: '#f8fafc', padding: '15px', borderBottom: '2px solid #e2e8f0', textAlign: 'center', color: '#475569', fontWeight: 'bold' }}>{slot}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleDays.map(day => {
                      const dayStr = day.split('-')[2];
                      return (
                        <tr key={day} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '15px', color: '#1e293b', fontWeight: '500' }}>3月{dayStr}日 ({['日','月','火','水','木','金','土'][new Date(day).getDay()]})</td>
                          {slotKeys.map(key => {
                            const isAvailable = schedule[day]?.[key];
                            return (
                              <td key={`${day}-${key}`} style={{ padding: '10px' }}>
                                <div 
                                  onClick={() => toggleSlot(day, key)}
                                  style={{ 
                                    background: isAvailable ? '#ecfdf5' : '#f8fafc', 
                                    border: isAvailable ? '1px solid #10b981' : '1px solid #e2e8f0', 
                                    color: isAvailable ? '#10b981' : '#cbd5e1', 
                                    borderRadius: '8px', 
                                    padding: '12px', 
                                    textAlign: 'center', 
                                    cursor: 'pointer', 
                                    transition: 'all 0.2s',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem'
                                  }}
                                >
                                  {isAvailable ? '〇' : '×'}
                                </div>
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Work Report Modal */}
      {isReportModalOpen && selectedJob && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', width: '90%', maxWidth: '600px', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1e293b' }}>作業完了報告・レビュー依頼</h3>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>{selectedJob.property} - {selectedJob.title}</p>
              </div>
              <button 
                onClick={() => setIsReportModalOpen(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8' }}
              >
                &times;
              </button>
            </div>
            
            <div style={{ padding: '30px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#475569', marginBottom: '10px' }}>
                  作業前（Before）の写真アップロード
                </label>
                <div style={{ border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '30px', textAlign: 'center', cursor: 'pointer', background: '#f8fafc' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ marginBottom: '10px' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>クリックまたはドラッグ＆ドロップで追加</p>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#475569', marginBottom: '10px' }}>
                  作業後（After）の写真アップロード
                </label>
                <div style={{ border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '30px', textAlign: 'center', cursor: 'pointer', background: '#f8fafc' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ marginBottom: '10px' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>クリックまたはドラッグ＆ドロップで追加</p>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#475569', marginBottom: '10px' }}>
                  オーナーへの申し送り事項・作業メモ
                </label>
                <textarea 
                  rows={4}
                  placeholder="例: エアコンのフィルターが大変汚れておりました。洗面所の電球が1つ切れかかっています。"
                  style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', resize: 'vertical' }}
                />
              </div>
            </div>

            <div style={{ padding: '20px', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
              <button 
                onClick={() => setIsReportModalOpen(false)}
                style={{ padding: '10px 20px', background: 'transparent', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                キャンセル
              </button>
              <button 
                onClick={() => {
                   alert("作業完了報告と請求をオーナーへ送信しました！\n同時に自動でレビュー入力リクエストが送られます。");
                   setIsReportModalOpen(false);
                }}
                style={{ padding: '10px 24px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)' }}
              >
                完了報告を送信する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

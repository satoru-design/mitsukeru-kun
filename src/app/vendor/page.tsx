export default function VendorDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">ダッシュボード</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-500">新着メッセージ</h3>
          <p className="text-3xl font-bold text-primary mt-2">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-500">お気に入り登録された数</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-500">マッチング率</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">85%</p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-xl font-bold mb-4">最近のやり取り状況</h3>
        <p className="text-gray-600">現在進行中の商談や作業ステータスがここに表示されます。</p>
        <div className="mt-4 border-t pt-4">
          <ul className="space-y-3">
            <li className="flex justify-between items-center text-sm p-3 bg-gray-50 rounded">
              <span>オーナーA様との商談</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">商談中</span>
            </li>
            <li className="flex justify-between items-center text-sm p-3 bg-gray-50 rounded">
              <span>オーナーB様からの清掃依頼</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">作業開始待ち</span>
            </li>
            <li className="flex justify-between items-center text-sm p-3 bg-gray-50 rounded">
              <span>オーナーC様 - エアコントラブル対応</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">完了報告済</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

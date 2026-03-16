export default function VendorProperties() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">オーナー案件 検索・一覧</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h3 className="text-lg font-bold mb-4">絞り込み検索</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">エリア</label>
            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
              <option>すべて</option>
              <option>東京都</option>
              <option>大阪府</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリ</label>
            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
              <option>すべて</option>
              <option>定期清掃</option>
              <option>緊急トラブル</option>
              <option>運営代行</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-primary text-white font-medium py-2 px-4 rounded hover:bg-primary/90">
              検索する
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* サンプル案件カード */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white p-6 rounded-lg shadow-sm border flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">東京都 新宿区</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs border border-blue-200">定期清掃</span>
                {item === 1 && <span className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs border border-red-200">急募</span>}
              </div>
              <h3 className="text-xl font-bold mb-2 cursor-pointer hover:text-primary transition-colors">
                【渋谷駅徒歩5分】2LDKマンションの清掃・ベッドメイク依頼
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                週末を中心に稼働しているマンションタイプの民泊物件です。ゲストチェックアウト後の清掃とリネン交換をお願いできる業者を探しています。継続的なお取引が希望です。
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>希望単価: 6,000円〜/回</span>
                <span>マッチング率: <span className="text-green-600 font-bold">80%</span></span>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2 min-w-[140px]">
              <button className="bg-primary text-white py-2 px-4 rounded text-sm hover:bg-primary/90 text-center">
                詳細を見る
              </button>
              <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded text-sm hover:bg-gray-50 text-center">
                ☆ お気に入り
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

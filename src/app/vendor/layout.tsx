import Link from "next/link";
import { Noto_Sans_JP } from "next/font/google";
import "../globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "管理ダッシュボード - 見つける君",
};

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${notoSansJP.className} flex h-screen bg-gray-100`}>
      {/* サイドバー */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-primary">見つける君</h1>
          <p className="text-sm text-gray-500 mt-1">業者用コンソール</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/vendor" className="block px-4 py-2 rounded bg-primary text-white font-medium hover:bg-primary/90">
            ダッシュボード
          </Link>
          <Link href="/vendor/properties" className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-50">
            案件一覧・検索
          </Link>
          <Link href="/vendor/messages" className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-50">
            メッセージ
          </Link>
        </nav>
        <div className="p-4 border-t">
          <Link href="/" className="block px-4 py-2 text-sm text-gray-600 hover:text-black">
            ログアウト
          </Link>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 overflow-auto">
        {/* トップナビ */}
        <header className="bg-white shadow-sm p-4 flex justify-end">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">ようこそ、テスト業者 様</span>
          </div>
        </header>

        {/* ページコンテンツ */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

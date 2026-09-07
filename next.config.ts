import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export" を外し、middleware による全リクエストの
  // サーバー側リダイレクト(308)を有効化する（未使用サイトのため本番へ集約）。
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

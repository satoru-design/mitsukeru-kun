"use client";

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function AntigravityEasterEgg() {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (!activated) return;

    const activateAntigravity = async () => {
      console.log("🚀 Initiating Antigravity Protocol...");

      // 1. Matter.js (物理演算エンジン) を動的に読み込む
      if (!(window as any).Matter) {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js";
        document.head.appendChild(script);
        await new Promise((resolve) => (script.onload = resolve));
      }

      const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Events } = (window as any).Matter;

      // 2. 物理エンジンとワールドの初期化
      const engine = Engine.create();
      const world = engine.world;

      // 3. 画面のサイズに合わせて「床」と「壁」を作成（要素が画面外に消えないようにする）
      const w = window.innerWidth;
      const h = window.innerHeight;
      const thickness = 100;

      const ground = Bodies.rectangle(w / 2, h + thickness / 2 - 10, w, thickness, { isStatic: true });
      const leftWall = Bodies.rectangle(0 - thickness / 2, h / 2, thickness, h * 2, { isStatic: true });
      const rightWall = Bodies.rectangle(w + thickness / 2, h / 2, thickness, h * 2, { isStatic: true });
      const ceiling = Bodies.rectangle(w / 2, 0 - thickness / 2, w, thickness, { isStatic: true });

      World.add(world, [ground, leftWall, rightWall, ceiling]);

      // 4. 動かす対象の要素を取得（リンク、ボタン、画像、見出し、カードなど）
      // ※今回は派手にやるため、遷移しないリンクだけでなく目立つ要素を巻き込みます
      const targets = document.querySelectorAll("a, button, img, h1, h2, h3, .card, input, .bg-white, .bg-gray-50");
      const domElements: any[] = [];
      const bodies: any[] = [];

      // 5. HTML要素を物理オブジェクトに変換
      targets.forEach((el: any) => {
        // 例外: このイースターエッグボタン自体や、サイドバーなどの最上位レイアウトは壊しすぎないように微調整（任意）
        if (el.id === "antigravity-trigger") return;

        const rect = el.getBoundingClientRect();

        // 小さすぎる要素や非表示の要素はスキップ
        if (rect.width < 20 || rect.height < 10) return;

        // 現在の見た目を保持したまま、座標を絶対配置(Fixed)に切り替える
        el.style.width = rect.width + "px";
        el.style.height = rect.height + "px";
        el.style.margin = "0";
        el.style.position = "fixed";
        el.style.top = "0px";
        el.style.left = "0px";
        el.style.zIndex = "9999";
        // 元のリンク遷移を無効化
        el.addEventListener("click", (e: any) => e.preventDefault());

        // 物理ボディを作成（少し弾むように設定）
        const body = Bodies.rectangle(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width, rect.height, {
          restitution: 0.6, // 反発係数（ボヨンと跳ねる）
          friction: 0.1, // 摩擦
          density: 0.002, // 重さ
        });

        bodies.push(body);
        domElements.push({ el, body, width: rect.width, height: rect.height });
      });

      World.add(world, bodies);

      // 6. マウス操作の追加（ドラッグ＆ドロップで要素を投げ飛ばせるようにする）
      const mouse = Mouse.create(document.body);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });
      World.add(world, mouseConstraint);

      // スクロールでマウス座標がズレるのを防ぐ
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      // 7. 毎フレーム、物理演算の結果をHTML要素の座標と回転に同期させる
      Events.on(engine, "afterUpdate", () => {
        domElements.forEach(({ el, body, width, height }) => {
          // Transformを使って滑らかに移動と回転を適用
          el.style.transform = `translate(${body.position.x - width / 2}px, ${body.position.y - height / 2}px) rotate(${body.angle}rad)`;
        });
      });

      // 8. 物理エンジン起動！
      Runner.run(Runner.create(), engine);

      // 背景のスクロールを止める
      document.body.style.overflow = "hidden";

      console.log("🍏 Antigravity Activated! マウスで要素を掴んで投げ飛ばしてみてください。");
    };

    activateAntigravity();
  }, [activated]);

  return (
    <button
      id="antigravity-trigger"
      onClick={() => setActivated(true)}
      title="警告：押しちゃダメ！"
      className="ml-auto flex items-center justify-center p-2 text-gray-300 hover:text-orange-500 transition-colors rounded-full hover:bg-orange-50"
    >
      <Sparkles className="h-4 w-4" />
    </button>
  );
}

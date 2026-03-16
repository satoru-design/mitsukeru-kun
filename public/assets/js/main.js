document.addEventListener('DOMContentLoaded', () => {
  console.log('Main JS initialized');

  // Mock Data for Search Results
  const mockServices = [
    { id: 1, category: '定期清掃', title: '【都内全域対応】ホテルクオリティの民泊清掃・ベッドメイク', desc: '実績500件以上。水回りからベランダまで徹底的に綺麗にします。ゴミ捨て、コインランドリー対応可能。', providerName: 'クリーンパートナーズ東京', price: 6500, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800' },
    { id: 2, category: '現地サポート', title: '【365日24時間】深夜の鍵トラブルやゲスト駆けつけ対応', desc: '英語・中国語対応可能なスタッフが常駐。突然のトラブルにも最短30分で現地へ駆けつけます。', providerName: '24hゲストサポート株式会社', price: 10000, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800' },
    { id: 3, category: 'メッセージ代行', title: '【多言語対応】売上アップに貢献するプロのゲスト対応', desc: 'AirBnBスーパーホスト経験者が対応。レビュー5.0を目指す丁寧なメッセージ代行サービスです。', providerName: 'Global Host', price: 30000, image: 'https://images.unsplash.com/photo-1556761175-5973e2be1ce4?auto=format&fit=crop&q=80&w=800' },
    { id: 4, category: '写真撮影 / 動画撮影', title: '【予約率が劇的アップ】建築専門カメラマンによる内観・外観撮影', desc: '広角レンズを使用し、お部屋の魅力を最大限に引き出す写真を納品します。ドローン空撮オプションあり。', providerName: 'Satoru Photo Studio', price: 35000, image: 'https://images.unsplash.com/photo-1513694203232-7193280e022f?auto=format&fit=crop&q=80&w=800' },
    { id: 5, category: 'スマートロック設置・設定', title: '【物理鍵からの解放】最新スマートロックの導入・運用サポート', desc: 'RemoteLockなどの主要デバイスに対応。ドアの構造調査から設置、暗証番号の自動発行連携までまるごとサポート。', providerName: 'SmartKey Japan', price: 25000, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800' },
    { id: 6, category: '定期清掃', title: '【大阪エリア】口コミ高評価！スピーディなお部屋リセット清掃', desc: 'シーツのアイロンがけまで対応可能。徹底したマニュアル管理で清掃のムラを防ぎます。', providerName: '大阪クリーンアップ', price: 5000, image: 'https://images.unsplash.com/photo-1527515637-cc17ed84bdf7?auto=format&fit=crop&q=80&w=800' },
    { id: 7, category: '宿泊施設ページ制作（Airbnb等）', title: '【魅力が伝わる】リスティング作成・SEO最適化パッケージ', desc: '検索上位に表示されるためのキーワード選定、魅力的なタイトルと説明文の作成を代行します。', providerName: 'Minpaku SEO Pro', price: 50000, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
    { id: 8, category: '家具・家電選定', title: '【ターゲット別】SNS映えするインテリアコーディネート提案', desc: '和モダンから北欧風まで幅広いスタイルに対応。IKEA等での買い出し代行もオプションで可能です。', providerName: 'Interior Design M', price: 80000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800' },
  ];

  // DOM Elements for Modal Logic
  const btnOpenModal = document.getElementById('btn-search-conditions');
  const modal = document.getElementById('condition-modal');
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');
  const categoryList = document.getElementById('category-list');
  const btnClearAll = document.getElementById('modal-clear-all');
  const btnCancel = document.getElementById('modal-cancel');
  const btnApply = document.getElementById('modal-apply');

  // DOM Elements for Results
  const resultsSection = document.getElementById('search-results-section');
  const resultsGrid = document.getElementById('results-grid');
  const activeFiltersContainer = document.getElementById('active-filters');
  const resultsCountNumber = document.getElementById('results-count-number');
  const sortSelect = document.getElementById('sort-select');

  // Search logic variables
  let currentSelectedCategories = [];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ja-JP').format(price);
  };

  const renderServiceCard = (service) => {
    return `
      <div class="service-card">
        <div class="card-image-wrapper">
          <img src="${service.image}" alt="${service.title}" class="card-image" loading="lazy">
          <span class="card-category-badge">${service.category}</span>
        </div>
        <div class="card-content">
          <h3 class="card-title">${service.title}</h3>
          <p class="card-desc">${service.desc}</p>
          <div class="card-provider">
            <img src="https://i.pravatar.cc/100?u=${service.id}" alt="Provider Avatar" class="provider-avatar">
            <span class="provider-name">${service.providerName}</span>
          </div>
          <div class="card-divider"></div>
          <div class="card-footer">
            <div class="card-price-area">
              <span class="price-currency">¥</span>
              <span class="price-amount">${formatPrice(service.price)}</span>
              <span class="price-suffix">〜</span>
            </div>
            <button class="btn-card-action">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              詳細をみる
            </button>
          </div>
        </div>
      </div>
    `;
  };

  const renderActiveFilters = (categories) => {
    activeFiltersContainer.innerHTML = categories.map(cat => `
      <div class="filter-tag">
        ${cat}
        <button class="remove-filter" data-category="${cat}">&times;</button>
      </div>
    `).join('');

    // Bind remove events for individual filter tags
    activeFiltersContainer.querySelectorAll('.remove-filter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const catToRemove = e.target.getAttribute('data-category');
        // Unselect chip in modal
        const chips = categoryList.querySelectorAll('.category-chip');
        chips.forEach(chip => {
          if(chip.textContent === catToRemove) {
            chip.classList.remove('is-selected');
          }
        });
        // Trigger apply to refresh search
        btnApply.click();
      });
    });
  };

  const filterAndRenderResults = () => {
    let filteredData = [];
    
    if (currentSelectedCategories.length > 0) {
      filteredData = mockServices.filter(service => currentSelectedCategories.includes(service.category));
    }

    // Sort logic
    const sortBy = sortSelect ? sortSelect.value : 'newest';
    if (sortBy === 'price-asc') {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filteredData.sort((a, b) => b.price - a.price);
    } else {
      // Keep mock default order (mocking newest)
    }

    // Render counts and cards
    resultsCountNumber.textContent = filteredData.length;
    
    if (filteredData.length > 0) {
      resultsGrid.innerHTML = filteredData.map(renderServiceCard).join('');
      resultsSection.style.display = 'block';
      // Smooth scroll to results
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = resultsSection.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    } else {
      resultsGrid.innerHTML = '';
      resultsSection.style.display = 'none';
      if(currentSelectedCategories.length > 0) {
        // Show empty state if there are filters but no results
        resultsSection.style.display = 'block';
        resultsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-muted);">条件に一致するサービスが見つかりませんでした。</p>';
      }
    }
  };

  if (sortSelect) {
    sortSelect.addEventListener('change', filterAndRenderResults);
  }

  if (btnOpenModal && modal) {
    // Open Modal
    btnOpenModal.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });

    const closeModal = () => {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    if(btnCancel) btnCancel.addEventListener('click', closeModal);
    
    // Bind events for hardcoded categories
    if (categoryList) {
      const groups = categoryList.querySelectorAll('.category-group');
      
      groups.forEach(group => {
        const selectAllBtn = group.querySelector('.btn-select-all');
        const chips = group.querySelectorAll('.category-chip');
        
        // Chip toggle
        chips.forEach(chip => {
          chip.addEventListener('click', () => {
            chip.classList.toggle('is-selected');
          });
        });
        
        // Select All toggle
        if (selectAllBtn) {
          selectAllBtn.addEventListener('click', () => {
            // Check if all are already selected
            const allSelected = Array.from(chips).every(chip => chip.classList.contains('is-selected'));
            
            if (allSelected) {
              chips.forEach(chip => chip.classList.remove('is-selected'));
            } else {
              chips.forEach(chip => chip.classList.add('is-selected'));
            }
          });
        }
      });
    }

    // Clear all
    if (btnClearAll) {
      btnClearAll.addEventListener('click', () => {
        const chips = categoryList.querySelectorAll('.category-chip');
        chips.forEach(chip => chip.classList.remove('is-selected'));
      });
    }

    // Apply
    if (btnApply) {
      btnApply.addEventListener('click', () => {
        const selectedChips = Array.from(categoryList.querySelectorAll('.category-chip.is-selected'));
        currentSelectedCategories = selectedChips.map(chip => chip.textContent);
        
        const count = currentSelectedCategories.length;
        
        if (count > 0) {
          btnOpenModal.textContent = `${count}件の条件で探す`;
        } else {
          btnOpenModal.textContent = '条件を選択して業者を探す';
        }
        
        closeModal();
        renderActiveFilters(currentSelectedCategories);
        filterAndRenderResults();
      });
    }
  }

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

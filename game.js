// =============================================================================
// 114-2-期末考-數學：互動式遊戲網頁核心邏輯
// =============================================================================

// --- 遊戲狀態變數 ---
let currentScreen = "homeScreen";
let currentLevel = null; // 6, 7, 8, 9, 10, or 'full'
let questionsQueue = [];
let currentIndex = 0;
let score = 0;
let streak = 0;
let soundEnabled = true;
let theme = "light";

// --- 進度與紀錄追蹤 (LocalStorage) ---
let gameStats = {
  level6: { completed: false, bestScore: 0, stars: 0 },
  level7: { completed: false, bestScore: 0, stars: 0 },
  level8: { completed: false, bestScore: 0, stars: 0 },
  level9: { completed: false, bestScore: 0, stars: 0 },
  level10: { completed: false, bestScore: 0, stars: 0 },
  full: { completed: false, bestScore: 0, stars: 0 }
};

// --- 初始化 Web Audio Context (音效合成器) ---
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// 播放內建合成音效
function playSound(type) {
  if (!soundEnabled) return;
  initAudio();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const now = audioCtx.currentTime;
  
  if (type === 'click') {
    // 短促的泡泡點擊聲
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
    
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }
  else if (type === 'correct') {
    // 答對音效：快速上行和弦 (C5 -> E5 -> G5 -> C6)
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      
      gain.gain.setValueAtTime(0.0, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.3);
    });
  }
  else if (type === 'wrong') {
    // 答錯音效：低沉下行音 (G3 -> Eb3)
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    
    osc1.frequency.setValueAtTime(196.00, now); // G3
    osc1.frequency.linearRampToValueAtTime(155.56, now + 0.35); // Eb3
    osc2.frequency.setValueAtTime(196.00, now);
    osc2.frequency.linearRampToValueAtTime(155.56, now + 0.35);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    // 用低通濾波器讓鋸齒波聽起來不刺耳，溫和一點
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.4);
    osc2.stop(now + 0.4);
  }
  else if (type === 'success') {
    // 成功通關大捷音效
    const chords = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    chords.forEach((freq) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 2, now + 0.5);
      
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.8);
    });
  }
}

// --- 粒子擴散效果 (答對時噴灑) ---
function createSparks(x, y) {
  const container = document.getElementById("particleContainer");
  if (!container) return;

  const colors = ["#ff7675", "#74b9ff", "#55efc4", "#ffeaa7", "#a29bfe", "#fd79a8"];
  const particleCount = 25;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    
    // 隨機角度與距離
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 80;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    const size = 6 + Math.random() * 8;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // 設定 CSS 變數以控制動畫目的地
    particle.style.setProperty("--tx", `${tx}px`);
    particle.style.setProperty("--ty", `${ty}px`);
    
    container.appendChild(particle);
    
    // 動畫結束後移除元素
    setTimeout(() => {
      particle.remove();
    }, 800);
  }
}

// --- 動態 SVG 向量圖繪製引擎 ---
function renderQuestionSVG(questionObj) {
  const container = document.getElementById("svgCanvasContainer");
  container.innerHTML = ""; // 清空

  if (!questionObj.svgType || questionObj.svgType === "none") {
    container.style.display = "none";
    return;
  }

  container.style.display = "flex";
  const type = questionObj.svgType;
  const params = questionObj.svgParams || {};

  // 創建 SVG 元素
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 200 160");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");

  if (type === "fraction-circle") {
    // 🍕 分數圓形繪製
    const cx = 100, cy = 80, r = 50;
    const parts = params.parts || 4;
    const shaded = params.shaded || 1;
    const isFair = params.isFair !== false;

    // 計算各片角度
    let angles = [];
    if (isFair) {
      for (let i = 0; i <= parts; i++) {
        angles.push((i * 2 * Math.PI) / parts - Math.PI / 2); // 從 12 點鐘方向開始
      }
    } else {
      // 故意不公平劃分 (Unequal slices)
      angles.push(-Math.PI / 2);
      let stepSum = 0;
      let steps = [];
      for (let i = 0; i < parts; i++) {
        let step = 1 + Math.random() * 2; // 不等間距
        steps.push(step);
        stepSum += step;
      }
      let runningSum = 0;
      for (let i = 0; i < parts; i++) {
        runningSum += steps[i];
        angles.push((runningSum * 2 * Math.PI) / stepSum - Math.PI / 2);
      }
    }

    // 繪製各個扇形
    for (let i = 0; i < parts; i++) {
      const a1 = angles[i];
      const a2 = angles[i + 1];
      
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const x2 = cx + r * Math.cos(a2);
      const y2 = cy + r * Math.sin(a2);

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      // 大弧度標記
      const largeArc = (a2 - a1) > Math.PI ? 1 : 0;
      
      // 扇形路徑 M cx cy L x1 y1 A r r 0 largeArc 1 x2 y2 Z
      const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      path.setAttribute("d", d);
      
      // 著色與邊框
      const isShaded = i < shaded;
      path.setAttribute("fill", isShaded ? "var(--primary-light)" : "var(--light)");
      path.setAttribute("stroke", "var(--dark)");
      path.setAttribute("stroke-width", "1.5");
      svg.appendChild(path);
    }

    // 畫中心點裝飾
    const centerDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    centerDot.setAttribute("cx", cx);
    centerDot.setAttribute("cy", cy);
    centerDot.setAttribute("r", 3);
    centerDot.setAttribute("fill", "var(--dark)");
    svg.appendChild(centerDot);
  }
  else if (type === "fraction-grid") {
    // 🔲 分數格線繪製
    const rows = params.rows || 1;
    const cols = params.cols || 10;
    const shaded = params.shaded || 0;

    const gridWidth = 160;
    const gridHeight = 80;
    const startX = 20;
    const startY = 40;

    const cellW = gridWidth / cols;
    const cellH = gridHeight / rows;

    let cellCount = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        cellCount++;
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", startX + c * cellW);
        rect.setAttribute("y", startY + r * cellH);
        rect.setAttribute("width", cellW);
        rect.setAttribute("height", cellH);
        
        const isShaded = cellCount <= shaded;
        rect.setAttribute("fill", isShaded ? "var(--primary-light)" : "var(--light)");
        rect.setAttribute("stroke", "var(--dark)");
        rect.setAttribute("stroke-width", "1.5");
        svg.appendChild(rect);
      }
    }
  }
  else if (type === "line-segment") {
    // 📏 數線與長度繪製
    const startY = 80;
    const segments = params.segments || [];
    const backSegment = params.backSegment || 0;
    const totalLabel = params.totalLabel || "";
    const compare = params.compare || false;

    if (compare) {
      // 兩條線段比較模式
      const line1 = params.line1 || {};
      const line2 = params.line2 || {};

      // 繪製第一條線 (長頸鹿)
      drawSingleLine(40, line1.length, line1.label, line1.color || "var(--primary)");
      // 繪製第二條線 (小馬)
      drawSingleLine(90, line2.length, line2.label, line2.color || "var(--secondary)");

      // 畫高度差指示線
      const startX = 20;
      const x1 = startX + line2.length;
      const x2 = startX + line1.length;
      if (x2 > x1) {
        // 虛線
        const dash = document.createElementNS("http://www.w3.org/2000/svg", "line");
        dash.setAttribute("x1", x1);
        dash.setAttribute("y1", 40);
        dash.setAttribute("x2", x1);
        dash.setAttribute("y2", 90);
        dash.setAttribute("stroke", "var(--dark)");
        dash.setAttribute("stroke-width", "1");
        dash.setAttribute("stroke-dasharray", "3,3");
        svg.appendChild(dash);

        // 雙向高度差箭頭
        drawArrow(x1, 65, x2, 65, "var(--warning)");
        // 標記
        const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.setAttribute("x", (x1 + x2) / 2);
        txt.setAttribute("y", 60);
        txt.setAttribute("font-size", "10");
        txt.setAttribute("font-weight", "bold");
        txt.setAttribute("text-anchor", "middle");
        txt.setAttribute("fill", "var(--dark)");
        txt.textContent = params.diffLabel || "高度差?";
        svg.appendChild(txt);
      }
    } else {
      // 單一數線或連續拼貼模式
      const startX = 20;
      let currentX = startX;

      // 畫數線底線
      const baseLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      baseLine.setAttribute("x1", 10);
      baseLine.setAttribute("y1", startY);
      baseLine.setAttribute("x2", 190);
      baseLine.setAttribute("y2", startY);
      baseLine.setAttribute("stroke", "#b2bec3");
      baseLine.setAttribute("stroke-width", "2");
      svg.appendChild(baseLine);

      // 起點 tick
      drawTick(startX, startY, "0");

      segments.forEach((seg) => {
        const nextX = currentX + seg.length;
        
        // 畫線段
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", currentX);
        line.setAttribute("y1", startY);
        line.setAttribute("x2", nextX);
        line.setAttribute("y2", startY);
        line.setAttribute("stroke", seg.color || "var(--primary)");
        line.setAttribute("stroke-width", "4");
        svg.appendChild(line);

        // 畫刻度 tick
        drawTick(nextX, startY);

        // 畫上方長度標籤括弧
        drawBracket(currentX, nextX, startY - 10, seg.label);

        currentX = nextX;
      });

      // 如果有往回爬的軌跡 (例如蝸牛)
      if (backSegment > 0) {
        const peakX = currentX;
        const finalX = peakX - backSegment;
        
        // 往回爬的箭頭曲線
        const backArrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const d = `M ${peakX} ${startY - 25} C ${(peakX + finalX)/2} ${startY - 45} ${(peakX + finalX)/2} ${startY - 45} ${finalX} ${startY - 25}`;
        backArrow.setAttribute("d", d);
        backArrow.setAttribute("fill", "none");
        backArrow.setAttribute("stroke", "var(--danger)");
        backArrow.setAttribute("stroke-width", "2");
        backArrow.setAttribute("marker-end", "url(#arrow)");
        svg.appendChild(backArrow);

        // 畫小紅標籤
        const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.setAttribute("x", (peakX + finalX) / 2);
        txt.setAttribute("y", startY - 48);
        txt.setAttribute("font-size", "9");
        txt.setAttribute("fill", "var(--danger)");
        txt.setAttribute("font-weight", "bold");
        txt.setAttribute("text-anchor", "middle");
        txt.textContent = params.backLabel || "往回";
        svg.appendChild(txt);

        // 小標記
        drawTick(finalX, startY, "此時位置?", "var(--danger)");
      }

      // 整體標籤
      if (totalLabel) {
        drawBracket(startX, currentX, startY + 15, totalLabel, true);
      }
    }

    // 輔助繪圖函式
    function drawSingleLine(y, length, label, color) {
      const startX = 20;
      const endX = startX + length;
      
      // 基準線
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", startX);
      line.setAttribute("y1", y);
      line.setAttribute("x2", endX);
      line.setAttribute("y2", y);
      line.setAttribute("stroke", color);
      line.setAttribute("stroke-width", "5");
      svg.appendChild(line);

      // 起點 Tick
      drawTick(startX, y);
      // 終點 Tick
      drawTick(endX, y);

      // 標籤
      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.setAttribute("x", endX + 10);
      txt.setAttribute("y", y + 4);
      txt.setAttribute("font-size", "10");
      txt.setAttribute("font-weight", "bold");
      txt.setAttribute("fill", "var(--dark)");
      txt.textContent = label;
      svg.appendChild(txt);
    }

    function drawTick(x, y, label = "", color = "var(--dark)") {
      const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
      tick.setAttribute("x1", x);
      tick.setAttribute("y1", y - 5);
      tick.setAttribute("x2", x);
      tick.setAttribute("y2", y + 5);
      tick.setAttribute("stroke", color);
      tick.setAttribute("stroke-width", "1.5");
      svg.appendChild(tick);

      if (label) {
        const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.setAttribute("x", x);
        txt.setAttribute("y", y + 16);
        txt.setAttribute("font-size", "9");
        txt.setAttribute("fill", color);
        txt.setAttribute("text-anchor", "middle");
        txt.textContent = label;
        svg.appendChild(txt);
      }
    }

    function drawBracket(x1, x2, y, label, isBelow = false) {
      const offset = isBelow ? 5 : -5;
      
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const d = `M ${x1} ${y - offset} L ${x1} ${y} L ${x2} ${y} L ${x2} ${y - offset}`;
      path.setAttribute("d", d);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "var(--dark)");
      path.setAttribute("stroke-width", "1");
      svg.appendChild(path);

      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.setAttribute("x", (x1 + x2) / 2);
      txt.setAttribute("y", isBelow ? y + 14 : y - 6);
      txt.setAttribute("font-size", "9");
      txt.setAttribute("fill", "var(--dark)");
      txt.setAttribute("text-anchor", "middle");
      txt.setAttribute("font-weight", "bold");
      txt.textContent = label;
      svg.appendChild(txt);
    }

    function drawArrow(x1, y1, x2, y2, color) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("stroke", color);
      line.setAttribute("stroke-width", "2");
      svg.appendChild(line);

      // 簡單的箭頭頭部
      const p1 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      p1.setAttribute("points", `${x2},${y2} ${x2-6},${y2-4} ${x2-6},${y2+4}`);
      p1.setAttribute("fill", color);
      svg.appendChild(p1);

      const p2 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      p2.setAttribute("points", `${x1},${y1} ${x1+6},${y1-4} ${x1+6},${y1+4}`);
      p2.setAttribute("fill", color);
      svg.appendChild(p2);
    }
  }
  else if (type === "cube-3d") {
    // 📦 3D 等角投影立方體/長方體繪製
    const ox = 100, oy = 110; // 投影原點 (前方底角)
    const isCube = params.shapeType === "cube";
    
    // 設定 3D 投影軸向量
    const vx = { x: 45, y: -20 }; // 右側寬軸
    const vy = { x: -45, y: -20 }; // 左側深軸
    const vz = { x: 0, y: -50 };  // 高度直軸

    if (!isCube) {
      // 長方體微調縮放 (X, Y, Z 各軸不等長)
      vx.x = 55; vx.y = -22;
      vy.x = -35; vy.y = -14;
      vz.y = -40;
    }

    // 計算 8 個頂點的 2D 坐標
    const p0 = { x: ox, y: oy }; // 前方底
    const p1 = { x: ox + vx.x, y: oy + vx.y }; // 右側底
    const p2 = { x: ox + vy.x, y: oy + vy.y }; // 左側底
    const p3 = { x: ox + vx.x + vy.x, y: oy + vx.y + vy.y }; // 後方底
    
    const p4 = { x: p0.x + vz.x, y: p0.y + vz.y }; // 前方頂
    const p5 = { x: p1.x + vz.x, y: p1.y + vz.y }; // 右側頂
    const p6 = { x: p2.x + vz.x, y: p2.y + vz.y }; // 左側頂
    const p7 = { x: p3.x + vz.x, y: p3.y + vz.y }; // 後方頂

    // 繪製三個可見的面 (Top, Left-Front, Right-Front)
    // 1. 右側前方正面 (Front-Right Face): p0 - p1 - p5 - p4
    drawFace([p0, p1, p5, p4], "var(--primary)", "0.9");

    // 2. 左側前方正面 (Front-Left Face): p0 - p2 - p6 - p4
    drawFace([p0, p2, p6, p4], "var(--primary-light)", "0.85");

    // 3. 上面 (Top Face): p4 - p5 - p7 - p6
    drawFace([p4, p5, p7, p6], "#ffeaa7", "0.95");

    // 如果啟用顯示邊 (Edges)
    if (params.showEdges) {
      const edges = [
        [p0, p1], [p0, p2], [p1, p3], [p2, p3],
        [p4, p5], [p4, p6], [p5, p7], [p6, p7],
        [p0, p4], [p1, p5], [p2, p6], [p3, p7]
      ];
      edges.forEach((edge) => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", edge[0].x);
        line.setAttribute("y1", edge[0].y);
        line.setAttribute("x2", edge[1].x);
        line.setAttribute("y2", edge[1].y);
        line.setAttribute("stroke", "var(--dark)");
        line.setAttribute("stroke-width", "2");
        svg.appendChild(line);
      });
    }

    // 如果啟用顯示頂點 (Vertices)
    if (params.showVertices) {
      const vertices = [p0, p1, p2, p3, p4, p5, p6, p7];
      vertices.forEach((v) => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", v.x);
        circle.setAttribute("cy", v.y);
        circle.setAttribute("r", "5");
        circle.setAttribute("fill", "var(--danger)");
        circle.setAttribute("stroke", "var(--dark)");
        circle.setAttribute("stroke-width", "1.5");
        svg.appendChild(circle);
      });
    }

    function drawFace(pts, color, opacity) {
      const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      const ptsStr = pts.map(p => `${p.x},${p.y}`).join(" ");
      poly.setAttribute("points", ptsStr);
      poly.setAttribute("fill", color);
      poly.setAttribute("opacity", opacity);
      poly.setAttribute("stroke", "var(--dark)");
      poly.setAttribute("stroke-width", "1.5");
      svg.appendChild(poly);
    }
  }
  else if (type === "grouping") {
    // 🍓/🍎 分裝與平分幾何繪製
    const groups = params.groups || 1;
    const itemsPerGroup = params.itemsPerGroup || 1;
    const itemType = params.itemType || "circle";
    const looseItems = params.looseItems || 0;
    const removedItems = params.removedItems || 0;
    const spentValue = params.spentValue || 0;

    // 計算群組圓圈的位置
    const groupCenters = [];
    if (groups === 1) groupCenters.push({ x: 100, y: 75 });
    else if (groups === 2) {
      groupCenters.push({ x: 60, y: 75 });
      groupCenters.push({ x: 140, y: 75 });
    }
    else if (groups === 3) {
      groupCenters.push({ x: 50, y: 55 });
      groupCenters.push({ x: 150, y: 55 });
      groupCenters.push({ x: 100, y: 110 });
    }
    else if (groups === 4) {
      groupCenters.push({ x: 60, y: 50 });
      groupCenters.push({ x: 140, y: 50 });
      groupCenters.push({ x: 60, y: 110 });
      groupCenters.push({ x: 140, y: 110 });
    }
    else {
      // 5-7 等更多群組分佈
      for (let i = 0; i < groups; i++) {
        const angle = (i * 2 * Math.PI) / groups;
        groupCenters.push({
          x: 100 + 55 * Math.cos(angle),
          y: 75 + 40 * Math.sin(angle)
        });
      }
    }

    // 畫群組的框框圓圈
    const groupRadius = groups <= 3 ? 32 : 24;
    groupCenters.forEach((center, gIdx) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", center.x);
      circle.setAttribute("cy", center.y);
      circle.setAttribute("r", groupRadius);
      circle.setAttribute("fill", "none");
      circle.setAttribute("stroke", "var(--primary-light)");
      circle.setAttribute("stroke-width", "2");
      circle.setAttribute("stroke-dasharray", "4,4");
      svg.appendChild(circle);

      // 在每個群組內畫小物件
      for (let i = 0; i < itemsPerGroup; i++) {
        const itemAngle = (i * 2 * Math.PI) / itemsPerGroup;
        const itemDist = groupRadius * 0.55;
        const ix = center.x + itemDist * Math.cos(itemAngle);
        const iy = center.y + itemDist * Math.sin(itemAngle);
        
        const isX = (gIdx * itemsPerGroup + i) < removedItems; // 是否被打叉
        drawItemIcon(ix, iy, itemType, isX);
      }
    });

    // 畫零散的物件 (如有)
    if (looseItems > 0) {
      for (let i = 0; i < looseItems; i++) {
        const ix = 30 + i * 20;
        const iy = 145;
        drawItemIcon(ix, iy, itemType, false);
      }
    }

    function drawItemIcon(cx, cy, type, isCrossedOut) {
      if (type === "strawberry") {
        // 草莓 🍓 (紅色三角形+綠色小葉片葉子)
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const d = `M ${cx} ${cy-5} Q ${cx-6} ${cy-2} ${cx-4} ${cy+5} Q ${cx} ${cy+9} ${cx+4} ${cy+5} Q ${cx+6} ${cy-2} ${cx} ${cy-5}`;
        path.setAttribute("d", d);
        path.setAttribute("fill", "#ff7675");
        svg.appendChild(path);

        const leaf = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const dLeaf = `M ${cx-3} ${cy-5} Q ${cx} ${cy-8} ${cx+3} ${cy-5} Q ${cx} ${cy-3} ${cx-3} ${cy-5}`;
        leaf.setAttribute("d", dLeaf);
        leaf.setAttribute("fill", "#55efc4");
        svg.appendChild(leaf);
      }
      else if (type === "apple") {
        // 蘋果 🍎
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy + 1);
        circle.setAttribute("r", "5.5");
        circle.setAttribute("fill", "#ff7675");
        svg.appendChild(circle);

        // 蘋果梗
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", cx);
        line.setAttribute("y1", cy - 45);
        line.setAttribute("x2", cx + 2);
        line.setAttribute("y2", cy - 7);
        line.setAttribute("stroke", "#8b5a2b");
        line.setAttribute("stroke-width", "1");
        svg.appendChild(line);
      }
      else if (type === "balloon") {
        // 氣球 🎈
        const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        ellipse.setAttribute("cx", cx);
        ellipse.setAttribute("cy", cy - 2);
        ellipse.setAttribute("rx", "4.5");
        ellipse.setAttribute("ry", "6");
        ellipse.setAttribute("fill", "#a29bfe");
        svg.appendChild(ellipse);

        // 線
        const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const d = `M ${cx} ${cy+4} Q ${cx-2} ${cy+8} ${cx+1} ${cy+12}`;
        line.setAttribute("d", d);
        line.setAttribute("fill", "none");
        line.setAttribute("stroke", "var(--dark)");
        line.setAttribute("stroke-width", "0.8");
        svg.appendChild(line);
      }
      else if (type === "coin5" || type === "coin") {
        // 5 元硬幣 🪙
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", "7");
        circle.setAttribute("fill", "#ffeaa7");
        circle.setAttribute("stroke", "#fdcb6e");
        circle.setAttribute("stroke-width", "1");
        svg.appendChild(circle);

        const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.setAttribute("x", cx);
        txt.setAttribute("y", cy + 3);
        txt.setAttribute("font-size", "7");
        txt.setAttribute("font-weight", "bold");
        txt.setAttribute("text-anchor", "middle");
        txt.setAttribute("fill", "#d87a00");
        txt.textContent = "5";
        svg.appendChild(txt);
      }
      else {
        // 預設為圓形
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", "5");
        circle.setAttribute("fill", "var(--primary-light)");
        svg.appendChild(circle);
      }

      // 如果被打叉 (被扣掉)
      if (isCrossedOut) {
        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", cx - 6);
        line1.setAttribute("y1", cy - 6);
        line1.setAttribute("x2", cx + 6);
        line1.setAttribute("y2", cy + 6);
        line1.setAttribute("stroke", "var(--danger)");
        line1.setAttribute("stroke-width", "2.5");
        svg.appendChild(line1);

        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line2.setAttribute("x1", cx + 6);
        line2.setAttribute("y1", cy - 6);
        line2.setAttribute("x2", cx - 6);
        line2.setAttribute("y2", cy + 6);
        line2.setAttribute("stroke", "var(--danger)");
        line2.setAttribute("stroke-width", "2.5");
        svg.appendChild(line2);
      }
    }
  }
  else if (type === "dwarf-maze") {
    // ㄅ: 正方體, ㄆ: 長方體, ㄇ: 球體, ㄉ: 正方體, ㄈ: 長方體
    // 繪製路徑連接線
    const pathLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathLine.setAttribute("d", "M 30 50 L 80 50 L 55 120 L 125 120");
    pathLine.setAttribute("fill", "none");
    pathLine.setAttribute("stroke", "var(--warning)");
    pathLine.setAttribute("stroke-width", "2.5");
    pathLine.setAttribute("stroke-dasharray", "4,4");
    svg.appendChild(pathLine);

    // 畫各個立體形體
    drawDwarfCube(30, 40, 20, "ㄅ", "var(--primary)"); // ㄅ: 正方體
    drawDwarfRect(80, 40, 26, 16, "ㄆ", "var(--secondary)"); // ㄆ: 長方體
    drawDwarfSphere(145, 40, 10, "ㄇ"); // ㄇ: 球體
    drawDwarfCube(55, 110, 20, "ㄉ", "var(--primary)"); // ㄉ: 正方體
    drawDwarfRect(125, 110, 26, 16, "ㄈ", "var(--secondary)"); // ㄈ: 長方體

    // 在終點旁畫個小房子 🏠 裝飾
    const house = document.createElementNS("http://www.w3.org/2000/svg", "text");
    house.setAttribute("x", "150");
    house.setAttribute("y", "125");
    house.setAttribute("font-size", "22");
    house.textContent = "🏠";
    svg.appendChild(house);

    function drawDwarfCube(cx, cy, size, label, color) {
      const half = size / 2;
      const dx = size * 0.35;
      const dy = size * 0.25;

      // Front
      const f = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      f.setAttribute("points", `${cx-half},${cy-half} ${cx+half},${cy-half} ${cx+half},${cy+half} ${cx-half},${cy+half}`);
      f.setAttribute("fill", color);
      f.setAttribute("stroke", "var(--dark)");
      f.setAttribute("stroke-width", "1.2");
      svg.appendChild(f);

      // Top
      const t = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      t.setAttribute("points", `${cx-half},${cy-half} ${cx-half+dx},${cy-half-dy} ${cx+half+dx},${cy-half-dy} ${cx+half},${cy-half}`);
      t.setAttribute("fill", "#ffeaa7");
      t.setAttribute("stroke", "var(--dark)");
      t.setAttribute("stroke-width", "1.2");
      svg.appendChild(t);

      // Right
      const r = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      r.setAttribute("points", `${cx+half},${cy-half} ${cx+half+dx},${cy-half-dy} ${cx+half+dx},${cy+half-dy} ${cx+half},${cy+half}`);
      r.setAttribute("fill", "var(--primary-light)");
      r.setAttribute("stroke", "var(--dark)");
      r.setAttribute("stroke-width", "1.2");
      svg.appendChild(r);

      // Label
      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.setAttribute("x", cx + dx/2);
      txt.setAttribute("y", cy + half + 12);
      txt.setAttribute("font-size", "11");
      txt.setAttribute("font-weight", "bold");
      txt.setAttribute("text-anchor", "middle");
      txt.setAttribute("fill", "var(--dark)");
      txt.textContent = label;
      svg.appendChild(txt);
    }

    function drawDwarfRect(cx, cy, w, h, label, color) {
      const hw = w / 2;
      const hh = h / 2;
      const dx = w * 0.3;
      const dy = h * 0.35;

      // Front
      const f = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      f.setAttribute("points", `${cx-hw},${cy-hh} ${cx+hw},${cy-hh} ${cx+hw},${cy+hh} ${cx-hw},${cy+hh}`);
      f.setAttribute("fill", color);
      f.setAttribute("stroke", "var(--dark)");
      f.setAttribute("stroke-width", "1.2");
      svg.appendChild(f);

      // Top
      const t = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      t.setAttribute("points", `${cx-hw},${cy-hh} ${cx-hw+dx},${cy-hh-dy} ${cx+hw+dx},${cy-hh-dy} ${cx+hw},${cy-hh}`);
      t.setAttribute("fill", "#55efc4");
      t.setAttribute("stroke", "var(--dark)");
      t.setAttribute("stroke-width", "1.2");
      svg.appendChild(t);

      // Right
      const r = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      r.setAttribute("points", `${cx+hw},${cy-hh} ${cx+hw+dx},${cy-hh-dy} ${cx+hw+dx},${cy+hh-dy} ${cx+hw},${cy+hh}`);
      r.setAttribute("fill", "#a29bfe");
      r.setAttribute("stroke", "var(--dark)");
      r.setAttribute("stroke-width", "1.2");
      svg.appendChild(r);

      // Label
      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.setAttribute("x", cx + dx/2);
      txt.setAttribute("y", cy + hh + 12);
      txt.setAttribute("font-size", "11");
      txt.setAttribute("font-weight", "bold");
      txt.setAttribute("text-anchor", "middle");
      txt.setAttribute("fill", "var(--dark)");
      txt.textContent = label;
      svg.appendChild(txt);
    }

    function drawDwarfSphere(cx, cy, r, label) {
      const s = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      s.setAttribute("cx", cx);
      s.setAttribute("cy", cy);
      s.setAttribute("r", r);
      s.setAttribute("fill", "#ff7675");
      s.setAttribute("stroke", "var(--dark)");
      s.setAttribute("stroke-width", "1.2");
      svg.appendChild(s);

      // Highlight
      const hl = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      hl.setAttribute("cx", cx - r*0.3);
      hl.setAttribute("cy", cy - r*0.3);
      hl.setAttribute("r", r*0.25);
      hl.setAttribute("fill", "white");
      hl.setAttribute("opacity", "0.6");
      svg.appendChild(hl);

      // Label
      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.setAttribute("x", cx);
      txt.setAttribute("y", cy + r + 12);
      txt.setAttribute("font-size", "11");
      txt.setAttribute("font-weight", "bold");
      txt.setAttribute("text-anchor", "middle");
      txt.setAttribute("fill", "var(--dark)");
      txt.textContent = label;
      svg.appendChild(txt);
    }
  }
  else if (type === "box-nets") {
    // 繪製展開圖對比：左邊甲組（正確），右邊乙組（錯誤，有三角形）
    // 甲組 (x 中心 50)
    drawNet(35, 30, true);
    const txtA = document.createElementNS("http://www.w3.org/2000/svg", "text");
    txtA.setAttribute("x", "50");
    txtA.setAttribute("y", "150");
    txtA.setAttribute("font-size", "11");
    txtA.setAttribute("font-weight", "bold");
    txtA.setAttribute("text-anchor", "middle");
    txtA.setAttribute("fill", "var(--dark)");
    txtA.textContent = "甲組";
    svg.appendChild(txtA);

    // 乙組 (x 中心 140)
    drawNet(125, 30, false);
    const txtB = document.createElementNS("http://www.w3.org/2000/svg", "text");
    txtB.setAttribute("x", "140");
    txtB.setAttribute("y", "150");
    txtB.setAttribute("font-size", "11");
    txtB.setAttribute("font-weight", "bold");
    txtB.setAttribute("text-anchor", "middle");
    txtB.setAttribute("fill", "var(--dark)");
    txtB.textContent = "乙組";
    svg.appendChild(txtB);

    function drawNet(startX, startY, isCorrect) {
      // 繪製中間長方體面
      // 面 1: 正方形 20x20
      drawRect(startX + 10, startY, 20, 20, "var(--primary-light)");
      // 面 2: 長方形 20x30
      drawRect(startX + 10, startY + 20, 20, 30, "var(--primary)");
      // 面 3: 正方形 20x20
      drawRect(startX + 10, startY + 50, 20, 20, "var(--primary-light)");
      // 面 4: 長方形 20x30
      drawRect(startX + 10, startY + 70, 20, 30, "var(--primary)");

      // 左右兩翼
      // 左翼 (長方形 20x30，接在面 2 的左邊，所以其寬度是 30，高度是 20)
      drawRect(startX - 20, startY + 20, 30, 20, "var(--secondary)");

      if (isCorrect) {
        // 右翼：正確長方形 30x20
        drawRect(startX + 30, startY + 20, 30, 20, "var(--secondary)");
      } else {
        // 右翼：錯誤三角形
        const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        poly.setAttribute("points", `${startX+30},${startY+20} ${startX+60},${startY+30} ${startX+30},${startY+40}`);
        poly.setAttribute("fill", "var(--danger)");
        poly.setAttribute("stroke", "var(--dark)");
        poly.setAttribute("stroke-width", "1");
        svg.appendChild(poly);
      }
    }

    function drawRect(rx, ry, w, h, color) {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", rx);
      rect.setAttribute("y", ry);
      rect.setAttribute("width", w);
      rect.setAttribute("height", h);
      rect.setAttribute("fill", color);
      rect.setAttribute("stroke", "var(--dark)");
      rect.setAttribute("stroke-width", "1");
      svg.appendChild(rect);
    }
  }
  else if (type === "clothes-tally") {
    // 繪製衣服分類計數表表格 (2x3)
    const gridY = [25, 55, 95, 135];
    const gridX = [15, 65, 125, 185];

    // 表格背景
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("x", gridX[0]);
    bg.setAttribute("y", gridY[0]);
    bg.setAttribute("width", gridX[3] - gridX[0]);
    bg.setAttribute("height", gridY[3] - gridY[0]);
    bg.setAttribute("fill", "var(--light)");
    bg.setAttribute("rx", "6");
    svg.appendChild(bg);

    // 畫表格線條
    for (let i = 0; i < gridY.length; i++) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", gridX[0]);
      line.setAttribute("y1", gridY[i]);
      line.setAttribute("x2", gridX[3]);
      line.setAttribute("y2", gridY[i]);
      line.setAttribute("stroke", "var(--dark)");
      line.setAttribute("stroke-width", "1.5");
      svg.appendChild(line);
    }
    for (let i = 0; i < gridX.length; i++) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", gridX[i]);
      line.setAttribute("y1", gridY[0]);
      line.setAttribute("x2", gridX[i]);
      line.setAttribute("y2", gridY[3]);
      line.setAttribute("stroke", "var(--dark)");
      line.setAttribute("stroke-width", "1.5");
      svg.appendChild(line);
    }

    // 填充標題文字
    drawTableHeaderText("類別", (gridX[0]+gridX[1])/2, 43);
    drawTableHeaderText("短袖 / 短褲", (gridX[1]+gridX[2])/2, 43);
    drawTableHeaderText("長袖 / 長褲", (gridX[2]+gridX[3])/2, 43);

    // 填充第一列 (上衣 👕)
    drawTableHeaderText("👕 上衣", (gridX[0]+gridX[1])/2, 79);
    // 短袖上衣 4 件
    drawTally(gridX[1] + 15, gridY[1] + 10, 4);
    // 長袖上衣 2 件
    drawTally(gridX[2] + 25, gridY[1] + 10, 2);

    // 填充第二列 (褲子 🩳)
    drawTableHeaderText("🩳 褲子", (gridX[0]+gridX[1])/2, 119);
    // 短褲 3 件
    drawTally(gridX[1] + 20, gridY[2] + 10, 3);
    // 長褲 5 件 (畫「正」字記號)
    drawTallyChinese(gridX[2] + 20, gridY[2] + 10);

    function drawTableHeaderText(text, tx, ty) {
      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.setAttribute("x", tx);
      txt.setAttribute("y", ty);
      txt.setAttribute("font-size", "11");
      txt.setAttribute("font-weight", "bold");
      txt.setAttribute("text-anchor", "middle");
      txt.setAttribute("fill", "var(--dark)");
      txt.textContent = text;
      svg.appendChild(txt);
    }

    function drawTally(tx, ty, count) {
      for (let i = 0; i < count; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        const xOffset = i * 8;
        line.setAttribute("x1", tx + xOffset);
        line.setAttribute("y1", ty + 2);
        line.setAttribute("x2", tx + xOffset + 2);
        line.setAttribute("y2", ty + 18);
        line.setAttribute("stroke", "var(--secondary)");
        line.setAttribute("stroke-width", "2.5");
        line.setAttribute("stroke-linecap", "round");
        svg.appendChild(line);
      }
    }

    function drawTallyChinese(tx, ty) {
      // 繪製「正」字
      const lines = [
        { x1: tx, y1: ty+2, x2: tx+20, y2: ty+2 },       // 橫
        { x1: tx+10, y1: ty+2, x2: tx+10, y2: ty+18 },   // 豎
        { x1: tx, y1: ty+10, x2: tx+10, y2: ty+10 },     // 中橫
        { x1: tx, y1: ty+10, x2: tx, y2: ty+18 },       // 左豎
        { x1: tx, y1: ty+18, x2: tx+20, y2: ty+18 }      // 底橫
      ];
      lines.forEach((l) => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", l.x1);
        line.setAttribute("y1", l.y1);
        line.setAttribute("x2", l.x2);
        line.setAttribute("y2", l.y2);
        line.setAttribute("stroke", "var(--primary)");
        line.setAttribute("stroke-width", "2.5");
        line.setAttribute("stroke-linecap", "round");
        svg.appendChild(line);
      });
    }
  }
  else if (type === "marbles-subtraction") {
    // 繪製 24 顆彈珠減法分裝
    const textFormula = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textFormula.setAttribute("x", "100");
    textFormula.setAttribute("y", "25");
    textFormula.setAttribute("font-size", "12");
    textFormula.setAttribute("font-weight", "bold");
    textFormula.setAttribute("text-anchor", "middle");
    textFormula.setAttribute("fill", "var(--dark)");
    textFormula.textContent = "24 - 6 - 6 - 6 - 6 = 0";
    svg.appendChild(textFormula);

    for (let r = 0; r < 4; r++) {
      const ry = 48 + r * 26;

      const bag = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      bag.setAttribute("x", "20");
      bag.setAttribute("y", ry - 10);
      bag.setAttribute("width", "130");
      bag.setAttribute("height", "20");
      bag.setAttribute("fill", "none");
      bag.setAttribute("stroke", "var(--primary-light)");
      bag.setAttribute("stroke-width", "1");
      bag.setAttribute("stroke-dasharray", "3,3");
      bag.setAttribute("rx", "6");
      svg.appendChild(bag);

      for (let c = 0; c < 6; c++) {
        const cx = 32 + c * 20;

        const marble = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        marble.setAttribute("cx", cx);
        marble.setAttribute("cy", ry);
        marble.setAttribute("r", "6");
        marble.setAttribute("fill", "var(--secondary-light)");
        marble.setAttribute("stroke", "var(--dark)");
        marble.setAttribute("stroke-width", "1");
        svg.appendChild(marble);

        const hl = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        hl.setAttribute("cx", cx - 2);
        hl.setAttribute("cy", ry - 2);
        hl.setAttribute("r", "1.5");
        hl.setAttribute("fill", "white");
        svg.appendChild(hl);

        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", cx - 5);
        line1.setAttribute("y1", ry - 5);
        line1.setAttribute("x2", cx + 5);
        line1.setAttribute("y2", ry + 5);
        line1.setAttribute("stroke", "var(--danger)");
        line1.setAttribute("stroke-width", "1.5");
        svg.appendChild(line1);

        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line2.setAttribute("x1", cx + 5);
        line2.setAttribute("y1", ry - 5);
        line2.setAttribute("x2", cx - 5);
        line2.setAttribute("y2", ry + 5);
        line2.setAttribute("stroke", "var(--danger)");
        line2.setAttribute("stroke-width", "1.5");
        svg.appendChild(line2);
      }

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", "165");
      label.setAttribute("y", ry + 4);
      label.setAttribute("font-size", "11");
      label.setAttribute("font-weight", "bold");
      label.setAttribute("fill", "var(--danger)");
      label.textContent = "- 6 顆";
      svg.appendChild(label);
    }
  }
  else if (type === "corn-division") {
    // 繪製玉米分配：甲（5根），乙（7根）
    drawPlate(60, 95, 5, "甲 (5根)");
    drawPlate(140, 95, 7, "乙 (7根)");

    function drawPlate(px, py, count, label) {
      const plate = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      plate.setAttribute("cx", px);
      plate.setAttribute("cy", py + 12);
      plate.setAttribute("rx", "32");
      plate.setAttribute("ry", "18");
      plate.setAttribute("fill", "#dfe6e9");
      plate.setAttribute("stroke", "var(--dark)");
      plate.setAttribute("stroke-width", "1.5");
      svg.appendChild(plate);

      const plateInner = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      plateInner.setAttribute("cx", px);
      plateInner.setAttribute("cy", py + 12);
      plateInner.setAttribute("rx", "26");
      plateInner.setAttribute("ry", "13");
      plateInner.setAttribute("fill", "none");
      plateInner.setAttribute("stroke", "#b2bec3");
      plateInner.setAttribute("stroke-width", "1");
      svg.appendChild(plateInner);

      for (let i = 0; i < count; i++) {
        const offsetAngle = (i * 2 * Math.PI) / count;
        const rx = 14 * Math.cos(offsetAngle);
        const ry = 7 * Math.sin(offsetAngle);
        drawMiniCorn(px + rx, py + 8 + ry, 12 - (i % 2)*24);
      }

      const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
      txt.setAttribute("x", px);
      txt.setAttribute("y", py + 45);
      txt.setAttribute("font-size", "11");
      txt.setAttribute("font-weight", "bold");
      txt.setAttribute("text-anchor", "middle");
      txt.setAttribute("fill", "var(--dark)");
      txt.textContent = label;
      svg.appendChild(txt);
    }

    function drawMiniCorn(cx, cy, rotation) {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("transform", `translate(${cx}, ${cy}) rotate(${rotation})`);

      const c = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      c.setAttribute("cx", "0");
      c.setAttribute("cy", "0");
      c.setAttribute("rx", "9");
      c.setAttribute("ry", "4.5");
      c.setAttribute("fill", "#ffeaa7");
      c.setAttribute("stroke", "#d87a00");
      c.setAttribute("stroke-width", "0.8");
      g.appendChild(c);

      const leaf = document.createElementNS("http://www.w3.org/2000/svg", "path");
      leaf.setAttribute("d", "M -9 0 Q -11 -3 -8 -2 Q -12 2 -9 0");
      leaf.setAttribute("fill", "#55efc4");
      g.appendChild(leaf);

      svg.appendChild(g);
    }
  }
  else if (type === "fair-share-compare") {
    // 繪製平分比較圖：圖形 A（不均勻圓形），圖形 B（均勻正方形）
    const cx = 55, cy = 70, r = 35;
    
    const circleBg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circleBg.setAttribute("cx", cx);
    circleBg.setAttribute("cy", cy);
    circleBg.setAttribute("r", r);
    circleBg.setAttribute("fill", "var(--light)");
    circleBg.setAttribute("stroke", "var(--dark)");
    circleBg.setAttribute("stroke-width", "1.5");
    svg.appendChild(circleBg);

    const lineA1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lineA1.setAttribute("x1", cx - 35);
    lineA1.setAttribute("y1", cy - 10);
    lineA1.setAttribute("x2", cx + 35);
    lineA1.setAttribute("y2", cy + 15);
    lineA1.setAttribute("stroke", "var(--dark)");
    lineA1.setAttribute("stroke-width", "1.5");
    svg.appendChild(lineA1);

    const lineA2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lineA2.setAttribute("x1", cx - 10);
    lineA2.setAttribute("y1", cy - 33);
    lineA2.setAttribute("x2", cx + 15);
    lineA2.setAttribute("y2", cy + 32);
    lineA2.setAttribute("stroke", "var(--dark)");
    lineA2.setAttribute("stroke-width", "1.5");
    svg.appendChild(lineA2);

    const labelA = document.createElementNS("http://www.w3.org/2000/svg", "text");
    labelA.setAttribute("x", cx);
    labelA.setAttribute("y", cy + 55);
    labelA.setAttribute("font-size", "11");
    labelA.setAttribute("font-weight", "bold");
    labelA.setAttribute("text-anchor", "middle");
    labelA.setAttribute("fill", "var(--dark)");
    labelA.textContent = "圖形 A";
    svg.appendChild(labelA);

    const bx = 145, by = 70, size = 60;
    const half = size / 2;

    const rectBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectBg.setAttribute("x", bx - half);
    rectBg.setAttribute("y", by - half);
    rectBg.setAttribute("width", size);
    rectBg.setAttribute("height", size);
    rectBg.setAttribute("fill", "var(--light)");
    rectBg.setAttribute("stroke", "var(--dark)");
    rectBg.setAttribute("stroke-width", "1.5");
    svg.appendChild(rectBg);

    const lineB1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lineB1.setAttribute("x1", bx - half);
    lineB1.setAttribute("y1", by - half);
    lineB1.setAttribute("x2", bx + half);
    lineB1.setAttribute("y2", by + half);
    lineB1.setAttribute("stroke", "var(--dark)");
    lineB1.setAttribute("stroke-width", "1.5");
    svg.appendChild(lineB1);

    const lineB2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lineB2.setAttribute("x1", bx - half);
    lineB2.setAttribute("y1", by + half);
    lineB2.setAttribute("x2", bx + half);
    lineB2.setAttribute("y2", by - half);
    lineB2.setAttribute("stroke", "var(--dark)");
    lineB2.setAttribute("stroke-width", "1.5");
    svg.appendChild(lineB2);

    const labelB = document.createElementNS("http://www.w3.org/2000/svg", "text");
    labelB.setAttribute("x", bx);
    labelB.setAttribute("y", by + 55);
    labelB.setAttribute("font-size", "11");
    labelB.setAttribute("font-weight", "bold");
    labelB.setAttribute("text-anchor", "middle");
    labelB.setAttribute("fill", "var(--dark)");
    labelB.textContent = "圖形 B";
    svg.appendChild(labelB);
  }
  else if (type === "flag-compare") {
    // 國旗甲 (垂直三等分，左邊塗紅)
    const f1x = 20, f1y = 45, fw = 60, fh = 40;

    const flagA = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    flagA.setAttribute("x", f1x);
    flagA.setAttribute("y", f1y);
    flagA.setAttribute("width", fw);
    flagA.setAttribute("height", fh);
    flagA.setAttribute("fill", "var(--light)");
    flagA.setAttribute("stroke", "var(--dark)");
    flagA.setAttribute("stroke-width", "1.5");
    svg.appendChild(flagA);

    const flagAShaded = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    flagAShaded.setAttribute("x", f1x);
    flagAShaded.setAttribute("y", f1y);
    flagAShaded.setAttribute("width", fw / 3);
    flagAShaded.setAttribute("height", fh);
    flagAShaded.setAttribute("fill", "#ff7675");
    flagAShaded.setAttribute("stroke", "var(--dark)");
    flagAShaded.setAttribute("stroke-width", "1.5");
    svg.appendChild(flagAShaded);

    const lineA = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lineA.setAttribute("x1", f1x + (2 * fw) / 3);
    lineA.setAttribute("y1", f1y);
    lineA.setAttribute("x2", f1x + (2 * fw) / 3);
    lineA.setAttribute("y2", f1y + fh);
    lineA.setAttribute("stroke", "var(--dark)");
    lineA.setAttribute("stroke-width", "1.5");
    svg.appendChild(lineA);

    const labelA = document.createElementNS("http://www.w3.org/2000/svg", "text");
    labelA.setAttribute("x", f1x + fw/2);
    labelA.setAttribute("y", f1y + fh + 22);
    labelA.setAttribute("font-size", "11");
    labelA.setAttribute("font-weight", "bold");
    labelA.setAttribute("text-anchor", "middle");
    labelA.setAttribute("fill", "var(--dark)");
    labelA.textContent = "國旗甲";
    svg.appendChild(labelA);

    // 國旗乙 (不規則切分)
    const f2x = 120, f2y = 45;

    const flagB = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    flagB.setAttribute("x", f2x);
    flagB.setAttribute("y", f2y);
    flagB.setAttribute("width", fw);
    flagB.setAttribute("height", fh);
    flagB.setAttribute("fill", "var(--light)");
    flagB.setAttribute("stroke", "var(--dark)");
    flagB.setAttribute("stroke-width", "1.5");
    svg.appendChild(flagB);

    const flagBShaded = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    flagBShaded.setAttribute("points", `${f2x},${f2y} ${f2x+15},${f2y} ${f2x+35},${f2y+fh} ${f2x},${f2y+fh}`);
    flagBShaded.setAttribute("fill", "#ff7675");
    flagBShaded.setAttribute("stroke", "var(--dark)");
    flagBShaded.setAttribute("stroke-width", "1.5");
    svg.appendChild(flagBShaded);

    const lineB = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lineB.setAttribute("x1", f2x + 40);
    lineB.setAttribute("y1", f2y);
    lineB.setAttribute("x2", f2x + 45);
    lineB.setAttribute("y2", f2y + fh);
    lineB.setAttribute("stroke", "var(--dark)");
    lineB.setAttribute("stroke-width", "1.5");
    svg.appendChild(lineB);

    const labelB = document.createElementNS("http://www.w3.org/2000/svg", "text");
    labelB.setAttribute("x", f2x + fw/2);
    labelB.setAttribute("y", f2y + fh + 22);
    labelB.setAttribute("font-size", "11");
    labelB.setAttribute("font-weight", "bold");
    labelB.setAttribute("text-anchor", "middle");
    labelB.setAttribute("fill", "var(--dark)");
    labelB.textContent = "國旗乙";
    svg.appendChild(labelB);
  }
  else if (type === "paper-compare") {
    // 繪製莉芸 (1/8) 與 子翔 (1/4) 的壁報紙比較
    const px1 = 20, py = 45, pw = 60, ph = 40;

    const paperA = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    paperA.setAttribute("x", px1);
    paperA.setAttribute("y", py);
    paperA.setAttribute("width", pw);
    paperA.setAttribute("height", ph);
    paperA.setAttribute("fill", "var(--light)");
    paperA.setAttribute("stroke", "var(--dark)");
    paperA.setAttribute("stroke-width", "1.5");
    svg.appendChild(paperA);

    const paperAShaded = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    paperAShaded.setAttribute("x", px1);
    paperAShaded.setAttribute("y", py);
    paperAShaded.setAttribute("width", pw);
    paperAShaded.setAttribute("height", ph / 8);
    paperAShaded.setAttribute("fill", "var(--primary-light)");
    paperAShaded.setAttribute("stroke", "var(--dark)");
    paperAShaded.setAttribute("stroke-width", "1");
    svg.appendChild(paperAShaded);

    for (let i = 1; i < 8; i++) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", px1);
      line.setAttribute("y1", py + (i * ph) / 8);
      line.setAttribute("x2", px1 + pw);
      line.setAttribute("y2", py + (i * ph) / 8);
      line.setAttribute("stroke", "var(--dark)");
      line.setAttribute("stroke-width", "1");
      svg.appendChild(line);
    }

    const labelA = document.createElementNS("http://www.w3.org/2000/svg", "text");
    labelA.setAttribute("x", px1 + pw/2);
    labelA.setAttribute("y", py + ph + 22);
    labelA.setAttribute("font-size", "10");
    labelA.setAttribute("font-weight", "bold");
    labelA.setAttribute("text-anchor", "middle");
    labelA.setAttribute("fill", "var(--dark)");
    labelA.textContent = "莉芸 (1/8)";
    svg.appendChild(labelA);

    const px2 = 120;

    const paperB = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    paperB.setAttribute("x", px2);
    paperB.setAttribute("y", py);
    paperB.setAttribute("width", pw);
    paperB.setAttribute("height", ph);
    paperB.setAttribute("fill", "var(--light)");
    paperB.setAttribute("stroke", "var(--dark)");
    paperB.setAttribute("stroke-width", "1.5");
    svg.appendChild(paperB);

    const paperBShaded = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    paperBShaded.setAttribute("x", px2);
    paperBShaded.setAttribute("y", py);
    paperBShaded.setAttribute("width", pw);
    paperBShaded.setAttribute("height", ph / 4);
    paperBShaded.setAttribute("fill", "var(--primary-light)");
    paperBShaded.setAttribute("stroke", "var(--dark)");
    paperBShaded.setAttribute("stroke-width", "1");
    svg.appendChild(paperBShaded);

    for (let i = 1; i < 4; i++) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", px2);
      line.setAttribute("y1", py + (i * ph) / 4);
      line.setAttribute("x2", px2 + pw);
      line.setAttribute("y2", py + (i * ph) / 4);
      line.setAttribute("stroke", "var(--dark)");
      line.setAttribute("stroke-width", "1");
      svg.appendChild(line);
    }

    const labelB = document.createElementNS("http://www.w3.org/2000/svg", "text");
    labelB.setAttribute("x", px2 + pw/2);
    labelB.setAttribute("y", py + ph + 22);
    labelB.setAttribute("font-size", "10");
    labelB.setAttribute("font-weight", "bold");
    labelB.setAttribute("text-anchor", "middle");
    labelB.setAttribute("fill", "var(--dark)");
    labelB.textContent = "子翔 (1/4)";
    svg.appendChild(labelB);
  }

  // 渲染至網頁 DOM
  container.appendChild(svg);
}

// --- 介面導航切換 ---
function showScreen(screenId) {
  playSound('click');
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add("active");
    currentScreen = screenId;
  }

  // 首頁載入時更新關卡卡片資訊
  if (screenId === "levelSelectScreen") {
    renderLevelGrid();
  }
}

// --- 渲染關卡卡片網格 ---
function renderLevelGrid() {
  const grid = document.getElementById("levelGrid");
  grid.innerHTML = "";

  const levelConfigs = [
    { num: 6, title: "第六單元：兩步驟問題" },
    { num: 7, title: "第七單元：公尺與公分" },
    { num: 8, title: "第八單元：分類與立體形體" },
    { num: 9, title: "第九單元：分裝與平分" },
    { num: 10, title: "第十單元：分數" }
  ];

  levelConfigs.forEach((cfg) => {
    const stat = gameStats[`level${cfg.num}`];
    const card = document.createElement("div");
    card.className = "level-card";
    card.onclick = () => startLevel(cfg.num);

    const levelNum = document.createElement("div");
    levelNum.className = "level-number";
    levelNum.textContent = `0${cfg.num - 5}`;

    const levelTitle = document.createElement("div");
    levelTitle.className = "level-title";
    levelTitle.textContent = cfg.title;

    // 進度條
    const progressContainer = document.createElement("div");
    progressContainer.className = "level-progress-bar";
    const progressFill = document.createElement("div");
    progressFill.className = "level-progress-fill";
    progressFill.style.width = stat.completed ? "100%" : "0%";
    progressContainer.appendChild(progressFill);

    // 星星
    const starsContainer = document.createElement("div");
    starsContainer.className = "level-stars";
    for (let i = 1; i <= 3; i++) {
      const star = document.createElement("span");
      star.textContent = "⭐";
      if (i <= stat.stars) {
        star.className = "active";
      }
      starsContainer.appendChild(star);
    }

    card.appendChild(levelNum);
    card.appendChild(levelTitle);
    card.appendChild(progressContainer);
    card.appendChild(starsContainer);

    grid.appendChild(card);
  });
}

// --- 開始關卡挑戰 ---
function startLevel(levelNum) {
  currentLevel = levelNum;
  
  if (levelNum === 'full') {
    // 全範圍挑戰：從 100 題中隨機抽取 20 題
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    questionsQueue = shuffled.slice(0, 20);
  } else {
    // 單一單元練習：過濾該單元的 20 題
    questionsQueue = QUESTIONS.filter(q => q.unit === levelNum);
  }

  currentIndex = 0;
  score = 0;
  streak = 0;

  // 更新介面資訊
  const badge = document.getElementById("currentUnitBadge");
  badge.textContent = levelNum === 'full' ? "全範圍挑戰" : `單元 ${levelNum}`;
  
  updateScoreBadge();
  updateStreakBadge();

  showScreen("playScreen");
  loadQuestion(0);
}

// --- 載入特定題目的詳細數據 ---
function loadQuestion(index) {
  if (index >= questionsQueue.length) {
    endGame();
    return;
  }

  currentIndex = index;
  const q = questionsQueue[index];

  // 更新進度條
  const progressFill = document.getElementById("progressBarFill");
  const percent = (index / questionsQueue.length) * 100;
  progressFill.style.width = `${percent}%`;

  // 渲染題目文字
  const qText = document.getElementById("questionText");
  qText.textContent = `Q${index + 1}. ${q.question}`;

  // 繪製向量圖
  renderQuestionSVG(q);

  // 隨機重排選項 (防止固定順序背答案)
  const choicesGrid = document.getElementById("choicesGrid");
  choicesGrid.innerHTML = "";
  
  const choices = [...q.options].sort(() => 0.5 - Math.random());
  
  // 渲染選項按鈕
  const letters = ["A", "B", "C", "D"];
  choices.forEach((choice, cIdx) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.onclick = (e) => checkAnswer(choice, btn, e);

    const letterSpan = document.createElement("span");
    letterSpan.className = "choice-letter";
    letterSpan.textContent = letters[cIdx];

    const textSpan = document.createElement("span");
    textSpan.textContent = choice;

    btn.appendChild(letterSpan);
    btn.appendChild(textSpan);
    choicesGrid.appendChild(btn);
  });
}

// --- 答題判斷與回饋 ---
function checkAnswer(selectedOption, btnElement, clickEvent) {
  // 防止重複點擊
  const buttons = document.querySelectorAll(".choice-btn");
  buttons.forEach(btn => btn.disabled = true);

  const q = questionsQueue[currentIndex];
  const isCorrect = selectedOption === q.answer;

  if (isCorrect) {
    // 答對了！
    playSound('correct');
    btnElement.classList.add("correct");
    streak++;
    score += (10 + Math.min(streak - 1, 5)); // 答對得 10 分 + 連擊加分 (上限加 5 分)
    
    // 噴灑星星特效
    if (clickEvent) {
      // 取得點擊按鈕的相對坐標
      const rect = document.getElementById("playScreen").getBoundingClientRect();
      const x = clickEvent.clientX - rect.left;
      const y = clickEvent.clientY - rect.top;
      createSparks(x, y);
    }
    
    updateScoreBadge();
    updateStreakBadge();

    // 彈出解析對話框
    setTimeout(() => {
      showFeedbackModal(true, q.explanation);
    }, 600);
  } else {
    // 答錯了！
    playSound('wrong');
    btnElement.classList.add("wrong");
    document.getElementById("questionCard").classList.add("shake-animation");
    
    // 尋找並標記正確選項
    buttons.forEach(btn => {
      if (btn.querySelector("span:nth-child(2)").textContent === q.answer) {
        btn.classList.add("correct");
      }
    });

    streak = 0; // 重設連擊
    updateStreakBadge();

    // 彈出解析對話框
    setTimeout(() => {
      showFeedbackModal(false, q.explanation);
    }, 1000);
  }
}

// --- 顯示詳解對話框 (Modal) ---
function showFeedbackModal(isCorrect, explanation) {
  const modal = document.getElementById("feedbackModal");
  const icon = document.getElementById("feedbackIcon");
  const title = document.getElementById("feedbackTitle");
  const body = document.getElementById("feedbackBody");

  if (isCorrect) {
    icon.textContent = "🎉";
    title.textContent = "答對了！太棒了！";
    title.style.color = "var(--secondary)";
  } else {
    icon.textContent = "💡";
    title.textContent = "哎呀！再接再厲！";
    title.style.color = "var(--danger)";
  }

  body.innerHTML = `<strong>解析說明：</strong><br>${explanation}`;
  modal.classList.add("active");
}

// --- 關閉 Modal 並載入下一題 ---
function nextQuestion() {
  document.getElementById("feedbackModal").classList.remove("active");
  document.getElementById("questionCard").classList.remove("shake-animation");
  
  // 載入下一題
  loadQuestion(currentIndex + 1);
}

// --- 結算與結束關卡 ---
function endGame() {
  playSound('success');

  const finalScore = Math.round((score / (questionsQueue.length * 15)) * 100); // 歸一化最高分數
  const displayScore = Math.min(finalScore, 100); // 確保不爆表
  
  // 評估星星數
  let stars = 1;
  if (displayScore >= 80) stars = 2;
  if (displayScore === 100) stars = 3;

  // 更新並儲存關卡紀錄
  const key = currentLevel === 'full' ? 'full' : `level${currentLevel}`;
  const stat = gameStats[key];
  stat.completed = true;
  stat.bestScore = Math.max(stat.bestScore, displayScore);
  stat.stars = Math.max(stat.stars, stars);
  saveStats();

  // 更新結算介面
  const emoji = document.getElementById("resultEmoji");
  const title = document.getElementById("resultScoreText");
  const msg = document.getElementById("resultMsg");

  if (displayScore === 100) {
    emoji.textContent = "👑";
    title.textContent = "完美通關！100分！";
    msg.textContent = `您真是一個數學小神童！完美答對所有題目，拿到了 3 顆星的滿分榮譽！`;
  } else if (displayScore >= 80) {
    emoji.textContent = "🥇";
    title.textContent = `優秀的成績！${displayScore}分`;
    msg.textContent = `非常出色！您在本次挑戰中表現非常亮眼，獲得了 2 顆星。繼續加油就可以拿到滿分囉！`;
  } else {
    emoji.textContent = "🥈";
    title.textContent = `挑戰完成！${displayScore}分`;
    msg.textContent = `完成了全部題目的作答。多練習幾次，一定會考得更好的！`;
  }

  showScreen("resultsScreen");
}

// --- 資訊徽章數據更新 ---
function updateScoreBadge() {
  document.getElementById("scoreBadge").textContent = `🌟 分數 ${score}`;
}

function updateStreakBadge() {
  const badge = document.getElementById("streakBadge");
  badge.textContent = `🔥 連擊 ${streak}`;
  if (streak > 0) {
    badge.style.display = "flex";
  } else {
    badge.style.display = "none";
  }
}

// --- LocalStorage 讀取與儲存 ---
function saveStats() {
  localStorage.setItem("antigravity_math_stats", JSON.stringify(gameStats));
}

function loadStats() {
  const saved = localStorage.getItem("antigravity_math_stats");
  if (saved) {
    try {
      gameStats = JSON.parse(saved);
    } catch (e) {
      console.error("無法解析進度紀錄", e);
    }
  }

  // 讀取設定
  const savedSound = localStorage.getItem("soundEnabled");
  if (savedSound !== null) {
    soundEnabled = savedSound === "true";
    updateSoundBtn();
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    theme = savedTheme;
    document.body.setAttribute("data-theme", theme);
  }
}

function updateSoundBtn() {
  document.getElementById("soundToggleBtn").textContent = soundEnabled ? "🔊" : "🔇";
}

// --- 事件綁定與初始載入 ---
document.addEventListener("DOMContentLoaded", () => {
  // 載入進度數據
  loadStats();

  // 首頁開始按鈕
  document.getElementById("startPlayBtn").onclick = () => {
    showScreen("levelSelectScreen");
  };

  // 全範圍挑戰按鈕
  document.getElementById("fullChallengeBtn").onclick = () => {
    startLevel('full');
  };

  // 結算畫面重新挑戰按鈕
  document.getElementById("restartLevelBtn").onclick = () => {
    startLevel(currentLevel);
  };

  // 結算返回單元選擇
  document.getElementById("returnLevelSelectBtn").onclick = () => {
    showScreen("levelSelectScreen");
  };

  // Modal 繼續按鈕
  document.getElementById("feedbackCloseBtn").onclick = () => {
    nextQuestion();
  };

  // 音效開關按鈕
  document.getElementById("soundToggleBtn").onclick = () => {
    soundEnabled = !soundEnabled;
    localStorage.setItem("soundEnabled", soundEnabled);
    updateSoundBtn();
    playSound('click');
  };

  // 主題切換按鈕
  document.getElementById("themeToggleBtn").onclick = () => {
    theme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme);
    playSound('click');
  };

  // 重設所有進度按鈕
  document.getElementById("resetProgressBtn").onclick = () => {
    if (confirm("您確定要重設所有的單元關卡星數與闖關進度嗎？此操作不可還原。")) {
      gameStats = {
        level6: { completed: false, bestScore: 0, stars: 0 },
        level7: { completed: false, bestScore: 0, stars: 0 },
        level8: { completed: false, bestScore: 0, stars: 0 },
        level9: { completed: false, bestScore: 0, stars: 0 },
        level10: { completed: false, bestScore: 0, stars: 0 },
        full: { completed: false, bestScore: 0, stars: 0 }
      };
      saveStats();
      if (currentScreen === "levelSelectScreen") {
        renderLevelGrid();
      }
      playSound('correct');
      alert("所有進度已重設成功！");
    }
  };
});

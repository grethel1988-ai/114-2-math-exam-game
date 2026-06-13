const QUESTIONS = [
  // ==========================================
  // 📐 第六單元：兩步驟問題 (乘與加減)
  // ==========================================
  {
    id: "u6_concept_1",
    unit: 6,
    type: "concept",
    question: "6 × 8 表示有 8 個 6。那麼 6 × 9 比 6 × 8 多了幾個 6？也就是多了多少？",
    options: ["多了 1 個 6，也就是多了 6", "多了 2 個 6，也就是多了 12", "少了 1 個 6，也就是少了 6", "多了 9 個 6，也就是多了 54"],
    answer: "多了 1 個 6，也就是多了 6",
    explanation: "6 × 9 代表有 9 個 6，比 8 個 6 多了 1 個 6，數值多了 6。",
    svgType: "none"
  },
  {
    id: "u6_concept_2",
    unit: 6,
    type: "concept",
    question: "7 × 5 比 7 × 3 多了幾個 7？也就是多了多少？",
    options: ["多了 2 個 7，也就是多了 14", "多了 5 個 7，也就是多了 35", "多了 1 個 7，也就是多了 7", "少了 2 個 7，也就是少了 14"],
    answer: "多了 2 個 7，也就是多了 14",
    explanation: "7 × 5 是 5 個 7，7 × 3 是 3 個 7，相差 2 個 7，也就是相差 14。",
    svgType: "none"
  },
  {
    id: "u6_concept_3",
    unit: 6,
    type: "concept",
    question: "9 × 4 比 9 × 6 少了幾個 9？也就是少了多少？",
    options: ["少了 2 個 9，也就是少了 18", "少了 4 個 9，也就是少了 36", "多了 2 個 9，也就是多了 18", "少了 1 個 9，也就是少了 9"],
    answer: "少了 2 個 9，也就是少了 18",
    explanation: "9 × 4 比 9 × 6 少了 2 個 9，也就是少了 9 × 2 = 18。",
    svgType: "none"
  },
  {
    id: "u6_concept_4",
    unit: 6,
    type: "concept",
    question: "一包軟糖有 5 顆。小明買了 4 包，又多買了 2 顆。要求一共有幾顆軟糖，第一個步驟要先算 4 包的數量，列成乘法算式是什麼？",
    options: ["5 × 4 = 20", "5 + 4 = 9", "4 × 2 = 8", "5 × 2 = 10"],
    answer: "5 × 4 = 20",
    explanation: "第一步要先算出 4 包軟糖有幾顆，每包 5 顆，所以是 5 × 4 = 20。",
    svgType: "none"
  },
  {
    id: "u6_concept_5",
    unit: 6,
    type: "concept",
    question: "鉛筆一枝 8 元。買 6 枝的錢剛好可以買一個玩偶，但還不夠 3 元。要求玩偶的價錢，第二個步驟應該怎麼做？",
    options: ["把 6 枝鉛筆的總價加上 3 元", "把 6 枝鉛筆的總價減去 3 元", "把 8 元加上 3 元", "把 6 枝鉛筆的總價乘以 3"],
    answer: "把 6 枝鉛筆的總價加上 3 元",
    explanation: "買 6 枝鉛筆的錢還不夠 3 元才能買玩偶，代表玩偶比 6 枝鉛筆的總價多 3 元，所以第二步要加 3 元。",
    svgType: "none"
  },
  {
    id: "u6_calc_1",
    unit: 6,
    type: "calc",
    question: "計算：5 × 6 + 12 = ？",
    options: ["42", "30", "18", "36"],
    answer: "42",
    explanation: "先算乘法 5 × 6 = 30，再算加法 30 + 12 = 42。",
    svgType: "none"
  },
  {
    id: "u6_calc_2",
    unit: 6,
    type: "calc",
    question: "計算：8 × 7 - 15 = ？",
    options: ["41", "56", "36", "46"],
    answer: "41",
    explanation: "先算乘法 8 × 7 = 56，再算減法 56 - 15 = 41。",
    svgType: "none"
  },
  {
    id: "u6_calc_3",
    unit: 6,
    type: "calc",
    question: "計算：9 × 9 + 19 = ？",
    options: ["100", "81", "90", "99"],
    answer: "100",
    explanation: "先算乘法 9 × 9 = 81，再算加法 81 + 19 = 100。",
    svgType: "none"
  },
  {
    id: "u6_calc_4",
    unit: 6,
    type: "calc",
    question: "計算：4 × 10 - 24 = ？",
    options: ["16", "40", "26", "20"],
    answer: "16",
    explanation: "先算乘法 4 × 10 = 40，再算減法 40 - 24 = 16。",
    svgType: "none"
  },
  {
    id: "u6_calc_5",
    unit: 6,
    type: "calc",
    question: "計算：7 × 8 - 36 = ？",
    options: ["20", "56", "26", "16"],
    answer: "20",
    explanation: "先算乘法 7 × 8 = 56，再算減法 56 - 36 = 20。",
    svgType: "none"
  },
  {
    id: "u6_diagram_1",
    unit: 6,
    type: "diagram",
    question: "看圖中草莓的數量，一共有幾顆草莓？",
    options: ["22 顆", "18 顆", "24 顆", "20 顆"],
    answer: "22 顆",
    explanation: "每盤有 6 顆草莓，共 3 盤，外面還有 4 顆。算式為 6 × 3 + 4 = 22 顆。",
    svgType: "grouping",
    svgParams: {
      groups: 3,
      itemsPerGroup: 6,
      itemType: "strawberry",
      looseItems: 4
    }
  },
  {
    id: "u6_diagram_2",
    unit: 6,
    type: "diagram",
    question: "看圖中由短木條接起來的長線段，這條長線段的總長度是幾公分？",
    options: ["44 公分", "32 公分", "40 公分", "36 公分"],
    answer: "44 公分",
    explanation: "4 根 8 公分的短木條接上 1 根 12 公分的木條。算式為 8 × 4 + 12 = 44 公分。",
    svgType: "line-segment",
    svgParams: {
      segments: [
        { length: 45, label: "8cm" },
        { length: 45, label: "8cm" },
        { length: 45, label: "8cm" },
        { length: 45, label: "8cm" },
        { length: 65, label: "12cm" }
      ],
      totalLabel: "?"
    }
  },
  {
    id: "u6_diagram_3",
    unit: 6,
    type: "diagram",
    question: "看圖中集點卡的紅格數量，小華一共集了幾格？",
    options: ["35 格", "30 格", "40 格", "33 格"],
    answer: "35 格",
    explanation: "前三列每列滿 10 格，第四列有 5 格。算式為 10 × 3 + 5 = 35 格。",
    svgType: "fraction-grid",
    svgParams: {
      rows: 4,
      cols: 10,
      shaded: 35
    }
  },
  {
    id: "u6_diagram_4",
    unit: 6,
    type: "diagram",
    question: "圖中每袋有 5 顆蘋果，買了 6 袋。拿走其中的 8 顆，還剩下幾顆蘋果？",
    options: ["22 顆", "30 顆", "20 顆", "25 顆"],
    answer: "22 顆",
    explanation: "總共有 5 × 6 = 30 顆蘋果，拿走 8 顆還剩 30 - 8 = 22 顆。",
    svgType: "grouping",
    svgParams: {
      groups: 6,
      itemsPerGroup: 5,
      itemType: "apple",
      removedItems: 8
    }
  },
  {
    id: "u6_diagram_5",
    unit: 6,
    type: "diagram",
    question: "小莉有 7 個 5 元硬幣，買了一支 20 元的冰棒，小莉還剩下幾元？",
    options: ["15 元", "35 元", "20 元", "25 元"],
    answer: "15 元",
    explanation: "7 個 5 元一共有 5 × 7 = 35 元，花掉 20 元剩 35 - 20 = 15 元。",
    svgType: "grouping",
    svgParams: {
      groups: 7,
      itemsPerGroup: 1,
      itemType: "coin5",
      spentValue: 20
    }
  },
  {
    id: "u6_word_1",
    unit: 6,
    type: "word",
    question: "班上有 6 個小組，每組有 4 位學生。今天有 2 位學生請假，請問今天出席的學生一共有幾人？",
    options: ["22 人", "24 人", "26 人", "20 人"],
    answer: "22 人",
    explanation: "全班共有 4 × 6 = 24 人，請假 2 人，出席人數為 24 - 2 = 22 人。",
    svgType: "none"
  },
  {
    id: "u6_word_2",
    unit: 6,
    type: "word",
    question: "媽媽買了 4 盒蛋塔，每盒裝有 6 個。分給隔壁鄰居 10 個後，媽媽還剩下幾個蛋塔？",
    options: ["14 個", "24 個", "20 個", "16 個"],
    answer: "14 個",
    explanation: "一共有 6 × 4 = 24 個蛋塔，分走 10 個後剩 24 - 10 = 14 個。",
    svgType: "none"
  },
  {
    id: "u6_word_3",
    unit: 6,
    type: "word",
    question: "樂樂買了 5 本練習本，每本賣 9 元。他付了一張 50 元鈔票，請問老闆要找給他幾元？",
    options: ["5 元", "45 元", "10 元", "15 元"],
    answer: "5 元",
    explanation: "5 本練習本共 9 × 5 = 45 元，付了 50 元，找回 50 - 45 = 5 元。",
    svgType: "none"
  },
  {
    id: "u6_word_4",
    unit: 6,
    type: "word",
    question: "飲料店老闆上午準備了 8 袋冰塊，每袋重 5 公斤。下午做冰品用掉了 23 公斤的冰塊，請問還剩下幾公斤的冰塊？",
    options: ["17 公斤", "40 公斤", "23 公斤", "27 公斤"],
    answer: "17 公斤",
    explanation: "原本有 5 × 8 = 40 公斤冰塊，用掉 23 公斤後剩下 40 - 23 = 17 公斤。",
    svgType: "none"
  },
  {
    id: "u6_word_5",
    unit: 6,
    type: "word",
    question: "文具店裡，一枝鋼筆賣 9 元，小強買了 7 枝，又買了一個 15 元的橡皮擦，他一共要付幾元？",
    options: ["78 元", "63 元", "73 元", "80 元"],
    answer: "78 元",
    explanation: "7 枝鋼筆共 9 × 7 = 63 元，加橡皮擦 15 元一共 63 + 15 = 78 元。",
    svgType: "none"
  },

  // ==========================================
  // 📏 第七單元：長度 (公尺與公分)
  // ==========================================
  {
    id: "u7_concept_1",
    unit: 7,
    type: "concept",
    question: "1 公尺等於多少公分？",
    options: ["100 公分", "10 公分", "1000 公分", "1 公分"],
    answer: "100 公分",
    explanation: "1 公尺等於 100 公分，是長度單位的基礎換算關係。",
    svgType: "none"
  },
  {
    id: "u7_concept_2",
    unit: 7,
    type: "concept",
    question: "5 公尺 6 公分等於多少公分？",
    options: ["506 公分", "560 公分", "56 公分", "5006 公分"],
    answer: "506 公分",
    explanation: "5 公尺等於 500 公分，再加上 6 公分就是 506 公分。注意不要誤寫為 560 公分。",
    svgType: "none"
  },
  {
    id: "u7_concept_3",
    unit: 7,
    type: "concept",
    question: "280 公分可以換算成幾公尺幾公分？",
    options: ["2 公尺 80 公分", "28 公尺 0 公分", "2 公尺 8 公分", "20 公尺 80 公分"],
    answer: "2 公尺 80 公分",
    explanation: "280 公分中有 200 公分可以換成 2 公尺，剩下的 80 公分保留，為 2 公尺 80 公分。",
    svgType: "none"
  },
  {
    id: "u7_concept_4",
    unit: 7,
    type: "concept",
    question: "400 公分也可以說是多少公尺？",
    options: ["4 公尺", "40 公尺", "0.4 公尺", "400 公尺"],
    answer: "4 公尺",
    explanation: "每 100 公分等於 1 公尺，400 公分就是 4 公尺。",
    svgType: "none"
  },
  {
    id: "u7_concept_5",
    unit: 7,
    type: "concept",
    question: "填入適合的長度單位：教室前黑板的長度大約是 4（　）。",
    options: ["公尺", "公分", "毫米", "公里"],
    answer: "公尺",
    explanation: "黑板的長度較長，應該用公尺作為測量單位，4 公尺較為合理（4 公分非常小）。",
    svgType: "none"
  },
  {
    id: "u7_calc_1",
    unit: 7,
    type: "calc",
    question: "計算：3 公尺 45 公分 + 1 公尺 20 公分 = ？",
    options: ["4 公尺 65 公分", "4 公尺 25 公分", "5 公尺 65 公分", "3 公尺 65 公分"],
    answer: "4 公尺 65 公分",
    explanation: "公尺加公尺：3 + 1 = 4 公尺；公分加公分：45 + 20 = 65 公分。",
    svgType: "none"
  },
  {
    id: "u7_calc_2",
    unit: 7,
    type: "calc",
    question: "計算：6 公尺 15 公分 - 2 公尺 45 公分 = ？",
    options: ["3 公尺 70 公分", "4 公尺 30 公分", "3 公尺 30 公分", "4 公尺 70 公分"],
    answer: "3 公尺 70 公分",
    explanation: "15 公分不夠減 45 公分，向 6 公尺借 1 公尺（即 100 公分）。115 - 45 = 70 公分，剩 5 公尺 - 2 公尺 = 3 公尺。",
    svgType: "none"
  },
  {
    id: "u7_calc_3",
    unit: 7,
    type: "calc",
    question: "計算：4 公尺 80 公分 + 50 公分 = ？",
    options: ["5 公尺 30 公分", "4 公尺 30 公分", "5 公尺 80 公分", "5 公尺 0 公分"],
    answer: "5 公尺 30 公分",
    explanation: "80 + 50 = 130 公分。130 公分中的 100 公分進位為 1 公尺。故得 5 公尺 30 公分。",
    svgType: "none"
  },
  {
    id: "u7_calc_4",
    unit: 7,
    type: "calc",
    question: "計算：5 公尺 - 1 公尺 35 公分 = ？",
    options: ["3 公尺 65 公分", "4 公尺 65 公分", "3 公尺 35 公分", "4 公尺 35 公分"],
    answer: "3 公尺 65 公分",
    explanation: "將 5 公尺看成 4 公尺 100 公分。100 - 35 = 65 公分，4 - 1 = 3 公尺。",
    svgType: "none"
  },
  {
    id: "u7_calc_5",
    unit: 7,
    type: "calc",
    question: "計算：125 公分 + 275 公分，合起來是多少公尺？",
    options: ["4 公尺", "400 公尺", "3 公尺", "40 公尺"],
    answer: "4 公尺",
    explanation: "125 + 275 = 400 公分，400 公分剛好等於 4 公尺。",
    svgType: "none"
  },
  {
    id: "u7_diagram_1",
    unit: 7,
    type: "diagram",
    question: "蝸牛從 0 公分爬到 1 公尺 15 公分後，又往回爬了 25 公分，現在蝸牛停在幾公分的地方？",
    options: ["90 公分處", "80 公分處", "140 公分處", "100 公分處"],
    answer: "90 公分處",
    explanation: "1 公尺 15 公分是 115 公分，往回爬代表減法：115 - 25 = 90 公分。",
    svgType: "line-segment",
    svgParams: {
      segments: [
        { length: 230, label: "1m 15cm" }
      ],
      backSegment: 50,
      backLabel: "往回 25cm",
      totalLabel: "此時位置?"
    }
  },
  {
    id: "u7_diagram_2",
    unit: 7,
    type: "diagram",
    question: "紅絲帶長 1 公尺 35 公分，藍絲帶長 85 公分，將它們接在一起，總共長幾公尺幾公分？",
    options: ["2 公尺 20 公分", "2 公尺 10 公分", "1 公尺 20 公分", "2 公尺 0 公分"],
    answer: "2 公尺 20 公分",
    explanation: "135 + 85 = 220 公分，換算後即為 2 公尺 20 公分。",
    svgType: "line-segment",
    svgParams: {
      segments: [
        { length: 135, label: "紅: 1m 35cm", color: "#ff4d4d" },
        { length: 85, label: "藍: 85cm", color: "#4d94ff" }
      ],
      totalLabel: "總長度?"
    }
  },
  {
    id: "u7_diagram_3",
    unit: 7,
    type: "diagram",
    question: "每個積木長度是 30 公分。四個積木排成一列，總長度是多少公尺多少公分？",
    options: ["1 公尺 20 公分", "1 公尺 0 公分", "2 公尺 0 公分", "12 公尺 0 公分"],
    answer: "1 公尺 20 公分",
    explanation: "30 × 4 = 120 公分，換算成公尺與公分是 1 公尺 20 公分。",
    svgType: "line-segment",
    svgParams: {
      segments: [
        { length: 50, label: "30cm", color: "#ffcc00" },
        { length: 50, label: "30cm", color: "#ffcc00" },
        { length: 50, label: "30cm", color: "#ffcc00" },
        { length: 50, label: "30cm", color: "#ffcc00" }
      ],
      totalLabel: "總長度?"
    }
  },
  {
    id: "u7_diagram_4",
    unit: 7,
    type: "diagram",
    question: "長頸鹿高 3 公尺 40 公分，小馬高 1 公尺 15 公分，長頸鹿比小馬高幾公尺幾公分？",
    options: ["2 公尺 25 公分", "2 公尺 35 公分", "1 公尺 25 公分", "2 公尺 15 公分"],
    answer: "2 公尺 25 公分",
    explanation: "3 公尺 40 公分 - 1 公尺 15 公分 = 2 公尺 25 公分（40 - 15 = 25，3 - 1 = 2）。",
    svgType: "line-segment",
    svgParams: {
      compare: true,
      line1: { length: 200, label: "長頸鹿: 3m 40cm", color: "#ff9900" },
      line2: { length: 67, label: "小馬: 1m 15cm", color: "#8b5a2b" },
      diffLabel: "相差?"
    }
  },
  {
    id: "u7_diagram_5",
    unit: 7,
    type: "diagram",
    question: "看圖中接力賽線段圖，從小明從起點 A 經由 B 點跑到終點 C，一共要跑幾公尺？",
    options: ["80 公尺", "70 公尺", "90 公尺", "76 公尺"],
    answer: "80 公尺",
    explanation: "總長度為第一段長與第二段長相加：38 + 42 = 80 公尺。",
    svgType: "line-segment",
    svgParams: {
      segments: [
        { length: 114, label: "A到B: 38公尺" },
        { length: 126, label: "B到C: 42公尺" }
      ],
      totalLabel: "起點A到終點C?"
    }
  },
  {
    id: "u7_word_1",
    unit: 7,
    type: "word",
    question: "姐姐的身高是 1 公尺 32 公分，妹妹的身高是 1 公尺 18 公分，請問姐姐比妹妹高幾公分？",
    options: ["14 公分", "24 公分", "18 公分", "12 公分"],
    answer: "14 公分",
    explanation: "1 公尺 32 公分是 132 公分，1 公尺 18 公分是 118 公分。相差 132 - 118 = 14 公分。",
    svgType: "none"
  },
  {
    id: "u7_word_2",
    unit: 7,
    type: "word",
    question: "媽媽買了一條長 3 公尺的蕾絲帶，包裝盒子用掉了 1 公尺 55 公分，這條蕾絲帶還剩下幾公尺幾公分？",
    options: ["1 公尺 45 公分", "2 公尺 45 公分", "1 公尺 55 公分", "1 公尺 35 公分"],
    answer: "1 公尺 45 公分",
    explanation: "3 公尺 = 300 公分，用掉 1 公尺 55 公分（155公分）。剩下 300 - 155 = 145 公分 = 1 公尺 45 公分。",
    svgType: "none"
  },
  {
    id: "u7_word_3",
    unit: 7,
    type: "word",
    question: "操場一圈長 100 公尺。體育課時，小明跑了 4 圈，小華跑了 350 公尺，請問小明比小華多跑了多少公尺？",
    options: ["50 公尺", "100 公尺", "150 公尺", "400 公尺"],
    answer: "50 公尺",
    explanation: "小明跑了 100 × 4 = 400 公尺，小華跑了 350 公尺。多跑了 400 - 350 = 50 公尺。",
    svgType: "none"
  },
  {
    id: "u7_word_4",
    unit: 7,
    type: "word",
    question: "鳳凰大廈一層樓的高度大約是 3 公尺。這棟大廈總共有 8 層樓，大廈的總高度大約是多少公尺？",
    options: ["24 公尺", "21 公尺", "27 公尺", "18 公尺"],
    answer: "24 公尺",
    explanation: "每層樓 3 公尺，共 8 層。總高度大約是 3 × 8 = 24 公尺。",
    svgType: "none"
  },
  {
    id: "u7_word_5",
    unit: 7,
    type: "word",
    question: "工人鋪設水溝，昨天鋪好了 45 公尺，今天鋪好了 58 公尺。這兩天一共鋪好了多少公尺的水溝？",
    options: ["103 公尺", "93 公尺", "113 公尺", "100 公尺"],
    answer: "103 公尺",
    explanation: "兩天一共鋪了 45 + 58 = 103 公尺。",
    svgType: "none"
  },

  // ==========================================
  // 📦 第八單元：分類與立體形體
  // ==========================================
  {
    id: "u8_concept_1",
    unit: 8,
    type: "concept",
    question: "正方體有幾個面？每個面都是什麼形狀？",
    options: ["6 個面，每個面都是正方形", "6 個面，每個面都是長方形", "8 個面，每個面都是正方形", "12 個面，每個面都是正方形"],
    answer: "6 個面，每個面都是正方形",
    explanation: "正方體有 6 個面，且每個面都是一樣大小的正方形。",
    svgType: "none"
  },
  {
    id: "u8_concept_2",
    unit: 8,
    type: "concept",
    question: "長方體有幾個面、幾個頂點和幾條邊？",
    options: ["6 個面、8 個頂點、12 條邊", "6 個面、6 個頂點、12 條邊", "8 個面、8 個頂點、12 條邊", "6 個面、8 個頂點、8 條邊"],
    answer: "6 個面、8 個頂點、12 條邊",
    explanation: "不論是正方體或長方體，皆具有 6 個面、8 個頂點和 12 條邊。",
    svgType: "none"
  },
  {
    id: "u8_concept_3",
    unit: 8,
    type: "concept",
    question: "關於正方體的 12 條邊，下列哪一項說法是正確的？",
    options: ["每一條邊都一樣長", "只有部分邊一樣長", "每一條邊長度都不一樣", "有 4 條邊比較長"],
    answer: "每一條邊都一樣長",
    explanation: "正方體的每個面都是相同的正方形，所以它的 12 條邊都一樣長。",
    svgType: "none"
  },
  {
    id: "u8_concept_4",
    unit: 8,
    type: "concept",
    question: "一個立體圖形有 8 個頂點、12 條邊，其中 2 個面是正方形，另外 4 個面是長方形，這個立體圖形叫作什麼？",
    options: ["長方體", "正方體", "圓柱體", "三角錐"],
    answer: "長方體",
    explanation: "有正方形也有長方形面的立體圖形是長方體（只有當6個面都是正方形時才是正方體）。",
    svgType: "none"
  },
  {
    id: "u8_concept_5",
    unit: 8,
    type: "concept",
    question: "將正方體放平，把它的面描在紙上，一共可以描出幾個一樣大的正方形？",
    options: ["6 個", "8 個", "12 個", "4 個"],
    answer: "6 個",
    explanation: "正方體有 6 個面，描下來就是 6 個一樣大的正方形。",
    svgType: "none"
  },
  {
    id: "u8_calc_1",
    unit: 8,
    type: "calc",
    question: "數數看：4 個正方體積木分開放置，一共有幾個面？",
    options: ["24 個面", "32 個面", "16 個面", "48 個面"],
    answer: "24 個面",
    explanation: "每個正方體有 6 個面，4 個正方體共有 6 × 4 = 24 個面。",
    svgType: "none"
  },
  {
    id: "u8_calc_2",
    unit: 8,
    type: "calc",
    question: "數數看：3 個長方體積木分開放置，一共有幾個頂點？",
    options: ["24 個頂點", "18 個頂點", "12 個頂點", "36 個頂點"],
    answer: "24 個頂點",
    explanation: "每個長方體有 8 個頂點，3 個長方體共有 8 × 3 = 24 個頂點。",
    svgType: "none"
  },
  {
    id: "u8_calc_3",
    unit: 8,
    type: "calc",
    question: "一個正方體的邊長都是 5 公分。小明要把它的每一條邊都貼上彩色膠帶，他一共需要長幾公分的膠帶？",
    options: ["60 公分", "30 公分", "40 公分", "50 公分"],
    answer: "60 公分",
    explanation: "正方體有 12 條邊，每條邊長 5 公分，需要 5 × 12 = 60 公分的膠帶。",
    svgType: "none"
  },
  {
    id: "u8_calc_4",
    unit: 8,
    type: "calc",
    question: "數數看：5 個正方體一共有幾條邊？",
    options: ["60 條邊", "40 條邊", "48 條邊", "72 條邊"],
    answer: "60 條邊",
    explanation: "每個正方體有 12 條邊，5 個正方體共有 12 × 5 = 60 條邊。",
    svgType: "none"
  },
  {
    id: "u8_calc_5",
    unit: 8,
    type: "calc",
    question: "有一組紙板，包含 2 個 6×6 公分的正方形與 4 個 6×10 公分的長方形。這一組紙板一共有幾個面？它們可以組合成一個長方體嗎？",
    options: ["6 個面，可以", "6 個面，不可以", "8 個面，可以", "6 個面，只能組合成正方體"],
    answer: "6 個面，可以",
    explanation: "一共有 2 + 4 = 6 個面。且 2 個正方形加上 4 個長方形的組合剛好可以拼成一個長方體。",
    svgType: "none"
  },
  {
    id: "u8_diagram_1",
    unit: 8,
    type: "diagram",
    question: "小矮人回家要踩著立體圖形前進，規律是：「正方體  →  長方體  →  正方體  →  長方體」。請問他應該走哪條路線？",
    options: ["ㄅ  →  ㄆ  →  ㄉ  →  ㄈ", "ㄅ  →  ㄆ  →  ㄇ  →  ㄈ", "ㄇ  →  ㄆ  →  ㄉ  →  ㄈ", "ㄅ  →  ㄉ  →  ㄆ  →  ㄈ"],
    answer: "ㄅ  →  ㄆ  →  ㄉ  →  ㄈ",
    optionsRaw: ["ㄅ", "ㄆ", "ㄇ", "ㄉ", "ㄈ"],
    explanation: "符合「正(ㄅ)  →  長(ㄆ)  →  正(ㄉ)  →  長(ㄈ)」的順序，ㄇ是球體不符合規律。",
    svgType: "dwarf-maze"
  },
  {
    id: "u8_diagram_2",
    unit: 8,
    type: "diagram",
    question: "將下圖長、寬、高分別是 8cm、5cm、3cm 的長方體的 6 個面描在紙上，最多可以描出幾種不同大小的長方形？",
    options: ["3 種", "6 種", "2 種", "4 種"],
    answer: "3 種",
    explanation: "長方體有三組相對的面，其長寬組合分別是 8×5、5×3、8×3，因此可以描出 3 種不同大小的長方形。",
    svgType: "cube-3d",
    svgParams: {
      shapeType: "rect",
      dimensions: { x: 80, y: 50, z: 30 }
    }
  },
  {
    id: "u8_diagram_3",
    unit: 8,
    type: "diagram",
    question: "看圖中兩組紙板展開圖，哪一組的面可以組合成一個長方體？",
    options: ["甲組", "乙組", "兩組都可以", "兩組都不可以"],
    answer: "甲組",
    explanation: "甲組包含 6 個面且具備對稱性（4個相同長方形，2個相同正方形），乙組只有 5 個長方形 and 1 個三角形，無法組成。",
    svgType: "box-nets"
  },
  {
    id: "u8_diagram_4",
    unit: 8,
    type: "diagram",
    question: "如果要做出一個正方體，需要準備幾顆代表頂點的粘土球和幾根代表邊的牙籤？",
    options: ["8 顆粘土球和 12 根牙籤", "6 顆粘土球和 12 根牙籤", "8 顆粘土球和 8 根牙籤", "12 顆粘土球和 8 根牙籤"],
    answer: "8 顆粘土球和 12 根牙籤",
    explanation: "正方體有 8 個頂點（粘土球）與 12 條邊（牙籤）。",
    svgType: "cube-3d",
    svgParams: {
      shapeType: "cube",
      dimensions: { x: 60, y: 60, z: 60 },
      showVertices: true,
      showEdges: true
    }
  },
  {
    id: "u8_diagram_5",
    unit: 8,
    type: "diagram",
    question: "看圖中皮卡丘整理衣服和褲子的紀錄。請問皮卡丘的上衣一共有幾件？",
    options: ["6 件", "7 件", "14 件", "10 件"],
    answer: "6 件",
    explanation: "上衣包含短袖 4 件與長袖 2 件，一共有 4 + 2 = 6 件。",
    svgType: "clothes-tally"
  },
  {
    id: "u8_word_1",
    unit: 8,
    type: "word",
    question: "老師把積木分類：第一類是「滾得動的（球與圓柱）」、第二類是「有平平的面的（正方與長方體）」、第三類是「有尖尖頂點的（角錐）」。奶粉罐積木和乾淨禮物盒（長方體）應分在哪一類？",
    options: ["奶粉罐在第一類，禮物盒在第二類", "都在第二類", "奶粉罐在第二類，禮物盒在第一類", "都在第一類"],
    answer: "奶粉罐在第一類，禮物盒在第二類",
    explanation: "奶粉罐（圓柱）滾得動，屬於第一類；禮物盒（長方體）有平平的面，屬於第二類。",
    svgType: "none"
  },
  {
    id: "u8_word_2",
    unit: 8,
    type: "word",
    question: "衣服先分「上衣」和「褲子」兩類。上衣又分「長袖」與「短袖」；褲子分「長褲」與「短褲」。已知短袖上衣 7 件、長袖上衣 4 件、長褲 5 件、短褲 3 件。上衣和褲子一共有幾件？",
    options: ["19 件", "11 件", "8 件", "16 件"],
    answer: "19 件",
    explanation: "上衣有 7 + 4 = 11 件，褲子有 5 + 3 = 8 件，一共是 11 + 8 = 19 件。",
    svgType: "none"
  },
  {
    id: "u8_word_3",
    unit: 8,
    type: "word",
    question: "包裝正方體魔術方塊。每個面都要貼一張貼紙。如果要包裝 5 個魔術方塊，店員一共要貼多少張貼紙？",
    options: ["30 張", "40 張", "24 張", "35 張"],
    answer: "30 張",
    explanation: "每個正方體有 6 個面。5 個方塊共有 6 × 5 = 30 個面，要貼 30 張貼紙。",
    svgType: "none"
  },
  {
    id: "u8_word_4",
    unit: 8,
    type: "word",
    question: "小華把卡片按「形狀（圓、三角）」與「顏色（紅、藍）」分類。紅色圓形有 6 張，藍色圓形有 4 張，紅色三角形有 3 張，藍色三角形有 5 張。請問圓形的卡片一共有幾張？",
    options: ["10 張", "18 張", "8 張", "14 張"],
    answer: "10 張",
    explanation: "圓形卡片包含紅色圓形 6 張與藍色圓形 4 張，一共有 6 + 4 = 10 張。",
    svgType: "none"
  },
  {
    id: "u8_word_5",
    unit: 8,
    type: "word",
    question: "爸爸買了一個裝蛋糕的長方體紙盒，長是 15 公分、寬是 10 公分、高是 8 公分。小明想用彩色膠帶貼滿它的 12 條邊，一共需要幾公分的膠帶？",
    options: ["132 公分", "33 公分", "66 公分", "120 公分"],
    answer: "132 公分",
    explanation: "長方體的 12 條邊包括 4 條長、4 條寬、4 條高。總長為 (15 + 10 + 8) × 4 = 33 × 4 = 132 公分。",
    svgType: "none"
  },

  // ==========================================
  // ➗ 第九單元：分分看 (分裝與平分)
  // ==========================================
  {
    id: "u9_concept_1",
    unit: 9,
    type: "concept",
    question: "「有 12 顆水蜜桃，每 6 顆裝成一盒，可以裝成幾盒？」這種每幾個分成一份，求可以分成幾份的問題，叫作什麼問題？",
    options: ["分裝問題", "平分問題", "乘法問題", "加法問題"],
    answer: "分裝問題",
    explanation: "固定每份的數量求份數，這類問題稱為分裝問題。",
    svgType: "none"
  },
  {
    id: "u9_concept_2",
    unit: 9,
    type: "concept",
    question: "「有 12 瓶果汁，平分給 4 個人，每個人得到幾瓶？」這種把東西分完，且每一份都要一樣多的問題，叫作什麼問題？",
    options: ["平分問題", "分裝問題", "倍數問題", "分配問題"],
    answer: "平分問題",
    explanation: "將總量平均分配給固定的份數，求每份的數量，稱為平分問題。",
    svgType: "none"
  },
  {
    id: "u9_concept_3",
    unit: 9,
    type: "concept",
    question: "把東西「平分」給其他人時，分完後每個人拿到的數量必須如何？",
    options: ["每個人拿到的數量要一樣多", "每個人拿到的數量可以不一樣", "年紀大的人要分比較多", "剩下越少越好"],
    answer: "每個人拿到的數量要一樣多",
    explanation: "平分的定義就是分配完畢，且每一份的數量完全相同、公平分配。",
    svgType: "none"
  },
  {
    id: "u9_concept_4",
    unit: 9,
    type: "concept",
    question: "有 24 顆糖果，每 4 顆裝成一包。用乘法算式求答案時，記作：4 × (  ) = 24，括號中的數代表什麼意思？",
    options: ["可以裝成的包數", "每包裝糖果的顆數", "糖果的總顆數", "剩下沒裝的糖果"],
    answer: "可以裝成的包數",
    explanation: "算式中 4 代表每包 4 顆，括號 ( ) 代表有幾包，24 是總顆數。所以 ( ) 代表可以裝成的包數。",
    svgType: "none"
  },
  {
    id: "u9_concept_5",
    unit: 9,
    type: "concept",
    question: "有 30 枝鉛筆，平分給 5 個人。用乘法算式求答案記作：(  ) × 5 = 30，括號中的數代表什麼意思？",
    options: ["每個人分到的鉛筆枝數", "分配的人數", "鉛筆的總枝數", "每人少分到的鉛筆"],
    answer: "每個人分到的鉛筆枝數",
    explanation: "算式中 5 代表分給 5 個人，括號 ( ) 代表每人分到的枝數，30 是總枝數。所以 ( ) 代表每人分到的鉛筆數。",
    svgType: "none"
  },
  {
    id: "u9_calc_1",
    unit: 9,
    type: "calc",
    question: "用乘法算式求括號中的數：8 × (  ) = 48",
    options: ["6", "7", "8", "5"],
    answer: "6",
    explanation: "依據八的乘法：8 × 6 = 48，因此括號中的數為 6。",
    svgType: "none"
  },
  {
    id: "u9_calc_2",
    unit: 9,
    type: "calc",
    question: "用乘法算式求括號中的數：(  ) × 7 = 35",
    options: ["5", "6", "4", "7"],
    answer: "5",
    explanation: "依據五的乘法：5 × 7 = 35，因此括號中的數為 5。",
    svgType: "none"
  },
  {
    id: "u9_calc_3",
    unit: 9,
    type: "calc",
    question: "用乘法算式求括號中的數：9 × (  ) = 72",
    options: ["8", "7", "9", "6"],
    answer: "8",
    explanation: "依據九的乘法：9 × 8 = 72，因此括號中的數為 8。",
    svgType: "none"
  },
  {
    id: "u9_calc_4",
    unit: 9,
    type: "calc",
    question: "有 28 顆草莓，每 4 顆裝成一盤，可以裝成幾盤？",
    options: ["7 盤", "6 盤", "8 盤", "9 盤"],
    answer: "7 盤",
    explanation: "每盤 4 顆，裝了 ( ) 盤共有 28 顆。算式為 4 × 7 = 28，所以可裝成 7 盤。",
    svgType: "none"
  },
  {
    id: "u9_calc_5",
    unit: 9,
    type: "calc",
    question: "有 21 顆巧克力，平分給 3 個人，每個人可以得到幾顆？",
    options: ["7 顆", "6 顆", "8 顆", "5 顆"],
    answer: "7 顆",
    explanation: "每人得到 ( ) 顆，3 個人共 21 顆。算式為 ( 7 ) × 3 = 21，所以每人得到 7 顆。",
    svgType: "none"
  },
  {
    id: "u9_diagram_1",
    unit: 9,
    type: "diagram",
    question: "看圖中草莓的排列，如果每 6 顆裝成一盒，可以裝成幾盒？",
    options: ["3 盒", "4 盒", "2 盒", "6 盒"],
    answer: "3 盒",
    explanation: "一共有 18 顆草莓，每 6 顆圈一圈，剛好可以圈成 3 圈（盒）。算式為 6 × 3 = 18。",
    svgType: "grouping",
    svgParams: {
      groups: 3,
      itemsPerGroup: 6,
      itemType: "strawberry"
    }
  },
  {
    id: "u9_diagram_2",
    unit: 9,
    type: "diagram",
    question: "把圖中的 8 個積木平分給小明和小華 2 個人，每人分到幾個？",
    options: ["4 個", "3 個", "2 個", "5 個"],
    answer: "4 個",
    explanation: "8 個積木平分給 2 人，每人分到 4 個。算式為 4 × 2 = 8。",
    svgType: "grouping",
    svgParams: {
      groups: 2,
      itemsPerGroup: 4,
      itemType: "square_block"
    }
  },
  {
    id: "u9_diagram_3",
    unit: 9,
    type: "diagram",
    question: "看圖中氣球的排列，如果每 4 顆綁成一束，可以綁成幾束？",
    options: ["5 束", "4 束", "6 束", "3 束"],
    answer: "5 束",
    explanation: "一共有 20 顆氣球，每 4 顆分成一組，一共是 5 組。算式為 4 × 5 = 20。",
    svgType: "grouping",
    svgParams: {
      groups: 5,
      itemsPerGroup: 4,
      itemType: "balloon"
    }
  },
  {
    id: "u9_diagram_4",
    unit: 9,
    type: "diagram",
    question: "圖中顯示 24 顆彈珠用減法分裝的過程。這代表每幾顆裝一袋？共裝成幾袋？",
    options: ["每 6 顆裝一袋，共裝成 4 袋", "每 4 顆裝一袋，共裝成 6 袋", "每 6 顆裝一袋，共裝成 24 袋", "每 24 顆裝一袋，共裝成 4 袋"],
    answer: "每 6 顆裝一袋，共裝成 4 袋",
    explanation: "每次減去 6，一共減了 4 次才減完（得0），代表每 6 顆裝一袋，共裝成 4 袋。",
    svgType: "marbles-subtraction"
  },
  {
    id: "u9_diagram_5",
    unit: 9,
    type: "diagram",
    question: "圖中把 12 根玉米分給 2 個人，一人分 5 根，一人分 7 根，這樣的分配公平嗎？如果要公平，每人應該分到幾根？",
    options: ["不公平，每人應分到 6 根", "公平，每人應分到 6 根", "不公平，每人應分到 5 根", "公平，每人應分到 7 根"],
    answer: "不公平，每人應分到 6 根",
    explanation: "兩個人分到的數量不同，所以是不公平的（非平分）。如果要公平，每人要分到 12 ÷ 2 = 6 根。",
    svgType: "corn-division"
  },
  {
    id: "u9_word_1",
    unit: 9,
    type: "word",
    question: "公主烤了 36 個蛋塔，每 9 個裝成一盒，可以裝成幾盒？",
    options: ["4 盒", "5 盒", "3 盒", "6 盒"],
    answer: "4 盒",
    explanation: "每盒 9 個，裝了 ( ) 盒是 36 個。算式為 9 × 4 = 36，所以可以裝成 4 盒。",
    svgType: "none"
  },
  {
    id: "u9_word_2",
    unit: 9,
    type: "word",
    question: "王子準備了 21 個飛盤，平均分配給 3 個班級，每個班級分到幾個飛盤？",
    options: ["7 個", "6 個", "8 個", "5 個"],
    answer: "7 個",
    explanation: "3 個班級，每班分到 ( ) 個共 21 個。算式為 ( 7 ) × 3 = 21（或 3 × 7 = 21），所以每班分到 7 個。",
    svgType: "none"
  },
  {
    id: "u9_word_3",
    unit: 9,
    type: "word",
    question: "媽媽買了 35 瓶果汁，每 7 瓶裝成一箱，共可以裝成幾箱？",
    options: ["5 箱", "6 箱", "4 箱", "7 箱"],
    answer: "5 箱",
    explanation: "每箱 7 瓶，裝了 ( ) 箱是 35 瓶。算式為 7 × 5 = 35，所以可以裝成 5 箱。",
    svgType: "none"
  },
  {
    id: "u9_word_4",
    unit: 9,
    type: "word",
    question: "二年甲班有 28 位學生，分組活動時每 4 人分成一組，一共可以分成幾組？",
    options: ["7 組", "6 組", "8 組", "9 組"],
    answer: "7 組",
    explanation: "每組 4 人，分成 ( ) 組共有 28 人。算式為 4 × 7 = 28，所以可以分成 7 組。",
    svgType: "none"
  },
  {
    id: "u9_word_5",
    unit: 9,
    type: "word",
    question: "農夫有 72 株菜苗，每排種 9 株，全部種完共可以種成幾排？",
    options: ["8 排", "7 排", "9 排", "6 排"],
    answer: "8 排",
    explanation: "每排 9 株，種了 ( ) 排共 72 株。算式為 9 × 8 = 72，所以可以種成 8 排。",
    svgType: "none"
  },

  // ==========================================
  // 🍰 第十單元：分數
  // ==========================================
  {
    id: "u10_concept_1",
    unit: 10,
    type: "concept",
    question: "把一個披薩「平分」成 4 塊，其中的 1 塊是幾個披薩？",
    options: ["1/4 個", "4 個", "1/2 個", "4/1 個"],
    answer: "1/4 個",
    explanation: "平分成 4 份，其中的 1 份就是四分之一（1/4）個。",
    svgType: "none"
  },
  {
    id: "u10_concept_2",
    unit: 10,
    type: "concept",
    question: "在分數 1/6 中，橫線下面的 6 和橫線上面的 1 分別叫作什麼？",
    options: ["下面的 6 是分母，上面的 1 是分子", "下面的 6 是分子，上面的 1 是分母", "下面的 6 是除數，上面的 1 是被除數", "下面的 6 是分數，上面的 1 是整數"],
    answer: "下面的 6 是分母，上面的 1 是分子",
    explanation: "分數中橫線下方的數是分母，表示平分成的總份數；橫線上方的數是分子，表示其中的份數。",
    svgType: "none"
  },
  {
    id: "u10_concept_3",
    unit: 10,
    type: "concept",
    question: "「九分之一」記作分數應該怎麼寫？",
    options: ["1/9", "9/1", "1.9", "9"],
    answer: "1/9",
    explanation: "九分之一代表分母是 9，分子是 1，寫成 1/9。",
    svgType: "none"
  },
  {
    id: "u10_concept_4",
    unit: 10,
    type: "concept",
    question: "把一條毛線平分剪成 8 段，其中的 1 段是幾分之幾條毛線？",
    options: ["1/8 條", "1/2 條", "8 條", "1/4 條"],
    answer: "1/8 條",
    explanation: "平分成 8 段，其中的 1 段就是八分之一（1/8）條毛線。",
    svgType: "none"
  },
  {
    id: "u10_concept_5",
    unit: 10,
    type: "concept",
    question: "相同的物品，平分成的份數越多，其中的 1 份會怎麼樣？",
    options: ["越小", "越大", "大小不變", "不一定"],
    answer: "越小",
    explanation: "同樣的東西切給越多人（平分越多份），每個人分到的一份就會越小。",
    svgType: "none"
  },
  {
    id: "u10_calc_1",
    unit: 10,
    type: "calc",
    question: "比較分數的大小，填入正確的符號：1/2 (  ) 1/4",
    options: [">", "<", "=", "無法比較"],
    answer: ">",
    explanation: "相同的東西，平分成 2 份的其中 1 份（1/2），比平分成 4 份的其中 1 份（1/4）大。故 1/2 > 1/4。",
    svgType: "none"
  },
  {
    id: "u10_calc_2",
    unit: 10,
    type: "calc",
    question: "比較分數的大小，填入正確的符號：1/8 (  ) 1/6",
    options: ["<", ">", "=", "無法比較"],
    answer: "<",
    explanation: "平分成 8 份的其中 1 份（1/8），會比平分成 6 份的其中 1 份（1/6）小。故 1/8 < 1/6。",
    svgType: "none"
  },
  {
    id: "u10_calc_3",
    unit: 10,
    type: "calc",
    question: "將分數 1/5、1/3、1/10 由大到小排列，哪一個是正確的？",
    options: ["1/3 > 1/5 > 1/10", "1/10 > 1/5 > 1/3", "1/5 > 1/3 > 1/10", "1/3 > 1/10 > 1/5"],
    answer: "1/3 > 1/5 > 1/10",
    explanation: "分母越小，代表平分成的份數越少，其中的一份就越大。所以 1/3 最大，1/10 最小。",
    svgType: "none"
  },
  {
    id: "u10_calc_4",
    unit: 10,
    type: "calc",
    question: "一個酥餅平分成 8 份，其中的 1 份是幾個酥餅？",
    options: ["1/8 個", "8 個", "1/2 個", "1/4 個"],
    answer: "1/8 個",
    explanation: "平分成 8 份，其中的 1 份即為八分之一（1/8）個酥餅。",
    svgType: "none"
  },
  {
    id: "u10_calc_5",
    unit: 10,
    type: "calc",
    question: "把 1 公尺長的彩帶平分成 6 段，每一段是幾公尺？",
    options: ["1/6 公尺", "6 公尺", "1/3 公尺", "1/2 公尺"],
    answer: "1/6 公尺",
    explanation: "將 1 公尺長度平分成 6 等分，每等分就是六分之一（1/6）公尺。",
    svgType: "none"
  },
  {
    id: "u10_diagram_1",
    unit: 10,
    type: "diagram",
    question: "看圖中圖形 A 與圖形 B 的切分方式，哪一個圖形有「平分」？",
    options: ["圖形 B 有平分，圖形 A 沒有", "圖形 A 有平分，圖形 B 沒有", "兩個圖形都有平分", "兩個圖形都沒有平分"],
    answer: "圖形 B 有平分，圖形 A 沒有",
    explanation: "圖形 A 的切片大小不均勻，不符合平分定義。圖形 B 切成 4 個完全一樣大的三角形，屬於平分。",
    svgType: "fair-share-compare"
  },
  {
    id: "u10_diagram_2",
    unit: 10,
    type: "diagram",
    question: "圖中藍色塗色部分佔了整個圓形的幾分之幾？",
    options: ["1/8", "1/6", "1/4", "1/2"],
    answer: "1/8",
    explanation: "圓形被平均分成 8 份，其中只有 1 份塗上藍色，代表八分之一（1/8）。",
    svgType: "fraction-circle",
    svgParams: {
      parts: 8,
      shaded: 1,
      isFair: true
    }
  },
  {
    id: "u10_diagram_3",
    unit: 10,
    type: "diagram",
    question: "妙妙分到圖中歪斜切分的蛋糕中的其中一塊。這塊蛋糕是整個蛋糕的 1/6 嗎？",
    options: ["不是，因為蛋糕沒有被平分", "是，因為被切成了 6 塊", "是，因為每個人都有一塊", "不是，因為切得太小了"],
    answer: "不是，因為蛋糕沒有被平分",
    explanation: "雖然切成了 6 塊，但每塊大小不一樣大，這不叫作平分，因此不能用 1/6 來表示。",
    svgType: "fraction-circle",
    svgParams: {
      parts: 6,
      shaded: 1,
      isFair: false // Draws unequal parts!
    }
  },
  {
    id: "u10_diagram_4",
    unit: 10,
    type: "diagram",
    question: "圖中國旗的紅色部分，哪一個是整個國旗的 1/3 面？",
    options: ["國旗甲", "國旗乙", "兩個都是", "兩個都不是"],
    answer: "國旗甲",
    explanation: "國旗甲平均分成三等分，紅色剛好佔其中一份，代表 1/3。國旗乙沒有被均等平分。",
    svgType: "flag-compare"
  },
  {
    id: "u10_diagram_5",
    unit: 10,
    type: "diagram",
    question: "莉芸用了 1/8 張壁報紙，子翔用了 1/4 張壁報紙（原本壁報紙大小相同）。看圖中塗色區域，誰用的壁報紙比較多？",
    options: ["子翔", "莉芸", "兩個人一樣多", "無法比較"],
    answer: "子翔",
    explanation: "相同的紙平分成 4 份的一份（1/4）大於平分成 8 份的一份（1/8）。圖形顯示子翔的藍色區塊比莉芸的大。",
    svgType: "paper-compare"
  },
  {
    id: "u10_word_1",
    unit: 10,
    type: "word",
    question: "媽媽烤了一個藍莓塔，志敏吃了 1/2 個，樂恩吃了 1/6 個。請問誰吃的比較多？",
    options: ["志敏", "樂恩", "兩個人一樣多", "無法比較"],
    answer: "志敏",
    explanation: "相同藍莓塔的 1/2（平分成 2 份的其中一份）大於 1/6（平分成 6 份的其中一份），因此志敏吃得比較多。",
    svgType: "none"
  },
  {
    id: "u10_word_2",
    unit: 10,
    type: "word",
    question: "有一條相同的巧克力，哥哥吃了 1/3 條，妹妹吃了 1/5 條，誰吃得比較少？",
    options: ["妹妹", "哥哥", "兩個人一樣多", "無法比較"],
    answer: "妹妹",
    explanation: "分給 5 個人吃的一份（1/5）會小於分給 3 個人吃的一份（1/3），妹妹吃得比較少。",
    svgType: "none"
  },
  {
    id: "u10_word_3",
    unit: 10,
    type: "word",
    question: "妙妙和妮妮都說她們吃了自己披薩的 1/4。妙妙的披薩和課本一樣大；妮妮的披薩和課桌一樣大。請問她們吃到的披薩一樣大嗎？為什麼？",
    options: ["不一樣大，因為她們原本的披薩大小就不同", "一樣大，因為都是吃四分之一", "妙妙吃到的比較大", "無法知道誰吃到的比較大"],
    answer: "不一樣大，因為她們原本的披薩大小就不同",
    explanation: "分數的大小需要建立在相同的基準量（整體大小）上。兩人的披薩本來就不一樣大，分出來的 1/4 也會不一樣大。妮妮吃的披薩（和課桌一樣大）會比妙妙的（和課本一樣大）大很多。",
    svgType: "none"
  },
  {
    id: "u10_word_4",
    unit: 10,
    type: "word",
    question: "老師拿出一條 1 公尺長的紙帶，平分剪成 10 段送給 10 位小朋友，每人分到幾公尺的紙帶？",
    options: ["1/10 公尺", "10 公尺", "1/2 公尺", "1/5 公尺"],
    answer: "1/10 公尺",
    explanation: "將 1 公尺長度平均分成 10 份，每份即為十分之一（1/10）公尺。",
    svgType: "none"
  },
  {
    id: "u10_word_5",
    unit: 10,
    type: "word",
    question: "爸爸買了一條長崎蛋糕，將它平分成 9 等分，小華吃了其中的 1 等分，請問小華是吃了幾分之幾條蛋糕？",
    options: ["1/9 條", "9 條", "1/3 條", "9/1 條"],
    answer: "1/9 條",
    explanation: "平分成 9 份，其中的 1 份就是九分之一（1/9）條蛋糕。",
    svgType: "none"
  }
];


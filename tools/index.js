const yaml = require('js-yaml');
const fs   = require('fs');

let data = {
  "ざっそう": { bell: 10 },
  "ナシ": { bell: 100 },
  "もくざい": { bell: 60 },
  "かたいもくざい": { bell: 60 },
  "やわらかいもくざい": { bell: 60 },
  "きのえだ": { bell: 5 },
  "いし": { bell: 75 },
  "ねんど": { bell: 100 },
  "てっこうせき": { bell: 375 },
  "スマホケースリメイクキット": { bell: 9000 },
  "ボーダーTシャツ": { bell: 240 },
  "たかとびぼう": { bell: 600, material: { "やわらかいもくざい": 5 }},
  "パチンコ": { bell: 225, material: { "かたいもくざい": 5 }},
  "はっぱ": { bell: 100, material: { "ざっそう": 5 }},
  "ダンボール": { bell: 30 },
  "ショボいスコップ": { bell: 200, material: { "かたいもくざい": 5 }},
  "ショボいつりざお": { bell: 100, material: { "きのえだ": 5 }},
  "ショボいあみ": { bell: 100, material: { "きのえだ": 5 }},
  "ショボいオノ": { bell: 200, material: { "きのえだ": 5, "いし": 1 }},
  "はしご": { bell: 1440, material: { "もくざい": 4, "かたいもくざい": 4, "やわらかいもくざい": 4 }},
  "オノ": { bell: 625, material: { "ショボいオノ": 1, "もくざい": 3, "てっこうせき": 1 }},
  "いしのオノ": { bell: 560, material: { "ショボいオノ": 1, "もくざい": 3 }},
  "つりざお": { bell: 600, material: { "ショボいつりざお": 1, "てっこうせき": 1 }},
  "あみ": { bell: 600, material: { "ショボいあみ": 1, "てっこうせき": 1 }},
  "スコップ": { bell: 600, material: { "ショボいスコップ": 1, "てっこうせき": 1 }},
  "まるたのくい": { bell: 360, material: { "もくざい": 3 }},
  "もくぎょ": { bell: 360, material: { "もくざい": 3 }},
  "あかいパンジー": { bell: 40},
  "きいろいパンジー": { bell: 40},
  "しろいパンジー": { bell: 40},
  "パンジーのリース": { bell: 720, material: { "きいろいパンジー": 3, "しろいパンジー": 3, "あかいパンジー": 3 }},
  "ショボいジョウロ": { bell: 200, material: { "やわらかいもくざい": 5 }},
  "ジョウロ": { bell: 600, material: { "ショボいジョウロ": 1, "てっこうせき": 1 }},
  "たいまつ": { bell: 650, material: { "きのえだ": 5, "もくざい": 5 }},
  "たきび": { bell: 30, material: { "きのえだ": 3 }},
  "もくせいチェア": { bell: 720, material: { "もくざい": 6 }},
  "ほしくさのベッド": { bell: 400, material: { "ざっそう": 20 }},
  "はっぱのかさ": { bell: 300, material: { "ざっそう": 15 }},
  "はるのわかたけ": { bell: 200},
  "バンブー": { bell: 80},
  "オカリナ": { bell: 1000, material: {}},
  "サカナのまきエサ": { bell: 200, material: {}},
  "ながしそうめん": { bell: 3160, material: { "はるのわかたけ": 7, "もくざい": 3 }},
  "まるたのダイニングテーブル": { bell: 1800, material: { "かたいもくざい": 15 }},
  "パインざいフローリング": { bell: 625, material: {}},
  "にくきゅうのドアプレート": { bell: 360, material: { "もくざい": 3 }},
  "ココナッツジュース": { bell: 500, material: { "ヤシのみ": 1 }},
  "ヤシのみ": { bell: 250 },
  "モンキチョウ": { bell: 160 },
  "モルフォチョウ": { bell: 4000 },
  "エビスガイ": { bell: 180 },
  "サンドダラー": { bell: 120 },
  "ヤドカリ": { bell: 1000 },
  "タカラガイ": { bell: 60 },
  "フナムシ": { bell: 200 },
  "コイ": { bell: 300 },
  "オタマジャクシ": { bell: 100 },
  "ムカデ": { bell: 300 },
  "ヒラメ": { bell: 800 },
  "そぼくなDIYさぎょうだい": { bell: 1350, material: { "かたいもくざい": 5, "てっこうせき": 1 }},
  "ジンメンカメムシ": { bell: 1000 },
  "タランチュラ": { bell: 8000 },
  "ハンミョウ": { bell: 1500 },
  "カメムシ": { bell: 120 },
  "ホネガイ": { bell: 300 },
  "ちいさなDIYさぎょうだい": { bell: -1, material: { "もくざい": 3, "かたいもくざい": 3, "やわらかいもくざい": 3, "てっこうせき": 2 }},
  "しょいこ": { bell: -1, material: { "はるのわかたけ": 6 }},
  "つまれたタイヤ": { bell: 60, material: { "タイヤ": 3 }},
  "タイヤのゆうぐ": { bell: -1, material: { "タイヤ": 1 }},
  "ナシのベッド": { bell: 1360, material: { "ナシ": 10, "やわらかいもくざい": 6 }},
  "わらぼしのさく": { bell: 56, quantity: 10, material: { "ざっそう": 10, "もくざい": 3 }},
  "わふうのさく": { bell: -1, quantity: 10, material: { "てっこうせき": 3, "ねんど": 3, "いし": 3 }},
  "よこいたのさく": { bell: 72, quantity: 10, material: { "もくざい": 6 }},
  "ペグとロープ": { bell: 300, quantity: 10, material: { "てっこうせき": 4 }},
  "てつのさく": { bell: 450, quantity: 10, material: { "てっこうせき": 6 }},
  "たていたのさく": { bell: 96, quantity: 10, material: { "もくざい": 8 }},
  "いしかべ": { bell: 60, quantity: 10, material: { "いし": 4 }},
  "オリエンタルなさく": { bell: 120, quantity: 10, material: { "もくざい": 6, "やわらかいもくざい": 4 }},
  "ゆうしてっせん": { bell: -1, quantity: 10, material: { "かたいもくざい": 4, "てっこうせき": 2 }},
  "そぼくなもくせいのさく": { bell: -1, quantity: 10, material: { "やわらかいもくざい": 6 }},
  "ラティス": { bell: -1, quantity: 10, material: { "やわらかいもくざい": 8 }},
  "ボーンなドアプレート": { bell: 360, material: {}},
  "パラサウロロフスのからだ": { bell: 3000 },
  "スズキ": { bell: 400 },
  "ガ": { bell: 130 },
  "タイヤ": { bell: -1 }
};

let result = [];

let calcMaterial = (materials) => {
  let cost = 0;
  for (let name in materials) {
    let material = data[name];
    if (material.bell === -1) {
      return undefined;
    }
    if (materials[name].material) {
      let detail = calcMaterial(materials[name].material);
      if (!detail) {
        return undefined;
      }
      cost += detail;
    } else {
      cost += material.bell * materials[name];
    }
  }
  return cost;
};

for (let key in data) {
  let cost = calcMaterial(data[key].material);
  if (cost) {
    data[key].cost = cost;
    if (data[key].quantity) {
      data[key].rate = data[key].bell * data[key].quantity / data[key].cost;
    } else {
      data[key].rate = data[key].bell / data[key].cost;
    }
  }
  result.push(Object.assign({
    name: key
  }, data[key]));
}

result.sort((b, a) => {
  if (a.rate && b.rate) {
    if (a.rate > b.rate) {
      return 1;
    } else if (a.rate === b.rate) {
      return 0;
    } else {
      return -1;
    }
  } else if (a.rate) {
    return 1;
  } else if (b.rate) {
    return -1;
  } else {
    if (a.bell > b.bell) {
      return 1;
    } else if (a.bell === b.bell) {
      return 0;
    } else {
      return -1;
    }
  }
});

try {
  fs.writeFileSync('../bell2.yml', yaml.dump(result), 'utf8');
} catch (error) {
  if (error) {
    console.error(error.message);
    process.exit(1);
  }
}
console.log('Success!');
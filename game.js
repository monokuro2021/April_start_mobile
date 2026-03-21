// BGM制御変数
let bgmAudio = null;
let isBGMPlaying = false;

// DOM要素
const bgm = document.getElementById('bgm');
const startBtn = document.getElementById('start-btn');

// BGM再生関数
function playBGM() {
  try {
    if (bgm && !isBGMPlaying) {
      bgm.volume = 0.5;
      bgm.play().then(() => {
        isBGMPlaying = true;
        console.log('BGM再生開始');
      }).catch(error => {
        console.log('BGMの再生に失敗しました:', error);
      });
    }
  } catch (error) {
    console.log('BGMの再生に失敗しました:', error);
  }
}

// BGM停止関数
function stopBGM() {
  try {
    if (bgm && isBGMPlaying) {
      bgm.pause();
      bgm.currentTime = 0;
      isBGMPlaying = false;
      console.log('BGM停止');
    }
  } catch (error) {
    console.log('BGMの停止に失敗しました:', error);
  }
}

// ゲームスタートボタンイベント
startBtn.addEventListener('click', function() {
  console.log('ゲームスタートボタンがクリックされました');
  
  // ボタンを無効化して再度クリックできないようにする
  startBtn.disabled = true;
  startBtn.style.cursor = 'not-allowed';
  
  // すぐにBGMを再生
  playBGM();
  
  // ローディング状態に変更
  startBtn.classList.add('loading');
  startBtn.querySelector('span').textContent = 'ロード中';
  
  // 15秒後にタイトル等を消してテキストを表示
  setTimeout(function() {
    // 既存の要素を非表示
    const title = document.querySelector('.game-title');
    const subtitle = document.querySelector('.subtitle');
    const button = document.querySelector('.start-btn');
    
    if (title) title.style.display = 'none';
    if (subtitle) subtitle.style.display = 'none';
    if (button) button.style.display = 'none';
    
    // テキスト表示用の要素を追加
    const textDiv = document.createElement('div');
    textDiv.className = 'page-text';
    textDiv.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: 'uzura', monospace;
      font-size: clamp(1.1rem, 3.1vw, 1.3rem);
      color: black;
      text-align: center;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      line-height: 1.8;
      max-width: 95vw;
    `;
    
    // （改行）を実際の改行に変換して表示
    const textContent = '<strong style="font-size: clamp(1.6rem, 4.5vw, 2.0rem);">ゲームクリア！</strong>（改行）<span style="font-size: clamp(1.0rem, 2.8vw, 1.2rem); white-space: nowrap;">おめでとうございます！</span>（改行）<span style="font-size: clamp(1.0rem, 2.8vw, 1.2rem); white-space: nowrap;">超短い謎解きゲームはいかがでしたか？</span>（改行）<span style="font-size: clamp(1.0rem, 2.8vw, 1.2rem); white-space: nowrap;">春という「はじまりのキセツ」にも関わらず</span>（改行）<span style="font-size: clamp(1.0rem, 2.8vw, 1.2rem); white-space: nowrap;">「はじめられないゲーム」を提供してしまい</span>（改行）<span style="font-size: clamp(1.0rem, 2.8vw, 1.2rem); white-space: nowrap;">本当に申し訳ございませんでした！</span>（改行）<span style="font-size: clamp(1.0rem, 2.8vw, 1.2rem); white-space: nowrap;">エイプリルフールに公開したゲームなので</span>（改行）<span style="font-size: clamp(1.0rem, 2.8vw, 1.2rem); white-space: nowrap;">どうか許してください（笑）</span>（改行）<span style="font-size: clamp(1.0rem, 2.8vw, 1.2rem); white-space: nowrap;">今回は「４月１日」を遊んでいただき</span>（改行）<span style="font-size: clamp(1.0rem, 2.8vw, 1.2rem); white-space: nowrap;">誠にありがとうございました！</span>（改行）<span style="font-size: clamp(1.0rem, 2.8vw, 1.2rem); white-space: nowrap;">また別のゲームでお会いしましょう！</span>（改行）<span style="font-size: clamp(1.0rem, 2.8vw, 1.2rem); white-space: nowrap;">by　モノクロ</span>（改行）<strong style="font-size: clamp(1.6rem, 4.5vw, 2.0rem);">Thank you for playing!!</strong>';
    const formattedText = textContent.replace(/（改行）/g, '<br>');
    textDiv.innerHTML = formattedText;
    
    document.body.appendChild(textDiv);
  }, 15000);
});

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
  console.log('ページが読み込まれました');
  
  // BGMの準備
  if (bgm) {
    bgm.addEventListener('ended', function() {
      isBGMPlaying = false;
      console.log('BGMの再生が終了しました');
    });
  }
});

  
  

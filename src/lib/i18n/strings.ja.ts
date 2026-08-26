import { type Dictionary, en } from './strings.en';

export const ja = {
	dock: {
		settingsAriaLabel: 'プロフィール設定',
		generic: '通常',
		copyUrl: '🔗 URLをコピー',
		win: '勝ち',
		loss: '負け',
		tie: '引き分け',
		undo: '元に戻す',
		newSession: '新しいセッション',
		overlayFormatLabel: 'オーバーレイの表示形式',
		templateHelpAriaLabel: 'テンプレートトークンのヘルプ'
	},
	landing: {
		title: 'streakingftw',
		heroImgAlt: 'StreakingFTWが動作しているOBSシーン。ドックとオーバーレイが表示されている',
		introText:
			'StreakingFTW Win Trackerは、シンプルな勝敗・引き分けのタリートラッカーです。<br>StreakingFTW、略して「Streaking」は、OBSの2箇所に組み込んで使用します:',
		introDockItem:
			'<strong>ドック</strong> — 配信者が操作するためのボタン(勝ち、負け、引き分け、元に戻す、新しいセッション)を備えたコントロールパネルです。',
		introOverlayItem:
			'<strong>オーバーレイ</strong> — 現在のタリーを視聴者に表示する透明なオーバーレイです。ドックを操作すると即座に更新されます。',
		setupHeading: 'セットアップ',
		setupStep1: '<strong>OBSのソース</strong>で、<strong>ブラウザソース</strong>を追加します。',
		addDockImgAlt: 'StreakingFTWのドック用にOBSでブラウザソースを追加する',
		urlLabel: '<strong>URL</strong>に次を設定:',
		copyLinkHint: '(リンクを右クリックして「リンクをコピー」を選択して取得してください。)',
		setupStep2: '2つ目の<strong>ブラウザソース</strong>を追加します',
		addSourceImgAlt: 'StreakingFTWのオーバーレイ用にOBSでブラウザソースを追加する',
		placeOverlayItem: '視聴者にタリーを表示したい場所にシーン内で配置してください。',
		sizingNote:
			'<strong>注意:</strong> オーバーレイのサイズ調整について: OBSのブラウザソースはデフォルトで800×600のキャンバスになっており、タリー1行分よりもかなり大きいため、その分が余白として表示されます。ソースを右クリックして<strong>プロパティ</strong>を開き、<strong>幅</strong>と<strong>高さ</strong>を内容に近いサイズ(1行なら例えば<code>600×150</code>など)に設定してください。キャンバス上のドラッグハンドルでリサイズすると、すでに描画された画像が引き伸ばされてぼやけてしまうため<strong>行わないでください</strong>。',
		trackHeading: '3. 勝敗・引き分けを記録する',
		trackP1:
			'結果を記録したいとき、直前の操作を元に戻したいとき、新しいセッションを始めたいときは<strong>ドックパネル</strong>を開いてください。オーバーレイは同じローカルストレージのセッションを参照しているため、即座に更新されます。',
		trackP2:
			'<strong>新しいセッション</strong>ボタンを使うと、ゲームセッションのタリーを新しく開始できます。プレイを始めた日時ごとに、勝敗・引き分けを明確に区切って記録できます。',
		badgesHeading: '4. ランク・ロールバッジを追加する(任意)',
		badgesP1:
			'<strong>プロフィール</strong>機能を使ってロールやゲームモードごとに統計を分けて記録している場合、各プロフィールにゲーム固有のバッジを表示することもできます。現在バンドルされているパックは<strong>Overwatch</strong>(ロールアイコンとランクティアバッジ、ブロンズからチャンピオンまで)の1つです。',
		badgesStep1: 'ドックを開き、歯車アイコンをクリックして<strong>プロフィール設定</strong>を開きます。',
		badgesStep2:
			'プロフィールの<strong>バッジ</strong>行で、ロールアイコンやランクバッジをクリックして選択します。選択済みのものを再度クリックすると解除できます。',
		badgesStep3:
			'バッジはドック内のそのプロフィールのタリーの横、およびオーバーレイ上のそのプロフィールのテキストの横に表示されます。',
		badgesFormatP:
			'ランクをテキストとしても表示したい場合は、そのプロフィールのカスタム出力形式に<code>{rank}</code>を追加してください。例: <code>{profile_name} ({rank}) {wins}W {losses}L {ties}T</code>',
		translationFeedback:
			'日本語訳の誤りを見つけましたか? <a href="https://github.com/hk0i/streakingftw/issues">GitHubで報告する</a>。'
	},
	profileSettings: {
		heading: 'プロフィール設定',
		closeAriaLabel: '閉じる',
		generic: '通常',
		deletePrefix: '削除',
		deleteButton: '削除',
		customFormat: 'カスタム形式',
		badge: 'バッジ',
		includeInLink: 'リンクに含める',
		copyUrlSelected: '選択項目のURLをコピー',
		addProfileHeading: '新しいプロフィールを追加',
		hint: '各プロフィールは、通常セッションとは別に、独自の勝敗・引き分けタリーとオーバーレイリンクを保持します。ゲームごと、ロール(タンク、DPS、サポート)ごとなど、配信に合わせて自由に使い分けてください。',
		newProfilePlaceholder: '新しいプロフィール名',
		addButton: '追加'
	},
	helpOverlay: {
		heading: 'テンプレートトークン',
		closeAriaLabel: '閉じる',
		tokenColumn: 'トークン',
		meaningColumn: '意味',
		hint: '認識されないトークンはそのまま表示されるため、入力ミスをしても問題ありません。',
		tokenMeanings: {
			wins: '勝ち数',
			losses: '負け数',
			ties: '引き分け数',
			total: '合計試合数(勝ち + 負け + 引き分け)',
			profile_name: 'プロフィール名(そのプロフィール自身のテンプレート内でのみ意味を持つ)',
			rank: 'プロフィールで選択したランクバッジのラベル(例: 「Gold」)。未選択の場合は空'
		}
	},
	copyUrlButton: {
		defaultLabel: 'オーバーレイURLをコピー',
		copied: 'コピーしました!',
		clipboardUnavailable: 'クリップボードが使用できません — 手動でコピーしてください:'
	}
} as const satisfies Dictionary<typeof en>;

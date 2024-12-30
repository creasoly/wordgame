// DOM 元素
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const subtitleElement = document.getElementById("subtitle");
const actionButtons = Array.from(document.querySelectorAll(".choice-btn"));
const speakerElement = document.getElementById("speaker"); // 初始化說話者元素

let currentDialogueIndex = 0;
let currentTextIndex = 0;

const dialogues = [
    // 第一段對話
    {
        speaker: "",
        text: "那是一個平凡的下午，教室內吵雜異常，金髮的帥哥班長[陳玄]正嘗試讓同學安靜下來，只有你百無聊賴地翻著手裡的小說",
        next: 1
    },
    {
        speaker: "",
        text: "隨著身旁窗簾微掀，一個黑髮女學生出現在你的身旁，你認出她是跟你一樣剛轉學的轉學生，名叫[系宓]",
        options: [
            { text: "有什麼事嗎?", next: 2 },
            { text: "你擋到我的光了(怒)", next: 8 }
        ]
    },
    {
        speaker: "你",
        text: "有什麼事嗎?",
        next: 3
    },
    {
        speaker: "系宓",
        text: "那本書，是講什麼的呢?",
        next: 4
    },

    {
        speaker: "你",
        text: "就是一般的穿越異世界小說吧，主角被召喚到了異世界，靠著自己的超強能力拯救大家之類的",
        next: 5
    },
    {
        speaker: "",
        text: "系宓笑了起來，雖然你不知是哪裡取悅了她，但她的笑容十分可愛",
        next: 6
    },
    {
        speaker: "系宓",
        text: "那麼，你有沒有想過，有一天會穿越到異世界呢?",
        next: 7
    },
    {
        speaker: "",
        text: "你覺得這個問題有些古怪，但仍想要禮貌地回應",
        next: 13
    },

    // 點擊選項後的分支
    
    {
        speaker: "你",
        text: "你擋到我的光了",
        next: 9
    },
    
    // 分支結束
    {
        speaker: "",
        text: "你攻擊性的舉動引起了對方的不滿，這似乎證實了你為何轉學到了這裡卻沒交到任何朋友，只能在位置上看小說。",
        next: 10
    },
    {
        speaker: "",
        text: "系宓安靜了下來，默默地讓開了位置，而你重新回到了小說的世界。",
        next: 11
    },
    {
        speaker: "",
        text: "正當你沉浸在其中時，沒注意到有一個人影正偷偷靠近你。",
        next: 12
    },
    {
        speaker: "",
        text: "[啪!]，你感到臉頰一陣劇痛，轉過頭發現是系宓趁你沒注意閃了你一巴掌。",
        next: 13
    },
    // 主要劇情
    {
        speaker: "你",
        text: "你....",
        next: 14
    },
    {
        speaker: "",
        text: "整個教室突然晃動了起來，巨大的魔法陣出現在了教室的地板，涵蓋了所有人。",
        next: 15
    },
    {
        speaker: "",
        text: "在刺眼的藍光下，你只能看到眼前的女孩俏皮一笑，隨後視線變成一片白色，你失去了意識....",
        next: 16
    },
    {
        speaker: "",
        text: "看來你穿越到異世界了...",
        next: 17//next: null // 劇情結束
    },
    {
        speaker: "",
        text: "來到這裡的一個月裡，國王熱情的招待你們，你發現這裡的人們能使用魔法，但與小說裡的不同，你並沒有什麼特別的技能，",
        next: 18
    },
    {
        speaker: "",
        text: "各項的屬性平庸，唯有對風魔法的適性較良，於是你待在皇宮與同學們跟侍衛學習魔法，除了那聽聞窮凶極惡的魔族仍未出現，一切都宛如日常",
        next: 19
    },
    {
        speaker: "",
        text: "關於那日系宓的奇怪舉動，也不曾再出現了，不過聽說她學會的屬性是空間?",
        next: 20
    },
    {
        speaker: "",
        text: "[砰!]，一聲巨大的聲響響徹皇宮，還伴隨著各種魔物的狂吼。前線侍衛來報，王國的邊境遭到襲擊，國王希望你們能出去迎敵。",
        options: [
            { text: "出去幫忙", next:  41},
            { text: "選擇留在皇宮", next: 21 }
        ]
    },
    {
        speaker: "",
        text: "你並不認為自己已經準備好過去幫忙，於是選擇留在皇宮，此時班長穿著一身的華麗金鎧帶著大部分的同學出征了，他作為珍稀身體強化魔法的使用者，還有三種魔法的適性，是被作為王牌培養的，雖然不知道魔族的戰力，不過想必打贏是沒問題的吧",
        next: 22
    },
    {
        speaker: "",
        text: "你無視了某些侍衛那異樣的視線，返回了自己的房間，準備再繼續練習魔法，此時眼角卻飄到窗戶外奇怪的黑影，那些黑影有著狼的體型，渾身卻鋪滿像焦油的液體，臉上有一隻碩大的豎瞳",
        next: 23
    },
    {
        speaker: "",
        text: "你臉色變得蒼白，沒想到魔物竟然暗度陳倉偷襲了皇宮，可是他們是怎麼進來的，難不成是庭院內那口水井嗎?不管如何，你立刻跑出房間求援",
        next: 24
    },
    {
        speaker: "",
        text: "[各位!有魔物跑到皇宮裡來了!!]，皇宮裡聽到的人紛紛露出恐懼的神色，就連當初對你冷眼的幾個侍衛臉色都很難看，在他們慌忙的調兵中，你被委託了查看皇宮西側的任務的任務",
        next: 25
    },
    {
        speaker: "",
        text: "當你步入了廚房側門時，發現了奇怪的嘎茲聲，一頭兩米高的怪物正啃食著女僕的屍體，你嚇的冷汗直流，正在這時，一聲尖叫劃破寂靜，一位年輕的女僕正好步入廚房，她被嚇的六神無主，只能拼命尖叫",
        next: 26
    },
    {
        speaker: "",
        text: "你該怎麼做?你原本的任務只有遇到怪物而通報而已",
        options: [
            { text: "默不作聲", next: 30 },
            { text: "直面強敵", next: 27 },
            { text: "呆愣", next: 33 },
            { text: "逃跑", next: 36 }
        ]
    },
    {
        speaker: "",
        text: "你奮勇地走出去，使用你拿手的風刃打在了怪獸的右腿，但卻被他那層濃厚的焦油擋住，怪獸回過頭發出如同金屬擦撞的吼叫，當你被震在原地時，他朝你撲了過來",
        next: 28
    },
    {
        speaker: "",
        text: "面對超過兩米的怪物，你毫無懸念的被壓倒在地，尖銳的爪子刺穿你的身體，你最後的視線是看到自己染血的身軀",
        next: 29
    },
    {
        speaker: "",
        text: "你死亡了，但至少你努力拯救了一個人?",
        next: null // 劇情結束
    },
    {
        speaker: "",
        text: "怪獸輕易地就把腿軟的女僕抓住，當他狼吞虎嚥時，你餘光看到侍衛那黃色的制服，他也發現了你，掏出了長劍，",
        next: 31
    },
    {
        speaker: "",
        text: "你碰掉了一塊牆角，怪獸快速地回了頭，你瞄準他的眼睛發出了風刃，怪獸痛地大吼，你飛速地向後退，怪獸正要朝你奔來之時，侍衛一劍插在他背後，插進的劍快速變紅，釋放熊熊的烈焰，怪獸的叫聲變得淒厲，他奮力一甩，握著劍柄的侍衛被甩到牆上，吐出了一口鮮血",
        next: 32
    },
    {
        speaker: "",
        text: "怪獸的吼叫聲逐漸變小，最終倒在了地上，看來是死去了，你將侍衛簡單的包紮，並將他交給了趕來的侍衛",
        next: 39
    },
    {
        speaker: "",
        text: "你被嚇得呆愣在原地，當怪獸步步逼近女僕時，你發現怪獸的身邊有著火爐，急中生智的你朝火爐角發射風刃，火爐倒下來噴在了怪物身上，他著急的瘋狂拍打，看來他身上那層焦油怕火，",
        next: 34
    },
    {
        speaker: "",
        text: "趁著他慌張之際，你拿起一旁燒紅的鐵叉，射中了他的豎眼，怪獸的尖叫聲十分淒厲，受傷的他爪子瘋狂亂抓，但你深知機不可失，衝上前把鐵叉壓進他的眼睛，怪獸的爪子劃傷了你的胳膊，鮮血淋漓",
        next: 35
    },
    {
        speaker: "",
        text: "怪獸的吼叫聲逐漸變小，最終倒在了地上，看來是死去了，獲救的女僕簡單的包紮，她的臉龐有些泛紅，羞澀地看向你",
        next: 39
    },
    {
        speaker: "",
        text: "你決定你的職責不在對戰怪獸，於是轉身向後跑去，然而當你跑的瞬間，怪獸的豎瞳卻瞬間鎖定了你",
        next: 37
    },
    {
        speaker: "",
        text: "不知是他們其實有優異的聽覺，或是你運氣不濟，你最後的視線是朝你急速接近的爪子",
        next: 38
    },
    {
        speaker: "",
        text: "你陣亡了，也許再來一次會選擇不同的選項?",
        next: null // 劇情結束
    },
    {
        speaker: "",
        text: "戰鬥結束了，你筋疲力盡的回到皇宮正殿，印入眼簾的卻是渾身染血的班長和折損近半的同學，據他們所說遇到了一支龐大的巨龍，眼前的殘酷景象衝擊你的精神",
        next: 40
    },
    {
        speaker: "",
        text: "當你幫忙攙扶完同學後，在回房間的路上看到了在井邊來回奔波打水的人們，令你震驚的是水井的大小比房間眺望時想像來的小很多，根本不可能容納那些怪物，那他們又是哪裡來的，疑惑跟恐懼充滿你的心中。",
        next: null // 劇情結束
    },
    {
        speaker: "",
        text: "為了報答那些幫助你的人民，你義無反顧地加入了討伐隊伍，班長對你瀟灑地笑了笑表示友好，皇宮的外面火光沖天，各色的魔物橫衝直撞，班長使用他拿手的身體強化魔法將魔物擋下，同學們在他的指揮下有條不紊的攻擊，這些自願出來的學生魔法都有一定水準，狀況看似還不算太糟",
        next: 42
    },
    {
        speaker: "",
        text: "然而這一切在巨龍闖入之後消失的無影無蹤，他龐大的龍翼將班長擊飛，隨即對剩下的我們噴出熊熊烈焰，火焰撲天蓋地而來，我們無處可逃，剩下的防護罩也岌岌可危",
        options: [
            { text: "逃往東邊", next: 43 },
            { text: "逃往西邊", next: 45 },
        ]
    },
    {
        speaker: "",
        text: "你奮力地朝西邊跑去，身後傳來防護罩破裂和人們的驚呼聲，你被烈焰噴飛到了地上，身負重傷，餘角瞥見一股熟悉黃色的人影",
        next: 44
    },
    {
        speaker: "",
        text: "你被一劍封喉，臨死時你不知道殺你的人是誰，只覺得他的背影有點熟悉。",
        next: null
    },
    {
        speaker: "",
        text: "你奮力地朝東邊跑去，你發現了一個搖搖欲墜的鐘樓，只要攻擊讓他倒下，至少你躲在後面有一線生機，你打算攻擊哪裡?",
        options: [
            { text: "有些裂痕的底部", next: 46 },
            { text: "木質結構的樓頂", next: 48 },
        ]
    },
    {
        speaker: "",
        text: "鐘樓倒下來了，然而你高估了鐘樓材料的堅固，倒下來的碎塊不足以擋住全部的烈焰",
        next: 47
    },
    {
        speaker: "",
        text: "你被燒死了，也許再來一次會選擇不同的選項?",
        next: null // 劇情結束
    },
    {
        speaker: "",
        text: "巨大的時鐘倒在了你面前，你只能躲在他後面抵禦著烈焰，強大的衝勁將你擊暈了過去，當你悠悠轉醒後，看到了班長",
        next: 49
    },
    {
        speaker: "",
        text: "但他的狀況卻有些奇怪，他優閒地走在燒焦的場地上，正在一劍劍捅向那些躺在地上的同學，而在他身邊跟著一個漂浮的眼球魔物，連剛才攻擊的火龍都不再出現了",
        next: 50
    },
    {
        speaker: "",
        text: "怎麼回事?班長被魔物催眠了嗎?你只能眼睜睜的看著魔物消失，臉上染血的班長召集了倖存者，回到了皇宮，怎麼辦，現在的皇宮元氣大傷，就算加入一起討伐班長可能也無法打贏，更何況考慮到班長的人氣，肯定會發生內鬨，你注意到回皇宮的人裡沒有系宓",
        next: 51
    },
    {
        speaker: "",
        text: "你可以選擇假裝沒看到回到皇宮，或是混入民間暗暗增加實力，但現階段都沒差，因為作者還沒做完",
        options: [
            { text: "回到皇宮", next: null },
            { text: "混入民間", next: null },
        ]
    },

];








let typingTimeoutId = null; // 用來存儲打字過程中的計時器ID

// 顯示打字效果
function typeText(text, callback, skip = false) {
    if (!text || typeof text !== "string") {
        console.error("Invalid text provided to typeText:", text);
        return;
    }

    subtitleElement.textContent = ""; // 清空字幕
    let charIndex = 0;

    if (skip) {
        // 直接顯示完整字幕，並執行回調
        subtitleElement.textContent = text;
        if (callback) callback();
        return;
    }

    // 如果不是跳過，則正常打字效果
    function typeChar() {
        if (charIndex < text.length) {
            subtitleElement.textContent += text[charIndex];
            charIndex++;
            typingTimeoutId = setTimeout(typeChar, 50); // 記錄計時器ID
        } else if (callback) {
            callback(); // 打字結束後執行回調
        }
    }
    typeChar();
}

// 顯示對話
function showDialogue(index) {
    const dialogue = dialogues[index];
    if (!dialogue) return console.error("無效的對話索引：", index);

    currentDialogueIndex = index;

    // 更新說話者
    if (dialogue.speaker) {
        speakerElement.textContent = dialogue.speaker;
        speakerElement.style.display = "block"; // 顯示說話者
    } else {
        speakerElement.style.display = "none"; // 隱藏說話者
    }

    // 顯示跳過按鈕
    showSkipButton();

    // 顯示打字效果
    typeText(dialogue.text || "", () => {
        // 移除跳過按鈕
        hideSkipButton();

        // 顯示選項按鈕
        showOptions(dialogue);
    });
}

// 跳過打字效果，直接顯示完整字幕
function skipTyping() {
    // 清除正在進行的打字效果計時器
    if (typingTimeoutId !== null) {
        clearTimeout(typingTimeoutId);
    }

    // 直接顯示完整的對話內容
    const dialogue = dialogues[currentDialogueIndex];
    subtitleElement.textContent = dialogue.text || ""; // 顯示完整字幕

    // 隱藏跳過按鈕並顯示選項
    hideSkipButton();
    showOptions(dialogue);
}

// 顯示跳過按鈕
function showSkipButton() {
    const skipButton = actionButtons[0]; // 使用第一個按鈕作為跳過按鈕
    skipButton.textContent = "跳過";
    skipButton.onclick = () => skipTyping(); // 按下跳過按鈕後觸發跳過函數
    skipButton.classList.add("show");
}

// 隱藏跳過按鈕
function hideSkipButton() {
    const skipButton = actionButtons[0];
    skipButton.classList.remove("show");
}

// 顯示選項按鈕
function showOptions(dialogue) {
    actionButtons.forEach((btn) => btn.classList.remove("show")); // 隱藏所有按鈕

    if (dialogue.options && dialogue.options.length > 0) {
        dialogue.options.forEach((option, i) => {
            const button = actionButtons[i];
            if (button) {
                button.textContent = option.text;
                button.onclick = () => showDialogue(option.next);
                button.classList.add("show");
            }
        });
    } else if (dialogue.next !== null && dialogue.next !== undefined) {
        // 如果沒有選項，但有下一句，顯示「下一步」按鈕
        showActionButton("下一步", () => showDialogue(dialogue.next));
    }
}





// 打字呈現多句對話
function displayTextWithTyping(dialogue) {
    if (currentTextIndex < dialogue.text.length) {
        const sentence = dialogue.text[currentTextIndex];

        // 如果說話者不同，更新顯示
        if (dialogue.speaker && dialogue.speaker !== currentSpeaker) {
            currentSpeaker = dialogue.speaker;
            subtitleElement.textContent = `${currentSpeaker}: `;
        }

        typeText(sentence, () => {
            currentTextIndex++;
            if (currentTextIndex < dialogue.text.length) {
                showActionButton("繼續", () => displayTextWithTyping(dialogue));
            } else {
                handleNext(dialogue);
            }
        });
    } else {
        handleNext(dialogue);
    }
}




function handleNext(dialogue) {
    // 隱藏所有按鈕
    actionButtons.forEach((btn) => {
        console.log("隱藏按鈕:", btn);
        btn.classList.remove("show"); // 移除顯示類別
    });

    // 顯示選項按鈕
    if (dialogue.options && dialogue.options.length > 0) {
        dialogue.options.forEach((option, index) => {
            const button = actionButtons[index];
            if (button) {
                console.log("顯示選項按鈕:", button);
                button.textContent = option.text;
                button.onclick = () => {
                    actionButtons.forEach((btn) => btn.classList.remove("show")); // 隱藏所有按鈕
                    showDialogue(option.next);
                    };
                button.classList.add("show"); // 顯示按鈕
            }
        });
    } else if (dialogue.next !== null && dialogue.next !== undefined) {
        showActionButton("下一步", () => showDialogue(dialogue.next)); // 顯示下一步按鈕
    }
}




function showActionButton(text, onClick) {
    const button = actionButtons[0]; // 使用第一個按鈕
    console.log("顯示單一按鈕:", button);
    button.textContent = text;
    button.onclick = onClick;
    button.classList.add("show");
}


// 初始化遊戲
document.getElementById("start-game-btn").onclick = () => {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "flex"; /*"block";*/
    showDialogue(0); // 開始對話
};

function rollDice() {
    // サイコロ3つを振る
    const diceResults = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
    ];

    // サイコロの結果を表示する要素を取得
    const diceContainer = document.getElementById('dice-container');

    // 前回の結果をクリア
    diceContainer.innerHTML = '';

    // サイコロの目を表示
    diceResults.forEach(result => {
        const diceImage = document.createElement('img');
        diceImage.src = `images/dice${result}.png`;
        diceImage.alt = `Dice ${result}`;
        
        // サイズを設定（幅と高さを100pxにする）
        diceImage.style.width = '100px';
        diceImage.style.height = '100px';
        
        diceContainer.appendChild(diceImage);
    });

    // 役の判定
    const resultElement = document.getElementById('result');

    if (diceResults[0] === 1 && diceResults[1] === 1 && diceResults[2] === 1)  {
        resultElement.textContent = 'ピンゾロ！';
    } else if (diceResults.every(result => result === diceResults[0])) {
        resultElement.textContent = 'ゾロ目';
    } else if (diceResults.join('') === '123' || diceResults.join('') === '132' || diceResults.join('') === '213'|| diceResults.join('') === '231'
    || diceResults.join('') === '312'|| diceResults.join('') === '321'){ 
        resultElement.textContent = 'ヒフミ';
    } else if (diceResults.join('') === '456' || diceResults.join('') === '564' || diceResults.join('') === '645'|| diceResults.join('') === '654'
            || diceResults.join('') === '546'|| diceResults.join('') === '465'){ 
        resultElement.textContent = 'シゴロ';}
    else {

    const uniqueResults = [...new Set(diceResults)];
    if (uniqueResults.length === 2) {
        // 2つのサイコロが同じ目で1つが異なる目の場合の役の判定
        let singleDie;
        for (let i = 0; i < 3; i++) {
            if (diceResults.filter(result => result === diceResults[i]).length === 2) {
                singleDie = diceResults.find(result => result !== diceResults[i]);
                break;
            }
        }
        resultElement.textContent = `${singleDie}の目`;
    } else {
        resultElement.textContent = '役なし';
    }
}
}

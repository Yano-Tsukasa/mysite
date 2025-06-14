from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/roll-dice")
def roll_dice():
    # サイコロの結果を生成
    dice_results = [random.randint(1, 6) for _ in range(3)]

    # 役を判定
    result = determine_result(dice_results)

    # 結果を返す
    return {"diceResults": dice_results, "result": result}


def determine_result(dice_results):
    # ピンゾロ
    if dice_results[0] == dice_results[1] == dice_results[2] == 1:
        return "ピンゾロ"

    # ゾロ目
    if all(dice_result == dice_results[0] for dice_result in dice_results):
        return "ゾロ目"

    # ヒフミ
    if sorted(dice_results) == [1, 2, 3]:
        return "ヒフミ"

    # シゴロ
    if sorted(dice_results) == [4, 5, 6]:
        return "シゴロ"

    # その他
    unique_dice_results = set(dice_results)
    if len(unique_dice_results) == 2:
        # 2つのサイコロが同じ目で1つが異なる目の場合
        single_die = list(unique_dice_results)[0]
        return f"{single_die}の目"
    else:
        return "役なし"


if __name__ == "__main__":
    app.run(debug=True)

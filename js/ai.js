function moveName(move) {
    return {
        0: 'up',
        1: 'right',
        2: 'down',
        3: 'left'
    }[move];
}
var global_max_score;
var global_max_score_moves;

function getBestMove(grid, runs, debug) {
    var bestScore = 0;
    var bestMove = -1;

    for (var i = 0; i < 4; i++) {
        //分数移动方向
        var res = multiRandomRun(grid, i, runs);//res包含分数和移动次数
        var score = res.score;

        if (score >= bestScore) {
            bestScore = score;
            bestMove = i;
            bestAvgMoves = res.avg_moves;
        }

        if (debug) {
            console.log('Move ' + moveName(i) + ": Extra score - " + score);
        }
    }
    if (!grid.movesAvailable()) console.log('bug2');
    // assert move found
    if (bestMove == -1) {
        console.log('ERROR...');
        errorGrid = grid.clone();
    }

    console.log('Move ' + moveName(bestMove) + ": Extra score - " + bestScore + " Avg number of moves " + bestAvgMoves);

    return {move: bestMove, score: bestScore};
}


function multiRandomRun(grid, move, runs) {
    var total = 0.0;
    var min = 1000000;
    var max = 0;
    var total_moves = 0;

    for (var i = 0; i < runs; i++) {
        var res = randomRun(grid, move);
        var s = res.score;
        if (s == -1) return -1;

        total += s;
        total_moves += res.moves;
        if (s < min) min = s;
        if (s > max) max = s;
    }

    var avg = total / runs;
    var avg_moves = total_moves / runs;
    return {score: avg, avg_moves: avg_moves};
}
//随即移动直到不能移动  返回不能移动后得分和移动次数
function randomRun(grid, move) {
    var g = grid.clone();
    var score = 0;
    var res = moveAndAddRandomTiles(g, move);
    if (!res.moved) {//若是不能移动，结束
        return -1;
    }
    score += res.score;

    // 开始移动直到不能移动
    var moves = 1;
    while (true) {
        if (!g.movesAvailable()) break;

        var res = g.move(Math.floor(Math.random() * 4));
        if (!res.moved) continue;

        score += res.score;
        g.addRandomTile();
        moves++;
    }
    return {score: score, moves: moves};
}
//生成随机的格子2或者4
function moveAndAddRandomTiles(grid, direction) {
    var res = grid.move(direction);
    if (res.moved) grid.addRandomTile();
    return res;
}

//形成一个搜索路径并且返回一个最好的路径
function AI_getBest(grid, debug) {
    var runs = document.getElementById('run-count').value;
    return getBestMove(grid, runs, debug);
}


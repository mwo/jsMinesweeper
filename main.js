Array.prototype.contains = function (...r) {
    let f = JSON.stringify,
        input = Object.values(this),
        str = f(input);
    r.length == 1 ? arStr = f(r[0]) : arStr = f(r);
    return str.includes(arStr);
}

var gameB = document.getElementById('game'),
    gameRes = document.getElementById('result'),
    canPlay = true,
    left = () => {
        let i = 0;
        [...gameB.children].forEach(e => {
            if (e.className.includes('Hidden') || e.className.includes('Highlighted')) i++
        })
        return i;
    },

    gT = t => {
        gameRes.innerText = t + ' '
        let ell = document.createElement('i');
        ell.className = "fas fa-redo";
        ell.onclick = () => document.location.reload();
        gameRes.appendChild(ell);
        return gameRes;
    },

    createBoard = (length, xlen) => Array.from({ length }, _ => Array(xlen).fill()), //looks nicer :3

    sqr = pos => [
        [pos[0], pos[1] - 1],
        [pos[0], pos[1] + 1],
        [pos[0] - 1, pos[1]],
        [pos[0] + 1, pos[1]],
        [pos[0] - 1, pos[1] - 1],
        [pos[0] + 1, pos[1] - 1],
        [pos[0] - 1, pos[1] + 1],
        [pos[0] + 1, pos[1] + 1]
    ],

    around = (pos, b) => {
        let ammount = 0;
        sqr(pos).forEach(e => ammount += b.contains(e))
        return ammount;
    },
    fair = () => {
        [...gameB.children].forEach(e => {
            if (e.className.includes('Empty')) {
                sqr(e.id.split('-').map(n => +n)).forEach(a => {
                    let zz = document.getElementById(a.join('-'))
                    if (zz && !zz.className.includes('c1') && zz.className.includes('Hidden')) {
                        zz.click();
                        zz.className += ' c1'
                    };
                })
            }
        })
    },

    numberColors = ['#FFFFFF', '#3872D1', '#41903E', '#CB2733', '#7903A1', '#FF8F02', '#02d5ff', '#ff02e6'],

    endGame = b => {
        gT(b ? 'Victory' : 'Game Over');
        canPlay = !!bombs.forEach(e => document.getElementById(e.join('-')).className = 'revealed')
    },

    initBoard = (b, Bombs) => {
        b.forEach((e, y) => {
            e.forEach((_, x) => {
                let ele = document.createElement('span');
                with(ele) {
                    id = x + '-' + y;
                    addEventListener('contextmenu', function (ev) {
                        ev.preventDefault();
                        with(this) {
                            if (className.includes('Number')) return;
                            className = className.includes('Highlighted') ?
                                className.replace('Highlighted', 'Hidden') :
                                className.replace('Hidden', 'Highlighted')
                        }
                    }, false);
                    onclick = function () {
                        if (canPlay && !this.className.includes('Highlighted')) {
                            let pos = (this.id).split('-').map(e => +e),
                                isBad = bombs.contains(pos);
                            if (!isBad) {
                                let ammount = around(pos, bombs);
                                if (!ammount)
                                    this.className = this.className.replace('Hidden', 'Empty')
                                else {
                                    this.innerText = `${ammount}`
                                    this.className = this.className.replace('Hidden', 'Number')
                                    this.style.setProperty('color', numberColors[ammount])
                                }

                                fair()
                                if (left() == bombs.length) endGame(true);
                            } else endGame(false);
                        }
                    }
                    className = 'Hidden';
                }
                gameB.appendChild(ele);
            })
            let n = document.createElement('span')
            n.innerText = '\n';
            gameB.appendChild(n)
        });
    },
    genBombs = (n, b) => {
        let arr = [];
        for (let i = 0; i < n; i++) {
            let p = Object.values(b).map(e => Math.random() * e | 0);
            !arr.contains(p) ? arr.push(p) : i--;
        }
        return arr;
    },
    boardg = {
        x: 10,
        y: 10
    },
    bombs = genBombs((boardg.x + boardg.y) / 1.3 | 0, boardg),
    board = createBoard(boardg.x, boardg.y);
initBoard(board, bombs)

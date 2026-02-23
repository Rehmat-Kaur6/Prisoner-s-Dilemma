export const payoffs = (move1, move2) => {
    let p1 = 0;
    let p2 = 0;
    if (move1 == move2 && move1 =='C'){
        p1 = 3;
        p2 = 3;
    }
    else if (move1 == move2 && move1 =='D'){
        p1 = 1;
        p2 = 1;
    }
    else if (move1 == 'D' && move2=='C'){
        p1 = 5;
        p2 = 0;
    }
    else {
        p1 = 0;
        p2 = 5;
    }
    return [p1, p2];
}


export const TfT = (oppHistory) => {
  if (oppHistory.length === 0) {
    return 'C';
  }
  const lastMove = oppHistory[oppHistory.length - 1];
  return lastMove; 
}

export const AlwaysDefect = () => {
    return 'D';
}

export const AlwaysCoop = () => {
    return 'C' ;
}
export const grimTrigger = (oppHistory) => {
    for (let i=0; i<oppHistory.length; i++ ){
        if (oppHistory[i]=='D'){
            const lastMove = 'D';
            return lastMove;
        }
    }
    const lastMove = 'C';
    return lastMove;
}

export const Pavlov = (oppHistory, ownHistory) => {
    if (oppHistory.length === 0){
        return 'C';
    }
    const oppMove = oppHistory[oppHistory.length -1];
    const ownMove = ownHistory[ownHistory.length -1];
    if (oppMove == 'D' && ownMove == 'C') {
        return oppMove;
    }
    else if (oppMove == 'C' && ownMove == 'D') {
        return ownMove;
    }
    else {
        return ownMove ;
    }
     
    
}
export const SusTfT = (oppHistory) => {
  if (oppHistory.length === 0) {
    return 'D';
  }
  const lastMove = oppHistory[oppHistory.length - 1];
  return lastMove; 
}

export const Random = () => {
  if (Math.random() < 0.5) {
    return 'D';
  }
  else {
      return 'C';
  }
}

export const genTfT = (oppHistory) => {
  if (oppHistory.length === 0) {
    return 'C';
  }
  const lastMove = oppHistory[oppHistory.length - 1];
  if (Math.random()<0.35 && lastMove == 'D'){
      return 'C';
  }
  else {
      return lastMove;
  }
}

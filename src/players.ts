const colorMap = {
  'TfT': 'yellow',
  'AlwaysDefect': 'red',
  'AlwaysCoop': 'green',
  'grimTrigger': 'purple',
  'Pavlov': 'blue',
  'SusTfT': 'orange',
  'genTfT': 'pink',
  'Random': 'black'
}

export const createPlayer = (strat, name, ID) => {
    return {
        strategy: strat,
        color: colorMap[strat],
        name: name,
        id: ID,
        history: {},
        score: 0,
        x: Math.random() * 90,
        y: Math.random() * 90
    }
}

export const createPlayers = (counts) => {
    const strats = Object.keys(counts);
    let allplayers = [];
    const names = [
        "Alice", "Bob", "Carol", "David", "Eve", "Frank", "Grace", "Hank",
        "Iris", "Jack", "Sara", "Leo", "Percy", "Jason", "Hazel", "Piper",
        "Annabeth", "Rosa", "Sam", "Tara", "Adam", "Vince", "Smith", "Jean",
        "Lily", "Zoe", "Aaron", "Beth", "Caleb", "Diana", "Eli", "Fiona",
        "Paul", "Hannah", "Ivan", "Jade", "Kyle", "Luna", "Marco", "Nina",
        "Oscar", "Margot", "Quill", "Jake", "Seth", "Tina", "Chandler", "Vera",
        "Wilde", "Barbara", "Amy", "Zara", "Terry", "Bree", "Rachel", "Monica",
        "Evan", "Janet", "Glen", "Hope", "Ike", "Popeye", "Knox", "Lara",
        "Maria", "Daria", "Otto", "Mia", "Rex", "Helen", "Troy", "Amy",
        "Valerie", "Wolf", "Ringo", "Lennon", "Charles", "Ada", "Abbie", "Marisa",
        "Sydney", "Eugene", "Flynn", "Gwen", "Hugo", "Isla", "Denise", "Kit",
        "Chris", "Michael", "Nash", "Delilah", "Penn", "Layla", "Daphne", "Martin",
        "Philip", "Ron", "Willa", "Hermione", "Harry", "Ryan", "Ash", "Blair"
    ];
    let playercount = 0;
    for (let i = 0; i < strats.length; i++) {
        const strat = strats[i];
        const stratcount = counts[strat];
        for (let j = 0; j < stratcount; j++) {
            allplayers.push(createPlayer(strat, names[playercount], playercount));
            playercount++;
        }
    }
    return allplayers;
}
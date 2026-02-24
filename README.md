# Prisoner’s Dilemma Simulation

A simulation in React JS of the Iterated Prisoner’s Dilemma, exploring how different strategies perform over time in competitive environments.

Inspired by Nicky Case's Evolution of Trust and a game theory course I took for fun.

## Project Background

The Prisoner’s Dilemma is one of the most famous problems in game theory.

It models the tension between:

- Cooperation
- Self-interest

This simulation explores:

- Which strategies thrive long-term?
- Does cooperation win?
- Is aggression more profitable?
- How does forgiveness affect outcomes?

## How The Simulation Works

The user selects:

- Number of players (minimum 2, maximum 100)
- Number of rounds

Each player is assigned one of 8 strategies.

Players compete round-robin style across repeated rounds.

Scores are calculated using a standard payoff structure.

At the end, the scoreboard displays:

- Top performing players
- Highest scoring strategies
- Overall rankings

## Implemented Strategies

### 1. Tit For Tat (TFT)

- Starts by cooperating
- Then copies opponent’s previous move

### 2. Generous Tit For Tat

- Like TFT
- Occasionally forgives defections
- Prevents endless retaliation cycles

### 3. Suspicious Tit For Tat

- Starts by defecting
- Then mirrors opponent
- Defensive variation of TFT

### 4. Always Defect

- Defects every round
- Maximizes short-term exploitation

### 5. Always Cooperate

- Cooperates every round
- Highly exploitable but strong in cooperative environments

### 6. Random

- Chooses cooperate or defect randomly
- Unpredictable, inconsistent

### 7. Pavlov (Win-Stay, Lose-Shift)

- Repeats successful move
- Switches after poor outcome
- Adaptive and reactive

### 8. Grim Trigger

- Starts cooperative
- Defects forever after a single betrayal
- Extremely unforgiving

## What This Simulation Demonstrates

- Iterated strategic interaction
- Long-term vs short-term payoff optimization
- How small behavioral rules can lead to dramatically different long-term outcomes.

## Run Locally

```bash
git clone https://github.com/Rehmat-Kaur6/Prisoner-s-Dilemma
cd Prisoner-s-Dilemma
npm install
npm start

import React, { useState } from 'react';
import { TfT, AlwaysDefect, AlwaysCoop, SusTfT, genTfT, Random, grimTrigger, Pavlov } from './strategies';
import { createPlayers } from './players';
import { payoffs } from './payoffcalc';
import { Setup1Box } from './setupinput';
import { Arena } from './arena';
import { Scoreboard } from './scoreboard';

const strategies = ['TfT', 'AlwaysDefect', 'AlwaysCoop', 'SusTfT', 'genTfT',
    'Random', 'grimTrigger', 'Pavlov'];

const strategyMap = {
    TfT, AlwaysDefect, AlwaysCoop, SusTfT, genTfT, Random, grimTrigger, Pavlov
}

const SetupAllBoxes = ({ counts, total, onUpdate, onStart, numRounds, setNumRounds }) => {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#fdf6ec',
            backgroundImage: 'radial-gradient(#e8c9a0 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '48px 24px',
            fontFamily: 'Georgia, serif',
        }}>
            <h1 style={{ fontSize: '38px', color: '#3a2a1a', marginBottom: '6px', letterSpacing: '-1px' }}>
                Prisoner's Dilemma
            </h1>
            <p style={{ color: '#7a6a5a', fontSize: '15px', marginBottom: '36px' }}>
                Configure your population and run the tournament
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                maxWidth: '780px',
                width: '100%',
                marginBottom: '32px',
            }}>
                {strategies.map((item, index) => (
                    <Setup1Box key={index} strat={item} count={counts[item]} update={onUpdate} />
                ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <label style={{ color: '#3a2a1a', fontSize: '15px' }}>Rounds:</label>
                <input
                    type="number"
                    value={numRounds}
                    min={1}
                    onChange={(e) => setNumRounds(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{
                        width: '64px', textAlign: 'center', fontSize: '16px',
                        fontFamily: 'Georgia, serif', border: '2px solid #c8a070',
                        borderRadius: '8px', backgroundColor: '#fdf3e7',
                        color: '#3a2a1a', padding: '4px 8px',
                    }}
                />
            </div>

            <p style={{ color: '#7a6a5a', fontSize: '14px', marginBottom: '8px' }}>
                {total} players selected
            </p>
            {total > 100 && (
                <p style={{ color: '#c0392b', fontSize: '14px', marginBottom: '8px' }}>
                    Players cannot exceed 100.
                </p>
            )}

            <button
                onClick={() => onStart(counts)}
                disabled={total < 2 || total > 100}
                style={{
                    marginTop: '8px',
                    padding: '14px 40px',
                    fontSize: '17px',
                    fontFamily: 'Georgia, serif',
                    backgroundColor: total < 2 || total > 100 ? '#d4c4b0' : '#3a2a1a',
                    color: '#fdf6ec',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: total < 2 || total > 100 ? 'not-allowed' : 'pointer',
                    letterSpacing: '0.5px',
                }}
            >
                Enter the Arena 
            </button>
        </div>
    );
}

const App = () => {
    const [start, setStart] = useState("off");
    const [players, setPlayers] = useState([]);
    const [numRounds, setNumRounds] = useState(10);
    const [counts, setCounts] = useState({
        'TfT': 2, 'AlwaysDefect': 2, 'AlwaysCoop': 2, 'SusTfT': 2,
        'genTfT': 2, 'Random': 2, 'grimTrigger': 2, 'Pavlov': 2,
    });

    const total = Object.values(counts).reduce((sum, n) => sum + n, 0);

    const updateCount = (strat, newValue) => {
        setCounts({...counts, [strat]: newValue});
    }

    const RoundLoops = (oldplayers) => {
        const players = oldplayers.map(p => ({
            ...p,
            history: {...p.history},
            score: p.score
        }));
        for (let i = 0; i < players.length - 1; i++) {
            for (let j = i + 1; j < players.length; j++) {
                const istrat = players[i].strategy;
                const jstrat = players[j].strategy;
                players[i].history[players[j].id] = players[i].history[players[j].id] || []
                players[j].history[players[i].id] = players[j].history[players[i].id] || []
                const imove = strategyMap[istrat](players[i].history[players[j].id], players[j].history[players[i].id]);
                const jmove = strategyMap[jstrat](players[j].history[players[i].id], players[i].history[players[j].id]);
                players[i].history[players[j].id].push(imove);
                players[j].history[players[i].id].push(jmove);
                const roundscore = payoffs(imove, jmove);
                players[i].score += roundscore[0];
                players[j].score += roundscore[1];
            }
        }
        return players;
    };

    const PrepareArena = (counts) => {
        const initialPlayers = createPlayers(counts);
        setPlayers(initialPlayers);
        setStart("arena");
    }

    const RunSimulation = () => {
        setPlayers(currentPlayers => {
            let updated = currentPlayers;
            for (let round = 0; round < numRounds; round++) {
                updated = RoundLoops(updated);
            }
            return updated;
        });
        setStart("done");
    }

    const Reset = () => {
        setStart("off");
        setPlayers([]);
    }

    return (
        <div>
            {start === "off" && (
                <SetupAllBoxes
                    counts={counts}
                    total={total}
                    onUpdate={updateCount}
                    onStart={PrepareArena}
                    numRounds={numRounds}
                    setNumRounds={setNumRounds}
                />
            )}
            {start === "arena" && (
                <Arena players={players} onSimulationComplete={RunSimulation} />
            )}
            {start === "done" && (
                <Scoreboard players={players} onReset={Reset} />
            )}
        </div>
    );
}

export default App;
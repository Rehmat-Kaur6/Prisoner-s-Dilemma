import React from 'react';

const strategyColors = {
    'TfT': '#f0a500', 'AlwaysDefect': '#e74c3c', 'AlwaysCoop': '#27ae60',
    'grimTrigger': '#8e44ad', 'Pavlov': '#2980b9', 'SusTfT': '#e67e22',
    'genTfT': '#e91e8c', 'Random': '#555'
}

const strategyFull = {
    'TfT': 'Tit for Tat', 'AlwaysDefect': 'Always Defect', 'AlwaysCoop': 'Always Cooperate',
    'grimTrigger': 'Grim Trigger', 'Pavlov': 'Pavlov', 'SusTfT': 'Suspicious TfT',
    'genTfT': 'Generous TfT', 'Random': 'Random'
}

export const Scoreboard = ({ players, onReset }) => {
    let copy = [...players];
    copy = copy.sort((a, b) => b.score - a.score);

    const strategyTotals = {
        'TfT': 0, 'AlwaysDefect': 0, 'AlwaysCoop': 0, 'SusTfT': 0,
        'genTfT': 0, 'Random': 0, 'grimTrigger': 0, 'Pavlov': 0
    };
    for (let i = 0; i < copy.length; i++) {
        strategyTotals[copy[i].strategy] += copy[i].score;
    }
    const sortedStrategies = Object.entries(strategyTotals).sort((a, b) => b[1] - a[1]);
    const maxStratScore = sortedStrategies[0]?.[1] || 1;

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
                Game Results
            </h1>

            
            <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '2px solid #e8c9a0',
                padding: '28px 32px',
                width: '100%',
                maxWidth: '640px',
                marginBottom: '28px',
                boxShadow: '0 4px 24px rgba(58,42,26,0.08)',
            }}>
                <h2 style={{ fontSize: '20px', color: '#3a2a1a', marginBottom: '20px', marginTop: 0 }}>
                    Strategy Rankings
                </h2>
                {sortedStrategies.map(([strategy, total], index) => (
                    <div key={strategy} style={{ marginBottom: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '14px', color: '#3a2a1a', fontWeight: index === 0 ? 'bold' : 'normal' }}>
                                {index + 1}. {strategyFull[strategy] || strategy}
                                {index === 0 && ' 🏆'}
                            </span>
                            <span style={{ fontSize: '14px', color: strategyColors[strategy] || '#555', fontWeight: 'bold' }}>
                                {total} pts
                            </span>
                        </div>
                        <div style={{ height: '8px', backgroundColor: '#f0e6d8', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{
                                height: '100%',
                                width: `${(total / maxStratScore) * 100}%`,
                                backgroundColor: strategyColors[strategy] || '#aaa',
                                borderRadius: '4px',
                                transition: 'width 0.6s ease',
                            }} />
                        </div>
                    </div>
                ))}
            </div>

           
            <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '2px solid #e8c9a0',
                padding: '28px 32px',
                width: '100%',
                maxWidth: '640px',
                marginBottom: '32px',
                boxShadow: '0 4px 24px rgba(58,42,26,0.08)',
            }}>
                <h2 style={{ fontSize: '20px', color: '#3a2a1a', marginBottom: '20px', marginTop: 0 }}>
                    Player Rankings
                </h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #e8c9a0' }}>
                            <th style={{ textAlign: 'left', padding: '6px 8px', color: '#7a6a5a', fontWeight: 'normal' }}>#</th>
                            <th style={{ textAlign: 'left', padding: '6px 8px', color: '#7a6a5a', fontWeight: 'normal' }}>Name</th>
                            <th style={{ textAlign: 'left', padding: '6px 8px', color: '#7a6a5a', fontWeight: 'normal' }}>Strategy</th>
                            <th style={{ textAlign: 'right', padding: '6px 8px', color: '#7a6a5a', fontWeight: 'normal' }}>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {copy.map((player, index) => (
                            <tr key={player.id} style={{
                                borderBottom: '1px solid #f0e6d8',
                                backgroundColor: index === 0 ? '#fffbf4' : 'transparent',
                            }}>
                                <td style={{ padding: '8px 8px', color: '#7a6a5a' }}>{index + 1}</td>
                                <td style={{ padding: '8px 8px', color: '#3a2a1a', fontWeight: index < 3 ? 'bold' : 'normal' }}>
                                    {player.name}
                                </td>
                                <td style={{ padding: '8px 8px' }}>
                                    <span style={{
                                        backgroundColor: strategyColors[player.strategy] || '#aaa',
                                        color: 'white', fontSize: '11px',
                                        padding: '2px 8px', borderRadius: '20px',
                                    }}>
                                        {strategyFull[player.strategy] || player.strategy}
                                    </span>
                                </td>
                                <td style={{ padding: '8px 8px', textAlign: 'right', color: '#3a2a1a', fontWeight: 'bold' }}>
                                    {player.score}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button onClick={onReset} style={{
                padding: '14px 40px', fontSize: '16px',
                fontFamily: 'Georgia, serif',
                backgroundColor: '#3a2a1a', color: '#fdf6ec',
                border: 'none', borderRadius: '10px',
                cursor: 'pointer', letterSpacing: '0.5px',
            }}>
                Play Again
            </button>
        </div>
    );
}
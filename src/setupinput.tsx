
import React from 'react';

const strategyDescriptions = {
    'TfT': { full: 'Tit for Tat', desc: 'Cooperates first, then mirrors opponent\'s previous move.' },
    'AlwaysDefect': { full: 'Always Defect', desc: 'Defects unconditionally in every round.' },
    'AlwaysCoop': { full: 'Always Cooperate', desc: 'Cooperates unconditionally in every round.' },
    'SusTfT': { full: 'Suspicious Tit for Tat', desc: 'Like Tit for Tat but opens by defecting.' },
    'genTfT': { full: 'Generous Tit for Tat', desc: 'Mirrors opponent for the most part but occasionally forgives a defection.' },
    'Random': { full: 'Random', desc: 'Flips a coin each round and unpredictably defects or cooperates ' },
    'grimTrigger': { full: 'Grim Trigger', desc: 'Cooperates until betrayed once, then defects for the rest of the game.' },
    'Pavlov': { full: 'Pavlov', desc: 'Repeats a strategy if it paid off, switches strategies if it didn\'t.' },
}

export const Setup1Box = ({ strat, count, update }) => {
    const { full, desc } = strategyDescriptions[strat];

    const handleInputChange = (e) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val >= 0) update(strat, val);
    };

    return (
        <div style={{
            backgroundColor: '#fff8f0',
            border: '2px solid #e8c9a0',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        }}>
            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '17px', color: '#3a2a1a' }}>
                {full}
            </div>
            <div style={{ fontSize: '12px', color: '#7a6a5a', lineHeight: '1.4', minHeight: '36px' }}>
                {desc}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <button
                    onClick={() => update(strat, count - 1)}
                    disabled={count <= 0}
                    style={{
                        width: '64px' , height: '32px', borderRadius: '50%',
                        border: '2px solid #c8a070', backgroundColor: '#f5e6d0',
                        fontSize: '18px', cursor: count <= 0 ? 'not-allowed' : 'pointer',
                        color: '#3a2a1a', opacity: count <= 0 ? 0.4 : 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>−</button>
                <input
                    type="number"
                    value={count}
                    min={0}
                    onChange={handleInputChange}
                    style={{
                        width: '52px', textAlign: 'center', fontSize: '20px',
                        fontFamily: 'Georgia, serif', fontWeight: 'bold',
                        border: '2px solid #c8a070', borderRadius: '8px',
                        backgroundColor: '#fdf3e7', color: '#3a2a1a', padding: '4px',
                    }}
                />
                <button
                    onClick={() => update(strat, count + 1)}
                    style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        border: '2px solid #c8a070', backgroundColor: '#f5e6d0',
                        fontSize: '18px', cursor: 'pointer', color: '#3a2a1a',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>+</button>
            </div>
        </div>
    );
}
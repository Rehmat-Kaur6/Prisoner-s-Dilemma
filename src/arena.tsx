import React, { useState, useEffect, useRef } from 'react';

export const Arena = ({ players, onSimulationComplete }) => {
    const [barsAnimating, setBarsAnimating] = useState(false);
    const [barsGone, setBarsGone] = useState(false);
    const [positions, setPositions] = useState({});
    const [countdown, setCountdown] = useState(null);
    const animFrameRef = useRef(null);
    const velocitiesRef = useRef({});
    const positionsRef = useRef({});
    const countdownRef = useRef(null);

    // initialise positions and random velocities for each player
    useEffect(() => {
        const initialPositions = {};
        const initialVelocities = {};
        players.forEach(p => {
            initialPositions[p.id] = { x: p.x, y: p.y };
            // random velocity between -0.04 and 0.04 percent of screen per frame
            initialVelocities[p.id] = {
                vx: (Math.random() - 0.5) * 0.08,
                vy: (Math.random() - 0.5) * 0.08,
            };
        });
        positionsRef.current = initialPositions;
        velocitiesRef.current = initialVelocities;
        setPositions(initialPositions);
    }, [players]);

    // animation loop — runs when bars are gone
    useEffect(() => {
        if (!barsGone) return;

        const animate = () => {
            const newPositions = {};
            players.forEach(p => {
                let { x, y } = positionsRef.current[p.id];
                let { vx, vy } = velocitiesRef.current[p.id];
                x += vx;
                y += vy;
                // bounce off edges
                if (x <= 0 || x >= 90) vx = -vx;
                if (y <= 0 || y >= 90) vy = -vy;
                x = Math.max(0, Math.min(90, x));
                y = Math.max(0, Math.min(90, y));
                positionsRef.current[p.id] = { x, y };
                velocitiesRef.current[p.id] = { vx, vy };
                newPositions[p.id] = { x, y };
            });
            setPositions({ ...newPositions });
            animFrameRef.current = requestAnimationFrame(animate);
        };

        animFrameRef.current = requestAnimationFrame(animate);

        // countdown from 10 then go to scoreboard
        let secs = 10;
        setCountdown(secs);
        countdownRef.current = setInterval(() => {
            secs -= 1;
            setCountdown(secs);
            if (secs <= 0) {
                clearInterval(countdownRef.current);
                cancelAnimationFrame(animFrameRef.current);
                onSimulationComplete();
            }
        }, 1000);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            clearInterval(countdownRef.current);
        };
    }, [barsGone]);

    const handleStart = () => {
        setBarsAnimating(true);
        setTimeout(() => {
            setBarsGone(true);
        }, 1200);
    };

    const bars = [0, 1, 2, 3, 4, 5, 6, 7];

    return (
        <div style={{
            position: 'relative', width: '100vw', height: '100vh',
            backgroundColor: '#0a0a0a', overflow: 'hidden',
        }}>
            {/* dots with name labels */}
            {players.map((player) => {
                const pos = positions[player.id] || { x: player.x, y: player.y };
                return (
                    <div key={player.id} style={{
                        position: 'absolute',
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        transform: 'translate(-50%, -50%)',
                    }}>
                        <div style={{
                            width: '14px', height: '14px',
                            borderRadius: '50%',
                            backgroundColor: player.color,
                            boxShadow: `0 0 8px ${player.color}`,
                        }} />
                        <span style={{
                            color: player.color,
                            fontSize: '9px',
                            marginTop: '3px',
                            whiteSpace: 'nowrap',
                            fontFamily: 'monospace',
                            textShadow: '0 0 4px rgba(0,0,0,0.9)',
                        }}>
                            {player.name}
                        </span>
                    </div>
                );
            })}

            {/* countdown */}
            {barsGone && countdown !== null && (
                <div style={{
                    position: 'absolute', bottom: '24px', left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'rgba(255,255,255,0.5)', fontSize: '13px',
                    fontFamily: 'monospace', letterSpacing: '2px',
                }}>
                    RESULTS IN {countdown}s
                </div>
            )}

            {/* prison bars — all slide at once, no stagger */}
            {!barsGone && bars.map((i) => (
                <div key={i} style={{
                    position: 'absolute', top: 0,
                    left: `${i * 12.5}%`,
                    width: '11%', height: '100%',
                    backgroundColor: '#1a1a1a',
                    borderRight: '4px solid #333',
                    transform: barsAnimating ? 'translateY(-100%)' : 'translateY(0)',
                    transition: 'transform 1.0s ease-in 0s', // 0s delay — all bars move together
                }} />
            ))}

            {/* start button */}
            {!barsAnimating && (
                <button onClick={handleStart} style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10, padding: '14px 32px',
                    fontSize: '18px', fontFamily: 'Georgia, serif',
                    cursor: 'pointer', backgroundColor: '#1a1a1a',
                    color: '#fdf6ec', border: '2px solid #555',
                    borderRadius: '8px', letterSpacing: '1px',
                }}>
                    Release the Prisoners
                </button>
            )}
        </div>
    );
}
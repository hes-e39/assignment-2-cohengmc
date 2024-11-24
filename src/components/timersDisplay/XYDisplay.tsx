import { useContext, useEffect, useState } from 'react';
import { GlobalTimerData } from '../../views/HomeView';
import TimerDisplay from '../generic/TimerDisplay';

interface TimerProps {
    work: number;
    rounds: number;
}

const XY = ({ work, rounds }: TimerProps) => {
    const globalTimerData = useContext(GlobalTimerData);
    const [seconds, setSeconds] = useState(0);
    const [roundsRemaining, setRoundsRemaining] = useState(0);

    useEffect(() => {
        setSeconds(work);
        setRoundsRemaining(rounds);
    }, [work, rounds]);

    useEffect(() => {
        let interval = null;

        if (globalTimerData.isRunning && !globalTimerData.currentTimerDone) {
            if (roundsRemaining === rounds) {
                setRoundsRemaining(roundsRemaining - 1);
            }
            if (seconds === 0) {
                if (roundsRemaining === 0) {
                    globalTimerData.setCurrentTimerDone(true);
                } else {
                    setRoundsRemaining(roundsRemaining - 1);
                    setSeconds(work);
                }
            }
            interval = setTimeout(() => {
                setSeconds(prevseconds => prevseconds - 1);
            }, 1000);
        } else if (!globalTimerData.isRunning && seconds !== 0 && interval != null) {
            clearTimeout(interval);
        }
        if (interval != null) {
            return () => clearTimeout(interval);
        }
    }, [globalTimerData, seconds, roundsRemaining, rounds, work]);

    return (
        <div className="clockContainer">
            <p className="supportingText">Rounds Remaining: {roundsRemaining}</p>
            <TimerDisplay seconds={seconds} />
        </div>
    );
};
export default XY;

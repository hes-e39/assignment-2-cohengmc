import { useContext, useEffect, useState } from 'react';
import { GlobalTimerData } from '../../views/HomeView';
import TimerDisplay from '../generic/TimerDisplay';

interface TimerProps {
    work: number;
    rest: number;
    rounds: number;
}

const Tabata = ({ work, rest, rounds }: TimerProps) => {
    const globalTimerData = useContext(GlobalTimerData);
    const [seconds, setSeconds] = useState(0);
    const [roundsRemaining, setRoundsRemaining] = useState(0);
    const [isWorking, setIsWorking] = useState(true);

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
                    if (isWorking) {
                        setSeconds(rest);
                        setIsWorking(false);
                    } else {
                        setRoundsRemaining(roundsRemaining - 1);
                        setSeconds(work);
                        setIsWorking(true);
                    }
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
    }, [globalTimerData, isWorking, seconds, roundsRemaining, rounds, work, rest]);

    return (
        <div className="clockContainer">
            <div className="tabataInfo">
                <p className="supportingText">Rounds Remaining: {roundsRemaining}</p>
                <p className={`supportingText ${isWorking ? 'activeText' : ''}`}>{isWorking ? 'Active' : 'Rest'}</p>
            </div>
            <TimerDisplay seconds={seconds} />
        </div>
    );
};
export default Tabata;

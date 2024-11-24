import { useContext, useEffect, useState } from 'react';
import { GlobalTimerData } from '../../views/HomeView';
import TimerDisplay from '../generic/TimerDisplay';

interface TimerProps {
    time: number;
}

const Stopwatch = ({ time }: TimerProps) => {
    const globalTimerData = useContext(GlobalTimerData);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval = null;

        if (globalTimerData.isRunning && !globalTimerData.currentTimerDone) {
            if (seconds === time) {
                globalTimerData.setCurrentTimerDone(true);
            }
            interval = setTimeout(() => {
                setSeconds(prevseconds => prevseconds + 1);
            }, 1000);
        } else if (!globalTimerData.isRunning && seconds !== 0 && interval != null) {
            clearTimeout(interval);
        }
        if (interval != null) {
            return () => clearTimeout(interval);
        }
    }, [globalTimerData, seconds, time]);

    return (
        <div className="clockContainer">
            <TimerDisplay seconds={seconds} />
        </div>
    );
};
export default Stopwatch;

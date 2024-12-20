import { useContext, useEffect, useState } from 'react';
import { GlobalTimerData } from '../../views/HomeView';
import TimerDisplay from '../generic/TimerDisplay';

interface TimerProps {
    time: number;
}

const Countdown = ({ time }: TimerProps) => {
    const globalTimerData = useContext(GlobalTimerData);
    const [seconds, setSeconds] = useState(time);

    useEffect(() => {
        if (globalTimerData.hardReset) {
            setSeconds(time);
        }
    }, [globalTimerData, time]);

    useEffect(() => {
        let interval = null;

        if (globalTimerData.isRunning && !globalTimerData.timerComplete) {
            if (seconds === 0) {
                globalTimerData.setTimerComplete(true);
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
    }, [globalTimerData, seconds]);

    return (
        <div className="clockContainer">
            <TimerDisplay seconds={seconds} />
        </div>
    );
};
export default Countdown;

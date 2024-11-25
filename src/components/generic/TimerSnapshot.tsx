import { formatTime } from '../../utils/helpers';

interface TimerData {
    type: string;
    time: number;
    rounds: number;
    work: number;
    rest: number;
}

interface SnapshotProps {
    timer: TimerData;
    index: number;
    currentTimerID: number;
    isWorkoutDone: boolean;
}

const TimerSnapshot = ({ timer, index, currentTimerID, isWorkoutDone }: SnapshotProps) => {
    return (
        <div
            className={`${index < currentTimerID || isWorkoutDone ? 'complete' : 'notStarted'} ${index === currentTimerID && !isWorkoutDone ? 'active' : ''}`}
            style={{ border: '1px solid black', display: 'flex', flexDirection: 'column', width: '5rem', alignItems: 'center', padding: '.5em', justifyContent: 'center', userSelect: 'none' }}
        >
            <p>{timer.type}</p>
            {timer.type === 'Stopwatch' || timer.type === 'Countdown' ? (
                <p className="miniClock">{formatTime(timer.time)}</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.1em' }}>
                    <p>Rounds: {timer.rounds}</p>
                    {timer.type === 'XY' ? (
                        <p className="miniClock">{formatTime(timer.work)}</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.1em' }}>
                            <p className="miniClock activeText">{formatTime(timer.work)}</p>
                            <p className="miniClock">{formatTime(timer.rest)}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default TimerSnapshot;

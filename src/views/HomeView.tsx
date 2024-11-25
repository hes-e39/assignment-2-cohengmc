import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeBtns from '../components/generic/HomeBtns';
import TextBtn from '../components/generic/TextBtn';
import TimerSnapshot from '../components/generic/TimerSnapshot';
import Countdown from '../components/timersDisplay/CountdownDisplay';
import Stopwatch from '../components/timersDisplay/StopwatchDisplay';
import Tabata from '../components/timersDisplay/TabataDisplay';
import XY from '../components/timersDisplay/XYDisplay';
import { getTotalTime } from '../utils/helpers';

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em
`;

const Timer = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
`;

export const GlobalTimerData = createContext({
    isRunning: false,
    timerComplete: false,
    setTimerComplete: (timerComplete: boolean) => {
        timerComplete;
    },
});

interface TimerData {
    type: string;
    time: number;
    rounds: number;
    work: number;
    rest: number;
}

const TimersView = () => {
    const navigate = useNavigate();
    const [isRunning, setIsRunning] = useState(false);
    const [timerComplete, setTimerComplete] = useState(false);
    const [currentTimerID, setCurrentTimerID] = useState(0);
    const [isWorkoutDone, setIsWorkoutDone] = useState(false);

    const cacheTimerData = localStorage.getItem('timerData');
    const parsedTimerData = cacheTimerData !== null && JSON.parse(cacheTimerData);
    const isAtLeastOneTimer = parsedTimerData[0].type !== '';
    const currentTimerData = parsedTimerData[currentTimerID];

    if (timerComplete) {
        if (currentTimerID + 1 === parsedTimerData.length) {
            setIsWorkoutDone(true);
            setIsRunning(false);
            setTimerComplete(false);
        } else {
            setTimerComplete(false);
            setCurrentTimerID(currentTimerID + 1);
        }
    }

    function getTimer() {
        if (currentTimerData.type === 'Stopwatch') {
            return <Stopwatch time={currentTimerData.time} />;
        }
        if (currentTimerData.type === 'Countdown') {
            return <Countdown time={currentTimerData.time} />;
        }
        if (currentTimerData.type === 'XY') {
            return <XY work={currentTimerData.work} rounds={currentTimerData.rounds} />;
        }
        if (currentTimerData.type === 'Tabata') {
            return <Tabata work={currentTimerData.work} rest={currentTimerData.rest} rounds={currentTimerData.rounds} />;
        }
    }

    // const handleInputBtnClick = () => {};

    const timeChange = () => {
        //pause and play
        if (!isWorkoutDone) {
            setIsRunning(!isRunning);
        }
    };
    const handleReset = () => {
        // reset back to the begining, should double check with user
        setTimerComplete(false);
        setCurrentTimerID(0);
        setIsWorkoutDone(false);
        setIsRunning(false);
    };

    const handleFF = () => {
        if (currentTimerID + 1 === parsedTimerData.length) {
            setIsWorkoutDone(true);
            setTimerComplete(false);
            setIsRunning(false);
        } else {
            setTimerComplete(false);
            setCurrentTimerID(currentTimerID + 1);
        }
    };
    const handleGoToEdit = () => {
        navigate('/add');
    };

    return (
        <GlobalTimerData.Provider value={{ isRunning, timerComplete, setTimerComplete }}>
            <Timers>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {parsedTimerData.map((timer: TimerData, index: number) =>
                        parsedTimerData[0].type !== '' ? <TimerSnapshot key={`timerSnapshot${index}`} timer={timer} index={index} isWorkoutDone={isWorkoutDone} currentTimerID={currentTimerID} /> : '',
                    )}
                    <p>Total Workout Time: {getTotalTime()}</p>
                </div>
                <Timer>{isWorkoutDone ? <h1 className="clockStyle">DO:NE</h1> : isAtLeastOneTimer ? getTimer() : <h2>Add a timer!</h2>}</Timer>
                <HomeBtns timeChange={timeChange} handleReset={handleReset} handleFF={handleFF} isRunning={isRunning} />
                <TextBtn onClick={handleGoToEdit} key={`editButton`} name={'Edit Workout'} />
            </Timers>
        </GlobalTimerData.Provider>
    );
};

export default TimersView;

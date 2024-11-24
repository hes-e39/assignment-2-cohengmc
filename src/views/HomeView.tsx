import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeBtns from '../components/generic/HomeBtns';
import TextBtn from '../components/generic/TextBtn';
import Countdown from '../components/timersDisplay/CountdownDisplay';
import Stopwatch from '../components/timersDisplay/StopwatchDisplay';
import Tabata from '../components/timersDisplay/TabataDisplay';
import XY from '../components/timersDisplay/XYDisplay';

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timer = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
`;

export const GlobalTimerData = createContext({
    isRunning: false,
    currentTimerDone: false,
    setCurrentTimerDone: (currentTimerDone: boolean) => {
        currentTimerDone;
    },
});

const TimersView = () => {
    const navigate = useNavigate();
    const [isRunning, setIsRunning] = useState(false);
    const [currentTimerID, setCurrentTimerID] = useState(0);
    const [currentTimerDone, setCurrentTimerDone] = useState(false);

    const cacheTimerData = localStorage.getItem('timerData');
    const parsedTimerData = cacheTimerData !== null && JSON.parse(cacheTimerData);
    const isAtLeastOneTimer = parsedTimerData[0].type !== '';

    function getTimer(currentTimerIndex: number) {
        const currentTimerData = parsedTimerData[currentTimerIndex];
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
        setIsRunning(!isRunning);
    };
    const handleReset = () => {
        // reset back to the begining, should double check with user
    };

    const handleFF = () => {
        // Go to next timer
        // setIsDone(true);
    };
    const handleGoToEdit = () => {
        navigate('/add');
    };
    return (
        <GlobalTimerData.Provider value={{ isRunning, currentTimerDone, setCurrentTimerDone }}>
            <Timers>
                <TextBtn onClick={handleGoToEdit} key={`editButton`} name={'Edit Workout'} />
                <Timer>{isAtLeastOneTimer ? getTimer(0) : <h2>Add a timer!</h2>}</Timer>
                <HomeBtns timeChange={timeChange} handleReset={handleReset} handleFF={handleFF} isRunning={isRunning} />
                {/* <HomeBtnsWithBack timeChange={timeChange} handleReset={handleReset} handleBackBtn={handleBackBtn} handleFF={handleFF} isRunning={isRunning} /> */}
            </Timers>
        </GlobalTimerData.Provider>
    );
};

export default TimersView;

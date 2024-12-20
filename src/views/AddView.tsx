import styled from 'styled-components';

import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextBtn from '../components/generic/TextBtn';

import Countdown from '../components/timersInput/CountdownInput';
import Stopwatch from '../components/timersInput/StopwatchInput';
import Tabata from '../components/timersInput/TabataInput';
import XY from '../components/timersInput/XYInput';

const Timers = styled.div`
  display: flex;
//   flex-direction: column;
flex-wrap: wrap;
justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const AddTimerContainer = styled.div`
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const TimerTitle = styled.div``;

interface TimerData {
    type: string;
    time: number;
    rounds: number;
    work: number;
    rest: number;
}

export const TimerDataContext = createContext({
    timerData: [{ type: '', time: 0, rounds: 0, work: 0, rest: 0 }],
    setTimerData: (timerData: TimerData[]) => {
        timerData;
    },
});

const blankTimer = [{ type: '', time: 0, rounds: 0, work: 0, rest: 0 }];

const AddView = () => {
    const [timerData, setTimerData] = useState([{ type: 'reload', time: 0, rounds: 0, work: 0, rest: 0 }]);
    const navigate = useNavigate();

    useEffect(() => {
        const cacheTimerData = localStorage.getItem('timerData');
        let parsedTimerData = cacheTimerData !== null && JSON.parse(cacheTimerData);
        if (!parsedTimerData) parsedTimerData = blankTimer;
        setTimerData(parsedTimerData);
    }, []);

    if (timerData.length === 0) {
        setTimerData(blankTimer);
    } else if (timerData[0].type !== 'reload') {
        localStorage.setItem('timerData', JSON.stringify(timerData));
    }

    const handleAddTimer = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLElement;
        const newTimer = { type: target.innerText, time: 0, rounds: 0, work: 0, rest: 0 };
        if (timerData.length === 0) {
            setTimerData([newTimer]);
        } else if (timerData[0].type === '') {
            setTimerData([newTimer]);
        } else if (timerData.length >= 10) {
            alert('Limit of 10 timers reached, please delete timers to add more.');
        } else {
            setTimerData([...timerData, newTimer]);
        }
    };

    function getTimer(timer: string, index: number) {
        if (timer === 'Stopwatch') {
            return <Stopwatch key={`${timer}${index}`} timerID={index} />;
        }
        if (timer === 'Countdown') {
            return <Countdown key={`${timer}${index}`} timerID={index} />;
        }
        if (timer === 'XY') {
            return <XY key={`${timer}${index}`} timerID={index} />;
        }
        if (timer === 'Tabata') {
            return <Tabata key={`${timer}${index}`} timerID={index} />;
        }
    }

    const handleDone = () => {
        let timersSet = 0;
        for (const timer of timerData) {
            if (timer.type === '') {
                navigate('/');
            } else if (timer.type === 'Stopwatch') {
                if (timer.time > 0) {
                    timersSet++;
                }
            } else if (timer.type === 'Countdown') {
                if (timer.time > 0) {
                    timersSet++;
                }
            } else if (timer.type === 'XY') {
                if (timer.work > 0 && timer.rounds > 0) {
                    timersSet++;
                }
            } else if (timer.type === 'Tabata') {
                if (timer.work > 0 && timer.rounds > 0 && timer.rest > 0) {
                    timersSet++;
                }
            }
        }
        if (timersSet === timerData.length) {
            navigate('/');
        } else {
            alert('Make sure all timers are set');
        }
    };

    return (
        <TimerDataContext.Provider value={{ timerData, setTimerData }}>
            <Timers>
                {timerData.map((timer, index) =>
                    timerData[0].type !== '' ? (
                        <div key={`timerBlock${index}`}>
                            <TimerTitle>{`#${index + 1}: ${timer.type}`}</TimerTitle>
                            {getTimer(timer.type, index)}
                        </div>
                    ) : (
                        ''
                    ),
                )}
            </Timers>
            <AddTimerContainer>
                <TextBtn onClick={handleAddTimer} key={`Stopwatch`} name={'Stopwatch'} />
                <TextBtn onClick={handleAddTimer} key={`Countdown`} name={'Countdown'} />
                <TextBtn onClick={handleAddTimer} key={`XY`} name={'XY'} />
                <TextBtn onClick={handleAddTimer} key={`Tabata`} name={'Tabata'} />
            </AddTimerContainer>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TextBtn onClick={handleDone} key={`doneButton`} name={'Run Workout'} />
            </div>
        </TimerDataContext.Provider>
    );
};

export default AddView;

import styled from 'styled-components';

import { createContext, useState } from 'react';
import TextBtn from '../components/generic/TextBtn';

import Countdown from '../components/timers/Countdown';
import Stopwatch from '../components/timers/Stopwatch';
import Tabata from '../components/timers/Tabata';
import XY from '../components/timers/XY';

const Timers = styled.div`
  display: flex;
//   flex-direction: column;
flex-wrap: wrap;
justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Timer = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
`;

const AddTimerContainer = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const TimerTitle = styled.div``;

export const TimerDataContext = createContext({
    timerData: [{ type: '', time: 0, rounds: 0, work: 0, rest: 0 }],
    setTimerData: (timerData: [{ type: string; time: number; rounds: number; work: number; rest: number }]) => {},
});

const AddView = () => {
    const [timerData, setTimerData] = useState([{ type: '', time: 0, rounds: 0, work: 0, rest: 0 }]);

    const handleAddTimer = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLElement;
        const newTimer = { type: target.innerText, time: 0, rounds: 0, work: 0, rest: 0 };
        if (timerData[0].type === '') {
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
            <p>{JSON.stringify(timerData)}</p>
            <AddTimerContainer>
                <TextBtn onClick={handleAddTimer} key={`Stopwatch`} name={'Stopwatch'} />
                <TextBtn onClick={handleAddTimer} key={`Countdown`} name={'Countdown'} />
                <TextBtn onClick={handleAddTimer} key={`XY`} name={'XY'} />
                <TextBtn onClick={handleAddTimer} key={`Tabata`} name={'Tabata'} />
            </AddTimerContainer>
        </TimerDataContext.Provider>
    );
};

export default AddView;

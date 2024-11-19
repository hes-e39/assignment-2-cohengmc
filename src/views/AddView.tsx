import styled from 'styled-components';

import { useState } from 'react';
import TextBtn from '../components/generic/TextBtn';

import Countdown from '../components/timers/Countdown';
import Stopwatch from '../components/timers/Stopwatch';
import Tabata from '../components/timers/Tabata';
import XY from '../components/timers/XY';

const Timers = styled.div`
  display: flex;
  flex-direction: column;
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

const AddView = () => {
    const [timerData, setTimerData] = useState(['']);

    const handleAddTimer = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLElement;
        if (timerData[0] === '') {
            setTimerData([target.innerText]);
        } else if (timerData.length >= 10) {
            alert('Limit of 10 timers reached, please delete timers to add more.');
        } else {
            setTimerData([...timerData, target.innerText]);
        }

        // if (target.innerText === 'Stopwatch') {
        //     setSeconds(userInputCleanup(timerInput));
        //     if (userInputCleanup(timerInput) > 0) {
        //         setIsInputSet(true);
        //     }
        // } else if (target.innerText === 'Clear') {
        //     setTimerInput('000000');
        // } else {
        //     setTimerInput(timerInput.slice(1) + target.innerText);
        // }
    };

    function getTimer(timer: string, index: number) {
        if (timer === 'Stopwatch') {
            return <Stopwatch key={`${timer}${index}`} timerID={`${index}`} />;
        }
        if (timer === 'Countdown') {
            return <Countdown key={`${timer}${index}`} timerID={`${index}`} />;
        }
        if (timer === 'XY') {
            return <XY key={`${timer}${index}`} timerID={`${index}`} />;
        }
        if (timer === 'Tabata') {
            return <Tabata key={`${timer}${index}`} timerID={`${index}`} />;
        }
    }

    return (
        <div>
            <AddTimerContainer>
                <TextBtn onClick={handleAddTimer} key={`Stopwatch`} name={'Stopwatch'} />
                <TextBtn onClick={handleAddTimer} key={`Countdown`} name={'Countdown'} />
                <TextBtn onClick={handleAddTimer} key={`XY`} name={'XY'} />
                <TextBtn onClick={handleAddTimer} key={`Tabata`} name={'Tabata'} />
            </AddTimerContainer>
            <Timers>{timerData.map((timer, index) => getTimer(timer, index))}</Timers>
        </div>
    );
};

export default AddView;

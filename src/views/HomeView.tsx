import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Stopwatch from '../components/deprecatedTimers/Stopwatch';
import TextBtn from '../components/generic/TextBtn';

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

const TimerTitle = styled.div``;

const TimersView = () => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate('/add');
    };

    const handleInputBtnClick = () => {};

    return (
        <Timers>
            <TextBtn onClick={handleEdit} key={`editButton`} name={'Edit Workout'} />
            <Timer>
                <Stopwatch />
            </Timer>
            {/* <HomeBtnsWithBack timeChange={timeChange} handleReset={handleReset} handleBackBtn={handleBackBtn} handleFF={handleFF} isRunning={isRunning} /> */}
        </Timers>
    );
};

export default TimersView;

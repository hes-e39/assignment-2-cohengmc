import LogoBtn from '../generic/LogoBtn';

interface BtnProps {
    isRunning: boolean;
    timeChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleReset: (event: React.MouseEvent<HTMLButtonElement>) => void;

}

const HomeBtns = ({ timeChange, handleReset, isRunning }: BtnProps) => {
    return (
        <div>
            <div className="btnContainer">
                <LogoBtn onClick={timeChange} name={!isRunning ? 'play' : 'pause'} />
                <LogoBtn onClick={handleReset} name="reset" />
            </div>
        </div>
    );
};
export default HomeBtns;

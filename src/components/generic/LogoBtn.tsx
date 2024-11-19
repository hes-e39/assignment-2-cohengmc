interface BtnProps {
    name: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LogoBtn = ({ name, onClick }: BtnProps) => {
    return (
        <div>
            <button onClick={onClick} className="btn">
                {name === 'play' ? (
                    <img src={'./public/images/play-svgrepo-com.svg'} alt="play logo" className="btnLogo" />
                ) : name === 'pause' ? (
                    <img src={'./public/images/pause-alt-svgrepo-com.svg'} alt="pause logo" className="btnLogo" />
                ) : name === 'reset' ? (
                    <img src="./public/images/reset-svgrepo-com.svg" alt="reset logo" className="btnLogo" />
                ) : name === 'back' ? (
                    <img src="./public/images/left-arrow-svgrepo-com.svg" alt="back logo" className="btnLogo" />
                ) : name === 'ff' ? (
                    <img src="./public/images/fast-forward-svgrepo-com.svg" alt="ff logo" className="btnLogo" />
                ) : (
                    <img src="./public/images/alert-error-svgrepo-com.svg" alt="reset logo" className="btnLogo" />
                )}
            </button>
        </div>
    );
};
export default LogoBtn;
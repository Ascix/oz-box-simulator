import ProgressBar from 'react-bootstrap/ProgressBar';

function Progress() {
    //4s
    for (let i = 0; i <= 100; i++) {
        setTimeout(() => {
            return <ProgressBar now={i} />;
        }, 40)
    }
}

export default Progress;
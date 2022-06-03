import Countdown from 'react-countdown';
export default function timer(props) {
    const Completionist = () => <span>You can place a pixel!</span>;
    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        } else {
            return <span>Time until next pixel: {minutes}:{seconds}</span>;
        }
    };
    return <Countdown date={Date.now() + 60000} renderer={renderer} />
}
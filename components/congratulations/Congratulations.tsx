'use client';
import { Text } from '../text/Text';

type CongratulationsPropsType = {
    setFirstConfirm: (isFirst: boolean) => void;
};

export const Congratulations = (props: CongratulationsPropsType) => {
    const { setFirstConfirm } = props;

    return (
        <div>
            <Text text={'Congratulations'} size={'20'} weight={'700'} />
            <Text text={'Your email has been confirmed'} />
            <button
                style={{
                    marginTop: '80px',
                    width: '182px',
                    height: '36px',
                    backgroundColor: '#397DF6',
                    color: 'white',
                }}
                onClick={() => setFirstConfirm(true)}
            >
                Sign In
            </button>
            <img
                src={'/assets/congratulations.png'}
                width={432}
                height={300}
                style={{ marginTop: '80px' }}
            />
        </div>
    );
};

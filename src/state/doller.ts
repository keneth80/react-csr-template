import {useState, useEffect} from 'react';
import {atom, selector, useRecoilStateLoadable, useRecoilValue} from 'recoil';
import {v1} from 'uuid';

export const wonState = atom({
    key: `wonState/${v1()}`,
    default: 1000
});

const realTimeDollarState = selector({
    key: `realTimeDollarState/${v1()}`,
    get: async ({get}) => {
        const won = get(wonState);
        const res = await fetch('https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD');
        const result = await res.json();
        const exchangeRate = parseFloat(result[0].basePrice);
        console.log('realTimeDollarState : ', won, exchangeRate);
        return won / exchangeRate;
    },
    set: ({set}, exChangedWon) => {
        console.log('realTimeDollarState.set : ', exChangedWon);
        set(wonState, exChangedWon);
    }
});

const useRealTimeDollar = () => {
    const [dollar, setRecoilState] = useState(0);
    const [loadable, setRealTimeDollar] = useRecoilStateLoadable(realTimeDollarState);
    const won = useRecoilValue(wonState);

    useEffect(() => {
        if (loadable.state === 'hasValue') {
            console.log('const won = get(wonState); : ', won);
            setRecoilState(loadable.contents);
        } else if (loadable.state === 'hasError') {
            console.log(loadable.contents);
        }
        console.log('useRealTimeDollar : ', loadable);
    }, [loadable]);

    const setDollar = async (inputDollar: number) => {
        const res = await fetch('https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD');
        const result = await res.json();
        const exchangeRate = parseFloat(result[0].basePrice);
        const exchangedWon = exchangeRate * inputDollar;
        console.log('exchangedWon : ', exchangeRate, inputDollar, exchangedWon);
        setRealTimeDollar(exchangedWon);
    };

    return {dollar, setDollar};
};

export default useRealTimeDollar;

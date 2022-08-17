import { useState } from 'react';

function Progress() {
    //4s
    const [loading, setLoading] = useState("0");
    for (let i = 0; i <= 100; i++) {
        setTimeout(() => {
            setLoading(i)
        }, 40)
    }
}

export default Progress;
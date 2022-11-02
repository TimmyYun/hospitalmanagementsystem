import { useState } from 'react';

export default function Doctor({ orderDesc, id, master }) {
    const [isHidden, setIsHidden] = useState(false)

    return (
        <div className='user-container'>
            <p
                onClick={() => setIsHidden(!isHidden)}
            >Doctor</p>
            <div className={`user-info ${isHidden ? "hide" : ""}`}>
                Info
            </div>
        </div>
    );
}

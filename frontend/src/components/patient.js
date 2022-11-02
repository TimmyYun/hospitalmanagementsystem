import { useState } from 'react';

export default function Patient({ orderDesc, id, master }) {
    const [isHidden, setIsHidden] = useState(false)

    return (
        <div className='user-container'>
            <p
                onClick={() => setIsHidden(!isHidden)}
            >Patient</p>
            <div className={`user-info ${isHidden ? "hide" : ""}`}>
                <div>
                    Info
                </div>
            </div>
        </div>
    );
}

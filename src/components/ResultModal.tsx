import React, {forwardRef, useImperativeHandle, useRef} from "react";
import { createPortal } from 'react-dom'

export interface ResultModalProps {
    targetTime: number,
    onReset: React.FormEventHandler<HTMLFormElement | HTMLDialogElement>
    remainingTime: number
}

const ResultModal =
    forwardRef(function ResultModal({targetTime, onReset, remainingTime}: ResultModalProps, forwardingRef: React.ForwardedRef<any>){
        const dialog: React.MutableRefObject<HTMLDialogElement | any> = useRef();

        const userLost: boolean = remainingTime <= 0;
        const formattedRemainingTime: string = (remainingTime / 1000).toFixed(2);
        const score: number = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

        useImperativeHandle(forwardingRef, () => {
            return {
                open() {
                    if (dialog.current) {
                        dialog.current.showModal();
                    }
                }
            };
        });

        return createPortal((
            <dialog ref={dialog} className="result-modal" onClose={onReset}>
                {userLost && <h2>You Lost</h2>}
                {!userLost && <h2>Your Score: {score}</h2>}
                <p>
                    The target time was <strong>{targetTime} seconds.</strong>
                </p>
                <p>
                    You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong>
                </p>
                <form method="dialog" onSubmit={onReset}>
                    <button>Close</button>
                </form>
            </dialog>
        ), document.getElementById('modal') as HTMLElement);
    })

export default ResultModal;
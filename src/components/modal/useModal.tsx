import React, { useState } from 'react';
import Modal from './modal';

export const useModal = () => {
    const [modal, setModal] = useState(<></>);

    
    const showModal = ({ id, children }: { id: string | undefined, children: JSX.Element }) => {
        setModal(
            <Modal onClose={() => { setModal(<></>) }} key={id}>{children}</Modal > as JSX.Element
        );
    }

    return ([modal, showModal] as const);
};

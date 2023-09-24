import React, { FC, useState } from 'react';
import Modal from './modal';

export const useModal = () => {
    const [modal, setModal] = useState(<></>);

    const showModal = ({ id, children }: { id: string, children: JSX.Element }) => {
        setModal(<Modal onClose={() => { setModal(<></>) }} key={id}>{children}</Modal > as JSX.Element);
    }

    return ([modal, showModal] as const);
};

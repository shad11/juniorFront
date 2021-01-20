import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import "./Modal.scss";

const Modal = (props) =>  {
    const { header, closeButton, text, actions, closeFunc, headerColorClass, bodyColorClass } = props;

    const closeModal = (event) => {
        const modalEl = document.querySelector('.modal');

        if (event.target === modalEl) {
            closeFunc();
        }
    };

    useEffect(() => {
        return () => {
            window.removeEventListener('click', closeModal);
        }
    });

    window.addEventListener('click', closeModal);

    return (
        <div className='modal'>
            <div className='modal__content'>
                <div className={`modal__header ${headerColorClass}`}>
                    {
                        closeButton &&
                        <Button className='btnModalClose' text="&#x2715;" onClick={closeFunc} />
                    }
                    <div>{header}</div>
                </div>
                <div className={`modal__body  ${bodyColorClass}`}>
                    {text}
                </div>
                <div className={`modal__footer ${bodyColorClass}`}>
                    <div>{actions}</div>
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    header: PropTypes.string,
    closeButton: PropTypes.bool,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    actions: PropTypes.element,
    closeFunc: PropTypes.func,
    headerColorClass: PropTypes.string,
    bodyColorClass: PropTypes.string
};

Modal.defaultProps = {
    header: 'Modal window',
    closeButton: true,
    text: 'Hello',
    actions: (<></>),
    closeFunc: () => {},
    headerColorClass: 'modal-header-red',
    bodyColorClass: 'modal-body-red'
};

export default Modal;
import React from 'react';
import resOkRegistration from '../images/regisrtation.jpg';
import resNotRegistration from '../images/no-regisrtation.jpg';

function InfoTooltip(props) {
    return (
        <div className={`modal modal_type_info-tooltip ${props.isOpen ? ('modal_opened') : ('')}`}>
            <div className="modal__container modal__container_type_info-tooltip">
                <img src={props.registered ? resOkRegistration : resNotRegistration}
                alt="Результат регистрации" className="modal__image-res" />
                <h2 className="modal__res-registration">{props.registered ? 'Вы успешно зарегистрировались!'
                 : `Что-то пошло не так! Попробуйте ещё раз`}</h2>
                <button type="button" className="modal__close-button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default InfoTooltip;
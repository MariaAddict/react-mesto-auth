import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {
    const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({ about: '', avatar: '', cohort: '', name: '', _id: '' });
    const [cards, setCards] = React.useState([]);
    // const {url , path} = useRouteMatch();
    const [headerLink, setHeaderLink] = React.useState({
        name: '',
        url: ''
    });
    const location = useLocation();

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([dataUser, dataCards]) => {
            setCurrentUser(dataUser);
            setCards(dataCards);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    React.useEffect(() => {
        console.log('location.pathname: ', location.pathname);
        if (location.pathname === '/sign-in') {
            setHeaderLink({
                name: 'Регистрация',
                url: '/sign-up'
            });
        };
        if (location.pathname === '/sign-up') {
            setHeaderLink({
                name: 'Вход',
                url: '/sign-in'
            });
        };
        if (location.pathname === '/') {
            setHeaderLink({
                name: 'Выйти',
                url: '/sign-in'
            });
        };
    }, [location]);


    function handleEditAvatarClick() {
        setisEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setisEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setisAddPlacePopupOpen(true);
    }
    function handleCardClick(card) {
        setSelectedCard(card);
    }
    function closeAllPopups() {
        setisAddPlacePopupOpen(false);
        setisEditProfilePopupOpen(false);
        setisEditAvatarPopupOpen(false);
        setSelectedCard({});
    }
    function handleUpdateUser(data) {
        api.editUserInfo(data).then((res) => {
            setCurrentUser(res);
            setisEditProfilePopupOpen(false);
        }).catch(err => {
            console.log(err);
        });
    }
    function handleUpdateAvatar(data) {
        api.changeAvatar(data).then((avatar) => {
            setCurrentUser(avatar);
            setisEditAvatarPopupOpen(false);
        }).catch(err => {
            console.log(err);
        });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        api.changeLike(card._id, !isLiked).then((newCard) => {
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
        }).catch(err => {
            console.log(err);
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            const newCards = cards.filter((c) => !(c._id === card._id));
            setCards(newCards);
        }).catch(err => {
            console.log(err);
        });
    }

    function handleAddPlaceSubmit(card) {
        api.addCard(card).then((newCard) => {
            setCards([newCard, ...cards]);
            setisAddPlacePopupOpen(false);
        }).catch(err => {
            console.log(err);
        });
    }


    return (
        < CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="page">
                    <Header link={headerLink} />

                    <Switch>

                        <ProtectedRoute exact path="/" component={Main}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            onCardDelete={handleCardDelete}
                            onCardLike={handleCardLike}
                            cards={cards}
                        />
                        {/* <Main
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            onCardDelete={handleCardDelete}
                            onCardLike={handleCardLike}
                            cards={cards}
                        /> */}


                        <Route path="/sign-up">
                            <Register />
                            {/* <InfoTooltip onClose={closeAllPopups} ></InfoTooltip> */}
                        </Route>
                        <Route path="/sign-in">
                            <Login />
                        </Route>
                    </Switch>
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                    <ImagePopup {...selectedCard} onClose={closeAllPopups} />
                    <Footer />
                </div>
            </div>
        </ CurrentUserContext.Provider >
    );
}

export default App;
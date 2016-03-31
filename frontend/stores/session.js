var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    SessionConstants = require('../constants/session_constants'),
    SessionStore = new Store(AppDispatcher),
    _currentUser,
    _currentUserHasBeenFetched = false;


SessionStore.currentUser = function() {
    return _currentUser;
};

SessionStore.isLoggedIn = function() {
    return Boolean(_currentUser);
};

SessionStore.currentUserHasBeenFetched = function() {
    return _currentUserHasBeenFetched;
};

SessionStore.__onDispatch = function (payload) {
    switch (payload.actionType) {
        case SessionConstants.CURRENT_USER_RECEIVED:
            _currentUser = payload.currentUser;
            _currentUserHasBeenFetched = true;
            SessionStore.__emitChange();
            break;
        case SessionConstants.LOGOUT:
            _currentUser = null;
            SessionStore.__emitChange();
            break;
    }
};


module.exports = SessionStore;

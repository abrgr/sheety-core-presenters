import React, { Component } from 'react';
import firebaseui from 'firebaseui';
import uuid from 'uuid';

import 'firebaseui/dist/firebaseui.css';

export default function makeRequireAuthPresenter(presenter, deps) {
  const firebasePromise = deps.firebasePromise;
  if ( !firebasePromise ) {
    return () => {
      throw new Error('RequireAuthPresenter requires a firebasePromise dependency.  It should only be resolved once we have an auth state.');
    };
  }

  class RequireAuthPresenter extends Component {
    constructor(props) {
      super(props);

      this.state = {
        id: `auth-${uuid.v4()}`, // element ids must start with a letter
        isAuthed: false
      };
    }

    authenticated = () => {
      this.setState({
        isAuthed: true
      });
    };

    isAuthenticated = (auth) => (
      // TODO: check roles, etc.
      auth.currentUser && !auth.currentUser.isAnonymous
    );

    componentDidMount() {
      firebasePromise.then(firebase => {
        const auth = firebase.auth();
        if ( this.isAuthenticated(auth) ) {
          return this.authenticated();
        }

        const { config } = this.props;

        // not authenticated yet
        const ui = new firebaseui.auth.AuthUI(auth);
        ui.start(
          `#${this.state.id}`,
          {
            autoUpgradeAnonymousUsers: true,
            signInSuccessUrl: window.location.href,
            tosUrl: config.get('tosUrl'),
            signInFlow: !!config.get('usePopup') ? 'popup' : 'redirect',
            signInOptions: config.get('providers')
                                 .filter(p => !!p)
                                 .map(providerConfig => (
                                   {
                                     email: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                                     google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                                     facebook: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                                     twitter: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                                     github: firebase.auth.GithubAuthProvider.PROVIDER_ID
                                   }[providerConfig.get('provider')]
                                 ))
                                 .filter(p => !!p)
                                 .toJS(),
            callbacks: {
              signInSuccess: (user, cred, redirectUrl) => {
                if ( cred && cred.providerId === 'google.com' ) {
                  // cred.accessToken is the google oauth access token
                }

                this.authenticated();

                return true;
              },
              signInFailure: (err) => {
                if ( err.code !== 'firebaseui/anonymous-upgrade-merge-conflict' ) {
                  return Promise.resolve();
                }

                const anonymousUser = auth.currentUser;
                const cred = err.credential;

                // TODO: actually copy data per https://github.com/firebase/firebaseui-web#using-firebaseui-for-authentication

                return auth.signInWithCredential(cred)
                           .then(_ => anonymousUser.delete())
                           .then(_ => this.authenticated());
              }
            }
          }
        );
      });
    }

    render() {
      const { id, isAuthed } = this.state;
      const { renderPresenter, config } = this.props;

      if ( isAuthed ) {
        return config.get('presenter') ? renderPresenter(config.get('presenter')) : null;
      }

      return (
        <div>
          {config.get('signInContent') ? renderPresenter(config.get('signInContent')) : null}
          <div id={id} />
        </div>
      );
    }
  };

  return presenter()(RequireAuthPresenter);
}

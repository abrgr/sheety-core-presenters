import React, { Component } from 'react';
import { fromJS, List } from 'immutable';
import { Tabs, Tab } from 'material-ui/Tabs';
import firebaseui from 'firebaseui';
import uuid from 'uuid';

import 'firebaseui/dist/firebaseui.css';

export default function makeRequireAuthPresenter(presenter) {
  class RequireAuthPresenter extends Component {
    render() {
      const { renderPresenter, config } = this.props;

      return (
        <Tabs>
          <Tab
            label="Logged in">
            {renderPresenter(['config', 'presenter'], config.get('presenter'))}
          </Tab>
          <Tab
            label="Not logged in">
            {config.get('signInContent') ? renderPresenter(['config', 'signInContent'], config.get('signInContent')) : null}
            {config.get('providers', new List())
                   .filter(providerConfig => !!providerConfig)
                   .map(providerConfig => (
                     <p>Sign in with {providerConfig.get('provider')}.</p>
                   ))}
          </Tab>
        </Tabs>
      );
    }
  };

  return presenter({
    schema: fromJS({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/require-auth.json",
      "title": "Require Authentication",
      "description": "Shows an authentication prompt if not logged in; shows the provided presenter otherwise.",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "require-auth",
          "default": "require-auth"
        },
        "config": {
          "title": "Configuration",
          "description": "Pre-specified configuration",
          "type": "object",
          "default": {},
          "properties": {
            "presenter": {
              "title": "Presenter",
              "description": "The presenter to render if the user is already authenticated.",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json"
            },
            "usePopup": {
              "title": "Use popup",
              "description": "Should we use a popup for sign in?",
              "type": "boolean",
              "default": false
            },
            "signInContent": {
              "title": "Sign in content",
              "description": "The presenter to render above the sign in",
              "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json"
            },
            "providers": {
              "title": "Log in providers",
              "type": "array",
              "default": [],
              "items": {
                "title": "Log in provider",
                "type": "object",
                "default": {},
                "properties": {
                  "provider": {
                    "title": "Provider",
                    "type": "string",
                    "enum": ["google", "facebook", "twitter", "github", "email"]
                  }
                }
              }
            }
          }
        }
      }
    }),
  })(RequireAuthPresenter);
}

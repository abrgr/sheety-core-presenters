import React, { Component } from 'react';
import { fromJS, Map, List } from 'immutable';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditPresenterIcon from 'material-ui/svg-icons/editor/border-inner';
import equalPaths from './equal-paths';

import 'bootstrap/dist/css/bootstrap-grid.css';
import './grid-layout.css';

class Cell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovered: false
    };
  }

  render() {
    const {
      selectedPath,
      relativePath,
      path,
      cell,
      isEditing,
      renderPresenter,
      onRemove,
      onSelectPresenterForEditing
    } = this.props;
    const cellPresenter = cell.get('presenter');
    const width = cell.get('width');
    const isHovered = isEditing && this.state.isHovered;
    const shouldRenderPresenter = !!cellPresenter || (!!selectedPath && equalPaths(path, selectedPath));

    return (
      <Paper
        zDepth={isHovered ? 2 : 0}
        style={{
          background: 'transparent',
          paddingLeft: 0,
          paddingRight: 0
        }}
        onMouseMove={evt => {
          this.setState({
            isHovered: true
          });
        }}
        onMouseOut={evt => {
          this.setState({
            isHovered: false
          });
        }}
        className={`col-${width}`}>
        <FlatButton
          onClick={() => { onRemove(); }}
          style={{
            transition: 'opacity 0.25s',
            opacity: isHovered ? 1 : 0,
            position: 'absolute',
            top: 0,
            right: 0,
            minWidth: 16,
            minHeight: 16,
            width: 16,
            height: 16,
            padding: 0,
            lineHeight: 0
          }}
          labelStyle={{
            padding: 0
          }}
          label="x" />
        {shouldRenderPresenter
          ? null
          : (
            <FlatButton
              onClick={evt => {
                evt.stopPropagation();
                onSelectPresenterForEditing(path);
              }}
              style={{
                transition: 'opacity 0.25s',
                opacity: isHovered ? 1 : 0,
                position: 'absolute',
                bottom: 0,
                right: 0,
                minWidth: 16,
                minHeight: 16,
                width: 16,
                height: 16,
                padding: 0,
                lineHeight: 0
              }}
              labelStyle={{
                padding: 0
              }}>
              <EditPresenterIcon
                style={{
                  width: 16,
                  height: 16
                }} />
            </FlatButton>
          )}
        {shouldRenderPresenter
          ? renderPresenter(relativePath, cellPresenter)
          : (
            <FloatingActionButton
              disabled={!isEditing}
              onClick={evt => {
                evt.stopPropagation();
                onSelectPresenterForEditing(path);
              }}>
              <EditPresenterIcon />
            </FloatingActionButton>
          )}
      </Paper>
    );
  }
}

export default function makeGridPresenter(presenter) {
  const GridPresenter = ({
    selectedPath,
    isEditing,
    config = new Map(),
    renderPresenter,
    path,
    onUpdate,
    onSelectPresenterForEditing
  }) => {
    const rows = config.get('rows', new List());

    return (
      <div
        style={{
          paddingRight: 50
        }}>
        <div className="container">
          {rows.map((row, rowIdx) => {
            const rowPath = ['config', 'rows', rowIdx];
            return (
              <div
                key={`row-${rowIdx}`}
                style={{
                  minHeight: 20,
                  marginTop: 20,
                  marginBottom: 20,
                  position: 'relative'
                }}
                className="row">
                {row.map((cell, cellIdx) => {
                  const presenterPath = rowPath.concat([cellIdx, 'presenter']);

                  return (
                    <Cell
                      key={`cell-${cellIdx}`}
                      selectedPath={selectedPath}
                      relativePath={presenterPath}
                      path={path.concat(presenterPath)}
                      cell={cell}
                      renderPresenter={renderPresenter}
                      isEditing={isEditing}
                      onSelectPresenterForEditing={onSelectPresenterForEditing}
                      onRemove={() => {
                        onUpdate(
                          rowPath,
                          row.delete(cellIdx)
                        );
                      }} />
                  );
                })}
                {isEditing
                  ? (
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        width: 50,
                        minWidth: 50,
                        height: '100%',
                        pointerEvents: 'none'
                      }}>
                      <RaisedButton
                        primary
                        style={{
                          pointerEvents: 'auto',
                          position: 'absolute',
                          left: 70,
                          width: 50,
                          minWidth: 50,
                          height: '100%'
                        }}
                        className="grid-layout-add-cell"
                        label="+"
                        onClick={() => {
                          onUpdate(
                            rowPath,
                            row.push(new Map({
                              width: 1,
                              presenter: null
                            }))
                          );
                        }} />
                    </div>
                  ) : null}
              </div>
            );
          })}
        </div>
        {isEditing
          ? (
            <RaisedButton
              primary
              fullWidth
              style={{
                position: 'absolute',
                left: 0,
                right: 0
              }}
              label="+"
              onClick={() => {
                onUpdate(
                  ['config', 'rows'],
                  rows.push(new List())
                );
              }} />
          ) : null}
      </div>
    );
  };

  return presenter({
    schema: fromJS({
      "$schema": "http://json-schema.org/schema#",
      "$id": "http://sheetyapp.com/schemas/core-presenters/grid-layout.json",
      "title": "Grid Layout",
      "description": "Grid Layout renders other presenters in a grid.",
      "type": "object",
      "properties": {
        "id": {
          "title": "Identifier",
          "description": "A unique identifier for this presenter.  Used for analytics events.",
          "type": "string",
          "default": ""
        },
        "type": {
          "const": "grid-layout",
          "default": "grid-layout"
        },
        "config": {
          "title": "Configuration",
          "description": "Pre-specified configuration",
          "type": "object",
          "default": {},
          "properties": {
            "rows": {
              "title": "Rows",
              "description": "Specifies a row of the grid.",
              "type": "array",
              "linkable": false,
              "internallyConfigured": true,
              "items": {
                "title": "Row",
                "type": "array",
                "linkable": false,
                "items": {
                  "title": "Cell",
                  "type": "object",
                  "default": {},
                  "linkable": false,
                  "properties": {
                    "width": {
                      "title": "Width",
                      "description": "Number of columns this presenter will occupy.",
                      "type": "integer",
                      "minimum": 1,
                      "maximum": 12,
                      "linkable": false
                    },
                    "presenter": {
                      "title": "Presenter",
                      "description": "The presenter to render in this cell.",
                      "$ref": "http://sheetyapp.com/schemas/core-presenters/configurers/presenter.json",
                      "linkable": false
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
  })(GridPresenter);
}

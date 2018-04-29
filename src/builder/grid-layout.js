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

class HorizontalResizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialX: null,
      pxPerWidthUnit: null
    };
  }

  render() {
    const { initialX } = this.state;
    const isResizing = initialX !== null;

    const { side } = this.props;
    const pos = side === 'right'
              ? { right: 0 }
              : { left: 0 };
    return (
      <div
        onMouseDown={this.onStartDrag}
        onMouseUp={this.onEndDrag}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: 5,
          cursor: 'ew-resize',
          ...pos
        }}>
        {isResizing
          ? (
            <div
              onMouseMove={this.onDrag}
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0)',
                opacity: '0',
                position: 'fixed',
                zIndex: '9999',
                top: '0',
                left: '0',
                bottom: '0',
                right: '0',
              }} />
          ) : null}
      </div>
    );
  }

  onStartDrag = evt => {
    this.setState({
      initialX: evt.nativeEvent.clientX,
      pxPerWidthUnit: evt.target.parentElement.clientWidth / this.props.width
    })
  };

  onDrag = evt => {
    const { initialX, pxPerWidthUnit } = this.state;
    if ( initialX === null ) {
      return;
    }

    const x = evt.nativeEvent.clientX;
    const offset = x - initialX;
    if ( Math.abs(offset) < (pxPerWidthUnit / 2) ) {
      // we have not moved at least half a unit
      return;
    }

    const { side, canExpandLeft, canExpandRight } = this.props;

    if ( side === 'left' && offset < 0 && !canExpandLeft ) {
      // we're encroaching on our left neighbor and we can't expand in that direction
      return;
    }

    if ( side === 'right' && offset > 0 && !canExpandRight ) {
      // we're encroaching on our right neighbor and we can't expand in that direction
      return;
    }

    // we round to the nearest unit to avoid any weird jumps
    const roundedX = initialX + Math.round(offset / pxPerWidthUnit) * pxPerWidthUnit;
    this.setState({
      initialX: roundedX
    }, () => {
      this.props.onResize(offset, pxPerWidthUnit);
    });
  };

  onEndDrag = evt => {
    this.setState({
      initialX: null
    })
  };
}

class Cell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovered: false
    };
  }

  render() {
    const {
      canExpandLeft,
      canExpandRight,
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
        <HorizontalResizer
          canExpandLeft={canExpandLeft}
          canExpandRight={canExpandRight}
          width={width}
          side="left"
          onResize={this.onResize.bind(null, 'left')} />
        <HorizontalResizer
          canExpandLeft={canExpandLeft}
          canExpandRight={canExpandRight}
          width={width}
          side="right"
          onResize={this.onResize.bind(null, 'right')} />
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
          ? (
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
          ) : null}
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

  onResize = (side, movementX, pxPerWidthUnit) => {
    const { onAdjustWidth, cell } = this.props;
    const sign = side === 'left' ? -1 : 1;
    const offset = sign * Math.round(movementX / pxPerWidthUnit);
    if ( offset !== 0 ) {
      onAdjustWidth(side, offset);
    }
  };
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
            const totalWidth = row.reduce((sum, cell) => sum + cell.get('width'), 0);
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
                  const canExpandLeft = cellIdx > 0 ? row.getIn([cellIdx - 1, 'width']) > 1 : false;
                  const canExpandRight = totalWidth < 12 || (cellIdx < row.size - 1 && row.getIn([cellIdx + 1, 'width']) > 1);

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
                      canExpandLeft={canExpandLeft}
                      canExpandRight={canExpandRight}
                      onAdjustWidth={(side, change) => {
                        const otherCellIdx = side === 'left'
                                           ? cellIdx - 1
                                           : cellIdx + 1;
                        let nextRow = row.updateIn([cellIdx, 'width'], w => Math.max(1, w + change));
                        if ( otherCellIdx >= 0 && otherCellIdx < row.size ) {
                          nextRow = nextRow.updateIn([otherCellIdx, 'width'], w => Math.max(1, w - change));
                        }
                        const nextTotalWidth = nextRow.reduce((sum, cell) => sum + cell.get('width'), 0);
                        if ( nextTotalWidth > 12 ) {
                          return;
                        }

                        onUpdate(rowPath, nextRow);
                      }}
                      onRemove={() => {
                        onUpdate(
                          rowPath,
                          row.delete(cellIdx)
                        );
                      }} />
                  );
                })}
                {isEditing && totalWidth < 12
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

import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Button, Row, Col, Icon } from 'antd'
import styles from './lifegame.less'

function LifeGame({ location, dispatch, lifegame }) {

  const { matrix, height, width, interval, timeoutId } = lifegame
// console.log('begin',timeoutId, Object.assign([],matrix))
  const updateMatrix = []
  for (let i = 0; i < height; i++) {
    updateMatrix[i] = []
    for (let j = 0; j < width; j++) {
      updateMatrix[i][j] = matrix[i][j]
    }
  }

  function getCell(i, j) {
    if (i >= 0 && i < height && j >= 0 && j < width) return matrix[i][j]
    return 0
  }

  function updateCell(i, j) {
    if (i < 0 || i >= height || j < 0 || j >= width) return
    let cell = getCell(i, j)
    let liveCount = 0
    let around8 = [getCell(i-1,j-1), getCell(i-1,j), getCell(i-1,j+1), getCell(i,j-1), getCell(i,j+1), getCell(i+1,j-1), getCell(i+1,j), getCell(i+1,j+1) ]
    around8.map((item) => {
      if (item) liveCount++
    })
    if (liveCount == 3) updateMatrix[i][j] = 1
    else if (cell && liveCount == 2) updateMatrix[i][j] = 1
    else updateMatrix[i][j] = 0
  }

  function updateCells() {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        updateCell(i, j)
      }
    }
  }

  const cellClick = (rowi, colj) => {
    return () => {
      updateMatrix[rowi][colj] = updateMatrix[rowi][colj] ? 0 : 1
      dispatch({ type: 'lifegame/update', payload: { matrix: updateMatrix } })
    }
  }

  const Cell = props => (
    <a className={styles.cell + ' ' + (props.state ? styles.cellLive : '')}
      style={{ height: 20, width: 20 }}
      id={'cell-' + props.rowIndex + '-' + props.colIndex}
      onClick={cellClick(props.rowIndex, props.colIndex)}>
    </a>
  )

  const CellRow = props => (
    <Col className={styles.cellRow}>
      {props.rowObject.map((cellObject, index) => (
        <Cell state={cellObject} colIndex={index} rowIndex={props.rowIndex} />
      ))}
    </Col>
  )

  const Matrix = () => (
    <Row className={styles.lifegame}>
      {matrix.map((rowObject, index) => (
        <CellRow rowObject={rowObject} rowIndex={index} />
      ))}
    </Row>
  )

  const resetBtnClick = () => {
    clearTimeout(timeoutId)
    dispatch({ type: 'lifegame/initalize' })
  }

  const play = () => {

  }

  const playBtnClick = () => {
    (function play() {
      // console.log(Object.assign([],matrix))
      updateCells()
      
      dispatch({ type: 'lifegame/update', payload: { matrix: updateMatrix } })
      // const timeoutId = setTimeout(() => {
      //   play()
      // }, interval * 1000)
      
      // dispatch({ type: 'lifegame/update', payload: { timeoutId: timeoutId } })

      //var playBtn = $0; (function play() {playBtn.click(); setTimeout(function () {play();}, 1000)})()
    })()
  }

  const pauseBtnClick = () => {
    clearTimeout(timeoutId)
  }

  return (
    <div className={styles.layout} style={{ textAlign: 'center' }}>
      <Row style={{ marginTop: 20 }}>
        <Col>
          <h1>Life Game</h1>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col>
          <Button onClick={resetBtnClick}><Icon type="reload" /> 重置</Button>
          <Button id="btnPlay" onClick={playBtnClick}><Icon type="caret-right" /> 开始</Button>
          <Button onClick={pauseBtnClick}><Icon type="pause" /> 暂停</Button>
          <Button><Icon type="plus" /> 加快</Button>
          <Button><Icon type="minus" /> 减慢</Button>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Matrix />
      </Row>
    </div>
  )
}

LifeGame.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  lifegame: PropTypes.object,
}

export default connect(({ lifegame }) => ({ lifegame }))(LifeGame)
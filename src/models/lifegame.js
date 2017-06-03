/**
 * life game model
 * date: 2017/6/3
 * author: muxfe
 */

const height = 40
  , width = 60

export default {
  namespace: 'lifegame',
  state: {
    matrix: [],
    height: height,
    width: width,
    interval: 1,
    timeoutId: 0,
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'initalize' })
    }
  },
  effects: {
    *update ({ payload }, { call, put }) {
      yield put({ type: 'updateSuccess', payload: { ...payload } })
    },
    *initalize ({ payload }, { call, put }) {
      const matrixTmp = []
      const initalPos = [
        '2-25', '2-26', '3-25', '3-27', '4-13', '4-26', '4-27', '4-28', 
        '5-10', '5-11', '5-12', '5-13', '5-17', '5-18', '5-27', '5-28', '5-29', '5-35', '5-36',
        '6-9', '6-10', '6-11', '6-12', '6-16', '6-17', '6-26', '6-27', '6-28', '6-35', '6-36',
        '7-2', '7-3', '7-9', '7-12', '7-16', '7-17', '7-19', '7-21', '7-22', '7-25', '7-27', 
        '8-2', '8-3', '8-9', '8-10', '8-11', '8-12', '8-17', '8-19', '8-21', '8-22', '8-25', '8-26',
        '9-10', '9-11', '9-12', '9-13', '9-17', '9-19', '9-20',
        '10-13',
        '20-4', '20-5', '20-6', '20-10', '20-11', '20-12', '20-13', '20-15', '20-16', '20-17', '20-18', '20-19', '20-20', '20-21', '20-22', '20-23', '20-24', '20-25', '20-26',
        '20-32', '20-33', '20-34', '20-40', '20-41', '20-42', '20-43', '20-44', '20-45', '20-46', '20-47', '20-48', '20-49',
        '20-54', '20-55', '20-56', '20-57', '20-58', '20-59', '20-60', '20-61', '20-62'
      ]
      for (let i = 0; i < height; i++) {
        matrixTmp[i] = []
        for (let j = 0; j < width; j++) {
          if (initalPos.indexOf(i + '-' + j) > -1) matrixTmp[i][j] = 1
          else matrixTmp[i][j] = 0
        }
      }
      yield put({ type: 'updateSuccess', payload: { matrix: matrixTmp } })
    },
    *updateCells ({ payload }, { call, put }) {
      const { matrix } = payload

      const updateMatrix = []
      for (let i = 0; i < height; i++) {
        updateMatrix[i] = []
        for (let j = 0; j < width; j++) {
          updateMatrix[i][j] = matrix[i][j]
        }
      }

      const getCell = (i, j) => {
        if (i >= 0 && i < height && j >= 0 && j < width) return matrix[i][j]
        return 0
      }

      const updateCell = (i, j) => {
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

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          updateCell(i, j)
        }
      }

      yield put({ type: 'updateSuccess', payload: { matrix: updateMatrix } })
    }
  },
  reducers: {
    updateSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  }
}
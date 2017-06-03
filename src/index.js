import dva from 'dva'
import './index.html'

// initialize
const app = dva({});

// model
app.model(require('./models/app'));

// router
app.router(require('./router'));

// start
app.start('#root');

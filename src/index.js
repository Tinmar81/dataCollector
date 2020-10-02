import React from 'react';
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';
import DatasCollectorStepper from "./components/restaurants/DatasCollectorStepper";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.Fragment>
      <Container fixed>
          <DatasCollectorStepper></DatasCollectorStepper>
      </Container>
  </React.Fragment>,
  document.getElementById('root')
);

serviceWorker.unregister();

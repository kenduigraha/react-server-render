import express from 'express';
import request from 'request';
import React, {Component} from 'react';
import {renderToString} from 'react-dom/server';
import {RouterContext, match, createRoutes} from 'react-router';

import appRouter from '../client/router';

const routes = createRoutes(appRouter());

class DataProvider extends Component {
  getChildContext() {
    return {data: this.props.data};
  }
  render() {
    return <RouterContext {...this.props}/>;
  }
}
DataProvider.propTypes = {
  data: React.PropTypes.object
};
DataProvider.childContextTypes = {
  data: React.PropTypes.object
};

/*eslint-disable*/
const router = express.Router();
/*eslint-enable*/

/* GET home page. */
router.get('/', (req, res) => {
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const content = renderToString(<RouterContext {...renderProps}/>);
      res.render('index', {title: 'Express', data: false, content});
    } else {
      res.status(404).send('Not Found');
    }
  });
});

router.get('/home', (req, res) => {
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const content = renderToString(<RouterContext {...renderProps}/>);
      res.render('index', {title: 'Express', data: false, content});
    } else {
      res.status(404).send('Not Found');
    }
  });
});
router.get('/list', (req, res) => {
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // console.log("AHA");
      request('http://jsonplaceholder.typicode.com/users', (error, response, body) => {
        var body = [
          {
            "id": 1,
            "name": `Leanne Graham ${Date.now()}`,
            "username": "Bret",
            "email": "Sincere@april.biz",
            "address": {
              "street": "Kulas Light",
              "suite": "Apt. 556",
              "city": "Gwenborough",
              "zipcode": "92998-3874",
              "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
              }
            },
            "phone": "1-770-736-8031 x56442",
            "website": "hildegard.org",
            "company": {
              "name": "Romaguera-Crona",
              "catchPhrase": "Multi-layered client-server neural-net",
              "bs": "harness real-time e-markets"
            }
          }
        ];

        const data = {items: body};
        const content = renderToString(<DataProvider {...renderProps} data={data}/>);
        console.log(content);
        res.status(200).render('index', {title: 'Express', data, content});
      });
    } else {
      res.status(404).send('Not Found');
    }
  });
});

router.get('/api/list', (req, res) => {
  console.log('API LIST');
  var body = [
    {
      "id": 1,
      "name": `Leanne Graham ${Date.now()}`,
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    }
  ];
  return res.json(body);
  // match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
  //   if (error) {
  //     res.status(500).send(error.message);
  //   } else if (redirectLocation) {
  //     res.redirect(302, redirectLocation.pathname + redirectLocation.search);
  //   } else if (renderProps) {
  //     console.log("AHA");
  //     request('http://jsonplaceholder.typicode.com/users', (error, response, body) => {
  //       var body = [
  //         {
  //           "id": 1,
  //           "name": `Leanne Graham ${Date.now()}`,
  //           "username": "Bret",
  //           "email": "Sincere@april.biz",
  //           "address": {
  //             "street": "Kulas Light",
  //             "suite": "Apt. 556",
  //             "city": "Gwenborough",
  //             "zipcode": "92998-3874",
  //             "geo": {
  //               "lat": "-37.3159",
  //               "lng": "81.1496"
  //             }
  //           },
  //           "phone": "1-770-736-8031 x56442",
  //           "website": "hildegard.org",
  //           "company": {
  //             "name": "Romaguera-Crona",
  //             "catchPhrase": "Multi-layered client-server neural-net",
  //             "bs": "harness real-time e-markets"
  //           }
  //         }
  //       ];
  //       return res.json(body);
  //       const data = {items: body};
  //       const content = renderToString(<DataProvider {...renderProps} data={data}/>);
  //       // console.log(content);
  //       res.status(200).render('index', {title: 'Express', data, content});
  //     });
  //   } else {
  //     res.status(404).send('Not Found');
  //   }
  // });
});



module.exports = router;

const util = require('util');

import Model from '../model';

const model = new Model();

describe('Model', () => {

  it('it fetches all tasks', () => {

    fetch.mockResponse(JSON.stringify([
      {
        '_id': '5958c02f9e3f27bd5c93e7fc',
        'task': 'beer',
        'date': '2017-07-02T09:43:11.502Z',
        '__v': 0,
      },
      {
        '_id': '5958c02f9e3f27bd5c93e7ab',
        'task': 'cheerios',
        'date': '2017-07-02T09:45:11.502Z',
        '__v': 0,
      },
    ]),
    { status: 200 });

    const expected = ['beer', 'cheerios'];

    expect.assertions(2);

    return model.fetch()
      .then((result) => {
        result.forEach((item, id) => {
          expect(item.task).toBe(expected[id]);
        })
      })
      .catch((error) => console.log(error));
   })

  it('it saves a task', () => {

    const task = 'beer';

    fetch.mockResponse(JSON.stringify({
      '_id': '5958c02f9e3f27bd5c93e7fc',
      'task': `${task}`,
      'date': '2017-07-02T09:43:11.502Z',
      '__v': 0,
    }),
    { status: 200 });

    const expectedResponse = { task: `${task}`};

    expect.assertions(1);

    return model.saveTodo()
      .then((result) => {
        expect(result.task).toBe(expectedResponse.task)
      })
      .catch((error) => console.log(error));
   })

   it('it deletes a task', () => {

     const id = '5958c02f9e3f27bd5c93e7fc';

     fetch.mockResponse(JSON.stringify({
       '_id': `${id}`,
       'task': 'beer',
       'date': '2017-07-02T09:43:11.502Z',
       '__v': 0,
     }),
     { status: 200 });

     const expectedResponse = { _id: `${id}`};

     expect.assertions(1);

     return model.deleteTodo()
       .then((result) => {
        expect(result._id).toBe(expectedResponse._id)
       })
       .catch((error) => console.log(error));
    })


    it('it updates task to complete', () => {

      fetch.mockResponse(JSON.stringify({
        '_id': '5958c02f9e3f27bd5c93e7fc',
        'task': 'beer',
        'date': '2017-07-02T09:43:11.502Z',
        '__v': 0,
        'complete': true,
      }),
      { status: 200 });

      const expectedResponse = { complete: true };

      expect.assertions(1);

      return model.updateTodo()
        .then((result) => {
         expect(result.complete).toBeTruthy()
        })
        .catch((error) => console.log(error));
     })
})

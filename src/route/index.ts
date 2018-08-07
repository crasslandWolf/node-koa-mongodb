import * as Router from 'koa-router';
import * as config from '../config';
import * as controller from '../controller';

const router = new Router({
    prefix: config.APP.ROOT_PATH
});

router
    .get('/lists', controller.test.testList)
    .get('/test/:id', controller.test.testDetail)
    .put('/edit/:id', controller.test.testEdit)
    .delete('/remove/:id', controller.test.testDelete)
    .post('new', controller.test.newTest);
export default router;

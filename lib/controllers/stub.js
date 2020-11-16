import * as HTTPStatus from 'http-status-codes';

export default function stub(req, res) {
    res.status(HTTPStatus.NOT_IMPLEMENTED).send(`Not implemented yet, params ${JSON.stringify(req.params)}, body ${req.body}`);
}
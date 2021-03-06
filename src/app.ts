/* eslint-disable @typescript-eslint/ban-types */
import Express from 'express';
import gracefulShutdown from 'http-graceful-shutdown';
import { Container } from 'typedi';

import { Logger, Tracer } from '@adhityan/gc-logger';
import { Router } from '@adhityan/gc-doc';

import { Config } from './config';
import { ObjectUtils } from './utils';
import { APP_NAME } from './constants';
import * as controllers from './controllers';
import * as middlewares from './middlewares';
import { authorizationChecker, currentUserChecker } from './middlewares/authentication.middleware';

Logger.init(Config.LOGGER_CONFIG);
Container.set('Config', Config);

const start = async () => {
    const app: Express.Application = Express();
    app.use(Tracer.expressMiddleware());

    Router.initialize(
        app,
        {
            authorizationChecker,
            controllers: <Function[]>ObjectUtils.getObjectValues(controllers),
            cors: {
                allowMethods: ['GET', 'PUT', 'POST', 'DELETE'],
                exposeHeaders: ['X-Request-Id'],
                origin: '*',
            },
            currentUserChecker,
            defaultErrorHandler: false,
            defaults: {
                nullResultCode: 404,
                paramOptions: {
                    required: true,
                },
                undefinedResultCode: 404,
            },
            documentationParameters: {
                baseUrl: process.env.HOST || '',
                title: APP_NAME,
            },
            enableDocumentation: true,
            middlewares: <Function[]>ObjectUtils.getObjectValues(middlewares),
            routePrefix: '/api',
        },
        Container,
    );

    const server = app.listen(Config.PORT, () => {
        Logger.info(`Server up and running on port ${Config.PORT}`);
    });

    gracefulShutdown(server);
};

start();

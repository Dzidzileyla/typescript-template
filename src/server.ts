import express from 'express';
import { Server } from 'typescript-rest';
import config from './config';
import { Mongo } from './db';
import { parseCsvString } from './util/string-util';

import fs = require('fs');
import http = require('http');
import path = require('path');
import cors = require('cors');

export class ApiServer {
  private server: http.Server = null as any;

  public PORT: number = (config.app.port as any) || 8081;
  public HOST: string = (config.app.host as any) || '0.0.0.0';

  constructor(
    private readonly app: express.Application = express(),
    apiContext = config.app.contextRoot
  ) {
    this.app.use(cors());

    if (!apiContext || apiContext === '/') {
      this.app.use(
        express.static(path.join(process.cwd(), 'public'), {
          maxAge: 31557600000,
        })
      );
    } else {
      this.app.use(
        apiContext,
        express.static(path.join(process.cwd(), 'public'), {
          maxAge: 31557600000,
        })
      );
    }

    const apiRouter: express.Router = express.Router();
    Server.loadServices(apiRouter, ['controllers/*'], __dirname);

    const swaggerPath = path.join(process.cwd(), 'dist/swagger.json');
    if (fs.existsSync(swaggerPath)) {
      Server.swagger(apiRouter, {
        filePath: swaggerPath,
        schemes: this.swaggerProtocols,
        host: this.swaggerHost,
        endpoint: '/api-docs',
      });
    }

    if (!apiContext || apiContext === '/') {
      this.app.use(apiRouter);
    } else {
      this.app.use(apiContext, apiRouter);
    }

    Mongo.connect().then(res => {
      console.log(`[MongoDB] connected`);
    });
  }

  /**
   * Start the server
   * @returns {Promise<any>}
   */
  public async start(): Promise<ApiServer> {
    return new Promise<ApiServer>((resolve, reject) => {
      this.server = this.app.listen(this.PORT, this.HOST, () => {
        // tslint:disable-next-line:no-console
        console.log(`[App] Listening to http://${this.HOST}:${this.PORT}`);

        return resolve(this);
      });
    });
  }

  /**
   * Stop the server (if running).
   * @returns {Promise<boolean>}
   */
  public async stop(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (this.server) {
        this.server.close(() => {
          return resolve(true);
        });
      } else {
        return resolve(false);
      }
    });
  }

  public getApp(): express.Application {
    return this.app;
  }

  get swaggerProtocols(): string[] {
    return parseCsvString(config.swagger.protocols as any, '');
  }

  get swaggerHost(): string {
    return config.swagger.host || '';
  }
}
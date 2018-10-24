import { OK } from 'http-status-codes';
import { resolve } from "path";
import { Response } from 'request';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';
import { using } from '../../../utils/using';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('OptionsRequestHandler', () => {
  const { request } = setupExperimentationServerTest({
    projectPath: resolve(__dirname, '../../../resources/designSystems/twoComponentsWithConfig'),
    serverCmdArgs: ['--webpack-config "./webpack.config.js"'],
    useTempDir: true,
  });

  const getEndpoints:string[] = [
    '/libraries/',
    '/libraries/items/index/',
    '/code/repositoryPointer',
    '/code/categories',
    '/code/previews',
  ];

  using(getEndpoints).describe('responds to OPTIONS (preflight) request for', (uri) => {
    it(`${uri} endpoint with correct headers`, async () => {
      // given
      const expectedHeaders:any = {
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
        'access-control-allow-origin': 'https://app.uxpin.com',
      };

      // when
      const response:Response = await request(uri, { method: 'OPTIONS', resolveWithFullResponse: true });

      // then
      expect(response.statusCode).toEqual(OK);
      expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
      expect(response.body).toEqual('');
    });
  });
});

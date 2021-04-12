import { AxiosResponse } from 'axios';
import { OK } from 'http-status-codes';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';
import { using } from '../../../utils/using';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('OptionsRequestHandler', () => {
  const { axiosPromise } = setupExperimentationServerTest({
    projectPath: 'resources/designSystems/twoComponentsWithConfig',
    serverCmdArgs: [
      '--webpack-config "./webpack.config.js"',
    ],
  });

  const getEndpoints:string[] = [
    '/libraries/',
    '/libraries/items/index/',
    '/code/repositoryPointer',
    '/code/repositoryPointer/default',
    '/code/categories',
    '/code/previews',
  ];

  using(getEndpoints).describe('responds to OPTIONS (preflight) request for', (uri) => {
    it(`${uri} endpoint with correct headers`, async () => {
      // given
      const origin:string = 'https://app.uxpin.com';
      const expectedHeaders:any = {
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
        'access-control-allow-origin': 'https://app.uxpin.com',
      };

      // when
      const response:AxiosResponse = await axiosPromise(uri, {
        headers: { origin },
        method: 'OPTIONS',
      });

      // then
      expect(response.status).toEqual(OK);
      expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
      expect(response.data).toEqual('');
    });
  });
});

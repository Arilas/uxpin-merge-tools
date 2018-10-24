import { ChildProcess, exec } from 'child_process';
import { terminateProcess } from '../process/terminateProcess';
import { buildCommand } from './buildCommand';
import { CmdOptions } from './CmdOptions';
import { getAllCmdOptions } from './getAllCmdOptions';
import { getExecOptions } from './getExecOptions';

export interface TestServerOptions {
  serverReadyOutput:RegExp;
}

export function startUXPinMergeServer(cmdOptions:CmdOptions, options:TestServerOptions):Promise<() => Promise<void>> {
  return new Promise((resolve, reject) => {
    const command:string = buildCommand(getAllCmdOptions(cmdOptions));
    const subprocess:ChildProcess = exec(command, getExecOptions());
    onServerReady(subprocess, options.serverReadyOutput, () => resolve(() => terminateProcess(subprocess.pid)));
    onFailure(subprocess, (error) => reject(error));
  });
}

function onServerReady(subprocess:ChildProcess, serverReadyOutput:RegExp, onReady:() => void):void {
  subprocess.stdout.on('data', (data) => {
    if (data.toString().match(serverReadyOutput)) {
      onReady();
    }
  });
}

function onFailure(subprocess:ChildProcess, callback:(error:any) => void):void {
  let errorOut:string = '';
  subprocess.stderr.on('data', (data) => {
    console.error(data);
    errorOut += data;
  });
  subprocess.on('close', () => callback(errorOut));
  subprocess.on('error', (data) => callback(data));
}

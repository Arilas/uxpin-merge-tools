import { copySync, existsSync, PathLike } from 'fs-extra';
import { resolve } from 'path';
import { Framework } from '../../../framework/framework';
import { printLine } from '../../../utils/console/printLine';
import { PrintColor } from '../../../utils/console/PrintOptions';
import { InitProgramArgs } from '../../args/ProgramArgs';
import { getProjectRoot } from '../../args/providers/paths/getProjectRoot';
import { Step } from '../Step';

function getResourcesPath():PathLike {
  return `../../../framework/${Framework.currentFrameworkName}/resources`;
}

export interface DefaultFile {
  source:PathLike;
  target:PathLike;
}

function getDefaultConfigFiles():DefaultFile[] {
  return [
    { source: `uxpin.config.js`, target: 'uxpin.config.js' },
    { source: `uxpin.webpack.config.js`, target: 'uxpin.webpack.config.js' },
    { source: `UXPinWrapper.js`, target: 'src/components/UXPinWrapper/UXPinWrapper.js',
    },
  ];
}

function getExampleComponent():DefaultFile {
  return {
    source: `Button`,
    target: 'src/components/Button',
  };
}

export function getInitCommandSteps(args:InitProgramArgs):Step[] {
  return [
    { exec: copyDefaultFiles(args), shouldRun: true },
  ];
}

function copyDefaultFiles(args:InitProgramArgs):any {
  const projectRoot:PathLike = getProjectRoot(args);
  try {
    // config files
    getDefaultConfigFiles().forEach((file) => {
      const filePath:PathLike = `${projectRoot}/${file.target}`;
      if (!existsSync(resolve(__dirname, `${getResourcesPath()}/${file.source}`))) {
        throw new Error(`🛑 Init command does not support framework - ${Framework.currentFrameworkName}`);
      }

      if (!existsSync(filePath)) {
        copySync(resolve(__dirname, `${getResourcesPath()}/${file.source}`), filePath);
        printLine(`✅ Successfully created ${filePath}`, { color: PrintColor.GREEN });
      }
    });

    // default component
    const componentPath:PathLike = `${projectRoot}/${getExampleComponent().target}`;
    if (!existsSync(componentPath)) {
      copySync(resolve(__dirname, `${getResourcesPath()}/${getExampleComponent().source}`), componentPath);
      printLine(`✅ Successfully created example component in ${componentPath}`, { color: PrintColor.GREEN });
    }
  } catch (error) {
    printLine('🛑 There was an error while copying default config files. Please try again.', { color: PrintColor.RED });
    throw new Error(error.message);
  }
}

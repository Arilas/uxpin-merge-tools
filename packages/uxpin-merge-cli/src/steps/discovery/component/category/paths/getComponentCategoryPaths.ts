import * as safe from 'colors/safe';
import globby = require('globby');
import pMap from 'p-map';
import { isArray } from 'util';
import { printWarning } from '../../../../../utils/console/printLine';
import { CategoryConfig } from '../../../config/CliConfig';

const NEGATED_PATTERN_MATCH:string = '!';

export async function getComponentCategoryPaths(projectRoot:string, categoryConfig:CategoryConfig):Promise<string[]> {
  let hasInvalidPatterns:boolean = false;
  const patterns:string[] = isArray(categoryConfig.include) ? categoryConfig.include : [categoryConfig.include];
  const positivePatterns:string [] = patterns.filter((pattern) => !pattern.startsWith(NEGATED_PATTERN_MATCH));
  // First check if each non negated pattern produces any paths
  await pMap(positivePatterns, async (pattern:string):Promise<string[]> => {
    const newPaths:string[] = await globby(pattern, { cwd: projectRoot });

    if (newPaths.length === 0) {
      hasInvalidPatterns = true;
      printWarning(`👉 Pattern ${safe.bold(pattern)} didn't match any files.`);
    }

    return newPaths;
  });

  // If some pattern doesn't provide some files, throw an error as this may result to broken library to be pushed
  // (e.g. when some files won't be commited to the repository)
  if (hasInvalidPatterns) {
    throw new Error(`🚫 Please check your config file and fix wrong patterns.`);
  }

  // Finally return paths for all patterns, as this may produce different results than
  // checking each pattern separately
  return globby(patterns, { cwd: projectRoot });
}

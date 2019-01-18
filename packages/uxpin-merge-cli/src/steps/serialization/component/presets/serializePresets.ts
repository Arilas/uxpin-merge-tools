import { WarningDetails } from '../../../../common/warning/WarningDetails';
import { ComponentPresetInfo } from '../../../discovery/component/ComponentInfo';
import { getPresetName } from '../../../discovery/component/presets/presetFileNameParser';
import { getPresetElementsMap } from './getPresetElementsMap';
import { getUniqPresetImportName } from './jsx/bundle/getUniqPresetImportName';
import { PresetsBundle } from './jsx/bundle/PresetsBundle';
import { JSXSerializedElement } from './jsx/JSXSerializationResult';
import { PresetsSerializationResult } from './PresetsSerializationResult';

export async function serializePresets(
  bundle:PresetsBundle,
  infos:ComponentPresetInfo[],
):Promise<PresetsSerializationResult> {
  const aggregator:PresetsSerializationResult = { result: [], warnings: [] };
  return infos
    .map(thunkSerializePreset(bundle))
    .reduce((result, presetSerializationResult) => {
      [].push.apply(result.result, presetSerializationResult.result);
      [].push.apply(result.warnings, presetSerializationResult.warnings);
      return result;
    }, aggregator);
}

function thunkSerializePreset(bundle:PresetsBundle):(info:ComponentPresetInfo) => PresetsSerializationResult {
  return ({ path }) => {
    try {
      const presetData:JSXSerializedElement = bundle[getUniqPresetImportName(path)];
      const { result: elements, warnings } = getPresetElementsMap(presetData, { result: {}, warnings: [] });
      return {
        result: [{
          elements,
          name: getPresetName(path),
          rootId: presetData.props.uxpId,
        }],
        warnings: decorateWithSourcePath(warnings, path),
      };
    } catch (error) {
      return getResultForInvalidPreset(path, error);
    }
  };
}

function decorateWithSourcePath(warnings:WarningDetails[], sourcePath:string):WarningDetails[] {
  warnings.forEach((warning) => {
    warning.sourcePath = sourcePath;
  });
  return warnings;
}

function getResultForInvalidPreset(sourcePath:string, originalError:Error):PresetsSerializationResult {
  const warning:WarningDetails = {
    message: 'Cannot serialize component preset',
    originalError,
    sourcePath,
  };
  return { result: [], warnings: [warning] };
}

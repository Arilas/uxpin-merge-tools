import { flatMap, isArray, isEmpty, reduce } from 'lodash';
import v4 = require('uuid/v4');
import { Warned } from '../../../../common/warning/Warned';
import { WarningDetails } from '../../../../common/warning/WarningDetails';
import {
  ComponentPresetElement,
  ComponentPresetElementProps,
  PresetElementReference,
} from '../presets/ComponentPreset';
import { isJSXSerializedElement } from '../presets/isJSXSerializedElement';
import { AnySerializedElement, JSXSerializedElement, PartialProps } from '../presets/jsx/JSXSerializationResult';
import { withoutUnsupportedElements } from '../presets/withoutUnsupportedElements';

export interface PresetElementsMap {
  [id:string]:ComponentPresetElement;
}

export interface PartialComponentPreset {
  elements:PresetElementsMap;
  rootId:string;
}

export function collectStoryElements(
  element:AnySerializedElement,
):Warned<PartialComponentPreset | undefined> {
  if (!isJSXSerializedElement(element)) {
    return { result: undefined, warnings: [] };
  }

  const mapper:PresetElementMapper = PresetElementMapper.from(element);

  return {
    result: {
      elements: mapper.createTreeContentMap(),
      rootId: mapper.getId(),
    },
    warnings: mapper.getWarnings(),
  };
}

class PresetElementMapper {

  private allChildren:PresetElementMapper[] = [];
  private id:string;
  private definition:ComponentPresetElement;

  constructor(private jsxElement:JSXSerializedElement) {
    this.id = v4();
    const { children, name, props } = jsxElement;
    this.definition = {
      name,
      props: {
        ...this.replaceElementsWithReferencesInProps(props),
        ...this.replaceElementsWithReferencesInChildren(children),
      },
    };
  }

  public static from(jsxElement:JSXSerializedElement):PresetElementMapper {
    return new PresetElementMapper(jsxElement);
  }

  public getId():string {
    return this.id;
  }

  public getDefinition():ComponentPresetElement {
    return this.definition;
  }

  public getReference():PresetElementReference {
    return {
      uxpinPresetElementId: this.id,
    };
  }

  public createTreeContentMap():PresetElementsMap {
    const accumulator:PresetElementsMap = {
      [this.id]: this.definition,
    };
    return this.reduceChildDefinitions(accumulator);
  }

  public getWarnings():WarningDetails[] {
    return flatMap(this.allChildren, (m) => m.getWarnings());
  }

  private replaceElementsWithReferencesInChildren(children:AnySerializedElement[] | undefined):MapChildrenResult {
    if (!isArray(children) || isEmpty(children)) {
      return {};
    }

    if (children.length === 1 && typeof children[0] === 'string') {
      return { children: children[0] as string };
    }
    return {
      children: children.map((child) => this.getPresetElementReference(child)),
    };
  }

  private replaceElementsWithReferencesInProps(props:PartialProps):ComponentPresetElementProps {
    return reduce<ComponentPresetElementProps, PartialProps>(props, (mappedProps, propValue, propName) => {
      if (isJSXSerializedElement(propValue)) {
        mappedProps[propName] = this.getPresetElementReference(propValue);
      } else {
        mappedProps[propName] = withoutUnsupportedElements(propValue);
      }
      return mappedProps;
    }, {});
  }

  private getPresetElementReference(child:AnySerializedElement):PresetElementReference | string {
    if (isJSXSerializedElement(child)) {
      const childMapper:PresetElementMapper = PresetElementMapper.from(child);
      this.allChildren.push(childMapper);
      return childMapper.getReference();
    }

    return child;
  }

  private reduceChildDefinitions(accumulator:PresetElementsMap):PresetElementsMap {
    this.allChildren.forEach((child) => {
      accumulator[child.getId()] = child.getDefinition();
      child.reduceChildDefinitions(accumulator);
    });
    return accumulator;
  }

}

interface MapChildrenResult {
  children?:Array<PresetElementReference | string> | string;
}

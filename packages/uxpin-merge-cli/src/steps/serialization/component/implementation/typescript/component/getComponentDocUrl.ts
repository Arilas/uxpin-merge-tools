import * as ts from 'typescript';
import { getUXpinDocUrlComment } from '../comments/getUXpinDocUrlComment';
import { ComponentDeclaration } from './getPropsTypeAndDefaultProps';

export function getComponentDocUrl(component:ComponentDeclaration):string | ts.NodeArray<ts.JSDocComment> | undefined {
  const componentDocUrl:ts.JSDocTag | undefined = getUXpinDocUrlComment(component);

  return componentDocUrl?.comment;
}

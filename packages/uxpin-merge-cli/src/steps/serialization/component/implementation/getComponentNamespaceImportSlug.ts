import { JSDocComment, NodeArray } from "typescript";

export const NAMESPACE_NAME_DELIMITER:string = '.';
export const NAMESPACE_IMPORT_SLUG_DELIMITER:string = '_';

export function getComponentNamespaceImportSlug(namespaceName:string | NodeArray<JSDocComment>, componentName:string):string {
  return [
    ...(typeof namespaceName === 'string' ? namespaceName : namespaceName[0].text).split(NAMESPACE_NAME_DELIMITER),
    componentName,
  ].join(NAMESPACE_IMPORT_SLUG_DELIMITER);
}

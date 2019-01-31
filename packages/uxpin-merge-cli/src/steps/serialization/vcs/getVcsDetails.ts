import { getApiDomain } from '../../../services/UXPin/getApiDomain';
import { getLatestCommitHash } from '../../../services/UXPin/getLatestCommitHash';
import { BuildOptions } from '../../../steps/building/BuildOptions';
import { ProjectPaths } from '../../../steps/discovery/paths/ProjectPaths';
import { ComponentCategory } from '../component/categories/ComponentCategory';
import { MovedFilePathsMap, VCSDetails } from '../DesignSystemSnapshot';
import { filterMovedFiles } from './filterMovedFiles';
import { getRepositoryAdapter } from './repositories/getRepositoryAdapter';
import { RepositoryAdapter, RepositoryPointer } from './repositories/RepositoryAdapter';

export async function getVscDetails(
  paths:ProjectPaths,
  buildOptions:BuildOptions,
  categorizedComponents:ComponentCategory[],
):Promise<VCSDetails> {
  const repositoryAdapter:RepositoryAdapter = await getRepositoryAdapter(paths.projectRoot);
  const repositoryPointer:RepositoryPointer = await repositoryAdapter.getRepositoryPointer();
  let latestCommitHash:string|null = null;

  if (buildOptions.token) {
    latestCommitHash = await getLatestCommitHash(
      getApiDomain(buildOptions.uxpinApiDomain!),
      repositoryPointer.branchName,
      buildOptions.token,
    );
  }

  const vcs:VCSDetails = {
    branchName: repositoryPointer.branchName,
    commitHash: repositoryPointer.commit.hash,
  };

  if (latestCommitHash) {
    const movedFiles:MovedFilePathsMap = await repositoryAdapter.getMovedFiles(
      latestCommitHash,
      repositoryPointer.commit.hash,
    );

    vcs.movedObjects = {
      components: filterMovedFiles(movedFiles, categorizedComponents),
      diffSourceCommitHash: latestCommitHash,
    };
  }

  return vcs;
}

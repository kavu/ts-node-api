import { IRepositoriesProvider } from '../providers';

export interface IService {
  execute(input: object): Promise<object>;
}

export abstract class BaseService {
  public readonly repositoriesProvider: IRepositoriesProvider;

  constructor(repositoriesProvider: IRepositoriesProvider) {
    this.repositoriesProvider = repositoriesProvider;
  }
}

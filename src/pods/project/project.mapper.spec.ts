import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';

describe('Project mapper spec', () => {
  it('should map a project from API to view model', () => {
    const project: apiModel.Project = {
      id: '1',
      name: 'Project 1',
      isActive: true,
      employees: [
        {
          id: '1',
          employeeName: 'Employee 1',
        },
        {
          id: '2',
          employeeName: 'Employee 2',
        },
      ],
    };
    const expected: viewModel.Project = {
      id: '1',
      name: 'Project 1',
      isActive: true,
      employees: [
        {
          id: '1',
          employeeName: 'Employee 1',
        },
        {
          id: '2',
          employeeName: 'Employee 2',
        },
      ],
    };

    const result = mapProjectFromApiToVm(project);

    expect(result).toEqual(expected);
  });

  it('should return an empty project view model if input is null or undefined', () => {
    const project: apiModel.Project | null | undefined = null;
    const expected: viewModel.Project = viewModel.createEmptyProject();

    const result = mapProjectFromApiToVm(project);

    expect(result).toEqual(expected);
  });
});

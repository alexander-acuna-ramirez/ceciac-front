import { NetworkService, CeciacService } from 'src/services';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

async function accessGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  try {
    const networkService = new NetworkService();
    const network: string = to.params.id as string;
    const response = await networkService.userManagePermissions(network, to.name as string);
    if (response.data.success) {
      next();
    }
    next({ name: 'Unauthorized' });
  } catch (e) {
    next({ name: 'Unauthorized' });
  }

}


async function accessCreationGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  try {
    const networkService = new NetworkService();
    const network: string = to.params.network as string;
    const response = await networkService.userCreatePermissions(network);
    if (response.data.success) {
      next();
    }
    next({ name: 'Unauthorized' });
  } catch (e) {
    next({ name: 'Unauthorized' });
  }

}

async function accessCeciacGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  try {
    const ceciacService = new CeciacService();
    const response = await ceciacService.check();
    if (response.data.success) {
      next();
    }
    next({ name: 'Unauthorized' });
  } catch (e) {
    next({ name: 'Unauthorized' });
  }

}

export { accessGuard, accessCreationGuard, accessCeciacGuard };

let permissions: Record<string, boolean> = {};
let allPermissions = false;

export const setPermissions = (permissionArr: Array<string>) => {
  allPermissions = permissionArr.includes('*:*:*');
  if (!allPermissions) {
    permissions = permissionArr.reduce((acc: Record<string, boolean>, cur) => {
      acc[cur] = true;
      return acc;
    }, {});
  }
};

export const checkPermission = (arr: Array<string>) =>
  allPermissions || arr.some((item) => !item || permissions[item]);

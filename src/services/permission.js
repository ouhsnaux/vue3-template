let permissions = {};
let allPermissions = false;

export const setPermissions = (permissionArr) => {
  allPermissions = permissionArr.includes('*:*:*');
  if (!allPermissions) {
    permissions = permissionArr.reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {});
  }
};

export const checkPermission = (arr) =>
  allPermissions || arr.some((item) => !item || permissions[item]);

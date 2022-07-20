import Permission from "../models/permission.js";
import RolePermission from "../models/rolepermission.js";

const Helper = {
  checkPermission: (roleId, permName) => {
    return new Promise((resolve, reject) => {
      Permission.findOne({
        where: {
          name: permName,
        },
      })
        .then((perm) => {
          RolePermission.findOne({
            where: {
              role_id: roleId,
              permission_id: perm.id,
            },
          })
            .then((rolePermission) => {
              if (rolePermission) {
                resolve(rolePermission);
              } else {
                reject({ message: "Forbidden" });
              }
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch(() => {
          reject({ message: "Forbidden" });
        });
    });
  },
};

export default Helper;

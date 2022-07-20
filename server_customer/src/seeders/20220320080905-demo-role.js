'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Roles',
      [
        {
          role_id: "B4552253-F8D4-4696-9254-0AF6807E1B1A",
          name: "Change password",
        },
        {
          role_id: "A54FA54C-04A8-4C56-9993-1ECC797DA1A4",
          name: "Bán hàng",
        },
        {
          role_id: "26B37F7C-133D-4E02-95C5-332475738C5F",
          name: "CRM",
        },
        {
          role_id: "94C7AFC2-1B38-4D3D-9851-3A1419016AE3",
          name: "Quản lý",
        },
        {
          role_id: "B896936E-EF5A-4332-8872-46301343805C",
          name: "Xem bao cao",
        },
        {
          role_id: "810FBD0F-6009-46DB-B8E1-65E232FF16F9",
          name: "Mua hàng",
        },
        {
          role_id: "3878F2C4-631A-48DE-9148-661901A58710",
          name: "ALL",
        },
        {
          role_id: "80A5E2B3-11F9-4E5A-992F-710DE8CB1B73",
          name: "Kho",
        },
        {
          role_id: "FEE744FB-18A7-4788-8C4A-88F73D6C73F8",
          name: "Off",
        },
        {
          role_id: "38D1ADCD-9148-4B34-84E8-A6025FF070AE",
          name: "Administrators ",
        },
      ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

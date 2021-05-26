'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let authorIds =  await queryInterface.bulkInsert(
      'Authors', 
      [{
        firstname: 'John',
        lastname: 'Doe',
        email: 'jd1@email.co',
        birthday: new Date(1980, 6, 31),
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'jd2@email.co',
        birthday: new Date(1983, 10, 28),
        createdAt: new Date(), 
        updatedAt: new Date()
      }], 
      { returning: ['id'] }
    );
    await queryInterface.bulkInsert(
      'Publications', 
      [{
        date: new Date(new Date(1995, 6, 13).toDateString()),
        title: 'Title 1.0',
        body: 'In the down section we delete videos column before the courses column because of the foreign key constraint.',
        createdAt: new Date(), 
        updatedAt: new Date(),
        AuthorId: authorIds[0].id
      },
      {
        date: new Date(new Date(1996, 2, 17).toDateString()),
        title: 'Title 2.0',
        body: 'You can loop through the returned objects/ids and insert the nested objects using bulkInsert as well.',
        createdAt: new Date(), 
        updatedAt: new Date(),
        AuthorId: authorIds[1].id
      },
      {
        date: new Date(new Date(1999, 7, 17).toDateString()),
        title: 'Title 2.1',
        body: 'Also, you may pass an array with the fields you are interested in, e.g. the ID.',
        createdAt: new Date(), 
        updatedAt: new Date(),
        AuthorId: authorIds[1].id
      }], 
      { }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Authors', null, {});
    await queryInterface.bulkDelete('Publications', null, {});
  }
};

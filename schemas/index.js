const yup = require("yup");
const authorSchemaCreate = yup.object()
                            .shape({
                                firstname: yup.string().required()
                                    .min(1, 'Enter at least 1 letter')
                                    .max(15, 'Cannot be more than 15 characters'),
                                lastname: yup.string().required()
                                    .min(1, 'Enter at least 1 letter')
                                    .max(15, 'Cannot be more than 15 characters'),
                                email: yup.string().required()
                                    .email('Please enter a valid email address'),
                                birthday: yup.date().required()
                            });
const authorSchemaUpdate = yup.object()
                            .shape({
                                firstname: yup.string()
                                    .min(1, 'Enter at least 1 letter')
                                    .max(15, 'Cannot be more than 15 characters'),
                                lastname: yup.string()
                                    .min(1, 'Enter at least 1 letter')
                                    .max(15, 'Cannot be more than 15 characters'),
                                email: yup.string().email('Please enter a valid email address'),
                                birthday: yup.date()
                            });
const publicationSchemaCreate = yup.object()
                                .shape({
                                    date: yup.date().default(function () {
                                        return new Date();
                                    }),
                                    title: yup.string().required()
                                        .min(1, 'Enter at least 1 letter')
                                        .max(25, 'Cannot be more than 25 characters'),
                                    body: yup.string().required()
                                        .min(1, 'Enter at least 1 letter')
                                        .max(150, 'Cannot be more than 150 characters'),
                                    AuthorId: yup.number().required().positive().integer()
                                });
const publicationSchemaUpdate = yup.object()
                                .shape({
                                    date: yup.date().default(function () {
                                        return new Date();
                                    }),
                                    title: yup.string().min(1, 'Title must have at least 1 letter')
                                        .max(25, 'Cannot be more than 25 characters'),
                                    body: yup.string().min(1, 'Body must have at least 1 letter')
                                        .max(150, 'Cannot be more than 150 characters')
                                });
 
module.exports = {
    authorSchemaValidatorCreate: authorSchemaCreate,
    authorSchemaValidatorUpdate: authorSchemaUpdate,
    publicationSchemaValidatorCreate: publicationSchemaCreate,
    publicationSchemaValidatorUpdate: publicationSchemaUpdate
}

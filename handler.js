'use strict';
const db = require("./models");
const { 
  authorSchemaValidatorCreate, 
  authorSchemaValidatorUpdate,
  publicationSchemaValidatorCreate, 
  publicationSchemaValidatorUpdate
} = require("./schemas");

// Author's CRUD:

module.exports.createAuthor = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const validatedData = await authorSchemaValidatorCreate.validate(data);
    const res = await db["Author"].create(validatedData);
    // console.log("res object is " , res);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Author created sucessfully!"
        },
        null,
        2
      ),
    };
  } catch (err) {
    console.log(err.statusCode);
    return {
      statusCode: err.statusCode || 400,
      body: JSON.stringify(
        {
          message: `Error creating the author: ${err.message}.`
        },
        null,
        2
      ),
    };
  }
};

module.exports.getAuthor = async (event) => {
  const { id } = event.pathParameters;
  let res, statusCode = 200;
  if (!isNaN(id)){
    res = await db["Author"].findAll({
      where: {
        id: id
      }  
    });
  } else {
    statusCode = 400;
  }
  return {
    statusCode: statusCode,
    body: JSON.stringify(
      {
        message: res
      },
      null,
      2
    ),
  };
};

module.exports.getAllAuthors = async () => {
  const res = await db["Author"].findAll({});
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: res
      },
      null,
      2
    ),
  };
};

module.exports.updateAuthor = async (event) => {
  try {
    const { id } = event.pathParameters;
    if (!isNaN(id)){
      const data = JSON.parse(event.body);
      const validData = await authorSchemaValidatorUpdate.validate(data);
      const res = await db["Author"].update(
        validData, 
        {where: {id: id}}
      );
      //console.log("res object is " , res);
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: "Author updated sucessfully!"
          },
          null,
          2
        ),
      };
    } else {
      throw "Incorrect author's ID.";
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 400,
      body: JSON.stringify(
        {
          message: `Error updating the author: ${err.message}`
        },
        null,
        2
      ),
    };
  }
};

module.exports.deleteAuthor = async (event) => {
  try {
    const { id } = event.pathParameters;
    let res, statusCode = 200;
    if (!isNaN(id)){
      await db["Publication"].destroy({
        where: {AuthorId: id}  
      });
      res = await db["Author"].destroy({
        where: {id: id}  
      });
    } else {
      statusCode = 400;
    }
    return {
      statusCode: statusCode,
      body: JSON.stringify(
        {
          message: res
        },
        null,
        2
      ),
    };
  } catch (err) {
    console.log(err);
  }
};


// Publications' CRUD:

module.exports.createPublication = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const validatedData = await publicationSchemaValidatorCreate.validate(data);
    const res = await db["Publication"].create(validatedData);
    // console.log("res object is " , res);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Publication created sucessfully!"
        },
        null,
        2
      ),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 400,
      body: JSON.stringify(
        {
          message: `Error creating the author: ${err.message}.`
        },
        null,
        2
      ),
    };
  }
};

module.exports.getAllPublications = async () => {
  try {
    const res = await db["Publication"].findAll({});
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: res
        },
        null,
        2
      ),
    };
  } catch (err) {
    console.log(err);
  }
};

module.exports.getPublication = async (event) => {
  try {
    const { id } = event.pathParameters;
    let res, statusCode = 200;
    if (!isNaN(id)){
      res = await db["Publication"].findAll({
        where: {
          id: id
        }  
      });
    } else {
      statusCode = 400;
    }
    return {
      statusCode: statusCode,
      body: JSON.stringify(
        {
          message: res
        },
        null,
        2
      ),
    };
  } catch (err) {
    console.log(err);
  }
};

module.exports.getAuthorPublications = async (event) => {
  try {
    const { authorId } = event.pathParameters;
    let res, statusCode = 200;
    if (!isNaN(authorId)){
      res = await db["Publication"].findAll({
        where: {
          AuthorId: authorId
        }  
      });
    } else {
      statusCode = 400;
    }
    return {
      statusCode: statusCode,
      body: JSON.stringify(
        {
          message: res
        },
        null,
        2
      ),
    };
  } catch (err) {
    console.log(err);
  }
};

module.exports.updatePublication = async (event) => {
  try {
    const { id } = event.pathParameters;
    if (!isNaN(id)){
      let data = JSON.parse(event.body);
      if (data.hasOwnProperty("AuthorId")) {
        delete data.AuthorId; // Publication's author must not be updated.
      }
      const validData = await publicationSchemaValidatorUpdate.validate(data);
      const res = await db["Publication"].update(
        validData, 
        {where: {id: id}}
      );
      //console.log("res object is " , res);
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: "Publication updated sucessfully!"
          },
          null,
          2
        ),
      };
    } else {
      throw "Incorrect publication ID.";
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 400,
      body: JSON.stringify(
        {
          message: `Error updating the author: ${err.message}`
        },
        null,
        2
      ),
    };
  }
};

module.exports.deletePublication = async (event) => {
  try {
    const { id } = event.pathParameters;
    let res, statusCode = 200;
    if (!isNaN(id)){
      res = await db["Publication"].destroy({
        where: {
          id: id
        }  
      });
    } else {
      statusCode = 400;
    }
    return {
      statusCode: statusCode,
      body: JSON.stringify(
        {
          message: res
        },
        null,
        2
      ),
    };
  } catch (err) {
    console.log(err);
  }
};
const httpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const forMethod = ({ getHandler, postHandler, putHandler, deleteHandler }) => (
  req,
  res
) => {
  const { method } = req;
  if (method === httpMethods.GET && getHandler) {
    return getHandler(req, res);
  }

  if (method === httpMethods.POST && postHandler) {
    return postHandler(req, res);
  }

  if (method === httpMethods.PUT && putHandler) {
    return putHandler(req, res);
  }

  if (method === httpMethods.DELETE && deleteHandler) {
    return deleteHandler(req, res);
  }

  req.status(404).end();
};

export { httpMethods, forMethod };

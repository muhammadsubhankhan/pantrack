// eslint-disable-next-line consistent-return
export default (...allowedRoles) => (req, res, next) => {
  if (!req?.roles) return res.sendStatus(401);
  const rolesArray = [...allowedRoles];

  const result = req.roles.map((role) => rolesArray.includes(role)).find((val) => val === true);
  if (!result) return res.sendStatus(401);
  next();
};

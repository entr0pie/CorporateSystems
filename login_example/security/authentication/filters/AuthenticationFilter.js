import { ioc } from "../../../ioc/container";

/**
 * Creates a Authentication Filter for the required roles
 *
 * @param {string[]?} requiresRoles
 * @returns express middleware
 */
export function AuthenticationFilter(requiresRoles) {
  return (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(403).send();
    }

    try {
      const validAuthentication = ioc.AuthenticationManager.validate(token);

      if (!requiresRoles || requiresRoles.length == 0) {
        req.authentication = validAuthentication;
        return next();
      }

      for (let role in requiresRoles) {
        if (!validAuthentication.getAuthorities().includes(role)) {
          return res.status(403).send();
        }
      }

      req.authentication = validAuthentication;
      return next();
    } catch (e) {
      return res.status(403).send();
    }
  };
}

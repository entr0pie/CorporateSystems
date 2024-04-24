import { ioc } from "../../../ioc/container.js";

/**
 * Creates a Authentication Filter for the required roles
 *
 * @param {string[]?} requiresRoles
 * @returns express middleware
 */
export function AuthenticationFilter(requiresRoles) {
  return async (req, res, next) => {
    const token = req.headers["authorization"].split(' ')[1];

    if (!token) {
      return res.status(403).send();
    }

    try {
      const validAuthentication = await ioc.AuthenticationManager.validate(token);

      if (!requiresRoles || requiresRoles.length == 0) {
        req.auth = validAuthentication;
        return next();
      }

      for (let role in requiresRoles) {
        if (!validAuthentication.getAuthorities().includes(role)) {
          return res.status(403).send();
        }
      }

      req.auth = validAuthentication;
      return next();
    } catch (e) {
      return res.status(403).send();
    }
  };
}

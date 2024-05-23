import validator from 'express-validator';
const { validationResult } = validator;

/**
 * Validate the content of the request before reaching the controller.
 * 
 * @param {validator.ValidationChain} chain express validator chain
 */
export function RequestValidator(...chain) {
    return (req, res, next) => {
        let index = 0;

        const executeChain = () => {
            if (index < chain.length) {
                const validator = chain[index];
                index++;
                validator(req, res, executeChain);
            } else {
                const result = validationResult(req);

                if (!result.isEmpty()) {
                    return res.status(400).json({ errors: result.array() });
                }

                return next();
            }
        }

        executeChain();
    }
}
import { colors } from './colors.js';
import formatDate from '../utils/formatDate.js';
const { cyan } = colors;
const clog = (req, res, next) => {
	const reqInfo = {
		method: req.method,
		url: req.url,
		host: req.hostname,
		date: formatDate(Date.now()),
		ip: req.connection.remoteAddress || '',
		body: req.body || {},
	};

	switch (req.method) {
		case 'GET': {
			console.info(
				`📗 ${cyan}${reqInfo.method} request to ${req.path} from ${reqInfo.ip} on ${reqInfo.date}`
			);
			// console.log(reqInfo);
			break;
		}
		case 'POST': {
			console.info(
				`📘 ${cyan}${req.method} request to ${req.path} from ${reqInfo.ip} on ${reqInfo.date}`
			);
			// console.log(reqInfo);
			break;
		}
		default:
			console.log(
				`📙 ${cyan}${req.method} request to ${req.path} from ${reqInfo.ip} on ${reqInfo.date}`
			);
	}

	next();
};
export default clog;

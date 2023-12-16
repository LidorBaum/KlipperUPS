const moment = require('moment');
const logger = require('./logger');
const { parseList, time, parseUpsVars } = require('./helpers');
const NUT = require('./node-nut');
const config = require('./env');

logger.setLevel(config.LOG_LEVEL);

logger.info('environment variables:\n', config);

// nut settings
const nut = new NUT(config.NUT_PORT, config.NUT_ADDRESS);
console.log("nut", nut)
// https://networkupstools.org/docs/man/genericups.html
const statusses = Object.freeze({
	OL: 1, // online
	'OL CHRG': 2, // online & charging
	'OL CHRG LB': 2, // online low battery
	'OB DISCHRG': 3, // on battery
	LB: 4, // low battery,
	SD: 5 // shutdown load
});

// router
// const 
// server.get('/devices', (req, res) => {
// 	const startDateTime = moment();
// 	logger.logRequest('nut-http.devices.list');

// 	connectNut();

// 	nut
// 	.getUpsList()
// 	.then((list) => {
// 		if (req.query.parsed && req.query.parsed === 'true') list = parseList(list);

// 		const endDateTime = moment();
// 		logger.debug(`processing took ${time(startDateTime, endDateTime)}`);

// 		res.send(list);
// 		return list;
// 	})
// 	.catch((err) => {
// 		logger.error(err);
// 		res.send(500, { code: 500, message: `an internal error occurred ${err}` });
// 		return err;
// 	});
// });

let LOCK = 0

const getDev = () => {
	const startDateTime = moment();
	const ups = "3dpups";
	logger.logRequest('nut-http.devices.getUps', ups);

	setTimeout((rq, rs) => {
		connectNut();

		nut
			.getUpsVars(ups)
			.then((vars) => {
				// if (rq.query.parsed && rq.query.parsed === 'true') {
				// 	vars = parseUpsVars(vars);
				// 	vars.ups.statusnum = statusses[vars.ups.status];
				// }

				const endDateTime = moment();
				logger.debug(`processing took ${time(startDateTime, endDateTime)}`);

				// rs.send(vars);
				if (LOCK > 0) LOCK--;
				return vars;
			})
			.catch((err) => {
				// if (err === 'UNKNOWN-UPS') {
				// 	logger.error('unknown ups requested');
				// 	rs.send(404, { code: 404, message: `UPS '${ups}' is not unknown at ${config.NUT_ADDRESS}` });
				// 	return err;
				// }

				logger.error(err);
				// rs.send(500, { code: 500, message: `an internal error occurred ${err}` });
				return err;
			});
	}, LOCK * config.LOCK_TIMEOUT);

	LOCK++;
};

// server.listen(config.SERVER_PORT, () => {
// 	logger.info(`nut-http listening on port ${config.SERVER_PORT}`);
// });

function connectNut() {
	if (!nut.connected) nut.connect();
}
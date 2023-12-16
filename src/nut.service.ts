import { Injectable } from '@nestjs/common';
import {Nut} from './node-nut'
const moment = require('moment');


@Injectable()
export class NutService {
            private nut: any
            private LOCK: number
    constructor(){
        const nut = new Nut(3493, "10.100.102.17");
        this.nut  = nut
        this.LOCK = 0

    }


 getDev = () => {
    console.log("DEV GET")
	const startDateTime = moment();
	const ups = "3dpups";

	setTimeout((rq, rs) => {
		this.connectNut();

		this.nut
			.getUpsVars(ups)
			.then((vars) => {
				// if (rq.query.parsed && rq.query.parsed === 'true') {
				// 	vars = parseUpsVars(vars);
				// 	vars.ups.statusnum = statusses[vars.ups.status];
				// }

				const endDateTime = moment();

				// rs.send(vars);
				if (this.LOCK > 0) this.LOCK--;
                console.log(vars)
				return vars;
			})
			.catch((err) => {
				// if (err === 'UNKNOWN-UPS') {
				// 	logger.error('unknown ups requested');
				// 	rs.send(404, { code: 404, message: `UPS '${ups}' is not unknown at ${config.NUT_ADDRESS}` });
				// 	return err;
				// }

				// rs.send(500, { code: 500, message: `an internal error occurred ${err}` });
				return err;
			});
	}, this.LOCK * 10);

	this.LOCK++;
};

// server.listen(config.SERVER_PORT, () => {
// 	logger.info(`nut-http listening on port ${config.SERVER_PORT}`);
// });

 connectNut() {
	if (!this.nut.connected) this.nut.connect();
}

  getHello(): string {
    return 'Hello World!';
  }
}

import express from 'express';
import { Request, Response } from 'express';
import path from 'path';

interface Options {
	port: number;
	public_path?: string;
}

export class Server {
	private app = express();
	private port: number;
	private public_path: string;

	constructor(private options: Options) {
		const { port, public_path = 'public' } = options;
		this.port = port;
		this.public_path = public_path;
	}

	async start() {
		//middlewares

		//folder public
		this.app.use(express.static(this.public_path));

		this.app.get('*', (req: Request, res: Response) => {
			const indexPath = path.join(
				__dirname + `../../../${this.public_path}/index.html`
			);
			res.sendFile(indexPath);
		});

		this.app.listen(this.port, () =>
			console.log(`Server running on port ${this.port}`)
		);
	}
}

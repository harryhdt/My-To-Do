import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'dev.harryhdt.mytodo',
	appName: 'My To Do',
	webDir: 'build',
	server: {
		androidScheme: 'https'
		// url: 'http://YOUR_IP:5173',
		// cleartext: true
	},
	plugins: {}
};

export default config;

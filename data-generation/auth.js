import jwt from 'jsonwebtoken';

function createJWT() {
	const secret = process.env.PGRST_JWT_SECRET || 'reallyreallyreallyreallyverysafe';
	return jwt.sign({role: 'rsd_admin'}, secret, {expiresIn: '2m'});
}

export const token = createJWT();

export const headers = {
	'Content-Type': 'application/json',
	Authorization: 'bearer ' + token,
	Prefer: 'return=representation,resolution=ignore-duplicates',
};

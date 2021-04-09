const reg1 = /_([a-z])/g;
const toCamel = (all, a) => a.toUpperCase();

const getKey = (opt, key) => {
	return typeof opt === "function" ? opt(key) : ((opt || {})[key] || key.toLowerCase().replace(reg1, toCamel));
};

const getVal = (val) => {
	if(typeof val !== "string") return val;
	if(val.charAt(0) === '\\') return val.substr(1);

	val = val.trim();

	if(val === 'true') return true;
	if(val === 'false') return false;
	if(val === 'null') return null;
	if(val === 'undefined') return null;
	if(val === '0' || /^-?[1-9][0-9]*$/.test(val)) return parseInt(val);

	const f = val.charAt(0), l = val.charAt(val.length - 1);
	if(f === '[' && l === ']' || f === '{' && l === '}') {
		try {
			return JSON.parse(val);
		}
		catch(e) {}
	}

	return val;
};

function readEnv(prefix, alt = {}, def = {}) {
	prefix = prefix.toUpperCase() + '_';
	if(prefix.length < 2) {
		return def
	}
	const len = prefix.length;
	const options = {};
	Object.keys(process.env).forEach(key => {
		if(key.length > len && key.startsWith(prefix)) {
			options[getKey(alt, key.substr(len))] = getVal(process.env[key]);
		}
	});
	return {
		... def,
		... options
	};
}

module.exports = readEnv;
declare module 'env-group' {
	export default function EnvGroup <T = any>(prefix: string, alternative?: any, defaultValues?: Partial<T>): T;
}
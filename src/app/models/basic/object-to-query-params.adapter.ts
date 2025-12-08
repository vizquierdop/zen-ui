export class ObjectToQueryParamsAdapter {
    convert(object: { [key: string]: any }): string {
        const truthyKeys = Object.keys(object).filter(
            key => object[key] !== undefined && object[key] !== null
        );
        return truthyKeys
            .map(key => `${key}=${encodeURIComponent(object[key] as string)}`)
            .join('&');
    }
}

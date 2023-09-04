
export function parseJson(options: {
    key: string;
    value: string;
    obj: any;
}) {
    const { key, obj } = options
    try {
        return JSON.parse(obj[key]);
    } catch (e) {
        return obj[key];
    }
}
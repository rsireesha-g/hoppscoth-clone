export type KeyValueDescription = {
    key: string;
    value: string;
    description: string;
};

export type MethodData = {
    method: string;
    parameters: KeyValueDescription[];
    headers: KeyValueDescription[];
    body: string,
    authorization: string,
    preRequestScript: string,
    postRequestScript: string,
};

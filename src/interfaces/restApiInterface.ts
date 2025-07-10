export type KeyValueDescription = {
    key: string;
    value: string;
    description: string;
};

export type VariablesObj = {
    variable: string,
    value: string
}

export type MethodData = {
    method: string;
    parameters: KeyValueDescription[];
    headers: KeyValueDescription[];
    body: string,
    authorization: string,
    preRequestScript: string,
    postRequestScript: string,
    variables: VariablesObj[]
};

export type EnvVariablesObj = {
    variable: string,
    initialValue: string,
    currentValue: string
}

export type EnvironmentData = {
    label: string,
    variables: EnvVariablesObj[],
    secrets: EnvVariablesObj[]
};


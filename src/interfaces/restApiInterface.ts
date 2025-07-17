export type KeyValueDescription = {
    key: string;
    value: string;
    description: string;
};

export type VariablesObj = {
    variable: string,
    value: string
}

export type VariablesObj2 = {
    value: string
}

export type MethodData = {
    method: string;
    index: number;
    title: string;
    parameters: KeyValueDescription[];
    headers: KeyValueDescription[];
    body: string,
    authorization: string,
    preRequestScript: string,
    postRequestScript: string,
    variables: VariablesObj[],
    url: string
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

export type historyDataType = {
    id: number,
    requested_at: string,
    url: string,
    method: string
}[]

export type historyStateType = {
    loading: boolean,
    error: boolean,
    data: {
        url: string,
        requests: historyDataType
    }[]
}

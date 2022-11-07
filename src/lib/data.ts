class DataEntry {
    key: string;
    value: any;

    constructor(key: string, value: any) {
        this.key = key;
        this.value = value;
    }
}

class Data {
    entries: Array<DataEntry>;

    constructor(entries: Array<DataEntry>) {
        this.entries = entries;
    }
}

export { DataEntry, Data }
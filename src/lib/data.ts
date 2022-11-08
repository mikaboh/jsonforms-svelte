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

    toJson(): string {
        let json: any = {};
        this.entries.forEach((entry: DataEntry) => {
            json[entry.key] = entry.value;
        })

        return json;
    }
}

export { DataEntry, Data }
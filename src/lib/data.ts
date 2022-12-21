class DataEntry {
    key: string;
    value: any;

    constructor(key: string, value: any) {
        this.key = key;
        this.value = value;
    }
}

class Data {
    entries: Array<DataEntry> = [];

    constructor(formFields: Array<any>) {
        this.entries = this.createEntries(formFields);
        this.linkEntriesToFormFields(formFields);
    }

    /* 
    * Create entries based on the form fields.
    */
    private createEntries(formFields: Array<any>) {
        let entries: Array<DataEntry> = [];
        for (let [key, field] of Object.entries(formFields)) {
            // Skip html fields
            if (field.type === 'html') {
                continue;
            }

            let entry: DataEntry = {
                key: field.key,
                value: null
            };
            if (field.value) {
                entry.value = field.value;
            }
            // Exeption for textareas: The value has to be an empty string. (Bug from Svelte Material UI)
            else if (field.textarea) {
                entry.value = '';
            } else if (field.type === 'checkbox' && field.options !== undefined) {
                entry.value = [];
            }

            entries.push(entry);
        }
        return entries;
    }

    /* 
    * Link array index of dataInstance entries to the form fields for value binding.
    */
    private linkEntriesToFormFields(formFields: Array<any>) {
        for (let [key, field] of Object.entries(formFields)) {
            // Skip html fields
            if (field.type === 'html') {
                continue;
            }

            field.dataIndex = this.entries.findIndex((entry) => entry.key === field.key);
        }
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
import Textfield from '@smui/textfield';

class Converter {
    schema: any;
    private formFields: Array<any>;

    constructor(schema: any) {
        this.schema = schema;
        this.formFields = this.convertSchemaToFormFields(schema);
    }

    private convertSchemaToFormFields(schema: any): Array<any> {
        Object.entries(schema.properties).forEach(([key, value]) => {
        })

        let formFields: Array<any> = [

        ];

        return [
            {
                key: 'name',
                label: 'Name',
                style: "width: 100%",
                component: Textfield,
                maxLength: 5,
            },
            {
                key: 'firstName',
                label: 'Vorname',
                style: "width: 100%",
                component: Textfield
            },
            {
                key: 'title',
                label: 'Titel',
                style: "width: 100%",
                textarea: true,
                component: Textfield
            },
            {
                key: 'date',
                label: 'Datum',
                style: "width: 100%",
                type: "date",
                component: Textfield
            },
            {
                key: 'matriculationNumber',
                label: 'Matrikelnummer',
                style: "width: 100%",
                type: "number",
                component: Textfield
            },
            {
                key: 'textarea',
                label: 'Area',
                textarea: true,
                style: "width: 100%",
                component: Textfield
            },
        ];
    }

    get getFormfields() {
        return this.formFields;
    }
}

export default Converter;
import Textfield from '@smui/textfield';

class Converter {
    schema: any;
    private formFields: Array<any>;

    constructor(schema: any) {
        this.schema = schema;
        this.formFields = this.convertSchemaToFormFields(schema);
    }

    private camelCaseToLabel(camelCase: string): string {
        let result = camelCase.replace(/([A-Z])/g, " $1");
        result = result.charAt(0).toUpperCase() + result.slice(1);

        return result;
    }

    private convertSchemaToFormFields(schema: any): Array<any> {
        let formFields: Array<any> = [];
        schema.fields.forEach((field: any) => {
            let formItem: any = {
                key: field.key,
                label: field.label || this.camelCaseToLabel(field.key),
                style: "width: 100%;"
            };

            switch (field.type) {
                // text type specific properties
                case "text": {
                    formItem = {
                        ...formItem,
                        type: "text",
                        input$maxlength: field.maxLength || undefined,
                        component: Textfield,
                        variant: field.variant || "outlined"
                    }
                    break;
                }
                case "textarea": {
                    formItem = {
                        ...formItem,
                        type: "text",
                        textarea: true,
                        input$maxlength: field.maxLength || undefined,
                        component: Textfield
                    }
                    break;
                }
                case "number": {
                    formItem = {
                        ...formItem,
                        type: "number",
                        component: Textfield,
                        variant: field.variant || "outlined"
                    }
                    break;
                }
                case "email": {
                    formItem = {
                        ...formItem,
                        type: "email",
                        input$autocomplete: "email",
                        input$maxlength: field.maxLength || undefined,
                        component: Textfield,
                        variant: field.variant || "outlined"
                    }
                    break;
                }
                case "date": {
                    formItem = {
                        ...formItem,
                        type: "date",
                        component: Textfield,
                        variant: field.variant || "outlined"
                    }
                    break;
                }
                // TODO: implement other field types like checkbox, radio, menu, etc.
            }

            formFields.push(formItem);
        });

        return formFields;
    }

    get getFormfields() {
        return this.formFields;
    }
}

export default Converter;
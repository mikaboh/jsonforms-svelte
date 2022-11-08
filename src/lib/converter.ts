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
            // applies to all fields
            let formItem: any = {
                key: field.key,
                label: field.label || this.camelCaseToLabel(field.key),
                style: "width: 100%;",
            };

            switch (field.type) {
                // text type specific properties
                case "text": {
                    formItem = {
                        ...formItem,
                        type: "text",
                        ...(field.maxLength && { input$maxlength: field.maxLength }),
                        component: Textfield,
                        variant: field.variant || "outlined",
                        ...(field.icon && { leadingIcon: field.icon }),
                    }
                    break;
                }
                // textarea type specific properties
                case "textarea": {
                    formItem = {
                        ...formItem,
                        type: "text",
                        textarea: true,
                        ...(field.maxLength && { input$maxlength: field.maxLength }),
                        component: Textfield,
                    }
                    break;
                }
                // number type specific properties
                case "number": {
                    formItem = {
                        ...formItem,
                        type: "number",
                        component: Textfield,
                        variant: field.variant || "outlined",
                        ...(field.icon && { leadingIcon: field.icon }),
                    }
                    break;
                }
                // email type specific properties
                case "email": {
                    formItem = {
                        ...formItem,
                        type: "email",
                        input$autocomplete: "email",
                        ...(field.maxLength && { input$maxlength: field.maxLength }),
                        component: Textfield,
                        variant: field.variant || "outlined",
                        ...(field.icon && { leadingIcon: field.icon }),
                    }
                    break;
                }
                // date type specific properties
                case "date": {
                    formItem = {
                        ...formItem,
                        type: "date",
                        component: Textfield,
                        variant: field.variant || "outlined",
                        ...(field.icon && { leadingIcon: field.icon }),
                    }
                    break;
                }
                // TODO: implement other field types like checkbox, radio, menu, etc.
            }

            // Texfield specific properties
            if (formItem.component === Textfield) {
                formItem = {
                    ...formItem,
                    required: field.required || false,
                    validationMsg: field.validationMsg || "This field is invalid",
                }
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
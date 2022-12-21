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
            // Break loop if field type is html
            if (field.type === 'html') {
                formFields.push(field);
                return;
            }


            // applies to all input fields
            let formItem: any = {
                key: field.key,
                label: field.label || this.camelCaseToLabel(field.key),
                style: "width: 100%;",
                ...(field.style && { style: "width: 100%;" + field.style }),
            };

            switch (field.type) {
                // text type specific properties
                case "text": {
                    formItem = {
                        ...formItem,
                        type: "text",
                    }
                    break;
                }
                // textarea type specific properties
                case "textarea": {
                    formItem = {
                        ...formItem,
                        type: "text",
                        textarea: true,
                        ...(field.input$maxLength && { input$maxLength: field.input$maxLength }),
                        ...(field.required && { required: field.required }),
                        ...(field.disabled && { disabled: field.disabled })
                    }
                    break;
                }
                // number type specific properties
                case "number": {
                    formItem = {
                        ...formItem,
                        type: "number",
                    }
                    break;
                }
                // email type specific properties
                case "email": {
                    formItem = {
                        ...formItem,
                        type: "email",
                        input$autocomplete: "email",
                    }
                    break;
                }
                // date type specific properties
                case "date": {
                    formItem = {
                        ...formItem,
                        type: "date",
                    }
                    break;
                }
                case "radio": {
                    formItem = {
                        ...formItem,
                        type: "radio",
                        ...(field.options && { options: field.options }),
                    }
                    break;
                }
                case "autocomplete": {
                    formItem = {
                        ...formItem,
                        type: "autocomplete",
                        ...(field.variant && { textfield$variant: field.variant }),
                        ...(formItem.style && { textfield$style: formItem.style }),
                        ...(field.options && { options: field.options }),
                        ...(field.value && { value: field.value }),
                        ...(field.combobox && { combobox: field.combobox }),
                        ...(field.disabled && { disabled: field.disabled }),
                    }
                    break;
                }
                case "checkbox": {
                    formItem = {
                        ...formItem,
                        type: "checkbox",
                        ...(field.options && { options: field.options }),
                        ...(field.disabled && { disabled: field.disabled }),
                    }
                    break;
                }
                case "select": {
                    formItem = {
                        ...formItem,
                        type: "select",
                        ...(field.options && { options: field.options }),
                        ...(field.disabled && { disabled: field.disabled }),
                        ...(field.variant && { textfield$variant: field.variant }),
                        ...(field.required && { required: field.required }),
                    }
                    break;
                }
            }

            // Texfield specific properties
            if (formItem.type === "text" || formItem.type === "number" || formItem.type === "email" || formItem.type === "date") {
                formItem = {
                    ...formItem,
                    ...(field.variant && { variant: field.variant }),
                    ...(field.maxLength && { input$maxlength: field.maxLength }),
                    ...(field.leadingIcon && { leadingIcon: field.leadingIcon }),
                    ...(field.trailingIcon && { trailingIcon: field.trailingIcon }),
                    ...(field.required && { required: field.required }),
                    ...(field.disabled && { disabled: field.disabled }),
                    ...(field.prefix && { prefix: field.prefix }),
                    ...(field.suffix && { suffix: field.suffix }),
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
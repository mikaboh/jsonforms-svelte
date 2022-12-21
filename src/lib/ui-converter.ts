/*
    This class converts a JSON schema into a CSS grid template.

    The JSON schema is an object with the following structure:
    schema = {
        type: "VerticalLayout",
        elements: [
            {
                type: "HorizontalLayout",
                elements: [
                    {
                        type: "Control",
                        key: "firstName"
                    },
                    {
                        type: "Control",
                        key: "lastName"
                    },
                    {
                        type: "Control",
                        key: "email"
                    }
                ]
            },
            {
                type: "HorizontalLayout",
                elements: [
                    {
                        type: "Control",
                        key: "age"
                    }
                ]
            },
            {
                type: "HorizontalLayout",
                elements: [
                    {
                        type: "Control",
                        key: "dateOfBirth"
                    }
                ]
            }
        ]
    }

    The result of the convert function returns an object with the following structure:
    resultStyles = {
        formFieldContainer: `
            display: grid;
            grid-gap: 20px;
            grid-template-areas: "firstName lastName email" "age age age" "dateOfBirth dateOfBirth dateOfBirth";
        `,
        firstName: "grid-area: firstName;",
        lastName: "grid-area: lastName;",
        email: "grid-area: email;",
        age: "grid-area: age;",
        dateOfBirth: "grid-area: dateOfBirth;"
    }

    The resultStyles object is used to style the form fields.
*/

class UIConverter {
    private uischema: any;
    private result: any;
    private resultStyles: any;
    private areas: any;

    constructor(uischema: any) {
        this.uischema = uischema;
        this.result = {};
        this.areas = [];
    }

    public convert() {
        this.validateSchema(this.uischema);
        this.convertSchema(this.uischema);
        this.result.areas = this.areas;

        this.resultStyles = {
            formFieldContainer: `
                display: grid;
                grid-gap: 20px;
                grid-template-areas: "${this.areas
                    .map((area: any) => area.join(" "))
                    .join('" "')}";
            `,
        };

        for (let key in this.result) {
            if (key !== "areas") {
                this.resultStyles[key] = `grid-area: ${key};`;
            }
        }

        return this.resultStyles;
    }

    /* The validateSchema function validates the schema object.
        - schema must be an object
        - schema must have a type property with a value of VerticalLayout, HorizontalLayout or Control
        - schema must have a elements property if type is VerticalLayout or HorizontalLayout
        - schema must have a key property if type is Control
        - schema must have a elements property that is an array if type is VerticalLayout or HorizontalLayout
        - an element of type HorizontalLayout can not have another element of type HorizontalLayout nested inside of it
    */
    private validateSchema(schema: any) {
        if (typeof schema !== "object") {
            throw new Error("schema must be an object");
        } else if (
            schema.type !== "VerticalLayout" &&
            schema.type !== "HorizontalLayout" &&
            schema.type !== "Control"
        ) {
            throw new Error(
                'schema must have a type property with a value of VerticalLayout, HorizontalLayout or Control'
            );
        } else if (
            (schema.type === "VerticalLayout" ||
                schema.type === "HorizontalLayout") &&
            schema.elements === undefined
        ) {
            throw new Error(
                "schema must have a elements property if type is VerticalLayout or HorizontalLayout"
            );
        } else if (schema.type === "Control" && schema.key === undefined) {
            throw new Error(
                "schema must have a key property if type is Control"
            );
        } else if (
            schema.type === "VerticalLayout" ||
            schema.type === "HorizontalLayout"
        ) {
            if (!Array.isArray(schema.elements)) {
                throw new Error(
                    "schema must have a elements property that is an array if type is VerticalLayout or HorizontalLayout"
                );
            }

            schema.elements.forEach((element: any) => {
                if (schema.type === "HorizontalLayout" && element.type === "HorizontalLayout") {
                    throw new Error("an element of type HorizontalLayout can not have another element of type HorizontalLayout nested inside of it");
                }
                this.validateSchema(element);
            });
        }
    }

    private convertSchema(schema: any) {
        if (schema.type === "VerticalLayout") {
            schema.elements.forEach((element: any) => {
                this.convertSchema(element);

                if (element.key !== undefined) {
                    let area: string[] = [];
                    let length = this.getLongestHorizontalLayout(schema);
                    for (let i = 0; i < length; i++) {
                        area.push(element.key);
                    }
                    this.areas.push(area);
                }
            });
        } else if (schema.type === "HorizontalLayout") {
            let area: string[] = [];
            schema.elements.forEach((element: any) => {
                this.convertSchema(element);
                area.push(element.key);
            });

            let length = this.getLongestHorizontalLayout(this.uischema);
            // pushXTimes is the number of times each element in the area array should be duplicated
            let pushXTimes: number = Math.floor(length / area.length);
            area = area.reduce((acc: any, cur: any, i: number) => {
                for (let i = 0; i < pushXTimes; i++) {
                    acc.push(cur);
                }
                return acc;
            }, []);

            // If the area array is still too short, duplicate the first element until it is long enough
            while (area.length < length) {
                area.unshift(area[0]);
            }

            this.areas.push(area);
        } else if (schema.type === "Control") {
            this.result[schema.key] = "grid-area: " + schema.key + ";";
        }
    }

    private getLongestHorizontalLayout(schema: any): any {
        if (schema.type === "VerticalLayout") {
            return Math.max(
                ...schema.elements.map((element: any) =>
                    this.getLongestHorizontalLayout(element)
                )
            );
        } else if (schema.type === "HorizontalLayout") {
            return Math.max(
                schema.elements.filter(
                    (element: any) => element.type === "Control"
                ).length,
                ...schema.elements.map((element: any) =>
                    this.getLongestHorizontalLayout(element)
                )
            );
        } else if (schema.type === "Control") {
            return 1;
        }
    }
}

export default UIConverter;
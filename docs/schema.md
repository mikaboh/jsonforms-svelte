# Schema

The schema, which is passed to the JsonForm svelte component, describes the individual input elements of a form and is just a regular JSON object.

    {
        "title": "Example Form",
        "subtitle": "This is a simple example of a form",
        "fields": [
            {
                "key": "firstName",
                "type": "text",
                "maxLength": 20
            },
            {
                "key": "lastName",
                "label": "Last Name",
                "type": "text"
            },
            {
                "key": "email",
                "type": "email"
            },
            {
                "key": "age",
                "type": "number",
                "required": true
            },
            {
                "key": "dateOfBirth",
                "type": "date"
            }
        ]
    }

This schema results in the following form.

<img src="media/example-form.png" alt="Example form image" style="width: 100%;">

## Schema Configuration

### `title (string)`

An optional title of the form, which is displayed at the top.

#### Example

    "title": "Example Form"

### `subtitle (string)`

An optional subtitle of the form. The subtitle is displayed right under the title.

#### Example

    "subtitle": "This is a simple example of a form"

### `fields`

Fields make up the input fields of the form.

!> **Important** The following properties apply to every type of input field. The properties `key` and `type` are required.

| Key Name | Value Type | Required | Description                              |
| -------- | ---------- | -------- | ---------------------------------------- |
| `key`    | string     | yes      | Unique name of the input field           |
| `type`   | string     | yes      | Type of the input field                  |
| `label`  | string     | no       | An optional label for the input field    |
| `style`  | string     | no       | CSS style passed down to the input field |

?> **Info** Available input types are listed below.

#### Example

    "fields": [
        {
            "key": "firstName",
            "type": "text",
            "input$maxLength": 20
        },
        {
            "key": "lastName",
            "label": "Last Name",
            "type": "text"
        }
    ]

#### Type `text` | `number` | `date` | `email`

| Key Name          | Value Type | Required | Description                                                                                                                                                                                                                                              |
| ----------------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input$maxLength` | integer    | no       | Maximum character length of the input                                                                                                                                                                                                                    |
| `variant`         | string     | no       | "outlined"                                                                                                                                                                                                                     \| "filled" \| "standard" |
| `leadingIcon`     | string     | no       | The icon appears next to an input field. Available icons can be found [here](https://fonts.google.com/icons?selected=Material+Icons). Lowercase only. Use underscores instead of spaces. Example: Check Circle => check_circle                           |
| `trailingIcon`    | string     | no       | The icon appears next to an input field. Available icons can be found [here](https://fonts.google.com/icons?selected=Material+Icons). Lowercase only. Use underscores instead of spaces. Example: Check Circle => check_circle                           |
| `required`        | boolean    | no       | If true, input can not be empty.                                                                                                                                                                                                                         |
| `disabled`        | boolean    | no       | If true, input field is disabled.                                                                                                                                                                                                                        |
| `prefix`          | string     | no       | Display text in front of the input field when focused.                                                                                                                                                                                                   |
| `suffix`          | string     | no       | Display text after the input field when focused.                                                                                                                                                                                                         |

#### Type `textarea`

| Key Name          | Value Type | Required | Description                           |
| ----------------- | ---------- | -------- | ------------------------------------- |
| `input$maxLength` | integer    | no       | Maximum character length of the input |
| `required`        | boolean    | no       | If true, input can not be empty.      |
| `disabled`        | boolean    | no       | If true, input field is disabled.     |

#### Type `radio`

| Key Name  | Value Type      | Required | Description         |
| --------- | --------------- | -------- | ------------------- |
| `options` | array\<string\> | yes      | Example down below. |

##### Example

    {
        "key": "radioField",
        "type": "radio",
        "options": [
            {
                "name": "radio option 1",
                "disabled": true
            },
            {
                "name": "radio option 2"
            },
            {
                "name": "radio option 3"
            }
        ]
    }

#### Type `autocomplete`

| Key Name   | Value Type      | Required | Description                                                                               |
| ---------- | --------------- | -------- | ----------------------------------------------------------------------------------------- |
| `variant`  | string          | no       | "outlined" \| "filled" \| "standard"                                                      |
| `options`  | array\<string\> | no       | Example down below.                                                                       |
| `value`    | string          | no       | Prefilled value                                                                           |
| `combobox` | boolean         | no       | A combobox lets the user input any text, but provides autocomplete functionality as well. |
| `disabled` | boolean         | no       | If true, input field is disabled.                                                         |

##### Example

    {
        "key": "autocompleteField",
        "type": "autocomplete",
        "options": [
            "autocomplete option 1",
            "autocomplete option 2",
            "autocomplete option 3"
        ],
        "value": "autocomplete option 2"
    }

#### Type `checkbox`

| Key Name   | Value Type                                 | Required | Description                                                                                                |
| ---------- | ------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| `options`  | array\<{name: string, disabled: boolean}\> | no       | If options are not provided, only a single checkbox is displayed with a boolean value. Example down below. |
| `disabled` | boolean                                    | no       | Only works if its a single checkbox without options provided. If true, input field is disabled.            |

##### Example of a single checkbox

    {
        "key": "checkboxField",
        "type": "checkbox"
    }

##### Example of multiple checkboxes

    {
        "key": "checkboxGroupField",
        "type": "checkbox",
        "options": [
            {
                "name": "checkbox option 1",
                "disabled": true
            },
            {
                "name": "checkbox option 2"
            },
            {
                "name": "checkbox option 3"
            }
        ]
    }

#### Type `select`

| Key Name   | Value Type      | Required | Description                                                                                     |
| ---------- | --------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `options`  | array\<string\> | no       | Example down below.                                                                             |
| `disabled` | boolean         | no       | Only works if its a single checkbox without options provided. If true, input field is disabled. |
| `variant`  | string          | no       | "outlined" \| "filled" \| "standard"                                                            |
| `required` | boolean         | no       | If true, input can not be empty.                                                                |

##### Example

    {
        "key": "selectField",
        "type": "select",
        "options": [
            "select option 1",
            "select option 2",
            "select option 3"
        ]
    }
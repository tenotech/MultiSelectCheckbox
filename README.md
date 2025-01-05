# MultiSelectCheckbox Component

Welcome to the **MultiSelectCheckbox** component, a versatile and customizable multi-select checkbox solution built with ShadCN. This component is ideal for selecting multiple options with features like tooltips, "Select All," and flexible layout options.

## Features

- **Select All / Clear All**: Quickly select or deselect all options.
- **Tooltip Support**: Optional tooltips to display additional information for each option.
- **Disabled State**: Disable individual checkboxes or the entire component.
- **Customizable Orientation**: Display options horizontally or vertically.
- **Custom Styling**: Easily style the component with utility classes.

## Installation

Simply download the `MultiSelectCheckbox` component and add it to your project. Place the file in your components directory and start using it.

## Usage

Here’s how to use the **MultiSelectCheckbox** component in your project:

### Example 1

```tsx
const options = [
  { label: "Option 1", value: "option1", description: "Description for Option 1" },
  { label: "Option 2", value: "option2", description: "Description for Option 2", disabled: true },
  { label: "Option 3", value: "option3", description: "Description for Option 3" },
];

export default function App() {
  return (
    <MultiSelectCheckbox
      options={options}
      defaultValue={["option1"]}
      onValueChange={(selected) => console.log("Selected values:", selected)}
      selectAll={true}
      orientation="vertical"
      showTooltip={true}
      disabled={false}
    />
  );
}
```

### Props

| Prop Name       | Type           | Default      | Description                                                                                   |
| --------------- | -------------- | ------------ | --------------------------------------------------------------------------------------------- |
| `options`       | `Array`        | `[]`         | Array of options to display. Each option has `label`, `value`, `description`, and `disabled`. |
| `onValueChange` | `Function`     | `undefined`  | Callback function triggered when the selected values change.                                  |
| `defaultValue`  | `Array`        | `[]`         | Preselected values when the component is initialized.                                         |
| `selectAll`     | `boolean`      | `false`      | Enables or disables the "Select All" feature.                                                 |
| `orientation`   | \`'horizontal' | 'vertical'\` | `'vertical'`                                                                                  | Layout orientation for checkboxes. |
| `showTooltip`   | `boolean`      | `false`      | Shows tooltips for checkboxes if `description` is provided.                                   |
| `disabled`      | `boolean`      | `false`      | Disables the entire component or individual checkboxes.                                       |

### Example 2

```tsx
const options = [
  { label: "Option 1", value: "option1", description: "Description for Option 1" },
  { label: "Option 2", value: "option2", description: "Description for Option 2" },
  { label: "Option 3", value: "option3", description: "Description for Option 3" },
];

export default function Example2() {
  return (
    <div className="p-4 border rounded-md">
      <MultiSelectCheckbox
        options={options}
        defaultValue={[]}
        onValueChange={(selected) => console.log(selected)}
        selectAll={true}
        orientation="horizontal"
        showTooltip={true}
        disabled={false}
      />
    </div>
  );
}
```

## Contribution

We welcome contributions to enhance this component! If you encounter issues or have feature requests, please open an issue or submit a pull request on [GitHub](https://github.com/tenotech/MultiSelectCheckbox).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).


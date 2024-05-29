# Button 按钮

常用的操作按钮

:::tip

测试搭建UI组件库

:::

## 基础用法

:::demo Use `type`, `plain`, `round` and `circle` to define Button's style.

button/basic

:::

## Button API

### Button 属性

| Name | Description                                      | Type                                                           | Default |
| ---- | ------------------------------------------------ | -------------------------------------------------------------- | ------- |
| size | control the size of buttons in this button-group | ^[enum]`'large'\| 'default'\| 'small'`                         | —       |
| type | control the type of buttons in this button-group | ^[enum]`'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | —       |

### ButtonGroup Slots

| Name    | Description                    | Subtags |
| ------- | ------------------------------ | ------- |
| default | customize button group content | Button  |
import { Config } from "@measured/puck";
import { DropdownBlock } from "../components/DropdownBlock";
import { RadioBlock } from "../components/RadioBlock";

export const config: Config = {
  components: {
    DropdownBlock: {
      fields: {
        label: { type: "text", contentEditable: true },
        options: {
          type: "array",
          arrayFields: {
            option: { type: "text" },
          },
        },
        defaultValue: { type: "text" },
      },
      defaultProps: {
        label: "Select an option",
        options: [{ option: "Option 1" }, { option: "Option 2" }, { option: "Option 3" }],
        defaultValue: "",
      },
      render: DropdownBlock,
    },
    RadioBlock: {
      fields: {
        label: { type: "text", contentEditable: true },
        options: {
          type: "array",
          arrayFields: {
            option: { type: "text" },
          },
        },
        defaultValue: { type: "text" },
      },
      defaultProps: {
        label: "Choose an option",
        options: [{ option: "Option A" }, { option: "Option B" }, { option: "Option C" }],
        defaultValue: "",
      },
      render: RadioBlock,
    },
  },
};

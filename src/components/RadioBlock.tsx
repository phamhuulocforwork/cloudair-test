"use client";

import React, { useState } from "react";
import {
  Box,
  FormControl,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import useSafePuck from "../hooks/useSafePuck";
import { registerOverlayPortal } from "@measured/puck";

export interface RadioBlockProps {
  id: string;
  label: string;
  options: { option: string }[];
  defaultValue: string;
  puck?: {
    isEditing?: boolean;
  };
}

// Inline editable text component for label (reused from DropdownBlock)
const InlineEditableLabel: React.FC<{
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  placeholder?: string;
}> = ({ value, onChange, isEditing, placeholder = "Question Description" }) => {
  if (!isEditing) {
    return (
      <Typography variant="body1" sx={{ mb: 2, fontWeight: 500, color: "#333" }}>
        {value}
      </Typography>
    );
  }

  return (
    <Typography
      variant="body1"
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => {
        const newValue = e.currentTarget.textContent || "";
        if (newValue !== value) {
          onChange(newValue);
        }
      }}
      sx={{
        mb: 2,
        fontWeight: 500,
        outline: "none",
        border: "none",
        padding: "4px 0",
        minWidth: "100px",
        display: "block",
        cursor: "text",
        color: "#666",
        "&:hover": {
          color: "#333",
        },
        "&:focus": {
          color: "#000",
        },
        "&:empty:before": {
          content: `"${placeholder}"`,
          color: "#999",
        },
      }}
    >
      {value}
    </Typography>
  );
};

// Inline option editor for edit mode
const InlineOptionEditor: React.FC<{
  blockId: string;
  options: { option: string }[];
}> = ({ blockId, options }) => {
  const getPuck = useSafePuck();

  const handleOptionChange = (index: number, newValue: string) => {
    if (!getPuck || !newValue.trim()) return;

    const { getItemById, getSelectorForId, dispatch } = getPuck();
    const selectedItem = getItemById(blockId);
    const selector = getSelectorForId(blockId);

    if (!selectedItem || !selector) return;

    const newOptions = [...options];
    newOptions[index] = { option: newValue };

    dispatch({
      type: "replace",
      data: {
        type: selectedItem.type,
        props: {
          id: selectedItem.props.id,
          label: selectedItem.props.label,
          options: newOptions,
          defaultValue: selectedItem.props.defaultValue,
        },
      },
      destinationIndex: selector.index,
      destinationZone: selector.zone,
    });
  };

  const handleAddOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!getPuck) return;

    const { getItemById, getSelectorForId, dispatch } = getPuck();
    const selectedItem = getItemById(blockId);
    const selector = getSelectorForId(blockId);

    if (!selectedItem || !selector) return;

    const newOptions = [...options, { option: `New option ${options.length + 1}` }];

    dispatch({
      type: "replace",
      data: {
        type: selectedItem.type,
        props: {
          id: selectedItem.props.id,
          label: selectedItem.props.label,
          options: newOptions,
          defaultValue: selectedItem.props.defaultValue,
        },
      },
      destinationIndex: selector.index,
      destinationZone: selector.zone,
    });
  };

  const handleDeleteOption = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    event.stopPropagation();

    if (!getPuck || options.length <= 1) return;

    const { getItemById, getSelectorForId, dispatch } = getPuck();
    const selectedItem = getItemById(blockId);
    const selector = getSelectorForId(blockId);

    if (!selectedItem || !selector) return;

    const newOptions = options.filter((_, i) => i !== index);

    dispatch({
      type: "replace",
      data: {
        type: selectedItem.type,
        props: {
          id: selectedItem.props.id,
          label: selectedItem.props.label,
          options: newOptions,
          defaultValue: selectedItem.props.defaultValue,
        },
      },
      destinationIndex: selector.index,
      destinationZone: selector.zone,
    });
  };

  return (
    <Box sx={{ mt: 2 }}>
      {options.map((opt, index) => (
        <Box
          key={`radio-option-${index}-${opt.option}`}
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}
          ref={registerOverlayPortal}
        >
          <Radio disabled sx={{ padding: "4px" }} />
          <Typography
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              const newValue = e.currentTarget.textContent || "";
              if (newValue !== opt.option) {
                handleOptionChange(index, newValue);
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            sx={{
              flex: 1,
              outline: "none",
              border: "1px solid #ddd",
              padding: "8px 12px",
              borderRadius: "4px",
              cursor: "text",
              backgroundColor: "white",
              minHeight: "40px",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                borderColor: "#999",
              },
              "&:focus": {
                borderColor: "#1976d2",
                boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.1)",
              },
            }}
          >
            {opt.option}
          </Typography>
          <Button
            size="small"
            onClick={(event) => handleDeleteOption(event, index)}
            disabled={options.length <= 1}
            color="error"
            variant="outlined"
            sx={{
              minWidth: "32px",
              height: "32px",
              p: 0,
              borderRadius: "4px",
              fontSize: "16px",
            }}
          >
            ✕
          </Button>
        </Box>
      ))}
      <Box sx={{ width: "fit-content" }} ref={registerOverlayPortal}>
        <Button
          size="small"
          onClick={handleAddOption}
          color="primary"
          variant="text"
          sx={{ mt: 1, textTransform: "none", fontSize: "14px" }}
        >
          + Add more option +
        </Button>
      </Box>
    </Box>
  );
};

export const RadioBlock: React.FC<RadioBlockProps> = ({
  id,
  label,
  options,
  defaultValue,
  puck,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue || "");
  const isEditing = puck?.isEditing ?? false;
  const getPuck = useSafePuck();

  // Create a unique field name based on label or id
  const fieldName = id || label.toLowerCase().replace(/\s+/g, "_");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleLabelChange = (newLabel: string) => {
    if (!getPuck || !newLabel.trim()) return;

    const { getItemById, getSelectorForId, dispatch } = getPuck();
    const selectedItem = getItemById(id);
    const selector = getSelectorForId(id);

    if (!selectedItem || !selector) return;

    dispatch({
      type: "replace",
      data: {
        type: selectedItem.type,
        props: {
          id: selectedItem.props.id,
          label: newLabel,
          options: selectedItem.props.options,
          defaultValue: selectedItem.props.defaultValue,
        },
      },
      destinationIndex: selector.index,
      destinationZone: selector.zone,
    });
  };

  return (
    <Box
      sx={{
        p: 2,
        border: isEditing ? "1px solid #e0e0e0" : "none",
        borderRadius: 1,
        backgroundColor: isEditing ? "#fafafa" : "transparent",
      }}
    >
      <FormControl fullWidth>
        <InlineEditableLabel
          value={label}
          onChange={handleLabelChange}
          isEditing={isEditing}
          placeholder="Question Description"
        />

        {!isEditing && (
          <RadioGroup name={fieldName} value={selectedValue} onChange={handleChange}>
            {options.map((opt, index) => (
              <FormControlLabel
                key={index}
                value={opt.option}
                control={<Radio />}
                label={opt.option}
                sx={{
                  mb: 1,
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
              />
            ))}
          </RadioGroup>
        )}

        {isEditing && <InlineOptionEditor blockId={id} options={options} />}
      </FormControl>
    </Box>
  );
};

export default RadioBlock;

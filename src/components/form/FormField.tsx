import React from "react";
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

interface BaseFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
}

interface TextFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "text" | "email" | "tel" | "number";
  placeholder?: string;
  prefix?: string;
}

interface SelectFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "select";
  placeholder?: string;
  options: { value: string; label: string }[];
}

interface TextareaFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "textarea";
  placeholder?: string;
  rows?: number;
}

interface CheckboxFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "checkbox";
}

interface SwitchFieldProps<T extends FieldValues> extends BaseFormFieldProps<T> {
  type: "switch";
}

type FormFieldProps<T extends FieldValues> = 
  | TextFieldProps<T>
  | SelectFieldProps<T>
  | TextareaFieldProps<T>
  | CheckboxFieldProps<T>
  | SwitchFieldProps<T>;

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required = false,
  ...props
}: FormFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2">
          <Label htmlFor={name} className="text-sm font-medium text-foreground">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
          
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}

          {props.type === "text" || props.type === "email" || props.type === "tel" ? (
            <div className="relative">
              {props.prefix && (
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                  {props.prefix}
                </span>
              )}
              <Input
                {...field}
                type={props.type}
                placeholder={props.placeholder}
                className={`${props.prefix ? 'pl-12' : ''} ${error ? 'border-destructive' : ''}`}
                id={name}
              />
            </div>
          ) : props.type === "number" ? (
            <Input
              {...field}
              type="number"
              placeholder={props.placeholder}
              className={error ? 'border-destructive' : ''}
              onChange={(e) => field.onChange(Number(e.target.value))}
              id={name}
            />
          ) : props.type === "select" ? (
            <Select value={field.value || ""} onValueChange={field.onChange}>
              <SelectTrigger className={error ? 'border-destructive' : ''}>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {props.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : props.type === "textarea" ? (
            <Textarea
              {...field}
              placeholder={props.placeholder}
              rows={props.rows || 3}
              className={error ? 'border-destructive' : ''}
              id={name}
            />
          ) : props.type === "checkbox" ? (
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={field.value || false}
                onCheckedChange={field.onChange}
                id={name}
              />
              <Label htmlFor={name} className="text-sm text-muted-foreground">
                {label}
              </Label>
            </div>
          ) : props.type === "switch" ? (
            <div className="flex items-center justify-between">
              <Label htmlFor={name} className="text-sm font-medium">
                {label}
              </Label>
              <Switch
                checked={field.value || false}
                onCheckedChange={field.onChange}
                id={name}
              />
            </div>
          ) : null}

          {error && (
            <p className="text-sm text-destructive">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
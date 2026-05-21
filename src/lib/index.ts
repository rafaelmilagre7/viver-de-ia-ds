/* ============================================
   @viverdeia/design-system · barrel export
   Library de componentes React do Viver de IA.

   Use:
     import { Button, Pill, Card, Avatar, Icon, Input,
              Toast, ToastStack, useToasts, Tooltip, Modal, Tabs }
       from '@viverdeia/design-system';
   ============================================ */

export { Button, type ButtonProps } from './Button/Button';
export { Pill, type PillProps } from './Pill/Pill';
export { Card, type CardProps } from './Card/Card';
export { Input, type InputProps } from './Input/Input';
export { Avatar, type AvatarProps } from './Avatar/Avatar';
export { Icon, type IconProps } from './Icon/Icon';
export { ToastStack, useToasts, type ToastItem, type ToastStackProps } from './Toast/Toast';
export { Tooltip, type TooltipProps } from './Tooltip/Tooltip';
export { Modal, type ModalProps } from './Modal/Modal';
export { Tabs, type TabsProps, type TabItem } from './Tabs/Tabs';
export { Switch, type SwitchProps } from './Switch/Switch';
export { Checkbox, type CheckboxProps } from './Checkbox/Checkbox';
export { RadioGroup, type RadioGroupProps, type RadioOption } from './RadioGroup/RadioGroup';
export { Select, type SelectProps, type SelectOption } from './Select/Select';
export { Progress, type ProgressProps } from './Progress/Progress';
export { Drawer, type DrawerProps } from './Drawer/Drawer';
export { Spinner, type SpinnerProps } from './Spinner/Spinner';
export { Skeleton, type SkeletonProps } from './Skeleton/Skeleton';
export { Breadcrumb, type BreadcrumbProps, type BreadcrumbItem } from './Breadcrumb/Breadcrumb';
export { Pagination, type PaginationProps } from './Pagination/Pagination';
export { Accordion, type AccordionProps, type AccordionItem } from './Accordion/Accordion';
export { Stepper, type StepperProps, type StepItem } from './Stepper/Stepper';
export { EmptyState, type EmptyStateProps } from './EmptyState/EmptyState';
export { Combobox, type ComboboxProps, type ComboboxOption } from './Combobox/Combobox';
export { DropdownMenu, type DropdownMenuProps, type DropdownMenuItem, type DropdownMenuGroup } from './DropdownMenu/DropdownMenu';
export { Popover, type PopoverProps } from './Popover/Popover';
export { Command, type CommandProps, type CommandItem, type CommandGroup } from './Command/Command';
export { DatePicker, type DatePickerProps } from './DatePicker/DatePicker';
export { Slider, type SliderProps } from './Slider/Slider';
export { Alert, type AlertProps } from './Alert/Alert';
export { DataTable, type DataTableProps, type DataTableColumn, type SortDir } from './DataTable/DataTable';

/* Onda 1A · 5 componentes premium · maio/2026 */
export { HoverCard, type HoverCardProps } from './HoverCard/HoverCard';
export { OTPInput, type OTPInputProps } from './OTPInput/OTPInput';
export { TagInput, type TagInputProps } from './TagInput/TagInput';
export { Calendar, type CalendarProps } from './Calendar/Calendar';
export { Carousel, type CarouselProps } from './Carousel/Carousel';

/* Onda 1B · 5 componentes (form + overlay) · maio/2026 */
export { TimePicker, type TimePickerProps } from './TimePicker/TimePicker';
export { Sheet, type SheetProps } from './Sheet/Sheet';
export { ContextMenu, type ContextMenuProps, type ContextMenuOption } from './ContextMenu/ContextMenu';
export { MultiSelect, type MultiSelectProps, type MultiSelectOption } from './MultiSelect/MultiSelect';
export { DateRangePicker, type DateRangePickerProps, type DateRange } from './DateRangePicker/DateRangePicker';

/* Onda 1C · 5 componentes (avançados) · maio/2026 */
export { TreeView, type TreeViewProps, type TreeNode } from './TreeView/TreeView';
export { Splitter, type SplitterProps } from './Splitter/Splitter';
export { VirtualList, type VirtualListProps } from './VirtualList/VirtualList';
export { Lightbox, type LightboxProps, type LightboxImage } from './Lightbox/Lightbox';
export { ColorPicker, type ColorPickerProps, type ColorSwatch } from './ColorPicker/ColorPicker';

/* Tokens · runtime + types · auto-generated from tokens.css */
export { tokens, tokensList, cssVar, type Token, type TokenName } from './tokens';

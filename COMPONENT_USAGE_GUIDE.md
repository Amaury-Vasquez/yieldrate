# Amvasdev UI - Component Usage Guide

This guide provides comprehensive examples and instructions for using components, hooks, and utilities in the amvasdev-ui library.

## Installation & Setup

```bash
npm install amvasdev-ui
```

```jsx
// Import CSS at the root of your application
import "amvasdev-ui/dist/index.css";

// Import components
import { Button, Input, Modal } from "amvasdev-ui";
```

## Components

### Button

The Button component supports various sizes, variants, loading states, and styling options.

```jsx
import { Button } from "amvasdev-ui";

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="error">Error</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>

// Loading state
<Button isLoading>Loading...</Button>
<Button
  isLoading
  loadingStyles={{ type: "dots", size: "sm" }}
  disabledOnLoading={false}
>
  Custom Loading
</Button>

// Outlined style
<Button variant="primary" outlined>Outlined</Button>
```

**Available variants:** `base`, `neutral`, `primary`, `secondary`, `accent`, `info`, `success`, `warning`, `error`, `ghost`, `link`

**Available sizes:** `xs`, `sm`, `md`, `lg`

**Loading types:** `spin`, `dots`, `ring`, `ball`, `bars`, `infinity`

### Input

The Input component provides form inputs with labels, icons, validation, and various styling options.

```jsx
import { Input } from "amvasdev-ui";
import { Search, User } from "lucide-react";

// Basic usage
<Input id="username" label="Username" />

// With icons
<Input
  id="search"
  label="Search"
  leftIcon={<Search size={16} />}
  placeholder="Search..."
/>

<Input
  id="profile"
  label="Profile"
  rightIcon={<User size={16} />}
/>

// Variants and sizes
<Input id="email" variant="primary" size="lg" />
<Input id="error-input" variant="error" errorMessage="This field is required" />

// Required field
<Input id="required" label="Required Field" required />

// Custom styling
<Input
  id="custom"
  className="custom-input-class"
  labelClassName="custom-label-class"
/>
```

**Available variants:** `base`, `ghost`, `primary`, `secondary`, `accent`, `success`, `info`, `warning`, `error`

**Available sizes:** `xs`, `sm`, `md`, `lg`

### PasswordInput

```jsx
import { PasswordInput } from "amvasdev-ui";

<PasswordInput
  id="password"
  label="Password"
  placeholder="Enter your password"
/>;
```

### Modal

The Modal component provides a flexible dialog with customizable close behavior and action buttons.

```jsx
import { Modal } from "amvasdev-ui";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          title="Confirmation"
          closeOnClickOutside={true}
          closeOnEsc={true}
          showCloseButton={true}
        >
          <p>Are you sure you want to continue?</p>
        </Modal>
      )}
    </>
  );
}

// Modal with action buttons
<Modal
  onClose={() => setIsOpen(false)}
  title="Delete Item"
  cancelButton={{
    children: "Cancel",
    variant: "ghost",
  }}
  confirmButton={{
    children: "Delete",
    variant: "error",
    onClick: () => console.log("Deleted!"),
  }}
  closeOnCancel={true}
  closeOnConfirm={true}
>
  <p>This action cannot be undone.</p>
</Modal>;
```

### Combobox

The Combobox component provides searchable dropdown functionality with custom options.

```jsx
import { Combobox } from "amvasdev-ui";
import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: "1", text: "Apple" },
    { id: "2", text: "Banana" },
    { id: "3", text: "Cherry" },
    { id: "4", text: "Date" },
  ];

  return (
    <Combobox
      id="fruits"
      name="fruits"
      label="Select a fruit"
      options={options}
      value={value}
      onChange={setValue}
      selectedOption={selectedOption}
      onSelect={setSelectedOption}
      placeholder="Search fruits..."
      optionLimit={5}
    />
  );
}

// With custom option content
const optionsWithContent = [
  {
    id: "1",
    text: "Apple",
    content: (
      <div>
        <strong>Apple</strong> - Red fruit
      </div>
    ),
  },
];
```

### Calendar

The Calendar component provides a date picker interface using react-day-picker with daisyUI styling.

```jsx
import { Calendar } from "amvasdev-ui";
import { useState } from "react";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Calendar
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
    />
  );
}

// With date range
<Calendar
  selectedDate={selectedDate}
  onDateChange={setSelectedDate}
  fromDate={new Date(2024, 0, 1)} // January 1, 2024
  toDate={new Date(2024, 11, 31)} // December 31, 2024
/>

// Custom styling
<Calendar
  selectedDate={selectedDate}
  onDateChange={setSelectedDate}
  className="ui:w-96 ui:shadow-xl"
/>
```

**Calendar Props:**
- `selectedDate?: Date` - Currently selected date
- `onDateChange?: (date: Date | undefined) => void` - Callback when date is selected
- `fromDate?: Date` - Minimum selectable date
- `toDate?: Date` - Maximum selectable date
- `disabled?: any` - Disabled dates (Date, Date[], or range objects)
- `showOutsideDays?: boolean` - Show days from previous/next months
- `className?: ClassValue` - Additional CSS classes

### DateInput

The DateInput component provides a form input with integrated calendar picker functionality.

```jsx
import { DateInput } from "amvasdev-ui";
import { useState } from "react";

function App() {
  const [selectedDate, setSelectedDate] = useState();

  return (
    <DateInput
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      label="Birth Date"
      placeholder="Select your birth date"
    />
  );
}

// With validation
<DateInput
  selectedDate={selectedDate}
  setSelectedDate={setSelectedDate}
  label="Event Date"
  required
  errorMessage="Please select a date"
/>

// Different sizes
<DateInput size="sm" />
<DateInput size="md" /> {/* default */}
<DateInput size="lg" />

// With date constraints
<DateInput
  selectedDate={selectedDate}
  setSelectedDate={setSelectedDate}
  label="Appointment Date"
  fromDate={new Date()} // Today onwards
  toDate={new Date(2024, 11, 31)} // Until end of 2024
/>

// Custom formatting and locale
import { es } from "date-fns/locale";

<DateInput
  selectedDate={selectedDate}
  setSelectedDate={setSelectedDate}
  dateLocale={es} // Spanish locale
  placeholder="Selecciona una fecha"
/>

// Without calendar icon
<DateInput
  selectedDate={selectedDate}
  setSelectedDate={setSelectedDate}
  showCalendarIcon={false}
/>
```

**DateInput Props:**
- `selectedDate?: Date` - Currently selected date
- `setSelectedDate: (date: Date | undefined) => void` - Function to update selected date
- `label?: string` - Input label text
- `required?: boolean` - Mark field as required
- `placeholder?: string` - Placeholder text when no date selected
- `dateLocale?: Locale` - date-fns locale for formatting (default: enUS)
- `size?: "sm" | "md" | "lg"` - Input size (default: "md")
- `calendarIcon?: ReactNode` - Custom calendar icon
- `showCalendarIcon?: boolean` - Show/hide calendar icon (default: true)
- `errorMessage?: string` - Error message to display
- `matchInputWidth?: boolean` - Match calendar width to input (default: true)
- `calendarClassName?: ClassValue` - Additional CSS classes for calendar
- `fromDate?: Date` - Minimum selectable date
- `toDate?: Date` - Maximum selectable date
- `disabled?: any` - Disabled dates (Date, Date[], or range objects)
- `showOutsideDays?: boolean` - Show days from previous/next months
- `className?: ClassValue` - Additional CSS classes for container

### Select

The Select component provides a custom dropdown select with controlled state.

```jsx
import { Select } from "amvasdev-ui";
import { useState } from "react";

function App() {
  const [selectedOption, setSelectedOption] = useState();

  const options = [
    { id: "1", text: "Option 1" },
    { id: "2", text: "Option 2" },
    { id: "3", text: "Option 3" },
  ];

  return (
    <Select
      id="select"
      label="Choose an option"
      options={options}
      onChange={setSelectedOption}
      value={selectedOption}
      placeholder="Select an option"
    />
  );
}

// With sizes and styling
<Select
  id="select"
  options={options}
  onChange={setSelectedOption}
  size="lg"
  bordered={true}
  errorMessage="This field is required"
  required
/>

// With custom styling
<Select
  id="select"
  options={options}
  onChange={setSelectedOption}
  containerClassName="custom-container"
  className="custom-select"
  menuClassName="custom-menu"
/>
```

**Available sizes:** `xs`, `sm`, `md`, `lg`

**Select Props:**
- `id: string` - Input ID (required)
- `options: SelectOption[]` - Array of options with `id` and `text` (required)
- `onChange: (option: SelectOption) => void` - Callback when option is selected (required)
- `value?: SelectOption` - Currently selected option
- `defaultValue?: SelectOption` - Default selected option
- `label?: string` - Label text
- `placeholder?: string` - Placeholder text
- `size?: "xs" | "sm" | "md" | "lg"` - Select size (default: "md")
- `bordered?: boolean` - Show border (default: true)
- `required?: boolean` - Mark as required
- `errorMessage?: string` - Error message to display
- `className?: ClassValue` - Additional CSS classes for select button
- `containerClassName?: ClassValue` - Additional CSS classes for container
- `menuClassName?: ClassValue` - Additional CSS classes for dropdown menu
- `labelClassName?: ClassValue` - Additional CSS classes for label

### RadioGroup

The RadioGroup component provides a controlled radio button group with various styling options.

```jsx
import { RadioGroup } from "amvasdev-ui";
import { useState } from "react";

function App() {
  const [selectedOption, setSelectedOption] = useState();

  const options = [
    { id: "yes", name: "Yes" },
    { id: "no", name: "No" },
    { id: "maybe", name: "Maybe", label: "Maybe Later" }, // Custom label
  ];

  return (
    <RadioGroup
      id="confirmation"
      options={options}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      orientation="horizontal"
      size="md"
      variant="primary"
    />
  );
}

// Vertical orientation
<RadioGroup
  id="choice"
  options={options}
  selectedOption={selectedOption}
  setSelectedOption={setSelectedOption}
  orientation="vertical"
/>

// Different variants and sizes
<RadioGroup
  id="choice"
  options={options}
  selectedOption={selectedOption}
  setSelectedOption={setSelectedOption}
  variant="success"
  size="lg"
/>
```

**Available variants:** `base`, `primary`, `secondary`, `accent`, `success`, `warning`, `info`, `error`

**Available sizes:** `xs`, `sm`, `md`, `lg`

**RadioGroup Props:**
- `id: string` - Group ID (required)
- `options: RadioOption[]` - Array of options with `id`, `name`, and optional `label` (required)
- `setSelectedOption: (option: RadioOption) => void` - Callback to update selection (required)
- `selectedOption?: RadioOption` - Currently selected option
- `variant?: RadioGroupVariant` - Color variant (default: "base")
- `size?: RadioGroupSize` - Size (default: "md")
- `orientation?: "horizontal" | "vertical"` - Layout orientation (default: "horizontal")
- `className?: ClassValue` - Additional CSS classes for container
- `labelClassName?: ClassValue` - Additional CSS classes for labels

### Checkbox

The Checkbox component provides a styled checkbox input with label support and variants.

```jsx
import { Checkbox } from "amvasdev-ui";

// Basic usage
<Checkbox id="terms" label="I agree to the terms and conditions" />

// Required field
<Checkbox id="terms" label="I agree to the terms and conditions" required />

// With variants and sizes
<Checkbox id="accept" label="Accept" variant="primary" size="lg" />
<Checkbox id="confirm" label="Confirm" variant="success" size="md" />

// With error message
<Checkbox
  id="terms"
  label="I agree to the terms and conditions"
  errorMessage="You must accept the terms"
  required
/>

// Custom styling
<Checkbox
  id="custom"
  label="Custom checkbox"
  className="custom-checkbox-class"
  containerClassName="custom-container-class"
  labelClassName="custom-label-class"
/>
```

**Available variants:** `base`, `primary`, `secondary`, `accent`, `success`, `warning`, `info`, `error`

**Available sizes:** `xs`, `sm`, `md`, `lg`

**Checkbox Props:**
- `id: string` - Input ID (required)
- `label?: ReactNode` - Label text or element
- `variant?: CheckboxVariant` - Color variant (default: "base")
- `size?: CheckboxSize` - Checkbox size (default: "md")
- `required?: boolean` - Mark as required
- `errorMessage?: string` - Error message to display
- `className?: ClassValue` - Additional CSS classes for checkbox
- `containerClassName?: ClassValue` - Additional CSS classes for container
- `labelClassName?: ClassValue` - Additional CSS classes for label

### Tooltip

The Tooltip component displays positioned tooltip content around a trigger element. It supports four positions: top, down, left, and right.

```jsx
import { Tooltip } from "amvasdev-ui";

// Basic usage - renders absolutely positioned within a relative container
<span className="ui:relative">
  Hover me
  <Tooltip content="This is a helpful tooltip" position="top" />
</span>

// All positions
<span className="ui:relative">
  Top
  <Tooltip content="Top tooltip" position="top" />
</span>

<span className="ui:relative">
  Down
  <Tooltip content="Down tooltip" position="down" />
</span>

<span className="ui:relative">
  Left
  <Tooltip content="Left tooltip" position="left" />
</span>

<span className="ui:relative">
  Right
  <Tooltip content="Right tooltip" position="right" />
</span>

// With custom content
<span className="ui:relative">
  Info
  <Tooltip
    position="top"
    content={
      <div className="ui:flex ui:items-center ui:gap-2">
        <span className="ui:font-bold">Custom tooltip</span>
      </div>
    }
  />
</span>

// Custom styling
<span className="ui:relative">
  Example
  <Tooltip
    content="Styled tooltip"
    position="down"
    className="ui:font-bold ui:text-lg"
  />
</span>
```

**Available positions:** `top`, `down`, `left`, `right`

**Tooltip Props:**
- `content: ReactNode` - Tooltip content (required)
- `position?: TooltipPosition` - Tooltip position (default: "top")
- `className?: string` - Additional CSS classes

**Note:** The Tooltip component must be placed inside a container with `ui:relative` positioning. It's commonly used within components that manage hover/focus state. For buttons with tooltips, use the IconButton component's `tooltip` prop.

### Dropdown

The Dropdown component provides a customizable dropdown menu with trigger element.

```jsx
import { Dropdown } from "amvasdev-ui";

// Basic usage
<Dropdown triggerElement={<span>Menu</span>}>
  <li>
    <a>Profile</a>
  </li>
  <li>
    <a>Settings</a>
  </li>
  <li>
    <a>Logout</a>
  </li>
</Dropdown>

// With unstyled trigger (no button styling)
<Dropdown
  triggerElement={<span>Custom Trigger</span>}
  unstyledTrigger={true}
  position="right"
>
  <li><a>Option 1</a></li>
  <li><a>Option 2</a></li>
</Dropdown>

// Without chevron icon
<Dropdown
  triggerElement={<span>Menu</span>}
  showChevron={false}
>
  <li><a>Item 1</a></li>
  <li><a>Item 2</a></li>
</Dropdown>

// Custom styling and behavior
<Dropdown
  triggerElement={<span>Options</span>}
  position="left"
  closeTimeout={300}
  closeOnEsc={true}
  triggerClassName="custom-trigger"
  menuClassName="custom-menu"
>
  <li><a>Option A</a></li>
  <li><a>Option B</a></li>
</Dropdown>
```

**Available positions:** `left`, `right`

**Dropdown Props:**
- `triggerElement: ReactNode` - Element that triggers the dropdown (required)
- `children: ReactNode` - Dropdown menu content (required)
- `position?: "left" | "right"` - Menu position (default: "left")
- `closeTimeout?: number` - Close animation duration in ms (default: 180)
- `closeOnEsc?: boolean` - Close on Escape key (default: true)
- `showChevron?: boolean` - Show chevron icon (default: true)
- `unstyledTrigger?: boolean` - Remove default button styling from trigger (default: false)
- `triggerClassName?: ClassValue` - Additional CSS classes for trigger
- `menuClassName?: string` - Additional CSS classes for menu
- `className?: ClassValue` - Additional CSS classes for container

### Breadcrumbs

The Breadcrumbs component displays navigation breadcrumbs with customizable options.

```jsx
import { Breadcrumbs } from "amvasdev-ui";

// Basic usage with links and text
<Breadcrumbs
  id="nav-breadcrumbs"
  options={[
    <a href="/">Home</a>,
    <a href="/products">Products</a>,
    <span>Current Page</span>,
  ]}
/>

// With custom styling
<Breadcrumbs
  id="styled-breadcrumbs"
  options={[
    <a href="/" className="ui:text-primary">Home</a>,
    <a href="/category">Category</a>,
    <span className="ui:font-bold">Item</span>,
  ]}
  className="ui:text-lg"
/>

// Using router links
import { Link } from "react-router-dom";

<Breadcrumbs
  id="router-breadcrumbs"
  options={[
    <Link to="/">Home</Link>,
    <Link to="/products">Products</Link>,
    <span>Product Details</span>,
  ]}
/>
```

**Breadcrumbs Props:**
- `options: ReactNode[]` - Array of breadcrumb items (links or text) (required)
- `id?: string` - Component ID
- `className?: ClassValue` - Additional CSS classes

### ActionModal

The ActionModal component provides a pre-styled modal for confirmation actions with various types.

```jsx
import { ActionModal } from "amvasdev-ui";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ActionModal
      type="success"
      title="Success!"
      description="Your action was completed successfully."
      onConfirm={() => {
        console.log("Confirmed");
        setIsOpen(false);
      }}
      closeModal={() => setIsOpen(false)}
      showClose={true}
    />
  );
}

// Warning modal with custom buttons
<ActionModal
  type="warning"
  title="Are you sure?"
  description="This action cannot be undone."
  onConfirm={handleDelete}
  confirmButtonText="Delete"
  cancelButtonText="Cancel"
  showCancelButton={true}
  onCancel={() => setIsOpen(false)}
/>

// Error modal with loading state
<ActionModal
  type="error"
  title="Error occurred"
  description="Failed to complete the operation."
  onConfirm={handleRetry}
  isPending={isLoading}
  confirmButtonText="Retry"
  showCancelButton={true}
/>

// Info modal without cancel button
<ActionModal
  type="info"
  title="Information"
  description="Please note this important information."
  modalTitle="Notice"
  onConfirm={handleAcknowledge}
  confirmButtonText="I Understand"
  showCancelButton={false}
/>
```

**Available types:** `success`, `warning`, `info`, `error`

**ActionModal Props:**
- `title: string` - Main title text (required)
- `description: string` - Description text (required)
- `type: ActionModalType` - Modal type/variant (required)
- `onConfirm: () => void` - Callback when confirm button is clicked (required)
- `modalTitle?: string` - Modal header title
- `showClose?: boolean` - Show close button in header
- `closeModal?: () => void` - Callback to close modal (default: noop)
- `confirmButtonText?: string` - Text for confirm button (default: "Confirm")
- `showCancelButton?: boolean` - Show cancel button (default: true)
- `cancelButtonText?: string` - Text for cancel button (default: "Cancel")
- `isPending?: boolean` - Show loading state on confirm button (default: false)
- `onCancel?: () => void` - Callback when cancel button is clicked

### ColorPalette

The ColorPalette component displays a theme preview with color swatches. It's commonly used for theme selection interfaces.

```jsx
import { ColorPalette } from "amvasdev-ui";

// Basic usage
<ColorPalette theme="emerald" />

// With custom theme label
<ColorPalette
  theme="dracula"
  themeLabel="Dark Theme"
  showThemeLabel={true}
/>

// Mark as selected
<ColorPalette
  theme="light"
  isSelected={true}
/>

// Without theme label
<ColorPalette
  theme="winter"
  showThemeLabel={false}
/>

// With custom styling and click handler
<ColorPalette
  theme="sunset"
  className="ui:cursor-pointer ui:hover:shadow-xl"
  labelClassName="ui:text-lg"
  onClick={() => handleThemeChange("sunset")}
/>

// Complete theme selector example
function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState("light");

  // You can use any daisyUI theme
  const themes = ["light", "dark", "cupcake", "emerald", "dracula"];

  return (
    <div className="ui:flex ui:flex-col ui:gap-2">
      {themes.map((theme) => (
        <ColorPalette
          key={theme}
          theme={theme}
          isSelected={selectedTheme === theme}
          onClick={() => setSelectedTheme(theme)}
          className="ui:cursor-pointer"
        />
      ))}
    </div>
  );
}
```

**ColorPalette Props:**
- `theme: string` - Theme name (required)
- `className?: ClassValue` - Additional CSS classes for container
- `themeLabel?: string` - Custom label text (defaults to theme name)
- `labelClassName?: ClassValue` - Additional CSS classes for label
- `showThemeLabel?: boolean` - Show/hide theme label (default: true)
- `isSelected?: boolean` - Show selected indicator (default: false)

### IconButton

The IconButton component provides a circular ghost button optimized for displaying icons, with optional tooltip support.

```jsx
import { IconButton } from "amvasdev-ui";
import { Settings, Trash, Edit } from "lucide-react";

// Basic usage
<IconButton
  icon={<Settings size={20} />}
  onClick={() => console.log("Settings clicked")}
/>

// With simple tooltip
<IconButton
  icon={<Edit size={18} />}
  tooltip="Edit item"
  onClick={handleEdit}
/>

// With tooltip positioning
<IconButton
  icon={<Trash size={18} />}
  tooltip={{ content: "Delete", position: "left" }}
  onClick={handleDelete}
/>

// With custom tooltip content and position
<IconButton
  icon={<Trash size={18} />}
  tooltip={{
    content: (
      <div className="ui:flex ui:flex-col">
        <span className="ui:font-bold">Delete</span>
        <span className="ui:text-xs">Cannot be undone</span>
      </div>
    ),
    position: "down",
  }}
  onClick={handleDelete}
/>

// With custom tooltip styling
<IconButton
  icon={<Settings size={20} />}
  tooltip={{
    content: "Settings",
    position: "right",
    className: "ui:font-bold ui:text-lg",
  }}
  onClick={handleSettings}
/>

// Custom button styling
<IconButton
  icon={<Settings size={24} />}
  className="ui:text-primary ui:hover:bg-primary ui:hover:text-primary-content"
  onClick={handleSettings}
/>

// Disabled state
<IconButton
  icon={<Settings size={20} />}
  disabled={true}
  tooltip="Not available"
/>
```

**IconButton Props:**
- `icon: ReactNode` - Icon element to display (required)
- `tooltip?: ReactNode | TooltipProps` - Tooltip content or configuration object (shown on hover/focus)
  - Simple: Pass a string or ReactNode directly
  - Advanced: Pass `{ content, position?, className? }` for full control
- `className?: ClassValue` - Additional CSS classes
- All standard HTML button props are supported

### Badge

The Badge component displays small status indicators or labels with various styles and sizes.

```jsx
import { Badge } from "amvasdev-ui";

// Basic usage
<Badge>Default</Badge>

// With variants
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="neutral">Neutral</Badge>

// Different sizes
<Badge size="xs">Extra Small</Badge>
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
<Badge size="xl">Extra Large</Badge>

// Border types
<Badge borderType="outline" variant="primary">Outlined</Badge>
<Badge borderType="dash" variant="secondary">Dashed</Badge>
<Badge borderType="none">No Border</Badge>

// Soft style
<Badge variant="success" soft>Soft Success</Badge>

// Combined styles
<Badge variant="error" size="lg" borderType="outline">
  Error Badge
</Badge>

// Custom styling
<Badge className="ui:uppercase ui:font-bold" variant="info">
  Custom
</Badge>
```

**Available variants:** `neutral`, `primary`, `secondary`, `accent`, `info`, `success`, `warning`, `error`

**Available sizes:** `xs`, `sm`, `md`, `lg`, `xl`

**Available border types:** `none`, `outline`, `dash`

**Badge Props:**
- `children: ReactNode` - Badge content (required)
- `variant?: BadgeVariant` - Color variant
- `size?: BadgeSize` - Badge size (default: "sm")
- `borderType?: BadgeBorderType` - Border style (default: "none")
- `soft?: boolean` - Use soft/muted colors (default: false)
- `className?: ClassValue` - Additional CSS classes

### HamburgerMenu

The HamburgerMenu component provides a mobile-friendly menu with an icon button trigger.

```jsx
import { HamburgerMenu } from "amvasdev-ui";
import { Menu as MenuIcon } from "lucide-react";

// Basic usage
<HamburgerMenu icon={MenuIcon}>
  <li><a>Profile</a></li>
  <li><a>Settings</a></li>
  <li><a>Logout</a></li>
</HamburgerMenu>

// With custom position
<HamburgerMenu icon={MenuIcon} position="right">
  <li><a>Option 1</a></li>
  <li><a>Option 2</a></li>
</HamburgerMenu>

// Custom icon size and styling
<HamburgerMenu
  icon={MenuIcon}
  iconSize={24}
  iconButtonClassName="ui:text-primary"
  menuClassName="ui:min-w-48"
>
  <li><a>Dashboard</a></li>
  <li><a>Analytics</a></li>
  <li><a>Reports</a></li>
</HamburgerMenu>

// Custom close behavior
<HamburgerMenu
  icon={MenuIcon}
  closeTimeout={300}
  closeOnEsc={true}
  position="left"
>
  <li><a>Home</a></li>
  <li><a>About</a></li>
  <li><a>Contact</a></li>
</HamburgerMenu>

// Complete example with custom styling
<HamburgerMenu
  icon={MenuIcon}
  iconSize={20}
  position="right"
  className="ui:fixed ui:top-4 ui:right-4"
  iconButtonClassName="ui:bg-base-200"
  menuClassName="ui:shadow-2xl"
>
  <li><a href="/profile">Profile</a></li>
  <li><a href="/settings">Settings</a></li>
  <li className="ui:divider"></li>
  <li><a href="/logout">Logout</a></li>
</HamburgerMenu>
```

**Available positions:** `left`, `right`

**HamburgerMenu Props:**
- `icon: LucideIcon` - Lucide icon component to display (required)
- `children: ReactNode` - Menu content (required)
- `position?: "left" | "right"` - Menu position (default: "left")
- `iconSize?: number` - Icon size in pixels (default: 20)
- `closeTimeout?: number` - Close animation duration in ms (default: 180)
- `closeOnEsc?: boolean` - Close on Escape key (default: true)
- `className?: ClassValue` - Additional CSS classes for container
- `iconButtonClassName?: ClassValue` - Additional CSS classes for icon button
- `menuClassName?: string` - Additional CSS classes for menu

## Hooks

### useClosableContainer

Hook for managing closable containers like modals, dropdowns, and popovers.

```jsx
import { useClosableContainer } from "amvasdev-ui";
import { useRef } from "react";

function MyModal({ onClose }) {
  const ref = useRef(null);
  const { isClosing, handleClose } = useClosableContainer(ref, onClose, {
    closeTimeout: 300,
    closeOnEsc: true,
    closeOnClickOutside: true,
  });

  return (
    <div
      ref={ref}
      className={isClosing ? "animate-fade-out" : "animate-fade-in"}
    >
      <button onClick={handleClose}>Close</button>
      <p>Modal content</p>
    </div>
  );
}
```

**Options:**

- `closeTimeout` - Animation duration before calling onClose (default: 280ms)
- `closeOnEsc` - Close when Escape key is pressed (default: true)
- `closeOnClickOutside` - Close when clicking outside (default: true)

### useThemeChange

Hook for changing daisyUI themes dynamically.

```jsx
import { useThemeChange } from "amvasdev-ui";

function ThemeSelector() {
  const { changeTheme } = useThemeChange();

  return (
    <select onChange={(e) => changeTheme(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="emerald">Emerald</option>
      <option value="dracula">Dracula</option>
      <option value="winter">Winter</option>
      <option value="night">Night</option>
      <option value="halloween">Halloween</option>
      <option value="autumn">Autumn</option>
      <option value="business">Business</option>
      <option value="nord">Nord</option>
      <option value="dim">Dim</option>
      <option value="lemonade">Lemonade</option>
      <option value="sunset">Sunset</option>
      <option value="valentine">Valentine</option>
    </select>
  );
}
```

### useEventListener

Hook for adding event listeners with automatic cleanup.

```jsx
import { useEventListener } from "amvasdev-ui";
import { useRef } from "react";

function MyComponent() {
  const buttonRef = useRef(null);

  // Listen to window events
  useEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      console.log("Escape key pressed");
    }
  });

  // Listen to element events
  useEventListener(
    "click",
    (event) => {
      console.log("Button clicked");
    },
    buttonRef
  );

  return <button ref={buttonRef}>Click me</button>;
}
```

### useOnClickOutside

Hook for detecting clicks outside of an element.

```jsx
import { useOnClickOutside } from "amvasdev-ui";
import { useRef, useState } from "react";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && <div>Dropdown content</div>}
    </div>
  );
}
```

### useToggle

Hook for toggling boolean values.

```jsx
import { useToggle } from "amvasdev-ui";

function ToggleExample() {
  const [isVisible, toggleVisibility] = useToggle(false);
  const [isEnabled, toggleEnabled] = useToggle(true);

  return (
    <div>
      <button onClick={toggleVisibility}>{isVisible ? "Hide" : "Show"}</button>
      <button onClick={toggleEnabled}>
        {isEnabled ? "Disable" : "Enable"}
      </button>
    </div>
  );
}
```

### useIsomorphicLayoutEffect

Hook that uses useLayoutEffect on the client and useEffect on the server (for SSR compatibility).

```jsx
import { useIsomorphicLayoutEffect } from "amvasdev-ui";
import { useState } from "react";

function ResponsiveComponent() {
  const [width, setWidth] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return <div>Width: {width}px</div>;
}
```

### useBreakpoint

Hook for checking if the viewport matches a media query breakpoint range. Useful for responsive designs and conditional rendering based on screen size.

```jsx
import { useBreakpoint } from "amvasdev-ui";

function ResponsiveComponent() {
  // Check if viewport is at least 768px wide (tablet and up)
  const isTablet = useBreakpoint({ min: 768 });

  // Check if viewport is less than 640px (mobile only)
  const isMobile = useBreakpoint({ max: 640 });

  // Check if viewport is between 768px and 1024px (tablet range)
  const isTabletOnly = useBreakpoint({ min: 768, max: 1024 });

  return (
    <div>
      {isMobile && <MobileNav />}
      {isTablet && !isMobile && <TabletNav />}
      {!isTablet && <DesktopNav />}
    </div>
  );
}

// Common breakpoint patterns
function BreakpointExamples() {
  // Mobile-first approach
  const isSmall = useBreakpoint({ max: 640 }); // sm breakpoint
  const isMedium = useBreakpoint({ min: 640, max: 768 }); // md breakpoint
  const isLarge = useBreakpoint({ min: 768, max: 1024 }); // lg breakpoint
  const isExtraLarge = useBreakpoint({ min: 1024 }); // xl breakpoint

  return (
    <div>
      {isSmall && <p>Small screen</p>}
      {isMedium && <p>Medium screen</p>}
      {isLarge && <p>Large screen</p>}
      {isExtraLarge && <p>Extra large screen</p>}
    </div>
  );
}

// Conditional component rendering
function AdaptiveLayout() {
  const showSidebar = useBreakpoint({ min: 1024 });

  return (
    <div className="ui:flex">
      {showSidebar && <Sidebar />}
      <MainContent />
    </div>
  );
}
```

**Parameters:**

- `options: { min?: number; max?: number }` - Breakpoint configuration object
  - `min` - Minimum viewport width in pixels (inclusive)
  - `max` - Maximum viewport width in pixels (exclusive, actual max is `max - 1`)
  - At least one of `min` or `max` must be provided

**Returns:** `boolean` - `true` if the viewport matches the breakpoint range, `false` otherwise

**Notes:**

- The hook automatically updates when the viewport is resized
- The `max` value is exclusive (e.g., `max: 640` matches viewports up to 639px)
- Uses `window.matchMedia` for efficient media query matching
- Event listeners are automatically cleaned up on unmount

## Utilities

### Button Utilities

```jsx
import { getButtonClasses, getButtonVariant, getButtonSize } from "amvasdev-ui";

// Get complete button classes
const buttonClasses = getButtonClasses({
  variant: "primary",
  size: "lg",
  outlined: true,
});

// Get only variant classes
const variantClasses = getButtonVariant("primary");

// Get only size classes
const sizeClasses = getButtonSize("lg");
```

### Input Utilities

```jsx
import { getInputClasses, getInputVariant, getInputSize } from "amvasdev-ui";

// Get complete input classes
const inputClasses = getInputClasses({
  variant: "primary",
  size: "md",
  bordered: true,
});

// Get only variant classes
const variantClasses = getInputVariant("primary");

// Get only size classes
const sizeClasses = getInputSize("md");
```

### Loading Utilities

```jsx
import { getLoadingClasses } from "amvasdev-ui";

// Get loading spinner classes
const loadingClasses = getLoadingClasses({
  type: "spin",
  size: "md",
});

// Use in custom component
<span className={`loading ${loadingClasses}`} />;
```

**Loading types:** `spin`, `dots`, `ring`, `ball`, `bars`, `infinity`

**Loading sizes:** `xs`, `sm`, `md`, `lg`

### IconButton Utilities

```jsx
import { getIconButtonClasses } from "amvasdev-ui";

// Get icon button classes
const iconButtonClasses = getIconButtonClasses();

// Use in custom component
<button className={iconButtonClasses}>
  <Icon size={20} />
</button>
```

The `getIconButtonClasses()` function returns the default styling for icon buttons: circular ghost button with proper spacing and hover effects.

## Theme System

The library supports all daisyUI themes through the `useThemeChange` hook:

```jsx
import { ColorPalette, useThemeChange } from "amvasdev-ui";
import { useState } from "react";

function ThemeSelector() {
  const { changeTheme } = useThemeChange();
  const [currentTheme, setCurrentTheme] = useState("light");

  const handleThemeChange = (theme) => {
    changeTheme(theme);
    setCurrentTheme(theme);
  };

  // You can use any daisyUI theme
  const themes = [
    "light", "dark", "cupcake", "bumblebee", "emerald",
    "corporate", "synthwave", "retro", "cyberpunk", "valentine",
    "halloween", "garden", "forest", "aqua", "lofi",
    "pastel", "fantasy", "wireframe", "black", "luxury",
    "dracula", "cmyk", "autumn", "business", "acid",
    "lemonade", "night", "coffee", "winter", "dim",
    "nord", "sunset"
  ];

  return (
    <div className="ui:flex ui:flex-col ui:gap-2">
      {themes.map((theme) => (
        <ColorPalette
          key={theme}
          theme={theme}
          isSelected={currentTheme === theme}
          onClick={() => handleThemeChange(theme)}
          className="ui:cursor-pointer"
        />
      ))}
    </div>
  );
}
```

See all available daisyUI themes at: https://daisyui.com/docs/themes/

## Styling Notes

- **TailwindCSS Prefix:** All components use the `ui:` prefix for TailwindCSS classes to prevent conflicts with your application's styles
- **daisyUI Integration:** Components are built with the daisyUI component library for consistent theming
- **Custom Animations:** The following animations are available for use:
  - `fade-in` - Fade in animation
  - `fade-out` - Fade out animation
  - `to-top` - Slide to top animation
  - `to-bottom` - Slide to bottom animation
  - `scale-up` - Scale up animation
  - `scale-down` - Scale down animation
- **Safari-Specific Styling:** The `safari-only:` variant prefix is available for browser-specific fixes when needed
- **CSS Import:** Always import the library's CSS file in your application's root component:
  ```jsx
  import "amvasdev-ui/dist/index.css";
  ```

## TypeScript Support

All components are fully typed with TypeScript. The library exports comprehensive type definitions for all components, hooks, and utilities.

### Component Types

```tsx
import type {
  // Component Props
  ActionModalProps,
  ActionModalType,
  BadgeProps,
  BadgeVariant,
  BadgeSize,
  BadgeBorderType,
  BreadcrumbsProps,
  ButtonProps,
  ButtonSize,
  ButtonType,
  ButtonVariant,
  CalendarProps,
  CheckboxProps,
  ColorPaletteProps,
  ComboboxProps,
  IComboboxOption,
  DateInputProps,
  DropdownProps,
  DropdownPosition,
  ErrorLabelProps,
  HamburgerMenuProps,
  HamburgerMenuPosition,
  IconButtonProps,
  InputProps,
  InputSize,
  InputVariant,
  LabelProps,
  ModalProps,
  RadioGroupProps,
  RadioGroupOrientation,
  RadioGroupSize,
  RadioGroupVariant,
  RadioOption,
  SelectProps,
  SelectSize,
  SelectOption,
  TooltipProps,
} from "amvasdev-ui";

// Usage example
const buttonConfig: ButtonProps = {
  variant: "primary",
  size: "lg",
  isLoading: false,
};

const radioOptions: RadioOption[] = [
  { id: "1", name: "Option 1" },
  { id: "2", name: "Option 2" },
];
```

### Utility Types

All utility functions are also fully typed, providing autocomplete and type safety when building custom components.

```tsx
import { getButtonClasses, getInputClasses } from "amvasdev-ui";

// TypeScript will infer the correct types for parameters
const classes = getButtonClasses({
  variant: "primary", // Autocomplete available
  size: "lg",
  outlined: true,
});
```

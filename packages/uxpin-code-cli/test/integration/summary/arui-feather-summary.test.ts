import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 15000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('--summary option integration', () => {
  describe('--summary option prints ', () => {
    it('prints the list of components found in arui-feather example', () => {
      // when
      return runUXPinCodeCommand('resources/repos/arui-feather', '--summary').then((output) => {
        // then
        expect(output).toContain(
          `Amount
    📜 documentation: ✔
    💡 examples: ✔

AppContent
    📜 documentation: ✔
    💡 examples: ✘

AppMenu
    📜 documentation: ✔
    💡 examples: ✘

AppTitle
    📜 documentation: ✔
    💡 examples: ✘

Attach
    📜 documentation: ✔
    💡 examples: ✔

Button
    📜 documentation: ✔
    💡 examples: ✔

Calendar
    📜 documentation: ✔
    💡 examples: ✔

CalendarInput
    📜 documentation: ✔
    💡 examples: ✔

CardInput
    📜 documentation: ✔
    💡 examples: ✔

Checkbox
    📜 documentation: ✔
    💡 examples: ✔

CheckboxGroup
    📜 documentation: ✔
    💡 examples: ✔

Collapse
    📜 documentation: ✔
    💡 examples: ✔

Copyright
    📜 documentation: ✔
    💡 examples: ✔

Dropdown
    📜 documentation: ✔
    💡 examples: ✔

EmailInput
    📜 documentation: ✔
    💡 examples: ✔

ErrorPage
    📜 documentation: ✘
    💡 examples: ✘

Footer
    📜 documentation: ✔
    💡 examples: ✘

Form
    📜 documentation: ✔
    💡 examples: ✔

FormField
    📜 documentation: ✔
    💡 examples: ✔

Header
    📜 documentation: ✔
    💡 examples: ✘

Heading
    📜 documentation: ✔
    💡 examples: ✔

Icon
    📜 documentation: ✔
    💡 examples: ✔

Input
    📜 documentation: ✔
    💡 examples: ✔

InputAutocomplete
    📜 documentation: ✔
    💡 examples: ✔

InputGroup
    📜 documentation: ✔
    💡 examples: ✔

IsolatedContainer
    📜 documentation: ✘
    💡 examples: ✘

Label
    📜 documentation: ✔
    💡 examples: ✔

Link
    📜 documentation: ✔
    💡 examples: ✔

List
    📜 documentation: ✔
    💡 examples: ✔

MaskedInput
    📜 documentation: ✘
    💡 examples: ✘

Menu
    📜 documentation: ✔
    💡 examples: ✔

MenuItem
    📜 documentation: ✔
    💡 examples: ✔

MoneyInput
    📜 documentation: ✔
    💡 examples: ✔

Mq
    📜 documentation: ✘
    💡 examples: ✘

Notification
    📜 documentation: ✔
    💡 examples: ✔

Page
    📜 documentation: ✔
    💡 examples: ✔

Paragraph
    📜 documentation: ✔
    💡 examples: ✔

PhoneInput
    📜 documentation: ✔
    💡 examples: ✔

Plate
    📜 documentation: ✘
    💡 examples: ✘

Popup
    📜 documentation: ✔
    💡 examples: ✔

PopupContainerProvider
    📜 documentation: ✘
    💡 examples: ✘

PopupHeader
    📜 documentation: ✔
    💡 examples: ✘

Radio
    📜 documentation: ✔
    💡 examples: ✔

RadioGroup
    📜 documentation: ✔
    💡 examples: ✔

RenderInContainer
    📜 documentation: ✘
    💡 examples: ✘

ResizeSensor
    📜 documentation: ✘
    💡 examples: ✘

Select
    📜 documentation: ✔
    💡 examples: ✔

Sidebar
    📜 documentation: ✔
    💡 examples: ✔

SlideDown
    📜 documentation: ✔
    💡 examples: ✔

Spin
    📜 documentation: ✔
    💡 examples: ✔

Support
    📜 documentation: ✔
    💡 examples: ✔

Textarea
    📜 documentation: ✔
    💡 examples: ✔

ThemeProvider
    📜 documentation: ✘
    💡 examples: ✘

User
    📜 documentation: ✔
    💡 examples: ✔`);
      });
    });
  });
});
